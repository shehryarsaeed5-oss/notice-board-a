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

export const optionalNonNegativeInteger = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}, z.number().int().nonnegative().optional());

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

const optionalDate = z.preprocess(
  (value) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed ? trimmed : undefined;
    }

    return value;
  },
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a valid date')
    .optional()
);

export const itemSalesTargetSchema = z
  .object({
    itemName: z.string().trim().min(2, 'Item name is required'),
    itemCode: optionalText,
    itemCodesText: optionalText,
    dailyTarget: optionalPositiveInteger,
    weeklyTarget: optionalPositiveInteger,
    monthlyTarget: optionalPositiveInteger,
    startDate: optionalDate,
    endDate: optionalDate,
    displayOrder: optionalNonNegativeInteger,
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

    if (value.startDate && value.endDate) {
      const start = new Date(`${value.startDate}T00:00:00`);
      const end = new Date(`${value.endDate}T00:00:00`);

      if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end < start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message: 'End date cannot be before start date'
        });
      }
    }
  });

export type ItemSalesTargetFormSchemaValues = z.infer<typeof itemSalesTargetSchema>;
