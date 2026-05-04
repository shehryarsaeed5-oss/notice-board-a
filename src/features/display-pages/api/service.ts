import 'server-only';

import { Prisma } from '@/generated/prisma';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';
import { prisma } from '@/lib/prisma';

import { normalizeDisplayLayoutConfig } from '../lib/display-layout-config';
import { normalizeDisplayPageSlug } from '../lib/slug';
import type { DisplayPageFormValues, DisplayPageListFilters, DisplayPageListResult } from './types';

export class DisplayPageSlugConflictError extends Error {
  constructor() {
    super('Display page slug already exists');
    this.name = 'DisplayPageSlugConflictError';
  }
}

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

function normalizeDisplayPageRecord(displayPage: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  resolutionWidth: number | null;
  resolutionHeight: number | null;
  layoutConfig: unknown;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...displayPage,
    resolutionWidth: displayPage.resolutionWidth ?? 1920,
    resolutionHeight: displayPage.resolutionHeight ?? 1080,
    layoutConfig: normalizeDisplayLayoutConfig(displayPage.layoutConfig)
  };
}

function normalizeSlug(value: string): string {
  return normalizeDisplayPageSlug(value);
}

async function assertSlugIsUnique(slug: string, excludeId?: string) {
  const existing = await prisma.displayPage.findFirst({
    where: excludeId ? { slug, NOT: { id: excludeId } } : { slug },
    select: { id: true }
  });

  if (existing) {
    throw new DisplayPageSlugConflictError();
  }
}

function buildWhere(filters: DisplayPageListFilters) {
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
              slug: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              description: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getDisplayPages(
  filters: DisplayPageListFilters = {}
): Promise<DisplayPageListResult> {
  const where = buildWhere(filters);

  const displayPages = await prisma.displayPage.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }, { name: 'asc' }]
  });

  return {
    displayPages: displayPages.map(normalizeDisplayPageRecord),
    total: displayPages.length
  };
}

export async function createDisplayPage(values: DisplayPageFormValues) {
  const slug = normalizeSlug(values.slug);

  await assertSlugIsUnique(slug);

  const displayPage = await prisma.displayPage.create({
    data: {
      name: normalizeRequiredText(values.name),
      slug,
      description: normalizeOptionalText(values.description),
      resolutionWidth: values.resolutionWidth,
      resolutionHeight: values.resolutionHeight,
      layoutConfig: normalizeDisplayLayoutConfig(
        values.layoutConfig
      ) as unknown as Prisma.InputJsonValue,
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return normalizeDisplayPageRecord(displayPage);
}

export async function updateDisplayPage(id: string, values: DisplayPageFormValues) {
  const slug = normalizeSlug(values.slug);

  await assertSlugIsUnique(slug, id);

  const displayPage = await prisma.displayPage.update({
    where: { id },
    data: {
      name: normalizeRequiredText(values.name),
      slug,
      description: normalizeOptionalText(values.description),
      resolutionWidth: values.resolutionWidth,
      resolutionHeight: values.resolutionHeight,
      layoutConfig: normalizeDisplayLayoutConfig(
        values.layoutConfig
      ) as unknown as Prisma.InputJsonValue,
      status: values.status
    }
  });

  await bumpDisplayBoardRefreshToken();

  return normalizeDisplayPageRecord(displayPage);
}

export async function archiveDisplayPage(id: string) {
  const displayPage = await prisma.displayPage.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });

  await bumpDisplayBoardRefreshToken();

  return normalizeDisplayPageRecord(displayPage);
}
