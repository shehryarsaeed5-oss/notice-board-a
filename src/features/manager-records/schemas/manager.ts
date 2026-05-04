import * as z from 'zod';
import { MANAGER_RECORD_STATUSES } from '../api/types';

function optionalNonNegativeInteger(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

export const managerSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  designation: optionalText,
  phone: optionalText,
  sortOrder: z.preprocess(optionalNonNegativeInteger, z.number().int().nonnegative().default(0)),
  status: z.enum(MANAGER_RECORD_STATUSES)
});

export type ManagerFormSchemaValues = z.infer<typeof managerSchema>;
