import 'server-only';

import { prisma } from '@/lib/prisma';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
import type {
  WeatherSettingFormValues,
  WeatherSettingRecord,
  WeatherSettingToggleValues
} from './types';

interface WeatherSettingRow {
  id: string;
  city: string;
  provider: string;
  apiKey: string | null;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeProvider(value: string): 'openweather' | 'weatherapi' | 'openmeteo' {
  if (value === 'openweather' || value === 'weatherapi' || value === 'openmeteo') {
    return value;
  }

  throw new Error('Invalid weather provider');
}

function normalizeEnabled(value: boolean): boolean {
  return value === true;
}

function toWeatherSettingRecord(row: WeatherSettingRow | null): WeatherSettingRecord | null {
  if (!row) {
    return null;
  }

  return {
    ...row,
    provider: normalizeProvider(row.provider)
  };
}

async function getFirstWeatherSetting(): Promise<WeatherSettingRecord | null> {
  const weatherSetting = await prisma.weatherSetting.findFirst({
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }]
  });

  return toWeatherSettingRecord(weatherSetting);
}

export async function getWeatherSetting(): Promise<WeatherSettingRecord | null> {
  return getFirstWeatherSetting();
}

export async function createWeatherSetting(values: WeatherSettingFormValues) {
  const weatherSetting = await prisma.weatherSetting.create({
    data: {
      city: normalizeRequiredText(values.city),
      provider: normalizeProvider(values.provider),
      apiKey: normalizeOptionalText(values.apiKey),
      enabled: normalizeEnabled(values.enabled)
    }
  });

  await bumpDisplayBoardRefreshToken();

  return toWeatherSettingRecord(weatherSetting)!;
}

export async function updateWeatherSetting(id: string, values: WeatherSettingFormValues) {
  const weatherSetting = await prisma.weatherSetting.update({
    where: { id },
    data: {
      city: normalizeRequiredText(values.city),
      provider: normalizeProvider(values.provider),
      apiKey: normalizeOptionalText(values.apiKey),
      enabled: normalizeEnabled(values.enabled)
    }
  });

  await bumpDisplayBoardRefreshToken();

  return toWeatherSettingRecord(weatherSetting)!;
}

export async function setWeatherSettingEnabled(id: string, values: WeatherSettingToggleValues) {
  const weatherSetting = await prisma.weatherSetting.update({
    where: { id },
    data: {
      enabled: normalizeEnabled(values.enabled)
    }
  });

  await bumpDisplayBoardRefreshToken();

  return toWeatherSettingRecord(weatherSetting)!;
}
