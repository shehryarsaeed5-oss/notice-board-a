import 'server-only';

import type { DisplayBoardWeatherData, DisplayBoardWeatherIconKey } from './types';

const WEATHER_ICON_BASE_PATH = '/weather-icons/meteocons';
const WEATHER_ICON_PATHS = {
  clearDay: `${WEATHER_ICON_BASE_PATH}/clear-day.svg`,
  clearNight: `${WEATHER_ICON_BASE_PATH}/clear-night.svg`,
  partlyCloudyDay: `${WEATHER_ICON_BASE_PATH}/partly-cloudy-day.svg`,
  partlyCloudyNight: `${WEATHER_ICON_BASE_PATH}/partly-cloudy-night.svg`,
  cloudy: `${WEATHER_ICON_BASE_PATH}/cloudy.svg`,
  overcast: `${WEATHER_ICON_BASE_PATH}/overcast.svg`,
  rain: `${WEATHER_ICON_BASE_PATH}/rain.svg`,
  drizzle: `${WEATHER_ICON_BASE_PATH}/drizzle.svg`,
  thunderstorm: `${WEATHER_ICON_BASE_PATH}/thunderstorm.svg`,
  snow: `${WEATHER_ICON_BASE_PATH}/snow.svg`,
  fog: `${WEATHER_ICON_BASE_PATH}/fog.svg`,
  wind: `${WEATHER_ICON_BASE_PATH}/wind.svg`,
  notAvailable: `${WEATHER_ICON_BASE_PATH}/not-available.svg`
} as const;

function getWeatherIconPath(
  iconKey: DisplayBoardWeatherIconKey,
  conditionText: string,
  isDay: boolean | null,
  weatherCode: number | null
): string {
  const lowered = conditionText.toLowerCase();

  switch (iconKey) {
    case 'sunHigh':
      return isDay === false ? WEATHER_ICON_PATHS.clearNight : WEATHER_ICON_PATHS.clearDay;
    case 'moon':
      return WEATHER_ICON_PATHS.clearNight;
    case 'cloud':
      if (lowered.includes('overcast')) {
        return WEATHER_ICON_PATHS.overcast;
      }

      if (lowered.includes('partly') || lowered.includes('few') || lowered.includes('scattered')) {
        return isDay === false
          ? WEATHER_ICON_PATHS.partlyCloudyNight
          : WEATHER_ICON_PATHS.partlyCloudyDay;
      }

      return WEATHER_ICON_PATHS.cloudy;
    case 'cloudFog':
    case 'mist':
      return WEATHER_ICON_PATHS.fog;
    case 'cloudRain':
      if (
        (typeof weatherCode === 'number' && [51, 53, 55].includes(weatherCode)) ||
        lowered.includes('drizzle')
      ) {
        return WEATHER_ICON_PATHS.drizzle;
      }

      return WEATHER_ICON_PATHS.rain;
    case 'cloudSnow':
      return WEATHER_ICON_PATHS.snow;
    case 'cloudBolt':
      return WEATHER_ICON_PATHS.thunderstorm;
    case 'cloudOff':
      return WEATHER_ICON_PATHS.notAvailable;
    case 'wind':
      return WEATHER_ICON_PATHS.wind;
    default:
      return WEATHER_ICON_PATHS.notAvailable;
  }
}
interface WeatherSettingLike {
  city: string;
  provider: string;
  apiKey: string | null;
  enabled: boolean;
  updatedAt: Date;
  id: string;
}

interface OpenMeteoGeocodingResponse {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
  }>;
}

interface OpenMeteoForecastResponse {
  current_weather?: {
    temperature?: number;
    weathercode?: number;
    is_day?: number;
    time?: string;
  };
}

interface OpenWeatherResponse {
  weather?: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main?: {
    temp?: number;
  };
  dt?: number;
}

interface WeatherApiResponse {
  location?: {
    name?: string;
  };
  current?: {
    temp_c?: number;
    last_updated_epoch?: number;
    is_day?: number;
    condition?: {
      text?: string;
      code?: number;
    };
  };
}

function trimText(value: string | null | undefined): string {
  return value?.trim() ?? '';
}

function toFiniteNumber(value: unknown): number | null {
  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function toWeatherIconKey(
  conditionText: string,
  weatherCode: number | null,
  isDay: boolean | null
): DisplayBoardWeatherIconKey {
  const lowered = conditionText.toLowerCase();

  if (typeof weatherCode === 'number') {
    if (weatherCode === 0) {
      return isDay === false ? 'moon' : 'sunHigh';
    }

    if ([1, 2, 3].includes(weatherCode)) {
      return 'cloud';
    }

    if ([45, 48].includes(weatherCode)) {
      return 'cloudFog';
    }

    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
      return 'cloudRain';
    }

    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(weatherCode)) {
      return 'cloudSnow';
    }

    if ([95, 96, 99].includes(weatherCode)) {
      return 'cloudBolt';
    }
  }

  if (lowered.includes('thunder') || lowered.includes('storm')) {
    return 'cloudBolt';
  }

  if (
    lowered.includes('snow') ||
    lowered.includes('sleet') ||
    lowered.includes('ice') ||
    lowered.includes('hail')
  ) {
    return 'cloudSnow';
  }

  if (
    lowered.includes('rain') ||
    lowered.includes('drizzle') ||
    lowered.includes('shower') ||
    lowered.includes('precip')
  ) {
    return 'cloudRain';
  }

  if (
    lowered.includes('fog') ||
    lowered.includes('mist') ||
    lowered.includes('haze') ||
    lowered.includes('smoke')
  ) {
    return lowered.includes('mist') ? 'mist' : 'cloudFog';
  }

  if (lowered.includes('wind') || lowered.includes('breezy')) {
    return 'wind';
  }

  if (lowered.includes('cloud') || lowered.includes('overcast') || lowered.includes('partly')) {
    return 'cloud';
  }

  if (lowered.includes('clear') || lowered.includes('sunny') || lowered.includes('bright')) {
    return isDay === false ? 'moon' : 'sunHigh';
  }

  return isDay === false ? 'moon' : 'sunHigh';
}

function normalizeConditionText(conditionText: string, weatherCode: number | null): string {
  const trimmed = conditionText.trim();

  if (trimmed) {
    return trimmed;
  }

  if (typeof weatherCode !== 'number') {
    return 'Clear';
  }

  if (weatherCode === 0) {
    return 'Clear';
  }

  if ([1, 2, 3].includes(weatherCode)) {
    return 'Partly cloudy';
  }

  if ([45, 48].includes(weatherCode)) {
    return 'Fog';
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    return 'Rain';
  }

  if ([56, 57, 66, 67].includes(weatherCode)) {
    return 'Freezing rain';
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return 'Snow';
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return 'Thunderstorm';
  }

  return 'Clear';
}

function createUnavailableWeather(
  weatherSetting: WeatherSettingLike,
  status: 'unavailable'
): DisplayBoardWeatherData {
  const iconKey: DisplayBoardWeatherIconKey = 'cloudOff';
  return {
    id: weatherSetting.id,
    city: weatherSetting.city.trim(),
    provider: weatherSetting.provider as DisplayBoardWeatherData['provider'],
    enabled: weatherSetting.enabled,
    temperatureC: null,
    condition: null,
    weatherCode: null,
    iconKey,
    iconPath: getWeatherIconPath(iconKey, 'unavailable', null, null),
    updatedAt: new Date(),
    status
  };
}

async function fetchJson<T>(url: string, timeoutMs = 5000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        accept: 'application/json'
      },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Weather request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchOpenMeteoWeather(
  weatherSetting: WeatherSettingLike
): Promise<DisplayBoardWeatherData | null> {
  const city = trimText(weatherSetting.city);

  if (!city) {
    return null;
  }

  const geocoding = await fetchJson<OpenMeteoGeocodingResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en`
  );

  const location = geocoding.results?.[0];

  if (!location) {
    return createUnavailableWeather(weatherSetting, 'unavailable');
  }

  const forecast = await fetchJson<OpenMeteoForecastResponse>(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&temperature_unit=celsius&timezone=auto`
  );

  const current = forecast.current_weather;

  if (!current) {
    return createUnavailableWeather(weatherSetting, 'unavailable');
  }

  const condition = normalizeConditionText('', current.weathercode ?? null);
  const weatherCode = toFiniteNumber(current.weathercode);
  const iconKey = toWeatherIconKey(condition, weatherCode, current.is_day === 1);

  return {
    id: weatherSetting.id,
    city: city,
    provider: weatherSetting.provider as DisplayBoardWeatherData['provider'],
    enabled: weatherSetting.enabled,
    temperatureC: toFiniteNumber(current.temperature),
    condition,
    weatherCode,
    iconKey,
    iconPath: getWeatherIconPath(iconKey, condition, current.is_day === 1, weatherCode),
    updatedAt: new Date(),
    status: 'ready'
  };
}

async function fetchOpenWeatherWeather(
  weatherSetting: WeatherSettingLike
): Promise<DisplayBoardWeatherData | null> {
  const city = trimText(weatherSetting.city);

  if (!city) {
    return null;
  }

  if (!trimText(weatherSetting.apiKey)) {
    return createUnavailableWeather(weatherSetting, 'unavailable');
  }

  const response = await fetchJson<OpenWeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${encodeURIComponent(
      weatherSetting.apiKey ?? ''
    )}&lang=en`
  );

  const weather = response.weather?.[0];
  const temperatureC = toFiniteNumber(response.main?.temp ?? null);
  const weatherCode = toFiniteNumber(weather?.id ?? null);
  const condition = normalizeConditionText(
    weather?.main ?? weather?.description ?? '',
    weatherCode
  );
  const isDay = typeof weather?.icon === 'string' ? !weather.icon.endsWith('n') : null;
  const iconKey = toWeatherIconKey(condition, weatherCode, isDay);

  return {
    id: weatherSetting.id,
    city,
    provider: weatherSetting.provider as DisplayBoardWeatherData['provider'],
    enabled: weatherSetting.enabled,
    temperatureC,
    condition,
    weatherCode,
    iconKey,
    iconPath: getWeatherIconPath(iconKey, condition, isDay, weatherCode),
    updatedAt: new Date(),
    status: 'ready'
  };
}

async function fetchWeatherApiWeather(
  weatherSetting: WeatherSettingLike
): Promise<DisplayBoardWeatherData | null> {
  const city = trimText(weatherSetting.city);

  if (!city) {
    return null;
  }

  if (!trimText(weatherSetting.apiKey)) {
    return createUnavailableWeather(weatherSetting, 'unavailable');
  }

  const response = await fetchJson<WeatherApiResponse>(
    `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(
      weatherSetting.apiKey ?? ''
    )}&q=${encodeURIComponent(city)}&aqi=no`
  );

  const current = response.current;
  const conditionText = trimText(current?.condition?.text);
  const weatherCode = toFiniteNumber(current?.condition?.code ?? null);
  const temperatureC = toFiniteNumber(current?.temp_c ?? null);
  const isDay = current?.is_day === 1;
  const condition = normalizeConditionText(conditionText, weatherCode);
  const iconKey = toWeatherIconKey(condition, weatherCode, isDay);

  return {
    id: weatherSetting.id,
    city: trimText(response.location?.name) || city,
    provider: weatherSetting.provider as DisplayBoardWeatherData['provider'],
    enabled: weatherSetting.enabled,
    temperatureC,
    condition,
    weatherCode,
    iconKey,
    iconPath: getWeatherIconPath(iconKey, condition, isDay, weatherCode),
    updatedAt: new Date(),
    status: 'ready'
  };
}

export async function getDisplayBoardWeatherData(
  weatherSetting: WeatherSettingLike | null
): Promise<DisplayBoardWeatherData | null> {
  if (!weatherSetting?.enabled) {
    return null;
  }

  const city = trimText(weatherSetting.city);

  if (!city) {
    return null;
  }

  try {
    switch (weatherSetting.provider) {
      case 'openmeteo':
        return await fetchOpenMeteoWeather(weatherSetting);
      case 'openweather':
        return await fetchOpenWeatherWeather(weatherSetting);
      case 'weatherapi':
        return await fetchWeatherApiWeather(weatherSetting);
      default:
        return createUnavailableWeather(weatherSetting, 'unavailable');
    }
  } catch {
    return createUnavailableWeather(weatherSetting, 'unavailable');
  }
}
