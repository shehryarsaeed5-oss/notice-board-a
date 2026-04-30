import type { AttendancePageData, AttendanceSavePayload, AttendanceType } from './types';

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  const data = (await response.json().catch(() => null)) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  return data as T;
}

export function fetchAttendancePageData(date: string) {
  return requestJson<AttendancePageData>(`/api/attendance?date=${encodeURIComponent(date)}`);
}

export function saveAttendance(payload: AttendanceSavePayload) {
  return requestJson<{ saved: number; type: AttendanceType }>(`/api/attendance`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
