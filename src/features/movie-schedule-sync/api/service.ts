import 'server-only';

import { randomUUID } from 'crypto';
import { format } from 'date-fns';

import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
import { parseDateInputValue } from '@/features/movie-schedule/lib/date';
import { prisma } from '@/lib/prisma';

import { DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL, MOVIE_SCHEDULE_SYNC_SETTING_ID } from '../constants';
import type {
  MovieScheduleSyncLogRecord,
  MovieScheduleSyncOverview,
  MovieScheduleSyncRunValues,
  MovieScheduleSyncSettingRecord,
  MovieScheduleSyncSettingValues,
  MovieScheduleSyncedRowRecord
} from './types';

export class MovieScheduleSyncServiceError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'MovieScheduleSyncServiceError';
    this.status = status;
  }
}

export class MovieScheduleSyncNotFoundError extends MovieScheduleSyncServiceError {
  constructor() {
    super('Movie schedule sync setting not found.', 404);
    this.name = 'MovieScheduleSyncNotFoundError';
  }
}

const SYNC_PAGE_SIZE = 10;

function normalizeDateString(value?: string): string {
  const parsed = parseDateInputValue(value);

  if (parsed) {
    return format(parsed, 'yyyy-MM-dd');
  }

  return format(new Date(), 'yyyy-MM-dd');
}

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeApiUrl(value?: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL;
}

function toDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeTimeToHHmm(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const amPmMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (amPmMatch) {
    const hours = Number(amPmMatch[1]);
    const minutes = Number(amPmMatch[2]);
    const isPm = amPmMatch[3].toUpperCase() === 'PM';

    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      const normalizedHours = (hours % 12) + (isPm ? 12 : 0);
      return `${String(normalizedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
  }

  const twentyFourHourMatch = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);
    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return format(parsed, 'HH:mm');
  }

  return null;
}

function combineDateAndTime(showDate: string, showTime: string): Date | null {
  const parsedShowDate = parseDateInputValue(showDate);
  const normalizedTime = normalizeTimeToHHmm(showTime);

  if (!parsedShowDate || !normalizedTime) {
    return null;
  }

  const combined = new Date(`${format(parsedShowDate, 'yyyy-MM-dd')}T${normalizedTime}:00`);
  return Number.isNaN(combined.getTime()) ? null : combined;
}

function isActiveValue(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim().toUpperCase();
    return trimmed ? !['FALSE', 'INACTIVE', 'ARCHIVED', 'DISABLED'].includes(trimmed) : true;
  }

  return true;
}

function getStringValue(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function getMovieName(raw: Record<string, unknown>): string | null {
  return (
    getStringValue(raw.movieName) ??
    getStringValue(raw.title) ??
    getStringValue(raw.name) ??
    getStringValue(raw.movieTitle)
  );
}

function getScreenName(raw: Record<string, unknown>): string | null {
  return (
    getStringValue(raw.screenName) ??
    getStringValue(raw.screen) ??
    getStringValue(raw.location) ??
    getStringValue(raw.house)
  );
}

function getShowDate(raw: Record<string, unknown>, fallbackDate: string): string {
  const direct =
    getStringValue(raw.showDate) ?? getStringValue(raw.date) ?? getStringValue(raw.day);
  const parsed = parseDateInputValue(direct ?? fallbackDate);

  return parsed ? format(parsed, 'yyyy-MM-dd') : fallbackDate;
}

function getShowTime(raw: Record<string, unknown>, showDateTime: Date | null): string {
  if (showDateTime) {
    return format(showDateTime, 'HH:mm');
  }

  return (
    normalizeTimeToHHmm(raw.showTime) ??
    normalizeTimeToHHmm(raw.time) ??
    normalizeTimeToHHmm(raw.startTime) ??
    normalizeTimeToHHmm(raw.start) ??
    '00:00'
  );
}

function buildSourceKey(raw: Record<string, unknown>, fallbackKey: string): string {
  const sourceKey =
    getStringValue(raw.sourceKey) ??
    getStringValue(raw.id) ??
    getStringValue(raw.key) ??
    getStringValue(raw.uuid) ??
    fallbackKey;

  return sourceKey;
}

function normalizeRow(
  raw: Record<string, unknown>,
  fallbackDate: string,
  index: number,
  inheritedMovieName?: string
) {
  const movieName = inheritedMovieName ?? getMovieName(raw);
  const screenName = getScreenName(raw);

  if (!movieName || !screenName) {
    return null;
  }

  const showDateTime =
    toDate(raw.showDateTime) ??
    toDate(raw.datetime) ??
    toDate(raw.startDateTime) ??
    toDate(raw.start_at) ??
    combineDateAndTime(
      getShowDate(raw, fallbackDate),
      getStringValue(raw.showTime) ??
        getStringValue(raw.time) ??
        getStringValue(raw.startTime) ??
        ''
    );

  const showDate = getShowDate(raw, fallbackDate);
  const showTime = getShowTime(raw, showDateTime);
  const sourceKey = `${showDate}:${buildSourceKey(
    raw,
    `${movieName}:${screenName}:${showTime}:${index}`
  )}`;

  return {
    sourceKey,
    movieName: normalizeRequiredText(movieName),
    normalizedMovieName: movieName.trim().toLowerCase(),
    screenName: normalizeRequiredText(screenName),
    showDate,
    showTime,
    showDateTime,
    isActive: isActiveValue(raw.isActive ?? raw.active ?? raw.enabled ?? raw.status),
    syncBatchId: null
  };
}

function collectRows(payload: unknown, fallbackDate: string): Array<Record<string, unknown>> {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload.flatMap((item) => collectRows(item, fallbackDate));
  }

  if (typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;
  const arraysToInspect = [
    'rows',
    'data',
    'items',
    'results',
    'movies',
    'showtimes',
    'screenTimes'
  ];
  for (const key of arraysToInspect) {
    const value = record[key];
    if (Array.isArray(value)) {
      if (key === 'screenTimes' || key === 'showtimes') {
        const parentMovieName = getMovieName(record);
        return value.flatMap((item) => collectRows({ ...record, ...item }, fallbackDate));
      }

      const nestedRows = value.flatMap((item) => collectRows(item, fallbackDate));
      if (nestedRows.length > 0) {
        return nestedRows;
      }
    }
  }

  if (getMovieName(record) && (getScreenName(record) || record.showTime || record.showDateTime)) {
    return [record];
  }

  return Object.values(record).flatMap((value) => collectRows(value, fallbackDate));
}

function normalizeResponseRows(payload: unknown, showDate: string) {
  const collected = collectRows(payload, showDate);
  const normalized = collected
    .map((row, index) => normalizeRow(row, showDate, index))
    .filter((row): row is NonNullable<ReturnType<typeof normalizeRow>> => !!row);

  const unique = new Map<string, NonNullable<ReturnType<typeof normalizeRow>>>();

  for (const row of normalized) {
    if (!unique.has(row.sourceKey)) {
      unique.set(row.sourceKey, row);
    }
  }

  return [...unique.values()];
}

function mapSettingRecord(record: {
  id: string;
  enabled: boolean;
  sourceType: string;
  apiUrl: string | null;
  apiToken: string | null;
  lastSyncAt: Date | null;
  lastSyncStatus: string | null;
  lastSyncMessage: string | null;
  lastSyncCount: number;
  createdAt: Date;
  updatedAt: Date;
}): MovieScheduleSyncSettingRecord {
  return {
    id: record.id,
    enabled: record.enabled,
    sourceType: record.sourceType as MovieScheduleSyncSettingRecord['sourceType'],
    apiUrl: record.apiUrl ?? DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL,
    apiTokenSet: !!record.apiToken,
    lastSyncAt: record.lastSyncAt,
    lastSyncStatus: record.lastSyncStatus,
    lastSyncMessage: record.lastSyncMessage,
    lastSyncCount: record.lastSyncCount,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

function mapSyncedRowRecord(record: {
  id: string;
  sourceKey: string;
  movieName: string;
  normalizedMovieName: string | null;
  screenName: string;
  showDate: string;
  showTime: string;
  showDateTime: Date | null;
  isActive: boolean;
  syncBatchId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): MovieScheduleSyncedRowRecord {
  return {
    ...record
  };
}

function mapSyncLogRecord(record: {
  id: string;
  status: string;
  message: string | null;
  rowCount: number;
  startedAt: Date;
  finishedAt: Date | null;
  createdAt: Date;
}): MovieScheduleSyncLogRecord {
  return {
    ...record
  };
}

async function getSettingRecord() {
  const setting = await prisma.movieScheduleSyncSetting.findUnique({
    where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID }
  });

  return (
    setting ?? {
      id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
      enabled: false,
      sourceType: 'digital_signage_api',
      apiUrl: DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL,
      apiToken: null,
      lastSyncAt: null,
      lastSyncStatus: null,
      lastSyncMessage: null,
      lastSyncCount: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0)
    }
  );
}

async function getPreviewRows(showDate: string) {
  const rows = await prisma.movieScheduleSyncedRow.findMany({
    where: {
      showDate,
      isActive: true
    },
    orderBy: [{ showDateTime: 'asc' }, { movieName: 'asc' }, { screenName: 'asc' }]
  });

  return rows.map(mapSyncedRowRecord);
}

async function getLogs() {
  const logs = await prisma.movieScheduleSyncLog.findMany({
    orderBy: [{ startedAt: 'desc' }, { createdAt: 'desc' }],
    take: SYNC_PAGE_SIZE
  });

  return logs.map(mapSyncLogRecord);
}

export async function getMovieScheduleSyncOverview(
  showDate?: string
): Promise<MovieScheduleSyncOverview> {
  const selectedDate = normalizeDateString(showDate);

  const [settingRecord, syncedRows, logs] = await Promise.all([
    getSettingRecord(),
    getPreviewRows(selectedDate),
    getLogs()
  ]);

  return {
    setting: mapSettingRecord(settingRecord),
    syncedRows,
    logs,
    selectedDate
  };
}

export async function getEnabledSyncedMovieScheduleRowsForDate(
  showDate?: string
): Promise<MovieScheduleSyncedRowRecord[]> {
  const selectedDate = normalizeDateString(showDate);
  const setting = await prisma.movieScheduleSyncSetting.findUnique({
    where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID },
    select: { enabled: true }
  });

  if (!setting?.enabled) {
    return [];
  }

  const rows = await prisma.movieScheduleSyncedRow.findMany({
    where: {
      showDate: selectedDate,
      isActive: true
    },
    orderBy: [{ showDateTime: 'asc' }, { movieName: 'asc' }, { screenName: 'asc' }],
    take: 10
  });

  return rows.map(mapSyncedRowRecord);
}

export async function updateMovieScheduleSyncSetting(values: MovieScheduleSyncSettingValues) {
  const existing = await prisma.movieScheduleSyncSetting.findUnique({
    where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID }
  });

  const setting = await prisma.movieScheduleSyncSetting.upsert({
    where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID },
    create: {
      id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
      enabled: values.enabled,
      sourceType: values.sourceType,
      apiUrl: normalizeApiUrl(values.apiUrl),
      apiToken: normalizeOptionalText(values.apiToken)
    },
    update: {
      enabled: values.enabled,
      sourceType: values.sourceType,
      apiUrl: normalizeApiUrl(values.apiUrl),
      apiToken:
        values.apiToken && values.apiToken.trim()
          ? values.apiToken.trim()
          : (existing?.apiToken ?? null)
    }
  });

  await bumpDisplayBoardRefreshToken();

  return mapSettingRecord(setting);
}

export async function clearMovieScheduleSyncedRows() {
  const result = await prisma.movieScheduleSyncedRow.deleteMany({});

  await prisma.movieScheduleSyncSetting.upsert({
    where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID },
    create: {
      id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
      enabled: false,
      sourceType: 'digital_signage_api',
      apiUrl: DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL,
      apiToken: null,
      lastSyncAt: new Date(),
      lastSyncStatus: 'CLEARED',
      lastSyncMessage: 'Synced rows cleared manually',
      lastSyncCount: 0
    },
    update: {
      lastSyncAt: new Date(),
      lastSyncStatus: 'CLEARED',
      lastSyncMessage: 'Synced rows cleared manually',
      lastSyncCount: 0
    }
  });

  await prisma.movieScheduleSyncLog.create({
    data: {
      status: 'CLEARED',
      message: 'Synced rows cleared manually',
      rowCount: result.count,
      startedAt: new Date(),
      finishedAt: new Date()
    }
  });

  await bumpDisplayBoardRefreshToken();

  return result.count;
}

export async function runMovieScheduleSync(values: MovieScheduleSyncRunValues) {
  const selectedDate = normalizeDateString(values.showDate);
  const settingRecord = await prisma.movieScheduleSyncSetting.findUnique({
    where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID }
  });
  const setting = mapSettingRecord(
    settingRecord ?? {
      id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
      enabled: false,
      sourceType: 'digital_signage_api',
      apiUrl: DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL,
      apiToken: null,
      lastSyncAt: null,
      lastSyncStatus: null,
      lastSyncMessage: null,
      lastSyncCount: 0,
      createdAt: new Date(0),
      updatedAt: new Date(0)
    }
  );

  const startedAt = new Date();
  const syncBatchId = randomUUID();
  const log = await prisma.movieScheduleSyncLog.create({
    data: {
      status: 'RUNNING',
      message: `Sync started for ${selectedDate}`,
      rowCount: 0,
      startedAt
    }
  });

  try {
    const apiUrl = normalizeApiUrl(setting.apiUrl);
    const sourceUrl = new URL(apiUrl);
    sourceUrl.searchParams.set('date', selectedDate);

    if (settingRecord?.apiToken?.trim()) {
      sourceUrl.searchParams.set('token', settingRecord.apiToken.trim());
    }

    const response = await fetch(sourceUrl.toString(), {
      headers: settingRecord?.apiToken?.trim()
        ? {
            Authorization: `Bearer ${settingRecord.apiToken.trim()}`
          }
        : undefined
    });

    if (!response.ok) {
      throw new MovieScheduleSyncServiceError(
        `Source API returned ${response.status} ${response.statusText}`,
        502
      );
    }

    const payload = await response.json().catch(() => null);
    const normalizedRows = normalizeResponseRows(payload, selectedDate).map((row) => ({
      ...row,
      syncBatchId
    }));

    if (normalizedRows.length === 0) {
      await prisma.movieScheduleSyncSetting.upsert({
        where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID },
        create: {
          id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
          enabled: setting.enabled,
          sourceType: setting.sourceType,
          apiUrl: setting.apiUrl,
          apiToken: setting.apiTokenSet ? (settingRecord?.apiToken ?? null) : null,
          lastSyncAt: new Date(),
          lastSyncStatus: 'EMPTY',
          lastSyncMessage: 'Source returned no rows for the selected date',
          lastSyncCount: 0
        },
        update: {
          lastSyncAt: new Date(),
          lastSyncStatus: 'EMPTY',
          lastSyncMessage: 'Source returned no rows for the selected date',
          lastSyncCount: 0
        }
      });

      await prisma.movieScheduleSyncLog.update({
        where: { id: log.id },
        data: {
          status: 'EMPTY',
          message: 'Source returned no rows for the selected date',
          rowCount: 0,
          finishedAt: new Date()
        }
      });

      return getMovieScheduleSyncOverview(selectedDate);
    }

    await prisma.$transaction(async (tx) => {
      await tx.movieScheduleSyncedRow.deleteMany({
        where: {
          showDate: selectedDate
        }
      });

      await tx.movieScheduleSyncedRow.createMany({
        data: normalizedRows,
        skipDuplicates: true
      });

      await tx.movieScheduleSyncSetting.upsert({
        where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID },
        create: {
          id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
          enabled: setting.enabled,
          sourceType: setting.sourceType,
          apiUrl: setting.apiUrl,
          apiToken: setting.apiTokenSet ? (settingRecord?.apiToken ?? null) : null,
          lastSyncAt: new Date(),
          lastSyncStatus: 'SUCCESS',
          lastSyncMessage: `Synced ${normalizedRows.length} row(s)`,
          lastSyncCount: normalizedRows.length
        },
        update: {
          lastSyncAt: new Date(),
          lastSyncStatus: 'SUCCESS',
          lastSyncMessage: `Synced ${normalizedRows.length} row(s)`,
          lastSyncCount: normalizedRows.length
        }
      });

      await tx.movieScheduleSyncLog.update({
        where: { id: log.id },
        data: {
          status: 'SUCCESS',
          message: `Synced ${normalizedRows.length} row(s)`,
          rowCount: normalizedRows.length,
          finishedAt: new Date()
        }
      });
    });

    await bumpDisplayBoardRefreshToken();

    return getMovieScheduleSyncOverview(selectedDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Movie schedule sync failed';

    await prisma.movieScheduleSyncSetting.upsert({
      where: { id: MOVIE_SCHEDULE_SYNC_SETTING_ID },
      create: {
        id: MOVIE_SCHEDULE_SYNC_SETTING_ID,
        enabled: setting.enabled,
        sourceType: setting.sourceType,
        apiUrl: setting.apiUrl,
        apiToken: setting.apiTokenSet ? (settingRecord?.apiToken ?? null) : null,
        lastSyncAt: new Date(),
        lastSyncStatus: 'FAILED',
        lastSyncMessage: message,
        lastSyncCount: 0
      },
      update: {
        lastSyncAt: new Date(),
        lastSyncStatus: 'FAILED',
        lastSyncMessage: message,
        lastSyncCount: 0
      }
    });

    await prisma.movieScheduleSyncLog.update({
      where: { id: log.id },
      data: {
        status: 'FAILED',
        message,
        rowCount: 0,
        finishedAt: new Date()
      }
    });

    throw new MovieScheduleSyncServiceError(message, 502);
  }
}
