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
import type { AdvertisementRecord } from '../api/types';
import { AdvertisementActions } from './advertisement-actions';

interface AdvertisementTableProps {
  advertisements: AdvertisementRecord[];
}

type AdvertisementSortKey =
  | 'title'
  | 'contactPerson'
  | 'phone'
  | 'startAt'
  | 'endAt'
  | 'contractAmount'
  | 'adLocation'
  | 'status';

function getStatusClass(status: AdvertisementRecord['status']) {
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

function formatField(value: string | null) {
  return value?.trim() ? value : '—';
}

function formatDateTime(value: Date | null) {
  if (!value) {
    return '—';
  }

  return format(value, 'MMM d, yyyy');
}

function formatAmount(value: number | null) {
  if (value === null) {
    return '—';
  }

  return `Rs. ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2
  }).format(value)}`;
}

export function AdvertisementTable({ advertisements }: AdvertisementTableProps) {
  const [sort, setSort] = useState<SortState<AdvertisementSortKey> | null>(null);

  const sortedAdvertisements = useMemo(
    () =>
      sortRows(advertisements, sort, (advertisement, key) => {
        switch (key) {
          case 'title':
            return advertisement.title;
          case 'contactPerson':
            return advertisement.contactPerson;
          case 'phone':
            return advertisement.phone;
          case 'startAt':
            return advertisement.startAt;
          case 'endAt':
            return advertisement.endAt;
          case 'contractAmount':
            return advertisement.contractAmount;
          case 'adLocation':
            return advertisement.adLocation;
          case 'status':
            return advertisement.status;
        }
      }),
    [advertisements, sort]
  );

  const handleSort = (key: AdvertisementSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Advertisement contract records</CardDescription>
        <CardTitle>{advertisements.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead
                  label='Company Name'
                  sortKey='title'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Contact Person'
                  sortKey='contactPerson'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead label='Phone' sortKey='phone' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Contract Start'
                  sortKey='startAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Contract End'
                  sortKey='endAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Amount'
                  sortKey='contractAmount'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Location/Screen'
                  sortKey='adLocation'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Status'
                  sortKey='status'
                  sort={sort}
                  onSort={handleSort}
                />
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAdvertisements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className='text-muted-foreground h-24 text-center'>
                    No advertisement contracts found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedAdvertisements.map((advertisement) => (
                  <TableRow key={advertisement.id}>
                    <TableCell className='font-medium'>{advertisement.title}</TableCell>
                    <TableCell>{formatField(advertisement.contactPerson)}</TableCell>
                    <TableCell>{formatField(advertisement.phone)}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(advertisement.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(advertisement.endAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatAmount(advertisement.contractAmount)}
                    </TableCell>
                    <TableCell className='max-w-[16rem]'>
                      {formatField(advertisement.adLocation)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(advertisement.status))}
                      >
                        {advertisement.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <AdvertisementActions advertisement={advertisement} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
