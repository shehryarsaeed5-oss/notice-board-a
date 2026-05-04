import 'server-only';

import { format, subDays } from 'date-fns';

import type { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { getSystemSettings } from '@/features/system-settings/api/service';

import { createBusinessDateContext, enumerateBusinessDateKeys } from '../../lib/business-date';
import { normalizeItemNameKey, normalizeText, parseItemCodeList } from '../../lib/item-codes';
import type { ItemSalesTargetRecord } from '../../api/types';
import { resolveStoredSalesRowBreakdown } from './row-metrics';
import type {
  ItemSalesTargetDailyHistoryOverview,
  ItemSalesTargetDailyHistoryRow,
  ItemSalesTargetDailyHistorySummary
} from '../api/types';

type ItemSalesImportBatchWithRows = Prisma.ItemSalesImportBatchGetPayload<{
  include: { rows: true };
}>;

function formatDateKey(value: Date) {
  return format(value, 'yyyy-MM-dd');
}

function normalizeDateKeyInput(value?: string | null): string | null {
  const trimmed = normalizeText(value);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function toDateKey(value: Date | null | undefined) {
  return value ? formatDateKey(value) : null;
}

function roundQuantity(value: number): number {
  return Math.max(0, Math.round(value * 1000) / 1000);
}

function normalizeCodeSet(target: ItemSalesTargetRecord) {
  const codes = [...target.itemCodes, ...parseItemCodeList(target.itemCode)]
    .map((code) => normalizeText(code))
    .filter(Boolean);

  return new Set(codes.map((code) => code.toLowerCase()));
}

function matchesTargetRow(
  target: ItemSalesTargetRecord,
  row: ItemSalesImportBatchWithRows['rows'][number]
) {
  const codeSet = normalizeCodeSet(target);
  const rowCode = normalizeText(row.itemCode).toLowerCase();

  if (codeSet.size > 0) {
    return rowCode ? codeSet.has(rowCode) : false;
  }

  return normalizeItemNameKey(row.itemName) === normalizeItemNameKey(target.itemName);
}

function isTargetActiveOnDate(target: ItemSalesTargetRecord, dateKey: string) {
  const startDateKey = toDateKey(target.startDate);
  const endDateKey = toDateKey(target.endDate);

  if (startDateKey && dateKey < startDateKey) {
    return false;
  }

  if (endDateKey && dateKey > endDateKey) {
    return false;
  }

  return true;
}

function getDefaultFromDate(target: ItemSalesTargetRecord | null, toDateKey: string) {
  if (target?.startDate) {
    return formatDateKey(target.startDate);
  }

  const fallback = subDays(new Date(`${toDateKey}T00:00:00`), 6);
  return formatDateKey(fallback);
}

function buildLatestBatchMap(batches: ItemSalesImportBatchWithRows[]) {
  const latestByDate = new Map<string, ItemSalesImportBatchWithRows>();

  for (const batch of batches) {
    if (!latestByDate.has(batch.businessDateKey)) {
      latestByDate.set(batch.businessDateKey, batch);
    }
  }

  return latestByDate;
}

function getBatchStatus(batch: ItemSalesImportBatchWithRows | null) {
  if (!batch) {
    return 'MISSING' as const;
  }

  if (batch.status === 'COMPLETED' && batch.rowCount > 0) {
    return 'IMPORTED' as const;
  }

  return 'MISSING' as const;
}

function calculateDailyRow(
  target: ItemSalesTargetRecord,
  dateKey: string,
  batch: ItemSalesImportBatchWithRows | null
): ItemSalesTargetDailyHistoryRow {
  const targetActive = isTargetActiveOnDate(target, dateKey);
  const rowStatus =
    targetActive && target.dailyTarget !== null ? getBatchStatus(batch) : 'NO_TARGET';
  const matchingRows =
    batch && batch.status === 'COMPLETED' && batch.rowCount > 0
      ? batch.rows.filter((row) => matchesTargetRow(target, row))
      : [];
  const soldQty = matchingRows.reduce(
    (total, row) => total + resolveStoredSalesRowBreakdown(row).paidQty,
    0
  );
  const totalQty = matchingRows.reduce(
    (total, row) => total + resolveStoredSalesRowBreakdown(row).totalQty,
    0
  );
  const focQty = matchingRows.reduce(
    (total, row) => total + resolveStoredSalesRowBreakdown(row).focQty,
    0
  );
  const paidAmount = matchingRows.reduce(
    (total, row) => total + (resolveStoredSalesRowBreakdown(row).paidAmount ?? 0),
    0
  );
  const discountAmount = matchingRows.reduce(
    (total, row) => total + (resolveStoredSalesRowBreakdown(row).discountAmount ?? 0),
    0
  );
  const effectiveTarget = targetActive && target.dailyTarget !== null ? target.dailyTarget : null;
  const remainingQty =
    effectiveTarget === null ? null : roundQuantity(Math.max(0, effectiveTarget - soldQty));
  const percent =
    effectiveTarget === null || effectiveTarget <= 0
      ? null
      : Math.max(0, Math.min(100, Math.round((soldQty / effectiveTarget) * 100)));

  return {
    date: new Date(`${dateKey}T00:00:00`),
    businessDateKey: dateKey,
    targetName: target.itemName,
    itemCodes: target.itemCodes.length > 0 ? target.itemCodes : parseItemCodeList(target.itemCode),
    dailyTarget: effectiveTarget,
    totalQty: roundQuantity(totalQty),
    paidQty: roundQuantity(soldQty),
    focQty: roundQuantity(focQty),
    soldQty: roundQuantity(soldQty),
    remainingQty,
    percent,
    paidAmount: roundQuantity(paidAmount),
    discountAmount: roundQuantity(discountAmount),
    importStatus: rowStatus,
    batchStatus: batch?.status ?? null,
    sourceFilename: batch?.sourceFilename ?? null,
    lastImportedAt: batch?.importedAt ?? null
  };
}

function buildSummary(rows: ItemSalesTargetDailyHistoryRow[]): ItemSalesTargetDailyHistorySummary {
  const relevantRows = rows.filter((row) => row.importStatus !== 'NO_TARGET');
  const totalSold = roundQuantity(
    relevantRows.reduce((total, row) => total + (Number(row.soldQty) || 0), 0)
  );
  const totalDailyTarget = roundQuantity(
    relevantRows.reduce((total, row) => total + (Number(row.dailyTarget) || 0), 0)
  );
  const percentRows = relevantRows.filter((row) => row.percent !== null);
  const averagePercent =
    percentRows.length > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              percentRows.reduce((total, row) => total + (row.percent ?? 0), 0) / percentRows.length
            )
          )
        )
      : null;
  const bestDay =
    [...relevantRows]
      .filter((row) => row.percent !== null)
      .sort((left, right) => {
        const percentDelta = (right.percent ?? 0) - (left.percent ?? 0);
        if (percentDelta !== 0) {
          return percentDelta;
        }

        const soldDelta = right.soldQty - left.soldQty;
        if (soldDelta !== 0) {
          return soldDelta;
        }

        return left.businessDateKey.localeCompare(right.businessDateKey);
      })[0] ?? null;

  return {
    totalSold,
    totalDailyTarget,
    averagePercent,
    bestDay: bestDay
      ? {
          businessDateKey: bestDay.businessDateKey,
          date: bestDay.date,
          soldQty: bestDay.soldQty,
          percent: bestDay.percent
        }
      : null,
    missingImportDays: rows.filter((row) => row.importStatus === 'MISSING').length
  };
}

export async function getItemSalesTargetDailyHistoryOverview(
  values: {
    targetId?: string;
    fromDate?: string;
    toDate?: string;
  } = {}
): Promise<ItemSalesTargetDailyHistoryOverview> {
  const [targets, systemSettings] = await Promise.all([
    prisma.itemSalesTarget.findMany({
      orderBy: [{ displayOrder: 'asc' }, { itemName: 'asc' }]
    }),
    getSystemSettings()
  ]);

  const todayContext = createBusinessDateContext(
    new Date(),
    systemSettings.values.timezone,
    systemSettings.values.businessDayCutoffHour
  );

  const requestedTargetId = normalizeText(values.targetId) || null;
  const selectedTarget =
    targets.find((target) => target.id === requestedTargetId) ?? targets[0] ?? null;
  const toDate = normalizeDateKeyInput(values.toDate) ?? todayContext.businessDateKey;
  const fromDate =
    normalizeDateKeyInput(values.fromDate) ?? getDefaultFromDate(selectedTarget, toDate);
  const rangeStart = fromDate <= toDate ? fromDate : toDate;
  const rangeEnd = fromDate <= toDate ? toDate : fromDate;

  if (!selectedTarget) {
    return {
      targets,
      selectedTargetId: null,
      selectedTarget: null,
      fromDate: rangeStart,
      toDate: rangeEnd,
      rows: [],
      summary: {
        totalSold: 0,
        totalDailyTarget: 0,
        averagePercent: null,
        bestDay: null,
        missingImportDays: 0
      }
    };
  }

  const batches = await prisma.itemSalesImportBatch.findMany({
    where: {
      businessDateKey: {
        gte: rangeStart,
        lte: rangeEnd
      }
    },
    orderBy: [{ importedAt: 'desc' }, { createdAt: 'desc' }],
    include: {
      rows: true
    }
  });

  const latestByDate = buildLatestBatchMap(batches);
  const dateKeys = enumerateBusinessDateKeys(rangeStart, rangeEnd);
  const rows = dateKeys.map((dateKey) =>
    calculateDailyRow(selectedTarget, dateKey, latestByDate.get(dateKey) ?? null)
  );

  return {
    targets,
    selectedTargetId: selectedTarget.id,
    selectedTarget,
    fromDate: rangeStart,
    toDate: rangeEnd,
    rows,
    summary: buildSummary(rows)
  };
}
