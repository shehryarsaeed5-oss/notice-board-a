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

function formatField(value: string | null) {
  return value?.trim() ? value : '—';
}

function formatDateTime(value: Date | null) {
  if (!value) {
    return '—';
  }

  return format(value, 'MMM d, yyyy');
}

function formatAmount(value: number | null) {
  if (value === null) {
    return '—';
  }

  return `Rs. ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2
  }).format(value)}`;
}

export function AdvertisementTable({ advertisements }: AdvertisementTableProps) {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Advertisement contract records</CardDescription>
        <CardTitle>{advertisements.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Contract Start</TableHead>
                <TableHead>Contract End</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Location/Screen</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className='text-muted-foreground h-24 text-center'>
                    No advertisement contracts found.
                  </TableCell>
                </TableRow>
              ) : (
                advertisements.map((advertisement) => (
                  <TableRow key={advertisement.id}>
                    <TableCell className='font-medium'>{advertisement.title}</TableCell>
                    <TableCell>{formatField(advertisement.contactPerson)}</TableCell>
                    <TableCell>{formatField(advertisement.phone)}</TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(advertisement.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDateTime(advertisement.endAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatAmount(advertisement.contractAmount)}
                    </TableCell>
                    <TableCell className='max-w-[16rem]'>
                      {formatField(advertisement.adLocation)}
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
