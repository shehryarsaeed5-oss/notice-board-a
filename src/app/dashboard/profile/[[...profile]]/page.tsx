import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { requireAdminSession } from '@/lib/auth';

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page() {
  const session = await requireAdminSession();

  return <ProfileViewPage user={session.user} />;
}
