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
export type DisplayLayoutBackgroundFit = 'cover' | 'contain' | 'fill';
export type DisplayLayoutBackgroundPosition = 'center' | 'top' | 'bottom';
export type DisplayLayoutColorHex = string;

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
  contentColumns: number;
  column: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  rowSpanUnits?: number;
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

export interface DisplayLayoutAppearanceConfig {
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}

export interface DisplayLayoutAppearanceColorsConfig {
  headerBackground: DisplayLayoutColorHex | null;
  headerText: DisplayLayoutColorHex | null;
  headerMutedText: DisplayLayoutColorHex | null;
  cardBackground: DisplayLayoutColorHex | null;
  cardBorder: DisplayLayoutColorHex | null;
  cardTitleBarBackground: DisplayLayoutColorHex | null;
  cardRowBackground: DisplayLayoutColorHex | null;
  cardRowAlternateBackground: DisplayLayoutColorHex | null;
  cardTitleText: DisplayLayoutColorHex | null;
  cardHeadingText: DisplayLayoutColorHex | null;
  cardBodyText: DisplayLayoutColorHex | null;
  cardDivider: DisplayLayoutColorHex | null;
}

export interface DisplayLayoutBackgroundConfig {
  imageUrl: string | null;
  opacity: number;
  blur: number;
  overlayOpacity: number;
  fit: DisplayLayoutBackgroundFit;
  position: DisplayLayoutBackgroundPosition;
}

export interface DisplayLayoutConfig {
  columns: DisplayLayoutColumns;
  rows: DisplayLayoutRows;
  appearance: DisplayLayoutAppearanceConfig;
  background: DisplayLayoutBackgroundConfig;
  blocks: DisplayLayoutBlockConfig[];
}

export const DISPLAY_GRID_COLUMN_COUNT = 3;
export const DISPLAY_GRID_ROW_MIN = 1;
export const DISPLAY_GRID_ROW_MAX = 20;
export const DISPLAY_GRID_ROW_SPAN_MAX = 6;
export const DISPLAY_GRID_ROW_SPAN_UNITS_MAX = DISPLAY_GRID_ROW_SPAN_MAX * 2;
export const DISPLAY_GRID_ROW_HEIGHT_MIN = 0.5;
export const DISPLAY_GRID_ROW_HEIGHT_MAX = 3;
export const DISPLAY_LAYOUT_BACKGROUND_OPACITY_MIN = 0.1;
export const DISPLAY_LAYOUT_BACKGROUND_OPACITY_MAX = 1;
export const DISPLAY_LAYOUT_BACKGROUND_BLUR_MIN = 0;
export const DISPLAY_LAYOUT_BACKGROUND_BLUR_MAX = 12;
export const DISPLAY_LAYOUT_BACKGROUND_OVERLAY_MIN = 0;
export const DISPLAY_LAYOUT_BACKGROUND_OVERLAY_MAX = 0.9;
export const DEFAULT_DISPLAY_LAYOUT_APPEARANCE: DisplayLayoutAppearanceConfig = {
  transparentPanels: false,
  colors: {
    headerBackground: null,
    headerText: null,
    headerMutedText: null,
    cardBackground: null,
    cardBorder: null,
    cardTitleBarBackground: null,
    cardRowBackground: null,
    cardRowAlternateBackground: null,
    cardTitleText: null,
    cardHeadingText: null,
    cardBodyText: null,
    cardDivider: null
  }
};

export const DEFAULT_DISPLAY_LAYOUT_BACKGROUND: DisplayLayoutBackgroundConfig = {
  imageUrl: null,
  opacity: 1,
  blur: 0,
  overlayOpacity: 0.55,
  fit: 'cover',
  position: 'center'
};

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
    maxRowLimit: 40,
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
  appearance: { ...DEFAULT_DISPLAY_LAYOUT_APPEARANCE },
  background: { ...DEFAULT_DISPLAY_LAYOUT_BACKGROUND },
  blocks: DISPLAY_BLOCKS.map((block) => ({
    key: block.key,
    enabled: block.defaultEnabled,
    sortOrder: block.defaultSortOrder,
    rowLimit: block.defaultRowLimit,
    contentColumns: 1,
    ...getFlowPlacementFromSortOrder(block.defaultSortOrder),
    colSpan: 1,
    rowSpan: 1,
    rowSpanUnits: 2,
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

function normalizeGridRowSpanUnits(value: number): number {
  return clamp(value, 1, DISPLAY_GRID_ROW_SPAN_UNITS_MAX);
}

function normalizeGridContentColumns(value: number): number {
  return clamp(value, 1, 3);
}

function normalizeGridRowHeight(value: number): number {
  return clamp(value, DISPLAY_GRID_ROW_HEIGHT_MIN, DISPLAY_GRID_ROW_HEIGHT_MAX);
}

function normalizeDisplayLayoutBackground(input: unknown): DisplayLayoutBackgroundConfig {
  const rawBackground =
    input !== null && typeof input === 'object'
      ? ((input as Partial<DisplayLayoutBackgroundConfig>) ?? {})
      : undefined;

  const imageUrl =
    typeof rawBackground?.imageUrl === 'string' && rawBackground.imageUrl.trim()
      ? rawBackground.imageUrl.trim()
      : null;
  const opacity = clamp(
    toFiniteNumber(rawBackground?.opacity, DEFAULT_DISPLAY_LAYOUT_BACKGROUND.opacity),
    DISPLAY_LAYOUT_BACKGROUND_OPACITY_MIN,
    DISPLAY_LAYOUT_BACKGROUND_OPACITY_MAX
  );
  const blur = clamp(
    toFiniteNumber(rawBackground?.blur, DEFAULT_DISPLAY_LAYOUT_BACKGROUND.blur),
    DISPLAY_LAYOUT_BACKGROUND_BLUR_MIN,
    DISPLAY_LAYOUT_BACKGROUND_BLUR_MAX
  );
  const overlayOpacity = clamp(
    toFiniteNumber(rawBackground?.overlayOpacity, DEFAULT_DISPLAY_LAYOUT_BACKGROUND.overlayOpacity),
    DISPLAY_LAYOUT_BACKGROUND_OVERLAY_MIN,
    DISPLAY_LAYOUT_BACKGROUND_OVERLAY_MAX
  );
  const fit =
    rawBackground?.fit === 'contain' ||
    rawBackground?.fit === 'fill' ||
    rawBackground?.fit === 'cover'
      ? rawBackground.fit
      : DEFAULT_DISPLAY_LAYOUT_BACKGROUND.fit;
  const position =
    rawBackground?.position === 'top' ||
    rawBackground?.position === 'bottom' ||
    rawBackground?.position === 'center'
      ? rawBackground.position
      : DEFAULT_DISPLAY_LAYOUT_BACKGROUND.position;

  return {
    imageUrl,
    opacity,
    blur,
    overlayOpacity,
    fit,
    position
  };
}

const DISPLAY_COLOR_HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function isDisplayColorHex(value: unknown): value is string {
  return typeof value === 'string' && DISPLAY_COLOR_HEX_PATTERN.test(value.trim());
}

export function normalizeDisplayColorHex(value: unknown): DisplayLayoutColorHex | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return DISPLAY_COLOR_HEX_PATTERN.test(trimmed) ? trimmed : null;
}

export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.trim().replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;

  if (value.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
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
          ? Math.max(
              highest,
              block.row + Math.max(1, Math.ceil(getDisplayBlockRowSpanUnits(block) / 2)) - 1
            )
          : highest,
      1
    )
  );
}

export function getDisplayBlockRowSpanUnits(
  block: Pick<DisplayLayoutBlockConfig, 'rowSpan' | 'rowSpanUnits' | 'slot'>
): number {
  if (typeof block.rowSpanUnits === 'number' && Number.isFinite(block.rowSpanUnits)) {
    return normalizeGridRowSpanUnits(Math.trunc(block.rowSpanUnits));
  }

  if (block.slot === 'top' || block.slot === 'bottom') {
    return 1;
  }

  return Math.max(1, Math.trunc(block.rowSpan || 1)) * 2;
}

export function getDisplayBlockRowSpanLabel(
  block: Pick<DisplayLayoutBlockConfig, 'rowSpan' | 'rowSpanUnits' | 'slot'>
): string {
  const rowCount = getDisplayBlockRowSpanUnits(block) / 2;
  return Number.isInteger(rowCount) ? `${rowCount}` : `${rowCount.toFixed(1)}`;
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
  rowSpanUnits: number;
} {
  return {
    rowStart: (block.row - 1) * 2 + (block.slot === 'bottom' ? 2 : 1),
    rowSpanUnits: getDisplayBlockRowSpanUnits(block)
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

function normalizeDisplayLayoutAppearance(input: unknown): DisplayLayoutAppearanceConfig {
  const rawAppearance =
    input !== null && typeof input === 'object'
      ? ((input as Partial<DisplayLayoutAppearanceConfig>) ?? {})
      : undefined;
  const rawColors =
    rawAppearance && typeof rawAppearance.colors === 'object'
      ? ((rawAppearance.colors as unknown as Record<string, unknown>) ?? {})
      : undefined;

  return {
    transparentPanels:
      typeof rawAppearance?.transparentPanels === 'boolean'
        ? rawAppearance.transparentPanels
        : DEFAULT_DISPLAY_LAYOUT_APPEARANCE.transparentPanels,
    colors: {
      headerBackground: normalizeDisplayColorHex(rawColors?.headerBackground),
      headerText: normalizeDisplayColorHex(rawColors?.headerText),
      headerMutedText: normalizeDisplayColorHex(rawColors?.headerMutedText),
      cardBackground: normalizeDisplayColorHex(rawColors?.cardBackground),
      cardBorder: normalizeDisplayColorHex(rawColors?.cardBorder),
      cardTitleBarBackground: normalizeDisplayColorHex(rawColors?.cardTitleBarBackground),
      cardRowBackground: normalizeDisplayColorHex(rawColors?.cardRowBackground),
      cardRowAlternateBackground: normalizeDisplayColorHex(rawColors?.cardRowAlternateBackground),
      cardTitleText: normalizeDisplayColorHex(rawColors?.cardTitleText),
      cardHeadingText: normalizeDisplayColorHex(rawColors?.cardHeadingText ?? rawColors?.textMuted),
      cardBodyText: normalizeDisplayColorHex(rawColors?.cardBodyText ?? rawColors?.textPrimary),
      cardDivider: normalizeDisplayColorHex(rawColors?.cardDivider)
    }
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
    appearance: { ...DEFAULT_DISPLAY_LAYOUT_APPEARANCE },
    background: { ...DEFAULT_DISPLAY_LAYOUT_BACKGROUND },
    blocks: DEFAULT_LAYOUT_CONFIG.blocks.map((block) => ({ ...block }))
  };
}

export function normalizeDisplayLayoutConfig(input: unknown): DisplayLayoutConfig {
  const rawColumns = (input as { columns?: unknown } | null | undefined)?.columns;
  const rawRows = (input as { rows?: unknown } | null | undefined)?.rows;
  const rawAppearance = (input as { appearance?: unknown } | null | undefined)?.appearance;
  const rawBackground = (input as { background?: unknown } | null | undefined)?.background;
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
    const contentColumns = normalizeGridContentColumns(
      rawBlock?.contentColumns !== undefined ? toFiniteInteger(rawBlock.contentColumns, 1) : 1
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
    const rawRowSpanUnits = rawBlock?.rowSpanUnits;
    let slot = normalizeGridSlot(rawBlock?.slot, definition.headerOnly);
    let normalizedRowSpanUnits =
      rawRowSpanUnits !== undefined
        ? normalizeGridRowSpanUnits(toFiniteInteger(rawRowSpanUnits, 1))
        : 0;

    if (definition.headerOnly) {
      slot = 'full';
      normalizedRowSpanUnits = 2;
    } else if (normalizedRowSpanUnits > 0) {
      // use explicit half-row units when present
    } else if (slot === 'full') {
      normalizedRowSpanUnits = rowSpan * 2;
    } else {
      normalizedRowSpanUnits = 1;
    }

    const normalizedRowSpan = Math.max(1, Math.ceil(normalizedRowSpanUnits / 2));

    return {
      key: definition.key,
      enabled,
      sortOrder,
      rowLimit,
      contentColumns,
      column,
      row,
      colSpan,
      rowSpan: normalizedRowSpan,
      rowSpanUnits: normalizedRowSpanUnits,
      slot
    };
  });
  const rowCount = getGridRowCount(blocks);

  return {
    columns: normalizeDisplayLayoutColumns(rawColumns),
    rows: normalizeDisplayLayoutRows(rawRows, rowCount),
    appearance: normalizeDisplayLayoutAppearance(rawAppearance),
    background: normalizeDisplayLayoutBackground(rawBackground),
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
