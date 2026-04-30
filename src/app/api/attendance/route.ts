import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getAttendancePageData, saveAttendanceRows } from '@/features/attendance/api/service';
import { ATTENDANCE_STATUSES } from '@/features/attendance/api/types';

const attendanceTypeSchema = z.enum(['staff', 'manager']);

const saveAttendanceSchema = z.object({
  type: attendanceTypeSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  rows: z.array(
    z.object({
      personId: z.string().min(1),
      shift: z.string().optional(),
      status: z.enum(ATTENDANCE_STATUSES),
      remarks: z.string().optional()
    })
  )
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date') ?? undefined;
  const typeParam = searchParams.get('type');

  if (typeParam === 'staff' || typeParam === 'manager') {
    const pageData = await getAttendancePageData(date);
    const rows = typeParam === 'staff' ? pageData.staff : pageData.managers;
    return NextResponse.json({ type: typeParam, date: pageData.date, rows });
  }

  const data = await getAttendancePageData(date);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = saveAttendanceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid attendance payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const saved = await saveAttendanceRows(parsed.data);

  revalidatePath('/dashboard/attendance');

  return NextResponse.json({
    type: parsed.data.type,
    saved: saved.length
  });
}
