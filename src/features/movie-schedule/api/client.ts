import type { MovieScheduleFormValues, MovieScheduleRecord } from './types';

interface MovieScheduleResponse {
  movieSchedule: MovieScheduleRecord;
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

export function createMovieSchedule(values: MovieScheduleFormValues) {
  return requestJson<MovieScheduleResponse>('/api/movie-schedule', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateMovieSchedule(id: string, values: MovieScheduleFormValues) {
  return requestJson<MovieScheduleResponse>(`/api/movie-schedule/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveMovieSchedule(id: string) {
  return requestJson<MovieScheduleResponse>(`/api/movie-schedule/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'ARCHIVED' })
  });
}
