'use client';

import { format } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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

import type {
  ItemSalesTargetDailyHistoryOverview,
  ItemSalesTargetDailyHistoryRow
} from '../import/api/types';

type HistorySortKey =
  | 'date'
  | 'dailyTarget'
  | 'totalQty'
  | 'paidQty'
  | 'focQty'
  | 'remainingQty'
  | 'percent'
  | 'paidAmount'
  | 'discountAmount'
  | 'importStatus'
  | 'sourceFilename'
  | 'lastImportedAt';

interface ItemSalesTargetDailyHistoryPageProps {
  overview: ItemSalesTargetDailyHistoryOverview;
}

function formatDate(value: Date | null | undefined) {
  return value ? format(value, 'MMM d, yyyy') : '—';
}

function formatDateTime(value: Date | null | undefined) {
  return value ? format(value, 'MMM d, yyyy h:mm a') : '—';
}

function formatNumber(value: number | null | undefined) {
  return value === null || value === undefined ? '—' : value.toLocaleString();
}

function formatPercent(value: number | null | undefined) {
  return value === null || value === undefined ? '—' : `${value}%`;
}

function formatMoney(value: number | null | undefined) {
  return value === null || value === undefined
    ? '—'
    : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function historyStatusLabel(status: ItemSalesTargetDailyHistoryRow['importStatus']) {
  switch (status) {
    case 'IMPORTED':
      return 'Imported';
    case 'MISSING':
      return 'Missing';
    case 'NO_TARGET':
      return 'No Target';
    default:
      return 'Unknown';
  }
}

function historyStatusTone(status: ItemSalesTargetDailyHistoryRow['importStatus']) {
  switch (status) {
    case 'IMPORTED':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-100';
    case 'MISSING':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-100';
    case 'NO_TARGET':
      return 'border-muted-foreground/20 bg-muted/40 text-muted-foreground';
    default:
      return 'border-border bg-muted/40 text-foreground';
  }
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className='rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-5 text-sm text-muted-foreground'>
      {message}
    </div>
  );
}

function InfoCard({ label, value, subtext }: { label: string; value: string; subtext?: string }) {
  return (
    <Card className='border-border bg-card text-card-foreground shadow-sm'>
      <CardHeader className='space-y-1 pb-2'>
        <CardDescription className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
          {label}
        </CardDescription>
        <CardTitle className='text-2xl font-semibold text-card-foreground'>{value}</CardTitle>
      </CardHeader>
      {subtext ? (
        <CardContent className='pt-0 text-sm text-muted-foreground'>{subtext}</CardContent>
      ) : null}
    </Card>
  );
}

function SelectedTargetCard({ overview }: { overview: ItemSalesTargetDailyHistoryOverview }) {
  const target = overview.selectedTarget;

  if (!target) {
    return (
      <Card className='border-border bg-card text-card-foreground shadow-sm'>
        <CardHeader>
          <CardDescription className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
            Selected Target
          </CardDescription>
          <CardTitle className='text-lg font-semibold text-card-foreground'>
            No target selected
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm text-muted-foreground'>
          Choose a target to review daily imported sales progress.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-border bg-card text-card-foreground shadow-sm'>
      <CardHeader className='space-y-1'>
        <CardDescription className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
          Selected Target
        </CardDescription>
        <CardTitle className='text-lg font-semibold text-card-foreground'>
          {target.itemName}
        </CardTitle>
        <div className='text-sm text-muted-foreground'>
          {target.itemCodes.length > 0 ? target.itemCodes.join(', ') : (target.itemCode ?? '—')}
        </div>
      </CardHeader>
      <CardContent className='grid gap-3 text-sm text-foreground sm:grid-cols-3'>
        <div className='rounded-xl border border-border bg-muted/30 px-3 py-2'>
          <div className='text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>Start</div>
          <div className='mt-1 font-medium'>
            {target.startDate ? formatDate(target.startDate) : '—'}
          </div>
        </div>
        <div className='rounded-xl border border-border bg-muted/30 px-3 py-2'>
          <div className='text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>End</div>
          <div className='mt-1 font-medium'>
            {target.endDate ? formatDate(target.endDate) : '—'}
          </div>
        </div>
        <div className='rounded-xl border border-border bg-muted/30 px-3 py-2'>
          <div className='text-[11px] uppercase tracking-[0.2em] text-muted-foreground'>
            Daily Target
          </div>
          <div className='mt-1 font-medium'>{formatNumber(target.dailyTarget)}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function HistoryTable({ rows }: { rows: ItemSalesTargetDailyHistoryRow[] }) {
  const [sort, setSort] = useState<SortState<HistorySortKey> | null>({
    key: 'date',
    direction: 'asc'
  });

  useEffect(() => {
    setSort({
      key: 'date',
      direction: 'asc'
    });
  }, [rows]);

  const sortedRows = useMemo(
    () =>
      sortRows(rows, sort, (row, key) => {
        switch (key) {
          case 'date':
            return row.date;
          case 'dailyTarget':
            return row.dailyTarget;
          case 'totalQty':
            return row.totalQty;
          case 'paidQty':
            return row.paidQty;
          case 'focQty':
            return row.focQty;
          case 'remainingQty':
            return row.remainingQty;
          case 'percent':
            return row.percent;
          case 'paidAmount':
            return row.paidAmount;
          case 'discountAmount':
            return row.discountAmount;
          case 'importStatus':
            return row.importStatus;
          case 'sourceFilename':
            return row.sourceFilename;
          case 'lastImportedAt':
            return row.lastImportedAt;
        }
      }),
    [rows, sort]
  );

  const handleSort = (key: HistorySortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <div className='overflow-x-auto rounded-2xl border border-border bg-card'>
      <Table className='min-w-[1500px]'>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <SortableTableHead label='Date' sortKey='date' sort={sort} onSort={handleSort} />
            <TableHead>Target Name</TableHead>
            <TableHead className='min-w-48'>Item Codes</TableHead>
            <SortableTableHead
              label='Daily Target'
              sortKey='dailyTarget'
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHead
              label='Total Qty'
              sortKey='totalQty'
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHead label='Paid Qty' sortKey='paidQty' sort={sort} onSort={handleSort} />
            <SortableTableHead label='FOC Qty' sortKey='focQty' sort={sort} onSort={handleSort} />
            <SortableTableHead
              label='Remaining'
              sortKey='remainingQty'
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHead
              label='Achieved %'
              sortKey='percent'
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHead
              label='Paid Amount'
              sortKey='paidAmount'
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHead
              label='Discount Amount'
              sortKey='discountAmount'
              sort={sort}
              onSort={handleSort}
            />
            <SortableTableHead
              label='Import Status'
              sortKey='importStatus'
              sort={sort}
              onSort={handleSort}
            />
            <TableHead>Source File</TableHead>
            <SortableTableHead
              label='Last Imported At'
              sortKey='lastImportedAt'
              sort={sort}
              onSort={handleSort}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={14} className='h-24 text-center text-muted-foreground'>
                No daily history available for the selected range.
              </TableCell>
            </TableRow>
          ) : (
            sortedRows.map((row) => (
              <TableRow key={row.businessDateKey}>
                <TableCell className='whitespace-nowrap font-medium'>
                  {formatDate(row.date)}
                </TableCell>
                <TableCell>{row.targetName}</TableCell>
                <TableCell className='max-w-[18rem] truncate'>
                  {row.itemCodes.length > 0 ? row.itemCodes.join(', ') : '—'}
                </TableCell>
                <TableCell>{formatNumber(row.dailyTarget)}</TableCell>
                <TableCell>{formatNumber(row.totalQty)}</TableCell>
                <TableCell>{formatNumber(row.paidQty)}</TableCell>
                <TableCell>{formatNumber(row.focQty)}</TableCell>
                <TableCell>{formatNumber(row.remainingQty)}</TableCell>
                <TableCell>{formatPercent(row.percent)}</TableCell>
                <TableCell>{formatMoney(row.paidAmount)}</TableCell>
                <TableCell>{formatMoney(row.discountAmount)}</TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <Badge
                      variant='outline'
                      className={cn(
                        'rounded-full px-3 py-1 text-xs',
                        historyStatusTone(row.importStatus)
                      )}
                    >
                      {historyStatusLabel(row.importStatus)}
                    </Badge>
                    {row.batchStatus ? (
                      <div className='text-[11px] uppercase tracking-[0.18em] text-muted-foreground'>
                        {row.batchStatus}
                      </div>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className='max-w-[20rem]'>
                  <div className='truncate text-foreground'>{row.sourceFilename ?? '—'}</div>
                </TableCell>
                <TableCell className='whitespace-nowrap text-muted-foreground'>
                  {formatDateTime(row.lastImportedAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function ItemSalesTargetDailyHistoryPage({
  overview
}: ItemSalesTargetDailyHistoryPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [targetId, setTargetId] = useState(overview.selectedTargetId ?? '');
  const [fromDate, setFromDate] = useState(overview.fromDate);
  const [toDate, setToDate] = useState(overview.toDate);

  useEffect(() => {
    setTargetId(overview.selectedTargetId ?? '');
    setFromDate(overview.fromDate);
    setToDate(overview.toDate);
  }, [overview.fromDate, overview.selectedTargetId, overview.toDate]);

  const targetOptions = overview.targets;

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (targetId) {
      params.set('targetId', targetId);
    }

    if (fromDate) {
      params.set('from', fromDate);
    }

    if (toDate) {
      params.set('to', toDate);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleTargetChange = (value: string) => {
    setTargetId(value);

    const selectedTarget = targetOptions.find((target) => target.id === value);
    if (selectedTarget?.startDate) {
      setFromDate(format(selectedTarget.startDate, 'yyyy-MM-dd'));
    }
  };

  const selectedTarget = overview.selectedTarget;
  const summary = overview.summary;
  const hasTargets = targetOptions.length > 0;

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
        <Card className='border-border bg-card text-card-foreground shadow-sm'>
          <CardHeader>
            <CardDescription className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
              Filters
            </CardDescription>
            <CardTitle className='text-lg font-semibold text-card-foreground'>
              Daily Progress History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasTargets ? (
              <form
                className='grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_auto]'
                onSubmit={(event) => {
                  event.preventDefault();
                  applyFilters();
                }}
              >
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-foreground'>Target</label>
                  <Select value={targetId} onValueChange={handleTargetChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select target' />
                    </SelectTrigger>
                    <SelectContent>
                      {targetOptions.map((target) => (
                        <SelectItem key={target.id} value={target.id}>
                          {target.itemName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='item-sales-history-from'
                    className='text-sm font-medium text-foreground'
                  >
                    From Date
                  </label>
                  <Input
                    id='item-sales-history-from'
                    type='date'
                    value={fromDate}
                    onChange={(event) => setFromDate(event.target.value)}
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='item-sales-history-to'
                    className='text-sm font-medium text-foreground'
                  >
                    To Date
                  </label>
                  <Input
                    id='item-sales-history-to'
                    type='date'
                    value={toDate}
                    onChange={(event) => setToDate(event.target.value)}
                  />
                </div>

                <div className='flex items-end'>
                  <Button type='submit' className='w-full xl:w-auto'>
                    <Icons.check className='mr-2 h-4 w-4' />
                    Apply
                  </Button>
                </div>
              </form>
            ) : (
              <EmptyState message='No item sales targets found.' />
            )}
          </CardContent>
        </Card>

        <SelectedTargetCard overview={overview} />
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
        <InfoCard
          label='Total Paid Qty'
          value={summary.totalSold.toLocaleString()}
          subtext='Paid quantity across the selected range'
        />
        <InfoCard
          label='Total Daily Target'
          value={summary.totalDailyTarget.toLocaleString()}
          subtext='Daily target summed across days'
        />
        <InfoCard
          label='Average %'
          value={formatPercent(summary.averagePercent)}
          subtext='Average of daily progress'
        />
        <InfoCard
          label='Best Day'
          value={
            summary.bestDay
              ? `${format(summary.bestDay.date, 'MMM d, yyyy')} • ${formatPercent(summary.bestDay.percent)}`
              : '—'
          }
          subtext={
            summary.bestDay ? `${summary.bestDay.soldQty.toLocaleString()} paid` : 'No active day'
          }
        />
        <InfoCard
          label='Missing Import Days'
          value={summary.missingImportDays.toLocaleString()}
          subtext='Days without import rows'
        />
      </div>

      {hasTargets ? (
        <Card className='border-border bg-card text-card-foreground shadow-sm'>
          <CardHeader>
            <CardDescription className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
              Daily Table
            </CardDescription>
            <CardTitle className='text-lg font-semibold text-card-foreground'>
              {selectedTarget ? selectedTarget.itemName : 'Daily Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HistoryTable rows={overview.rows} />
          </CardContent>
        </Card>
      ) : (
        <EmptyState message='Create an Item Sales Target first, then return here to review daily history.' />
      )}
    </div>
  );
}
