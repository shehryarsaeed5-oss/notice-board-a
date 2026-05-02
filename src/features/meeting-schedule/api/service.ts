import 'server-only';

import { prisma } from '@/lib/prisma';
import { parseDateTimeInputValue } from '@/lib/date-time';
import type {
  MeetingScheduleFormValues,
  MeetingScheduleListFilters,
  MeetingScheduleListResult
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

function buildWhere(filters: MeetingScheduleListFilters) {
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
              location: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              organizer: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getMeetingSchedules(
  filters: MeetingScheduleListFilters = {}
): Promise<MeetingScheduleListResult> {
  const where = buildWhere(filters);

  const meetings = await prisma.meetingSchedule.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }, { title: 'asc' }]
  });

  return {
    meetings,
    total: meetings.length
  };
}

export async function createMeetingSchedule(values: MeetingScheduleFormValues) {
  return prisma.meetingSchedule.create({
    data: {
      title: values.title.trim(),
      location: normalizeOptionalText(values.location),
      organizer: normalizeOptionalText(values.organizer),
      startAt: normalizeRequiredDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });
}

export async function updateMeetingSchedule(id: string, values: MeetingScheduleFormValues) {
  return prisma.meetingSchedule.update({
    where: { id },
    data: {
      title: values.title.trim(),
      location: normalizeOptionalText(values.location),
      organizer: normalizeOptionalText(values.organizer),
      startAt: normalizeRequiredDateTime(values.startAt),
      endAt: normalizeOptionalDateTime(values.endAt),
      status: values.status
    }
  });
}

export async function archiveMeetingSchedule(id: string) {
  return prisma.meetingSchedule.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });
}
