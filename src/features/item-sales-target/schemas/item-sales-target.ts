import * as z from 'zod';

import { ITEM_SALES_TARGET_STATUSES } from '../api/types';

export const optionalPositiveInteger = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}, z.number().int().positive().optional());

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

export const itemSalesTargetSchema = z
  .object({
    itemName: z.string().trim().min(2, 'Item name is required'),
    itemCode: optionalText,
    dailyTarget: optionalPositiveInteger,
    weeklyTarget: optionalPositiveInteger,
    monthlyTarget: optionalPositiveInteger,
    status: z.enum(ITEM_SALES_TARGET_STATUSES)
  })
  .superRefine((value, ctx) => {
    if (!value.dailyTarget && !value.weeklyTarget && !value.monthlyTarget) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dailyTarget'],
        message: 'Provide at least one target'
      });
    }
  });

export type ItemSalesTargetFormSchemaValues = z.infer<typeof itemSalesTargetSchema>;
