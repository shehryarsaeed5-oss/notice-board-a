export const MOVIE_SCHEDULE_SYNC_SETTING_ID = 'movie-schedule-sync-singleton';
export const DEFAULT_MOVIE_SCHEDULE_SYNC_API_URL = 'http://localhost:3001/api/share/movie-schedule';

export const MOVIE_SCHEDULE_SYNC_SOURCE_TYPE_VALUES = ['digital_signage_api'] as const;
export type MovieScheduleSyncSourceType = (typeof MOVIE_SCHEDULE_SYNC_SOURCE_TYPE_VALUES)[number];

export const MOVIE_SCHEDULE_SYNC_SOURCE_TYPE_OPTIONS: Array<{
  value: MovieScheduleSyncSourceType;
  label: string;
}> = [
  {
    value: 'digital_signage_api',
    label: 'Digital Signage API'
  }
];
