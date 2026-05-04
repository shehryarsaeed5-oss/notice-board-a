import 'server-only';

import { prisma } from '@/lib/prisma';
import { endOfDay, parseDateInputValue, startOfDay, toDateInputValue } from '../lib/date';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
import type {
  AttendancePageData,
  AttendanceSavePayload,
  AttendanceStatus,
  AttendanceType,
  AttendancePersonRow,
  AttendanceManagerRow
} from './types';

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

async function upsertStaffAttendance(date: Date, rows: AttendanceSavePayload['rows']) {
  return prisma.$transaction(async (tx) => {
    const saved = [];

    for (const row of rows) {
      const existing = await tx.attendanceRecord.findFirst({
        where: {
          staffId: row.personId,
          date: {
            gte: startOfDay(date),
            lt: endOfDay(date)
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      const data = {
        staffId: row.personId,
        date: startOfDay(date),
        shift: normalizeOptionalText(row.shift),
        status: row.status,
        remarks: normalizeOptionalText(row.remarks)
      };

      if (existing) {
        saved.push(
          await tx.attendanceRecord.update({
            where: { id: existing.id },
            data
          })
        );
      } else {
        saved.push(
          await tx.attendanceRecord.create({
            data
          })
        );
      }
    }

    return saved;
  });
}

async function upsertManagerAttendance(date: Date, rows: AttendanceSavePayload['rows']) {
  return prisma.$transaction(async (tx) => {
    const saved = [];

    for (const row of rows) {
      const existing = await tx.managerAttendanceRecord.findFirst({
        where: {
          managerId: row.personId,
          date: {
            gte: startOfDay(date),
            lt: endOfDay(date)
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      const data = {
        managerId: row.personId,
        date: startOfDay(date),
        shift: normalizeOptionalText(row.shift),
        status: row.status,
        remarks: normalizeOptionalText(row.remarks)
      };

      if (existing) {
        saved.push(
          await tx.managerAttendanceRecord.update({
            where: { id: existing.id },
            data
          })
        );
      } else {
        saved.push(
          await tx.managerAttendanceRecord.create({
            data
          })
        );
      }
    }

    return saved;
  });
}

async function getStaffRows(date: Date): Promise<AttendancePersonRow[]> {
  const [staffMembers, attendanceRecords] = await Promise.all([
    prisma.staffMember.findMany({
      where: { status: 'ACTIVE' },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
    }),
    prisma.attendanceRecord.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lt: endOfDay(date)
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const attendanceByStaffId = new Map(attendanceRecords.map((record) => [record.staffId, record]));

  return staffMembers.map((staff) => {
    const attendance = attendanceByStaffId.get(staff.id);

    return {
      id: staff.id,
      name: staff.name,
      designation: staff.designation,
      department: staff.department,
      sortOrder: staff.sortOrder,
      shift: attendance?.shift ?? '',
      status: (attendance?.status ?? 'PRESENT') as AttendanceStatus,
      remarks: attendance?.remarks ?? ''
    };
  });
}

async function getManagerRows(date: Date): Promise<AttendanceManagerRow[]> {
  const [managers, attendanceRecords] = await Promise.all([
    prisma.manager.findMany({
      where: { status: 'ACTIVE' },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
    }),
    prisma.managerAttendanceRecord.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lt: endOfDay(date)
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const attendanceByManagerId = new Map(
    attendanceRecords.map((record) => [record.managerId, record])
  );

  return managers.map((manager) => {
    const attendance = attendanceByManagerId.get(manager.id);

    return {
      id: manager.id,
      name: manager.name,
      designation: manager.designation,
      sortOrder: manager.sortOrder,
      shift: attendance?.shift ?? '',
      status: (attendance?.status ?? 'PRESENT') as AttendanceStatus,
      remarks: attendance?.remarks ?? ''
    };
  });
}

export async function getAttendancePageData(dateInput?: string): Promise<AttendancePageData> {
  const date = parseDateInputValue(dateInput);

  const [staff, managers] = await Promise.all([getStaffRows(date), getManagerRows(date)]);

  return {
    date: toDateInputValue(date),
    staff,
    managers
  };
}

export async function getAttendanceByType(dateInput: string | undefined, type: AttendanceType) {
  const data = await getAttendancePageData(dateInput);
  return type === 'staff' ? data.staff : data.managers;
}

export async function saveAttendanceRows(payload: AttendanceSavePayload) {
  const date = parseDateInputValue(payload.date);
  const rows = payload.rows.filter((row) => row.personId);
  let saved;

  if (payload.type === 'staff') {
    saved = await upsertStaffAttendance(date, rows);
  } else {
    saved = await upsertManagerAttendance(date, rows);
  }

  await bumpDisplayBoardRefreshToken();

  return saved;
}
