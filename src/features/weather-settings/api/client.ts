import type {
  WeatherSettingFormValues,
  WeatherSettingRecord,
  WeatherSettingToggleValues
} from './types';

interface WeatherSettingResponse {
  weatherSetting: WeatherSettingRecord | null;
}

async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {})
    }
  });

  const data = (await response.json().catch(() => null)) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  return data as T;
}

export function createWeatherSetting(values: WeatherSettingFormValues) {
  return requestJson<WeatherSettingResponse>('/api/weather-settings', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateWeatherSetting(id: string, values: WeatherSettingFormValues) {
  return requestJson<WeatherSettingResponse>(`/api/weather-settings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function setWeatherSettingEnabled(id: string, values: WeatherSettingToggleValues) {
  return requestJson<WeatherSettingResponse>(`/api/weather-settings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}
