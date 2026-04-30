import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageContainer from '@/components/layout/page-container';

export interface ProfileViewPageProps {
  user: {
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return 'NB';
  }

  if (parts.length === 1) {
    return parts[0]?.slice(0, 2).toUpperCase() ?? 'NB';
  }

  return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
}

export default function ProfileViewPage({ user }: ProfileViewPageProps) {
  return (
    <PageContainer
      pageTitle='Profile'
      pageDescription='Local admin account details and session information.'
    >
      <div className='grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]'>
        <Card className='overflow-hidden'>
          <CardHeader className='items-center text-center'>
            <Avatar className='size-20 rounded-2xl'>
              <AvatarFallback className='rounded-2xl text-lg font-semibold'>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className='space-y-2'>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-center'>
              <Badge variant='secondary'>{user.role}</Badge>
            </div>
            <Button variant='outline' className='w-full' asChild>
              <a href='/dashboard/overview'>
                <Icons.dashboard className='size-4' />
                Back to dashboard
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Session details</CardTitle>
              <CardDescription>Current local session information from PostgreSQL.</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-lg border p-4'>
                <div className='text-muted-foreground text-xs uppercase tracking-wide'>Email</div>
                <div className='mt-1 font-medium'>{user.email}</div>
              </div>
              <div className='rounded-lg border p-4'>
                <div className='text-muted-foreground text-xs uppercase tracking-wide'>Role</div>
                <div className='mt-1 font-medium'>{user.role}</div>
              </div>
              <div className='rounded-lg border p-4'>
                <div className='text-muted-foreground text-xs uppercase tracking-wide'>
                  Created At
                </div>
                <div className='mt-1 font-medium'>{user.createdAt.toLocaleString()}</div>
              </div>
              <div className='rounded-lg border p-4'>
                <div className='text-muted-foreground text-xs uppercase tracking-wide'>
                  Updated At
                </div>
                <div className='mt-1 font-medium'>{user.updatedAt.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access</CardTitle>
              <CardDescription>
                Login is now handled by a signed httpOnly cookie backed by PostgreSQL.
              </CardDescription>
            </CardHeader>
            <CardContent className='text-muted-foreground text-sm leading-6'>
              Logout is available from the user menu in the sidebar. The session lasts seven days
              unless the cookie is cleared earlier.
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
