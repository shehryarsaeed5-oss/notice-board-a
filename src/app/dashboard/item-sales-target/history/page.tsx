import type { Metadata } from 'next';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { requireRouteAccess } from '@/lib/access';

import { getItemSalesTargetDailyHistoryOverview } from '@/features/item-sales-target/import/lib/daily-history';
import { ItemSalesTargetDailyHistoryPage } from '@/features/item-sales-target/components/item-sales-target-daily-history-page';

export const metadata: Metadata = {
  title: 'Item Sales Target Daily History'
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
  const overview = await getItemSalesTargetDailyHistoryOverview({
    targetId: readQueryValue(params.targetId),
    fromDate: readQueryValue(params.from),
    toDate: readQueryValue(params.to)
  });

  return (
    <PageContainer
      pageTitle='Item Sales Target Daily History'
      pageDescription='Review imported sales progress by date for a selected target.'
      pageHeaderAction={
        <Button asChild variant='outline'>
          <Link href='/dashboard/item-sales-target'>
            <Icons.chevronLeft className='mr-2 h-4 w-4' />
            Back to Targets
          </Link>
        </Button>
      }
    >
      <ItemSalesTargetDailyHistoryPage overview={overview} />
    </PageContainer>
  );
}
