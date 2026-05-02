import type { Metadata } from 'next';

import type { ItemSalesTargetStatus } from '@/features/item-sales-target/api/types';
import { ItemSalesTargetPage } from '@/features/item-sales-target/components/item-sales-target-page';

export const metadata: Metadata = {
  title: 'Item Sales Target'
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
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);

  return (
    <ItemSalesTargetPage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as ItemSalesTargetStatus)
          : undefined
      }
    />
  );
}
