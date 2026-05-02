import 'server-only';

import { prisma } from '@/lib/prisma';
import { parseDateTimeInputValue } from '@/lib/date-time';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
import { endOfDay, parseDateInputValue, startOfDay } from '../lib/date';
import type {
  MovieScheduleFormValues,
  MovieScheduleListFilters,
  MovieScheduleListResult
} from './types';

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | undefined {
  if (value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED') {
    return value;
  }

  return undefined;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function buildWhere(filters: MovieScheduleListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);
  const showDate = parseDateInputValue(filters.showDate);

  return {
    ...(status ? { status } : {}),
    ...(showDate
      ? {
          showTime: {
            gte: startOfDay(showDate),
            lt: endOfDay(showDate)
          }
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              movieName: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              screenName: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getMovieSchedules(
  filters: MovieScheduleListFilters = {}
): Promise<MovieScheduleListResult> {
  const where = buildWhere(filters);

  const movieSchedules = await prisma.movieSchedule.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }, { showTime: 'asc' }, { movieName: 'asc' }]
  });

  return {
    movieSchedules,
    total: movieSchedules.length
  };
}

export async function createMovieSchedule(values: MovieScheduleFormValues) {
  const movieSchedule = await prisma.movieSchedule.create({
    data: {
      movieName: normalizeRequiredText(values.movieName),
      screenName: normalizeRequiredText(values.screenName),
      showTime: parseDateTimeInputValue(values.showTime.trim()),
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return movieSchedule;
}

export async function updateMovieSchedule(id: string, values: MovieScheduleFormValues) {
  const movieSchedule = await prisma.movieSchedule.update({
    where: { id },
    data: {
      movieName: normalizeRequiredText(values.movieName),
      screenName: normalizeRequiredText(values.screenName),
      showTime: parseDateTimeInputValue(values.showTime.trim()),
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return movieSchedule;
}

export async function archiveMovieSchedule(id: string) {
  const movieSchedule = await prisma.movieSchedule.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await bumpDisplayBoardRefreshToken();

  return movieSchedule;
}
