'use client';

import { format } from 'date-fns';
import { useMemo, useState } from 'react';

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
import { SortableTableHead } from '@/components/ui/sortable-table-head';
import { cn } from '@/lib/utils';
import { sortRows, toggleSort, type SortState } from '@/lib/table-sort';

import type { DisplayPageRecord } from '../api/types';
import { createDisplayPageUrl } from '../lib/slug';
import { DisplayPageActions } from './display-page-actions';
import { DisplayPageUrlActions } from './display-page-url-actions';

interface DisplayPagesTableProps {
  displayPages: DisplayPageRecord[];
}

type DisplayPageSortKey = 'name' | 'slug' | 'description' | 'status' | 'displayUrl' | 'createdAt';

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
  const [sort, setSort] = useState<SortState<DisplayPageSortKey> | null>(null);

  const sortedDisplayPages = useMemo(
    () =>
      sortRows(displayPages, sort, (displayPage, key) => {
        switch (key) {
          case 'name':
            return displayPage.name;
          case 'slug':
            return displayPage.slug;
          case 'description':
            return displayPage.description;
          case 'status':
            return displayPage.status;
          case 'displayUrl':
            return createDisplayPageUrl(displayPage.slug);
          case 'createdAt':
            return displayPage.createdAt;
        }
      }),
    [displayPages, sort]
  );

  const handleSort = (key: DisplayPageSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

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
                <SortableTableHead label='Name' sortKey='name' sort={sort} onSort={handleSort} />
                <SortableTableHead label='Slug' sortKey='slug' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Description'
                  sortKey='description'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Status'
                  sortKey='status'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Display URL'
                  sortKey='displayUrl'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Created'
                  sortKey='createdAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDisplayPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No display pages found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedDisplayPages.map((displayPage) => {
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
