import type {
  ItemSalesImportOverview,
  ItemSalesImportRunSummary,
  ItemSalesImportMonitor
} from './types';
import type {
  ItemSalesImportRangeFormValues,
  ItemSalesImportSettingsFormValues
} from '../schemas/item-sales-import';

async function requestJson<T>(url: string, init: RequestInit = {}): Promise<T> {
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

export function getItemSalesImportOverview(date?: string) {
  const search = date ? `?date=${encodeURIComponent(date)}` : '';
  return requestJson<ItemSalesImportOverview>(`/api/item-sales/import${search}`);
}

export function getItemSalesImportSettings() {
  return requestJson<{ monitor: ItemSalesImportMonitor }>('/api/item-sales/settings');
}

export function saveItemSalesImportSettings(values: ItemSalesImportSettingsFormValues) {
  return requestJson<{ monitor: ItemSalesImportMonitor }>('/api/item-sales/settings', {
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}

export function runItemSalesImportToday() {
  return requestJson<{ result: ItemSalesImportRunSummary }>('/api/item-sales/import/today', {
    method: 'POST'
  });
}

export function runItemSalesImportRange(values: ItemSalesImportRangeFormValues) {
  return requestJson<{
    result: {
      results: ItemSalesImportRunSummary[];
      errors: Array<{ businessDateKey: string; message: string }>;
    };
  }>('/api/item-sales/import/range', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}
