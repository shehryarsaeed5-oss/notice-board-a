import * as z from 'zod';

import { isValidDateTimeInputValue } from '@/lib/date-time';
import { MOVIE_SCHEDULE_STATUSES } from '../api/types';

export const movieScheduleSchema = z.object({
  movieName: z.string().trim().min(2, 'Movie name is required'),
  screenName: z.string().trim().min(2, 'Screen name is required'),
  showTime: z
    .string()
    .trim()
    .min(1, 'Show time is required')
    .refine(isValidDateTimeInputValue, 'Enter a valid date and time'),
  status: z.enum(MOVIE_SCHEDULE_STATUSES)
});

export type MovieScheduleFormSchemaValues = z.infer<typeof movieScheduleSchema>;
