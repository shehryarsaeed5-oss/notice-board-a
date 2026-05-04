'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import { createEventRecord, updateEventRecord } from '../api/client';
import type { EventRecordItem, EventRecordStatus } from '../api/types';
import {
  EVENT_SCREEN_OPTIONS,
  EVENT_SCREEN_VALUES,
  EVENT_TITLE_OPTIONS,
  EVENT_TITLE_VALUES
} from '../constants';
import { eventRecordSchema, type EventRecordFormSchemaValues } from '../schemas/event-record';

const STATUS_OPTIONS: Array<{ value: EventRecordStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface EventRecordFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventRecord?: EventRecordItem;
}

export function EventRecordFormSheet({
  open,
  onOpenChange,
  eventRecord
}: EventRecordFormSheetProps) {
  const router = useRouter();
  const isEdit = !!eventRecord;

  const createMutation = useMutation({
    mutationFn: createEventRecord,
    onSuccess: () => {
      toast.success('Event created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create event');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: EventRecordFormSchemaValues }) =>
      updateEventRecord(id, values),
    onSuccess: () => {
      toast.success('Event updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update event');
    }
  });

  const form = useAppForm({
    defaultValues: {
      title: (eventRecord?.title ?? '') as EventRecordFormSchemaValues['title'],
      clientName: eventRecord?.clientName ?? '',
      companyName: eventRecord?.companyName ?? '',
      screenName: (eventRecord?.screenName ?? '') as EventRecordFormSchemaValues['screenName'],
      startAt: eventRecord?.startAt ? formatDateTimeInputValue(eventRecord.startAt) : '',
      endAt: eventRecord?.endAt ? formatDateTimeInputValue(eventRecord.endAt) : '',
      status: eventRecord?.status ?? 'ACTIVE'
    } as EventRecordFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = eventRecordSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the event form errors');
        return;
      }

      if (isEdit && eventRecord) {
        await updateMutation.mutateAsync({ id: eventRecord.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<EventRecordFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Event' : 'Add Event'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the event record information below.'
              : 'Create a new cinema event record for the dashboard.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='event-record-form' className='space-y-4'>
              <FormSelectField
                name='title'
                label='Title'
                required
                options={EVENT_TITLE_OPTIONS}
                placeholder='Select event title'
                validators={{
                  onBlur: z.enum(EVENT_TITLE_VALUES)
                }}
              />

              <FormTextField name='clientName' label='Client Name' placeholder='Optional client' />

              <FormTextField
                name='companyName'
                label='Company Name'
                placeholder='Optional company'
              />

              <FormSelectField
                name='screenName'
                label='Screen'
                required
                options={EVENT_SCREEN_OPTIONS}
                placeholder='Select screen'
                validators={{
                  onBlur: z.enum(EVENT_SCREEN_VALUES)
                }}
              />

              <form.AppField
                name='startAt'
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <field.FieldSet>
                      <field.Field>
                        <field.FieldLabel htmlFor={field.name}>Start</field.FieldLabel>
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

              <FormSelectField
                name='status'
                label='Status'
                required
                options={STATUS_OPTIONS}
                placeholder='Select status'
                validators={{
                  onBlur: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED'])
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
            form='event-record-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Event' : 'Create Event'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function EventRecordFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Event
      </Button>
      <EventRecordFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
