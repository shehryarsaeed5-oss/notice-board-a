import type { DisplayPageFormValues, DisplayPageRecord } from './types';

interface DisplayPageResponse {
  displayPage: DisplayPageRecord;
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

export function createDisplayPage(values: DisplayPageFormValues) {
  return requestJson<DisplayPageResponse>('/api/display-pages', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateDisplayPage(id: string, values: DisplayPageFormValues) {
  return requestJson<DisplayPageResponse>(`/api/display-pages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveDisplayPage(id: string) {
  return requestJson<DisplayPageResponse>(`/api/display-pages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
