import * as z from 'zod';
import { STAFF_RECORD_STATUSES } from '../api/types';

export const staffMemberSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  designation: z.string().trim().min(2, 'Designation is required'),
  department: z.string().trim().optional().or(z.literal('')),
  phone: z.string().trim().optional().or(z.literal('')),
  status: z.enum(STAFF_RECORD_STATUSES)
});

export type StaffMemberFormSchemaValues = z.infer<typeof staffMemberSchema>;
