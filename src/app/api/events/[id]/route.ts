import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { archiveEventRecord, updateEventRecord } from '@/features/events/api/service';
import { eventRecordSchema } from '@/features/events/schemas/event-record';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = eventRecordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid event payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const event = await updateEventRecord(id, parsed.data);

  revalidatePath('/dashboard/events');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ event });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const event = await archiveEventRecord(id);

  revalidatePath('/dashboard/events');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ event });
}
