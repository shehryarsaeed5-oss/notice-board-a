import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import { runItemSalesImportToday } from '@/features/item-sales-target/import/api/service';

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/item-sales/import/today', request.method);
  if (forbidden) {
    return forbidden;
  }

  await request.json().catch(() => null);
  const result = await runItemSalesImportToday();
  return NextResponse.json({ result });
}
