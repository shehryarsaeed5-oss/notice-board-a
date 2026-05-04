export const ATTENDANCE_STATUSES = ['PRESENT', 'ABSENT', 'LEAVE', 'LATE'] as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];
export type AttendanceType = 'staff' | 'manager';

export interface AttendanceRowInput {
  personId: string;
  shift?: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface AttendanceSavePayload {
  type: AttendanceType;
  date: string;
  rows: AttendanceRowInput[];
}

export interface AttendancePersonRow {
  id: string;
  name: string;
  designation: string;
  department?: string | null;
  sortOrder: number;
  shift: string;
  status: AttendanceStatus;
  remarks: string;
}

export interface AttendanceManagerRow {
  id: string;
  name: string;
  designation: string | null;
  sortOrder: number;
  shift: string;
  status: AttendanceStatus;
  remarks: string;
}

export interface AttendancePageData {
  date: string;
  staff: AttendancePersonRow[];
  managers: AttendanceManagerRow[];
}
