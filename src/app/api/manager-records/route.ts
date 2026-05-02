import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import { createManager, getManagers } from '@/features/manager-records/api/service';
import { managerSchema } from '@/features/manager-records/schemas/manager';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/manager-records', request.method);
  if (forbidden) {
    return forbidden;
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getManagers({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/manager-records', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = managerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid manager payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const manager = await createManager(parsed.data);

  revalidatePath('/dashboard/manager-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ manager }, { status: 201 });
}
