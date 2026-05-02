import type { ItemSalesTargetFormValues, ItemSalesTargetRecord } from './types';

interface ItemSalesTargetResponse {
  itemSalesTarget: ItemSalesTargetRecord;
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

export function createItemSalesTarget(values: ItemSalesTargetFormValues) {
  return requestJson<ItemSalesTargetResponse>('/api/item-sales-target', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateItemSalesTarget(id: string, values: ItemSalesTargetFormValues) {
  return requestJson<ItemSalesTargetResponse>(`/api/item-sales-target/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveItemSalesTarget(id: string) {
  return requestJson<ItemSalesTargetResponse>(`/api/item-sales-target/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
