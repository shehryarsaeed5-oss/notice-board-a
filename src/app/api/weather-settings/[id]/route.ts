import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import {
  setWeatherSettingEnabled,
  updateWeatherSetting
} from '@/features/weather-settings/api/service';
import { weatherSettingSchema } from '@/features/weather-settings/schemas/weather-setting';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/weather-settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = weatherSettingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid weather setting payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const weatherSetting = await updateWeatherSetting(id, parsed.data);

  revalidatePath('/dashboard/weather');

  return NextResponse.json({ weatherSetting });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/weather-settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  const body = await request.json();
  const enabled = body?.enabled;

  if (typeof enabled !== 'boolean') {
    return NextResponse.json(
      {
        message: 'Invalid weather setting payload'
      },
      { status: 400 }
    );
  }

  const weatherSetting = await setWeatherSettingEnabled(id, { enabled });

  revalidatePath('/dashboard/weather');

  return NextResponse.json({ weatherSetting });
}
