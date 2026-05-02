import type { UserFormValues, UserPasswordResetValues, UserRecord, UsersListResult } from './types';

interface UserResponse {
  user: UserRecord;
}

interface UsersResponse {
  users: UsersListResult['users'];
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

export function getUsers(searchParams: Record<string, string | undefined>) {
  const params = new URLSearchParams();

  if (searchParams.search) {
    params.set('search', searchParams.search);
  }

  if (searchParams.status) {
    params.set('status', searchParams.status);
  }

  return requestJson<UsersResponse>(
    `/api/users${params.toString() ? `?${params.toString()}` : ''}`,
    {
      method: 'GET'
    }
  );
}

export function createUser(values: UserFormValues) {
  return requestJson<UserResponse>('/api/users', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

export function updateUser(id: string, values: UserFormValues) {
  return requestJson<UserResponse>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });
}

export function archiveUser(id: string) {
  return requestJson<UserResponse>(`/api/users/${id}`, {
    method: 'DELETE'
  });
}

export function resetUserPassword(id: string, values: UserPasswordResetValues) {
  return requestJson<UserResponse>(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}
