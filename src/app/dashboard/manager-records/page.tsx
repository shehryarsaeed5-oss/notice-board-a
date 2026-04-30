import type { Metadata } from 'next';
import { ManagerRecordsPage } from '@/features/manager-records/components/manager-records-page';

export const metadata: Metadata = {
  title: 'Manager Records'
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
    <ManagerRecordsPage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
      }
    />
  );
}
