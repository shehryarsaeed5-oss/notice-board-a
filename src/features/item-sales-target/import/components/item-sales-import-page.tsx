'use client';

import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { cn } from '@/lib/utils';

import {
  runItemSalesImportRange,
  runItemSalesImportToday,
  saveItemSalesImportSettings
} from '../api/client';
import type {
  ItemSalesImportBatchRecord,
  ItemSalesImportOverview,
  ItemSalesImportRowRecord
} from '../api/types';
import {
  itemSalesImportRangeSchema,
  itemSalesImportSettingsSchema,
  type ItemSalesImportRangeFormValues,
  type ItemSalesImportSettingsFormValues
} from '../schemas/item-sales-import';

function formatDateTime(value: Date | null | undefined) {
  return value ? format(value, 'MMM d, yyyy h:mm a') : '—';
}

function formatDate(value: Date | null | undefined) {
  return value ? format(value, 'MMM d, yyyy') : '—';
}

function formatMoney(value: number | null | undefined) {
  return value === null || value === undefined
    ? '—'
    : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatPercent(value: number | null | undefined) {
  return value === null || value === undefined
    ? '—'
    : `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
}

function statusTone(status: string | null) {
  switch (status) {
    case 'COMPLETED':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-100';
    case 'EMPTY':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-100';
    case 'SKIPPED':
      return 'border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-100';
    case 'FAILED':
      return 'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-100';
    default:
      return 'border-border bg-muted/50 text-foreground';
  }
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className='rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-5 text-sm text-muted-foreground'>
      {message}
    </div>
  );
}

function SectionCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className='border-border bg-card text-card-foreground shadow-sm'>
      <CardHeader>
        <CardDescription className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
          {description}
        </CardDescription>
        <CardTitle className='text-lg font-semibold text-card-foreground'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>{children}</CardContent>
    </Card>
  );
}

function PreviewTable({ rows }: { rows: ItemSalesImportRowRecord[] }) {
  return (
    <div className='overflow-x-auto rounded-2xl border border-border bg-card'>
      <Table className='min-w-[1400px]'>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <TableHead className='min-w-44'>Item Class / Category</TableHead>
            <TableHead className='min-w-36'>Item Code</TableHead>
            <TableHead className='min-w-56'>Item Name</TableHead>
            <TableHead className='min-w-24'>UOM</TableHead>
            <TableHead className='min-w-28 text-right'>Total Qty</TableHead>
            <TableHead className='min-w-28 text-right'>Paid Qty</TableHead>
            <TableHead className='min-w-28 text-right'>FOC Qty</TableHead>
            <TableHead className='min-w-36 text-right'>Discount Amount</TableHead>
            <TableHead className='min-w-32 text-right'>Paid Amount</TableHead>
            <TableHead className='min-w-28 text-right'>Tax</TableHead>
            <TableHead className='min-w-32 text-right'>Sales Value</TableHead>
            <TableHead className='min-w-28 text-right'>Cost</TableHead>
            <TableHead className='min-w-28 text-right'>Margin</TableHead>
            <TableHead className='min-w-36 text-right'>% Of Total Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={14} className='h-24 text-center text-muted-foreground'>
                No preview rows available for the selected date.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.categoryName ?? '—'}</TableCell>
                <TableCell className='font-medium'>{row.itemCode ?? '—'}</TableCell>
                <TableCell>{row.itemName}</TableCell>
                <TableCell>{row.uom ?? '—'}</TableCell>
                <TableCell className='text-right'>{row.totalQty.toLocaleString()}</TableCell>
                <TableCell className='text-right'>{row.paidQty.toLocaleString()}</TableCell>
                <TableCell className='text-right'>{row.focQty.toLocaleString()}</TableCell>
                <TableCell className='text-right'>{formatMoney(row.discountAmount)}</TableCell>
                <TableCell className='text-right'>{formatMoney(row.paidAmount)}</TableCell>
                <TableCell className='text-right'>{formatMoney(row.taxValue)}</TableCell>
                <TableCell className='text-right'>{formatMoney(row.salesValue)}</TableCell>
                <TableCell className='text-right'>{formatMoney(row.costValue)}</TableCell>
                <TableCell className='text-right'>{formatMoney(row.marginValue)}</TableCell>
                <TableCell className='text-right'>{formatPercent(row.percentTotalSales)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function ImportsTable({ batches }: { batches: ItemSalesImportBatchRecord[] }) {
  return (
    <div className='overflow-hidden rounded-2xl border border-border bg-card'>
      <Table>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <TableHead>Report Date</TableHead>
            <TableHead>File</TableHead>
            <TableHead className='text-right'>Rows</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Imported At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center text-muted-foreground'>
                No import history available yet.
              </TableCell>
            </TableRow>
          ) : (
            batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell>{formatDate(batch.reportDate)}</TableCell>
                <TableCell className='max-w-[24rem] truncate'>{batch.sourceFilename}</TableCell>
                <TableCell className='text-right'>{batch.rowCount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className={cn('rounded-full px-3 py-1 text-xs', statusTone(batch.status))}
                  >
                    {batch.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDateTime(batch.importedAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function ItemSalesImportPage({
  initialOverview
}: {
  initialOverview: ItemSalesImportOverview;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(initialOverview.selectedDate);
  const [fromDate, setFromDate] = useState(initialOverview.selectedDate);
  const [toDate, setToDate] = useState(initialOverview.selectedDate);
  const [forceReplace, setForceReplace] = useState(false);

  useEffect(() => {
    setSelectedDate(initialOverview.selectedDate);
    setFromDate(initialOverview.selectedDate);
    setToDate(initialOverview.selectedDate);
  }, [initialOverview.selectedDate]);

  const settingsMutation = useMutation({
    mutationFn: saveItemSalesImportSettings,
    onSuccess: () => {
      toast.success('Import settings saved');
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save import settings');
    }
  });

  const todayMutation = useMutation({
    mutationFn: runItemSalesImportToday,
    onSuccess: (response) => {
      toast.success(response.result.message);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import today's sales");
    }
  });

  const rangeMutation = useMutation({
    mutationFn: runItemSalesImportRange,
    onSuccess: (response) => {
      const imported = response.result.results.filter((item) => item.status === 'COMPLETED').length;
      toast.success(`Imported ${imported} date(s).`);
      if (response.result.errors.length > 0) {
        toast.error(`${response.result.errors.length} date(s) failed or were skipped.`);
      }
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to import date range');
    }
  });

  const form = useAppForm({
    defaultValues: {
      sharedFolderPath: initialOverview.monitor.sharedFolderPath,
      autoImportEnabled: initialOverview.monitor.autoImportEnabled
    } as ItemSalesImportSettingsFormValues,
    onSubmit: async ({ value }) => {
      const parsed = itemSalesImportSettingsSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the import settings form errors');
        return;
      }

      await settingsMutation.mutateAsync(parsed.data);
    }
  });

  useEffect(() => {
    form.setFieldValue('sharedFolderPath', initialOverview.monitor.sharedFolderPath);
    form.setFieldValue('autoImportEnabled', initialOverview.monitor.autoImportEnabled);
  }, [form, initialOverview.monitor.autoImportEnabled, initialOverview.monitor.sharedFolderPath]);

  const { FormTextField, FormSwitchField } = useFormFields<ItemSalesImportSettingsFormValues>();

  const selectedBatch = initialOverview.selectedBatch;
  const previewRows = initialOverview.previewRows;
  const monitor = initialOverview.monitor;

  const applyDate = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', selectedDate);
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const runRangeImport = async () => {
    const parsed = itemSalesImportRangeSchema.safeParse({ fromDate, toDate, forceReplace });

    if (!parsed.success) {
      toast.error('Please fix the range dates');
      return;
    }

    await rangeMutation.mutateAsync(parsed.data);
  };

  const lastImportLabel = useMemo(() => {
    if (!monitor.lastImportAt) {
      return 'No import history yet';
    }

    return `${monitor.lastImportStatus ?? 'UNKNOWN'} • ${formatDateTime(monitor.lastImportAt)}`;
  }, [monitor.lastImportAt, monitor.lastImportStatus]);

  return (
    <div className='grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
      <div className='space-y-4'>
        <SectionCard title='Import Settings' description='Shared folder and automatic import flag'>
          <form.AppForm>
            <form.Form id='item-sales-import-settings-form' className='space-y-4'>
              <FormTextField
                name='sharedFolderPath'
                label='Shared Folder Root Path'
                placeholder='\\192.168.12.6\\Vista\\WSVistaReports\\FILES'
                description='The app scans YYYYMMDD folders beneath this root.'
              />

              <FormSwitchField
                name='autoImportEnabled'
                label='Auto Import Enabled'
                description='Reserved for future scheduled imports. Manual imports still work now.'
              />

              <div className='flex flex-wrap justify-end gap-2'>
                <Button
                  type='submit'
                  form='item-sales-import-settings-form'
                  isLoading={settingsMutation.isPending}
                >
                  <Icons.check />
                  Save Settings
                </Button>
              </div>
            </form.Form>
          </form.AppForm>
        </SectionCard>

        <SectionCard title='Import Actions' description='Run a daily or range import'>
          <div className='grid gap-3'>
            <div className='grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end'>
              <div className='space-y-2'>
                <label
                  htmlFor='item-sales-import-date'
                  className='text-sm font-medium text-foreground'
                >
                  Preview Date
                </label>
                <Input
                  id='item-sales-import-date'
                  type='date'
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </div>

              <Button type='button' variant='outline' onClick={applyDate}>
                Load Preview
              </Button>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Button
                type='button'
                onClick={() => void todayMutation.mutateAsync({ forceReplace })}
              >
                <Icons.refresh className='mr-2 h-4 w-4' />
                Import Today
              </Button>
            </div>

            <label className='flex items-start gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground'>
              <input
                type='checkbox'
                checked={forceReplace}
                onChange={(event) => setForceReplace(event.target.checked)}
                className='mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary'
              />
              <span className='space-y-1'>
                <span className='block font-medium'>
                  Re-import existing files / Replace existing imported data
                </span>
                <span className='block text-xs text-muted-foreground'>
                  Use this after parser fixes or when imported rows need to be rebuilt.
                </span>
              </span>
            </label>

            <div className='grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end'>
              <div className='space-y-2'>
                <label
                  htmlFor='item-sales-import-from'
                  className='text-sm font-medium text-foreground'
                >
                  From Date
                </label>
                <Input
                  id='item-sales-import-from'
                  type='date'
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='item-sales-import-to'
                  className='text-sm font-medium text-foreground'
                >
                  To Date
                </label>
                <Input
                  id='item-sales-import-to'
                  type='date'
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                />
              </div>
              <Button
                type='button'
                onClick={() => void runRangeImport()}
                isLoading={rangeMutation.isPending}
              >
                <Icons.calendar className='mr-2 h-4 w-4' />
                Run Range Import
              </Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title='Last Import Status' description='Latest settings and import monitor'>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-2xl border border-border bg-muted/30 px-4 py-3'>
              <div className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
                Last Scan
              </div>
              <div className='mt-1 text-sm font-medium text-foreground'>
                {formatDateTime(monitor.lastScanAt)}
              </div>
            </div>
            <div className='rounded-2xl border border-border bg-muted/30 px-4 py-3'>
              <div className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
                Last Import
              </div>
              <div className='mt-1 text-sm font-medium text-foreground'>
                {formatDateTime(monitor.lastImportAt)}
              </div>
            </div>
            <div className='rounded-2xl border border-border bg-muted/30 px-4 py-3'>
              <div className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
                Status
              </div>
              <div className='mt-1 text-sm font-medium text-foreground'>
                {monitor.lastImportStatus ?? '—'}
              </div>
            </div>
            <div className='rounded-2xl border border-border bg-muted/30 px-4 py-3'>
              <div className='text-[11px] uppercase tracking-[0.24em] text-muted-foreground'>
                Rows
              </div>
              <div className='mt-1 text-sm font-medium text-foreground'>
                {monitor.lastImportCount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className='rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground'>
            {monitor.lastImportMessage ?? 'No import activity yet.'}
          </div>
          <div className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>
            {lastImportLabel}
          </div>
        </SectionCard>
      </div>

      <div className='space-y-4'>
        <SectionCard
          title='Import Preview'
          description={`Latest rows for ${selectedBatch ? formatDate(selectedBatch.reportDate) : selectedDate}`}
        >
          {selectedBatch ? (
            <div className='space-y-3'>
              <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
                <Badge className='border-border bg-muted/50 text-foreground'>
                  {selectedBatch.sourceFilename}
                </Badge>
                <Badge
                  className={cn('rounded-full px-3 py-1 text-xs', statusTone(selectedBatch.status))}
                >
                  {selectedBatch.status}
                </Badge>
                <Badge className='border-border bg-muted/50 text-foreground'>
                  {selectedBatch.rowCount.toLocaleString()} row(s)
                </Badge>
              </div>
              <PreviewTable rows={previewRows} />
            </div>
          ) : (
            <EmptyState message='No synced rows available for the selected date.' />
          )}
        </SectionCard>

        <SectionCard title='Recent Imports' description='Latest import batches and outcomes'>
          <ImportsTable batches={initialOverview.recentImports} />
        </SectionCard>
      </div>
    </div>
  );
}
