import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import type { MeetingScheduleStatus } from '../api/types';
import { getMeetingSchedules } from '../api/service';
import { MeetingScheduleFormSheetTrigger } from './meeting-schedule-form-sheet';
import { MeetingScheduleFilters } from './meeting-schedule-filters';
import { MeetingScheduleTable } from './meeting-schedule-table';

interface MeetingSchedulePageProps {
  search?: string;
  status?: MeetingScheduleStatus;
}

export async function MeetingSchedulePage({ search, status }: MeetingSchedulePageProps) {
  const { meetings } = await getMeetingSchedules({ search, status });

  return (
    <PageContainer
      pageTitle='Meeting Schedule'
      pageDescription='Create, update, and manage cinema meeting schedules.'
      pageHeaderAction={<MeetingScheduleFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <MeetingScheduleFilters search={search} status={status} />
          </CardContent>
        </Card>

        <MeetingScheduleTable meetings={meetings} />
      </div>
    </PageContainer>
  );
}
