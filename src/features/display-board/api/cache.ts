import { redisGet, redisIncr, redisSet } from '@/lib/redis';
import { normalizeDisplayLayoutConfig } from '@/features/display-pages/lib/display-layout-config';

import type { DisplayBoardData } from './types';

export const DISPLAY_BOARD_CACHE_TTL_SECONDS = 30;
export const DISPLAY_BOARD_REFRESH_TOKEN_KEY = 'display-board:refresh-token';

const FALLBACK_REFRESH_TOKEN = `${Date.now()}`;

interface DisplayBoardCacheEntry {
  version: string;
  data: unknown;
}

function reviveWeather(value: unknown) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const entry = value as Record<string, unknown>;
  const status =
    entry.status === 'ready' || entry.status === 'unavailable' ? entry.status : 'unavailable';
  const iconKey = typeof entry.iconKey === 'string' ? entry.iconKey : 'cloudOff';
  const iconPath =
    typeof entry.iconPath === 'string'
      ? entry.iconPath
      : '/weather-icons/meteocons/not-available.svg';

  return {
    ...entry,
    temperatureC: typeof entry.temperatureC === 'number' ? entry.temperatureC : null,
    condition: typeof entry.condition === 'string' ? entry.condition : null,
    weatherCode: typeof entry.weatherCode === 'number' ? entry.weatherCode : null,
    iconKey,
    iconPath,
    updatedAt: entry.updatedAt ? toDate(entry.updatedAt) : new Date(),
    status
  } as DisplayBoardData['weather'];
}

function toDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }

  return new Date(String(value));
}

function reviveDisplayPage(value: Record<string, unknown>) {
  return {
    ...value,
    createdAt: toDate(value.createdAt),
    updatedAt: toDate(value.updatedAt),
    layoutConfig: normalizeDisplayLayoutConfig(value.layoutConfig)
  };
}

function reviveEvent(value: Record<string, unknown>) {
  return {
    ...value,
    startAt: toDate(value.startAt),
    endAt: value.endAt ? toDate(value.endAt) : null
  };
}

function reviveMeeting(value: Record<string, unknown>) {
  return {
    ...value,
    startAt: toDate(value.startAt),
    endAt: value.endAt ? toDate(value.endAt) : null
  };
}

function reviveMovieSchedule(value: Record<string, unknown>) {
  return {
    ...value,
    showTime: toDate(value.showTime)
  };
}

function reviveAdvertisement(value: Record<string, unknown>) {
  return {
    ...value,
    startAt: value.startAt ? toDate(value.startAt) : null,
    endAt: value.endAt ? toDate(value.endAt) : null
  };
}

function reviveAlert(value: Record<string, unknown>) {
  return {
    ...value,
    startAt: toDate(value.startAt),
    endAt: toDate(value.endAt)
  };
}

function reviveSalesTargetProgress(value: unknown) {
  if (!value || typeof value !== 'object') {
    return {
      targetQty: null,
      soldQty: 0,
      remainingQty: null,
      percent: null,
      dataAvailable: false,
      lastImportAt: null
    };
  }

  const entry = value as Record<string, unknown>;

  return {
    ...entry,
    lastImportAt: entry.lastImportAt ? toDate(entry.lastImportAt) : null
  };
}

function reviveSalesTarget(value: unknown) {
  if (!value || typeof value !== 'object') {
    return {
      id: '',
      itemName: '',
      itemCode: null,
      itemCodes: [],
      startDate: null,
      endDate: null,
      displayOrder: 0,
      calculationMode: null,
      status: 'ACTIVE',
      daily: reviveSalesTargetProgress(null),
      weekly: reviveSalesTargetProgress(null),
      monthly: reviveSalesTargetProgress(null),
      lastImportAt: null,
      lastImportStatus: null
    };
  }

  const entry = value as Record<string, unknown>;
  const toProgress = (progress: unknown) => reviveSalesTargetProgress(progress);

  return {
    ...entry,
    startDate: entry.startDate ? toDate(entry.startDate) : null,
    endDate: entry.endDate ? toDate(entry.endDate) : null,
    lastImportAt: entry.lastImportAt ? toDate(entry.lastImportAt) : null,
    daily: toProgress(entry.daily),
    weekly: toProgress(entry.weekly),
    monthly: toProgress(entry.monthly)
  };
}

function reviveManagerAvailability(value: unknown) {
  if (!value || typeof value !== 'object') {
    return {
      id: '',
      name: '',
      designation: null,
      phone: null,
      sortOrder: 0,
      shift: null,
      status: 'NOT_MARKED',
      remarks: null
    };
  }

  const entry = value as Record<string, unknown>;

  return {
    ...entry,
    designation: typeof entry.designation === 'string' ? entry.designation : null,
    phone: typeof entry.phone === 'string' ? entry.phone : null,
    sortOrder: typeof entry.sortOrder === 'number' ? entry.sortOrder : 0,
    shift: typeof entry.shift === 'string' ? entry.shift : null,
    status:
      entry.status === 'PRESENT' ||
      entry.status === 'ABSENT' ||
      entry.status === 'LEAVE' ||
      entry.status === 'LATE' ||
      entry.status === 'NOT_MARKED'
        ? entry.status
        : 'NOT_MARKED',
    remarks: typeof entry.remarks === 'string' ? entry.remarks : null
  };
}

function reviveDisplayBoardData(data: unknown): DisplayBoardData {
  const board = data as {
    displayPage: Record<string, unknown>;
    generatedAt: string;
    events: { items: Array<Record<string, unknown>>; total: number };
    meetings: { items: Array<Record<string, unknown>>; total: number };
    movieSchedules: { items: Array<Record<string, unknown>>; total: number };
    advertisements: { items: Array<Record<string, unknown>>; total: number };
    alerts?: { items: Array<Record<string, unknown>>; total: number };
    salesTargets?: DisplayBoardData['salesTargets'];
    concessionPriceList?: DisplayBoardData['concessionPriceList'];
    attendance?: DisplayBoardData['attendance'];
    activeManagersWithAttendanceToday?: DisplayBoardData['activeManagersWithAttendanceToday'];
    activeStaffWithAttendanceToday?: DisplayBoardData['activeStaffWithAttendanceToday'];
    weather?: DisplayBoardData['weather'];
    weatherSetting?: DisplayBoardData['weather'];
    attendanceSummary: DisplayBoardData['attendanceSummary'];
  };
  const alerts = board.alerts ?? {
    items: [],
    total: 0
  };
  const salesTargets = board.salesTargets ?? {
    items: [],
    total: 0
  };
  const concessionPriceList = board.concessionPriceList ?? {
    items: [],
    total: 0
  };
  const attendance = board.attendance ?? {
    staff: { items: [], total: 0 },
    managers: { items: [], total: 0 }
  };
  const activeManagersWithAttendanceToday = board.activeManagersWithAttendanceToday ?? {
    items: [],
    total: 0
  };
  const activeStaffWithAttendanceToday = board.activeStaffWithAttendanceToday ?? {
    items: [],
    total: 0
  };

  return {
    displayPage: reviveDisplayPage(board.displayPage) as DisplayBoardData['displayPage'],
    generatedAt: toDate(board.generatedAt),
    events: {
      items: board.events.items.map((item) =>
        reviveEvent(item)
      ) as DisplayBoardData['events']['items'],
      total: board.events.total
    },
    meetings: {
      items: board.meetings.items.map((item) =>
        reviveMeeting(item)
      ) as DisplayBoardData['meetings']['items'],
      total: board.meetings.total
    },
    movieSchedules: {
      items: board.movieSchedules.items.map((item) =>
        reviveMovieSchedule(item)
      ) as DisplayBoardData['movieSchedules']['items'],
      total: board.movieSchedules.total
    },
    advertisements: {
      items: board.advertisements.items.map((item) =>
        reviveAdvertisement(item)
      ) as DisplayBoardData['advertisements']['items'],
      total: board.advertisements.total
    },
    alerts: {
      items: alerts.items.map((item) => reviveAlert(item)) as DisplayBoardData['alerts']['items'],
      total: alerts.total
    },
    salesTargets: {
      items: salesTargets.items.map((item) =>
        reviveSalesTarget(item)
      ) as DisplayBoardData['salesTargets']['items'],
      total: salesTargets.total
    },
    concessionPriceList,
    attendance,
    activeManagersWithAttendanceToday: {
      items: activeManagersWithAttendanceToday.items.map((item) =>
        reviveManagerAvailability(item)
      ) as DisplayBoardData['activeManagersWithAttendanceToday']['items'],
      total: activeManagersWithAttendanceToday.total
    },
    activeStaffWithAttendanceToday,
    weather: reviveWeather(board.weather ?? board.weatherSetting),
    attendanceSummary: board.attendanceSummary
  };
}

export async function getDisplayBoardRefreshToken(): Promise<string> {
  const token = await redisGet(DISPLAY_BOARD_REFRESH_TOKEN_KEY);
  return token ?? FALLBACK_REFRESH_TOKEN;
}

export async function bumpDisplayBoardRefreshToken(): Promise<void> {
  await redisIncr(DISPLAY_BOARD_REFRESH_TOKEN_KEY);
}

export async function invalidateDisplayBoardCache(): Promise<void> {
  await bumpDisplayBoardRefreshToken();
}

export async function getCachedDisplayBoardData(slug: string, version: string) {
  const cached = await redisGet(`display-board:${slug}`);

  if (!cached) {
    return null;
  }

  let parsed: DisplayBoardCacheEntry | null = null;

  try {
    parsed = JSON.parse(cached) as DisplayBoardCacheEntry;
  } catch {
    return null;
  }

  if (!parsed || parsed.version !== version) {
    return null;
  }

  return reviveDisplayBoardData(parsed.data);
}

export async function setCachedDisplayBoardData(
  slug: string,
  version: string,
  data: DisplayBoardData
): Promise<void> {
  const entry: DisplayBoardCacheEntry = {
    version,
    data
  };

  await redisSet(`display-board:${slug}`, JSON.stringify(entry), DISPLAY_BOARD_CACHE_TTL_SECONDS);
}
