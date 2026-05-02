import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import { createEventRecord, getEventRecords } from '@/features/events/api/service';
import { eventRecordSchema } from '@/features/events/schemas/event-record';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/events', request.method);
  if (forbidden) {
    return forbidden;
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getEventRecords({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/events', request.method);
  if (forbidden) {
    return forbidden;
  }

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

  const event = await createEventRecord(parsed.data);

  revalidatePath('/dashboard/events');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ event }, { status: 201 });
}
