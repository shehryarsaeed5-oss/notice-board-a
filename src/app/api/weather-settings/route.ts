import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import { createWeatherSetting, getWeatherSetting } from '@/features/weather-settings/api/service';
import { weatherSettingSchema } from '@/features/weather-settings/schemas/weather-setting';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/weather-settings', request.method);
  if (forbidden) {
    return forbidden;
  }

  const weatherSetting = await getWeatherSetting();

  return NextResponse.json({ weatherSetting });
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/weather-settings', request.method);
  if (forbidden) {
    return forbidden;
  }

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

  const weatherSetting = await createWeatherSetting(parsed.data);

  revalidatePath('/dashboard/weather');

  return NextResponse.json({ weatherSetting }, { status: 201 });
}
