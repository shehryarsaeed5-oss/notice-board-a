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
import { createAdvertisement, updateAdvertisement } from '../api/client';
import type {
  AdvertisementMediaType,
  AdvertisementRecord,
  AdvertisementStatus
} from '../api/types';
import { advertisementSchema, type AdvertisementFormSchemaValues } from '../schemas/advertisement';

const STATUS_OPTIONS: Array<{ value: AdvertisementStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

const MEDIA_TYPE_OPTIONS: Array<{ value: AdvertisementMediaType; label: string }> = [
  { value: 'IMAGE', label: 'Image' },
  { value: 'VIDEO', label: 'Video' }
];

interface AdvertisementFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  advertisement?: AdvertisementRecord;
}

export function AdvertisementFormSheet({
  open,
  onOpenChange,
  advertisement
}: AdvertisementFormSheetProps) {
  const router = useRouter();
  const isEdit = !!advertisement;

  const createMutation = useMutation({
    mutationFn: createAdvertisement,
    onSuccess: () => {
      toast.success('Advertisement created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create advertisement');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: AdvertisementFormSchemaValues }) =>
      updateAdvertisement(id, values),
    onSuccess: () => {
      toast.success('Advertisement updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update advertisement');
    }
  });

  const form = useAppForm({
    defaultValues: {
      title: advertisement?.title ?? '',
      mediaUrl: advertisement?.mediaUrl ?? '',
      mediaType: advertisement?.mediaType ?? 'IMAGE',
      duration: advertisement?.duration ?? '',
      sortOrder: advertisement?.sortOrder ?? 0,
      startAt: advertisement?.startAt ? formatDateTimeInputValue(advertisement.startAt) : '',
      endAt: advertisement?.endAt ? formatDateTimeInputValue(advertisement.endAt) : '',
      status: advertisement?.status ?? 'ACTIVE'
    } as AdvertisementFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = advertisementSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the advertisement form errors');
        return;
      }

      if (isEdit && advertisement) {
        await updateMutation.mutateAsync({ id: advertisement.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<AdvertisementFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Advertisement' : 'Add Advertisement'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the advertisement information below.'
              : 'Create a new advertisement record for the dashboard.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='advertisement-form' className='space-y-4'>
              <FormTextField
                name='title'
                label='Title'
                required
                placeholder='Weekend Feature Spot'
                validators={{
                  onBlur: z.string().trim().min(2, 'Title is required')
                }}
              />

              <FormTextField
                name='mediaUrl'
                label='Media URL'
                required
                placeholder='https://...'
                validators={{
                  onBlur: z.string().trim().min(1, 'Media URL is required')
                }}
              />

              <div className='grid gap-4 md:grid-cols-2'>
                <FormSelectField
                  name='mediaType'
                  label='Media Type'
                  required
                  options={MEDIA_TYPE_OPTIONS}
                  placeholder='Select media type'
                  validators={{
                    onBlur: z.enum(['IMAGE', 'VIDEO'])
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
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <FormTextField
                  name='duration'
                  label='Duration'
                  type='number'
                  min={0}
                  step={1}
                  placeholder='Optional duration'
                  validators={{
                    onBlur: z.preprocess((value) => {
                      if (value === '' || value === null || value === undefined) {
                        return undefined;
                      }

                      if (typeof value === 'string' && value.trim() === '') {
                        return undefined;
                      }

                      return typeof value === 'string' ? Number(value) : value;
                    }, z.number().int().nonnegative().optional())
                  }}
                />

                <FormTextField
                  name='sortOrder'
                  label='Sort Order'
                  type='number'
                  min={0}
                  step={1}
                  placeholder='0'
                  validators={{
                    onBlur: z.preprocess((value) => {
                      if (value === '' || value === null || value === undefined) {
                        return undefined;
                      }

                      if (typeof value === 'string' && value.trim() === '') {
                        return undefined;
                      }

                      return typeof value === 'string' ? Number(value) : value;
                    }, z.number().int().nonnegative().default(0))
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
                          <field.FieldLabel htmlFor={field.name}>Start</field.FieldLabel>
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
              </div>
            </form.Form>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type='submit'
            form='advertisement-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Advertisement' : 'Create Advertisement'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function AdvertisementFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Advertisement
      </Button>
      <AdvertisementFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
