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
import type { EventRecordItem } from '../api/types';
import { EventRecordActions } from './event-record-actions';

interface EventsTableProps {
  events: EventRecordItem[];
}

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
                <TableHead>Title</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Screen</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='text-muted-foreground h-24 text-center'>
                    No event records found.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
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
