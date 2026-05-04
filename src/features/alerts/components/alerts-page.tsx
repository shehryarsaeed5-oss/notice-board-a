import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';

import type { AlertStatus, AlertType } from '../api/types';
import { getAlerts } from '../api/service';
import { AlertFormSheetTrigger } from './alert-form-sheet';
import { AlertsEmptyState } from './alerts-empty-state';
import { AlertsFilters } from './alert-filters';
import { AlertsTable } from './alert-table';

interface AlertsPageProps {
  search?: string;
  status?: AlertStatus;
  alertType?: AlertType;
}

export async function AlertsPage({ search, status, alertType }: AlertsPageProps) {
  const { alerts } = await getAlerts({ search, status, alertType });

  return (
    <PageContainer
      pageTitle='Alerts'
      pageDescription='Manage live alert banners displayed on the public notice board.'
      pageHeaderAction={<AlertFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <AlertsFilters search={search} status={status} alertType={alertType} />
          </CardContent>
        </Card>

        {alerts.length === 0 ? <AlertsEmptyState /> : <AlertsTable alerts={alerts} />}
      </div>
    </PageContainer>
  );
}
