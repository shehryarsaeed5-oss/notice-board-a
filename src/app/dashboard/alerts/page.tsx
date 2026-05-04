import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';

import type { AlertStatus, AlertType } from '@/features/alerts/api/types';
import { AlertsPage } from '@/features/alerts/components/alerts-page';

export const metadata: Metadata = {
  title: 'Alerts'
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
  await requireRouteAccess('/dashboard/alerts');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);
  const alertType = readQueryValue(params.alertType);

  return (
    <AlertsPage
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as AlertStatus)
          : undefined
      }
      alertType={
        alertType === 'INFO' ||
        alertType === 'WARNING' ||
        alertType === 'URGENT' ||
        alertType === 'SUCCESS'
          ? (alertType as AlertType)
          : undefined
      }
    />
  );
}
