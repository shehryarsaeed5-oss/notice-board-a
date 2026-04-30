import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { archiveManager, updateManager } from '@/features/manager-records/api/service';
import { managerSchema } from '@/features/manager-records/schemas/manager';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
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

  const manager = await updateManager(id, parsed.data);

  revalidatePath('/dashboard/manager-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ manager });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const manager = await archiveManager(id);

  revalidatePath('/dashboard/manager-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ manager });
}
