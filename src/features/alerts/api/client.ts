import type { AlertFormValues, AlertRecord } from './types';

interface AlertResponse {
  alert: AlertRecord;
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

export function createAlert(values: AlertFormValues) {
  return requestJson<AlertResponse>('/api/alerts', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateAlert(id: string, values: AlertFormValues) {
  return requestJson<AlertResponse>(`/api/alerts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveAlert(id: string) {
  return requestJson<AlertResponse>(`/api/alerts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
