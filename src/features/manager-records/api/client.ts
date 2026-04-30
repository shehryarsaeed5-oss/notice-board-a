import type { ManagerFormValues, ManagerRecord } from './types';

interface ManagerRecordResponse {
  manager: ManagerRecord;
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

export function createManager(values: ManagerFormValues) {
  return requestJson<ManagerRecordResponse>('/api/manager-records', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateManager(id: string, values: ManagerFormValues) {
  return requestJson<ManagerRecordResponse>(`/api/manager-records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveManager(id: string) {
  return requestJson<ManagerRecordResponse>(`/api/manager-records/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
