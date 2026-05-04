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
import type { EventRecordItem } from '../api/types';
import { EventRecordActions } from './event-record-actions';

interface EventsTableProps {
  events: EventRecordItem[];
}

type EventSortKey =
  | 'title'
  | 'clientName'
  | 'companyName'
  | 'screenName'
  | 'startAt'
  | 'endAt'
  | 'status';

function getStatusClass(status: EventRecordItem['status']) {
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

  return format(value, 'MMM d, yyyy h:mm a');
}

export function EventsTable({ events }: EventsTableProps) {
  const [sort, setSort] = useState<SortState<EventSortKey> | null>(null);

  const sortedEvents = useMemo(
    () =>
      sortRows(events, sort, (event, key) => {
        switch (key) {
          case 'title':
            return event.title;
          case 'clientName':
            return event.clientName;
          case 'companyName':
            return event.companyName;
          case 'screenName':
            return event.screenName;
          case 'startAt':
            return event.startAt;
          case 'endAt':
            return event.endAt;
          case 'status':
            return event.status;
        }
      }),
    [events, sort]
  );

  const handleSort = (key: EventSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Event records</CardDescription>
        <CardTitle>{events.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead label='Title' sortKey='title' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Client Name'
                  sortKey='clientName'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Company Name'
                  sortKey='companyName'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Screen'
                  sortKey='screenName'
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
              {sortedEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='text-muted-foreground h-24 text-center'>
                    No event records found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className='font-medium'>{event.title}</TableCell>
                    <TableCell>{formatField(event.clientName)}</TableCell>
                    <TableCell>{formatField(event.companyName)}</TableCell>
                    <TableCell>{formatField(event.screenName)}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(event.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(event.endAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(event.status))}
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <EventRecordActions eventRecord={event} />
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
