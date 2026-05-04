import type { EventScreenValue, EventTitleValue } from '../constants';

export const EVENT_RECORD_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type EventRecordStatus = (typeof EVENT_RECORD_STATUSES)[number];

export interface EventRecordItem {
  id: string;
  title: string;
  clientName: string | null;
  companyName: string | null;
  screenName: string | null;
  startAt: Date;
  endAt: Date | null;
  status: EventRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRecordFormValues {
  title: EventTitleValue;
  clientName?: string;
  companyName?: string;
  screenName: EventScreenValue;
  startAt: string;
  endAt?: string;
  status: EventRecordStatus;
}

export interface EventRecordListFilters {
  search?: string;
  status?: EventRecordStatus;
}

export interface EventRecordListResult {
  events: EventRecordItem[];
  total: number;
}
