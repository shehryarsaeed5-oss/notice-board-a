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
import { createItemSalesTarget, updateItemSalesTarget } from '../api/client';
import type { ItemSalesTargetRecord, ItemSalesTargetStatus } from '../api/types';
import {
  itemSalesTargetSchema,
  optionalPositiveInteger,
  type ItemSalesTargetFormSchemaValues
} from '../schemas/item-sales-target';

const STATUS_OPTIONS: Array<{ value: ItemSalesTargetStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface ItemSalesTargetFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemSalesTarget?: ItemSalesTargetRecord;
}

export function ItemSalesTargetFormSheet({
  open,
  onOpenChange,
  itemSalesTarget
}: ItemSalesTargetFormSheetProps) {
  const router = useRouter();
  const isEdit = !!itemSalesTarget;

  const createMutation = useMutation({
    mutationFn: createItemSalesTarget,
    onSuccess: () => {
      toast.success('Item sales target created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create item sales target');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ItemSalesTargetFormSchemaValues }) =>
      updateItemSalesTarget(id, values),
    onSuccess: () => {
      toast.success('Item sales target updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update item sales target');
    }
  });

  const form = useAppForm({
    defaultValues: {
      itemName: itemSalesTarget?.itemName ?? '',
      itemCode: itemSalesTarget?.itemCode ?? '',
      dailyTarget: itemSalesTarget?.dailyTarget ?? '',
      weeklyTarget: itemSalesTarget?.weeklyTarget ?? '',
      monthlyTarget: itemSalesTarget?.monthlyTarget ?? '',
      status: itemSalesTarget?.status ?? 'ACTIVE'
    } as ItemSalesTargetFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = itemSalesTargetSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the item sales target form errors');
        return;
      }

      if (isEdit && itemSalesTarget) {
        await updateMutation.mutateAsync({ id: itemSalesTarget.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<ItemSalesTargetFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Item Target' : 'Add Item Target'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the item target information below.'
              : 'Create a new item sales target record for the dashboard.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='item-sales-target-form' className='space-y-4'>
              <FormTextField
                name='itemName'
                label='Item Name'
                required
                placeholder='Popcorn Combo'
                validators={{
                  onBlur: z.string().trim().min(2, 'Item name is required')
                }}
              />

              <FormTextField name='itemCode' label='Item Code' placeholder='Optional code' />

              <div className='grid gap-4 md:grid-cols-3'>
                <FormTextField
                  name='dailyTarget'
                  label='Daily Target'
                  type='number'
                  min={1}
                  step={1}
                  placeholder='Optional'
                  validators={{
                    onBlur: optionalPositiveInteger
                  }}
                />

                <FormTextField
                  name='weeklyTarget'
                  label='Weekly Target'
                  type='number'
                  min={1}
                  step={1}
                  placeholder='Optional'
                  validators={{
                    onBlur: optionalPositiveInteger
                  }}
                />

                <FormTextField
                  name='monthlyTarget'
                  label='Monthly Target'
                  type='number'
                  min={1}
                  step={1}
                  placeholder='Optional'
                  validators={{
                    onBlur: optionalPositiveInteger
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
            form='item-sales-target-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Target' : 'Create Target'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ItemSalesTargetFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Item Target
      </Button>
      <ItemSalesTargetFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
