import type { PermissionKey, UserRole } from '@/lib/permissions';

export const USER_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: PermissionKey[];
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersListFilters {
  search?: string;
  status?: UserStatus;
}

export interface UsersListResult {
  users: UserRecord[];
  total: number;
}

export interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  permissions: PermissionKey[];
  password?: string;
  status: UserStatus;
}

export interface UserPasswordResetValues {
  password: string;
}
