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

import type { AlertRecord } from '../api/types';
import { ALERT_TYPE_LABELS } from '../constants';
import { AlertActions } from './alert-actions';

interface AlertsTableProps {
  alerts: AlertRecord[];
}

type AlertSortKey = 'title' | 'alertType' | 'priority' | 'startAt' | 'endAt' | 'status';

function getStatusClass(status: AlertRecord['status']) {
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

function getAlertTypeClass(alertType: AlertRecord['alertType']) {
  switch (alertType) {
    case 'INFO':
      return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
    case 'WARNING':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
    case 'URGENT':
      return 'border-rose-500/30 bg-rose-500/10 text-rose-300';
    case 'SUCCESS':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    default:
      return '';
  }
}

function formatDateTime(value: Date) {
  return format(value, 'MMM d, yyyy h:mm a');
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  const [sort, setSort] = useState<SortState<AlertSortKey> | null>(null);

  const sortedAlerts = useMemo(
    () =>
      sortRows(alerts, sort, (alert, key) => {
        switch (key) {
          case 'title':
            return alert.title;
          case 'alertType':
            return alert.alertType;
          case 'priority':
            return alert.priority;
          case 'startAt':
            return alert.startAt;
          case 'endAt':
            return alert.endAt;
          case 'status':
            return alert.status;
        }
      }),
    [alerts, sort]
  );

  const handleSort = (key: AlertSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Live alert banners</CardDescription>
        <CardTitle>{alerts.length.toLocaleString()} alert(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead label='Title' sortKey='title' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Type'
                  sortKey='alertType'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Priority'
                  sortKey='priority'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Start'
                  sortKey='startAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead label='End' sortKey='endAt' sort={sort} onSort={handleSort} />
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
              {sortedAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No alerts found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className='align-top'>
                      <div className='flex flex-col gap-1'>
                        <span className='font-medium'>{alert.title}</span>
                        {alert.message ? (
                          <span className='text-muted-foreground max-w-[24rem] truncate text-xs'>
                            {alert.message}
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getAlertTypeClass(alert.alertType))}
                      >
                        {ALERT_TYPE_LABELS[alert.alertType]}
                      </Badge>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>{alert.priority}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(alert.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(alert.endAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(alert.status))}
                      >
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <AlertActions alert={alert} />
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
