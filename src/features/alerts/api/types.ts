export const ALERT_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;
export const ALERT_TYPES = ['INFO', 'WARNING', 'URGENT', 'SUCCESS'] as const;

export type AlertStatus = (typeof ALERT_STATUSES)[number];
export type AlertType = (typeof ALERT_TYPES)[number];

export interface AlertRecord {
  id: string;
  title: string;
  message: string | null;
  alertType: AlertType;
  priority: number;
  startAt: Date;
  endAt: Date;
  status: AlertStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlertFormValues {
  title: string;
  message?: string;
  alertType: AlertType;
  priority?: number | string | null;
  startAt: string;
  endAt: string;
  status: AlertStatus;
}

export interface AlertListFilters {
  search?: string;
  status?: AlertStatus;
  alertType?: AlertType;
}

export interface AlertListResult {
  alerts: AlertRecord[];
  total: number;
}
