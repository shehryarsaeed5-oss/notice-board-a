import type { DisplayLayoutConfig } from '../lib/display-layout-config';

export const DISPLAY_PAGE_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type DisplayPageStatus = (typeof DISPLAY_PAGE_STATUSES)[number];

export interface DisplayPageRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  resolutionWidth: number;
  resolutionHeight: number;
  layoutConfig: DisplayLayoutConfig;
  status: DisplayPageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DisplayPageFormValues {
  name: string;
  slug: string;
  description?: string;
  resolutionWidth: number;
  resolutionHeight: number;
  layoutConfig: DisplayLayoutConfig;
  status: DisplayPageStatus;
}

export interface DisplayPageListFilters {
  search?: string;
  status?: DisplayPageStatus;
}

export interface DisplayPageListResult {
  displayPages: DisplayPageRecord[];
  total: number;
}
