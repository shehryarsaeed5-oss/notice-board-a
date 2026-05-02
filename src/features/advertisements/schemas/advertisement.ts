import * as z from 'zod';

import { isValidDateTimeInputValue } from '@/lib/date-time';
import { ADVERTISEMENT_MEDIA_TYPES, ADVERTISEMENT_STATUSES } from '../api/types';

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

const optionalNumber = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}, z.number().int().nonnegative().optional());

const sortOrderValue = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}, z.number().int().nonnegative().default(0));

export const advertisementSchema = z.object({
  title: z.string().trim().min(2, 'Title is required'),
  mediaUrl: z.string().trim().min(1, 'Media URL is required'),
  mediaType: z.enum(ADVERTISEMENT_MEDIA_TYPES),
  duration: optionalNumber,
  sortOrder: sortOrderValue,
  startAt: optionalDateTime,
  endAt: optionalDateTime,
  status: z.enum(ADVERTISEMENT_STATUSES)
});

export type AdvertisementFormSchemaValues = z.infer<typeof advertisementSchema>;
