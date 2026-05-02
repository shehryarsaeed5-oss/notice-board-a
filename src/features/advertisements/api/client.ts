import type { AdvertisementFormValues, AdvertisementRecord } from './types';

interface AdvertisementResponse {
  advertisement: AdvertisementRecord;
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

export function createAdvertisement(values: AdvertisementFormValues) {
  return requestJson<AdvertisementResponse>('/api/advertisements', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateAdvertisement(id: string, values: AdvertisementFormValues) {
  return requestJson<AdvertisementResponse>(`/api/advertisements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveAdvertisement(id: string) {
  return requestJson<AdvertisementResponse>(`/api/advertisements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
