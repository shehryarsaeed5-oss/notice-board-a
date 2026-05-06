import type { StaffRecordStatus } from '../api/types';

export const STAFF_IMPORT_TEMPLATE_HEADERS = [
  'name',
  'designation',
  'department',
  'phone',
  'sortOrder',
  'status'
] as const;

export interface StaffImportCsvRow {
  rowNumber: number;
  name: string;
  designation: string;
  department: string;
  phone: string;
  sortOrder: string;
  status: string;
}

export interface StaffImportCsvParseResult {
  rows: StaffImportCsvRow[];
  headerErrors: string[];
}

export interface StaffImportPreviewRow {
  rowNumber: number;
  name: string;
  designation: string;
  department: string;
  phone: string | null;
  sortOrder: number;
  status: Exclude<StaffRecordStatus, 'ARCHIVED'>;
  validationMessages: string[];
  duplicateKey: string;
  isValid: boolean;
}

export interface StaffImportPreparedResult {
  rows: StaffImportPreviewRow[];
  validRows: StaffImportPreparedRow[];
  totalRows: number;
  validCount: number;
  invalidCount: number;
  emptyCount: number;
  headerErrors: string[];
}

export interface StaffImportPreparedRow {
  rowNumber: number;
  name: string;
  designation: string;
  department: string;
  phone: string | null;
  sortOrder: number;
  status: Exclude<StaffRecordStatus, 'ARCHIVED'>;
  duplicateKey: string;
  identityKey: string;
  phoneKey: string | null;
}

function normalizeHeader(value: string): string {
  return value
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase();
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeKey(value: string): string {
  return normalizeText(value).toLowerCase();
}

function normalizePhoneKey(value: string): string {
  return normalizeText(value)
    .replace(/[\s().-]/g, '')
    .toLowerCase();
}

function isRowEmpty(values: string[]): boolean {
  return values.every((value) => value.trim() === '');
}

export function buildStaffImportTemplateCsv(): string {
  const rows = [
    STAFF_IMPORT_TEMPLATE_HEADERS,
    ['Staff-1', 'BO', 'Box Office', '03244817006', '0', 'ACTIVE'],
    ['Ali Khan', 'Cinema Usher', 'Operations', '03001234567', '1', 'ACTIVE']
  ];

  const lines = rows.map((row) => row.map(escapeCsvValue).join(','));
  return `\ufeff${lines.join('\r\n')}\r\n`;
}

export function escapeCsvValue(value: string): string {
  if (/["\r\n,]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function parseStaffImportCsv(csvText: string): StaffImportCsvParseResult {
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

  if (rows.length === 0) {
    return {
      rows: [],
      headerErrors: ['CSV file is empty.']
    };
  }

  const headerRow = rows.shift() ?? [];
  const normalizedHeaders = headerRow.map(normalizeHeader);
  const headerLookup = new Map<string, number>();

  const missingHeaders = STAFF_IMPORT_TEMPLATE_HEADERS.filter((header) => {
    return !normalizedHeaders.includes(header);
  });

  normalizedHeaders.forEach((header, index) => {
    if (header) {
      headerLookup.set(header, index);
    }
  });

  return {
    rows: rows
      .map((row, index): StaffImportCsvRow => {
        const rowNumber = index + 2;
        return {
          rowNumber,
          name:
            headerLookup.get('name') === undefined ? '' : (row[headerLookup.get('name')!] ?? ''),
          designation:
            headerLookup.get('designation') === undefined
              ? ''
              : (row[headerLookup.get('designation')!] ?? ''),
          department:
            headerLookup.get('department') === undefined
              ? ''
              : (row[headerLookup.get('department')!] ?? ''),
          phone:
            headerLookup.get('phone') === undefined ? '' : (row[headerLookup.get('phone')!] ?? ''),
          sortOrder:
            headerLookup.get('sortOrder') === undefined
              ? ''
              : (row[headerLookup.get('sortOrder')!] ?? ''),
          status:
            headerLookup.get('status') === undefined ? '' : (row[headerLookup.get('status')!] ?? '')
        };
      })
      .filter((row) => {
        const values = STAFF_IMPORT_TEMPLATE_HEADERS.map((header) => row[header]);
        return !isRowEmpty(values);
      }),
    headerErrors: missingHeaders.length
      ? [
          `Missing required header(s): ${missingHeaders.join(', ')}.`,
          `Expected columns: ${STAFF_IMPORT_TEMPLATE_HEADERS.join(', ')}.`
        ]
      : []
  };
}

export function buildStaffImportIdentityKey(values: {
  name: string;
  designation: string;
  department: string;
}): string {
  return [values.name, values.designation, values.department].map(normalizeKey).join('||');
}

export function buildStaffImportPhoneKey(phone: string): string {
  return normalizePhoneKey(phone);
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

function parseStatus(value: string): {
  value: Exclude<StaffRecordStatus, 'ARCHIVED'>;
  error?: string;
} {
  const trimmed = value.trim().toUpperCase();

  if (!trimmed) {
    return { value: 'ACTIVE' };
  }

  if (trimmed === 'ACTIVE' || trimmed === 'INACTIVE') {
    return { value: trimmed };
  }

  return {
    value: 'ACTIVE',
    error: 'Status must be ACTIVE or INACTIVE.'
  };
}

function normalizePhone(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function prepareStaffImportRows(csvText: string): StaffImportPreparedResult {
  const parsed = parseStaffImportCsv(csvText);

  if (parsed.headerErrors.length > 0) {
    return {
      rows: [],
      validRows: [],
      totalRows: 0,
      validCount: 0,
      invalidCount: 0,
      emptyCount: 0,
      headerErrors: parsed.headerErrors
    };
  }

  if (parsed.rows.length === 0) {
    return {
      rows: [],
      validRows: [],
      totalRows: 0,
      validCount: 0,
      invalidCount: 0,
      emptyCount: 0,
      headerErrors: ['CSV must contain at least one staff data row.']
    };
  }

  const previewRows: StaffImportPreviewRow[] = [];
  const validRows: StaffImportPreparedRow[] = [];
  let invalidCount = 0;

  for (const row of parsed.rows) {
    const errors: string[] = [];
    const name = normalizeText(row.name);
    const designation = normalizeText(row.designation);
    const department = normalizeText(row.department);
    const phone = normalizePhone(row.phone);
    const sortOrderResult = parseSortOrder(row.sortOrder);
    const statusResult = parseStatus(row.status);

    if (!name) {
      errors.push('Name is required.');
    }

    if (!designation) {
      errors.push('Designation is required.');
    }

    if (!department) {
      errors.push('Department is required.');
    }

    if (sortOrderResult.error) {
      errors.push(sortOrderResult.error);
    }

    if (statusResult.error) {
      errors.push(statusResult.error);
    }

    const identityKey = buildStaffImportIdentityKey({ name, designation, department });
    const phoneKey = phone ? buildStaffImportPhoneKey(phone) : null;
    const duplicateKey = phoneKey ? `phone:${phoneKey}` : `identity:${identityKey}`;
    const isValid = errors.length === 0;

    previewRows.push({
      rowNumber: row.rowNumber,
      name,
      designation,
      department,
      phone,
      sortOrder: sortOrderResult.value,
      status: statusResult.value,
      validationMessages: errors,
      duplicateKey,
      isValid
    });

    if (!isValid) {
      invalidCount += 1;
      continue;
    }

    validRows.push({
      rowNumber: row.rowNumber,
      name,
      designation,
      department,
      phone,
      sortOrder: sortOrderResult.value,
      status: statusResult.value,
      duplicateKey,
      identityKey,
      phoneKey
    });
  }

  return {
    rows: previewRows,
    validRows,
    totalRows: previewRows.length,
    validCount: validRows.length,
    invalidCount,
    emptyCount: parsed.rows.length - previewRows.length,
    headerErrors: []
  };
}
