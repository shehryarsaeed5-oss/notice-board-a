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

import type { ConcessionPriceItemRecord } from '../api/types';
import { ConcessionPriceItemActions } from './concession-price-list-actions';

interface ConcessionPriceListTableProps {
  concessionPriceItems: ConcessionPriceItemRecord[];
  categories: string[];
}

type ConcessionSortKey = 'itemName' | 'category' | 'price' | 'sortOrder' | 'status' | 'createdAt';

function getStatusClass(status: ConcessionPriceItemRecord['status']) {
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

function formatPrice(value: number) {
  return `Rs. ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2
  }).format(value)}`;
}

export function ConcessionPriceListTable({
  concessionPriceItems,
  categories
}: ConcessionPriceListTableProps) {
  const [sort, setSort] = useState<SortState<ConcessionSortKey> | null>(null);

  const sortedItems = useMemo(
    () =>
      sortRows(concessionPriceItems, sort, (item, key) => {
        switch (key) {
          case 'itemName':
            return item.itemName;
          case 'category':
            return item.category;
          case 'price':
            return item.price;
          case 'sortOrder':
            return item.sortOrder;
          case 'status':
            return item.status;
          case 'createdAt':
            return item.createdAt;
        }
      }),
    [concessionPriceItems, sort]
  );

  const handleSort = (key: ConcessionSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Concession price records</CardDescription>
        <CardTitle>{concessionPriceItems.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {categories.length > 0 && (
          <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
            <span className='text-foreground/70'>Categories:</span>
            {categories.map((category) => (
              <Badge key={category} variant='outline' className='border-border/70 bg-muted/40'>
                {category}
              </Badge>
            ))}
          </div>
        )}

        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead
                  label='Item Name'
                  sortKey='itemName'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Category'
                  sortKey='category'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead label='Price' sortKey='price' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Sort Order'
                  sortKey='sortOrder'
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
                  label='Created'
                  sortKey='createdAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No concession price items found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.itemName}</TableCell>
                    <TableCell className='whitespace-nowrap'>{item.category ?? '—'}</TableCell>
                    <TableCell className='whitespace-nowrap'>{formatPrice(item.price)}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {item.sortOrder.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(item.status))}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <ConcessionPriceItemActions concessionPriceItem={item} />
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
