export const DISPLAY_BLOCK_KEYS = [
  'alerts',
  'events',
  'movieSchedule',
  'meetingSchedule',
  'managerAvailability',
  'staffRoster',
  'concessionPriceList',
  'itemSalesTarget',
  'advertisements',
  'weather'
] as const;

export type DisplayBlockKey = (typeof DISPLAY_BLOCK_KEYS)[number];

export type DisplayLayoutBlockSlot = 'full' | 'top' | 'bottom';

export interface DisplayBlockDefinition {
  key: DisplayBlockKey;
  label: string;
  defaultEnabled: boolean;
  defaultSortOrder: number;
  defaultRowLimit: number;
  minRowLimit: number;
  maxRowLimit: number;
  headerOnly: boolean;
}

export interface DisplayLayoutBlockConfig {
  key: DisplayBlockKey;
  enabled: boolean;
  sortOrder: number;
  rowLimit: number;
  column: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  slot: DisplayLayoutBlockSlot;
}

export interface DisplayLayoutColumns {
  left: number;
  center: number;
  right: number;
}

export interface DisplayLayoutRows {
  heights: number[];
}

export interface DisplayLayoutConfig {
  columns: DisplayLayoutColumns;
  rows: DisplayLayoutRows;
  blocks: DisplayLayoutBlockConfig[];
}

export const DISPLAY_GRID_COLUMN_COUNT = 3;
export const DISPLAY_GRID_ROW_MIN = 1;
export const DISPLAY_GRID_ROW_MAX = 20;
export const DISPLAY_GRID_ROW_SPAN_MAX = 6;
export const DISPLAY_GRID_ROW_HEIGHT_MIN = 0.5;
export const DISPLAY_GRID_ROW_HEIGHT_MAX = 3;

export const DISPLAY_BLOCKS: DisplayBlockDefinition[] = [
  {
    key: 'alerts',
    label: 'Alerts',
    defaultEnabled: true,
    defaultSortOrder: 1,
    defaultRowLimit: 3,
    minRowLimit: 1,
    maxRowLimit: 5,
    headerOnly: true
  },
  {
    key: 'events',
    label: 'Events',
    defaultEnabled: true,
    defaultSortOrder: 2,
    defaultRowLimit: 4,
    minRowLimit: 1,
    maxRowLimit: 8,
    headerOnly: false
  },
  {
    key: 'movieSchedule',
    label: 'Movie Schedule',
    defaultEnabled: true,
    defaultSortOrder: 3,
    defaultRowLimit: 8,
    minRowLimit: 1,
    maxRowLimit: 12,
    headerOnly: false
  },
  {
    key: 'meetingSchedule',
    label: 'Meeting Schedule',
    defaultEnabled: true,
    defaultSortOrder: 4,
    defaultRowLimit: 4,
    minRowLimit: 1,
    maxRowLimit: 8,
    headerOnly: false
  },
  {
    key: 'managerAvailability',
    label: 'Manager Availability',
    defaultEnabled: true,
    defaultSortOrder: 5,
    defaultRowLimit: 6,
    minRowLimit: 1,
    maxRowLimit: 12,
    headerOnly: false
  },
  {
    key: 'staffRoster',
    label: 'Staff Roster',
    defaultEnabled: true,
    defaultSortOrder: 6,
    defaultRowLimit: 6,
    minRowLimit: 1,
    maxRowLimit: 12,
    headerOnly: false
  },
  {
    key: 'concessionPriceList',
    label: 'Concession Price List',
    defaultEnabled: true,
    defaultSortOrder: 7,
    defaultRowLimit: 8,
    minRowLimit: 1,
    maxRowLimit: 12,
    headerOnly: false
  },
  {
    key: 'itemSalesTarget',
    label: 'Item Sales Target',
    defaultEnabled: true,
    defaultSortOrder: 8,
    defaultRowLimit: 3,
    minRowLimit: 1,
    maxRowLimit: 6,
    headerOnly: false
  },
  {
    key: 'advertisements',
    label: 'Advertisements',
    defaultEnabled: true,
    defaultSortOrder: 9,
    defaultRowLimit: 3,
    minRowLimit: 1,
    maxRowLimit: 6,
    headerOnly: false
  },
  {
    key: 'weather',
    label: 'Weather',
    defaultEnabled: true,
    defaultSortOrder: 10,
    defaultRowLimit: 1,
    minRowLimit: 1,
    maxRowLimit: 1,
    headerOnly: true
  }
];

export const DEFAULT_DISPLAY_LAYOUT_COLUMNS: DisplayLayoutColumns = {
  left: 33,
  center: 34,
  right: 33
};

const DEFAULT_LAYOUT_CONFIG: DisplayLayoutConfig = {
  columns: { ...DEFAULT_DISPLAY_LAYOUT_COLUMNS },
  rows: {
    heights: []
  },
  blocks: DISPLAY_BLOCKS.map((block) => ({
    key: block.key,
    enabled: block.defaultEnabled,
    sortOrder: block.defaultSortOrder,
    rowLimit: block.defaultRowLimit,
    ...getFlowPlacementFromSortOrder(block.defaultSortOrder),
    colSpan: 1,
    rowSpan: 1,
    slot: 'full'
  }))
};

function toFiniteInteger(value: unknown, fallback: number): number {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }

  return Math.trunc(numeric);
}

function toFiniteNumber(value: unknown, fallback: number): number {
  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeGridColumn(value: number): number {
  return clamp(value, 1, DISPLAY_GRID_COLUMN_COUNT);
}

function normalizeGridRow(value: number): number {
  return clamp(value, DISPLAY_GRID_ROW_MIN, DISPLAY_GRID_ROW_MAX);
}

function normalizeGridColSpan(value: number, column: number): number {
  const maxSpan = column >= DISPLAY_GRID_COLUMN_COUNT ? 1 : 2;
  return clamp(value, 1, maxSpan);
}

function normalizeGridRowSpan(value: number): number {
  return clamp(value, 1, DISPLAY_GRID_ROW_SPAN_MAX);
}

function normalizeGridRowHeight(value: number): number {
  return clamp(value, DISPLAY_GRID_ROW_HEIGHT_MIN, DISPLAY_GRID_ROW_HEIGHT_MAX);
}

function normalizeGridSlot(value: unknown, headerOnly: boolean): DisplayLayoutBlockSlot {
  if (headerOnly) {
    return 'full';
  }

  return value === 'top' || value === 'bottom' ? value : 'full';
}

function getFlowPlacementFromSortOrder(sortOrder: number): {
  column: number;
  row: number;
} {
  const safeSortOrder = Math.max(1, sortOrder);

  return {
    column: ((safeSortOrder - 1) % DISPLAY_GRID_COLUMN_COUNT) + 1,
    row: Math.floor((safeSortOrder - 1) / DISPLAY_GRID_COLUMN_COUNT) + 1
  };
}

function getSortOrderFromPlacement(column: number, row: number): number {
  return (row - 1) * DISPLAY_GRID_COLUMN_COUNT + column;
}

function getGridRowCount(blocks: DisplayLayoutBlockConfig[]): number {
  return Math.max(
    1,
    blocks.reduce(
      (highest, block) =>
        block.enabled && !findDefinition(block.key).headerOnly
          ? Math.max(highest, block.row + block.rowSpan - 1)
          : highest,
      1
    )
  );
}

export function getDisplayBlockSlotLabel(slot: DisplayLayoutBlockSlot): string {
  switch (slot) {
    case 'top':
      return 'Top';
    case 'bottom':
      return 'Bottom';
    case 'full':
    default:
      return 'Full';
  }
}

export function getDisplayBlockGridPlacement(block: DisplayLayoutBlockConfig): {
  rowStart: number;
  rowSpan: number;
} {
  return {
    rowStart: (block.row - 1) * 2 + (block.slot === 'bottom' ? 2 : 1),
    rowSpan: block.slot === 'full' ? Math.max(1, block.rowSpan) * 2 : 1
  };
}

export function expandDisplayLayoutRowsForSlots(rowHeights: number[]): number[] {
  return rowHeights.flatMap((value) => [value / 2, value / 2]);
}

function normalizeDisplayLayoutRows(input: unknown, rowCount: number): DisplayLayoutRows {
  const rawRows =
    input !== null && typeof input === 'object'
      ? ((input as { heights?: unknown }).heights as unknown[] | undefined)
      : undefined;

  const normalized = Array.from({ length: Math.max(1, rowCount) }, (_, index) => {
    const value = rawRows?.[index];
    return normalizeGridRowHeight(value !== undefined ? toFiniteNumber(value, 1) || 1 : 1);
  });

  return {
    heights: normalized
  };
}

function normalizeLegacyAttendanceBlock(rawBlocks: unknown[]): {
  enabled?: boolean;
  sortOrder?: number;
  rowLimit?: number;
} | null {
  const legacyBlock = rawBlocks.find(
    (block) => (block as { key?: unknown } | null | undefined)?.key === 'attendance'
  ) as Partial<DisplayLayoutBlockConfig> | undefined;

  if (!legacyBlock) {
    return null;
  }

  return {
    enabled: typeof legacyBlock.enabled === 'boolean' ? legacyBlock.enabled : undefined,
    sortOrder: toFiniteInteger(
      legacyBlock.sortOrder,
      findDefinition('managerAvailability').defaultSortOrder
    ),
    rowLimit: toFiniteInteger(
      legacyBlock.rowLimit,
      findDefinition('managerAvailability').defaultRowLimit
    )
  };
}

function normalizeDisplayLayoutColumns(input: unknown): DisplayLayoutColumns {
  const rawColumns =
    input !== null && typeof input === 'object'
      ? (input as Partial<DisplayLayoutColumns>)
      : undefined;

  const left = clamp(
    toFiniteInteger(rawColumns?.left, DEFAULT_DISPLAY_LAYOUT_COLUMNS.left),
    20,
    60
  );
  const center = clamp(
    toFiniteInteger(rawColumns?.center, DEFAULT_DISPLAY_LAYOUT_COLUMNS.center),
    20,
    60
  );
  const right = clamp(
    toFiniteInteger(rawColumns?.right, DEFAULT_DISPLAY_LAYOUT_COLUMNS.right),
    20,
    60
  );

  return {
    left,
    center,
    right
  };
}

function findDefinition(key: DisplayBlockKey): DisplayBlockDefinition {
  return DISPLAY_BLOCKS.find((block) => block.key === key) ?? DISPLAY_BLOCKS[0];
}

export function getDefaultDisplayLayoutConfig(): DisplayLayoutConfig {
  const rows = normalizeDisplayLayoutRows(undefined, getGridRowCount(DEFAULT_LAYOUT_CONFIG.blocks));

  return {
    columns: { ...DEFAULT_DISPLAY_LAYOUT_COLUMNS },
    rows,
    blocks: DEFAULT_LAYOUT_CONFIG.blocks.map((block) => ({ ...block }))
  };
}

export function normalizeDisplayLayoutConfig(input: unknown): DisplayLayoutConfig {
  const rawColumns = (input as { columns?: unknown } | null | undefined)?.columns;
  const rawRows = (input as { rows?: unknown } | null | undefined)?.rows;
  const rawBlocks = Array.isArray((input as { blocks?: unknown } | null | undefined)?.blocks)
    ? ((input as { blocks?: unknown[] }).blocks ?? [])
    : [];
  const legacyAttendance = normalizeLegacyAttendanceBlock(rawBlocks);

  const blocks = DISPLAY_BLOCKS.map((definition) => {
    const rawBlock = rawBlocks.find(
      (block) => (block as { key?: unknown } | null | undefined)?.key === definition.key
    ) as Partial<DisplayLayoutBlockConfig> | undefined;
    const legacySortOrder = legacyAttendance?.sortOrder ?? definition.defaultSortOrder;
    const sortOrderSeed =
      rawBlock?.sortOrder !== undefined
        ? toFiniteInteger(rawBlock.sortOrder, legacySortOrder)
        : definition.key === 'managerAvailability' && legacyAttendance
          ? legacySortOrder
          : definition.key === 'staffRoster' && legacyAttendance
            ? legacySortOrder + 1
            : legacyAttendance && legacySortOrder < definition.defaultSortOrder
              ? definition.defaultSortOrder + 1
              : definition.defaultSortOrder;
    const placement =
      rawBlock?.column !== undefined || rawBlock?.row !== undefined
        ? {
            column: normalizeGridColumn(
              toFiniteInteger(rawBlock?.column, getFlowPlacementFromSortOrder(sortOrderSeed).column)
            ),
            row: normalizeGridRow(
              toFiniteInteger(rawBlock?.row, getFlowPlacementFromSortOrder(sortOrderSeed).row)
            )
          }
        : getFlowPlacementFromSortOrder(sortOrderSeed);
    const column = normalizeGridColumn(placement.column);
    const row = normalizeGridRow(placement.row);
    const sortOrder =
      rawBlock?.sortOrder !== undefined
        ? clamp(toFiniteInteger(rawBlock.sortOrder, legacySortOrder), 0, 999)
        : clamp(getSortOrderFromPlacement(column, row), 0, 999);
    const rowLimit = clamp(
      rawBlock?.rowLimit !== undefined
        ? toFiniteInteger(rawBlock.rowLimit, definition.defaultRowLimit)
        : definition.key === 'managerAvailability' && legacyAttendance
          ? (legacyAttendance.rowLimit ?? definition.defaultRowLimit)
          : definition.key === 'staffRoster' && legacyAttendance
            ? (legacyAttendance.rowLimit ?? definition.defaultRowLimit)
            : definition.defaultRowLimit,
      definition.minRowLimit,
      definition.maxRowLimit
    );
    const enabled =
      typeof rawBlock?.enabled === 'boolean'
        ? rawBlock.enabled
        : definition.key === 'managerAvailability' && legacyAttendance
          ? (legacyAttendance.enabled ?? definition.defaultEnabled)
          : definition.key === 'staffRoster' && legacyAttendance
            ? (legacyAttendance.enabled ?? definition.defaultEnabled)
            : definition.defaultEnabled;
    const colSpan = normalizeGridColSpan(
      rawBlock?.colSpan !== undefined ? toFiniteInteger(rawBlock.colSpan, 1) : 1,
      column
    );
    const rowSpan = normalizeGridRowSpan(
      rawBlock?.rowSpan !== undefined ? toFiniteInteger(rawBlock.rowSpan, 1) : 1
    );
    let slot = normalizeGridSlot(rawBlock?.slot, definition.headerOnly);
    let normalizedRowSpan = rowSpan;

    if (definition.headerOnly) {
      slot = 'full';
      normalizedRowSpan = 1;
    } else if (slot !== 'full' && normalizedRowSpan > 1) {
      slot = 'full';
    } else if (slot !== 'full') {
      normalizedRowSpan = 1;
    }

    return {
      key: definition.key,
      enabled,
      sortOrder,
      rowLimit,
      column,
      row,
      colSpan,
      rowSpan: normalizedRowSpan,
      slot
    };
  });
  const rowCount = getGridRowCount(blocks);

  return {
    columns: normalizeDisplayLayoutColumns(rawColumns),
    rows: normalizeDisplayLayoutRows(rawRows, rowCount),
    blocks
  };
}

export function getEnabledSortedDisplayBlocks(
  config: DisplayLayoutConfig | null | undefined
): DisplayLayoutBlockConfig[] {
  return normalizeDisplayLayoutConfig(config)
    .blocks.filter((block) => block.enabled)
    .sort((left, right) => {
      if (left.row !== right.row) {
        return left.row - right.row;
      }

      if (left.column !== right.column) {
        return left.column - right.column;
      }

      if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }

      return left.key.localeCompare(right.key);
    });
}

export function getDisplayBlockDefinition(key: DisplayBlockKey): DisplayBlockDefinition {
  return findDefinition(key);
}

export function isHeaderOnlyDisplayBlock(key: DisplayBlockKey): boolean {
  return findDefinition(key).headerOnly;
}
