'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

import { createDisplayPage, updateDisplayPage } from '../api/client';
import type { DisplayPageRecord, DisplayPageStatus } from '../api/types';
import { normalizeDisplayPageSlug } from '../lib/slug';
import { displayPageSchema, type DisplayPageFormSchemaValues } from '../schemas/display-page';

const STATUS_OPTIONS: Array<{ value: DisplayPageStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface DisplayPageFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  displayPage?: DisplayPageRecord;
}

export function DisplayPageFormSheet({
  open,
  onOpenChange,
  displayPage
}: DisplayPageFormSheetProps) {
  const router = useRouter();
  const isEdit = !!displayPage;
  const slugTouchedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      slugTouchedRef.current = false;
    }
  }, [open]);

  const createMutation = useMutation({
    mutationFn: createDisplayPage,
    onSuccess: () => {
      toast.success('Display page created successfully');
      router.refresh();
      onOpenChange(false);
      slugTouchedRef.current = false;
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create display page');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: DisplayPageFormSchemaValues }) =>
      updateDisplayPage(id, values),
    onSuccess: () => {
      toast.success('Display page updated successfully');
      router.refresh();
      onOpenChange(false);
      slugTouchedRef.current = false;
    },
    onError: () => {
      toast.error('Failed to update display page');
    }
  });

  const form = useAppForm({
    defaultValues: {
      name: displayPage?.name ?? '',
      slug: displayPage?.slug ?? '',
      description: displayPage?.description ?? '',
      status: displayPage?.status ?? 'ACTIVE'
    } as DisplayPageFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = displayPageSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the display page form errors');
        return;
      }

      if (isEdit && displayPage) {
        await updateMutation.mutateAsync({ id: displayPage.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField, FormTextareaField } =
    useFormFields<DisplayPageFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Display Page' : 'Add Display Page'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the display page information below.'
              : 'Create a new display page record for the dashboard.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='display-page-form' className='space-y-4'>
              <FormTextField
                name='name'
                label='Name'
                required
                placeholder='Lobby Main'
                validators={{
                  onBlur: z.string().trim().min(1, 'Name is required')
                }}
                listeners={{
                  onChange: ({ value, fieldApi }) => {
                    if (isEdit || slugTouchedRef.current) {
                      return;
                    }

                    fieldApi.form.setFieldValue(
                      'slug',
                      normalizeDisplayPageSlug(String(value ?? ''))
                    );
                  }
                }}
              />

              <form.AppField
                name='slug'
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <field.FieldSet>
                      <field.Field>
                        <field.FieldLabel htmlFor={field.name}>Slug</field.FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => {
                            slugTouchedRef.current = true;
                            field.handleChange(normalizeDisplayPageSlug(event.target.value));
                          }}
                          placeholder='lobby-main'
                          autoComplete='off'
                          spellCheck={false}
                          aria-invalid={isInvalid}
                        />
                        <p className='text-muted-foreground text-xs'>
                          Auto-generated from the name while creating. Use lowercase letters,
                          numbers, and hyphens.
                        </p>
                        <field.FieldError />
                      </field.Field>
                    </field.FieldSet>
                  );
                }}
                validators={{
                  onBlur: z
                    .string()
                    .trim()
                    .min(1, 'Slug is required')
                    .refine((value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value), {
                      message: 'Slug must be lowercase URL-safe, like lobby-main'
                    })
                }}
              />

              <FormTextareaField
                name='description'
                label='Description'
                placeholder='Optional description for the display page'
                rows={4}
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
            form='display-page-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Page' : 'Create Page'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function DisplayPageFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Display Page
      </Button>
      <DisplayPageFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
