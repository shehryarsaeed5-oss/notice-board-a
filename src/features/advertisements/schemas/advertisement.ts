import * as z from 'zod';

import { isValidDateTimeInputValue } from '@/lib/date-time';
import { ADVERTISEMENT_STATUSES } from '../api/types';

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

const optionalPositiveNumber = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}, z.number().positive().optional());

const requiredDateTime = z
  .string()
  .trim()
  .min(1, 'Date and time is required')
  .refine(isValidDateTimeInputValue, 'Enter a valid date and time');

export const advertisementSchema = z
  .object({
    title: z.string().trim().min(2, 'Company name is required'),
    contactPerson: optionalText,
    phone: optionalText,
    contractAmount: optionalPositiveNumber,
    adLocation: optionalText,
    remarks: optionalText,
    startAt: requiredDateTime,
    endAt: requiredDateTime,
    status: z.enum(ADVERTISEMENT_STATUSES)
  })
  .refine(
    (values) => {
      const start = new Date(values.startAt);
      const end = new Date(values.endAt);

      return end.getTime() >= start.getTime();
    },
    {
      message: 'Contract end date must not be before contract start date',
      path: ['endAt']
    }
  );

export type AdvertisementFormSchemaValues = z.infer<typeof advertisementSchema>;
