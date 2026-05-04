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
import type { MeetingScheduleRecord } from '../api/types';
import { MeetingScheduleActions } from './meeting-schedule-actions';

interface MeetingScheduleTableProps {
  meetings: MeetingScheduleRecord[];
}

type MeetingSortKey = 'title' | 'organizer' | 'location' | 'startAt' | 'endAt' | 'status';

function formatField(value: string | null) {
  return value?.trim() ? value : '—';
}

function formatDateTime(value: Date | null) {
  if (!value) {
    return '—';
  }

  return format(value, 'MMM d, yyyy h:mm a');
}

export function MeetingScheduleTable({ meetings }: MeetingScheduleTableProps) {
  const [sort, setSort] = useState<SortState<MeetingSortKey> | null>(null);

  const sortedMeetings = useMemo(
    () =>
      sortRows(meetings, sort, (meeting, key) => {
        switch (key) {
          case 'title':
            return meeting.title;
          case 'organizer':
            return meeting.organizer;
          case 'location':
            return meeting.location;
          case 'startAt':
            return meeting.startAt;
          case 'endAt':
            return meeting.endAt;
          case 'status':
            return meeting.status;
        }
      }),
    [meetings, sort]
  );

  const handleSort = (key: MeetingSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Meeting schedules</CardDescription>
        <CardTitle>{meetings.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead label='Title' sortKey='title' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Organizer'
                  sortKey='organizer'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Location'
                  sortKey='location'
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
              {sortedMeetings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No meeting schedules found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedMeetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className='font-medium'>{meeting.title}</TableCell>
                    <TableCell>{formatField(meeting.organizer)}</TableCell>
                    <TableCell>{formatField(meeting.location)}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(meeting.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(meeting.endAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', statusBadgeClass(meeting.status))}
                      >
                        {meeting.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <MeetingScheduleActions meetingSchedule={meeting} />
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
