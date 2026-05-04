import 'server-only';

import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { getActiveAlerts } from '@/features/alerts/api/service';
import { getEnabledSyncedMovieScheduleRowsForDate } from '@/features/movie-schedule-sync/api/service';
import { getItemSalesTargetDisplaySummaryForDisplay } from '@/features/item-sales-target/import/api/service';

import {
  getCachedDisplayBoardData,
  getDisplayBoardRefreshToken,
  setCachedDisplayBoardData
} from './cache';
import { endOfDay, startOfDay } from '../lib/date';
import type {
  DisplayBoardAdvertisementItem,
  DisplayBoardAlertItem,
  DisplayBoardAttendanceSummary,
  DisplayBoardConcessionPriceItem,
  DisplayBoardAttendanceManagerItem,
  DisplayBoardAttendanceStaffItem,
  DisplayBoardData,
  DisplayBoardEventItem,
  DisplayBoardMeetingItem,
  DisplayBoardMovieItem,
  DisplayBoardResult,
  DisplayBoardSalesTargetItem,
  DisplayBoardWeatherSetting
} from './types';

function getTodayRange(baseDate = new Date()): { start: Date; end: Date } {
  return {
    start: startOfDay(baseDate),
    end: endOfDay(baseDate)
  };
}

function emptyAttendanceCounts() {
  return {
    PRESENT: 0,
    ABSENT: 0,
    LEAVE: 0,
    LATE: 0
  };
}

function countAttendanceRecords<T extends { status: string }>(records: T[]) {
  return records.reduce((acc, record) => {
    if (record.status in acc) {
      acc[record.status as keyof typeof acc] += 1;
    }

    return acc;
  }, emptyAttendanceCounts());
}

function sortByRoster(
  left: { sortOrder: number; name: string },
  right: { sortOrder: number; name: string }
) {
  return left.sortOrder - right.sortOrder || left.name.localeCompare(right.name);
}

function isActiveContractNow(
  advertisement: { startAt: Date | null; endAt: Date | null },
  now: Date
) {
  if (!advertisement.startAt || !advertisement.endAt) {
    return false;
  }

  return advertisement.startAt <= now && advertisement.endAt >= now;
}

function normalizeShift(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapSyncedMovieScheduleItem(record: {
  id: string;
  movieName: string;
  screenName: string;
  showDate: string;
  showTime: string;
  showDateTime: Date | null;
}): DisplayBoardMovieItem {
  const showTime = record.showDateTime ?? new Date(`${record.showDate}T${record.showTime}:00`);

  return {
    id: record.id,
    movieName: record.movieName,
    screenName: record.screenName,
    showTime: Number.isNaN(showTime.getTime()) ? new Date() : showTime
  };
}

function isUpcomingMovieShow(item: DisplayBoardMovieItem, now: Date): boolean {
  return item.showTime >= now;
}

function normalizeAvailability(
  displayPage: { status: string } | null
): DisplayBoardResult['availability'] {
  if (!displayPage) {
    return 'not_found';
  }

  return displayPage.status === 'ACTIVE' ? 'active' : 'inactive';
}

async function loadDisplayBoardFromDatabase(slug: string): Promise<DisplayBoardResult> {
  const displayPage = await prisma.displayPage.findUnique({
    where: { slug: slug.trim() }
  });

  const availability = normalizeAvailability(displayPage);

  if (!displayPage || displayPage.status !== 'ACTIVE') {
    return {
      availability,
      data: null
    };
  }

  const now = new Date();
  const { start, end } = getTodayRange(now);

  const [
    events,
    eventsTotal,
    meetings,
    meetingsTotal,
    advertisements,
    alerts,
    salesTargetSummary,
    concessionPriceList,
    concessionPriceListTotal,
    weatherSetting,
    staffExpected,
    managerExpected,
    staffAttendanceRecords,
    managerAttendanceRecords
  ] = await Promise.all([
    prisma.eventRecord.findMany({
      where: {
        status: 'ACTIVE',
        startAt: {
          gte: start,
          lt: end
        }
      },
      orderBy: [{ startAt: 'asc' }, { title: 'asc' }],
      take: 5
    }),
    prisma.eventRecord.count({
      where: {
        status: 'ACTIVE',
        startAt: {
          gte: start,
          lt: end
        }
      }
    }),
    prisma.meetingSchedule.findMany({
      where: {
        status: 'ACTIVE',
        startAt: {
          gte: start,
          lt: end
        }
      },
      orderBy: [{ startAt: 'asc' }, { title: 'asc' }],
      take: 5
    }),
    prisma.meetingSchedule.count({
      where: {
        status: 'ACTIVE',
        startAt: {
          gte: start,
          lt: end
        }
      }
    }),
    prisma.advertisement.findMany({
      where: {
        status: 'ACTIVE'
      },
      orderBy: [{ startAt: 'asc' }, { title: 'asc' }]
    }),
    getActiveAlerts(now, 3),
    getItemSalesTargetDisplaySummaryForDisplay(now),
    prisma.concessionPriceItem.findMany({
      where: {
        status: 'ACTIVE'
      },
      orderBy: [{ sortOrder: 'asc' }, { itemName: 'asc' }],
      take: 5
    }),
    prisma.concessionPriceItem.count({
      where: {
        status: 'ACTIVE'
      }
    }),
    prisma.weatherSetting.findFirst({
      where: {
        enabled: true
      },
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }]
    }),
    prisma.staffMember.count({
      where: {
        status: 'ACTIVE'
      }
    }),
    prisma.manager.count({
      where: {
        status: 'ACTIVE'
      }
    }),
    prisma.attendanceRecord.findMany({
      where: {
        date: {
          gte: start,
          lt: end
        }
      },
      include: {
        staff: true
      }
    }),
    prisma.managerAttendanceRecord.findMany({
      where: {
        date: {
          gte: start,
          lt: end
        }
      },
      include: {
        manager: true
      }
    })
  ]);

  const syncedMovieScheduleRows = await getEnabledSyncedMovieScheduleRowsForDate(
    format(now, 'yyyy-MM-dd')
  );

  let movieSchedules: DisplayBoardMovieItem[] = [];
  let movieSchedulesTotal = 0;

  if (syncedMovieScheduleRows.length > 0) {
    movieSchedules = syncedMovieScheduleRows
      .map(mapSyncedMovieScheduleItem)
      .filter((item) => isUpcomingMovieShow(item, now));
    movieSchedulesTotal = movieSchedules.length;
  } else {
    const manualMovieSchedules = await prisma.movieSchedule.findMany({
      where: {
        status: 'ACTIVE',
        showTime: {
          gte: start,
          lt: end
        }
      },
      orderBy: [{ showTime: 'asc' }, { movieName: 'asc' }],
      take: 5
    });

    movieSchedules = manualMovieSchedules
      .map((movieSchedule) => ({
        id: movieSchedule.id,
        movieName: movieSchedule.movieName,
        screenName: movieSchedule.screenName,
        showTime: movieSchedule.showTime
      }))
      .filter((item) => isUpcomingMovieShow(item, now));
    movieSchedulesTotal = movieSchedules.length;
  }

  const activeAdvertisements = advertisements.filter((advertisement) =>
    isActiveContractNow(advertisement, now)
  );
  const visibleAdvertisements =
    activeAdvertisements.length > 0 ? activeAdvertisements : advertisements;
  const visibleAlerts = alerts.alerts;

  const staffAttendance = staffAttendanceRecords
    .map((record) => ({
      id: record.staff.id,
      name: record.staff.name,
      designation: record.staff.designation,
      department: record.staff.department,
      sortOrder: record.staff.sortOrder,
      shift: normalizeShift(record.shift),
      status: record.status,
      remarks: normalizeShift(record.remarks)
    }))
    .sort(sortByRoster);

  const managerAttendance = managerAttendanceRecords
    .map((record) => ({
      id: record.manager.id,
      name: record.manager.name,
      designation: record.manager.designation,
      sortOrder: record.manager.sortOrder,
      shift: normalizeShift(record.shift),
      status: record.status,
      remarks: normalizeShift(record.remarks)
    }))
    .sort(sortByRoster);

  const attendanceSummary: DisplayBoardAttendanceSummary = {
    staffExpected,
    managerExpected,
    staffMarked: staffAttendanceRecords.length,
    managerMarked: managerAttendanceRecords.length,
    staffCounts: countAttendanceRecords(staffAttendanceRecords),
    managerCounts: countAttendanceRecords(managerAttendanceRecords)
  };

  const data: DisplayBoardData = {
    displayPage,
    generatedAt: now,
    events: {
      items: events as DisplayBoardEventItem[],
      total: eventsTotal
    },
    meetings: {
      items: meetings as DisplayBoardMeetingItem[],
      total: meetingsTotal
    },
    movieSchedules: {
      items: movieSchedules,
      total: movieSchedulesTotal
    },
    advertisements: {
      items: visibleAdvertisements.slice(0, 5) as DisplayBoardAdvertisementItem[],
      total: visibleAdvertisements.length
    },
    alerts: {
      items: visibleAlerts.slice(0, 3) as DisplayBoardAlertItem[],
      total: alerts.total
    },
    salesTargets: {
      items: salesTargetSummary.items as DisplayBoardSalesTargetItem[],
      total: salesTargetSummary.total
    },
    concessionPriceList: {
      items: concessionPriceList as DisplayBoardConcessionPriceItem[],
      total: concessionPriceListTotal
    },
    attendance: {
      staff: {
        items: staffAttendance as DisplayBoardAttendanceStaffItem[],
        total: staffAttendance.length
      },
      managers: {
        items: managerAttendance as DisplayBoardAttendanceManagerItem[],
        total: managerAttendance.length
      }
    },
    weatherSetting: (weatherSetting
      ? {
          id: weatherSetting.id,
          city: weatherSetting.city,
          provider: weatherSetting.provider as DisplayBoardWeatherSetting['provider'],
          enabled: weatherSetting.enabled
        }
      : null) as DisplayBoardWeatherSetting | null,
    attendanceSummary
  };

  return {
    availability,
    data
  };
}

export async function getDisplayBoardBySlug(slug: string): Promise<DisplayBoardResult> {
  const normalizedSlug = slug.trim();
  const displayPage = await prisma.displayPage.findUnique({
    where: { slug: normalizedSlug },
    select: { status: true }
  });

  const availability = normalizeAvailability(displayPage);

  if (!displayPage || displayPage.status !== 'ACTIVE') {
    return {
      availability,
      data: null
    };
  }

  const version = await getDisplayBoardRefreshToken();
  const cachedData = await getCachedDisplayBoardData(normalizedSlug, version);

  if (cachedData) {
    return {
      availability: 'active',
      data: cachedData
    };
  }

  const freshResult = await loadDisplayBoardFromDatabase(normalizedSlug);

  if (freshResult.data) {
    await setCachedDisplayBoardData(normalizedSlug, version, freshResult.data);
  }

  return freshResult;
}
