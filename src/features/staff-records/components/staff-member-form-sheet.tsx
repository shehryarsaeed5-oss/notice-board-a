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
import { createStaffMember, updateStaffMember } from '../api/client';
import type { StaffMemberRecord, StaffRecordStatus } from '../api/types';
import { staffMemberSchema, type StaffMemberFormSchemaValues } from '../schemas/staff-member';

const STATUS_OPTIONS: Array<{ value: StaffRecordStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

interface StaffMemberFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffMember?: StaffMemberRecord;
}

export function StaffMemberFormSheet({
  open,
  onOpenChange,
  staffMember
}: StaffMemberFormSheetProps) {
  const router = useRouter();
  const isEdit = !!staffMember;

  const createMutation = useMutation({
    mutationFn: createStaffMember,
    onSuccess: () => {
      toast.success('Staff member created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to create staff member');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: StaffMemberFormSchemaValues }) =>
      updateStaffMember(id, values),
    onSuccess: () => {
      toast.success('Staff member updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Failed to update staff member');
    }
  });

  const form = useAppForm({
    defaultValues: {
      name: staffMember?.name ?? '',
      designation: staffMember?.designation ?? '',
      department: staffMember?.department ?? '',
      phone: staffMember?.phone ?? '',
      sortOrder: staffMember?.sortOrder ?? 0,
      status: staffMember?.status ?? 'ACTIVE'
    } as StaffMemberFormSchemaValues,
    onSubmit: async ({ value }) => {
      const parsed = staffMemberSchema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the staff form errors');
        return;
      }

      if (isEdit && staffMember) {
        await updateMutation.mutateAsync({ id: staffMember.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<StaffMemberFormSchemaValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Staff Member' : 'Add Staff Member'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the staff record information below.'
              : 'Create a new staff record for the cinema notice board system.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Form id='staff-member-form' className='space-y-4'>
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
                required
                placeholder='Cinema Operator'
                validators={{
                  onBlur: z.string().trim().min(2, 'Designation is required')
                }}
              />

              <FormTextField name='department' label='Department' placeholder='Operations' />

              <FormTextField name='phone' label='Phone' type='tel' placeholder='0300 1234567' />

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
            </form.Form>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type='submit'
            form='staff-member-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update Staff' : 'Create Staff'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function StaffMemberFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add Staff
      </Button>
      <StaffMemberFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
