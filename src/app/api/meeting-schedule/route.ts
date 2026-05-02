import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import {
  createMeetingSchedule,
  getMeetingSchedules
} from '@/features/meeting-schedule/api/service';
import { meetingScheduleSchema } from '@/features/meeting-schedule/schemas/meeting-schedule';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getMeetingSchedules({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
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

  const meeting = await createMeetingSchedule(parsed.data);

  revalidatePath('/dashboard/meeting-schedule');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ meeting }, { status: 201 });
}
