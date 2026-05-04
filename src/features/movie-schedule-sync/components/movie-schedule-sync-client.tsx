'use client';

import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

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
import { badgeToneClass, statusBadgeClass } from '@/lib/status-badge';
import { cn } from '@/lib/utils';

import {
  clearMovieScheduleSyncedRows,
  runMovieScheduleSync,
  updateMovieScheduleSyncSetting
} from '../api/client';
import type {
  MovieScheduleSyncLogRecord,
  MovieScheduleSyncOverview,
  MovieScheduleSyncedRowRecord
} from '../api/types';
import {
  movieScheduleSyncSettingSchema,
  type MovieScheduleSyncSettingFormValues
} from '../schemas/movie-schedule-sync';

function formatDateTime(value: Date | null | undefined) {
  return value ? format(value, 'MMM d, yyyy h:mm a') : '—';
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return '—';
  }

  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : format(parsed, 'MMM d, yyyy');
}

function formatTime(row: MovieScheduleSyncedRowRecord) {
  const parsed = row.showDateTime ?? new Date(`${row.showDate}T${row.showTime}:00`);
  return Number.isNaN(parsed.getTime()) ? row.showTime : format(parsed, 'h:mm a');
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className='rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-5 text-sm text-muted-foreground'>
      {message}
    </div>
  );
}

function SettingsNote({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground'>
      {children}
    </div>
  );
}

function LastSyncBadge({ status }: { status: string | null }) {
  const label = status ?? 'Not synced yet';
  return (
    <Badge variant='outline' className={cn('capitalize', statusBadgeClass(status))}>
      {label.toLowerCase()}
    </Badge>
  );
}

function PreviewTable({ rows }: { rows: MovieScheduleSyncedRowRecord[] }) {
  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <TableHead>Movie Name</TableHead>
            <TableHead>Screen</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-muted-foreground h-24 text-center'>
                No synced rows for the selected date.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className='font-medium'>{row.movieName}</TableCell>
                <TableCell>{row.screenName}</TableCell>
                <TableCell className='whitespace-nowrap'>{formatDate(row.showDate)}</TableCell>
                <TableCell className='whitespace-nowrap'>{formatTime(row)}</TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className={cn(
                      row.isActive ? badgeToneClass('success') : badgeToneClass('neutral')
                    )}
                  >
                    {row.isActive ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function LogsTable({ logs }: { logs: MovieScheduleSyncLogRecord[] }) {
  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Finished</TableHead>
            <TableHead>Rows</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-muted-foreground h-24 text-center'>
                No sync logs yet.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Badge variant='outline' className={statusBadgeClass(log.status)}>
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className='whitespace-nowrap'>{formatDateTime(log.startedAt)}</TableCell>
                <TableCell className='whitespace-nowrap'>
                  {formatDateTime(log.finishedAt)}
                </TableCell>
                <TableCell>{log.rowCount.toLocaleString()}</TableCell>
                <TableCell className='max-w-[28rem] truncate text-muted-foreground'>
                  {log.message ?? '—'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function MovieScheduleSyncClient({
  initialOverview
}: {
  initialOverview: MovieScheduleSyncOverview;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(initialOverview.selectedDate);

  useEffect(() => {
    setSelectedDate(initialOverview.selectedDate);
  }, [initialOverview.selectedDate]);

  const settingsMutation = useMutation({
    mutationFn: updateMovieScheduleSyncSetting,
    onSuccess: () => {
      toast.success('Sync settings saved');
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save sync settings');
    }
  });

  const runMutation = useMutation({
    mutationFn: runMovieScheduleSync,
    onSuccess: () => {
      toast.success('Movie schedule synced successfully');
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to run movie schedule sync');
    }
  });

  const clearMutation = useMutation({
    mutationFn: clearMovieScheduleSyncedRows,
    onSuccess: () => {
      toast.success('Synced rows cleared');
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to clear synced rows');
    }
  });

  const form = useAppForm({
    defaultValues: {
      enabled: initialOverview.setting.enabled,
      sourceType: initialOverview.setting.sourceType,
      apiUrl: initialOverview.setting.apiUrl,
      apiToken: ''
    } as MovieScheduleSyncSettingFormValues,
    onSubmit: async ({ value }) => {
      const parsed = movieScheduleSyncSettingSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the sync settings form errors');
        return;
      }

      await settingsMutation.mutateAsync(parsed.data);
    }
  });

  useEffect(() => {
    form.setFieldValue('enabled', initialOverview.setting.enabled);
    form.setFieldValue('sourceType', initialOverview.setting.sourceType);
    form.setFieldValue('apiUrl', initialOverview.setting.apiUrl);
    form.setFieldValue('apiToken', '');
  }, [
    form,
    initialOverview.setting.apiUrl,
    initialOverview.setting.enabled,
    initialOverview.setting.sourceType
  ]);

  const { FormTextField, FormSwitchField } = useFormFields<MovieScheduleSyncSettingFormValues>();

  const selectedSyncDate = useMemo(
    () => selectedDate || initialOverview.selectedDate,
    [initialOverview.selectedDate, selectedDate]
  );

  const applyDate = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedSyncDate) {
      params.set('date', selectedSyncDate);
    } else {
      params.delete('date');
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const runSync = async () => {
    applyDate();
    await runMutation.mutateAsync({ showDate: selectedSyncDate });
  };

  const clearRows = async () => {
    const confirmed = window.confirm(
      'Clear all synced rows? This will remove the current synced movie schedule cache.'
    );

    if (!confirmed) {
      return;
    }

    await clearMutation.mutateAsync();
  };

  const lastSync = initialOverview.setting;
  const hasSavedSettings = lastSync.createdAt.getTime() > 0;

  return (
    <div className='grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
      <div className='space-y-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader className='space-y-2'>
            <CardTitle className='text-base'>Sync Settings</CardTitle>
            <CardDescription>
              Connect to the Digital Signage API and control when synced movie schedules should be
              used on the public display.
            </CardDescription>
            <div className='flex flex-wrap gap-2'>
              <Badge variant='outline' className={badgeToneClass('info')}>
                Digital Signage API
              </Badge>
              {lastSync.apiTokenSet ? (
                <Badge variant='outline' className={badgeToneClass('success')}>
                  Token saved
                </Badge>
              ) : (
                <Badge variant='outline' className={badgeToneClass('neutral')}>
                  Token optional
                </Badge>
              )}
              {lastSync.enabled ? (
                <Badge variant='outline' className={badgeToneClass('success')}>
                  Sync enabled
                </Badge>
              ) : (
                <Badge variant='outline' className={badgeToneClass('neutral')}>
                  Sync disabled
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {!hasSavedSettings && (
              <SettingsNote>
                No saved sync settings yet. The form is prefilled with sensible defaults.
              </SettingsNote>
            )}

            <form.AppForm>
              <form.Form id='movie-schedule-sync-settings-form' className='space-y-4'>
                <FormSwitchField
                  name='enabled'
                  label='Enable Synced Schedule'
                  description='When enabled, the public display will prefer synced movie rows for today.'
                />

                <FormTextField
                  name='apiUrl'
                  label='API URL'
                  required
                  placeholder='http://localhost:3001/api/share/movie-schedule'
                  description='The source endpoint should accept a date query string.'
                />

                <FormTextField
                  name='apiToken'
                  label='API Token'
                  placeholder='Optional API token'
                  description='Leave blank to keep the existing token.'
                />

                <div className='flex flex-wrap justify-end gap-2 pt-2'>
                  <Button
                    type='submit'
                    form='movie-schedule-sync-settings-form'
                    isLoading={settingsMutation.isPending}
                  >
                    <Icons.check />
                    Save Sync Settings
                  </Button>
                </div>
              </form.Form>
            </form.AppForm>
          </CardContent>
        </Card>

        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>Sync Actions</CardTitle>
            <CardDescription>
              Run a sync for the selected date or clear all synced rows when needed.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end'>
              <div className='space-y-2'>
                <label
                  htmlFor='movie-schedule-sync-date'
                  className='text-sm font-medium text-foreground'
                >
                  Sync date
                </label>
                <Input
                  id='movie-schedule-sync-date'
                  type='date'
                  value={selectedSyncDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </div>

              <Button type='button' variant='outline' onClick={applyDate}>
                Apply Date
              </Button>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Button type='button' onClick={runSync} isLoading={runMutation.isPending}>
                <Icons.refresh className='mr-2 h-4 w-4' />
                Run Sync Now
              </Button>
              <Button
                type='button'
                variant='outline'
                className='border-rose-700/40 text-rose-100 hover:bg-rose-950/35 hover:text-rose-50'
                onClick={clearRows}
                isLoading={clearMutation.isPending}
              >
                <Icons.trash className='mr-2 h-4 w-4' />
                Clear Synced Rows
              </Button>
            </div>

            <SettingsNote>
              Syncing fetches the configured source endpoint with{' '}
              <span className='font-mono text-foreground'>?date=YYYY-MM-DD</span>. New rows replace
              only the selected date in PostgreSQL, and the public display refreshes automatically.
            </SettingsNote>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>Last Sync Status</CardTitle>
            <CardDescription>Current sync state and latest sync result.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex flex-wrap items-center gap-2'>
              <LastSyncBadge status={lastSync.lastSyncStatus} />
              <Badge variant='outline' className={badgeToneClass('info')}>
                Rows {lastSync.lastSyncCount.toLocaleString()}
              </Badge>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-xl border border-border/60 bg-muted/20 px-4 py-3'>
                <div className='text-xs uppercase tracking-[0.24em] text-muted-foreground'>
                  Last Sync At
                </div>
                <div className='mt-1 text-sm font-medium'>
                  {formatDateTime(lastSync.lastSyncAt)}
                </div>
              </div>
              <div className='rounded-xl border border-border/60 bg-muted/20 px-4 py-3'>
                <div className='text-xs uppercase tracking-[0.24em] text-muted-foreground'>
                  Selected Date
                </div>
                <div className='mt-1 text-sm font-medium'>{selectedSyncDate}</div>
              </div>
            </div>

            <div className='rounded-xl border border-border/60 bg-muted/20 px-4 py-3'>
              <div className='text-xs uppercase tracking-[0.24em] text-muted-foreground'>
                Last Message
              </div>
              <div className='mt-1 text-sm text-muted-foreground'>
                {lastSync.lastSyncMessage ?? 'No sync activity yet.'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>Synced Row Preview</CardTitle>
            <CardDescription>Latest synced rows for the selected date.</CardDescription>
          </CardHeader>
          <CardContent>
            {initialOverview.syncedRows.length === 0 ? (
              <EmptyState message='No synced rows available for the selected date.' />
            ) : (
              <PreviewTable rows={initialOverview.syncedRows} />
            )}
          </CardContent>
        </Card>

        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-base'>Recent Sync Logs</CardTitle>
            <CardDescription>Latest sync attempts and their outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            {initialOverview.logs.length === 0 ? (
              <EmptyState message='No sync logs available yet.' />
            ) : (
              <LogsTable logs={initialOverview.logs} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
