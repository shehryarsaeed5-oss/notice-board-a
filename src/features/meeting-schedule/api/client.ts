import type { MeetingScheduleFormValues, MeetingScheduleRecord } from './types';

interface MeetingScheduleResponse {
  meeting: MeetingScheduleRecord;
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

export function createMeetingSchedule(values: MeetingScheduleFormValues) {
  return requestJson<MeetingScheduleResponse>('/api/meeting-schedule', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateMeetingSchedule(id: string, values: MeetingScheduleFormValues) {
  return requestJson<MeetingScheduleResponse>(`/api/meeting-schedule/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveMeetingSchedule(id: string) {
  return requestJson<MeetingScheduleResponse>(`/api/meeting-schedule/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
