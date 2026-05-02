export const SYSTEM_SETTING_KEYS = [
  'siteName',
  'displayRefreshSeconds',
  'businessDayCutoffHour',
  'defaultDisplaySlug',
  'timezone',
  'companyName'
] as const;

export type SystemSettingKey = (typeof SYSTEM_SETTING_KEYS)[number];

export const TIMEZONE_OPTIONS = [
  'Asia/Karachi',
  'UTC',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Europe/London',
  'America/New_York'
] as const;

export type SystemSettingTimezone = (typeof TIMEZONE_OPTIONS)[number];

export interface SystemSettingRecord {
  id: string;
  key: SystemSettingKey;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemSettingsValues {
  siteName: string;
  displayRefreshSeconds: number;
  businessDayCutoffHour: number;
  defaultDisplaySlug: string;
  timezone: SystemSettingTimezone;
  companyName: string;
}

export interface SystemSettingsResult {
  values: SystemSettingsValues;
  hasSavedSettings: boolean;
}
