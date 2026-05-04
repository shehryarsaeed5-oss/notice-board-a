import * as z from 'zod';

import {
  DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL,
  MOVIE_SCHEDULE_SYNC_SOURCE_TYPE_VALUES
} from '../constants';

const optionalText = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return value;
}, z.string().trim().optional());

export const movieScheduleSyncSettingSchema = z.object({
  enabled: z.boolean(),
  sourceType: z.enum(MOVIE_SCHEDULE_SYNC_SOURCE_TYPE_VALUES),
  apiUrl: optionalText.default(DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL),
  apiToken: optionalText
});

export const movieScheduleSyncRunSchema = z.object({
  showDate: z.string().trim().min(1, 'Show date is required')
});

export type MovieScheduleSyncSettingFormValues = z.infer<typeof movieScheduleSyncSettingSchema>;
export type MovieScheduleSyncRunFormValues = z.infer<typeof movieScheduleSyncRunSchema>;
