import type { NavGroup, NavItem } from '@/types';

export const ALL_PERMISSION_KEYS = [
  'dashboard',
  'boardsDisplays',
  'displayPages',
  'staffRecords',
  'managerRecords',
  'attendance',
  'events',
  'meetingSchedule',
  'advertisements',
  'weather',
  'movieSchedule',
  'itemSalesTarget',
  'concessionPriceList',
  'systemSettings',
  'users'
] as const;

export type PermissionKey = (typeof ALL_PERMISSION_KEYS)[number];

export const USER_ROLES = ['ADMIN', 'CUSTOM', 'VIEWER'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface PermissionUser {
  role: string;
  permissions: string[];
}

export interface PermissionRouteRule {
  pattern: string;
  permission: PermissionKey;
}

export interface PermissionApiRule {
  pattern: string;
  permission: PermissionKey;
}

function findBestMatchingRule<T extends { pattern: string }>(
  pathname: string,
  rules: T[]
): T | undefined {
  return rules
    .filter((entry) => pathname === entry.pattern || pathname.startsWith(`${entry.pattern}/`))
    .sort((left, right) => right.pattern.length - left.pattern.length)[0];
}

export const ROUTE_PERMISSION_MAP: PermissionRouteRule[] = [
  { pattern: '/dashboard', permission: 'dashboard' },
  { pattern: '/dashboard/overview', permission: 'dashboard' },
  { pattern: '/dashboard/users', permission: 'users' },
  { pattern: '/dashboard/boards-displays', permission: 'boardsDisplays' },
  { pattern: '/dashboard/display-pages', permission: 'displayPages' },
  { pattern: '/dashboard/staff-records', permission: 'staffRecords' },
  { pattern: '/dashboard/manager-records', permission: 'managerRecords' },
  { pattern: '/dashboard/attendance', permission: 'attendance' },
  { pattern: '/dashboard/events', permission: 'events' },
  { pattern: '/dashboard/meeting-schedule', permission: 'meetingSchedule' },
  { pattern: '/dashboard/advertisements', permission: 'advertisements' },
  { pattern: '/dashboard/weather', permission: 'weather' },
  { pattern: '/dashboard/movie-schedule', permission: 'movieSchedule' },
  { pattern: '/dashboard/item-sales-target', permission: 'itemSalesTarget' },
  { pattern: '/dashboard/concession-price-list', permission: 'concessionPriceList' },
  { pattern: '/dashboard/system-settings', permission: 'systemSettings' }
];

export const API_PERMISSION_MAP: PermissionApiRule[] = [
  { pattern: '/api/users', permission: 'users' },
  { pattern: '/api/display-pages', permission: 'displayPages' },
  { pattern: '/api/staff-records', permission: 'staffRecords' },
  { pattern: '/api/manager-records', permission: 'managerRecords' },
  { pattern: '/api/attendance', permission: 'attendance' },
  { pattern: '/api/events', permission: 'events' },
  { pattern: '/api/meeting-schedule', permission: 'meetingSchedule' },
  { pattern: '/api/movie-schedule', permission: 'movieSchedule' },
  { pattern: '/api/advertisements', permission: 'advertisements' },
  { pattern: '/api/weather-settings', permission: 'weather' },
  { pattern: '/api/item-sales-target', permission: 'itemSalesTarget' },
  { pattern: '/api/concession-price-list', permission: 'concessionPriceList' },
  { pattern: '/api/system-settings', permission: 'systemSettings' }
];

function isPermissionKey(value: string): value is PermissionKey {
  return ALL_PERMISSION_KEYS.includes(value as PermissionKey);
}

export function normalizeUserRole(role: string): UserRole {
  const normalized = role.trim().toUpperCase();

  if (normalized === 'ADMIN' || normalized === 'CUSTOM' || normalized === 'VIEWER') {
    return normalized;
  }

  if (normalized === 'ADMINISTRATOR') {
    return 'ADMIN';
  }

  return 'VIEWER';
}

export function getUserPermissions(user: PermissionUser): PermissionKey[] {
  const role = normalizeUserRole(user.role);

  if (role === 'ADMIN') {
    return [...ALL_PERMISSION_KEYS];
  }

  const permissions = new Set<PermissionKey>(['dashboard']);

  if (role === 'CUSTOM') {
    for (const permission of user.permissions) {
      if (isPermissionKey(permission)) {
        permissions.add(permission);
      }
    }
  }

  return [...permissions];
}

export function hasPermission(user: PermissionUser, permission: PermissionKey): boolean {
  return getUserPermissions(user).includes(permission);
}

export function getRoutePermission(pathname: string): PermissionKey | null {
  const rule = findBestMatchingRule(pathname, ROUTE_PERMISSION_MAP);

  return rule?.permission ?? null;
}

export function getApiPermission(pathname: string, method: string): PermissionKey | null {
  if (pathname === '/api/display/refresh-token' && method.toUpperCase() === 'POST') {
    return 'boardsDisplays';
  }

  const rule = findBestMatchingRule(pathname, API_PERMISSION_MAP);

  return rule?.permission ?? null;
}

export function canAccessRoute(user: PermissionUser, pathname: string): boolean {
  const permission = getRoutePermission(pathname);

  if (!permission) {
    return pathname === '/dashboard/overview' || pathname === '/dashboard';
  }

  return hasPermission(user, permission);
}

export function canAccessApi(user: PermissionUser, pathname: string, method: string): boolean {
  if (pathname === '/api/auth/login' || pathname === '/api/auth/logout') {
    return true;
  }

  if (pathname === '/api/display/refresh-token' && method.toUpperCase() === 'GET') {
    return true;
  }

  const permission = getApiPermission(pathname, method);

  if (!permission) {
    return false;
  }

  if (pathname === '/api/display/refresh-token' && method.toUpperCase() === 'POST') {
    return hasPermission(user, 'boardsDisplays') || hasPermission(user, 'displayPages');
  }

  return hasPermission(user, permission);
}

function canUseItem(user: PermissionUser, item: NavItem): boolean {
  const access = item.access;

  if (!access) {
    return true;
  }

  if (access.requireOrg || access.plan || access.feature) {
    return false;
  }

  if (access.role && normalizeUserRole(user.role) !== normalizeUserRole(access.role)) {
    return false;
  }

  if (access.permission) {
    return hasPermission(user, access.permission as PermissionKey);
  }

  return true;
}

export function filterNavGroupsByUser(groups: NavGroup[], user?: PermissionUser): NavGroup[] {
  if (!user) {
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => !item.access?.requireOrg && !item.access?.plan && !item.access?.feature
        )
      }))
      .filter((group) => group.items.length > 0);
  }

  return groups
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => canUseItem(user, item))
        .map((item) => {
          if (!item.items || item.items.length === 0) {
            return item;
          }

          return {
            ...item,
            items: item.items.filter((child) => canUseItem(user, child))
          };
        })
        .filter((item) => !item.items || item.items.length > 0 || item.url !== '#')
    }))
    .filter((group) => group.items.length > 0);
}
