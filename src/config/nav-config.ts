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
        access: {
          permission: 'dashboard'
        },
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Boards / Displays',
        url: '/dashboard/boards-displays',
        icon: 'panelLeft',
        access: {
          permission: 'boardsDisplays'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Staff Records',
        url: '/dashboard/staff-records',
        icon: 'teams',
        access: {
          permission: 'staffRecords'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Manager Records',
        url: '/dashboard/manager-records',
        icon: 'account',
        access: {
          permission: 'managerRecords'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Attendance',
        url: '/dashboard/attendance',
        icon: 'clock',
        access: {
          permission: 'attendance'
        },
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
        access: {
          permission: 'events'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Meeting Schedule',
        url: '/dashboard/meeting-schedule',
        icon: 'calendar',
        access: {
          permission: 'meetingSchedule'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Advertisements',
        url: '/dashboard/advertisements',
        icon: 'media',
        access: {
          permission: 'advertisements'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Weather',
        url: '/dashboard/weather',
        icon: 'sun',
        access: {
          permission: 'weather'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Movie Schedule',
        url: '/dashboard/movie-schedule',
        icon: 'video',
        access: {
          permission: 'movieSchedule'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Item Sales Target',
        url: '/dashboard/item-sales-target',
        icon: 'adjustments',
        access: {
          permission: 'itemSalesTarget'
        },
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
        access: {
          permission: 'displayPages'
        },
        isActive: false,
        items: []
      },
      {
        title: 'System Settings',
        url: '/dashboard/system-settings',
        icon: 'settings',
        access: {
          permission: 'systemSettings'
        },
        isActive: false,
        items: []
      },
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: 'userPen',
        access: {
          permission: 'users'
        },
        isActive: false,
        items: []
      }
    ]
  }
];
