import * as z from 'zod';

import { isDisplayPageSlug } from '../lib/slug';
import {
  DISPLAY_BLOCKS,
  DISPLAY_BLOCK_KEYS,
  getDefaultDisplayLayoutConfig
} from '../lib/display-layout-config';

function normalizeNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}

export const displayLayoutBlockSchema = z
  .object({
    key: z.enum(DISPLAY_BLOCK_KEYS),
    enabled: z.boolean(),
    sortOrder: z.preprocess(normalizeNumber, z.number().int().nonnegative()),
    rowLimit: z.preprocess(normalizeNumber, z.number().int().nonnegative())
  })
  .superRefine((value, ctx) => {
    const definition = DISPLAY_BLOCKS.find((block) => block.key === value.key);
    if (!definition) {
      return;
    }

    if (value.rowLimit < definition.minRowLimit || value.rowLimit > definition.maxRowLimit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rowLimit'],
        message: `Row limit must be between ${definition.minRowLimit} and ${definition.maxRowLimit}`
      });
    }
  });

export const displayLayoutConfigSchema = z.object({
  blocks: z.array(displayLayoutBlockSchema).length(DISPLAY_BLOCKS.length)
});

export const displayPageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  slug: z.string().trim().min(1, 'Slug is required').refine(isDisplayPageSlug, {
    message: 'Slug must be lowercase URL-safe, like lobby-main'
  }),
  description: z.string().trim().optional(),
  resolutionWidth: z.preprocess(normalizeNumber, z.number().int().positive()),
  resolutionHeight: z.preprocess(normalizeNumber, z.number().int().positive()),
  layoutConfig: displayLayoutConfigSchema,
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED'])
});

export type DisplayPageFormSchemaValues = z.infer<typeof displayPageSchema>;

export function getDefaultDisplayPageSchemaValues(): DisplayPageFormSchemaValues {
  return {
    name: '',
    slug: '',
    description: '',
    resolutionWidth: 1920,
    resolutionHeight: 1080,
    layoutConfig: getDefaultDisplayLayoutConfig(),
    status: 'ACTIVE'
  };
}
