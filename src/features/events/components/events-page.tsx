import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import type { EventRecordStatus } from '../api/types';
import { getEventRecords } from '../api/service';
import { EventRecordFormSheetTrigger } from './event-record-form-sheet';
import { EventsFilters } from './events-filters';
import { EventsTable } from './events-table';

interface EventsPageProps {
  search?: string;
  status?: EventRecordStatus;
}

export async function EventsPage({ search, status }: EventsPageProps) {
  const { events } = await getEventRecords({ search, status });

  return (
    <PageContainer
      pageTitle='Events'
      pageDescription='Create, update, and manage cinema event records.'
      pageHeaderAction={<EventRecordFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <EventsFilters search={search} status={status} />
          </CardContent>
        </Card>

        <EventsTable events={events} />
      </div>
    </PageContainer>
  );
}
