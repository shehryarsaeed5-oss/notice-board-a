'use client';

import type { NavGroup, NavItem } from '@/types';
import { filterNavGroupsByUser, type PermissionUser } from '@/lib/permissions';

export function useFilteredNavItems(items: NavItem[], user?: PermissionUser) {
  return filterNavGroupsByUser([{ label: '', items }], user)[0]?.items ?? [];
}

export function useFilteredNavGroups(groups: NavGroup[], user?: PermissionUser) {
  return filterNavGroupsByUser(groups, user);
}
