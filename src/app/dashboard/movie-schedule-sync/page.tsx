import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';

import { MovieScheduleSyncPage } from '@/features/movie-schedule-sync/components/movie-schedule-sync-page';

export const metadata: Metadata = {
  title: 'Dashboard: Movie Schedule Sync'
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
  await requireRouteAccess('/dashboard/movie-schedule-sync');

  const params = await searchParams;
  const selectedDate = readQueryValue(params.date) ?? readQueryValue(params.showDate);

  return <MovieScheduleSyncPage selectedDate={selectedDate} />;
}
