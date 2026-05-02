import { z } from 'zod';

import { normalizeDisplayPageSlug } from '@/features/display-pages/lib/slug';

import { TIMEZONE_OPTIONS } from '../api/types';

function optionalTextSchema() {
  return z.preprocess((value) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed ? trimmed : undefined;
    }

    return value;
  }, z.string().trim().optional());
}

function optionalSlugSchema() {
  return z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        const normalized = normalizeDisplayPageSlug(value);
        return normalized ? normalized : undefined;
      }

      return value;
    },
    z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase URL-safe')
      .optional()
  );
}

function integerFromInput(defaultValue: number, min: number, max?: number) {
  return z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) {
          return undefined;
        }

        return Number(trimmed);
      }

      return value;
    },
    max === undefined
      ? z.number().int().min(min).default(defaultValue)
      : z.number().int().min(min).max(max).default(defaultValue)
  );
}

export const systemSettingsSchema = z.object({
  siteName: z.string().trim().min(2, 'Site name is required'),
  displayRefreshSeconds: integerFromInput(60, 1),
  businessDayCutoffHour: integerFromInput(6, 0, 23),
  defaultDisplaySlug: optionalSlugSchema(),
  timezone: z.enum(TIMEZONE_OPTIONS).default('Asia/Karachi'),
  companyName: optionalTextSchema()
});

export type SystemSettingsFormValues = z.infer<typeof systemSettingsSchema>;
