import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import {
  getItemSalesImportSettings,
  saveItemSalesImportSettings
} from '@/features/item-sales-target/import/api/service';
import { itemSalesImportSettingsSchema } from '@/features/item-sales-target/import/schemas/item-sales-import';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/item-sales/settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const monitor = await getItemSalesImportSettings();
  return NextResponse.json({ monitor });
}

export async function PATCH(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/item-sales/settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = itemSalesImportSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid item sales import settings payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const monitor = await saveItemSalesImportSettings(parsed.data);
  return NextResponse.json({ monitor });
}
