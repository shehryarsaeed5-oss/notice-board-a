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

import { createConcessionPriceItem, updateConcessionPriceItem } from '../api/client';
import type { ConcessionPriceItemRecord, ConcessionPriceItemStatus } from '../api/types';
import {
  concessionPriceItemSchema,
  type ConcessionPriceItemFormSchemaValues
} from '../schemas/concession-price-item';

const STATUS_OPTIONS: Array<{ value: ConcessionPriceItemStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface ConcessionPriceItemFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  concessionPriceItem?: ConcessionPriceItemRecord;
}

export function ConcessionPriceItemFormSheet({
  open,
  onOpenChange,
  concessionPriceItem
}: ConcessionPriceItemFormSheetProps) {
  const router = useRouter();
  const isEdit = !!concessionPriceItem;

  const createMutation = useMutation({
    mutationFn: createConcessionPriceItem,
    onSuccess: () => {
      toast.success('Concession price item created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create concession price item');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ConcessionPriceItemFormSchemaValues }) =>
      updateConcessionPriceItem(id, values),
    onSuccess: () => {
      toast.success('Concession price item updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update concession price item');
    }
  });

  const form = useAppForm({
    defaultValues: {
      itemName: concessionPriceItem?.itemName ?? '',
      category: concessionPriceItem?.category ?? '',
      price: concessionPriceItem?.price ?? '',
      sortOrder: concessionPriceItem?.sortOrder ?? 0,
      status: concessionPriceItem?.status ?? 'ACTIVE'
    } as ConcessionPriceItemFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = concessionPriceItemSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the concession price item form errors');
        return;
      }

      if (isEdit && concessionPriceItem) {
        await updateMutation.mutateAsync({ id: concessionPriceItem.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<ConcessionPriceItemFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Price Item' : 'Add Price Item'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the concession price item information below.'
              : 'Create a new concession price record for the live display board.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='concession-price-item-form' className='space-y-4'>
              <FormTextField
                name='itemName'
                label='Item Name'
                required
                placeholder='Large Popcorn'
                validators={{
                  onBlur: z.string().trim().min(1, 'Item name is required')
                }}
              />

              <FormTextField
                name='category'
                label='Category'
                placeholder='Snacks, Drinks, Combos'
              />

              <FormTextField
                name='price'
                label='Price'
                required
                type='number'
                min={0.01}
                step='0.01'
                placeholder='150'
                validators={{
                  onBlur: z.preprocess((value) => {
                    if (value === '' || value === null || value === undefined) {
                      return undefined;
                    }

                    if (typeof value === 'string' && value.trim() === '') {
                      return undefined;
                    }

                    return typeof value === 'string' ? Number(value) : value;
                  }, z.number().positive('Price must be greater than 0'))
                }}
              />

              <div className='grid gap-4 md:grid-cols-2'>
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
            </form.Form>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type='submit'
            form='concession-price-item-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Item' : 'Create Item'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ConcessionPriceItemFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Price Item
      </Button>
      <ConcessionPriceItemFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
