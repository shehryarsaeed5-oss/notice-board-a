import 'server-only';

import { prisma } from '@/lib/prisma';

export interface DashboardOverviewCounts {
  staffRecords: number;
  managerRecords: number;
  todayEvents: number;
  todayMeetings: number;
  todayMovieShows: number;
  activeAds: number;
  activeSalesTargets: number;
  displayPages: number;
}

function getDayRange(baseDate = new Date()): { start: Date; end: Date } {
  const start = new Date(baseDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
}

async function safeCount(query: () => Promise<number>): Promise<number> {
  try {
    return await query();
  } catch {
    return 0;
  }
}

export async function getDashboardOverviewCounts(): Promise<DashboardOverviewCounts> {
  const { start, end } = getDayRange();

  const [
    staffRecords,
    managerRecords,
    todayEvents,
    todayMeetings,
    todayMovieShows,
    activeAds,
    activeSalesTargets,
    displayPages
  ] = await Promise.all([
    safeCount(() => prisma.staffMember.count()),
    safeCount(() => prisma.manager.count()),
    safeCount(() =>
      prisma.eventRecord.count({
        where: {
          startAt: {
            gte: start,
            lt: end
          }
        }
      })
    ),
    safeCount(() =>
      prisma.meetingSchedule.count({
        where: {
          startAt: {
            gte: start,
            lt: end
          }
        }
      })
    ),
    safeCount(() =>
      prisma.movieSchedule.count({
        where: {
          showTime: {
            gte: start,
            lt: end
          }
        }
      })
    ),
    safeCount(() =>
      prisma.advertisement.count({
        where: {
          status: 'ACTIVE'
        }
      })
    ),
    safeCount(() =>
      prisma.itemSalesTarget.count({
        where: {
          status: 'ACTIVE'
        }
      })
    ),
    safeCount(() => prisma.displayPage.count())
  ]);

  return {
    staffRecords,
    managerRecords,
    todayEvents,
    todayMeetings,
    todayMovieShows,
    activeAds,
    activeSalesTargets,
    displayPages
  };
}
