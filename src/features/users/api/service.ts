import 'server-only';

import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import {
  ALL_PERMISSION_KEYS,
  getUserPermissions,
  normalizeUserRole,
  type PermissionKey,
  type UserRole
} from '@/lib/permissions';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';

import type {
  UserFormValues,
  UserPasswordResetValues,
  UserRecord,
  UsersListFilters,
  UsersListResult,
  UserStatus
} from './types';

export class UsersServiceError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'UsersServiceError';
    this.status = status;
  }
}

export class UserEmailConflictError extends UsersServiceError {
  constructor() {
    super('A user with this email already exists.', 409);
    this.name = 'UserEmailConflictError';
  }
}

export class UserNotFoundError extends UsersServiceError {
  constructor() {
    super('User not found.', 404);
    this.name = 'UserNotFoundError';
  }
}

export class UserSafetyError extends UsersServiceError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'UserSafetyError';
  }
}

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  permissions: true,
  status: true,
  createdAt: true,
  updatedAt: true
} as const;

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): UserStatus | undefined {
  if (value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED') {
    return value;
  }

  return undefined;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeUserPermissions(role: UserRole, permissions: string[]): PermissionKey[] {
  if (role === 'ADMIN') {
    return [...ALL_PERMISSION_KEYS];
  }

  if (role === 'VIEWER') {
    return ['dashboard'];
  }

  const uniquePermissions = new Set<PermissionKey>(['dashboard']);
  for (const permission of permissions) {
    if (ALL_PERMISSION_KEYS.includes(permission as PermissionKey)) {
      uniquePermissions.add(permission as PermissionKey);
    }
  }

  return ALL_PERMISSION_KEYS.filter((permission) => uniquePermissions.has(permission));
}

async function assertEmailIsUnique(email: string, excludeId?: string) {
  const existing = await prisma.user.findFirst({
    where: excludeId ? { email, NOT: { id: excludeId } } : { email },
    select: { id: true }
  });

  if (existing) {
    throw new UserEmailConflictError();
  }
}

async function assertUserSafety(
  existingUser: UserRecord,
  nextRole: UserRole,
  nextStatus: UserStatus,
  actorUserId?: string
) {
  if (actorUserId === existingUser.id && (nextRole !== 'ADMIN' || nextStatus !== 'ACTIVE')) {
    throw new UserSafetyError('You cannot remove your own admin access or deactivate yourself.');
  }

  const isRemovingActiveAdmin =
    existingUser.role === 'ADMIN' &&
    existingUser.status === 'ACTIVE' &&
    (nextRole !== 'ADMIN' || nextStatus !== 'ACTIVE');

  if (!isRemovingActiveAdmin) {
    return;
  }

  const activeAdminCount = await prisma.user.count({
    where: {
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  if (activeAdminCount <= 1) {
    throw new UserSafetyError('You cannot archive or demote the last active admin account.');
  }
}

async function bumpUsersRefresh() {
  await bumpDisplayBoardRefreshToken();
}

function mapUserRecord(record: {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}): UserRecord {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    role: normalizeUserRole(record.role),
    permissions: getUserPermissions(record),
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

function buildWhere(filters: UsersListFilters) {
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
              email: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

export async function getUsers(filters: UsersListFilters = {}): Promise<UsersListResult> {
  const users = await prisma.user.findMany({
    where: buildWhere(filters),
    select: USER_SELECT,
    orderBy: [{ createdAt: 'desc' }, { name: 'asc' }]
  });

  return {
    users: users.map(mapUserRecord),
    total: users.length
  };
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: USER_SELECT
  });

  return user ? mapUserRecord(user) : null;
}

export async function createUser(values: UserFormValues): Promise<UserRecord> {
  const email = normalizeEmail(values.email);
  await assertEmailIsUnique(email);

  const user = await prisma.user.create({
    data: {
      name: normalizeRequiredText(values.name),
      email,
      password: await hashPassword(values.password ?? ''),
      role: normalizeUserRole(values.role),
      permissions: normalizeUserPermissions(normalizeUserRole(values.role), values.permissions),
      status: values.status
    },
    select: USER_SELECT
  });

  await bumpUsersRefresh();

  return mapUserRecord(user);
}

export async function updateUser(
  id: string,
  values: UserFormValues,
  actorUserId?: string
): Promise<UserRecord> {
  const existingUser = await getUserById(id);

  if (!existingUser) {
    throw new UserNotFoundError();
  }

  const email = normalizeEmail(values.email);
  await assertEmailIsUnique(email, id);

  const nextRole = normalizeUserRole(values.role);
  const nextStatus = values.status;

  await assertUserSafety(existingUser, nextRole, nextStatus, actorUserId);

  const data: {
    name: string;
    email: string;
    role: UserRole;
    permissions: PermissionKey[];
    status: UserStatus;
    password?: string;
  } = {
    name: normalizeRequiredText(values.name),
    email,
    role: nextRole,
    permissions: normalizeUserPermissions(nextRole, values.permissions),
    status: nextStatus
  };

  if (values.password) {
    data.password = await hashPassword(values.password);
  }

  const user = await prisma.user.update({
    where: { id },
    data,
    select: USER_SELECT
  });

  await bumpUsersRefresh();

  return mapUserRecord(user);
}

export async function archiveUser(id: string, actorUserId?: string): Promise<UserRecord> {
  const existingUser = await getUserById(id);

  if (!existingUser) {
    throw new UserNotFoundError();
  }

  await assertUserSafety(existingUser, existingUser.role, 'ARCHIVED', actorUserId);

  const user = await prisma.user.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    },
    select: USER_SELECT
  });

  await bumpUsersRefresh();

  return mapUserRecord(user);
}

export async function resetUserPassword(
  id: string,
  values: UserPasswordResetValues,
  actorUserId?: string
): Promise<UserRecord> {
  const existingUser = await getUserById(id);

  if (!existingUser) {
    throw new UserNotFoundError();
  }

  if (actorUserId === existingUser.id && existingUser.role !== 'ADMIN') {
    throw new UserSafetyError('You cannot reset a password for the active account from itself.');
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      password: await hashPassword(values.password)
    },
    select: USER_SELECT
  });

  await bumpUsersRefresh();

  return mapUserRecord(user);
}
