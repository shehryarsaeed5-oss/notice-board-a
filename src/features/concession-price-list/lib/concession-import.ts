import type { ConcessionPriceItemImportRowError, ConcessionPriceItemStatus } from '../api/types';

export const CONCESSION_IMPORT_TEMPLATE_HEADERS = [
  'itemName',
  'category',
  'price',
  'sortOrder',
  'status'
] as const;

export interface ConcessionImportCsvRow {
  rowNumber: number;
  itemName: string;
  category: string;
  price: string;
  sortOrder: string;
  status: string;
}

export interface ConcessionImportPreparedRow {
  rowNumber: number;
  itemName: string;
  category: string | null;
  price: number;
  sortOrder: number;
  status: ConcessionPriceItemStatus;
  duplicateKey: string;
}

export interface ConcessionImportPreviewRow {
  rowNumber: number;
  itemName: string;
  category: string | null;
  price: number;
  sortOrder: number;
  status: ConcessionPriceItemStatus;
  validationMessages: string[];
  duplicateKey: string;
  isValid: boolean;
  isDuplicate: boolean;
}

export interface ConcessionImportPreparedResult {
  rows: ConcessionImportPreviewRow[];
  readyRows: ConcessionImportPreparedRow[];
  totalRows: number;
  validCount: number;
  invalidCount: number;
  duplicateCount: number;
  emptyCount: number;
  headerErrors: string[];
}

type ConcessionImportCanonicalHeader = 'itemName' | 'category' | 'price' | 'sortOrder' | 'status';

const CONCESSION_IMPORT_HEADER_ALIASES = {
  itemName: ['itemname', 'item', 'name', 'product', 'productname'],
  category: ['category', 'group', 'section'],
  price: ['price', 'amount', 'rate'],
  sortOrder: ['sortorder', 'sort_order', 'sort'],
  status: ['status']
} satisfies Record<ConcessionImportCanonicalHeader, readonly string[]>;

function normalizeHeader(value: string): string {
  return value
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase();
}

function normalizeHeaderKey(value: string): string {
  return normalizeHeader(value).replace(/[_\s-]+/g, '');
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeOptionalText(value: string): string | null {
  const trimmed = normalizeText(value);
  return trimmed ? trimmed : null;
}

function normalizeKey(value: string): string {
  return normalizeText(value).toLowerCase();
}

function normalizeCategoryKey(value: string | null): string | null {
  return value ? normalizeKey(value) : null;
}

function isRowEmpty(values: string[]): boolean {
  return values.every((value) => value.trim() === '');
}

function escapeCsvValue(value: string): string {
  if (/["\r\n,]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

function buildHeaderLookup(headers: string[]) {
  const lookup = new Map<ConcessionImportCanonicalHeader, number>();
  const normalizedHeaders = headers.map(normalizeHeaderKey);

  for (const canonicalHeader of Object.keys(
    CONCESSION_IMPORT_HEADER_ALIASES
  ) as ConcessionImportCanonicalHeader[]) {
    const aliases = CONCESSION_IMPORT_HEADER_ALIASES[canonicalHeader];
    const foundIndex = normalizedHeaders.findIndex((header) =>
      aliases.some((alias) => alias === header)
    );

    if (foundIndex >= 0) {
      lookup.set(canonicalHeader, foundIndex);
    }
  }

  return lookup;
}

function parseCsv(csvText: string): string[][] {
  const normalizedText = csvText.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = '';
  let inQuotes = false;

  for (let index = 0; index < normalizedText.length; index += 1) {
    const character = normalizedText[index];

    if (inQuotes) {
      if (character === '"') {
        const nextCharacter = normalizedText[index + 1];
        if (nextCharacter === '"') {
          currentValue += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentValue += character;
      }

      continue;
    }

    if (character === '"') {
      inQuotes = true;
      continue;
    }

    if (character === ',') {
      currentRow.push(currentValue);
      currentValue = '';
      continue;
    }

    if (character === '\r') {
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = '';

      if (normalizedText[index + 1] === '\n') {
        index += 1;
      }

      continue;
    }

    if (character === '\n') {
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = '';
      continue;
    }

    currentValue += character;
  }

  currentRow.push(currentValue);
  rows.push(currentRow);

  return rows;
}

function parsePrice(value: string): { value: number; error?: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return { value: 0, error: 'Price is required.' };
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return { value: 0, error: 'Price must be a numeric value greater than or equal to 0.' };
  }

  return { value: parsed };
}

function parseSortOrder(value: string): { value: number; error?: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return { value: 0 };
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0) {
    return { value: 0, error: 'Sort Order must be a non-negative integer.' };
  }

  return { value: parsed };
}

function parseStatus(value: string): { value: ConcessionPriceItemStatus; error?: string } {
  const trimmed = value.trim().toUpperCase();

  if (!trimmed) {
    return { value: 'ACTIVE' };
  }

  if (trimmed === 'ACTIVE' || trimmed === 'INACTIVE' || trimmed === 'ARCHIVED') {
    return { value: trimmed };
  }

  return {
    value: 'ACTIVE',
    error: 'Status must be ACTIVE, INACTIVE, or ARCHIVED.'
  };
}

function buildDuplicateKey(values: { itemName: string; category: string | null }): string {
  const itemNameKey = normalizeKey(values.itemName);
  const categoryKey = normalizeCategoryKey(values.category);
  return categoryKey ? `item:${itemNameKey}||category:${categoryKey}` : `item:${itemNameKey}`;
}

export function buildConcessionImportTemplateCsv(): string {
  const rows = [
    CONCESSION_IMPORT_TEMPLATE_HEADERS,
    ['Burger with Fries', 'Food', '1000', '1', 'ACTIVE'],
    ['Soft Drink', 'Beverage', '350', '2', 'ACTIVE']
  ];

  const lines = rows.map((row) => row.map(escapeCsvValue).join(','));
  return `\ufeff${lines.join('\r\n')}\r\n`;
}

export function buildConcessionImportDuplicateKey(values: {
  itemName: string;
  category: string | null;
}): string {
  return buildDuplicateKey(values);
}

export function parseConcessionImportCsv(csvText: string) {
  const rows = parseCsv(csvText);

  if (rows.length === 0) {
    return {
      rows: [],
      headerErrors: ['CSV file is empty.']
    };
  }

  const headerRow = rows.shift() ?? [];
  const headerLookup = buildHeaderLookup(headerRow);
  const missingRequiredHeaders = ['itemName', 'price'].filter((header) => {
    return !headerLookup.has(header as ConcessionImportCanonicalHeader);
  });

  return {
    rows: rows
      .map((row, index): ConcessionImportCsvRow => {
        const rowNumber = index + 2;
        const itemNameIndex = headerLookup.get('itemName');
        const categoryIndex = headerLookup.get('category');
        const priceIndex = headerLookup.get('price');
        const sortOrderIndex = headerLookup.get('sortOrder');
        const statusIndex = headerLookup.get('status');

        return {
          rowNumber,
          itemName: itemNameIndex === undefined ? '' : (row[itemNameIndex] ?? ''),
          category: categoryIndex === undefined ? '' : (row[categoryIndex] ?? ''),
          price: priceIndex === undefined ? '' : (row[priceIndex] ?? ''),
          sortOrder: sortOrderIndex === undefined ? '' : (row[sortOrderIndex] ?? ''),
          status: statusIndex === undefined ? '' : (row[statusIndex] ?? '')
        };
      })
      .filter((row) => {
        const values = CONCESSION_IMPORT_TEMPLATE_HEADERS.map((header) => row[header]);
        return !isRowEmpty(values);
      }),
    headerErrors: missingRequiredHeaders.length
      ? [
          `Missing required header(s): ${missingRequiredHeaders.join(', ')}.`,
          'Required columns: itemName, price.'
        ]
      : []
  };
}

export function prepareConcessionImportRows(csvText: string): ConcessionImportPreparedResult {
  const parsed = parseConcessionImportCsv(csvText);

  if (parsed.headerErrors.length > 0) {
    return {
      rows: [],
      readyRows: [],
      totalRows: 0,
      validCount: 0,
      invalidCount: 0,
      duplicateCount: 0,
      emptyCount: 0,
      headerErrors: parsed.headerErrors
    };
  }

  if (parsed.rows.length === 0) {
    return {
      rows: [],
      readyRows: [],
      totalRows: 0,
      validCount: 0,
      invalidCount: 0,
      duplicateCount: 0,
      emptyCount: 0,
      headerErrors: ['CSV must contain at least one concession price data row.']
    };
  }

  const previewRows: ConcessionImportPreviewRow[] = [];
  const readyRows: ConcessionImportPreparedRow[] = [];
  const seenKeys = new Set<string>();
  let invalidCount = 0;
  let duplicateCount = 0;

  for (const row of parsed.rows) {
    const errors: string[] = [];
    const itemName = normalizeText(row.itemName);
    const category = normalizeOptionalText(row.category);
    const priceResult = parsePrice(row.price);
    const sortOrderResult = parseSortOrder(row.sortOrder);
    const statusResult = parseStatus(row.status);

    if (!itemName) {
      errors.push('Item name is required.');
    }

    if (priceResult.error) {
      errors.push(priceResult.error);
    }

    if (sortOrderResult.error) {
      errors.push(sortOrderResult.error);
    }

    if (statusResult.error) {
      errors.push(statusResult.error);
    }

    const duplicateKey = buildDuplicateKey({ itemName, category });
    const isDuplicate = errors.length === 0 && seenKeys.has(duplicateKey);
    const isValid = errors.length === 0;
    const isImportable = isValid && !isDuplicate;

    previewRows.push({
      rowNumber: row.rowNumber,
      itemName,
      category,
      price: priceResult.value,
      sortOrder: sortOrderResult.value,
      status: statusResult.value,
      validationMessages: errors,
      duplicateKey,
      isValid,
      isDuplicate
    });

    if (!isValid) {
      invalidCount += 1;
      continue;
    }

    if (isDuplicate) {
      duplicateCount += 1;
      continue;
    }

    seenKeys.add(duplicateKey);

    if (isImportable) {
      readyRows.push({
        rowNumber: row.rowNumber,
        itemName,
        category,
        price: priceResult.value,
        sortOrder: sortOrderResult.value,
        status: statusResult.value,
        duplicateKey
      });
    }
  }

  return {
    rows: previewRows,
    readyRows,
    totalRows: previewRows.length,
    validCount: readyRows.length,
    invalidCount,
    duplicateCount,
    emptyCount: parsed.rows.length - previewRows.length,
    headerErrors: []
  };
}

export function getConcessionImportRowErrors(
  rows: ConcessionImportPreviewRow[]
): ConcessionPriceItemImportRowError[] {
  return rows
    .filter((row) => row.validationMessages.length > 0)
    .map((row) => ({
      rowNumber: row.rowNumber,
      messages: row.validationMessages
    }));
}
