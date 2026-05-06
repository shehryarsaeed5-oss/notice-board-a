import type { StaffImportResult, StaffMemberFormValues, StaffMemberRecord } from './types';

interface StaffRecordResponse {
  staffMember: StaffMemberRecord;
}

interface StaffImportRequest {
  csvText: string;
}

async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {})
    }
  });

  const data = (await response.json().catch(() => null)) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  return data as T;
}

export function createStaffMember(values: StaffMemberFormValues) {
  return requestJson<StaffRecordResponse>('/api/staff-records', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateStaffMember(id: string, values: StaffMemberFormValues) {
  return requestJson<StaffRecordResponse>(`/api/staff-records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveStaffMember(id: string) {
  return requestJson<StaffRecordResponse>(`/api/staff-records/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}

export function deleteStaffMember(id: string) {
  return requestJson<StaffRecordResponse>(`/api/staff-records/${id}`, {
    method: 'DELETE'
  });
}

export function importStaffMembersCsv(values: StaffImportRequest) {
  return requestJson<StaffImportResult>('/api/staff-records/import', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}
