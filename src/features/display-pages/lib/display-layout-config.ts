export const DISPLAY_BLOCK_KEYS = [
  'alerts',
  'events',
  'movieSchedule',
  'meetingSchedule',
  'attendance',
  'concessionPriceList',
  'itemSalesTarget',
  'advertisements',
  'weather'
] as const;

export type DisplayBlockKey = (typeof DISPLAY_BLOCK_KEYS)[number];

export interface DisplayBlockDefinition {
  key: DisplayBlockKey;
  label: string;
  defaultEnabled: boolean;
  defaultSortOrder: number;
  defaultRowLimit: number;
  minRowLimit: number;
  maxRowLimit: number;
}

export interface DisplayLayoutBlockConfig {
  key: DisplayBlockKey;
  enabled: boolean;
  sortOrder: number;
  rowLimit: number;
}

export interface DisplayLayoutColumns {
  left: number;
  center: number;
  right: number;
}

export interface DisplayLayoutConfig {
  columns: DisplayLayoutColumns;
  blocks: DisplayLayoutBlockConfig[];
}

export const DISPLAY_BLOCKS: DisplayBlockDefinition[] = [
  {
    key: 'alerts',
    label: 'Alerts',
    defaultEnabled: true,
    defaultSortOrder: 1,
    defaultRowLimit: 3,
    minRowLimit: 1,
    maxRowLimit: 5
  },
  {
    key: 'events',
    label: 'Events',
    defaultEnabled: true,
    defaultSortOrder: 2,
    defaultRowLimit: 4,
    minRowLimit: 1,
    maxRowLimit: 8
  },
  {
    key: 'movieSchedule',
    label: 'Movie Schedule',
    defaultEnabled: true,
    defaultSortOrder: 3,
    defaultRowLimit: 8,
    minRowLimit: 1,
    maxRowLimit: 12
  },
  {
    key: 'meetingSchedule',
    label: 'Meeting Schedule',
    defaultEnabled: true,
    defaultSortOrder: 4,
    defaultRowLimit: 4,
    minRowLimit: 1,
    maxRowLimit: 8
  },
  {
    key: 'attendance',
    label: 'Attendance',
    defaultEnabled: true,
    defaultSortOrder: 5,
    defaultRowLimit: 6,
    minRowLimit: 1,
    maxRowLimit: 12
  },
  {
    key: 'concessionPriceList',
    label: 'Concession Price List',
    defaultEnabled: true,
    defaultSortOrder: 6,
    defaultRowLimit: 8,
    minRowLimit: 1,
    maxRowLimit: 12
  },
  {
    key: 'itemSalesTarget',
    label: 'Item Sales Target',
    defaultEnabled: true,
    defaultSortOrder: 7,
    defaultRowLimit: 3,
    minRowLimit: 1,
    maxRowLimit: 6
  },
  {
    key: 'advertisements',
    label: 'Advertisements',
    defaultEnabled: true,
    defaultSortOrder: 8,
    defaultRowLimit: 3,
    minRowLimit: 1,
    maxRowLimit: 6
  },
  {
    key: 'weather',
    label: 'Weather',
    defaultEnabled: true,
    defaultSortOrder: 9,
    defaultRowLimit: 1,
    minRowLimit: 1,
    maxRowLimit: 1
  }
];

export const DEFAULT_DISPLAY_LAYOUT_COLUMNS: DisplayLayoutColumns = {
  left: 33,
  center: 34,
  right: 33
};

const DEFAULT_LAYOUT_CONFIG: DisplayLayoutConfig = {
  columns: { ...DEFAULT_DISPLAY_LAYOUT_COLUMNS },
  blocks: DISPLAY_BLOCKS.map((block) => ({
    key: block.key,
    enabled: block.defaultEnabled,
    sortOrder: block.defaultSortOrder,
    rowLimit: block.defaultRowLimit
  }))
};

function toFiniteInteger(value: unknown, fallback: number): number {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }

  return Math.trunc(numeric);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

  if (left + center + right !== 100) {
    return { ...DEFAULT_DISPLAY_LAYOUT_COLUMNS };
  }

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
  return {
    columns: { ...DEFAULT_DISPLAY_LAYOUT_COLUMNS },
    blocks: DEFAULT_LAYOUT_CONFIG.blocks.map((block) => ({ ...block }))
  };
}

export function normalizeDisplayLayoutConfig(input: unknown): DisplayLayoutConfig {
  const rawColumns = (input as { columns?: unknown } | null | undefined)?.columns;
  const rawBlocks = Array.isArray((input as { blocks?: unknown } | null | undefined)?.blocks)
    ? ((input as { blocks?: unknown[] }).blocks ?? [])
    : [];

  return {
    columns: normalizeDisplayLayoutColumns(rawColumns),
    blocks: DISPLAY_BLOCKS.map((definition) => {
      const rawBlock = rawBlocks.find(
        (block) => (block as { key?: unknown } | null | undefined)?.key === definition.key
      ) as Partial<DisplayLayoutBlockConfig> | undefined;

      const sortOrder = clamp(
        toFiniteInteger(rawBlock?.sortOrder, definition.defaultSortOrder),
        0,
        999
      );
      const rowLimit = clamp(
        toFiniteInteger(rawBlock?.rowLimit, definition.defaultRowLimit),
        definition.minRowLimit,
        definition.maxRowLimit
      );

      return {
        key: definition.key,
        enabled:
          typeof rawBlock?.enabled === 'boolean' ? rawBlock.enabled : definition.defaultEnabled,
        sortOrder,
        rowLimit
      };
    })
  };
}

export function getEnabledSortedDisplayBlocks(
  config: DisplayLayoutConfig | null | undefined
): DisplayLayoutBlockConfig[] {
  return normalizeDisplayLayoutConfig(config)
    .blocks.filter((block) => block.enabled)
    .sort((left, right) => {
      if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }

      return left.key.localeCompare(right.key);
    });
}

export function getDisplayBlockDefinition(key: DisplayBlockKey): DisplayBlockDefinition {
  return findDefinition(key);
}
