import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import type { AdvertisementMediaType, AdvertisementStatus } from '../api/types';
import { getAdvertisements } from '../api/service';
import { AdvertisementFormSheetTrigger } from './advertisement-form-sheet';
import { AdvertisementFilters } from './advertisement-filters';
import { AdvertisementTable } from './advertisement-table';

interface AdvertisementPageProps {
  search?: string;
  status?: AdvertisementStatus;
  mediaType?: AdvertisementMediaType;
}

export async function AdvertisementPage({ search, status, mediaType }: AdvertisementPageProps) {
  const { advertisements } = await getAdvertisements({ search, status, mediaType });

  return (
    <PageContainer
      pageTitle='Advertisements'
      pageDescription='Create, update, and manage advertising media for the cinema dashboard.'
      pageHeaderAction={<AdvertisementFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <AdvertisementFilters search={search} status={status} mediaType={mediaType} />
          </CardContent>
        </Card>

        <AdvertisementTable advertisements={advertisements} />
      </div>
    </PageContainer>
  );
}
