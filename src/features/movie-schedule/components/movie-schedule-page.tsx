import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import type { MovieScheduleStatus } from '../api/types';
import { getMovieSchedules } from '../api/service';
import { MovieScheduleFormSheetTrigger } from './movie-schedule-form-sheet';
import { MovieScheduleFilters } from './movie-schedule-filters';
import { MovieScheduleTable } from './movie-schedule-table';

interface MovieSchedulePageProps {
  search?: string;
  status?: MovieScheduleStatus;
  showDate?: string;
}

export async function MovieSchedulePage({ search, status, showDate }: MovieSchedulePageProps) {
  const { movieSchedules } = await getMovieSchedules({ search, status, showDate });

  return (
    <PageContainer
      pageTitle='Movie Schedule'
      pageDescription='Create, update, and manage movie showtimes for cinema operations.'
      pageHeaderAction={<MovieScheduleFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <MovieScheduleFilters search={search} status={status} showDate={showDate} />
          </CardContent>
        </Card>

        <MovieScheduleTable movieSchedules={movieSchedules} />
      </div>
    </PageContainer>
  );
}
