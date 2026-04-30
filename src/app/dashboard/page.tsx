import { getCurrentAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getCurrentAdminSession();

  if (session) {
    redirect('/dashboard/overview');
  }

  redirect('/auth/sign-in');
}
