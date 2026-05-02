import type { Metadata } from 'next';

import { WeatherSettingsPage } from '@/features/weather-settings/components/weather-settings-page';

export const metadata: Metadata = {
  title: 'Weather Settings'
};

export default async function Page() {
  return <WeatherSettingsPage />;
}
