import 'server-only';

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
    orderBy: [{ createdAt: 'desc' }, { name: 'asc' }]
  });

  return {
    managers,
    total: managers.length
  };
}

export async function createManager(values: ManagerFormValues) {
  return prisma.manager.create({
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeOptionalText(values.designation),
      phone: normalizeOptionalText(values.phone),
      status: values.status
    }
  });
}

export async function updateManager(id: string, values: ManagerFormValues) {
  return prisma.manager.update({
    where: { id },
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeOptionalText(values.designation),
      phone: normalizeOptionalText(values.phone),
      status: values.status
    }
  });
}

export async function archiveManager(id: string) {
  return prisma.manager.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });
}
