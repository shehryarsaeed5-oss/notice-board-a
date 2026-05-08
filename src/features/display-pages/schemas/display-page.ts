import * as z from 'zod';

import { isDisplayPageSlug } from '../lib/slug';
import {
  DISPLAY_BLOCKS,
  DISPLAY_BLOCK_KEYS,
  DISPLAY_GRID_COLUMN_COUNT,
  DISPLAY_GRID_ROW_HEIGHT_MAX,
  DISPLAY_GRID_ROW_HEIGHT_MIN,
  DISPLAY_GRID_ROW_MAX,
  DISPLAY_GRID_ROW_MIN,
  DISPLAY_GRID_ROW_SPAN_MAX,
  DISPLAY_GRID_ROW_SPAN_UNITS_MAX,
  DEFAULT_DISPLAY_LAYOUT_BACKGROUND,
  DEFAULT_DISPLAY_LAYOUT_APPEARANCE,
  getDisplayBlockRowSpanUnits,
  getDefaultDisplayLayoutConfig,
  isHeaderOnlyDisplayBlock
} from '../lib/display-layout-config';

function normalizeNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }

  return typeof value === 'string' ? Number(value) : value;
}

function normalizeNullableString(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return null;
  }

  return typeof value === 'string' ? value.trim() : value;
}

function normalizeHexColor(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }

  return value;
}

const displayHexColorSchema = z
  .preprocess(
    normalizeHexColor,
    z.union([
      z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
        message: 'Enter a valid HEX color like #1A1710'
      }),
      z.null()
    ])
  )
  .default(null);

const displayLayoutColumnsSchema = z
  .object({
    left: z.preprocess(normalizeNumber, z.number().int().min(20).max(60)),
    center: z.preprocess(normalizeNumber, z.number().int().min(20).max(60)),
    right: z.preprocess(normalizeNumber, z.number().int().min(20).max(60))
  })
  .superRefine((value, ctx) => {
    if (value.left + value.center + value.right !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['columns'],
        message: 'Column widths must total 100%'
      });
    }
  });

const displayLayoutRowsSchema = z.object({
  heights: z.array(
    z.preprocess(
      normalizeNumber,
      z.number().min(DISPLAY_GRID_ROW_HEIGHT_MIN).max(DISPLAY_GRID_ROW_HEIGHT_MAX)
    )
  )
});

const displayLayoutAppearanceSchema = z.object({
  transparentPanels: z.boolean().default(DEFAULT_DISPLAY_LAYOUT_APPEARANCE.transparentPanels),
  colors: z.object({
    headerBackground: displayHexColorSchema,
    headerText: displayHexColorSchema,
    headerMutedText: displayHexColorSchema,
    cardBackground: displayHexColorSchema,
    cardBorder: displayHexColorSchema,
    cardTitleBarBackground: displayHexColorSchema,
    cardRowBackground: displayHexColorSchema,
    cardRowAlternateBackground: displayHexColorSchema,
    cardTitleText: displayHexColorSchema,
    cardHeadingText: displayHexColorSchema,
    cardBodyText: displayHexColorSchema,
    cardDivider: displayHexColorSchema
  })
});

const displayLayoutBackgroundSchema = z.object({
  imageUrl: z
    .preprocess(normalizeNullableString, z.string().nullable())
    .default(DEFAULT_DISPLAY_LAYOUT_BACKGROUND.imageUrl),
  opacity: z
    .preprocess(normalizeNumber, z.number().min(0.1).max(1))
    .default(DEFAULT_DISPLAY_LAYOUT_BACKGROUND.opacity),
  blur: z
    .preprocess(normalizeNumber, z.number().min(0).max(12))
    .default(DEFAULT_DISPLAY_LAYOUT_BACKGROUND.blur),
  overlayOpacity: z
    .preprocess(normalizeNumber, z.number().min(0).max(0.9))
    .default(DEFAULT_DISPLAY_LAYOUT_BACKGROUND.overlayOpacity),
  fit: z.enum(['cover', 'contain', 'fill']).default(DEFAULT_DISPLAY_LAYOUT_BACKGROUND.fit),
  position: z.enum(['center', 'top', 'bottom']).default(DEFAULT_DISPLAY_LAYOUT_BACKGROUND.position)
});

export const displayLayoutBlockSchema = z
  .object({
    key: z.enum(DISPLAY_BLOCK_KEYS),
    enabled: z.boolean(),
    sortOrder: z.preprocess(normalizeNumber, z.number().int().nonnegative()),
    rowLimit: z.preprocess(normalizeNumber, z.number().int().nonnegative()),
    contentColumns: z.preprocess(normalizeNumber, z.number().int().min(1).max(3)),
    column: z.preprocess(normalizeNumber, z.number().int().min(1).max(DISPLAY_GRID_COLUMN_COUNT)),
    row: z.preprocess(
      normalizeNumber,
      z.number().int().min(DISPLAY_GRID_ROW_MIN).max(DISPLAY_GRID_ROW_MAX)
    ),
    colSpan: z.preprocess(normalizeNumber, z.number().int().min(1).max(2)),
    rowSpan: z.preprocess(normalizeNumber, z.number().int().min(1).max(DISPLAY_GRID_ROW_SPAN_MAX)),
    rowSpanUnits: z
      .preprocess(normalizeNumber, z.number().int().min(1).max(DISPLAY_GRID_ROW_SPAN_UNITS_MAX))
      .optional(),
    slot: z.enum(['full', 'top', 'bottom']).default('full')
  })
  .superRefine((value, ctx) => {
    const definition = DISPLAY_BLOCKS.find((block) => block.key === value.key);
    if (!definition) {
      return;
    }

    if (value.rowLimit < definition.minRowLimit || value.rowLimit > definition.maxRowLimit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rowLimit'],
        message: `Row limit must be between ${definition.minRowLimit} and ${definition.maxRowLimit}`
      });
    }

    if (
      !isHeaderOnlyDisplayBlock(value.key) &&
      value.column === DISPLAY_GRID_COLUMN_COUNT &&
      value.colSpan === 2
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['colSpan'],
        message: 'Width 2 columns cannot start in column 3'
      });
    }

    if (isHeaderOnlyDisplayBlock(value.key) && value.slot && value.slot !== 'full') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['slot'],
        message: 'Header-only blocks use Full row'
      });
    }

    const rowSpanUnits = getDisplayBlockRowSpanUnits(value);
    const logicalRowSpan = Math.max(1, Math.ceil(rowSpanUnits / 2));

    if (value.row + logicalRowSpan - 1 > DISPLAY_GRID_ROW_MAX) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rowSpan'],
        message: `Card Height cannot extend beyond layout row ${DISPLAY_GRID_ROW_MAX}`
      });
    }
  });

export const displayLayoutConfigSchema = z
  .object({
    columns: displayLayoutColumnsSchema,
    rows: displayLayoutRowsSchema,
    appearance: displayLayoutAppearanceSchema.default(DEFAULT_DISPLAY_LAYOUT_APPEARANCE),
    background: displayLayoutBackgroundSchema,
    blocks: z.array(displayLayoutBlockSchema).length(DISPLAY_BLOCKS.length)
  })
  .superRefine((value, ctx) => {
    const occupied: Array<{
      key: string;
      subRowStart: number;
      subRowEnd: number;
      start: number;
      end: number;
      slot: 'full' | 'top' | 'bottom';
    }> = [];

    value.blocks.forEach((block, index) => {
      if (!block.enabled || isHeaderOnlyDisplayBlock(block.key)) {
        return;
      }

      const startColumn = block.column;
      const endColumn = Math.min(DISPLAY_GRID_COLUMN_COUNT, block.column + block.colSpan - 1);
      const rowSpanUnits = getDisplayBlockRowSpanUnits(block);
      const subRowStart = (block.row - 1) * 2 + (block.slot === 'bottom' ? 2 : 1);
      const subRowEnd = subRowStart + rowSpanUnits;
      const overlaps = occupied.filter(
        (item) =>
          !(
            subRowEnd <= item.subRowStart ||
            subRowStart >= item.subRowEnd ||
            endColumn < item.start ||
            startColumn > item.end
          )
      );
      if (overlaps.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['blocks', index, 'column'],
          message: 'Two display blocks overlap in the same grid position'
        });
        return;
      }

      occupied.push({
        key: block.key,
        subRowStart,
        subRowEnd,
        start: startColumn,
        end: endColumn,
        slot: block.slot ?? 'full'
      });
    });
  });

export const displayPageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  slug: z.string().trim().min(1, 'Slug is required').refine(isDisplayPageSlug, {
    message: 'Slug must be lowercase URL-safe, like lobby-main'
  }),
  description: z.string().trim().optional(),
  resolutionWidth: z.preprocess(normalizeNumber, z.number().int().positive()),
  resolutionHeight: z.preprocess(normalizeNumber, z.number().int().positive()),
  layoutConfig: displayLayoutConfigSchema,
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED'])
});

export type DisplayPageFormSchemaValues = z.infer<typeof displayPageSchema>;

export function getDefaultDisplayPageSchemaValues(): DisplayPageFormSchemaValues {
  return {
    name: '',
    slug: '',
    description: '',
    resolutionWidth: 1920,
    resolutionHeight: 1080,
    layoutConfig: getDefaultDisplayLayoutConfig(),
    status: 'ACTIVE'
  };
}
