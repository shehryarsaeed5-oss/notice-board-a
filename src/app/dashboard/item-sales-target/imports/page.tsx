import type { Metadata } from 'next';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { requireRouteAccess } from '@/lib/access';

import { getItemSalesImportOverview } from '@/features/item-sales-target/import/api/service';
import { ItemSalesImportPage } from '@/features/item-sales-target/import/components/item-sales-import-page';

export const metadata: Metadata = {
  title: 'Item Sales Target Imports'
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function Page({ searchParams }: PageProps) {
  await requireRouteAccess('/dashboard/item-sales-target');
  const params = await searchParams;
  const selectedDate = readQueryValue(params.date);
  const overview = await getItemSalesImportOverview(selectedDate);

  return (
    <PageContainer
      pageTitle='Item Sales Target Imports'
      pageDescription='Import Vista SignatureSales files and review saved batches.'
      pageHeaderAction={
        <Button asChild variant='outline'>
          <a href='/dashboard/item-sales-target'>
            <Icons.chevronLeft className='mr-2 h-4 w-4' />
            Back to Targets
          </a>
        </Button>
      }
    >
      <ItemSalesImportPage initialOverview={overview} />
    </PageContainer>
  );
}
