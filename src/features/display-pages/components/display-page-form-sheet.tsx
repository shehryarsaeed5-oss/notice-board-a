'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { cn } from '@/lib/utils';

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

              <form.AppField
                name='layoutConfig'
                children={(field) => {
                  const layoutConfig = field.state.value ?? getDefaultDisplayLayoutConfig();
                  const columns = layoutConfig.columns ?? getDefaultDisplayLayoutConfig().columns;
                  const columnTotal = columns.left + columns.center + columns.right;

                  return (
                    <FieldSet className='gap-4 rounded-xl border border-border/60 bg-muted/20 p-4'>
                      <div className='flex flex-col gap-1.5'>
                        <FieldLegend className='mb-0 text-sm font-medium'>
                          TV Column Widths
                        </FieldLegend>
                        <FieldDescription>
                          Set how wide each public display column should be on the TV layout.
                        </FieldDescription>
                      </div>

                      <div className='grid gap-3 md:grid-cols-3'>
                        <div className='grid gap-1.5'>
                          <label
                            htmlFor='display-column-left'
                            className='text-xs font-medium text-muted-foreground'
                          >
                            Left Column %
                          </label>
                          <Input
                            id='display-column-left'
                            type='number'
                            min={20}
                            max={60}
                            step={1}
                            value={columns.left}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              const nextValue = Number(event.target.value || 0);
                              const nextColumns = {
                                ...columns,
                                left: Number.isFinite(nextValue) ? nextValue : 33
                              };

                              field.handleChange({ ...layoutConfig, columns: nextColumns });
                            }}
                          />
                        </div>

                        <div className='grid gap-1.5'>
                          <label
                            htmlFor='display-column-center'
                            className='text-xs font-medium text-muted-foreground'
                          >
                            Center Column %
                          </label>
                          <Input
                            id='display-column-center'
                            type='number'
                            min={20}
                            max={60}
                            step={1}
                            value={columns.center}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              const nextValue = Number(event.target.value || 0);
                              const nextColumns = {
                                ...columns,
                                center: Number.isFinite(nextValue) ? nextValue : 34
                              };

                              field.handleChange({ ...layoutConfig, columns: nextColumns });
                            }}
                          />
                        </div>

                        <div className='grid gap-1.5'>
                          <label
                            htmlFor='display-column-right'
                            className='text-xs font-medium text-muted-foreground'
                          >
                            Right Column %
                          </label>
                          <Input
                            id='display-column-right'
                            type='number'
                            min={20}
                            max={60}
                            step={1}
                            value={columns.right}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              const nextValue = Number(event.target.value || 0);
                              const nextColumns = {
                                ...columns,
                                right: Number.isFinite(nextValue) ? nextValue : 33
                              };

                              field.handleChange({ ...layoutConfig, columns: nextColumns });
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className={cn(
                          'text-xs',
                          columnTotal === 100 ? 'text-muted-foreground' : 'text-destructive'
                        )}
                      >
                        Total must equal 100%. Use this to make one column wider and another smaller
                        on the TV layout. Current total: {columnTotal}%.
                      </div>

                      <div className='flex flex-col gap-1.5'>
                        <FieldLegend className='mb-0 text-sm font-medium'>
                          Display Blocks
                        </FieldLegend>
                        <FieldDescription>
                          Enable the widgets that should appear on the public display and set their
                          grid placement and rows per slide.
                        </FieldDescription>
                      </div>

                      <div className='grid gap-3'>
                        {DISPLAY_BLOCKS.map((definition) => {
                          const block =
                            layoutConfig.blocks.find((item) => item.key === definition.key) ??
                            getDefaultDisplayLayoutConfig().blocks.find(
                              (item) => item.key === definition.key
                            );

                          if (!block) {
                            return null;
                          }

                          return (
                            <div
                              key={definition.key}
                              className='grid gap-3 rounded-xl border border-border/60 bg-background/70 p-3'
                            >
                              <div className='flex flex-wrap items-start justify-between gap-3'>
                                <label className='flex items-start gap-3'>
                                  <Checkbox
                                    checked={block.enabled}
                                    onCheckedChange={(checked) => {
                                      const nextBlocks = layoutConfig.blocks.map((item) =>
                                        item.key === definition.key
                                          ? {
                                              ...item,
                                              enabled: checked === true
                                            }
                                          : item
                                      );

                                      field.handleChange({ ...layoutConfig, blocks: nextBlocks });
                                      field.handleBlur();
                                    }}
                                  />

                                  <span className='flex flex-col gap-1'>
                                    <span className='text-sm font-medium text-foreground'>
                                      {definition.label}
                                    </span>
                                    <span className='text-muted-foreground text-xs'>
                                      {definition.headerOnly
                                        ? 'Header-only block'
                                        : 'Place this block on the TV grid using column, row, and width.'}
                                    </span>
                                  </span>
                                </label>

                                <span
                                  className={cn(
                                    'inline-flex items-center rounded-none border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em]',
                                    definition.headerOnly
                                      ? 'border-amber-400/30 bg-amber-500/10 text-amber-100'
                                      : 'border-white/10 bg-white/5 text-zinc-100'
                                  )}
                                >
                                  {definition.headerOnly ? 'Header only' : 'TV grid'}
                                </span>
                              </div>

                              {definition.headerOnly ? (
                                <div className='grid gap-3 md:grid-cols-[160px_minmax(0,1fr)]'>
                                  <div className='grid gap-1.5'>
                                    <label
                                      htmlFor={`rows-${definition.key}`}
                                      className='text-xs font-medium text-muted-foreground'
                                    >
                                      Rows/Slide
                                    </label>
                                    <Input
                                      id={`rows-${definition.key}`}
                                      type='number'
                                      min={definition.minRowLimit}
                                      max={definition.maxRowLimit}
                                      step={1}
                                      value={block.rowLimit}
                                      onBlur={field.handleBlur}
                                      onChange={(event) => {
                                        const nextValue = Number(event.target.value || 0);
                                        const nextBlocks = layoutConfig.blocks.map((item) =>
                                          item.key === definition.key
                                            ? {
                                                ...item,
                                                rowLimit: Number.isFinite(nextValue)
                                                  ? nextValue
                                                  : definition.defaultRowLimit
                                              }
                                            : item
                                        );

                                        field.handleChange({ ...layoutConfig, blocks: nextBlocks });
                                      }}
                                    />
                                  </div>

                                  <div className='flex items-center gap-2 rounded-md border border-dashed border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground'>
                                    <Icons.info className='size-4 shrink-0 text-amber-500' />
                                    Header-only block. It controls the top header summary area, not
                                    the TV grid.
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className='grid gap-3 md:grid-cols-4'>
                                    <div className='grid gap-1.5'>
                                      <label
                                        htmlFor={`column-${definition.key}`}
                                        className='text-xs font-medium text-muted-foreground'
                                      >
                                        Column
                                      </label>
                                      <Input
                                        id={`column-${definition.key}`}
                                        type='number'
                                        min={1}
                                        max={3}
                                        step={1}
                                        value={block.column}
                                        onBlur={field.handleBlur}
                                        onChange={(event) => {
                                          const nextValue = Number(event.target.value || 0);
                                          const nextColumn = Number.isFinite(nextValue)
                                            ? Math.min(3, Math.max(1, nextValue))
                                            : 1;

                                          const nextBlocks = layoutConfig.blocks.map((item) =>
                                            item.key === definition.key
                                              ? {
                                                  ...item,
                                                  column: nextColumn,
                                                  colSpan:
                                                    nextColumn === 3 && item.colSpan > 1
                                                      ? 1
                                                      : item.colSpan
                                                }
                                              : item
                                          );

                                          field.handleChange({
                                            ...layoutConfig,
                                            blocks: nextBlocks
                                          });
                                        }}
                                      />
                                    </div>

                                    <div className='grid gap-1.5'>
                                      <label
                                        htmlFor={`row-${definition.key}`}
                                        className='text-xs font-medium text-muted-foreground'
                                      >
                                        Row
                                      </label>
                                      <Input
                                        id={`row-${definition.key}`}
                                        type='number'
                                        min={1}
                                        max={20}
                                        step={1}
                                        value={block.row}
                                        onBlur={field.handleBlur}
                                        onChange={(event) => {
                                          const nextValue = Number(event.target.value || 0);
                                          const nextRow = Number.isFinite(nextValue)
                                            ? Math.min(20, Math.max(1, nextValue))
                                            : 1;

                                          const nextBlocks = layoutConfig.blocks.map((item) =>
                                            item.key === definition.key
                                              ? {
                                                  ...item,
                                                  row: nextRow
                                                }
                                              : item
                                          );

                                          field.handleChange({
                                            ...layoutConfig,
                                            blocks: nextBlocks
                                          });
                                        }}
                                      />
                                    </div>

                                    <div className='grid gap-1.5'>
                                      <label
                                        htmlFor={`span-${definition.key}`}
                                        className='text-xs font-medium text-muted-foreground'
                                      >
                                        Width
                                      </label>
                                      <select
                                        id={`span-${definition.key}`}
                                        value={block.colSpan}
                                        onBlur={field.handleBlur}
                                        onChange={(event) => {
                                          const nextValue = Number(event.target.value || 1);
                                          const nextColSpan =
                                            Number.isFinite(nextValue) && nextValue === 2 ? 2 : 1;
                                          const nextBlocks = layoutConfig.blocks.map((item) =>
                                            item.key === definition.key
                                              ? {
                                                  ...item,
                                                  colSpan: block.column === 3 ? 1 : nextColSpan
                                                }
                                              : item
                                          );

                                          field.handleChange({
                                            ...layoutConfig,
                                            blocks: nextBlocks
                                          });
                                        }}
                                        className='h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'
                                      >
                                        <option value={1}>1 column</option>
                                        <option value={2} disabled={block.column === 3}>
                                          2 columns
                                        </option>
                                      </select>
                                    </div>

                                    <div className='grid gap-1.5'>
                                      <label
                                        htmlFor={`rows-${definition.key}`}
                                        className='text-xs font-medium text-muted-foreground'
                                      >
                                        Rows/Slide
                                      </label>
                                      <Input
                                        id={`rows-${definition.key}`}
                                        type='number'
                                        min={definition.minRowLimit}
                                        max={definition.maxRowLimit}
                                        step={1}
                                        value={block.rowLimit}
                                        onBlur={field.handleBlur}
                                        onChange={(event) => {
                                          const nextValue = Number(event.target.value || 0);
                                          const nextBlocks = layoutConfig.blocks.map((item) =>
                                            item.key === definition.key
                                              ? {
                                                  ...item,
                                                  rowLimit: Number.isFinite(nextValue)
                                                    ? nextValue
                                                    : definition.defaultRowLimit
                                                }
                                              : item
                                          );

                                          field.handleChange({
                                            ...layoutConfig,
                                            blocks: nextBlocks
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className='text-xs text-muted-foreground'>
                                    Column and row control where the card appears on the TV. Width 2
                                    columns makes the card wider.
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <field.FieldError />
                    </FieldSet>
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
