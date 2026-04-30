import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { getManagers } from '../api/service';
import type { ManagerRecordStatus } from '../api/types';
import { ManagerMemberFormSheetTrigger } from './manager-member-form-sheet';
import { ManagerRecordsFilters } from './manager-records-filters';
import { ManagerRecordsTable } from './manager-records-table';

interface ManagerRecordsPageProps {
  search?: string;
  status?: ManagerRecordStatus;
}

export async function ManagerRecordsPage({ search, status }: ManagerRecordsPageProps) {
  const { managers } = await getManagers({ search, status });

  return (
    <PageContainer
      pageTitle='Manager Records'
      pageDescription='Create, update, and manage manager records for cinema operations.'
      pageHeaderAction={<ManagerMemberFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <ManagerRecordsFilters search={search} status={status} />
          </CardContent>
        </Card>

        <ManagerRecordsTable managers={managers} />
      </div>
    </PageContainer>
  );
}
