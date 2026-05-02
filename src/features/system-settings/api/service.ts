import 'server-only';

import { prisma } from '@/lib/prisma';
import { invalidateDisplayBoardCache } from '@/features/display-board/api/cache';
import { normalizeDisplayPageSlug } from '@/features/display-pages/lib/slug';

import {
  SYSTEM_SETTING_KEYS,
  type SystemSettingRecord,
  type SystemSettingsResult,
  type SystemSettingsValues,
  type SystemSettingTimezone
} from './types';
import type { SystemSettingsFormValues } from '../schemas/system-settings';

const DEFAULT_SYSTEM_SETTINGS: SystemSettingsValues = {
  siteName: 'Cinema Notice Board',
  displayRefreshSeconds: 60,
  businessDayCutoffHour: 6,
  defaultDisplaySlug: 'lobby-main',
  timezone: 'Asia/Karachi',
  companyName: 'Cinema Notice Board'
};

interface SystemSettingRow {
  id: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

function toSystemSettingRecord(row: SystemSettingRow): SystemSettingRecord | null {
  if (!SYSTEM_SETTING_KEYS.includes(row.key as (typeof SYSTEM_SETTING_KEYS)[number])) {
    return null;
  }

  return {
    id: row.id,
    key: row.key as SystemSettingRecord['key'],
    value: row.value,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function normalizeInteger(value: string | null | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    return fallback;
  }

  return parsed;
}

function normalizePositiveInteger(value: string | null | undefined, fallback: number): number {
  const parsed = normalizeInteger(value, fallback);
  return parsed > 0 ? parsed : fallback;
}

function normalizeTimezone(value: string | null | undefined): SystemSettingTimezone {
  if (
    value === 'Asia/Karachi' ||
    value === 'UTC' ||
    value === 'Asia/Dubai' ||
    value === 'Asia/Kolkata' ||
    value === 'Asia/Singapore' ||
    value === 'Europe/London' ||
    value === 'America/New_York'
  ) {
    return value;
  }

  return DEFAULT_SYSTEM_SETTINGS.timezone;
}

function buildSettingsMap(rows: SystemSettingRecord[]) {
  return new Map(rows.map((row) => [row.key, row.value] as const));
}

function readRequiredText(
  settingsMap: Map<SystemSettingRecord['key'], string>,
  key: SystemSettingRecord['key'],
  fallback: string
): string {
  const value = settingsMap.get(key)?.trim();
  return value ? value : fallback;
}

function readOptionalText(
  settingsMap: Map<SystemSettingRecord['key'], string>,
  key: SystemSettingRecord['key'],
  fallback: string
): string {
  if (!settingsMap.has(key)) {
    return fallback;
  }

  const value = settingsMap.get(key)?.trim() ?? '';
  return value;
}

async function getCurrentSystemSettingRows(): Promise<SystemSettingRecord[]> {
  const rows = await prisma.systemSetting.findMany({
    where: {
      key: {
        in: [...SYSTEM_SETTING_KEYS]
      }
    },
    orderBy: {
      key: 'asc'
    }
  });

  return rows
    .map((row) => toSystemSettingRecord(row))
    .filter((row): row is SystemSettingRecord => row !== null);
}

export async function getSystemSettings(): Promise<SystemSettingsResult> {
  const rows = await getCurrentSystemSettingRows();
  const settingsMap = buildSettingsMap(rows);

  return {
    hasSavedSettings: rows.length > 0,
    values: {
      siteName: readRequiredText(settingsMap, 'siteName', DEFAULT_SYSTEM_SETTINGS.siteName),
      displayRefreshSeconds: normalizePositiveInteger(
        settingsMap.get('displayRefreshSeconds'),
        DEFAULT_SYSTEM_SETTINGS.displayRefreshSeconds
      ),
      businessDayCutoffHour: Math.min(
        23,
        Math.max(
          0,
          normalizeInteger(
            settingsMap.get('businessDayCutoffHour'),
            DEFAULT_SYSTEM_SETTINGS.businessDayCutoffHour
          )
        )
      ),
      defaultDisplaySlug: settingsMap.has('defaultDisplaySlug')
        ? normalizeDisplayPageSlug(settingsMap.get('defaultDisplaySlug') ?? '')
        : DEFAULT_SYSTEM_SETTINGS.defaultDisplaySlug,
      timezone: normalizeTimezone(settingsMap.get('timezone')),
      companyName: readOptionalText(settingsMap, 'companyName', DEFAULT_SYSTEM_SETTINGS.companyName)
    }
  };
}

function normalizeOptionalValue(value: string | undefined): string {
  return value?.trim() ? value.trim() : '';
}

export async function saveSystemSettings(
  values: SystemSettingsFormValues
): Promise<SystemSettingsResult> {
  const rows = [
    {
      key: 'siteName',
      value: values.siteName.trim()
    },
    {
      key: 'displayRefreshSeconds',
      value: String(values.displayRefreshSeconds)
    },
    {
      key: 'businessDayCutoffHour',
      value: String(values.businessDayCutoffHour)
    },
    {
      key: 'defaultDisplaySlug',
      value: values.defaultDisplaySlug ? normalizeDisplayPageSlug(values.defaultDisplaySlug) : ''
    },
    {
      key: 'timezone',
      value: values.timezone
    },
    {
      key: 'companyName',
      value: normalizeOptionalValue(values.companyName)
    }
  ] as const;

  await prisma.$transaction(
    rows.map((row) =>
      prisma.systemSetting.upsert({
        where: { key: row.key },
        create: {
          key: row.key,
          value: row.value
        },
        update: {
          value: row.value
        }
      })
    )
  );

  await invalidateDisplayBoardCache();

  return getSystemSettings();
}
