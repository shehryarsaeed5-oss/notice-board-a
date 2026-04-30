import * as z from 'zod';
import { MANAGER_RECORD_STATUSES } from '../api/types';

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
  status: z.enum(MANAGER_RECORD_STATUSES)
});

export type ManagerFormSchemaValues = z.infer<typeof managerSchema>;
