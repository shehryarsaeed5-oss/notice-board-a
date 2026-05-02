import 'server-only';

import { prisma } from '@/lib/prisma';
import type {
  ItemSalesTargetFormValues,
  ItemSalesTargetListFilters,
  ItemSalesTargetListResult
} from './types';

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | undefined {
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

function normalizeOptionalNumber(value?: number | string | null): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  return Number.isFinite(parsed) ? parsed : null;
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
    orderBy: [{ createdAt: 'desc' }, { itemName: 'asc' }]
  });

  return {
    itemSalesTargets,
    total: itemSalesTargets.length
  };
}

export async function createItemSalesTarget(values: ItemSalesTargetFormValues) {
  return prisma.itemSalesTarget.create({
    data: {
      itemName: normalizeRequiredText(values.itemName),
      itemCode: normalizeOptionalText(values.itemCode),
      dailyTarget: normalizeOptionalNumber(values.dailyTarget),
      weeklyTarget: normalizeOptionalNumber(values.weeklyTarget),
      monthlyTarget: normalizeOptionalNumber(values.monthlyTarget),
      status: values.status
    }
  });
}

export async function updateItemSalesTarget(id: string, values: ItemSalesTargetFormValues) {
  return prisma.itemSalesTarget.update({
    where: { id },
    data: {
      itemName: normalizeRequiredText(values.itemName),
      itemCode: normalizeOptionalText(values.itemCode),
      dailyTarget: normalizeOptionalNumber(values.dailyTarget),
      weeklyTarget: normalizeOptionalNumber(values.weeklyTarget),
      monthlyTarget: normalizeOptionalNumber(values.monthlyTarget),
      status: values.status
    }
  });
}

export async function archiveItemSalesTarget(id: string) {
  return prisma.itemSalesTarget.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });
}
