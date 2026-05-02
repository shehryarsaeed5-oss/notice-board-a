import type { SystemSettingsFormValues } from '../schemas/system-settings';
import type { SystemSettingsResult } from './types';

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? 'System settings request failed');
  }

  return (await response.json()) as T;
}

export async function saveSystemSettings(
  values: SystemSettingsFormValues
): Promise<SystemSettingsResult> {
  const response = await fetch('/api/system-settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });

  const data = await parseResponse<{ systemSettings: SystemSettingsResult }>(response);
  return data.systemSettings;
}
