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
import { createManager, updateManager } from '../api/client';
import type { ManagerFormSchemaValues } from '../schemas/manager';
import type { ManagerRecord, ManagerRecordStatus } from '../api/types';

const STATUS_OPTIONS: Array<{ value: ManagerRecordStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface ManagerMemberFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manager?: ManagerRecord;
}

export function ManagerMemberFormSheet({
  open,
  onOpenChange,
  manager
}: ManagerMemberFormSheetProps) {
  const router = useRouter();
  const isEdit = !!manager;

  const createMutation = useMutation({
    mutationFn: createManager,
    onSuccess: () => {
      toast.success('Manager created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create manager');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ManagerFormSchemaValues }) =>
      updateManager(id, values),
    onSuccess: () => {
      toast.success('Manager updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update manager');
    }
  });

  const form = useAppForm({
    defaultValues: {
      name: manager?.name ?? '',
      designation: manager?.designation ?? '',
      phone: manager?.phone ?? '',
      status: manager?.status ?? 'ACTIVE'
    } as ManagerFormSchemaValues,
    onSubmit: async ({ value }) => {
      if (isEdit && manager) {
        await updateMutation.mutateAsync({ id: manager.id, values: value });
        return;
      }

      await createMutation.mutateAsync(value);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<ManagerFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Manager' : 'Add Manager'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the manager record information below.'
              : 'Create a new manager record for cinema operations.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='manager-member-form' className='space-y-4'>
              <FormTextField
                name='name'
                label='Name'
                required
                placeholder='Enter full name'
                validators={{
                  onBlur: z.string().trim().min(2, 'Name is required')
                }}
              />

              <FormTextField
                name='designation'
                label='Designation'
                placeholder='Optional designation'
              />

              <FormTextField name='phone' label='Phone' type='tel' placeholder='0300 1234567' />

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
            form='manager-member-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Manager' : 'Create Manager'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ManagerMemberFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Manager
      </Button>
      <ManagerMemberFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
