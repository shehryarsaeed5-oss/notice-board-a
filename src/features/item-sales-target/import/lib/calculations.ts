import type { ItemSalesTargetRecord } from '../../api/types';
import type {
  ItemSalesImportBatchRecord,
  ItemSalesImportRowRecord,
  ItemSalesTargetDisplaySummaryItem,
  ItemSalesTargetDisplaySummaryResult,
  ItemSalesTargetProgress
} from '../api/types';
import { resolveStoredSalesRowBreakdown } from './row-metrics';
import {
  enumerateBusinessDateKeys,
  getBusinessMonthStartKey,
  getBusinessWeekStartKey
} from '../../lib/business-date';
import { normalizeItemNameKey, normalizeText, parseItemCodeList } from '../../lib/item-codes';

function roundQuantity(value: number): number {
  return Math.max(0, Math.round(value * 1000) / 1000);
}

function toDateKey(date: Date | null | undefined) {
  return date ? date.toISOString().slice(0, 10) : null;
}

function normalizeCodeSet(target: ItemSalesTargetRecord) {
  const codes = [...target.itemCodes, ...parseItemCodeList(target.itemCode)]
    .map((code) => normalizeText(code))
    .filter(Boolean);

  return new Set(codes.map((code) => code.toLowerCase()));
}

function matchesTargetRow(target: ItemSalesTargetRecord, row: ItemSalesImportRowRecord) {
  const codeSet = normalizeCodeSet(target);
  const rowCode = normalizeText(row.itemCode).toLowerCase();

  if (codeSet.size > 0) {
    return rowCode ? codeSet.has(rowCode) : false;
  }

  return normalizeItemNameKey(row.itemName) === normalizeItemNameKey(target.itemName);
}

function buildLatestBatchMap(
  batches: ItemSalesImportBatchRecord[]
): Map<string, { batch: ItemSalesImportBatchRecord; rows: ItemSalesImportRowRecord[] }> {
  const latestByDate = new Map<
    string,
    { batch: ItemSalesImportBatchRecord; rows: ItemSalesImportRowRecord[] }
  >();

  for (const batch of batches) {
    const current = latestByDate.get(batch.businessDateKey);

    if (!current) {
      latestByDate.set(batch.businessDateKey, { batch, rows: [] });
      continue;
    }

    const currentTime = current.batch.importedAt.getTime();
    const nextTime = batch.importedAt.getTime();

    if (nextTime > currentTime || (nextTime === currentTime && batch.id > current.batch.id)) {
      latestByDate.set(batch.businessDateKey, { batch, rows: [] });
    }
  }

  return latestByDate;
}

function indexRowsByBusinessDateKey(
  batches: ItemSalesImportBatchRecord[],
  rows: ItemSalesImportRowRecord[]
) {
  const latestByDate = buildLatestBatchMap(batches);
  const rowsByBatchId = new Map<string, ItemSalesImportRowRecord[]>();

  for (const row of rows) {
    const current = rowsByBatchId.get(row.importBatchId) ?? [];
    current.push(row);
    rowsByBatchId.set(row.importBatchId, current);
  }

  for (const value of latestByDate.values()) {
    value.rows = rowsByBatchId.get(value.batch.id) ?? [];
  }

  return latestByDate;
}

function sumRowsForTarget(
  target: ItemSalesTargetRecord,
  batchesByDate: Map<
    string,
    { batch: ItemSalesImportBatchRecord; rows: ItemSalesImportRowRecord[] }
  >,
  startKey: string,
  endKey: string
) {
  const keys = enumerateBusinessDateKeys(startKey, endKey);
  let soldQty = 0;
  let dataAvailable = false;
  let lastImportAt: Date | null = null;

  for (const businessDateKey of keys) {
    const entry = batchesByDate.get(businessDateKey);

    if (!entry) {
      continue;
    }

    if (entry.batch.status !== 'COMPLETED' || entry.batch.rowCount <= 0) {
      lastImportAt = lastImportAt
        ? lastImportAt.getTime() > entry.batch.importedAt.getTime()
          ? lastImportAt
          : entry.batch.importedAt
        : entry.batch.importedAt;
      continue;
    }

    dataAvailable = true;
    lastImportAt = lastImportAt
      ? lastImportAt.getTime() > entry.batch.importedAt.getTime()
        ? lastImportAt
        : entry.batch.importedAt
      : entry.batch.importedAt;

    const matchingRows = entry.rows.filter((row) => matchesTargetRow(target, row));
    soldQty += matchingRows.reduce(
      (total, row) => total + resolveStoredSalesRowBreakdown(row).paidQty,
      0
    );
  }

  return {
    soldQty: roundQuantity(soldQty),
    dataAvailable,
    lastImportAt
  };
}

function buildProgress(
  targetQty: number | null,
  soldQty: number,
  dataAvailable: boolean,
  lastImportAt: Date | null
): ItemSalesTargetProgress {
  const remainingQty = targetQty === null ? null : roundQuantity(Math.max(0, targetQty - soldQty));
  const percent =
    targetQty === null || targetQty <= 0
      ? null
      : Math.max(0, Math.min(100, Math.round((soldQty / targetQty) * 100)));

  return {
    targetQty,
    soldQty,
    remainingQty,
    percent,
    dataAvailable,
    lastImportAt
  };
}

function canUseTargetDate(target: ItemSalesTargetRecord, dateKey: string) {
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

function getModeRange(mode: 'daily' | 'weekly' | 'monthly', referenceKey: string) {
  if (mode === 'daily') {
    return {
      startKey: referenceKey,
      endKey: referenceKey
    };
  }

  if (mode === 'weekly') {
    return {
      startKey: getBusinessWeekStartKey(referenceKey),
      endKey: referenceKey
    };
  }

  return {
    startKey: getBusinessMonthStartKey(referenceKey),
    endKey: referenceKey
  };
}

export function buildItemSalesTargetDisplaySummary(
  targets: ItemSalesTargetRecord[],
  batches: ItemSalesImportBatchRecord[],
  rows: ItemSalesImportRowRecord[],
  referenceBusinessDateKey: string
): ItemSalesTargetDisplaySummaryResult {
  const businessDateKey = referenceBusinessDateKey;
  const indexedBatches = indexRowsByBusinessDateKey(batches, rows);
  const latestBatch =
    [...batches].sort(
      (left, right) =>
        right.importedAt.getTime() - left.importedAt.getTime() || right.id.localeCompare(left.id)
    )[0] ?? null;
  const latestImportAt = latestBatch?.importedAt ?? null;

  const items: ItemSalesTargetDisplaySummaryItem[] = targets
    .filter((target) => target.status === 'ACTIVE')
    .sort(
      (left, right) =>
        left.displayOrder - right.displayOrder || left.itemName.localeCompare(right.itemName)
    )
    .map((target) => {
      const dailyRange = getModeRange('daily', businessDateKey);
      const weeklyRange = getModeRange('weekly', businessDateKey);
      const monthlyRange = getModeRange('monthly', businessDateKey);

      const dailySource = canUseTargetDate(target, businessDateKey)
        ? sumRowsForTarget(target, indexedBatches, dailyRange.startKey, dailyRange.endKey)
        : { soldQty: 0, dataAvailable: false, lastImportAt: latestImportAt };
      const weeklySource = canUseTargetDate(target, businessDateKey)
        ? sumRowsForTarget(target, indexedBatches, weeklyRange.startKey, weeklyRange.endKey)
        : { soldQty: 0, dataAvailable: false, lastImportAt: latestImportAt };
      const monthlySource = canUseTargetDate(target, businessDateKey)
        ? sumRowsForTarget(target, indexedBatches, monthlyRange.startKey, monthlyRange.endKey)
        : { soldQty: 0, dataAvailable: false, lastImportAt: latestImportAt };

      return {
        id: target.id,
        itemName: target.itemName,
        itemCode: target.itemCode,
        itemCodes: target.itemCodes,
        startDate: target.startDate,
        endDate: target.endDate,
        displayOrder: target.displayOrder,
        calculationMode: target.calculationMode,
        status: target.status,
        daily: buildProgress(
          target.dailyTarget ?? null,
          dailySource.soldQty,
          dailySource.dataAvailable,
          dailySource.lastImportAt ?? latestImportAt
        ),
        weekly: buildProgress(
          target.weeklyTarget ?? null,
          weeklySource.soldQty,
          weeklySource.dataAvailable,
          weeklySource.lastImportAt ?? latestImportAt
        ),
        monthly: buildProgress(
          target.monthlyTarget ?? null,
          monthlySource.soldQty,
          monthlySource.dataAvailable,
          monthlySource.lastImportAt ?? latestImportAt
        ),
        lastImportAt: latestImportAt,
        lastImportStatus: latestBatch?.status ?? null
      };
    });

  return {
    generatedAt: new Date(),
    latestImportAt,
    items,
    total: items.length
  };
}
