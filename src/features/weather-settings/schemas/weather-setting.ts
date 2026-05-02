import * as z from 'zod';

import { WEATHER_PROVIDERS } from '../api/types';

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

export const weatherSettingSchema = z.object({
  city: z.string().trim().min(2, 'City is required'),
  provider: z.enum(WEATHER_PROVIDERS),
  apiKey: optionalText,
  enabled: z.boolean()
});

export type WeatherSettingFormSchemaValues = z.infer<typeof weatherSettingSchema>;
