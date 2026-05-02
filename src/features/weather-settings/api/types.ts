export const WEATHER_PROVIDERS = ['openweather', 'weatherapi', 'openmeteo'] as const;

export type WeatherSettingProvider = (typeof WEATHER_PROVIDERS)[number];

export interface WeatherSettingRecord {
  id: string;
  city: string;
  provider: WeatherSettingProvider;
  apiKey: string | null;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeatherSettingEditableRecord {
  id: string;
  city: string;
  provider: WeatherSettingProvider;
  apiKey: string;
  enabled: boolean;
}

export interface WeatherSettingFormValues {
  city: string;
  provider: WeatherSettingProvider;
  apiKey?: string;
  enabled: boolean;
}

export interface WeatherSettingToggleValues {
  enabled: boolean;
}
