'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field';
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
import {
  DISPLAY_BLOCKS,
  getDefaultDisplayLayoutConfig,
  normalizeDisplayLayoutConfig
} from '../lib/display-layout-config';
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

function getDefaultFormValues(displayPage?: DisplayPageRecord): DisplayPageFormSchemaValues {
  return {
    name: displayPage?.name ?? '',
    slug: displayPage?.slug ?? '',
    description: displayPage?.description ?? '',
    resolutionWidth: displayPage?.resolutionWidth ?? 1920,
    resolutionHeight: displayPage?.resolutionHeight ?? 1080,
    layoutConfig: normalizeDisplayLayoutConfig(
      displayPage?.layoutConfig ?? getDefaultDisplayLayoutConfig()
    ),
    status: displayPage?.status ?? 'ACTIVE'
  };
}

export function DisplayPageFormSheet({
  open,
  onOpenChange,
  displayPage
}: DisplayPageFormSheetProps) {
  const router = useRouter();
  const isEdit = !!displayPage;
  const slugTouchedRef = useRef(false);
  const layoutDesignerUrl = displayPage
    ? `/dashboard/display-pages/${displayPage.id}/layout`
    : null;

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
    defaultValues: getDefaultFormValues(displayPage) as DisplayPageFormSchemaValues,
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

  useEffect(() => {
    if (!open) {
      slugTouchedRef.current = false;
      form.reset();
    }
  }, [form, open]);

  const { FormTextField, FormSelectField, FormTextareaField } =
    useFormFields<DisplayPageFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-3xl'>
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
            <form.Form id='display-page-form' className='space-y-5'>
              <div className='grid gap-4 md:grid-cols-2'>
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
              </div>

              <FormTextareaField
                name='description'
                label='Description'
                placeholder='Optional description for the display page'
                rows={4}
              />

              <FieldSet className='gap-4 rounded-xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex flex-col gap-1.5'>
                  <FieldLegend className='mb-0 text-sm font-medium'>
                    TV / LCD Display Settings
                  </FieldLegend>
                  <FieldDescription>
                    Set the target screen resolution for this display page.
                  </FieldDescription>
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                  <FormTextField
                    name='resolutionWidth'
                    label='Resolution Width'
                    required
                    type='number'
                    min={1}
                    step={1}
                    placeholder='1920'
                    validators={{
                      onBlur: z.coerce.number().int().positive('Resolution width must be positive')
                    }}
                  />

                  <FormTextField
                    name='resolutionHeight'
                    label='Resolution Height'
                    required
                    type='number'
                    min={1}
                    step={1}
                    placeholder='1080'
                    validators={{
                      onBlur: z.coerce.number().int().positive('Resolution height must be positive')
                    }}
                  />
                </div>
              </FieldSet>

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

              <div className='flex flex-col gap-2 rounded-xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <div className='flex flex-col gap-1'>
                    <div className='text-sm font-medium text-foreground'>Layout Designer</div>
                    <p className='text-muted-foreground text-xs'>
                      Open a full-screen visual designer for the TV grid layout.
                    </p>
                  </div>
                  {layoutDesignerUrl ? (
                    <Button asChild variant='outline'>
                      <Link href={layoutDesignerUrl} target='_blank' rel='noreferrer'>
                        <Icons.adjustments className='mr-2 size-4' />
                        Open Layout Designer
                      </Link>
                    </Button>
                  ) : (
                    <Button variant='outline' disabled>
                      <Icons.adjustments className='mr-2 size-4' />
                      Open Layout Designer
                    </Button>
                  )}
                </div>

                {!layoutDesignerUrl ? (
                  <p className='text-muted-foreground text-xs'>
                    Save the display page first to use the layout designer.
                  </p>
                ) : null}
              </div>
              <form.AppField
                name='layoutConfig'
                children={(field) => {
                  const layoutConfig = field.state.value ?? getDefaultDisplayLayoutConfig();
                  const columns = layoutConfig.columns ?? getDefaultDisplayLayoutConfig().columns;
                  const enabledBlocks = layoutConfig.blocks.filter((block) => block.enabled);
                  const headerBlocks = layoutConfig.blocks.filter(
                    (block) =>
                      block.enabled &&
                      DISPLAY_BLOCKS.find((item) => item.key === block.key)?.headerOnly
                  );

                  return (
                    <div className='flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/20 p-4'>
                      <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div className='flex flex-col gap-1'>
                          <div className='text-sm font-medium text-foreground'>Layout Designer</div>
                          <p className='text-xs text-muted-foreground'>
                            Use the full-page designer to arrange display cards, set rows per slide,
                            and manage block visibility.
                          </p>
                        </div>

                        <div className='flex flex-wrap items-center gap-2'>
                          <Badge
                            variant='outline'
                            className='border-border/60 bg-muted/40 text-foreground'
                          >
                            {enabledBlocks.length} enabled
                          </Badge>
                          <Badge
                            variant='outline'
                            className='border-border/60 bg-muted/40 text-foreground'
                          >
                            {headerBlocks.length} header
                          </Badge>
                          <Badge
                            variant='outline'
                            className='border-border/60 bg-muted/40 text-foreground'
                          >
                            Cols {columns.left}/{columns.center}/{columns.right}
                          </Badge>
                        </div>
                      </div>

                      <div className='flex flex-wrap items-center justify-between gap-3 rounded-none border border-dashed border-border/60 bg-background/60 px-3 py-2'>
                        <div className='text-xs text-muted-foreground'>
                          Detailed block placement is managed in the full-page Layout Designer.
                        </div>
                        {layoutDesignerUrl ? (
                          <Button asChild variant='outline'>
                            <Link href={layoutDesignerUrl} target='_blank' rel='noreferrer'>
                              <Icons.adjustments className='mr-2 size-4' />
                              Open Layout Designer
                            </Link>
                          </Button>
                        ) : (
                          <Button variant='outline' disabled>
                            <Icons.adjustments className='mr-2 size-4' />
                            Open Layout Designer
                          </Button>
                        )}
                      </div>

                      {!layoutDesignerUrl ? (
                        <p className='text-xs text-muted-foreground'>
                          Save the display page first to use the layout designer.
                        </p>
                      ) : null}

                      <field.FieldError />
                    </div>
                  );
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
