import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';
import type { MeetingScheduleStatus } from '@/features/meeting-schedule/api/types';
import { MeetingSchedulePage } from '@/features/meeting-schedule/components/meeting-schedule-page';

export const metadata: Metadata = {
  title: 'Meeting Schedule'
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function Page({ searchParams }: PageProps) {
  await requireRouteAccess('/dashboard/meeting-schedule');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);

  return (
    <MeetingSchedulePage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as MeetingScheduleStatus)
          : undefined
      }
    />
  );
}
