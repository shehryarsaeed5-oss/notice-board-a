import 'server-only';

import { invalidateDisplayBoardCache } from '@/features/display-board/api/cache';
import { prisma } from '@/lib/prisma';
import type {
  StaffImportResult,
  StaffMemberFormValues,
  StaffMemberListFilters,
  StaffMemberListResult
} from './types';
import {
  buildStaffImportIdentityKey,
  buildStaffImportPhoneKey,
  type StaffImportPreparedRow
} from '../lib/staff-import';

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | undefined {
  if (value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED') {
    return value;
  }

  return undefined;
}

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeSortOrder(value?: number | string | null): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  if (typeof parsed !== 'number' || !Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Math.trunc(parsed);
}

function normalizeStaffMemberPhoneKey(value: string | null): string {
  return value ? buildStaffImportPhoneKey(value) : '';
}

function buildExistingImportKeySets(
  staffMembers: Array<{
    name: string;
    designation: string;
    department: string | null;
    phone: string | null;
  }>
) {
  const identityKeys = new Set<string>();
  const phoneKeys = new Set<string>();

  for (const staffMember of staffMembers) {
    const identityKey = buildStaffImportIdentityKey({
      name: staffMember.name,
      designation: staffMember.designation,
      department: staffMember.department ?? ''
    });
    identityKeys.add(identityKey);

    const phoneKey = normalizeStaffMemberPhoneKey(staffMember.phone);
    if (phoneKey) {
      phoneKeys.add(phoneKey);
    }
  }

  return { identityKeys, phoneKeys };
}

function buildWhere(filters: StaffMemberListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);

  return {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              designation: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              department: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              phone: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getStaffMembers(
  filters: StaffMemberListFilters = {}
): Promise<StaffMemberListResult> {
  const where = buildWhere(filters);

  const staffMembers = await prisma.staffMember.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
  });

  return {
    staffMembers,
    total: staffMembers.length
  };
}

export async function createStaffMember(values: StaffMemberFormValues) {
  const staffMember = await prisma.staffMember.create({
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeRequiredText(values.designation),
      department: normalizeOptionalText(values.department),
      phone: normalizeOptionalText(values.phone),
      sortOrder: normalizeSortOrder(values.sortOrder),
      status: values.status
    }
  });

  await invalidateDisplayBoardCache();

  return staffMember;
}

export async function updateStaffMember(id: string, values: StaffMemberFormValues) {
  const staffMember = await prisma.staffMember.update({
    where: { id },
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeRequiredText(values.designation),
      department: normalizeOptionalText(values.department),
      phone: normalizeOptionalText(values.phone),
      sortOrder: normalizeSortOrder(values.sortOrder),
      status: values.status
    }
  });

  await invalidateDisplayBoardCache();

  return staffMember;
}

export async function archiveStaffMember(id: string) {
  const staffMember = await prisma.staffMember.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await invalidateDisplayBoardCache();

  return staffMember;
}

export async function deleteStaffMember(id: string) {
  const existing = await prisma.staffMember.findUnique({
    where: { id }
  });

  if (!existing) {
    return null;
  }

  if (existing.status !== 'ARCHIVED') {
    const staffMember = await prisma.staffMember.update({
      where: { id },
      data: {
        status: 'ARCHIVED'
      }
    });

    await invalidateDisplayBoardCache();

    return staffMember;
  }

  const staffMember = await prisma.staffMember.delete({
    where: { id }
  });

  await invalidateDisplayBoardCache();

  return staffMember;
}

export async function importStaffMembers(
  rows: StaffImportPreparedRow[]
): Promise<StaffImportResult> {
  if (rows.length === 0) {
    return {
      importedCount: 0,
      skippedCount: 0,
      failedCount: 0
    };
  }

  const existingStaffMembers = await prisma.staffMember.findMany({
    select: {
      name: true,
      designation: true,
      department: true,
      phone: true
    }
  });

  const { identityKeys: existingIdentityKeys, phoneKeys: existingPhoneKeys } =
    buildExistingImportKeySets(existingStaffMembers);
  const seenIdentityKeys = new Set(existingIdentityKeys);
  const seenPhoneKeys = new Set(existingPhoneKeys);
  const data: Array<{
    name: string;
    designation: string;
    department: string | null;
    phone: string | null;
    sortOrder: number;
    status: 'ACTIVE' | 'INACTIVE';
  }> = [];
  let skippedCount = 0;

  for (const row of rows) {
    const identityKey = row.identityKey;
    const phoneKey = row.phoneKey;

    if (phoneKey) {
      if (seenPhoneKeys.has(phoneKey)) {
        skippedCount += 1;
        continue;
      }

      seenPhoneKeys.add(phoneKey);
      seenIdentityKeys.add(identityKey);
      data.push({
        name: row.name,
        designation: row.designation,
        department: row.department,
        phone: row.phone,
        sortOrder: row.sortOrder,
        status: row.status
      });
      continue;
    }

    if (seenIdentityKeys.has(identityKey)) {
      skippedCount += 1;
      continue;
    }

    seenIdentityKeys.add(identityKey);
    data.push({
      name: row.name,
      designation: row.designation,
      department: row.department,
      phone: row.phone,
      sortOrder: row.sortOrder,
      status: row.status
    });
  }

  if (data.length > 0) {
    await prisma.staffMember.createMany({
      data
    });
    await invalidateDisplayBoardCache();
  }

  return {
    importedCount: data.length,
    skippedCount,
    failedCount: 0
  };
}
