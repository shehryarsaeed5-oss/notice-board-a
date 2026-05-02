export const DISPLAY_PAGE_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type DisplayPageStatus = (typeof DISPLAY_PAGE_STATUSES)[number];

export interface DisplayPageRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: DisplayPageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DisplayPageFormValues {
  name: string;
  slug: string;
  description?: string;
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
