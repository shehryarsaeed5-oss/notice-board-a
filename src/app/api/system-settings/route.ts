import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import { getSystemSettings, saveSystemSettings } from '@/features/system-settings/api/service';
import { systemSettingsSchema } from '@/features/system-settings/schemas/system-settings';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/system-settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const systemSettings = await getSystemSettings();

  return NextResponse.json({ systemSettings });
}

export async function PUT(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/system-settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = systemSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid system settings payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const systemSettings = await saveSystemSettings(parsed.data);

  revalidatePath('/dashboard/system-settings');

  return NextResponse.json({ systemSettings });
}
