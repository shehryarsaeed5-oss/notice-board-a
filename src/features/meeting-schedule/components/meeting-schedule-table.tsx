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
import type { MeetingScheduleRecord } from '../api/types';
import { MeetingScheduleActions } from './meeting-schedule-actions';

interface MeetingScheduleTableProps {
  meetings: MeetingScheduleRecord[];
}

function getStatusClass(status: MeetingScheduleRecord['status']) {
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

export function MeetingScheduleTable({ meetings }: MeetingScheduleTableProps) {
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
                <TableHead>Title</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No meeting schedules found.
                  </TableCell>
                </TableRow>
              ) : (
                meetings.map((meeting) => (
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
                        className={cn('gap-1.5', getStatusClass(meeting.status))}
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
