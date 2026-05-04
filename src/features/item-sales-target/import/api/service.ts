import 'server-only';

import { access } from 'node:fs/promises';

import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma';
import { getSystemSettings } from '@/features/system-settings/api/service';
import { invalidateDisplayBoardCache } from '@/features/display-board/api/cache';
import {
  createBusinessDateContext,
  formatBusinessDateKey,
  getBusinessMonthStartKey
} from '../../lib/business-date';
import { normalizeText } from '../../lib/item-codes';
import {
  computeItemSalesFileHash,
  getItemSalesBusinessFolderPath,
  getLatestItemSalesImportFile,
  readItemSalesImportFileBuffer
} from '../lib/file-scan';
import { parseSalesImportWorkbook } from '../lib/parser';
import { resolveStoredSalesRowBreakdown } from '../lib/row-metrics';
import { buildItemSalesTargetDisplaySummary } from '../lib/calculations';
import type {
  ItemSalesImportBatchRecord,
  ItemSalesImportMonitor,
  ItemSalesImportOverview,
  ItemSalesImportRowRecord,
  ItemSalesImportRunSummary,
  ItemSalesImportSettingRecord,
  ItemSalesTargetDisplaySummaryResult
} from './types';
import type { ItemSalesTargetRecord } from '../../api/types';

const DEFAULT_IMPORT_MONITOR: ItemSalesImportMonitor = {
  hasSavedSettings: false,
  sharedFolderPath: '',
  autoImportEnabled: false,
  lastScanAt: null,
  lastImportAt: null,
  lastImportStatus: null,
  lastImportMessage: null,
  lastImportCount: 0
};

function normalizeOptionalText(value?: string | null) {
  const trimmed = normalizeText(value);
  return trimmed ? trimmed : null;
}

function normalizeBoolean(value: unknown) {
  return value === true;
}

function toImportSettingRecord(row: {
  id: string;
  sharedFolderPath: string | null;
  autoImportEnabled: boolean;
  lastScanAt: Date | null;
  lastImportAt: Date | null;
  lastImportStatus: string | null;
  lastImportMessage: string | null;
  lastImportCount: number;
  createdAt: Date;
  updatedAt: Date;
}): ItemSalesImportSettingRecord {
  return {
    id: row.id,
    sharedFolderPath: row.sharedFolderPath,
    autoImportEnabled: row.autoImportEnabled,
    lastScanAt: row.lastScanAt,
    lastImportAt: row.lastImportAt,
    lastImportStatus: row.lastImportStatus,
    lastImportMessage: row.lastImportMessage,
    lastImportCount: row.lastImportCount,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function toMonitor(row: ItemSalesImportSettingRecord | null): ItemSalesImportMonitor {
  if (!row) {
    return { ...DEFAULT_IMPORT_MONITOR };
  }

  return {
    hasSavedSettings: true,
    sharedFolderPath: row.sharedFolderPath ?? '',
    autoImportEnabled: row.autoImportEnabled,
    lastScanAt: row.lastScanAt,
    lastImportAt: row.lastImportAt,
    lastImportStatus: row.lastImportStatus,
    lastImportMessage: row.lastImportMessage,
    lastImportCount: row.lastImportCount
  };
}

function toBatchRecord(row: {
  id: string;
  sourceFilename: string;
  sourcePath: string;
  reportDate: Date;
  businessDateKey: string;
  fileHash: string;
  status: string;
  rowCount: number;
  rawMetadata: unknown;
  importedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}): ItemSalesImportBatchRecord {
  return {
    id: row.id,
    sourceFilename: row.sourceFilename,
    sourcePath: row.sourcePath,
    reportDate: row.reportDate,
    businessDateKey: row.businessDateKey,
    fileHash: row.fileHash,
    status: row.status,
    rowCount: row.rowCount,
    rawMetadata:
      row.rawMetadata && typeof row.rawMetadata === 'object' && !Array.isArray(row.rawMetadata)
        ? (row.rawMetadata as Record<string, unknown>)
        : null,
    importedAt: row.importedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function toRowRecord(row: {
  id: string;
  importBatchId: string;
  businessDateKey: string;
  itemCode: string | null;
  itemName: string;
  categoryName: string | null;
  uom: string | null;
  totalQty: number;
  paidQty: number;
  focQty: number;
  discountAmount: number | null;
  paidAmount: number | null;
  netValue: number | null;
  taxValue: number | null;
  salesValue: number | null;
  costValue: number | null;
  marginValue: number | null;
  percentTotalSales: number | null;
  quantitySold: number;
  amountPaid: number | null;
  rawData: unknown;
  createdAt: Date;
}): ItemSalesImportRowRecord {
  const breakdown = resolveStoredSalesRowBreakdown({
    totalQty: row.totalQty,
    paidQty: row.paidQty,
    focQty: row.focQty,
    quantitySold: row.quantitySold,
    amountPaid: row.amountPaid,
    discountAmount: row.discountAmount,
    paidAmount: row.paidAmount,
    netValue: row.netValue,
    taxValue: row.taxValue,
    salesValue: row.salesValue,
    costValue: row.costValue,
    marginValue: row.marginValue,
    percentTotalSales: row.percentTotalSales
  });

  return {
    id: row.id,
    importBatchId: row.importBatchId,
    businessDateKey: row.businessDateKey,
    itemCode: row.itemCode,
    itemName: row.itemName,
    categoryName: row.categoryName,
    uom: row.uom,
    totalQty: breakdown.totalQty,
    paidQty: breakdown.paidQty,
    focQty: breakdown.focQty,
    discountAmount: breakdown.discountAmount,
    paidAmount: breakdown.paidAmount,
    netValue: breakdown.netValue,
    taxValue: breakdown.taxValue,
    salesValue: breakdown.salesValue,
    costValue: breakdown.costValue,
    marginValue: breakdown.marginValue,
    percentTotalSales: breakdown.percentTotalSales,
    quantitySold: breakdown.quantitySold,
    amountPaid: breakdown.amountPaid,
    rawData:
      row.rawData && typeof row.rawData === 'object' && !Array.isArray(row.rawData)
        ? (row.rawData as Record<string, unknown>)
        : null,
    createdAt: row.createdAt
  };
}

async function getCurrentSettingRow() {
  const row = await prisma.itemSalesImportSetting.findFirst({
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }]
  });

  return row ? toImportSettingRecord(row) : null;
}

function normalizeSharedFolderPath(value?: string | null) {
  const trimmed = normalizeText(value).replace(/[\\/]+$/, '');
  const datedFolderMatch = trimmed.match(/^(.*)[\\/](\d{8})$/);

  if (!datedFolderMatch) {
    return trimmed;
  }

  return normalizeText(datedFolderMatch[1]).replace(/[\\/]+$/, '');
}

async function getImportMonitor() {
  const setting = await getCurrentSettingRow();

  if (!setting) {
    return { ...DEFAULT_IMPORT_MONITOR };
  }

  return toMonitor(setting);
}

export async function getItemSalesImportSettings() {
  return getImportMonitor();
}

export async function saveItemSalesImportSettings(values: {
  sharedFolderPath?: string | null;
  autoImportEnabled: boolean;
}) {
  const normalizedSharedFolderPath = normalizeSharedFolderPath(values.sharedFolderPath);
  const existing = await prisma.itemSalesImportSetting.findFirst({
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }]
  });

  const row = existing
    ? await prisma.itemSalesImportSetting.update({
        where: { id: existing.id },
        data: {
          sharedFolderPath: normalizedSharedFolderPath || null,
          autoImportEnabled: normalizeBoolean(values.autoImportEnabled),
          lastScanAt: new Date()
        }
      })
    : await prisma.itemSalesImportSetting.create({
        data: {
          sharedFolderPath: normalizedSharedFolderPath || null,
          autoImportEnabled: normalizeBoolean(values.autoImportEnabled),
          lastScanAt: new Date()
        }
      });

  await invalidateDisplayBoardCache();

  return toMonitor(toImportSettingRecord(row));
}

async function persistImportOutcome(outcome: {
  lastImportAt: Date;
  lastImportStatus: string;
  lastImportMessage: string;
  lastImportCount: number;
  lastScanAt?: Date | null;
}) {
  const existing = await prisma.itemSalesImportSetting.findFirst({
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }]
  });

  if (!existing) {
    await prisma.itemSalesImportSetting.create({
      data: {
        sharedFolderPath: null,
        autoImportEnabled: false,
        lastScanAt: outcome.lastScanAt ?? outcome.lastImportAt,
        lastImportAt: outcome.lastImportAt,
        lastImportStatus: outcome.lastImportStatus,
        lastImportMessage: outcome.lastImportMessage,
        lastImportCount: outcome.lastImportCount
      }
    });
    return;
  }

  await prisma.itemSalesImportSetting.update({
    where: { id: existing.id },
    data: {
      lastScanAt: outcome.lastScanAt ?? outcome.lastImportAt,
      lastImportAt: outcome.lastImportAt,
      lastImportStatus: outcome.lastImportStatus,
      lastImportMessage: outcome.lastImportMessage,
      lastImportCount: outcome.lastImportCount
    }
  });
}

async function getRowsForBatch(batchId: string) {
  const rows = await prisma.itemSalesImportRow.findMany({
    where: { importBatchId: batchId },
    orderBy: [{ itemName: 'asc' }, { itemCode: 'asc' }, { id: 'asc' }]
  });

  return rows.map(toRowRecord);
}

async function removeImportBatchesForBusinessDate(
  tx: Prisma.TransactionClient,
  businessDateKey: string
) {
  await tx.itemSalesImportBatch.deleteMany({
    where: {
      businessDateKey
    }
  });
}

async function listRecentImports(limit = 10) {
  const batches = await prisma.itemSalesImportBatch.findMany({
    orderBy: [{ importedAt: 'desc' }, { createdAt: 'desc' }],
    take: Math.min(Math.max(1, limit), 50)
  });

  return batches.map(toBatchRecord);
}

async function getLatestBatchForDate(businessDateKey: string) {
  const batch = await prisma.itemSalesImportBatch.findFirst({
    where: { businessDateKey },
    orderBy: [{ importedAt: 'desc' }, { createdAt: 'desc' }]
  });

  return batch ? toBatchRecord(batch) : null;
}

async function getLatestBatchOverall() {
  const batch = await prisma.itemSalesImportBatch.findFirst({
    orderBy: [{ importedAt: 'desc' }, { createdAt: 'desc' }]
  });

  return batch ? toBatchRecord(batch) : null;
}

export async function getItemSalesImportOverview(
  selectedDate?: string
): Promise<ItemSalesImportOverview> {
  const settings = await getImportMonitor();
  const systemSettings = await getSystemSettings();
  const now = new Date();
  const context = createBusinessDateContext(
    now,
    systemSettings.values.timezone,
    systemSettings.values.businessDayCutoffHour
  );
  const selectedBusinessDateKey = normalizeText(selectedDate) || context.businessDateKey;
  const selectedBatch = await getLatestBatchForDate(selectedBusinessDateKey);
  const previewRows = selectedBatch ? await getRowsForBatch(selectedBatch.id) : [];
  const recentImports = await listRecentImports(10);

  return {
    monitor: settings,
    selectedDate: selectedBusinessDateKey,
    selectedBatch,
    previewRows,
    recentImports
  };
}

async function getActiveTargets() {
  return prisma.itemSalesTarget.findMany({
    where: { status: 'ACTIVE' },
    orderBy: [{ displayOrder: 'asc' }, { itemName: 'asc' }]
  });
}

async function importFileForBusinessDate(
  businessDateKey: string,
  options: { forceReplace?: boolean } = {}
): Promise<ItemSalesImportRunSummary> {
  const forceReplace = options.forceReplace === true;
  const setting = await getImportMonitor();

  if (!setting.sharedFolderPath) {
    const message = 'Shared folder path is not configured.';

    await persistImportOutcome({
      lastImportAt: new Date(),
      lastImportStatus: 'FAILED',
      lastImportMessage: message,
      lastImportCount: 0
    });

    return {
      status: 'FAILED',
      message,
      businessDateKey,
      sourceFilename: null,
      sourcePath: null,
      rowsRead: 0,
      rowsImported: 0,
      rowsSkipped: 0,
      batchId: null
    };
  }

  const folderPath = getItemSalesBusinessFolderPath(setting.sharedFolderPath, businessDateKey);

  try {
    await access(folderPath);
  } catch {
    const message = `Folder not found for ${businessDateKey}.`;

    await persistImportOutcome({
      lastImportAt: new Date(),
      lastImportStatus: 'SKIPPED',
      lastImportMessage: message,
      lastImportCount: 0
    });

    return {
      status: 'SKIPPED',
      message,
      businessDateKey,
      sourceFilename: null,
      sourcePath: folderPath,
      rowsRead: 0,
      rowsImported: 0,
      rowsSkipped: 0,
      batchId: null
    };
  }

  const candidate = await getLatestItemSalesImportFile(folderPath);

  if (!candidate) {
    const message = `No SignatureSales file found for ${businessDateKey}.`;

    await persistImportOutcome({
      lastImportAt: new Date(),
      lastImportStatus: 'EMPTY',
      lastImportMessage: message,
      lastImportCount: 0
    });

    return {
      status: 'EMPTY',
      message,
      businessDateKey,
      sourceFilename: null,
      sourcePath: folderPath,
      rowsRead: 0,
      rowsImported: 0,
      rowsSkipped: 0,
      batchId: null
    };
  }

  const fileBuffer = await readItemSalesImportFileBuffer(candidate.filePath);
  const fileHash = await computeItemSalesFileHash(fileBuffer);
  const existing = await prisma.itemSalesImportBatch.findUnique({
    where: { fileHash }
  });

  if (existing && !forceReplace) {
    const message = `Already imported ${candidate.fileName}.`;

    await persistImportOutcome({
      lastImportAt: existing.importedAt,
      lastImportStatus: 'SKIPPED',
      lastImportMessage: message,
      lastImportCount: existing.rowCount
    });

    return {
      status: 'SKIPPED',
      message,
      businessDateKey,
      sourceFilename: candidate.fileName,
      sourcePath: candidate.filePath,
      rowsRead: existing.rowCount,
      rowsImported: existing.rowCount,
      rowsSkipped: 0,
      batchId: existing.id
    };
  }

  const parsed = parseSalesImportWorkbook(fileBuffer, candidate.fileName);
  const reportDate = new Date(`${businessDateKey}T12:00:00`);
  const metadata = {
    sourceFilename: candidate.fileName,
    sourcePath: candidate.filePath,
    sheetName: parsed.sheetName,
    rowsRead: parsed.rowsRead,
    rowsImported: parsed.rowsImported,
    rowsSkipped: parsed.rowsSkipped
  };

  if (parsed.rowsImported <= 0 && forceReplace) {
    const message = `Force re-import of ${candidate.fileName} found no valid rows. Existing data was kept.`;

    await persistImportOutcome({
      lastImportAt: new Date(),
      lastImportStatus: 'EMPTY',
      lastImportMessage: message,
      lastImportCount: 0
    });

    return {
      status: 'EMPTY',
      message,
      businessDateKey,
      sourceFilename: candidate.fileName,
      sourcePath: candidate.filePath,
      rowsRead: parsed.rowsRead,
      rowsImported: 0,
      rowsSkipped: parsed.rowsSkipped,
      batchId: null
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    if (forceReplace) {
      await removeImportBatchesForBusinessDate(tx, businessDateKey);
    }

    if (parsed.rowsImported <= 0) {
      const batch = await tx.itemSalesImportBatch.create({
        data: {
          sourceFilename: candidate.fileName,
          sourcePath: candidate.filePath,
          reportDate,
          businessDateKey,
          fileHash,
          status: 'EMPTY',
          rowCount: 0,
          rawMetadata: metadata
        }
      });

      return batch;
    }

    const batch = await tx.itemSalesImportBatch.create({
      data: {
        sourceFilename: candidate.fileName,
        sourcePath: candidate.filePath,
        reportDate,
        businessDateKey,
        fileHash,
        status: 'COMPLETED',
        rowCount: parsed.rowsImported,
        rawMetadata: metadata
      }
    });

    await tx.itemSalesImportRow.createMany({
      data: parsed.rows.map((row) => ({
        importBatchId: batch.id,
        businessDateKey,
        itemCode: row.itemCode,
        itemName: row.itemName,
        categoryName: row.categoryName,
        uom: row.uom,
        totalQty: row.totalQty,
        paidQty: row.paidQty,
        focQty: row.focQty,
        discountAmount: row.discountAmount,
        paidAmount: row.paidAmount,
        netValue: row.netValue,
        taxValue: row.taxValue,
        salesValue: row.salesValue,
        costValue: row.costValue,
        marginValue: row.marginValue,
        percentTotalSales: row.percentTotalSales,
        quantitySold: row.quantitySold,
        amountPaid: row.amountPaid,
        rawData: row.rawData as Prisma.InputJsonValue
      }))
    });

    return batch;
  });

  if (parsed.rowsImported <= 0) {
    await persistImportOutcome({
      lastImportAt: result.importedAt,
      lastImportStatus: 'EMPTY',
      lastImportMessage: `Imported ${candidate.fileName} but no valid rows were found.`,
      lastImportCount: 0
    });

    await invalidateDisplayBoardCache();

    return {
      status: 'EMPTY',
      message: `Imported ${candidate.fileName} but no valid rows were found.`,
      businessDateKey,
      sourceFilename: candidate.fileName,
      sourcePath: candidate.filePath,
      rowsRead: parsed.rowsRead,
      rowsImported: 0,
      rowsSkipped: parsed.rowsSkipped,
      batchId: result.id
    };
  }

  await persistImportOutcome({
    lastImportAt: result.importedAt,
    lastImportStatus: 'COMPLETED',
    lastImportMessage: `Imported ${candidate.fileName}.`,
    lastImportCount: parsed.rowsImported
  });

  await invalidateDisplayBoardCache();

  return {
    status: 'COMPLETED',
    message: `Imported ${candidate.fileName}.`,
    businessDateKey,
    sourceFilename: candidate.fileName,
    sourcePath: candidate.filePath,
    rowsRead: parsed.rowsRead,
    rowsImported: parsed.rowsImported,
    rowsSkipped: parsed.rowsSkipped,
    batchId: result.id
  };
}

export async function runItemSalesImportToday(): Promise<ItemSalesImportRunSummary> {
  return runItemSalesImportTodayWithOptions();
}

export async function runItemSalesImportTodayWithOptions(
  options: { forceReplace?: boolean } = {}
): Promise<ItemSalesImportRunSummary> {
  const systemSettings = await getSystemSettings();
  const context = createBusinessDateContext(
    new Date(),
    systemSettings.values.timezone,
    systemSettings.values.businessDayCutoffHour
  );

  return importFileForBusinessDate(context.businessDateKey, options);
}

export async function runItemSalesImportRange(
  fromDate: string,
  toDate: string,
  options: { forceReplace?: boolean } = {}
) {
  const start = normalizeText(fromDate);
  const end = normalizeText(toDate);
  const errors: Array<{ businessDateKey: string; message: string }> = [];
  const results: ItemSalesImportRunSummary[] = [];
  const forceReplace = options.forceReplace === true;

  if (!start || !end) {
    throw new Error('Start date and end date are required.');
  }

  if (start > end) {
    throw new Error('End date cannot be before start date.');
  }

  const current = new Date(`${start}T00:00:00`);
  const finish = new Date(`${end}T00:00:00`);

  while (current <= finish) {
    const businessDateKey = formatBusinessDateKey(current);

    try {
      results.push(await importFileForBusinessDate(businessDateKey, { forceReplace }));
    } catch (error) {
      errors.push({
        businessDateKey,
        message: error instanceof Error ? error.message : 'Unable to import sales file.'
      });
    }

    current.setDate(current.getDate() + 1);
  }

  return {
    results,
    errors
  };
}

export async function getItemSalesTargetDisplaySummaryForDisplay(
  referenceDate = new Date()
): Promise<ItemSalesTargetDisplaySummaryResult> {
  const systemSettings = await getSystemSettings();
  const context = createBusinessDateContext(
    referenceDate,
    systemSettings.values.timezone,
    systemSettings.values.businessDayCutoffHour
  );
  const monthStartKey = getBusinessMonthStartKey(context.businessDateKey);
  const [targets, batches, rows, latestBatch] = await Promise.all([
    getActiveTargets(),
    prisma.itemSalesImportBatch.findMany({
      where: {
        businessDateKey: {
          gte: monthStartKey,
          lte: context.businessDateKey
        }
      },
      orderBy: [{ importedAt: 'desc' }, { createdAt: 'desc' }],
      include: {
        rows: true
      }
    }),
    prisma.itemSalesImportRow.findMany({
      where: {
        businessDateKey: {
          gte: monthStartKey,
          lte: context.businessDateKey
        }
      },
      orderBy: [{ createdAt: 'desc' }]
    }),
    prisma.itemSalesImportBatch.findFirst({
      orderBy: [{ importedAt: 'desc' }, { createdAt: 'desc' }]
    })
  ]);

  const displaySummary = buildItemSalesTargetDisplaySummary(
    targets as ItemSalesTargetRecord[],
    batches.map(toBatchRecord),
    rows.map(toRowRecord),
    context.businessDateKey
  );

  return {
    ...displaySummary,
    latestImportAt: latestBatch?.importedAt ?? displaySummary.latestImportAt,
    items: displaySummary.items.map((item) => ({
      ...item,
      lastImportAt: latestBatch?.importedAt ?? item.lastImportAt,
      lastImportStatus: latestBatch?.status ?? item.lastImportStatus
    }))
  };
}
