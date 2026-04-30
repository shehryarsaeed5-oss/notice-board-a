import 'server-only';

import { prisma } from '@/lib/prisma';
import type { StaffMemberFormValues, StaffMemberListFilters, StaffMemberListResult } from './types';

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

function buildWhere(filters: StaffMemberListFilters) {
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
              department: {
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

export async function getStaffMembers(
  filters: StaffMemberListFilters = {}
): Promise<StaffMemberListResult> {
  const where = buildWhere(filters);

  const staffMembers = await prisma.staffMember.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }, { name: 'asc' }]
  });

  return {
    staffMembers,
    total: staffMembers.length
  };
}

export async function createStaffMember(values: StaffMemberFormValues) {
  return prisma.staffMember.create({
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeRequiredText(values.designation),
      department: normalizeOptionalText(values.department),
      phone: normalizeOptionalText(values.phone),
      status: values.status
    }
  });
}

export async function updateStaffMember(id: string, values: StaffMemberFormValues) {
  return prisma.staffMember.update({
    where: { id },
    data: {
      name: normalizeRequiredText(values.name),
      designation: normalizeRequiredText(values.designation),
      department: normalizeOptionalText(values.department),
      phone: normalizeOptionalText(values.phone),
      status: values.status
    }
  });
}

export async function archiveStaffMember(id: string) {
  return prisma.staffMember.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    }
  });
}

export async function deleteStaffMember(id: string) {
  const existing = await prisma.staffMember.findUnique({
    where: { id }
  });

  if (!existing) {
    return null;
  }

  if (existing.status !== 'ARCHIVED') {
    return prisma.staffMember.update({
      where: { id },
      data: {
        status: 'ARCHIVED'
      }
    });
  }

  return prisma.staffMember.delete({
    where: { id }
  });
}
