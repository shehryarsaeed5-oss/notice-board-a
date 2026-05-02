'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { WeatherSettingFormSheet } from './weather-setting-form-sheet';
import { setWeatherSettingEnabled } from '../api/client';
import type { WeatherSettingEditableRecord } from '../api/types';

interface WeatherSettingsPageActionsProps {
  weatherSetting: WeatherSettingEditableRecord;
}

export function WeatherSettingsPageActions({ weatherSetting }: WeatherSettingsPageActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);

  const toggleMutation = useMutation({
    mutationFn: () =>
      setWeatherSettingEnabled(weatherSetting.id, { enabled: !weatherSetting.enabled }),
    onSuccess: () => {
      toast.success(
        weatherSetting.enabled ? 'Weather setting disabled' : 'Weather setting enabled'
      );
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to update weather setting');
    }
  });

  return (
    <div className='flex items-center gap-2'>
      <WeatherSettingFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        weatherSetting={weatherSetting}
      />
      <Button variant='outline' onClick={() => setEditOpen(true)}>
        <Icons.edit className='mr-2 size-4' />
        Edit
      </Button>
      <Button
        variant='secondary'
        isLoading={toggleMutation.isPending}
        onClick={() => toggleMutation.mutate()}
      >
        {weatherSetting.enabled ? (
          <Icons.moon className='mr-2 size-4' />
        ) : (
          <Icons.sun className='mr-2 size-4' />
        )}
        {weatherSetting.enabled ? 'Disable' : 'Enable'}
      </Button>
    </div>
  );
}
