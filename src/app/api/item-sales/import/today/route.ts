import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import { runItemSalesImportTodayWithOptions } from '@/features/item-sales-target/import/api/service';
import { itemSalesImportRunOptionsSchema } from '@/features/item-sales-target/import/schemas/item-sales-import';

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/item-sales/import/today', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json().catch(() => ({}));
  const parsed = itemSalesImportRunOptionsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid item sales import options payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const result = await runItemSalesImportTodayWithOptions({
    forceReplace: parsed.data.forceReplace
  });
  return NextResponse.json({ result });
}
