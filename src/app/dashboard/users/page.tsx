import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';

import type { UserStatus } from '@/features/users/api/types';
import { getUsers } from '@/features/users/api/service';
import { UsersPage } from '@/features/users/components/users-page';

export const metadata: Metadata = {
  title: 'Users'
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function Page({ searchParams }: PageProps) {
  const session = await requireRouteAccess('/dashboard/users');
  const params = await searchParams;
  const search = readQueryValue(params.search);
  const status = readQueryValue(params.status);
  const { users } = await getUsers({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
        ? (status as UserStatus)
        : undefined
  });

  return (
    <UsersPage
      users={users}
      currentUserId={session.user.id}
      search={search}
      status={
        status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
          ? (status as UserStatus)
          : undefined
      }
    />
  );
}
