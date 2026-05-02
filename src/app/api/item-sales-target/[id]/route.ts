import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import {
  archiveItemSalesTarget,
  updateItemSalesTarget
} from '@/features/item-sales-target/api/service';
import { itemSalesTargetSchema } from '@/features/item-sales-target/schemas/item-sales-target';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/item-sales-target', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = itemSalesTargetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid item sales target payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const itemSalesTarget = await updateItemSalesTarget(id, parsed.data);

  revalidatePath('/dashboard/item-sales-target');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ itemSalesTarget });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/item-sales-target', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  await request.json().catch(() => null);
  const itemSalesTarget = await archiveItemSalesTarget(id);

  revalidatePath('/dashboard/item-sales-target');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ itemSalesTarget });
}
