import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';

import type { ConcessionPriceItemStatus } from '../api/types';
import { getConcessionPriceItems } from '../api/service';
import { ConcessionPriceItemEmptyState } from './concession-price-list-empty-state';
import { ConcessionPriceListFilters } from './concession-price-list-filters';
import { ConcessionPriceListPageActions } from './concession-price-list-page-actions';
import { ConcessionPriceListTable } from './concession-price-list-table';

interface ConcessionPriceListPageProps {
  search?: string;
  status?: ConcessionPriceItemStatus;
  category?: string;
}

export async function ConcessionPriceListPage({
  search,
  status,
  category
}: ConcessionPriceListPageProps) {
  const { concessionPriceItems, categories } = await getConcessionPriceItems({
    search,
    status,
    category
  });

  return (
    <PageContainer
      pageTitle='Concession Price List'
      pageDescription='Create, update, and manage concession prices for the cinema notice board.'
      pageHeaderAction={<ConcessionPriceListPageActions />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <ConcessionPriceListFilters
              search={search}
              status={status}
              category={category}
              categories={categories}
            />
          </CardContent>
        </Card>

        {concessionPriceItems.length === 0 ? (
          <ConcessionPriceItemEmptyState />
        ) : (
          <ConcessionPriceListTable
            concessionPriceItems={concessionPriceItems}
            categories={categories}
          />
        )}
      </div>
    </PageContainer>
  );
}
