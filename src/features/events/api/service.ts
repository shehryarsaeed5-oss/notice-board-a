import 'server-only';

import { prisma } from '@/lib/prisma';
import { parseDateTimeInputValue } from '@/lib/date-time';
import type { EventRecordFormValues, EventRecordListFilters, EventRecordListResult } from './types';

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

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeOptionalDateTime(value?: string): Date | null {
  const trimmed = value?.trim();
  return trimmed ? parseDateTimeInputValue(trimmed) : null;
}

function normalizeRequiredDateTime(value: string): Date {
  return parseDateTimeInputValue(value.trim());
}

function buildWhere(filters: EventRecordListFilters) {
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
              clientName: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              companyName: {
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

export async function getEventRecords(
  filters: EventRecordListFilters = {}
): Promise<EventRecordListResult> {
  const where = buildWhere(filters);

  const events = await prisma.eventRecord.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }, { title: 'asc' }]
  });

  return {
    events,
    total: events.length
  };
}

export async function createEventRecord(values: EventRecordFormValues) {
  return prisma.eventRecord.create({
    data: {
      title: values.title.trim(),
      clientName: normalizeOptionalText(values.clientName),
      companyName: normalizeOptionalText(values.companyName),
      screenName: normalizeOptionalText(values.screenName),
      startAt: normalizeRequiredDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });
}

export async function updateEventRecord(id: string, values: EventRecordFormValues) {
  return prisma.eventRecord.update({
    where: { id },
    data: {
      title: values.title.trim(),
      clientName: normalizeOptionalText(values.clientName),
      companyName: normalizeOptionalText(values.companyName),
      screenName: normalizeOptionalText(values.screenName),
      startAt: normalizeRequiredDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });
}

export async function archiveEventRecord(id: string) {
  return prisma.eventRecord.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });
}
