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
import { createMovieSchedule, updateMovieSchedule } from '../api/client';
import type { MovieScheduleRecord, MovieScheduleStatus } from '../api/types';
import { movieScheduleSchema, type MovieScheduleFormSchemaValues } from '../schemas/movie-schedule';

const STATUS_OPTIONS: Array<{ value: MovieScheduleStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface MovieScheduleFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieSchedule?: MovieScheduleRecord;
}

export function MovieScheduleFormSheet({
  open,
  onOpenChange,
  movieSchedule
}: MovieScheduleFormSheetProps) {
  const router = useRouter();
  const isEdit = !!movieSchedule;

  const createMutation = useMutation({
    mutationFn: createMovieSchedule,
    onSuccess: () => {
      toast.success('Movie show created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create movie show');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: MovieScheduleFormSchemaValues }) =>
      updateMovieSchedule(id, values),
    onSuccess: () => {
      toast.success('Movie show updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update movie show');
    }
  });

  const form = useAppForm({
    defaultValues: {
      movieName: movieSchedule?.movieName ?? '',
      screenName: movieSchedule?.screenName ?? '',
      showTime: movieSchedule?.showTime ? formatDateTimeInputValue(movieSchedule.showTime) : '',
      status: movieSchedule?.status ?? 'ACTIVE'
    } as MovieScheduleFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = movieScheduleSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the movie show form errors');
        return;
      }

      if (isEdit && movieSchedule) {
        await updateMutation.mutateAsync({ id: movieSchedule.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<MovieScheduleFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Movie Show' : 'Add Movie Show'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the movie show information below.'
              : 'Create a new movie show entry for the cinema dashboard.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='movie-schedule-form' className='space-y-4'>
              <FormTextField
                name='movieName'
                label='Movie Name'
                required
                placeholder='The Midnight Premiere'
                validators={{
                  onBlur: z.string().trim().min(2, 'Movie name is required')
                }}
              />

              <FormTextField
                name='screenName'
                label='Screen'
                required
                placeholder='Screen 1'
                validators={{
                  onBlur: z.string().trim().min(2, 'Screen name is required')
                }}
              />

              <form.AppField
                name='showTime'
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <field.FieldSet>
                      <field.Field>
                        <field.FieldLabel htmlFor={field.name}>Show Time</field.FieldLabel>
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
            form='movie-schedule-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Movie Show' : 'Create Movie Show'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function MovieScheduleFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Movie Show
      </Button>
      <MovieScheduleFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
