export const MOVIE_SCHEDULE_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type MovieScheduleStatus = (typeof MOVIE_SCHEDULE_STATUSES)[number];

export interface MovieScheduleRecord {
  id: string;
  movieName: string;
  screenName: string;
  showTime: Date;
  status: MovieScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieScheduleFormValues {
  movieName: string;
  screenName: string;
  showTime: string;
  status: MovieScheduleStatus;
}

export interface MovieScheduleListFilters {
  search?: string;
  status?: MovieScheduleStatus;
  showDate?: string;
}

export interface MovieScheduleListResult {
  movieSchedules: MovieScheduleRecord[];
  total: number;
}
