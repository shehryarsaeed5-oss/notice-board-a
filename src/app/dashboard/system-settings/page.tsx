import type { Metadata } from 'next';

import { getSystemSettings } from '@/features/system-settings/api/service';
import { SystemSettingsPage } from '@/features/system-settings/components/system-settings-page';

export const metadata: Metadata = {
  title: 'Dashboard: System Settings'
};

export default async function Page() {
  const systemSettings = await getSystemSettings();

  return <SystemSettingsPage initialSettings={systemSettings} />;
}
