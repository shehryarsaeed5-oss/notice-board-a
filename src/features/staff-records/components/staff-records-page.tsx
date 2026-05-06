import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { StaffRecordsFilters } from './staff-records-filters';
import { StaffRecordsPageActions } from './staff-records-page-actions';
import { StaffRecordsTable } from './staff-records-table';
import { getStaffMembers } from '../api/service';
import type { StaffRecordStatus } from '../api/types';

interface StaffRecordsPageProps {
  search?: string;
  status?: StaffRecordStatus;
}

export async function StaffRecordsPage({ search, status }: StaffRecordsPageProps) {
  const { staffMembers } = await getStaffMembers({ search, status });

  return (
    <PageContainer
      pageTitle='Staff Records'
      pageDescription='Create, update, and manage staff records for cinema operations.'
      pageHeaderAction={<StaffRecordsPageActions />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <StaffRecordsFilters search={search} status={status} />
          </CardContent>
        </Card>

        <StaffRecordsTable staffMembers={staffMembers} />
      </div>
    </PageContainer>
  );
}
