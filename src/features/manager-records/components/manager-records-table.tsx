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
import type { ManagerRecord } from '../api/types';
import { ManagerRecordActions } from './manager-record-actions';

interface ManagerRecordsTableProps {
  managers: ManagerRecord[];
}

type ManagerSortKey = 'name' | 'sortOrder' | 'designation' | 'phone' | 'status' | 'createdAt';

function getStatusClass(status: ManagerRecord['status']) {
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

export function ManagerRecordsTable({ managers }: ManagerRecordsTableProps) {
  const [sort, setSort] = useState<SortState<ManagerSortKey> | null>(null);

  const sortedManagers = useMemo(
    () =>
      sortRows(managers, sort, (manager, key) => {
        switch (key) {
          case 'name':
            return manager.name;
          case 'sortOrder':
            return manager.sortOrder;
          case 'designation':
            return manager.designation;
          case 'phone':
            return manager.phone;
          case 'status':
            return manager.status;
          case 'createdAt':
            return manager.createdAt;
        }
      }),
    [managers, sort]
  );

  const handleSort = (key: ManagerSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Manager records</CardDescription>
        <CardTitle>{managers.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead label='Name' sortKey='name' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Sort Order'
                  sortKey='sortOrder'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Designation'
                  sortKey='designation'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead label='Phone' sortKey='phone' sort={sort} onSort={handleSort} />
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
              {sortedManagers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No manager records found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedManagers.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell className='font-medium'>{manager.name}</TableCell>
                    <TableCell className='whitespace-nowrap'>{manager.sortOrder}</TableCell>
                    <TableCell>{formatField(manager.designation)}</TableCell>
                    <TableCell>{formatField(manager.phone)}</TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(manager.status))}
                      >
                        {manager.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(manager.createdAt, 'MMM d, yyyy')}</TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <ManagerRecordActions manager={manager} />
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
