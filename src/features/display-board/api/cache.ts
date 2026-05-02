import { redisGet, redisIncr, redisSet } from '@/lib/redis';

import type { DisplayBoardData } from './types';

export const DISPLAY_BOARD_CACHE_TTL_SECONDS = 30;
export const DISPLAY_BOARD_REFRESH_TOKEN_KEY = 'display-board:refresh-token';

const FALLBACK_REFRESH_TOKEN = `${Date.now()}`;

interface DisplayBoardCacheEntry {
  version: string;
  data: unknown;
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
    updatedAt: toDate(value.updatedAt)
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

function reviveDisplayBoardData(data: unknown): DisplayBoardData {
  const board = data as {
    displayPage: Record<string, unknown>;
    generatedAt: string;
    events: { items: Array<Record<string, unknown>>; total: number };
    meetings: { items: Array<Record<string, unknown>>; total: number };
    movieSchedules: { items: Array<Record<string, unknown>>; total: number };
    advertisements: { items: Array<Record<string, unknown>>; total: number };
    salesTargets: DisplayBoardData['salesTargets'];
    weatherSetting: DisplayBoardData['weatherSetting'];
    attendanceSummary: DisplayBoardData['attendanceSummary'];
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
    salesTargets: board.salesTargets,
    weatherSetting: board.weatherSetting,
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
