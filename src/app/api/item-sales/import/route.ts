import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import { getItemSalesImportOverview } from '@/features/item-sales-target/import/api/service';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/item-sales/import', request.method);
  if (forbidden) {
    return forbidden;
  }

  const date = request.nextUrl.searchParams.get('date') ?? undefined;
  const overview = await getItemSalesImportOverview(date);

  return NextResponse.json(overview);
}
