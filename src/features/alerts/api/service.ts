import 'server-only';

import { prisma } from '@/lib/prisma';
import { parseDateTimeInputValue } from '@/lib/date-time';
import { bumpDisplayBoardRefreshToken } from '@/features/display-board/api/cache';

import {
  ALERT_TYPES,
  type AlertFormValues,
  type AlertListFilters,
  type AlertListResult,
  type AlertRecord,
  type AlertStatus,
  type AlertType
} from './types';

export class AlertsServiceError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'AlertsServiceError';
    this.status = status;
  }
}

export class AlertNotFoundError extends AlertsServiceError {
  constructor() {
    super('Alert not found.', 404);
    this.name = 'AlertNotFoundError';
  }
}

const ALERT_SELECT = {
  id: true,
  title: true,
  message: true,
  alertType: true,
  priority: true,
  startAt: true,
  endAt: true,
  status: true,
  createdAt: true,
  updatedAt: true
} as const;

function normalizeSearchTerm(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeStatus(value?: string): AlertStatus | undefined {
  if (value === 'ACTIVE' || value === 'INACTIVE' || value === 'ARCHIVED') {
    return value;
  }

  return undefined;
}

function normalizeAlertType(value?: string): AlertType | undefined {
  if (value && ALERT_TYPES.includes(value as AlertType)) {
    return value as AlertType;
  }

  return undefined;
}

function normalizeRequiredText(value: string): string {
  return value.trim();
}

function normalizeOptionalText(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizePriority(value?: number | string | null): number {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, Math.trunc(parsed));
}

function normalizeRequiredDateTime(value: string): Date {
  return parseDateTimeInputValue(value.trim());
}

function buildWhere(filters: AlertListFilters) {
  const search = normalizeSearchTerm(filters.search);
  const status = normalizeStatus(filters.status);
  const alertType = normalizeAlertType(filters.alertType);

  return {
    ...(status ? { status } : {}),
    ...(alertType ? { alertType } : {}),
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as const
              }
            },
            {
              message: {
                contains: search,
                mode: 'insensitive' as const
              }
            }
          ]
        }
      : {})
  };
}

function mapAlertRecord(record: {
  id: string;
  title: string;
  message: string | null;
  alertType: string;
  priority: number;
  startAt: Date;
  endAt: Date;
  status: AlertStatus;
  createdAt: Date;
  updatedAt: Date;
}): AlertRecord {
  return {
    id: record.id,
    title: record.title,
    message: record.message,
    alertType: (ALERT_TYPES.includes(record.alertType as AlertType)
      ? record.alertType
      : 'INFO') as AlertType,
    priority: record.priority,
    startAt: record.startAt,
    endAt: record.endAt,
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

async function assertAlertExists(id: string): Promise<AlertRecord> {
  const alert = await prisma.alert.findUnique({
    where: { id },
    select: ALERT_SELECT
  });

  if (!alert) {
    throw new AlertNotFoundError();
  }

  return mapAlertRecord(alert);
}

export async function getAlerts(filters: AlertListFilters = {}): Promise<AlertListResult> {
  const alerts = await prisma.alert.findMany({
    where: buildWhere(filters),
    orderBy: [{ priority: 'desc' }, { startAt: 'asc' }, { createdAt: 'desc' }],
    select: ALERT_SELECT
  });

  return {
    alerts: alerts.map(mapAlertRecord),
    total: alerts.length
  };
}

export async function getActiveAlerts(
  now = new Date(),
  limit = 3
): Promise<{ alerts: AlertRecord[]; total: number }> {
  const where = {
    status: 'ACTIVE' as const,
    startAt: {
      lte: now
    },
    endAt: {
      gte: now
    }
  };

  const [alerts, total] = await Promise.all([
    prisma.alert.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { startAt: 'asc' }, { createdAt: 'desc' }],
      select: ALERT_SELECT,
      take: limit
    }),
    prisma.alert.count({
      where
    })
  ]);

  return {
    alerts: alerts.map(mapAlertRecord),
    total
  };
}

export async function createAlert(values: AlertFormValues): Promise<AlertRecord> {
  const alert = await prisma.alert.create({
    data: {
      title: normalizeRequiredText(values.title),
      message: normalizeOptionalText(values.message),
      alertType: normalizeAlertType(values.alertType) ?? 'INFO',
      priority: normalizePriority(values.priority),
      startAt: normalizeRequiredDateTime(values.startAt),
      endAt: normalizeRequiredDateTime(values.endAt),
      status: values.status
    },
    select: ALERT_SELECT
  });

  await bumpDisplayBoardRefreshToken();

  return mapAlertRecord(alert);
}

export async function updateAlert(id: string, values: AlertFormValues): Promise<AlertRecord> {
  await assertAlertExists(id);

  const alert = await prisma.alert.update({
    where: { id },
    data: {
      title: normalizeRequiredText(values.title),
      message: normalizeOptionalText(values.message),
      alertType: normalizeAlertType(values.alertType) ?? 'INFO',
      priority: normalizePriority(values.priority),
      startAt: normalizeRequiredDateTime(values.startAt),
      endAt: normalizeRequiredDateTime(values.endAt),
      status: values.status
    },
    select: ALERT_SELECT
  });

  await bumpDisplayBoardRefreshToken();

  return mapAlertRecord(alert);
}

export async function archiveAlert(id: string): Promise<AlertRecord> {
  await assertAlertExists(id);

  const alert = await prisma.alert.update({
    where: { id },
    data: {
      status: 'ARCHIVED'
    },
    select: ALERT_SELECT
  });

  await bumpDisplayBoardRefreshToken();

  return mapAlertRecord(alert);
}
