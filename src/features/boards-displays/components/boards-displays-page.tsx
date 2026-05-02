import Link from 'next/link';
import { format } from 'date-fns';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { getDisplayPages } from '@/features/display-pages/api/service';
import type { DisplayPageRecord } from '@/features/display-pages/api/types';
import { createDisplayPageUrl } from '@/features/display-pages/lib/slug';
import { DisplayPageUrlActions } from '@/features/display-pages/components/display-page-url-actions';

import { BoardsDisplaysRefreshButton } from './boards-displays-refresh-button';

function formatDate(value: Date) {
  return format(value, 'MMM d, yyyy');
}

function getStatusClass(status: DisplayPageRecord['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    case 'INACTIVE':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
    case 'ARCHIVED':
      return 'border-muted-foreground/20 bg-muted/40 text-muted-foreground';
    default:
      return '';
  }
}

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
      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200'
      : tone === 'amber'
        ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
        : tone === 'rose'
          ? 'border-rose-500/20 bg-rose-500/10 text-rose-100'
          : 'border-white/10 bg-white/5 text-zinc-100';

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

        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader className='flex flex-row items-start justify-between gap-4'>
            <div>
              <CardDescription>Display board overview</CardDescription>
              <CardTitle className='text-base'>
                {displayPages.length.toLocaleString()} display page
                {displayPages.length === 1 ? '' : 's'}
              </CardTitle>
            </div>
            <Badge variant='outline' className='border-primary/30 bg-primary/10 text-primary'>
              Public screens reload within ~5 seconds
            </Badge>
          </CardHeader>
          <CardContent>
            {displayPages.length === 0 ? (
              <EmptyDisplaysState />
            ) : (
              <div className='overflow-hidden rounded-lg border'>
                <Table>
                  <TableHeader className='bg-muted/50'>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Public URL</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayPages.map((displayPage) => {
                      const displayUrl = createDisplayPageUrl(displayPage.slug);
                      const manageHref = `/dashboard/display-pages?search=${encodeURIComponent(displayPage.slug)}`;

                      return (
                        <TableRow key={displayPage.id}>
                          <TableCell className='font-medium'>{displayPage.name}</TableCell>
                          <TableCell className='font-mono text-xs'>{displayPage.slug}</TableCell>
                          <TableCell>
                            <Badge
                              variant='outline'
                              className={cn('gap-1.5', getStatusClass(displayPage.status))}
                            >
                              {displayPage.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className='flex min-w-0 items-center gap-2'>
                              <code className='text-muted-foreground max-w-[12rem] truncate rounded-md bg-muted/50 px-2 py-1 font-mono text-xs'>
                                {displayUrl}
                              </code>
                              <DisplayPageUrlActions slug={displayPage.slug} />
                            </div>
                          </TableCell>
                          <TableCell className='whitespace-nowrap'>
                            {formatDate(displayPage.createdAt)}
                          </TableCell>
                          <TableCell className='text-right'>
                            <Button asChild variant='outline' size='sm'>
                              <Link href={manageHref}>
                                <Icons.settings className='mr-2 h-4 w-4' />
                                Manage
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
