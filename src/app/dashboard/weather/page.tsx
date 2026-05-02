import type { Metadata } from 'next';
import { requireRouteAccess } from '@/lib/access';

import { WeatherSettingsPage } from '@/features/weather-settings/components/weather-settings-page';

export const metadata: Metadata = {
  title: 'Weather Settings'
};

export default async function Page() {
  await requireRouteAccess('/dashboard/weather');
  return <WeatherSettingsPage />;
}
