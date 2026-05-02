import 'server-only';

import { prisma } from '@/lib/prisma';

import { endOfDay, startOfDay } from '../lib/date';
import type {
  DisplayBoardAdvertisementItem,
  DisplayBoardAttendanceSummary,
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

function normalizeAvailability(
  displayPage: { status: string } | null
): DisplayBoardResult['availability'] {
  if (!displayPage) {
    return 'not_found';
  }

  return displayPage.status === 'ACTIVE' ? 'active' : 'inactive';
}

export async function getDisplayBoardBySlug(slug: string): Promise<DisplayBoardResult> {
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
    movieSchedules,
    movieSchedulesTotal,
    advertisements,
    advertisementsTotal,
    salesTargets,
    salesTargetsTotal,
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
    prisma.movieSchedule.findMany({
      where: {
        status: 'ACTIVE',
        showTime: {
          gte: start,
          lt: end
        }
      },
      orderBy: [{ showTime: 'asc' }, { movieName: 'asc' }],
      take: 5
    }),
    prisma.movieSchedule.count({
      where: {
        status: 'ACTIVE',
        showTime: {
          gte: start,
          lt: end
        }
      }
    }),
    prisma.advertisement.findMany({
      where: {
        status: 'ACTIVE',
        AND: [
          {
            OR: [{ startAt: null }, { startAt: { lte: now } }]
          },
          {
            OR: [{ endAt: null }, { endAt: { gte: now } }]
          }
        ]
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }, { title: 'asc' }],
      take: 5
    }),
    prisma.advertisement.count({
      where: {
        status: 'ACTIVE',
        AND: [
          {
            OR: [{ startAt: null }, { startAt: { lte: now } }]
          },
          {
            OR: [{ endAt: null }, { endAt: { gte: now } }]
          }
        ]
      }
    }),
    prisma.itemSalesTarget.findMany({
      where: {
        status: 'ACTIVE'
      },
      orderBy: [{ itemName: 'asc' }],
      take: 5
    }),
    prisma.itemSalesTarget.count({
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
      }
    }),
    prisma.managerAttendanceRecord.findMany({
      where: {
        date: {
          gte: start,
          lt: end
        }
      }
    })
  ]);

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
      items: movieSchedules as DisplayBoardMovieItem[],
      total: movieSchedulesTotal
    },
    advertisements: {
      items: advertisements as DisplayBoardAdvertisementItem[],
      total: advertisementsTotal
    },
    salesTargets: {
      items: salesTargets as DisplayBoardSalesTargetItem[],
      total: salesTargetsTotal
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
