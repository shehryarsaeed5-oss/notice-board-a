import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';
import { EventsPage } from '@/features/events/components/events-page';
import type { EventRecordStatus } from '@/features/events/api/types';

export const metadata: Metadata = {
  title: 'Events'
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
  await requireRouteAccess('/dashboard/events');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);

  return (
    <EventsPage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as EventRecordStatus)
          : undefined
      }
    />
  );
}
