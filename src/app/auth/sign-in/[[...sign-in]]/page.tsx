import { Metadata } from 'next';
import { getCurrentAdminSession } from '@/lib/auth';
import SignInViewPage from '@/features/auth/components/sign-in-view';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  const session = await getCurrentAdminSession();

  if (session) {
    redirect('/dashboard');
  }

  return <SignInViewPage />;
}
