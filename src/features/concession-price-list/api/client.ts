import type { ConcessionPriceItemFormValues, ConcessionPriceItemRecord } from './types';

interface ConcessionPriceItemResponse {
  concessionPriceItem: ConcessionPriceItemRecord;
}

interface ConcessionPriceItemsResponse {
  concessionPriceItems: ConcessionPriceItemRecord[];
  categories: string[];
  total: number;
}

async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {})
    }
  });

  const data = (await response.json().catch(() => null)) as { message?: string } | null;

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  return data as T;
}

export function getConcessionPriceItems(searchParams: Record<string, string | undefined>) {
  const params = new URLSearchParams();

  if (searchParams.search) {
    params.set('search', searchParams.search);
  }

  if (searchParams.status) {
    params.set('status', searchParams.status);
  }

  if (searchParams.category) {
    params.set('category', searchParams.category);
  }

  return requestJson<ConcessionPriceItemsResponse>(
    `/api/concession-price-list${params.toString() ? `?${params.toString()}` : ''}`,
    {
      method: 'GET'
    }
  );
}

export function createConcessionPriceItem(values: ConcessionPriceItemFormValues) {
  return requestJson<ConcessionPriceItemResponse>('/api/concession-price-list', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateConcessionPriceItem(id: string, values: ConcessionPriceItemFormValues) {
  return requestJson<ConcessionPriceItemResponse>(`/api/concession-price-list/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveConcessionPriceItem(id: string) {
  return requestJson<ConcessionPriceItemResponse>(`/api/concession-price-list/${id}`, {
    method: 'PATCH'
  });
}
