import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import {
  archiveMeetingSchedule,
  updateMeetingSchedule
} from '@/features/meeting-schedule/api/service';
import { meetingScheduleSchema } from '@/features/meeting-schedule/schemas/meeting-schedule';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = meetingScheduleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid meeting payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const meeting = await updateMeetingSchedule(id, parsed.data);

  revalidatePath('/dashboard/meeting-schedule');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ meeting });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const meeting = await archiveMeetingSchedule(id);

  revalidatePath('/dashboard/meeting-schedule');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ meeting });
}
