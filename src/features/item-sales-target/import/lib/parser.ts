import * as XLSX from 'xlsx';

import { deriveSalesRowBreakdown } from './row-metrics';

export interface SalesImportParsedRow {
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
  rawData: Record<string, unknown>;
}

export interface SalesImportParseResult {
  sourceFilename: string;
  sheetName: string;
  rowsRead: number;
  rowsImported: number;
  rowsSkipped: number;
  rows: SalesImportParsedRow[];
}

function normalizeCell(value: unknown): string {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .trim();
}

function normalizeOptionalNumber(value: unknown): number | null {
  const normalized = normalizeCell(value).replace(/,/g, '');

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeOptionalDecimal(value: unknown): number | null {
  const normalized = normalizeCell(value).replace(/,/g, '').replace(/%$/g, '');

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

type PositionLayout = 'compact' | 'spread';

function detectPositionLayout(row: string[]): PositionLayout {
  const hasSpreadColumns =
    row.length >= 14 &&
    (normalizeCell(row[11]) !== '' ||
      normalizeCell(row[12]) !== '' ||
      normalizeCell(row[13]) !== '' ||
      normalizeCell(row[14]) !== '');

  if (hasSpreadColumns) {
    return 'spread';
  }

  return 'compact';
}

function isEmptyRow(values: string[]) {
  return values.every((value) => value === '');
}

function looksLikeHeadingRow(values: string[]) {
  const text = values.join(' ').toLowerCase();

  return (
    /item\s*code/.test(text) ||
    /item\s*name/.test(text) ||
    /category/.test(text) ||
    /uom/.test(text) ||
    /quantity/.test(text) ||
    /qty/.test(text) ||
    /amount/.test(text) ||
    /sales/.test(text)
  );
}

function isTotalRow(values: string[]) {
  const text = values.join(' ').toLowerCase();
  return /\b(total|grand total|sub total|subtotal)\b/.test(text);
}

function findColumnIndex(headers: string[], patterns: RegExp[]) {
  for (let index = 0; index < headers.length; index += 1) {
    const header = headers[index].toLowerCase();

    if (patterns.some((pattern) => pattern.test(header))) {
      return index;
    }
  }

  return -1;
}

function findHeaderRow(rows: string[][]) {
  for (let index = 0; index < Math.min(rows.length, 20); index += 1) {
    const row = rows[index];

    if (isEmptyRow(row)) {
      continue;
    }

    const text = row.join(' ').toLowerCase();
    if (
      (text.includes('item') && text.includes('name')) ||
      text.includes('item code') ||
      text.includes('quantity') ||
      text.includes('uom')
    ) {
      return index;
    }
  }

  return -1;
}

function parseRowByHeader(row: string[], headers: string[]): SalesImportParsedRow | null {
  const itemCodeIndex = findColumnIndex(headers, [/item\s*code/, /^code$/, /\bsku\b/]);
  const itemNameIndex = findColumnIndex(headers, [
    /item\s*name/,
    /^name$/,
    /\bdescription\b/,
    /\bproduct\b/
  ]);
  const categoryIndex = findColumnIndex(headers, [/item\s*class/, /category/]);
  const uomIndex = findColumnIndex(headers, [/\buom\b/, /unit\s*of\s*measure/, /^unit$/]);
  const totalQtyIndex = findColumnIndex(headers, [
    /total\s*qty/,
    /total\s*quantity/,
    /quantity\s*sold/,
    /\bqty\b/,
    /sold/
  ]);
  const discountAmountIndex = findColumnIndex(headers, [/discount/]);
  const paidAmountIndex = findColumnIndex(headers, [/paid\s*amount/, /net\s*value/, /\bpaid\b/]);
  const taxValueIndex = findColumnIndex(headers, [/tax/]);
  const salesValueIndex = findColumnIndex(headers, [/sales\s*value/, /\bsales\b/]);
  const costValueIndex = findColumnIndex(headers, [/cost/]);
  const marginValueIndex = findColumnIndex(headers, [/margin/]);
  const percentTotalSalesIndex = findColumnIndex(headers, [/%.*total\s*sales/, /percent.*sales/]);

  const itemCode = normalizeCell(row[itemCodeIndex]);
  const itemName = normalizeCell(row[itemNameIndex]);
  const categoryName = normalizeCell(row[categoryIndex]);
  const uom = normalizeCell(row[uomIndex]);
  const totalQty = normalizeOptionalNumber(row[totalQtyIndex]);
  const discountAmount = normalizeOptionalDecimal(row[discountAmountIndex]);
  const paidAmount = normalizeOptionalDecimal(row[paidAmountIndex]);
  const taxValue = normalizeOptionalDecimal(row[taxValueIndex]);
  const salesValue = normalizeOptionalDecimal(row[salesValueIndex]);
  const costValue = normalizeOptionalDecimal(row[costValueIndex]);
  const marginValue = normalizeOptionalDecimal(row[marginValueIndex]);
  const percentTotalSales = normalizeOptionalDecimal(row[percentTotalSalesIndex]);
  const breakdown = deriveSalesRowBreakdown({
    totalQty,
    discountAmount,
    paidAmount,
    taxValue,
    salesValue,
    costValue,
    marginValue,
    percentTotalSales
  });

  if (!itemName || totalQty === null) {
    return null;
  }

  return {
    itemCode: itemCode || null,
    itemName,
    categoryName: categoryName || null,
    uom: uom || null,
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
    rawData: {
      itemCode,
      itemName,
      categoryName,
      uom,
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
      percentTotalSales: breakdown.percentTotalSales
    }
  };
}

function parseRowByPosition(row: string[]): SalesImportParsedRow | null {
  const itemCode = normalizeCell(row[0]);
  const itemName = normalizeCell(row[1]);
  const layout = detectPositionLayout(row);
  const uom = normalizeCell(row[2]);
  const totalQty = normalizeOptionalNumber(row[3]);
  const discountAmount = normalizeOptionalDecimal(row[4]);
  const paidAmount = normalizeOptionalDecimal(row[5]);
  const taxValue = normalizeOptionalDecimal(row[6]);
  const salesValue =
    layout === 'spread' ? normalizeOptionalDecimal(row[8]) : normalizeOptionalDecimal(row[7]);
  const costValue =
    layout === 'spread' ? normalizeOptionalDecimal(row[11]) : normalizeOptionalDecimal(row[8]);
  const marginValue =
    layout === 'spread' ? normalizeOptionalDecimal(row[12]) : normalizeOptionalDecimal(row[9]);
  const percentTotalSales =
    layout === 'spread'
      ? normalizeOptionalDecimal(row[13] || row[14])
      : normalizeOptionalDecimal(row[10]);
  const breakdown = deriveSalesRowBreakdown({
    totalQty,
    discountAmount,
    paidAmount,
    taxValue,
    salesValue,
    costValue,
    marginValue,
    percentTotalSales
  });

  if (!itemName || totalQty === null) {
    return null;
  }

  return {
    itemCode: itemCode || null,
    itemName,
    categoryName: null,
    uom: uom || null,
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
    rawData: {
      itemCode,
      itemName,
      categoryName: null,
      uom,
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
      percentTotalSales: breakdown.percentTotalSales
    }
  };
}

function parseSheetRows(sheet: XLSX.WorkSheet) {
  return XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: '',
    blankrows: true,
    raw: false
  }) as unknown[][];
}

export function parseSalesImportWorkbook(
  fileBuffer: Buffer,
  sourceFilename: string
): SalesImportParseResult {
  const workbook = XLSX.read(fileBuffer, {
    type: 'buffer',
    raw: false,
    cellDates: false
  });

  const sheetName =
    workbook.SheetNames.find((name) => {
      const sheet = workbook.Sheets[name];
      if (!sheet) {
        return false;
      }

      const rows = parseSheetRows(sheet);
      return rows.some((row) => Array.isArray(row) && row.some((cell) => normalizeCell(cell)));
    }) ?? workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error('The Excel workbook does not contain any readable sheets.');
  }

  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error('The selected Excel worksheet could not be read.');
  }

  const rows = parseSheetRows(sheet).map((row) =>
    Array.isArray(row) ? row.map((cell) => normalizeCell(cell)) : []
  );

  if (rows.length === 0) {
    throw new Error('The Excel worksheet is empty.');
  }

  const headerRowIndex = findHeaderRow(rows);
  const headerRow = headerRowIndex >= 0 ? rows[headerRowIndex] : [];
  const startIndex = headerRowIndex >= 0 ? headerRowIndex + 1 : 0;
  const parsedRows: SalesImportParsedRow[] = [];
  let rowsRead = 0;

  for (let index = startIndex; index < rows.length; index += 1) {
    const row = rows[index];

    if (!row || isEmptyRow(row) || isTotalRow(row) || looksLikeHeadingRow(row)) {
      continue;
    }

    rowsRead += 1;

    const parsed =
      headerRow.length > 0 ? parseRowByHeader(row, headerRow) : parseRowByPosition(row);

    if (!parsed) {
      continue;
    }

    parsedRows.push(parsed);
  }

  return {
    sourceFilename,
    sheetName,
    rowsRead,
    rowsImported: parsedRows.length,
    rowsSkipped: Math.max(rowsRead - parsedRows.length, 0),
    rows: parsedRows
  };
}
