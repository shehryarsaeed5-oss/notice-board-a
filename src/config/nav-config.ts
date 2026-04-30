import { NavGroup } from '@/types';

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 * Items are organized into groups, each rendered with a SidebarGroupLabel.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Boards / Displays',
        url: '/dashboard/boards-displays',
        icon: 'panelLeft',
        isActive: false,
        items: []
      },
      {
        title: 'Staff Records',
        url: '/dashboard/staff-records',
        icon: 'teams',
        isActive: false,
        items: []
      },
      {
        title: 'Manager Records',
        url: '/dashboard/manager-records',
        icon: 'account',
        isActive: false,
        items: []
      },
      {
        title: 'Attendance',
        url: '/dashboard/attendance',
        icon: 'clock',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Operations',
    items: [
      {
        title: 'Events',
        url: '/dashboard/events',
        icon: 'calendar',
        isActive: false,
        items: []
      },
      {
        title: 'Meeting Schedule',
        url: '/dashboard/meeting-schedule',
        icon: 'calendar',
        isActive: false,
        items: []
      },
      {
        title: 'Advertisements',
        url: '/dashboard/advertisements',
        icon: 'media',
        isActive: false,
        items: []
      },
      {
        title: 'Weather',
        url: '/dashboard/weather',
        icon: 'sun',
        isActive: false,
        items: []
      },
      {
        title: 'Movie Schedule',
        url: '/dashboard/movie-schedule',
        icon: 'video',
        isActive: false,
        items: []
      },
      {
        title: 'Item Sales Target',
        url: '/dashboard/item-sales-target',
        icon: 'adjustments',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Configuration',
    items: [
      {
        title: 'Display Pages',
        url: '/dashboard/display-pages',
        icon: 'page',
        isActive: false,
        items: []
      },
      {
        title: 'System Settings',
        url: '/dashboard/system-settings',
        icon: 'settings',
        isActive: false,
        items: []
      }
    ]
  }
];
