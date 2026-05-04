'use client';

import { format } from 'date-fns';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { SortableTableHead } from '@/components/ui/sortable-table-head';
import { cn } from '@/lib/utils';
import { getUserPermissions } from '@/lib/permissions';
import { sortRows, toggleSort, type SortState } from '@/lib/table-sort';

import type { UserRecord } from '../api/types';
import { UserActions } from './user-actions';

interface UsersTableProps {
  users: UserRecord[];
  currentUserId: string;
}

type UserSortKey = 'name' | 'email' | 'role' | 'permissions' | 'status' | 'createdAt';

function getStatusClass(status: UserRecord['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    case 'INACTIVE':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
    case 'ARCHIVED':
      return 'border-muted-foreground/20 bg-muted/40 text-muted-foreground';
    default:
      return '';
  }
}

function getRoleClass(role: UserRecord['role']) {
  switch (role) {
    case 'ADMIN':
      return 'border-primary/30 bg-primary/10 text-primary';
    case 'CUSTOM':
      return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
    case 'VIEWER':
      return 'border-violet-500/30 bg-violet-500/10 text-violet-300';
    default:
      return '';
  }
}

function formatDate(value: Date) {
  return format(value, 'MMM d, yyyy');
}

const PERMISSION_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  boardsDisplays: 'Boards / Displays',
  displayPages: 'Display Pages',
  staffRecords: 'Staff Records',
  managerRecords: 'Manager Records',
  attendance: 'Attendance',
  events: 'Events',
  meetingSchedule: 'Meeting Schedule',
  advertisements: 'Advertisements',
  weather: 'Weather',
  movieSchedule: 'Movie Schedule',
  itemSalesTarget: 'Item Sales Target',
  systemSettings: 'System Settings',
  users: 'Users'
};

function PermissionBadges({ user }: { user: UserRecord }) {
  const permissions = getUserPermissions(user);

  if (user.role === 'ADMIN') {
    return (
      <Badge variant='outline' className='border-primary/30 bg-primary/10 text-primary'>
        All access
      </Badge>
    );
  }

  if (user.role === 'VIEWER') {
    return (
      <Badge
        variant='outline'
        className='border-muted-foreground/20 bg-muted/40 text-muted-foreground'
      >
        Dashboard only
      </Badge>
    );
  }

  return (
    <div className='flex max-w-[26rem] flex-wrap gap-1.5'>
      {permissions.slice(0, 4).map((permission) => (
        <Badge key={permission} variant='outline' className='border-border/60 bg-background'>
          {PERMISSION_LABELS[permission] ?? permission}
        </Badge>
      ))}
      {permissions.length > 4 && (
        <Badge variant='outline' className='border-border/60 bg-background'>
          +{permissions.length - 4} more
        </Badge>
      )}
    </div>
  );
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const [sort, setSort] = useState<SortState<UserSortKey> | null>(null);

  const sortedUsers = useMemo(
    () =>
      sortRows(users, sort, (user, key) => {
        switch (key) {
          case 'name':
            return user.name;
          case 'email':
            return user.email;
          case 'role':
            return user.role;
          case 'permissions':
            return getUserPermissions(user).length;
          case 'status':
            return user.status;
          case 'createdAt':
            return user.createdAt;
        }
      }),
    [sort, users]
  );

  const handleSort = (key: UserSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader className='flex flex-row items-start justify-between gap-4'>
        <div>
          <CardDescription>User accounts and access levels</CardDescription>
          <CardTitle>{users.length.toLocaleString()} user(s)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead label='Name' sortKey='name' sort={sort} onSort={handleSort} />
                <SortableTableHead label='Email' sortKey='email' sort={sort} onSort={handleSort} />
                <SortableTableHead label='Role' sortKey='role' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Permissions'
                  sortKey='permissions'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Status'
                  sortKey='status'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Created'
                  sortKey='createdAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className='align-top'>
                      <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2 font-medium'>
                          <span>{user.name}</span>
                          {user.id === currentUserId && (
                            <Badge
                              variant='outline'
                              className='border-primary/30 bg-primary/10 text-primary'
                            >
                              You
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant='outline' className={cn('gap-1.5', getRoleClass(user.role))}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <PermissionBadges user={user} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(user.status))}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <UserActions user={user} currentUserId={currentUserId} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
