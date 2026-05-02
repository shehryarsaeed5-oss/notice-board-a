import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';

import type { DisplayPageStatus } from '../api/types';
import { getDisplayPages } from '../api/service';
import { DisplayPagesEmptyState } from './display-pages-empty-state';
import { DisplayPageFormSheetTrigger } from './display-page-form-sheet';
import { DisplayPagesFilters } from './display-pages-filters';
import { DisplayPagesTable } from './display-pages-table';

interface DisplayPagesPageProps {
  search?: string;
  status?: DisplayPageStatus;
}

export async function DisplayPagesPage({ search, status }: DisplayPagesPageProps) {
  const { displayPages } = await getDisplayPages({ search, status });

  return (
    <PageContainer
      pageTitle='Display Pages'
      pageDescription='Create, update, and manage display page records for public screens.'
      pageHeaderAction={<DisplayPageFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <DisplayPagesFilters search={search} status={status} />
          </CardContent>
        </Card>

        {displayPages.length === 0 ? (
          <DisplayPagesEmptyState />
        ) : (
          <DisplayPagesTable displayPages={displayPages} />
        )}
      </div>
    </PageContainer>
  );
}
