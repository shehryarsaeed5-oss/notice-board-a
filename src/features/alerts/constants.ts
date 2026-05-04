import type { AlertStatus, AlertType } from './api/types';

export const ALERT_TYPE_VALUES = ['INFO', 'WARNING', 'URGENT', 'SUCCESS'] as const;
export const ALERT_STATUS_VALUES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export const ALERT_TYPE_OPTIONS: Array<{ value: AlertType; label: string }> = [
  { value: 'INFO', label: 'Info' },
  { value: 'WARNING', label: 'Warning' },
  { value: 'URGENT', label: 'Urgent' },
  { value: 'SUCCESS', label: 'Success' }
];

export const ALERT_STATUS_OPTIONS: Array<{ value: AlertStatus; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'ARCHIVED', label: 'Archived' }
];

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  INFO: 'Info',
  WARNING: 'Warning',
  URGENT: 'Urgent',
  SUCCESS: 'Success'
};
