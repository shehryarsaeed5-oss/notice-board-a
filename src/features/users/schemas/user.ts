import * as z from 'zod';

import { ALL_PERMISSION_KEYS, USER_ROLES } from '@/lib/permissions';

import { USER_STATUSES } from '../api/types';

const optionalPassword = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().min(8, 'Password must be at least 8 characters').optional());

const userBaseSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  role: z.enum(USER_ROLES),
  permissions: z.array(z.enum(ALL_PERMISSION_KEYS)).default([]),
  status: z.enum(USER_STATUSES)
});

function validateCustomPermissions<
  T extends {
    role: string;
    permissions: string[];
  }
>(value: T, ctx: z.RefinementCtx) {
  if (value.role === 'CUSTOM' && value.permissions.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['permissions'],
      message: 'Select at least one permission for a custom user.'
    });
  }
}

export const userCreateSchema = userBaseSchema
  .extend({
    password: z.string().trim().min(8, 'Password must be at least 8 characters')
  })
  .superRefine(validateCustomPermissions);

export const userUpdateSchema = userBaseSchema
  .extend({
    password: optionalPassword
  })
  .superRefine(validateCustomPermissions);

export const userPasswordResetSchema = z.object({
  password: z.string().trim().min(8, 'Password must be at least 8 characters')
});

export type UserCreateFormValues = z.infer<typeof userCreateSchema>;
export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>;
export type UserPasswordResetFormValues = z.infer<typeof userPasswordResetSchema>;
