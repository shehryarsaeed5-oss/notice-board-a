import type { RecordStatus } from '@/features/display-board/api/types';
import type { ItemSalesTargetRecord } from '../../api/types';

export const ITEM_SALES_IMPORT_STATUSES = ['COMPLETED', 'EMPTY', 'FAILED', 'SKIPPED'] as const;

export type ItemSalesImportStatus = (typeof ITEM_SALES_IMPORT_STATUSES)[number];

export interface ItemSalesImportSettingRecord {
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
}

export interface ItemSalesImportMonitor {
  hasSavedSettings: boolean;
  sharedFolderPath: string;
  autoImportEnabled: boolean;
  lastScanAt: Date | null;
  lastImportAt: Date | null;
  lastImportStatus: string | null;
  lastImportMessage: string | null;
  lastImportCount: number;
}

export interface ItemSalesImportBatchRecord {
  id: string;
  sourceFilename: string;
  sourcePath: string;
  reportDate: Date;
  businessDateKey: string;
  fileHash: string;
  status: string;
  rowCount: number;
  rawMetadata: Record<string, unknown> | null;
  importedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemSalesImportRowRecord {
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
  rawData: Record<string, unknown> | null;
  createdAt: Date;
}

export interface ItemSalesImportOverview {
  monitor: ItemSalesImportMonitor;
  selectedDate: string;
  selectedBatch: ItemSalesImportBatchRecord | null;
  previewRows: ItemSalesImportRowRecord[];
  recentImports: ItemSalesImportBatchRecord[];
}

export interface ItemSalesImportRunSummary {
  status: ItemSalesImportStatus;
  message: string;
  businessDateKey: string;
  sourceFilename: string | null;
  sourcePath: string | null;
  rowsRead: number;
  rowsImported: number;
  rowsSkipped: number;
  batchId: string | null;
}

export interface ItemSalesTargetProgress {
  targetQty: number | null;
  soldQty: number;
  remainingQty: number | null;
  percent: number | null;
  dataAvailable: boolean;
  lastImportAt: Date | null;
}

export interface ItemSalesTargetDisplaySummaryItem {
  id: string;
  itemName: string;
  itemCode: string | null;
  itemCodes: string[];
  startDate: Date | null;
  endDate: Date | null;
  displayOrder: number;
  calculationMode: string | null;
  status: RecordStatus;
  daily: ItemSalesTargetProgress;
  weekly: ItemSalesTargetProgress;
  monthly: ItemSalesTargetProgress;
  lastImportAt: Date | null;
  lastImportStatus: string | null;
}

export interface ItemSalesTargetDisplaySummaryResult {
  generatedAt: Date;
  latestImportAt: Date | null;
  items: ItemSalesTargetDisplaySummaryItem[];
  total: number;
}

export type ItemSalesTargetDailyHistoryStatus = 'IMPORTED' | 'MISSING' | 'NO_TARGET';

export interface ItemSalesTargetDailyHistoryRow {
  date: Date;
  businessDateKey: string;
  targetName: string;
  itemCodes: string[];
  dailyTarget: number | null;
  totalQty: number;
  paidQty: number;
  focQty: number;
  soldQty: number;
  remainingQty: number | null;
  percent: number | null;
  paidAmount: number | null;
  discountAmount: number | null;
  importStatus: ItemSalesTargetDailyHistoryStatus;
  batchStatus: string | null;
  sourceFilename: string | null;
  lastImportedAt: Date | null;
}

export interface ItemSalesTargetDailyHistorySummary {
  totalSold: number;
  totalDailyTarget: number;
  averagePercent: number | null;
  bestDay: {
    businessDateKey: string;
    date: Date;
    soldQty: number;
    percent: number | null;
  } | null;
  missingImportDays: number;
}

export interface ItemSalesTargetDailyHistoryOverview {
  targets: ItemSalesTargetRecord[];
  selectedTargetId: string | null;
  selectedTarget: ItemSalesTargetRecord | null;
  fromDate: string;
  toDate: string;
  rows: ItemSalesTargetDailyHistoryRow[];
  summary: ItemSalesTargetDailyHistorySummary;
}
