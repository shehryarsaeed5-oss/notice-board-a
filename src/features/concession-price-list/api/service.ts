import 'server-only';

import { prisma } from '@/lib/prisma';
import { invalidateDisplayBoardCache } from '@/features/display-board/api/cache';

import {
  buildConcessionImportDuplicateKey,
  type ConcessionImportPreparedRow
} from '../lib/concession-import';

import type {
  ConcessionPriceItemFormValues,
  ConcessionPriceItemListFilters,
  ConcessionPriceItemListResult,
  ConcessionPriceItemRecord,
  ConcessionPriceItemStatus,
  ConcessionPriceItemImportResult
} from './types';

export class ConcessionPriceItemNotFoundError extends Error {
  constructor() {
    super('Concession price item not found.');
    this.name = 'ConcessionPriceItemNotFoundError';
  }
}

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): ConcessionPriceItemStatus | undefined {
  if (value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED') {
    return value;
  }

  return undefined;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizePrice(value?: number | string | null): number {
  const parsed = typeof value === 'string' ? Number(value) : value;

  if (typeof parsed !== 'number' || !Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return parsed;
}

function normalizeSortOrder(value?: number | string | null): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : 0;
}

function buildNormalizedDuplicateKey(itemName: string, category: string | null): string {
  return buildConcessionImportDuplicateKey({ itemName, category });
}

async function getDistinctCategories(): Promise<string[]> {
  const categoryRows = await prisma.concessionPriceItem.findMany({
    select: {
      category: true
    },
    orderBy: {
      category: 'asc'
    }
  });

  const categories = new Set<string>();

  for (const row of categoryRows) {
    const category = row.category?.trim();

    if (category) {
      categories.add(category);
    }
  }

  return [...categories];
}

async function assertItemExists(id: string): Promise<ConcessionPriceItemRecord> {
  const item = await prisma.concessionPriceItem.findUnique({
    where: { id }
  });

  if (!item) {
    throw new ConcessionPriceItemNotFoundError();
  }

  return item as ConcessionPriceItemRecord;
}

function buildWhere(filters: ConcessionPriceItemListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);
  const category = normalizeSearchTerm(filters.category);

  return {
    ...(status ? { status } : {}),
    ...(category ? { category } : {}),
    ...(search
      ? {
          OR: [
            {
              itemName: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              category: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getConcessionPriceItems(
  filters: ConcessionPriceItemListFilters = {}
): Promise<ConcessionPriceItemListResult> {
  const where = buildWhere(filters);

  const [concessionPriceItems, categories] = await Promise.all([
    prisma.concessionPriceItem.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { itemName: 'asc' }]
    }),
    getDistinctCategories()
  ]);

  return {
    concessionPriceItems: concessionPriceItems as ConcessionPriceItemRecord[],
    categories,
    total: concessionPriceItems.length
  };
}

export async function getConcessionPriceItemById(id: string): Promise<ConcessionPriceItemRecord> {
  return assertItemExists(id);
}

export async function createConcessionPriceItem(values: ConcessionPriceItemFormValues) {
  const concessionPriceItem = await prisma.concessionPriceItem.create({
    data: {
      itemName: normalizeRequiredText(values.itemName),
      category: normalizeOptionalText(values.category),
      price: normalizePrice(values.price),
      sortOrder: normalizeSortOrder(values.sortOrder),
      status: values.status
    }
  });

  await invalidateDisplayBoardCache();

  return concessionPriceItem;
}

export async function updateConcessionPriceItem(id: string, values: ConcessionPriceItemFormValues) {
  await assertItemExists(id);

  const concessionPriceItem = await prisma.concessionPriceItem.update({
    where: { id },
    data: {
      itemName: normalizeRequiredText(values.itemName),
      category: normalizeOptionalText(values.category),
      price: normalizePrice(values.price),
      sortOrder: normalizeSortOrder(values.sortOrder),
      status: values.status
    }
  });

  await invalidateDisplayBoardCache();

  return concessionPriceItem;
}

export async function archiveConcessionPriceItem(id: string) {
  await assertItemExists(id);

  const concessionPriceItem = await prisma.concessionPriceItem.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await invalidateDisplayBoardCache();

  return concessionPriceItem;
}

export async function importConcessionPriceItems(
  rows: ConcessionImportPreparedRow[]
): Promise<ConcessionPriceItemImportResult> {
  const existingItems = await prisma.concessionPriceItem.findMany({
    select: {
      itemName: true,
      category: true
    }
  });

  const existingKeys = new Set(
    existingItems.map((item) => buildNormalizedDuplicateKey(item.itemName, item.category))
  );
  const data = [];
  let skippedCount = 0;

  for (const row of rows) {
    if (existingKeys.has(row.duplicateKey)) {
      skippedCount += 1;
      continue;
    }

    existingKeys.add(row.duplicateKey);
    data.push({
      itemName: normalizeRequiredText(row.itemName),
      category: normalizeOptionalText(row.category ?? undefined),
      price: row.price,
      sortOrder: row.sortOrder,
      status: row.status
    });
  }

  if (data.length > 0) {
    await prisma.concessionPriceItem.createMany({
      data
    });
  }

  if (data.length > 0 || skippedCount > 0) {
    await invalidateDisplayBoardCache();
  }

  return {
    importedCount: data.length,
    skippedCount,
    failedCount: 0
  };
}
