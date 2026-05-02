import type { EventRecordFormValues, EventRecordItem } from './types';

interface EventRecordResponse {
  event: EventRecordItem;
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

export function createEventRecord(values: EventRecordFormValues) {
  return requestJson<EventRecordResponse>('/api/events', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateEventRecord(id: string, values: EventRecordFormValues) {
  return requestJson<EventRecordResponse>(`/api/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveEventRecord(id: string) {
  return requestJson<EventRecordResponse>(`/api/events/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
