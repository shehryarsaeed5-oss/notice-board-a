import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import { runItemSalesImportRange } from '@/features/item-sales-target/import/api/service';
import { itemSalesImportRangeSchema } from '@/features/item-sales-target/import/schemas/item-sales-import';

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/item-sales/import/range', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = itemSalesImportRangeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid item sales import range payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const result = await runItemSalesImportRange(parsed.data.fromDate, parsed.data.toDate, {
    forceReplace: parsed.data.forceReplace
  });
  return NextResponse.json({ result });
}
