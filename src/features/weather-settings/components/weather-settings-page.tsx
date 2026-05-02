import PageContainer from '@/components/layout/page-container';
import { getWeatherSetting } from '../api/service';
import { WeatherProviderNotesCard } from './weather-provider-notes-card';
import { WeatherSettingSummaryCard } from './weather-setting-summary-card';
import { WeatherSettingsEmptyState } from './weather-settings-empty-state';
import { WeatherSettingsPageActions } from './weather-settings-page-actions';

export async function WeatherSettingsPage() {
  const weatherSetting = await getWeatherSetting();
  const editableSetting = weatherSetting
    ? {
        id: weatherSetting.id,
        city: weatherSetting.city,
        provider: weatherSetting.provider,
        apiKey: weatherSetting.apiKey ?? '',
        enabled: weatherSetting.enabled
      }
    : null;

  return (
    <PageContainer
      pageTitle='Weather Settings'
      pageDescription='Configure the cinema weather provider, location, and enable state.'
      pageHeaderAction={
        editableSetting ? <WeatherSettingsPageActions weatherSetting={editableSetting} /> : null
      }
    >
      <div className='flex flex-col gap-4'>
        {weatherSetting ? (
          <WeatherSettingSummaryCard weatherSetting={weatherSetting} />
        ) : (
          <WeatherSettingsEmptyState />
        )}

        <WeatherProviderNotesCard />
      </div>
    </PageContainer>
  );
}
