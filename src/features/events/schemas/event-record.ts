import * as z from 'zod';

import { isValidDateTimeInputValue } from '@/lib/date-time';
import { EVENT_RECORD_STATUSES } from '../api/types';

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

const optionalDateTime = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().refine(isValidDateTimeInputValue, 'Enter a valid date and time').optional());

export const eventRecordSchema = z.object({
  title: z.string().trim().min(2, 'Title is required'),
  clientName: optionalText,
  companyName: optionalText,
  screenName: optionalText,
  startAt: z
    .string()
    .trim()
    .min(1, 'Start date and time is required')
    .refine(isValidDateTimeInputValue, 'Enter a valid date and time'),
  endAt: optionalDateTime,
  status: z.enum(EVENT_RECORD_STATUSES)
});

export type EventRecordFormSchemaValues = z.infer<typeof eventRecordSchema>;
