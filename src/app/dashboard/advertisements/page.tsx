import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';
import type { AdvertisementStatus } from '@/features/advertisements/api/types';
import { AdvertisementPage } from '@/features/advertisements/components/advertisement-page';

export const metadata: Metadata = {
  title: 'Advertisement Contracts'
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

function isAdvertisementStatus(value?: string): value is AdvertisementStatus {
  return value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED';
}

export default async function Page({ searchParams }: PageProps) {
  await requireRouteAccess('/dashboard/advertisements');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);

  return (
    <AdvertisementPage
      search={search}
      status={isAdvertisementStatus(status) ? status : undefined}
    />
  );
}
