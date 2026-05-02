import 'server-only';

import { prisma } from '@/lib/prisma';
import { parseDateTimeInputValue } from '@/lib/date-time';
import type {
  AdvertisementFormValues,
  AdvertisementListFilters,
  AdvertisementListResult
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

function normalizeMediaType(value?: string): 'IMAGE' | 'VIDEO' | undefined {
  if (value === 'IMAGE' || value === 'VIDEO') {
    return value;
  }

  return undefined;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeOptionalDateTime(value?: string): Date | null {
  const trimmed = value?.trim();
  return trimmed ? parseDateTimeInputValue(trimmed) : null;
}

function normalizeOptionalNumber(value?: number | string | null): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeSortOrder(value?: number | string | null): number {
  const normalized = normalizeOptionalNumber(value);
  return normalized ?? 0;
}

function buildWhere(filters: AdvertisementListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);
  const mediaType = normalizeMediaType(filters.mediaType);

  return {
    ...(status ? { status } : {}),
    ...(mediaType ? { mediaType } : {}),
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              mediaUrl: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getAdvertisements(
  filters: AdvertisementListFilters = {}
): Promise<AdvertisementListResult> {
  const where = buildWhere(filters);

  const advertisements = await prisma.advertisement.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }, { title: 'asc' }]
  });

  return {
    advertisements,
    total: advertisements.length
  };
}

export async function createAdvertisement(values: AdvertisementFormValues) {
  return prisma.advertisement.create({
    data: {
      title: normalizeRequiredText(values.title),
      mediaUrl: normalizeRequiredText(values.mediaUrl),
      mediaType: values.mediaType,
      duration: normalizeOptionalNumber(values.duration),
      sortOrder: normalizeSortOrder(values.sortOrder),
      startAt: normalizeOptionalDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });
}

export async function updateAdvertisement(id: string, values: AdvertisementFormValues) {
  return prisma.advertisement.update({
    where: { id },
    data: {
      title: normalizeRequiredText(values.title),
      mediaUrl: normalizeRequiredText(values.mediaUrl),
      mediaType: values.mediaType,
      duration: normalizeOptionalNumber(values.duration),
      sortOrder: normalizeSortOrder(values.sortOrder),
      startAt: normalizeOptionalDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });
}

export async function archiveAdvertisement(id: string) {
  return prisma.advertisement.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });
}
