export const MEETING_SCHEDULE_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type MeetingScheduleStatus = (typeof MEETING_SCHEDULE_STATUSES)[number];

export interface MeetingScheduleRecord {
  id: string;
  title: string;
  location: string | null;
  organizer: string | null;
  startAt: Date;
  endAt: Date | null;
  status: MeetingScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingScheduleFormValues {
  title: string;
  location?: string;
  organizer?: string;
  startAt: string;
  endAt?: string;
  status: MeetingScheduleStatus;
}

export interface MeetingScheduleListFilters {
  search?: string;
  status?: MeetingScheduleStatus;
}

export interface MeetingScheduleListResult {
  meetings: MeetingScheduleRecord[];
  total: number;
}
