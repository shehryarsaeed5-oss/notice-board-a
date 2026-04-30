'use client';

import type { NavGroup, NavItem } from '@/types';

function isLocalAuthRestricted(item: NavItem) {
  return Boolean(item.access?.requireOrg || item.access?.plan || item.access?.feature);
}

function filterNavItems(items: NavItem[]): NavItem[] {
  return items
    .filter((item) => !isLocalAuthRestricted(item))
    .map((item) => {
      if (!item.items || item.items.length === 0) {
        return item;
      }

      return {
        ...item,
        items: filterNavItems(item.items)
      };
    })
    .filter((item) => !item.items || item.items.length > 0 || item.url !== '#');
}

export function useFilteredNavItems(items: NavItem[]) {
  return filterNavItems(items);
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  return groups
    .map((group) => ({
      ...group,
      items: filterNavItems(group.items)
    }))
    .filter((group) => group.items.length > 0);
}
