'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { formatDateTimeInputValue } from '@/lib/date-time';

import { createAlert, updateAlert } from '../api/client';
import type { AlertRecord, AlertStatus, AlertType } from '../api/types';
import {
  ALERT_STATUS_OPTIONS,
  ALERT_STATUS_VALUES,
  ALERT_TYPE_OPTIONS,
  ALERT_TYPE_VALUES
} from '../constants';
import {
  alertSchema,
  optionalNonNegativeInteger,
  type AlertFormSchemaValues
} from '../schemas/alert';

const STATUS_OPTIONS: Array<{ value: AlertStatus; label: string }> = ALERT_STATUS_OPTIONS;
const ALERT_OPTIONS: Array<{ value: AlertType; label: string }> = ALERT_TYPE_OPTIONS;

interface AlertFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert?: AlertRecord;
}

export function AlertFormSheet({ open, onOpenChange, alert }: AlertFormSheetProps) {
  const router = useRouter();
  const isEdit = !!alert;

  const createMutation = useMutation({
    mutationFn: createAlert,
    onSuccess: () => {
      toast.success('Alert created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create alert');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: AlertFormSchemaValues }) =>
      updateAlert(id, values),
    onSuccess: () => {
      toast.success('Alert updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update alert');
    }
  });

  const form = useAppForm({
    defaultValues: {
      title: alert?.title ?? '',
      message: alert?.message ?? '',
      alertType: alert?.alertType ?? 'INFO',
      priority: alert?.priority ?? 0,
      startAt: alert?.startAt ? formatDateTimeInputValue(alert.startAt) : '',
      endAt: alert?.endAt ? formatDateTimeInputValue(alert.endAt) : '',
      status: alert?.status ?? 'ACTIVE'
    } as AlertFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = alertSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the alert form errors');
        return;
      }

      if (isEdit && alert) {
        await updateMutation.mutateAsync({ id: alert.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [form, open]);

  const { FormTextField, FormSelectField, FormTextareaField } =
    useFormFields<AlertFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Alert' : 'Add Alert'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the alert details below.'
              : 'Create a live alert banner for the public display.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='alert-form' className='space-y-4'>
              <FormTextField
                name='title'
                label='Title'
                required
                placeholder='Fire drill notice'
                validators={{
                  onBlur: z.string().trim().min(1, 'Title is required')
                }}
              />

              <FormTextareaField
                name='message'
                label='Message'
                placeholder='Optional message shown on the display board'
                rows={4}
              />

              <div className='grid gap-4 md:grid-cols-2'>
                <FormSelectField
                  name='alertType'
                  label='Alert Type'
                  required
                  options={ALERT_OPTIONS}
                  placeholder='Select alert type'
                  validators={{
                    onBlur: z.enum(ALERT_TYPE_VALUES)
                  }}
                />

                <FormTextField
                  name='priority'
                  label='Priority'
                  type='number'
                  min={0}
                  step={1}
                  placeholder='0'
                  description='Higher priority alerts appear first.'
                  validators={{
                    onBlur: optionalNonNegativeInteger
                  }}
                />
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <form.AppField
                  name='startAt'
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <field.FieldSet>
                        <field.Field>
                          <field.FieldLabel htmlFor={field.name}>
                            Start Date / Time
                          </field.FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type='datetime-local'
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) => field.handleChange(event.target.value)}
                            aria-invalid={isInvalid}
                          />
                          <field.FieldError />
                        </field.Field>
                      </field.FieldSet>
                    );
                  }}
                />

                <form.AppField
                  name='endAt'
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <field.FieldSet>
                        <field.Field>
                          <field.FieldLabel htmlFor={field.name}>End Date / Time</field.FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type='datetime-local'
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) => field.handleChange(event.target.value)}
                            aria-invalid={isInvalid}
                          />
                          <field.FieldError />
                        </field.Field>
                      </field.FieldSet>
                    );
                  }}
                />
              </div>

              <FormSelectField
                name='status'
                label='Status'
                required
                options={STATUS_OPTIONS}
                placeholder='Select status'
                validators={{
                  onBlur: z.enum(ALERT_STATUS_VALUES)
                }}
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
            form='alert-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Alert' : 'Create Alert'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function AlertFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Alert
      </Button>
      <AlertFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
