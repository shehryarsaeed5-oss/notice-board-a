import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { badgeToneClass } from '@/lib/status-badge';
import { cn } from '@/lib/utils';

import { getDisplayPages } from '@/features/display-pages/api/service';
import type { DisplayPageRecord } from '@/features/display-pages/api/types';
import { DisplayPagesTable } from '@/features/display-pages/components/display-pages-table';

import { BoardsDisplaysRefreshButton } from './boards-displays-refresh-button';

function countStatus(displayPages: DisplayPageRecord[], status: DisplayPageRecord['status']) {
  return displayPages.filter((displayPage) => displayPage.status === status).length;
}

function OverviewCard({
  title,
  description,
  value,
  tone
}: {
  title: string;
  description: string;
  value: number;
  tone: 'emerald' | 'amber' | 'slate' | 'rose';
}) {
  const toneClasses =
    tone === 'emerald'
      ? badgeToneClass('success')
      : tone === 'amber'
        ? badgeToneClass('warning')
        : tone === 'rose'
          ? badgeToneClass('danger')
          : badgeToneClass('neutral');

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader className='space-y-2'>
        <CardDescription>{description}</CardDescription>
        <CardTitle className='text-3xl tracking-tight'>{value.toLocaleString()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'inline-flex rounded-full border px-3 py-1 text-sm font-medium',
            toneClasses
          )}
        >
          {title}
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyDisplaysState() {
  return (
    <Card className='border-dashed border-border/60 bg-card/60 shadow-sm'>
      <CardHeader>
        <CardDescription>No display pages yet</CardDescription>
        <CardTitle className='text-base'>Create a display page first</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm text-muted-foreground'>
        <p>
          Display pages power the public TV/LCD boards. Use the Display Pages module to add and edit
          records, then return here to manage the live screens.
        </p>
        <Button asChild variant='outline'>
          <Link href='/dashboard/display-pages'>
            <Icons.page className='mr-2 h-4 w-4' />
            Manage Display Pages
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export async function BoardsDisplaysPage() {
  const { displayPages } = await getDisplayPages();

  const activeDisplays = countStatus(displayPages, 'ACTIVE');
  const inactiveDisplays = countStatus(displayPages, 'INACTIVE');
  const archivedDisplays = countStatus(displayPages, 'ARCHIVED');

  return (
    <PageContainer
      pageTitle='Boards / Displays'
      pageDescription='Monitor display pages and trigger public screen refreshes from one place.'
      pageHeaderAction={<BoardsDisplaysRefreshButton />}
    >
      <div className='flex flex-col gap-4'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          <OverviewCard
            title='Total displays'
            description='All configured display pages'
            value={displayPages.length}
            tone='slate'
          />
          <OverviewCard
            title='Active displays'
            description='Currently live on public screens'
            value={activeDisplays}
            tone='emerald'
          />
          <OverviewCard
            title='Inactive displays'
            description='Temporarily disabled screens'
            value={inactiveDisplays}
            tone='amber'
          />
          <OverviewCard
            title='Archived displays'
            description='Retired screen records'
            value={archivedDisplays}
            tone='rose'
          />
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-end'>
            <Badge variant='outline' className={badgeToneClass('info')}>
              Public screens reload within ~5 seconds
            </Badge>
          </div>
          {displayPages.length === 0 ? (
            <EmptyDisplaysState />
          ) : (
            <DisplayPagesTable displayPages={displayPages} />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
