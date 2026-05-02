import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import {
  createItemSalesTarget,
  getItemSalesTargets
} from '@/features/item-sales-target/api/service';
import { itemSalesTargetSchema } from '@/features/item-sales-target/schemas/item-sales-target';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getItemSalesTargets({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
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

  const itemSalesTarget = await createItemSalesTarget(parsed.data);

  revalidatePath('/dashboard/item-sales-target');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ itemSalesTarget }, { status: 201 });
}
