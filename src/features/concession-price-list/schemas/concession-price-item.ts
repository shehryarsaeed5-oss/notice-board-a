import * as z from 'zod';

import { CONCESSION_PRICE_ITEM_STATUSES } from '../api/types';

function normalizeOptionalText(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeNumberInput(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  if (typeof parsed !== 'number' || !Number.isFinite(parsed)) {
    return undefined;
  }

  return parsed;
}

export const concessionPriceItemSchema = z.object({
  itemName: z.string().trim().min(1, 'Item name is required'),
  category: z.preprocess(normalizeOptionalText, z.string().trim().min(1).optional()),
  price: z.preprocess(normalizeNumberInput, z.number().positive('Price must be greater than 0')),
  sortOrder: z.preprocess(normalizeNumberInput, z.number().int().nonnegative().default(0)),
  status: z.enum(CONCESSION_PRICE_ITEM_STATUSES)
});

export type ConcessionPriceItemFormSchemaValues = z.infer<typeof concessionPriceItemSchema>;
