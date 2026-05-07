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
  status: StaffRecordStatus;
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
  status: StaffRecordStatus;
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

function normalizeHeaderKey(value: string): string {
  return normalizeHeader(value).replace(/[_\s-]+/g, '');
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

type StaffImportCanonicalHeader =
  | 'name'
  | 'designation'
  | 'department'
  | 'phone'
  | 'sortOrder'
  | 'status';

const STAFF_IMPORT_HEADER_ALIASES = {
  name: ['name'],
  designation: ['designation', 'desigantion'],
  department: ['department'],
  phone: ['phone', 'mobile', 'phonenumber', 'contactnumber'],
  sortOrder: ['sortorder', 'sort_order', 'sort'],
  status: ['status']
} satisfies Record<StaffImportCanonicalHeader, readonly string[]>;

function buildHeaderLookup(headers: string[]) {
  const lookup = new Map<StaffImportCanonicalHeader, number>();
  const normalizedHeaders = headers.map(normalizeHeaderKey);

  for (const canonicalHeader of Object.keys(
    STAFF_IMPORT_HEADER_ALIASES
  ) as StaffImportCanonicalHeader[]) {
    const aliases = STAFF_IMPORT_HEADER_ALIASES[canonicalHeader];
    const foundIndex = normalizedHeaders.findIndex((header) =>
      aliases.some((alias) => alias === header)
    );

    if (foundIndex >= 0) {
      lookup.set(canonicalHeader, foundIndex);
    }
  }

  return lookup;
}

export function getStaffImportDuplicateStrategy(rows: StaffImportPreparedRow[]) {
  const phoneCounts = new Map<string, number>();

  for (const row of rows) {
    if (!row.phoneKey) {
      continue;
    }

    phoneCounts.set(row.phoneKey, (phoneCounts.get(row.phoneKey) ?? 0) + 1);
  }

  return (row: StaffImportPreparedRow) => {
    const usePhoneDuplicateKey = Boolean(
      row.phoneKey && (phoneCounts.get(row.phoneKey) ?? 0) === 1
    );

    return {
      usePhoneDuplicateKey,
      duplicateKey: usePhoneDuplicateKey ? `phone:${row.phoneKey}` : `identity:${row.identityKey}`
    };
  };
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
  const headerLookup = buildHeaderLookup(headerRow);
  const missingRequiredHeaders = ['name', 'designation', 'department'].filter((header) => {
    return !headerLookup.has(header as StaffImportCanonicalHeader);
  });

  return {
    rows: rows
      .map((row, index): StaffImportCsvRow => {
        const rowNumber = index + 2;
        const nameIndex = headerLookup.get('name');
        const designationIndex = headerLookup.get('designation');
        const departmentIndex = headerLookup.get('department');
        const phoneIndex = headerLookup.get('phone');
        const sortOrderIndex = headerLookup.get('sortOrder');
        const statusIndex = headerLookup.get('status');

        return {
          rowNumber,
          name: nameIndex === undefined ? '' : (row[nameIndex] ?? ''),
          designation: designationIndex === undefined ? '' : (row[designationIndex] ?? ''),
          department: departmentIndex === undefined ? '' : (row[departmentIndex] ?? ''),
          phone: phoneIndex === undefined ? '' : (row[phoneIndex] ?? ''),
          sortOrder: sortOrderIndex === undefined ? '' : (row[sortOrderIndex] ?? ''),
          status: statusIndex === undefined ? '' : (row[statusIndex] ?? '')
        };
      })
      .filter((row) => {
        const values = STAFF_IMPORT_TEMPLATE_HEADERS.map((header) => row[header]);
        return !isRowEmpty(values);
      }),
    headerErrors: missingRequiredHeaders.length
      ? [
          `Missing required header(s): ${missingRequiredHeaders.join(', ')}.`,
          'Required columns: name, designation, department.'
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
  value: StaffRecordStatus;
  error?: string;
} {
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
