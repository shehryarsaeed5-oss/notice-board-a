import * as z from 'zod';

import { isValidDateTimeInputValue, parseDateTimeInputValue } from '@/lib/date-time';

import { ALERT_STATUS_VALUES, ALERT_TYPE_VALUES } from '../constants';

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

export const optionalNonNegativeInteger = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  return Number.isFinite(parsed) ? parsed : undefined;
}, z.number().int().min(0).optional());

export const alertSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),
    message: optionalText,
    alertType: z.enum(ALERT_TYPE_VALUES),
    priority: optionalNonNegativeInteger,
    startAt: z
      .string()
      .trim()
      .min(1, 'Start date and time is required')
      .refine(isValidDateTimeInputValue, 'Enter a valid start date and time'),
    endAt: z
      .string()
      .trim()
      .min(1, 'End date and time is required')
      .refine(isValidDateTimeInputValue, 'Enter a valid end date and time'),
    status: z.enum(ALERT_STATUS_VALUES)
  })
  .superRefine((value, ctx) => {
    try {
      const startAt = parseDateTimeInputValue(value.startAt);
      const endAt = parseDateTimeInputValue(value.endAt);

      if (endAt < startAt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endAt'],
          message: 'End date and time must be after the start date and time'
        });
      }
    } catch {
      // Field-level validators handle invalid date strings.
    }
  });

export type AlertFormSchemaValues = z.infer<typeof alertSchema>;
