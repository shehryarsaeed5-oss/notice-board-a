export const MANAGER_RECORD_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type ManagerRecordStatus = (typeof MANAGER_RECORD_STATUSES)[number];

export interface ManagerRecord {
  id: string;
  name: string;
  designation: string | null;
  phone: string | null;
  status: ManagerRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ManagerFormValues {
  name: string;
  designation?: string;
  phone?: string;
  status: ManagerRecordStatus;
}

export interface ManagerListFilters {
  search?: string;
  status?: ManagerRecordStatus;
}

export interface ManagerListResult {
  managers: ManagerRecord[];
  total: number;
}
