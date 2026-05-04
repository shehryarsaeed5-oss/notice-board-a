import PageContainer from '@/components/layout/page-container';

import { getMovieScheduleSyncOverview } from '../api/service';
import { MovieScheduleSyncClient } from './movie-schedule-sync-client';

interface MovieScheduleSyncPageProps {
  selectedDate?: string;
}

export async function MovieScheduleSyncPage({ selectedDate }: MovieScheduleSyncPageProps) {
  const overview = await getMovieScheduleSyncOverview(selectedDate);

  return (
    <PageContainer
      pageTitle='Movie Schedule Sync'
      pageDescription='Sync showtimes from the Digital Signage API and keep the manual movie schedule as a backup.'
    >
      <MovieScheduleSyncClient initialOverview={overview} />
    </PageContainer>
  );
}
