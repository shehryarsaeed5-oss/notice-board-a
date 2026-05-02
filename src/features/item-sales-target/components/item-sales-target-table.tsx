import { format } from 'date-fns';

import { Icons } from '@/components/icons';
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
import type { ItemSalesTargetRecord } from '../api/types';
import { ItemSalesTargetActions } from './item-sales-target-actions';

interface ItemSalesTargetTableProps {
  itemSalesTargets: ItemSalesTargetRecord[];
}

function getStatusClass(status: ItemSalesTargetRecord['status']) {
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

function formatTarget(value: number | null) {
  if (value === null) {
    return '—';
  }

  return value.toLocaleString();
}

function formatDate(value: Date) {
  return format(value, 'MMM d, yyyy');
}

export function ItemSalesTargetTable({ itemSalesTargets }: ItemSalesTargetTableProps) {
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
                <TableHead>Item Name</TableHead>
                <TableHead>Item Code</TableHead>
                <TableHead>Daily Target</TableHead>
                <TableHead>Weekly Target</TableHead>
                <TableHead>Monthly Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemSalesTargets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='text-muted-foreground h-24 text-center'>
                    No item sales targets found.
                  </TableCell>
                </TableRow>
              ) : (
                itemSalesTargets.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell className='font-medium'>{target.itemName}</TableCell>
                    <TableCell>{target.itemCode ?? '—'}</TableCell>
                    <TableCell>{formatTarget(target.dailyTarget)}</TableCell>
                    <TableCell>{formatTarget(target.weeklyTarget)}</TableCell>
                    <TableCell>{formatTarget(target.monthlyTarget)}</TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(target.status))}
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
