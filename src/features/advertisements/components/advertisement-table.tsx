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
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { AdvertisementRecord } from '../api/types';
import { AdvertisementActions } from './advertisement-actions';

interface AdvertisementTableProps {
  advertisements: AdvertisementRecord[];
}

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

function getMediaTypeClass(mediaType: AdvertisementRecord['mediaType']) {
  switch (mediaType) {
    case 'IMAGE':
      return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
    case 'VIDEO':
      return 'border-violet-500/30 bg-violet-500/10 text-violet-300';
    default:
      return '';
  }
}

function formatDateTime(value: Date | null) {
  if (!value) {
    return '—';
  }

  return format(value, 'MMM d, yyyy h:mm a');
}

function formatNumber(value: number | null) {
  if (value === null) {
    return '—';
  }

  return value.toLocaleString();
}

export function AdvertisementTable({ advertisements }: AdvertisementTableProps) {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Advertisement records</CardDescription>
        <CardTitle>{advertisements.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Media Type</TableHead>
                <TableHead>Media URL</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Sort Order</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className='text-muted-foreground h-24 text-center'>
                    No advertisements found.
                  </TableCell>
                </TableRow>
              ) : (
                advertisements.map((advertisement) => (
                  <TableRow key={advertisement.id}>
                    <TableCell className='align-top'>
                      <div className='space-y-2'>
                        <div className='font-medium'>{advertisement.title}</div>
                        {advertisement.mediaType === 'IMAGE' && advertisement.mediaUrl ? (
                          <div className='flex items-center gap-3'>
                            <div className='border-border/60 bg-muted flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border'>
                              <img
                                src={advertisement.mediaUrl}
                                alt={advertisement.title}
                                loading='lazy'
                                referrerPolicy='no-referrer'
                                className='h-full w-full object-cover'
                              />
                            </div>
                            <span className='text-muted-foreground text-xs'>Image preview</span>
                          </div>
                        ) : (
                          <Badge
                            variant='outline'
                            className='border-violet-500/30 bg-violet-500/10 text-violet-300'
                          >
                            <Icons.video className='mr-1 size-3.5' />
                            Video media
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getMediaTypeClass(advertisement.mediaType))}
                      >
                        {advertisement.mediaType === 'IMAGE' ? (
                          <Icons.media className='size-3.5' />
                        ) : (
                          <Icons.video className='size-3.5' />
                        )}
                        {advertisement.mediaType}
                      </Badge>
                    </TableCell>
                    <TableCell className='max-w-[18rem] whitespace-nowrap align-top'>
                      <a
                        href={advertisement.mediaUrl}
                        target='_blank'
                        rel='noreferrer'
                        title={advertisement.mediaUrl}
                        className='text-primary hover:underline'
                      >
                        {advertisement.mediaUrl}
                      </a>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatNumber(advertisement.duration)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatNumber(advertisement.sortOrder)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(advertisement.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(advertisement.endAt)}
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
