import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';
import type { MovieScheduleStatus } from '@/features/movie-schedule/api/types';
import { MovieSchedulePage } from '@/features/movie-schedule/components/movie-schedule-page';

export const metadata: Metadata = {
  title: 'Movie Schedule'
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
  await requireRouteAccess('/dashboard/movie-schedule');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);
  const showDate = readQueryValue(params.showDate);

  return (
    <MovieSchedulePage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as MovieScheduleStatus)
          : undefined
      }
      showDate={showDate}
    />
  );
}
