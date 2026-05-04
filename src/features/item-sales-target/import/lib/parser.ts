import * as XLSX from 'xlsx';

export interface SalesImportParsedRow {
  itemCode: string | null;
  itemName: string;
  categoryName: string | null;
  uom: string | null;
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
  const categoryIndex = findColumnIndex(headers, [/category/]);
  const uomIndex = findColumnIndex(headers, [/\buom\b/, /unit\s*of\s*measure/, /^unit$/]);
  const quantityIndex = findColumnIndex(headers, [
    /quantity\s*sold/,
    /\bquantity\b/,
    /\bqty\b/,
    /sold/
  ]);
  const amountPaidIndex = findColumnIndex(headers, [
    /amount\s*paid/,
    /paid\s*amount/,
    /\bamount\b/,
    /sales/,
    /net/
  ]);

  const itemCode = normalizeCell(row[itemCodeIndex]);
  const itemName = normalizeCell(row[itemNameIndex]);
  const categoryName = normalizeCell(row[categoryIndex]);
  const uom = normalizeCell(row[uomIndex]);
  const quantitySold = normalizeOptionalNumber(row[quantityIndex]);
  const amountPaid = normalizeOptionalNumber(row[amountPaidIndex]);

  if (!itemName || quantitySold === null) {
    return null;
  }

  return {
    itemCode: itemCode || null,
    itemName,
    categoryName: categoryName || null,
    uom: uom || null,
    quantitySold,
    amountPaid,
    rawData: {
      itemCode,
      itemName,
      categoryName,
      uom,
      quantitySold,
      amountPaid
    }
  };
}

function parseRowByPosition(row: string[]): SalesImportParsedRow | null {
  const itemCode = normalizeCell(row[0]);
  const itemName = normalizeCell(row[1]);
  const categoryName = normalizeCell(row[2]);
  const uom = normalizeCell(row[3]);
  const quantitySold = normalizeOptionalNumber(row[4]);
  const amountPaid = normalizeOptionalNumber(row[5]);

  if (!itemName || quantitySold === null) {
    return null;
  }

  return {
    itemCode: itemCode || null,
    itemName,
    categoryName: categoryName || null,
    uom: uom || null,
    quantitySold,
    amountPaid,
    rawData: {
      itemCode,
      itemName,
      categoryName,
      uom,
      quantitySold,
      amountPaid
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
