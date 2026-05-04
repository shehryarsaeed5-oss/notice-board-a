import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import type { AdvertisementStatus } from '../api/types';
import { getAdvertisements } from '../api/service';
import { AdvertisementFormSheetTrigger } from './advertisement-form-sheet';
import { AdvertisementFilters } from './advertisement-filters';
import { AdvertisementTable } from './advertisement-table';

interface AdvertisementPageProps {
  search?: string;
  status?: AdvertisementStatus;
}

export async function AdvertisementPage({ search, status }: AdvertisementPageProps) {
  const { advertisements } = await getAdvertisements({ search, status });

  return (
    <PageContainer
      pageTitle='Advertisement Contracts'
      pageDescription='Manage companies and contract dates for cinema digital signage and SMD advertisements.'
      pageHeaderAction={<AdvertisementFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <AdvertisementFilters search={search} status={status} />
          </CardContent>
        </Card>

        <AdvertisementTable advertisements={advertisements} />
      </div>
    </PageContainer>
  );
}
