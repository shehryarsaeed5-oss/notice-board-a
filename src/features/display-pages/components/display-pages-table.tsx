import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import type { DisplayPageRecord } from '../api/types';
import { createDisplayPageUrl } from '../lib/slug';
import { DisplayPageActions } from './display-page-actions';
import { DisplayPageUrlActions } from './display-page-url-actions';

interface DisplayPagesTableProps {
  displayPages: DisplayPageRecord[];
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

function formatDate(value: Date) {
  return format(value, 'MMM d, yyyy');
}

export function DisplayPagesTable({ displayPages }: DisplayPagesTableProps) {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Display page definitions</CardDescription>
        <CardTitle>{displayPages.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Display URL</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No display pages found.
                  </TableCell>
                </TableRow>
              ) : (
                displayPages.map((displayPage) => {
                  const displayUrl = createDisplayPageUrl(displayPage.slug);

                  return (
                    <TableRow key={displayPage.id}>
                      <TableCell className='font-medium'>{displayPage.name}</TableCell>
                      <TableCell className='font-mono text-xs'>{displayPage.slug}</TableCell>
                      <TableCell className='max-w-[18rem] truncate'>
                        {displayPage.description ?? '—'}
                      </TableCell>
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
                        <div className='inline-flex justify-end'>
                          <DisplayPageActions displayPage={displayPage} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
