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
import { createMeetingSchedule, updateMeetingSchedule } from '../api/client';
import type { MeetingScheduleRecord, MeetingScheduleStatus } from '../api/types';
import {
  meetingScheduleSchema,
  type MeetingScheduleFormSchemaValues
} from '../schemas/meeting-schedule';

const STATUS_OPTIONS: Array<{ value: MeetingScheduleStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface MeetingScheduleFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meetingSchedule?: MeetingScheduleRecord;
}

export function MeetingScheduleFormSheet({
  open,
  onOpenChange,
  meetingSchedule
}: MeetingScheduleFormSheetProps) {
  const router = useRouter();
  const isEdit = !!meetingSchedule;

  const createMutation = useMutation({
    mutationFn: createMeetingSchedule,
    onSuccess: () => {
      toast.success('Meeting created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create meeting');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: MeetingScheduleFormSchemaValues }) =>
      updateMeetingSchedule(id, values),
    onSuccess: () => {
      toast.success('Meeting updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update meeting');
    }
  });

  const form = useAppForm({
    defaultValues: {
      title: meetingSchedule?.title ?? '',
      location: meetingSchedule?.location ?? '',
      organizer: meetingSchedule?.organizer ?? '',
      startAt: meetingSchedule?.startAt ? formatDateTimeInputValue(meetingSchedule.startAt) : '',
      endAt: meetingSchedule?.endAt ? formatDateTimeInputValue(meetingSchedule.endAt) : '',
      status: meetingSchedule?.status ?? 'ACTIVE'
    } as MeetingScheduleFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = meetingScheduleSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the meeting form errors');
        return;
      }

      if (isEdit && meetingSchedule) {
        await updateMutation.mutateAsync({ id: meetingSchedule.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<MeetingScheduleFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Meeting' : 'Add Meeting'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the meeting schedule information below.'
              : 'Create a new cinema meeting schedule entry.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='meeting-schedule-form' className='space-y-4'>
              <FormTextField
                name='title'
                label='Title'
                required
                placeholder='Operations Meeting'
                validators={{
                  onBlur: z.string().trim().min(2, 'Title is required')
                }}
              />

              <FormTextField name='organizer' label='Organizer' placeholder='Optional organizer' />

              <FormTextField name='location' label='Location' placeholder='Conference Room A' />

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

              <form.AppField
                name='endAt'
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <field.FieldSet>
                      <field.Field>
                        <field.FieldLabel htmlFor={field.name}>End</field.FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='datetime-local'
                          value={field.state.value ?? ''}
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
            form='meeting-schedule-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Meeting' : 'Create Meeting'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function MeetingScheduleFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Meeting
      </Button>
      <MeetingScheduleFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
