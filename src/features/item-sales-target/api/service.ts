import 'server-only';

import { prisma } from '@/lib/prisma';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
import {
  normalizeNonNegativeInteger,
  normalizeOptionalNumber,
  normalizeOptionalText,
  normalizeText,
  parseOptionalDateInput,
  parseItemCodeList
} from '../lib/item-codes';
import type {
  ItemSalesTargetFormValues,
  ItemSalesTargetListFilters,
  ItemSalesTargetListResult
} from './types';

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = normalizeText(value);
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | undefined {
  if (value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED') {
    return value;
  }

  return undefined;
}

function normalizeRequiredText(value: string): string {
  return normalizeText(value);
}

function normalizeDateInput(value?: string): Date | null {
  const parsed = parseOptionalDateInput(value);

  return parsed ? parsed : null;
}

function buildWhere(filters: ItemSalesTargetListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);

  return {
    ...(status ? { status } : {}),
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
              itemCode: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              itemCodes: {
                has: search
              }
            }
          ]
        }
      : {})
  };
}

export async function getItemSalesTargets(
  filters: ItemSalesTargetListFilters = {}
): Promise<ItemSalesTargetListResult> {
  const where = buildWhere(filters);

  const itemSalesTargets = await prisma.itemSalesTarget.findMany({
    where,
    orderBy: [{ displayOrder: 'asc' }, { itemName: 'asc' }]
  });

  return {
    itemSalesTargets,
    total: itemSalesTargets.length
  };
}

export async function createItemSalesTarget(values: ItemSalesTargetFormValues) {
  const itemCodes = parseItemCodeList(values.itemCodesText ?? values.itemCode);
  const itemSalesTarget = await prisma.itemSalesTarget.create({
    data: {
      itemName: normalizeRequiredText(values.itemName),
      itemCode: normalizeOptionalText(values.itemCode) ?? itemCodes[0] ?? null,
      itemCodes,
      dailyTarget: normalizeOptionalNumber(values.dailyTarget),
      weeklyTarget: normalizeOptionalNumber(values.weeklyTarget),
      monthlyTarget: normalizeOptionalNumber(values.monthlyTarget),
      startDate: normalizeDateInput(values.startDate),
      endDate: normalizeDateInput(values.endDate),
      displayOrder: normalizeNonNegativeInteger(values.displayOrder),
      calculationMode: null,
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return itemSalesTarget;
}

export async function updateItemSalesTarget(id: string, values: ItemSalesTargetFormValues) {
  const itemCodes = parseItemCodeList(values.itemCodesText ?? values.itemCode);
  const itemSalesTarget = await prisma.itemSalesTarget.update({
    where: { id },
    data: {
      itemName: normalizeRequiredText(values.itemName),
      itemCode: normalizeOptionalText(values.itemCode) ?? itemCodes[0] ?? null,
      itemCodes,
      dailyTarget: normalizeOptionalNumber(values.dailyTarget),
      weeklyTarget: normalizeOptionalNumber(values.weeklyTarget),
      monthlyTarget: normalizeOptionalNumber(values.monthlyTarget),
      startDate: normalizeDateInput(values.startDate),
      endDate: normalizeDateInput(values.endDate),
      displayOrder: normalizeNonNegativeInteger(values.displayOrder),
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return itemSalesTarget;
}

export async function archiveItemSalesTarget(id: string) {
  const itemSalesTarget = await prisma.itemSalesTarget.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await bumpDisplayBoardRefreshToken();

  return itemSalesTarget;
}
