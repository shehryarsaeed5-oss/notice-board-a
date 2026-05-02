import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';
import type { ConcessionPriceItemStatus } from '@/features/concession-price-list/api/types';
import { ConcessionPriceListPage } from '@/features/concession-price-list/components/concession-price-list-page';

export const metadata: Metadata = {
  title: 'Concession Price List'
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
  await requireRouteAccess('/dashboard/concession-price-list');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);
  const category = readQueryValue(params.category);

  return (
    <ConcessionPriceListPage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as ConcessionPriceItemStatus)
          : undefined
      }
      category={category}
    />
  );
}
