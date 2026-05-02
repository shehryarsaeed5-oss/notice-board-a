'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { createWeatherSetting, updateWeatherSetting } from '../api/client';
import type { WeatherSettingEditableRecord, WeatherSettingProvider } from '../api/types';
import {
  weatherSettingSchema,
  type WeatherSettingFormSchemaValues
} from '../schemas/weather-setting';

const PROVIDER_OPTIONS: Array<{ value: WeatherSettingProvider; label: string }> = [
  { value: 'openweather', label: 'OpenWeather' },
  { value: 'weatherapi', label: 'WeatherAPI' },
  { value: 'openmeteo', label: 'Open-Meteo' }
];

interface WeatherSettingFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weatherSetting?: WeatherSettingEditableRecord;
}

export function WeatherSettingFormSheet({
  open,
  onOpenChange,
  weatherSetting
}: WeatherSettingFormSheetProps) {
  const router = useRouter();
  const isEdit = !!weatherSetting;

  const createMutation = useMutation({
    mutationFn: createWeatherSetting,
    onSuccess: () => {
      toast.success('Weather setting created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create weather setting');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: WeatherSettingFormSchemaValues }) =>
      updateWeatherSetting(id, values),
    onSuccess: () => {
      toast.success('Weather setting updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update weather setting');
    }
  });

  const form = useAppForm({
    defaultValues: {
      city: weatherSetting?.city ?? '',
      provider: weatherSetting?.provider ?? 'openmeteo',
      apiKey: weatherSetting?.apiKey ?? '',
      enabled: weatherSetting?.enabled ?? true
    } as WeatherSettingFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = weatherSettingSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the weather setting form errors');
        return;
      }

      if (isEdit && weatherSetting) {
        await updateMutation.mutateAsync({ id: weatherSetting.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField, FormSwitchField } =
    useFormFields<WeatherSettingFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Weather Setting' : 'Add Weather Setting'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the weather configuration below.'
              : 'Create the first weather configuration for the dashboard.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='weather-setting-form' className='space-y-4'>
              <FormTextField
                name='city'
                label='City'
                required
                placeholder='Karachi'
                validators={{
                  onBlur: z.string().trim().min(2, 'City is required')
                }}
              />

              <FormSelectField
                name='provider'
                label='Provider'
                required
                options={PROVIDER_OPTIONS}
                placeholder='Select provider'
                description='Open-Meteo can work without an API key.'
                validators={{
                  onBlur: z.enum(['openweather', 'weatherapi', 'openmeteo'])
                }}
              />

              <FormTextField
                name='apiKey'
                label='API Key'
                type='text'
                placeholder='Optional API key'
                description='Leave blank when the provider does not require a key.'
              />

              <FormSwitchField
                name='enabled'
                label='Enabled'
                description='Turn this weather configuration on or off.'
              />
            </form.Form>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type='submit'
            form='weather-setting-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Weather' : 'Create Weather'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function WeatherSettingFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Weather Setting
      </Button>
      <WeatherSettingFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
