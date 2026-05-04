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
import { statusBadgeClass } from '@/lib/status-badge';
import { cn } from '@/lib/utils';
import { sortRows, toggleSort, type SortState } from '@/lib/table-sort';
import type { ItemSalesTargetRecord } from '../api/types';
import { ItemSalesTargetActions } from './item-sales-target-actions';

interface ItemSalesTargetTableProps {
  itemSalesTargets: ItemSalesTargetRecord[];
}

type ItemSalesTargetSortKey =
  | 'itemName'
  | 'itemCode'
  | 'displayOrder'
  | 'startDate'
  | 'endDate'
  | 'dailyTarget'
  | 'weeklyTarget'
  | 'monthlyTarget'
  | 'status'
  | 'createdAt';

function formatTarget(value: number | null) {
  if (value === null) {
    return '—';
  }

  return value.toLocaleString();
}

function formatDate(value: Date) {
  return format(value, 'MMM d, yyyy');
}

function formatDateRange(startDate: Date | null, endDate: Date | null) {
  const start = startDate ? formatDate(startDate) : '—';
  const end = endDate ? formatDate(endDate) : '—';

  return `${start} → ${end}`;
}

export function ItemSalesTargetTable({ itemSalesTargets }: ItemSalesTargetTableProps) {
  const [sort, setSort] = useState<SortState<ItemSalesTargetSortKey> | null>(null);

  const sortedItemSalesTargets = useMemo(
    () =>
      sortRows(itemSalesTargets, sort, (target, key) => {
        switch (key) {
          case 'itemName':
            return target.itemName;
          case 'itemCode':
            return target.itemCode;
          case 'displayOrder':
            return target.displayOrder;
          case 'startDate':
            return target.startDate;
          case 'endDate':
            return target.endDate;
          case 'dailyTarget':
            return target.dailyTarget;
          case 'weeklyTarget':
            return target.weeklyTarget;
          case 'monthlyTarget':
            return target.monthlyTarget;
          case 'status':
            return target.status;
          case 'createdAt':
            return target.createdAt;
        }
      }),
    [itemSalesTargets, sort]
  );

  const handleSort = (key: ItemSalesTargetSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Item sales targets</CardDescription>
        <CardTitle>{itemSalesTargets.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
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
                  label='Item Codes'
                  sortKey='itemCode'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Order'
                  sortKey='displayOrder'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Start'
                  sortKey='startDate'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead label='End' sortKey='endDate' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Daily Target'
                  sortKey='dailyTarget'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Weekly Target'
                  sortKey='weeklyTarget'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Monthly Target'
                  sortKey='monthlyTarget'
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
              {sortedItemSalesTargets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className='text-muted-foreground h-24 text-center'>
                    No item sales targets found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedItemSalesTargets.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell className='font-medium'>{target.itemName}</TableCell>
                    <TableCell className='max-w-[18rem] truncate'>
                      {target.itemCodes.length > 0
                        ? target.itemCodes.join(', ')
                        : (target.itemCode ?? '—')}
                    </TableCell>
                    <TableCell>{target.displayOrder}</TableCell>
                    <TableCell>{target.startDate ? formatDate(target.startDate) : '—'}</TableCell>
                    <TableCell>{target.endDate ? formatDate(target.endDate) : '—'}</TableCell>
                    <TableCell>{formatTarget(target.dailyTarget)}</TableCell>
                    <TableCell>{formatTarget(target.weeklyTarget)}</TableCell>
                    <TableCell>{formatTarget(target.monthlyTarget)}</TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', statusBadgeClass(target.status))}
                      >
                        {target.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(target.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <ItemSalesTargetActions itemSalesTarget={target} />
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
