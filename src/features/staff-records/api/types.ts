export const STAFF_RECORD_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type StaffRecordStatus = (typeof STAFF_RECORD_STATUSES)[number];

export interface StaffMemberRecord {
  id: string;
  name: string;
  designation: string;
  department: string | null;
  phone: string | null;
  status: StaffRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffMemberFormValues {
  name: string;
  designation: string;
  department?: string;
  phone?: string;
  status: StaffRecordStatus;
}

export interface StaffMemberListFilters {
  search?: string;
  status?: StaffRecordStatus;
}

export interface StaffMemberListResult {
  staffMembers: StaffMemberRecord[];
  total: number;
}
