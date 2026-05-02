import * as z from 'zod';

import { isDisplayPageSlug } from '../lib/slug';

export const displayPageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  slug: z.string().trim().min(1, 'Slug is required').refine(isDisplayPageSlug, {
    message: 'Slug must be lowercase URL-safe, like lobby-main'
  }),
  description: z.string().trim().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED'])
});

export type DisplayPageFormSchemaValues = z.infer<typeof displayPageSchema>;
