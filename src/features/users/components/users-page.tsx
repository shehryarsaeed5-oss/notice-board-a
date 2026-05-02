import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';

import type { UserRecord, UserStatus } from '../api/types';
import { UserFormSheetTrigger } from './user-form-sheet';
import { UsersFilters } from './users-filters';
import { UsersTable } from './users-table';

interface UsersPageProps {
  users: UserRecord[];
  currentUserId: string;
  search?: string;
  status?: UserStatus;
}

export async function UsersPage({ users, currentUserId, search, status }: UsersPageProps) {
  return (
    <PageContainer
      pageTitle='Users'
      pageDescription='Create custom users and assign the pages and modules they can access.'
      pageHeaderAction={<UserFormSheetTrigger />}
    >
      <div className='flex flex-col gap-4'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardContent className='pt-6'>
            <UsersFilters search={search} status={status} />
          </CardContent>
        </Card>

        <UsersTable users={users} currentUserId={currentUserId} />
      </div>
    </PageContainer>
  );
}
