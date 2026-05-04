import 'server-only';

import { invalidateDisplayBoardCache } from '@/features/display-board/api/cache';
import { prisma } from '@/lib/prisma';
import type { ManagerFormValues, ManagerListFilters, ManagerListResult } from './types';

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

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeSortOrder(value?: number | string | null): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  if (typeof parsed !== 'number' || !Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Math.trunc(parsed);
}

function buildWhere(filters: ManagerListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);

  return {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              designation: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              phone: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getManagers(filters: ManagerListFilters = {}): Promise<ManagerListResult> {
  const where = buildWhere(filters);

  const managers = await prisma.manager.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
  });

  return {
    managers,
    total: managers.length
  };
}

export async function createManager(values: ManagerFormValues) {
  const manager = await prisma.manager.create({
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeOptionalText(values.designation),
      phone: normalizeOptionalText(values.phone),
      sortOrder: normalizeSortOrder(values.sortOrder),
      status: values.status
    }
  });

  await invalidateDisplayBoardCache();

  return manager;
}

export async function updateManager(id: string, values: ManagerFormValues) {
  const manager = await prisma.manager.update({
    where: { id },
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeOptionalText(values.designation),
      phone: normalizeOptionalText(values.phone),
      sortOrder: normalizeSortOrder(values.sortOrder),
      status: values.status
    }
  });

  await invalidateDisplayBoardCache();

  return manager;
}

export async function archiveManager(id: string) {
  const manager = await prisma.manager.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await invalidateDisplayBoardCache();

  return manager;
}
