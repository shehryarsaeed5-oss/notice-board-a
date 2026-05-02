'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';

import { saveSystemSettings } from '../api/client';
import type { SystemSettingsResult } from '../api/types';
import { TIMEZONE_OPTIONS } from '../api/types';
import { systemSettingsSchema, type SystemSettingsFormValues } from '../schemas/system-settings';

const TIMEZONE_LABELS: Record<string, string> = {
  'Asia/Karachi': 'Asia/Karachi',
  UTC: 'UTC',
  'Asia/Dubai': 'Asia/Dubai',
  'Asia/Kolkata': 'Asia/Kolkata',
  'Asia/Singapore': 'Asia/Singapore',
  'Europe/London': 'Europe/London',
  'America/New_York': 'America/New_York'
};

function SettingCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>{children}</CardContent>
    </Card>
  );
}

function EmptySettingsNotice() {
  return (
    <Card className='border-dashed border-border/60 bg-card/60 shadow-sm'>
      <CardHeader>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <CardTitle className='text-base'>No saved settings yet</CardTitle>
            <CardDescription>
              The form is prefilled with sensible defaults. Save once to persist the settings to
              PostgreSQL.
            </CardDescription>
          </div>
          <Badge variant='outline' className='border-amber-500/30 bg-amber-500/10 text-amber-200'>
            Defaults active
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}

export function SystemSettingsPage({ initialSettings }: { initialSettings: SystemSettingsResult }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: saveSystemSettings,
    onSuccess: () => {
      toast.success('System settings saved');
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to save system settings');
    }
  });

  const form = useAppForm({
    defaultValues: initialSettings.values as SystemSettingsFormValues,
    onSubmit: async ({ value }) => {
      const parsed = systemSettingsSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the settings form errors');
        return;
      }

      await mutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<SystemSettingsFormValues>();

  return (
    <PageContainer
      pageTitle='System Settings'
      pageDescription='Manage shared configuration values used across the notice board.'
      pageHeaderAction={
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              form='system-settings-form'
              disabled={!canSubmit}
              isLoading={isSubmitting || mutation.isPending}
            >
              <Icons.check className='mr-2 h-4 w-4' />
              Save Settings
            </Button>
          )}
        </form.Subscribe>
      }
    >
      <form.AppForm>
        <form.Form id='system-settings-form' className='space-y-4'>
          {!initialSettings.hasSavedSettings && <EmptySettingsNotice />}

          <div className='grid gap-4 xl:grid-cols-2'>
            <SettingCard
              title='General Settings'
              description='Core identity values shown across the admin shell and exported screens.'
            >
              <FormTextField
                name='siteName'
                label='Site Name'
                required
                placeholder='Cinema Notice Board'
                description='Primary site label used in the dashboard and display headers.'
              />

              <FormTextField
                name='companyName'
                label='Company Name'
                placeholder='Cinema Notice Board'
                description='Optional business name shown in reports and future exports.'
              />
            </SettingCard>

            <SettingCard
              title='Display Settings'
              description='Timing and routing values used by public display pages.'
            >
              <FormTextField
                name='displayRefreshSeconds'
                label='Display Refresh Seconds'
                required
                type='number'
                placeholder='60'
                description='How often display screens should auto-refresh as a backup.'
                min={1}
                step={1}
              />

              <FormTextField
                name='defaultDisplaySlug'
                label='Default Display Slug'
                placeholder='lobby-main'
                description='Optional fallback public display route for operations and signage.'
              />

              <FormSelectField
                name='timezone'
                label='Timezone'
                required
                placeholder='Select timezone'
                description='Used for display timing and business hour calculations.'
                options={TIMEZONE_OPTIONS.map((value) => ({
                  value,
                  label: TIMEZONE_LABELS[value] ?? value
                }))}
              />
            </SettingCard>

            <SettingCard
              title='Business Hours'
              description='Operational cutoff used by reports and day-based summaries.'
            >
              <FormTextField
                name='businessDayCutoffHour'
                label='Business Day Cutoff Hour'
                required
                type='number'
                placeholder='6'
                description='Hour of day from 0 to 23 used as the start of a business day.'
                min={0}
                max={23}
                step={1}
              />
            </SettingCard>

            <Card className='border-border/60 bg-card/90 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-base'>Redis Refresh</CardTitle>
                <CardDescription>
                  Saving settings bumps the display refresh token so public screens reload with the
                  new configuration.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-sm text-muted-foreground'>
                <p>
                  The refresh token is version-based, so existing cached display board payloads are
                  invalidated without requiring Redis to be available.
                </p>
                <Badge variant='outline' className='border-primary/30 bg-primary/10 text-primary'>
                  Live display reload enabled
                </Badge>
              </CardContent>
            </Card>
          </div>
        </form.Form>
      </form.AppForm>
    </PageContainer>
  );
}
