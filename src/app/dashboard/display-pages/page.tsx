import type { Metadata } from 'next';

import type { DisplayPageStatus } from '@/features/display-pages/api/types';
import { DisplayPagesPage } from '@/features/display-pages/components/display-pages-page';

export const metadata: Metadata = {
  title: 'Display Pages'
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
    <DisplayPagesPage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as DisplayPageStatus)
          : undefined
      }
    />
  );
}
