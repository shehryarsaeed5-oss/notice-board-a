import type {
  MovieScheduleSyncOverview,
  MovieScheduleSyncRunValues,
  MovieScheduleSyncSettingValues
} from './types';

interface MovieScheduleSyncResponse {
  overview: MovieScheduleSyncOverview;
}

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

export function getMovieScheduleSyncOverview(date?: string) {
  const searchParams = new URLSearchParams();

  if (date) {
    searchParams.set('date', date);
  }

  const query = searchParams.toString();

  return requestJson<MovieScheduleSyncResponse>(
    `/api/movie-schedule-sync${query ? `?${query}` : ''}`
  );
}

export function updateMovieScheduleSyncSetting(values: MovieScheduleSyncSettingValues) {
  return requestJson<MovieScheduleSyncResponse>('/api/movie-schedule-sync', {
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}

export function runMovieScheduleSync(values: MovieScheduleSyncRunValues) {
  return requestJson<MovieScheduleSyncResponse>('/api/movie-schedule-sync', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function clearMovieScheduleSyncedRows() {
  return requestJson<MovieScheduleSyncResponse>('/api/movie-schedule-sync', {
    method: 'DELETE'
  });
}
