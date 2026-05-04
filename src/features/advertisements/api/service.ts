import 'server-only';

import { prisma } from '@/lib/prisma';
import { parseDateTimeInputValue } from '@/lib/date-time';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
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

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
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

function buildWhere(filters: AdvertisementListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);

  return {
    ...(status ? { status } : {}),
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
              contactPerson: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              phone: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              adLocation: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              remarks: {
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
    orderBy: [{ title: 'asc' }, { createdAt: 'desc' }]
  });

  return {
    advertisements,
    total: advertisements.length
  };
}

export async function createAdvertisement(values: AdvertisementFormValues) {
  const advertisement = await prisma.advertisement.create({
    data: {
      title: normalizeRequiredText(values.title),
      contactPerson: normalizeOptionalText(values.contactPerson),
      phone: normalizeOptionalText(values.phone),
      contractAmount: normalizeOptionalNumber(values.contractAmount),
      adLocation: normalizeOptionalText(values.adLocation),
      remarks: normalizeOptionalText(values.remarks),
      startAt: normalizeOptionalDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return advertisement;
}

export async function updateAdvertisement(id: string, values: AdvertisementFormValues) {
  const advertisement = await prisma.advertisement.update({
    where: { id },
    data: {
      title: normalizeRequiredText(values.title),
      contactPerson: normalizeOptionalText(values.contactPerson),
      phone: normalizeOptionalText(values.phone),
      contractAmount: normalizeOptionalNumber(values.contractAmount),
      adLocation: normalizeOptionalText(values.adLocation),
      remarks: normalizeOptionalText(values.remarks),
      startAt: normalizeOptionalDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return advertisement;
}

export async function archiveAdvertisement(id: string) {
  const advertisement = await prisma.advertisement.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await bumpDisplayBoardRefreshToken();

  return advertisement;
}
