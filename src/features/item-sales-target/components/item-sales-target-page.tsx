import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import type { ItemSalesTargetStatus } from '../api/types';
import { getItemSalesTargets } from '../api/service';
import { ItemSalesTargetEmptyState } from './item-sales-target-empty-state';
import { ItemSalesTargetFormSheetTrigger } from './item-sales-target-form-sheet';
import { ItemSalesTargetFilters } from './item-sales-target-filters';
import { ItemSalesTargetTable } from './item-sales-target-table';

interface ItemSalesTargetPageProps {
  search?: string;
  status?: ItemSalesTargetStatus;
}

export async function ItemSalesTargetPage({ search, status }: ItemSalesTargetPageProps) {
  const { itemSalesTargets } = await getItemSalesTargets({ search, status });

  return (
    <PageContainer
      pageTitle='Item Sales Target'
      pageDescription='Create, update, and manage cinema item sales targets.'
      pageHeaderAction={<ItemSalesTargetFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <ItemSalesTargetFilters search={search} status={status} />
          </CardContent>
        </Card>

        {itemSalesTargets.length === 0 ? (
          <ItemSalesTargetEmptyState />
        ) : (
          <ItemSalesTargetTable itemSalesTargets={itemSalesTargets} />
        )}
      </div>
    </PageContainer>
  );
}
