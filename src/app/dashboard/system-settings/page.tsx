import type { Metadata } from 'next';

import { requireRouteAccess } from '@/lib/access';
import { getSystemSettings } from '@/features/system-settings/api/service';
import { SystemSettingsPage } from '@/features/system-settings/components/system-settings-page';

export const metadata: Metadata = {
  title: 'Dashboard: System Settings'
};

export default async function Page() {
  await requireRouteAccess('/dashboard/system-settings');
  const systemSettings = await getSystemSettings();

  return <SystemSettingsPage initialSettings={systemSettings} />;
}
