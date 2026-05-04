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
import type { MovieScheduleRecord } from '../api/types';
import { MovieScheduleActions } from './movie-schedule-actions';

interface MovieScheduleTableProps {
  movieSchedules: MovieScheduleRecord[];
}

type MovieSortKey = 'movieName' | 'screenName' | 'showTime' | 'status' | 'createdAt';

function getStatusClass(status: MovieScheduleRecord['status']) {
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

function formatDateTime(value: Date) {
  return format(value, 'MMM d, yyyy h:mm a');
}

function formatDate(value: Date) {
  return format(value, 'MMM d, yyyy');
}

export function MovieScheduleTable({ movieSchedules }: MovieScheduleTableProps) {
  const [sort, setSort] = useState<SortState<MovieSortKey> | null>(null);

  const sortedMovieSchedules = useMemo(
    () =>
      sortRows(movieSchedules, sort, (movieSchedule, key) => {
        switch (key) {
          case 'movieName':
            return movieSchedule.movieName;
          case 'screenName':
            return movieSchedule.screenName;
          case 'showTime':
            return movieSchedule.showTime;
          case 'status':
            return movieSchedule.status;
          case 'createdAt':
            return movieSchedule.createdAt;
        }
      }),
    [movieSchedules, sort]
  );

  const handleSort = (key: MovieSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Movie showtimes</CardDescription>
        <CardTitle>{movieSchedules.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead
                  label='Movie Name'
                  sortKey='movieName'
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
                  label='Show Time'
                  sortKey='showTime'
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
              {sortedMovieSchedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='text-muted-foreground h-24 text-center'>
                    No movie schedules found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedMovieSchedules.map((movieSchedule) => (
                  <TableRow key={movieSchedule.id}>
                    <TableCell className='font-medium'>{movieSchedule.movieName}</TableCell>
                    <TableCell>{movieSchedule.screenName}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(movieSchedule.showTime)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(movieSchedule.status))}
                      >
                        {movieSchedule.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(movieSchedule.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <MovieScheduleActions movieSchedule={movieSchedule} />
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
