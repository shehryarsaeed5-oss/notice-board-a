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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import {
  ALL_PERMISSION_KEYS,
  getUserPermissions,
  normalizeUserRole,
  type PermissionKey,
  type UserRole
} from '@/lib/permissions';

import { createUser, updateUser } from '../api/client';
import type { UserRecord, UserStatus } from '../api/types';
import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateFormValues,
  type UserUpdateFormValues
} from '../schemas/user';

const ROLE_OPTIONS: Array<{ value: UserRole; label: string }> = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'CUSTOM', label: 'Custom' },
  { value: 'VIEWER', label: 'Viewer' }
];

const STATUS_OPTIONS: Array<{ value: UserStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

const PERMISSION_LABELS: Record<PermissionKey, string> = {
  dashboard: 'Dashboard',
  boardsDisplays: 'Boards / Displays',
  displayPages: 'Display Pages',
  staffRecords: 'Staff Records',
  managerRecords: 'Manager Records',
  attendance: 'Attendance',
  events: 'Events',
  meetingSchedule: 'Meeting Schedule',
  advertisements: 'Advertisements',
  weather: 'Weather',
  movieSchedule: 'Movie Schedule',
  itemSalesTarget: 'Item Sales Target',
  systemSettings: 'System Settings',
  users: 'Users'
};

interface UserFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserRecord;
}

function getDefaultPermissions(user?: UserRecord): PermissionKey[] {
  if (!user) {
    return ['dashboard'];
  }

  return getUserPermissions(user);
}

export function UserFormSheet({ open, onOpenChange, user }: UserFormSheetProps) {
  const router = useRouter();
  const isEdit = !!user;
  const previousRoleRef = useRef<UserRole>(normalizeUserRole(user?.role ?? 'CUSTOM'));

  useEffect(() => {
    previousRoleRef.current = normalizeUserRole(user?.role ?? 'CUSTOM');
  }, [user]);

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User created successfully');
      router.refresh();
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: UserUpdateFormValues }) =>
      updateUser(id, values),
    onSuccess: () => {
      toast.success('User updated successfully');
      router.refresh();
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update user');
    }
  });

  const form = useAppForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      role: normalizeUserRole(user?.role ?? 'CUSTOM'),
      permissions: getDefaultPermissions(user),
      password: '',
      status: user?.status ?? 'ACTIVE'
    } as UserCreateFormValues,
    onSubmit: async ({ value }) => {
      const schema = isEdit ? userUpdateSchema : userCreateSchema;
      const parsed = schema.safeParse(value);

      if (!parsed.success) {
        toast.error('Please fix the user form errors');
        return;
      }

      if (isEdit && user) {
        await updateMutation.mutateAsync({ id: user.id, values: parsed.data });
        return;
      }

      await createMutation.mutateAsync(parsed.data);
    }
  });

  useEffect(() => {
    if (!open) {
      form.reset();
      previousRoleRef.current = normalizeUserRole(user?.role ?? 'CUSTOM');
    }
  }, [open, form, user]);

  const { FormTextField, FormSelectField } = useFormFields<UserCreateFormValues>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit User' : 'Add User'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the account details, role, status, and permissions.'
              : 'Create a new user and assign the exact pages and modules they can access.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form.AppForm>
            <form.Subscribe selector={(state) => state.values}>
              {(values) => (
                <form.Form id='user-form' className='flex flex-col gap-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormTextField
                      name='name'
                      label='Name'
                      required
                      placeholder='Ahsan Ali'
                      validators={{
                        onBlur: z.string().trim().min(1, 'Name is required')
                      }}
                    />

                    <FormTextField
                      name='email'
                      label='Email'
                      required
                      type='email'
                      placeholder='user@example.com'
                      validators={{
                        onBlur: z.string().trim().email('Enter a valid email address')
                      }}
                    />
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormSelectField
                      name='role'
                      label='Role'
                      required
                      options={ROLE_OPTIONS}
                      placeholder='Select role'
                      validators={{
                        onBlur: z.enum(['ADMIN', 'CUSTOM', 'VIEWER'])
                      }}
                      listeners={{
                        onChange: ({ value, fieldApi }) => {
                          const nextRole = normalizeUserRole(String(value));
                          const currentPermissions = (fieldApi.form.state.values.permissions ??
                            []) as PermissionKey[];

                          if (nextRole === 'ADMIN') {
                            fieldApi.form.setFieldValue('permissions', [...ALL_PERMISSION_KEYS]);
                          } else if (nextRole === 'VIEWER') {
                            fieldApi.form.setFieldValue('permissions', ['dashboard']);
                          } else if (previousRoleRef.current !== 'CUSTOM') {
                            fieldApi.form.setFieldValue('permissions', ['dashboard']);
                          } else if (currentPermissions.length === 0) {
                            fieldApi.form.setFieldValue('permissions', ['dashboard']);
                          }

                          previousRoleRef.current = nextRole;
                        }
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

                  <FormTextField
                    name='password'
                    label='Password'
                    required={!isEdit}
                    type='password'
                    placeholder={
                      isEdit ? 'Leave blank to keep the current password' : 'Minimum 8 characters'
                    }
                    description={
                      isEdit
                        ? 'Leave blank to keep the existing password. Use Reset Password for a direct reset.'
                        : 'Password must be at least 8 characters.'
                    }
                    validators={{
                      onBlur: isEdit
                        ? z.preprocess((value) => {
                            if (typeof value === 'string' && value.trim() === '') {
                              return undefined;
                            }

                            return value;
                          }, z.string().trim().min(8, 'Password must be at least 8 characters').optional())
                        : z.string().trim().min(8, 'Password must be at least 8 characters')
                    }}
                  />

                  <form.AppField
                    name='permissions'
                    validators={{
                      onBlur: z
                        .array(z.enum(ALL_PERMISSION_KEYS))
                        .min(1, 'Select at least one permission')
                    }}
                    children={(field) => {
                      const selectedPermissions = field.state.value as PermissionKey[];
                      const isAdmin = values.role === 'ADMIN';
                      const isViewer = values.role === 'VIEWER';

                      return (
                        <FieldSet className='gap-4 rounded-xl border border-border/60 bg-muted/20 p-4'>
                          <div className='flex flex-col gap-1.5'>
                            <FieldLegend className='mb-0 text-sm font-medium'>
                              Permissions
                            </FieldLegend>
                            <FieldDescription>
                              Dashboard access is always included. Select additional modules for
                              this account.
                            </FieldDescription>
                          </div>

                          <div className='grid gap-3 md:grid-cols-2'>
                            {Object.entries(PERMISSION_LABELS).map(([permission, label]) => {
                              const permissionKey = permission as PermissionKey;
                              const checked =
                                isAdmin || (isViewer && permissionKey === 'dashboard')
                                  ? true
                                  : selectedPermissions.includes(permissionKey);
                              const disabled = permissionKey === 'dashboard' || isAdmin || isViewer;

                              return (
                                <label
                                  key={permissionKey}
                                  className='border-border/60 bg-background/60 flex items-start gap-3 rounded-lg border px-3 py-2.5'
                                >
                                  <Checkbox
                                    checked={checked}
                                    disabled={disabled}
                                    onCheckedChange={(nextChecked) => {
                                      if (disabled) {
                                        return;
                                      }

                                      const nextPermissions = nextChecked
                                        ? [...selectedPermissions, permissionKey]
                                        : selectedPermissions.filter(
                                            (item) => item !== permissionKey
                                          );

                                      field.handleChange(
                                        Array.from(new Set(nextPermissions)) as PermissionKey[]
                                      );
                                      field.handleBlur();
                                    }}
                                  />
                                  <div className='flex flex-col gap-1'>
                                    <span className='text-sm font-medium'>{label}</span>
                                    <span className='text-muted-foreground text-xs'>
                                      {permissionKey === 'dashboard'
                                        ? 'Always enabled for every signed-in user.'
                                        : isAdmin
                                          ? 'Included automatically for admin users.'
                                          : isViewer
                                            ? 'Viewer accounts do not receive extra modules.'
                                            : 'Toggle access for this module.'}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>

                          <field.FieldError />
                        </FieldSet>
                      );
                    }}
                  />
                </form.Form>
              )}
            </form.Subscribe>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type='submit'
            form='user-form'
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            <Icons.check />
            {isEdit ? 'Update User' : 'Create User'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function UserFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' />
        Add User
      </Button>
      <UserFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
