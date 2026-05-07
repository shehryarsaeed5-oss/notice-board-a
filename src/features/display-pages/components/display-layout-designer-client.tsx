'use client';

import {
  closestCenter,
  DndContext,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  type DragStartEvent,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { updateDisplayPage } from '../api/client';
import type { DisplayPageRecord, DisplayPageFormValues } from '../api/types';
import { createDisplayPageUrl } from '../lib/slug';
import { displayLayoutConfigSchema, displayPageSchema } from '../schemas/display-page';
import {
  DISPLAY_BLOCKS,
  DISPLAY_GRID_COLUMN_COUNT,
  DISPLAY_GRID_ROW_HEIGHT_MAX,
  DISPLAY_GRID_ROW_HEIGHT_MIN,
  DISPLAY_GRID_ROW_MAX,
  DISPLAY_GRID_ROW_MIN,
  DISPLAY_GRID_ROW_SPAN_MAX,
  DISPLAY_LAYOUT_BACKGROUND_BLUR_MAX,
  DEFAULT_DISPLAY_LAYOUT_APPEARANCE,
  DEFAULT_DISPLAY_LAYOUT_BACKGROUND,
  expandDisplayLayoutRowsForSlots,
  getDisplayBlockGridPlacement,
  getDisplayBlockSlotLabel,
  getDefaultDisplayLayoutConfig,
  hexToRgba,
  isHeaderOnlyDisplayBlock,
  normalizeDisplayLayoutConfig,
  isDisplayColorHex,
  type DisplayBlockDefinition,
  type DisplayBlockKey,
  type DisplayLayoutAppearanceConfig,
  type DisplayLayoutAppearanceColorsConfig,
  type DisplayLayoutBackgroundConfig,
  type DisplayLayoutBlockSlot,
  type DisplayLayoutBlockConfig,
  type DisplayLayoutColumns,
  type DisplayLayoutConfig
} from '../lib/display-layout-config';

interface DisplayLayoutDesignerClientProps {
  displayPage: DisplayPageRecord;
}

function getBlockDefinition(key: DisplayBlockKey): DisplayBlockDefinition {
  return DISPLAY_BLOCKS.find((block) => block.key === key) ?? DISPLAY_BLOCKS[0];
}

function getPlacementLabel(block: DisplayLayoutBlockConfig): string {
  return `C${block.column} • Start R${block.row} • W${block.colSpan} • H${block.rowSpan} • ${getDisplayBlockSlotLabel(block.slot)}`;
}

function getRowsPerSlideLabel(block: DisplayLayoutBlockConfig) {
  return `Content ${block.rowLimit}`;
}

function getContentColumnsLabel(block: DisplayLayoutBlockConfig) {
  return `${block.contentColumns} col${block.contentColumns === 1 ? '' : 's'}`;
}

function getBackgroundLabel(background: DisplayLayoutBackgroundConfig) {
  return background.imageUrl ? 'Wallpaper set' : 'Wallpaper off';
}

function getBackgroundObjectPosition(position: DisplayLayoutBackgroundConfig['position']) {
  switch (position) {
    case 'top':
      return 'top center';
    case 'bottom':
      return 'bottom center';
    case 'center':
    default:
      return 'center center';
  }
}

function getBackgroundFitLabel(fit: DisplayLayoutBackgroundConfig['fit']) {
  switch (fit) {
    case 'contain':
      return 'Contain';
    case 'fill':
      return 'Fill';
    case 'cover':
    default:
      return 'Cover';
  }
}

function getBackgroundPositionLabel(position: DisplayLayoutBackgroundConfig['position']) {
  switch (position) {
    case 'top':
      return 'Top';
    case 'bottom':
      return 'Bottom';
    case 'center':
    default:
      return 'Center';
  }
}

function getDisplaySurfaceClass(transparentPanels: boolean) {
  return transparentPanels
    ? 'border-white/10 bg-white/6 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl'
    : 'border-white/15 bg-zinc-950/95 shadow-[0_18px_42px_rgba(0,0,0,0.38)]';
}

function getDisplayHeaderSurfaceClass(transparentPanels: boolean) {
  return transparentPanels
    ? 'border-b border-white/10 bg-white/6 backdrop-blur-xl'
    : 'border-b border-white/15 bg-zinc-950/95';
}

function getDisplayColorSurfaceStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
) {
  const headerBackground = colors.headerBackground
    ? hexToRgba(colors.headerBackground, transparentPanels ? 0.72 : 1)
    : transparentPanels
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgb(24, 24, 27)';
  const cardBackground = colors.cardBackground
    ? hexToRgba(colors.cardBackground, transparentPanels ? 0.72 : 1)
    : transparentPanels
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgb(9, 9, 11)';
  const cardBorder =
    colors.cardBorder ??
    (transparentPanels ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.15)');

  return {
    ['--display-header-bg' as string]: headerBackground,
    ['--display-card-bg' as string]: cardBackground,
    ['--display-card-border' as string]: cardBorder,
    ['--display-header-text' as string]: colors.headerText ?? undefined,
    ['--display-header-muted-text' as string]: colors.headerMutedText ?? undefined,
    ['--display-card-title-text' as string]: colors.cardTitleText ?? undefined,
    ['--display-card-heading-text' as string]: colors.cardHeadingText ?? undefined,
    ['--display-card-body-text' as string]: colors.cardBodyText ?? undefined,
    ['--display-card-divider' as string]: colors.cardDivider ?? undefined
  } as CSSProperties;
}

function getDisplayPanelStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
): CSSProperties {
  return {
    backgroundColor: colors.cardBackground
      ? hexToRgba(colors.cardBackground, transparentPanels ? 0.72 : 1)
      : transparentPanels
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgb(9, 9, 11)',
    borderColor:
      colors.cardBorder ??
      (transparentPanels ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.15)')
  };
}

function getDisplayHeaderStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
): CSSProperties {
  return {
    backgroundColor: colors.headerBackground
      ? hexToRgba(colors.headerBackground, transparentPanels ? 0.72 : 1)
      : transparentPanels
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgb(24, 24, 27)',
    borderColor:
      colors.cardBorder ??
      (transparentPanels ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.15)')
  };
}

function getDesignerPreviewBlockClass(
  transparentPanels: boolean,
  selected: boolean,
  dragging: boolean
) {
  if (!transparentPanels) {
    return cn(
      'border border-white/15 bg-zinc-950/95',
      selected
        ? 'border-amber-500/50 shadow-[0_0_0_1px_rgba(245,158,11,0.15)]'
        : 'hover:border-white/25 hover:bg-zinc-950',
      dragging ? 'opacity-70 ring-2 ring-amber-300/40' : ''
    );
  }

  return cn(
    'border border-white/15 bg-zinc-950/85',
    selected
      ? 'border-amber-500/50 bg-amber-500/15 shadow-[0_0_0_1px_rgba(245,158,11,0.15)]'
      : 'hover:border-white/25 hover:bg-zinc-950',
    dragging ? 'opacity-70 ring-2 ring-amber-300/40' : ''
  );
}

function getBlockSummaryLabel(block: DisplayLayoutBlockConfig) {
  return `${getPlacementLabel(block)} • ${getRowsPerSlideLabel(block)} • ${getContentColumnsLabel(block)}`;
}

function getSlotOptions(): Array<{ label: string; value: DisplayLayoutBlockSlot }> {
  return [
    { label: 'Full row', value: 'full' },
    { label: 'Top half', value: 'top' },
    { label: 'Bottom half', value: 'bottom' }
  ];
}

function createFormValues(
  displayPage: DisplayPageRecord,
  layoutConfig: DisplayLayoutConfig
): DisplayPageFormValues {
  return {
    name: displayPage.name,
    slug: displayPage.slug,
    description: displayPage.description ?? undefined,
    resolutionWidth: displayPage.resolutionWidth,
    resolutionHeight: displayPage.resolutionHeight,
    layoutConfig,
    status: displayPage.status
  };
}

function getValidationIssues(layoutConfig: DisplayLayoutConfig) {
  const parsed = displayLayoutConfigSchema.safeParse(layoutConfig);
  return parsed.success ? [] : parsed.error.issues.map((issue) => issue.message);
}

function getDisplayColorError(value: string | null): string | null {
  if (value === null) {
    return null;
  }

  return isDisplayColorHex(value) ? null : 'Enter a valid HEX color like #1A1710';
}

function normalizeWidthSelection(column: number, colSpan: number) {
  if (column === DISPLAY_GRID_COLUMN_COUNT && colSpan === 2) {
    return { column: 2, colSpan: 2 };
  }

  return { column, colSpan };
}

function clampInt(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

function toSafeInt(value: unknown, fallback: number) {
  const nextValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(nextValue) ? Math.trunc(nextValue) : fallback;
}

function toSafeNumber(value: unknown, fallback: number) {
  const nextValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeRowHeights(values: unknown, rowCount: number): number[] {
  const rawValues = Array.isArray(values) ? values : [];
  return Array.from({ length: Math.max(1, rowCount) }, (_, index) =>
    clampNumber(
      toSafeNumber(rawValues[index], 1),
      DISPLAY_GRID_ROW_HEIGHT_MIN,
      DISPLAY_GRID_ROW_HEIGHT_MAX
    )
  );
}

function BlockListItem({
  block,
  selected,
  onSelect
}: {
  block: DisplayLayoutBlockConfig;
  selected: boolean;
  onSelect: (key: DisplayBlockKey) => void;
}) {
  const definition = getBlockDefinition(block.key);

  return (
    <button
      type='button'
      onClick={() => onSelect(block.key)}
      className={cn(
        'flex w-full flex-col gap-2 border p-3 text-left transition-colors !rounded-none',
        selected
          ? 'border-amber-500/40 bg-amber-500/10 text-foreground shadow-[0_0_0_1px_rgba(245,158,11,0.12)]'
          : 'border-border/60 bg-card/80 text-foreground hover:border-border hover:bg-muted/30'
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <Icons.gripVertical className='size-4 shrink-0 text-muted-foreground' />
            <div className='truncate text-sm font-semibold'>{definition.label}</div>
          </div>
          <div className='mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground'>
            <span className='truncate'>
              {definition.headerOnly ? 'Header-only block' : getPlacementLabel(block)}
            </span>
            <span className='text-muted-foreground'>•</span>
            <span>{getRowsPerSlideLabel(block)}</span>
            {!definition.headerOnly ? (
              <>
                <span className='text-muted-foreground'>•</span>
                <span>{getContentColumnsLabel(block)}</span>
              </>
            ) : null}
          </div>
        </div>

        <Badge
          variant='outline'
          className={cn(
            '!rounded-none whitespace-nowrap border px-1.5 py-[2px] text-[9px]',
            block.enabled
              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
              : 'border-border/60 bg-muted/30 text-muted-foreground'
          )}
        >
          {block.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5 text-[10px] text-muted-foreground'>
          {definition.headerOnly ? (
            <Badge
              variant='outline'
              className='!rounded-none border-amber-400/30 bg-amber-500/10 px-1.5 py-[2px] text-[9px] text-amber-100'
            >
              Header only
            </Badge>
          ) : (
            <>
              <span>C{block.column}</span>
              <span>R{block.row}</span>
              <span>W{block.colSpan}</span>
              <span>H{block.rowSpan}</span>
              <span>{getContentColumnsLabel(block)}</span>
            </>
          )}
        </div>
        <Badge
          variant='outline'
          className='!rounded-none border-border/60 bg-muted/30 px-1.5 py-[2px] text-[9px] text-muted-foreground'
        >
          {getRowsPerSlideLabel(block)}
        </Badge>
      </div>
    </button>
  );
}

function LayoutDropOverlay({
  rowCount,
  rowHeights,
  activeKey,
  columnTemplate
}: {
  rowCount: number;
  rowHeights: number[];
  activeKey: DisplayBlockKey | null;
  columnTemplate: string;
}) {
  const cells = useMemo(() => {
    return Array.from({ length: DISPLAY_GRID_ROW_MAX }).flatMap((_, rowIndex) =>
      Array.from({ length: DISPLAY_GRID_COLUMN_COUNT }).map((__, columnIndex) => ({
        row: rowIndex + 1,
        column: columnIndex + 1,
        rowStart: rowIndex * 2 + 1
      }))
    );
  }, []);

  const logicalVisibleRowCount = Math.min(DISPLAY_GRID_ROW_MAX, Math.max(1, rowCount + 1));
  const overlayRowHeights = useMemo(
    () =>
      expandDisplayLayoutRowsForSlots(rowHeights)
        .slice(0, DISPLAY_GRID_ROW_MAX * 2)
        .map((value) => value),
    [rowHeights]
  );

  return (
    <div
      className={cn(
        'absolute inset-0 z-30 grid gap-2',
        activeKey ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      style={{
        gridTemplateColumns: columnTemplate,
        gridTemplateRows: overlayRowHeights.map((value) => `${value}fr`).join(' ')
      }}
    >
      {cells.map((cell) => {
        const cellId = `cell-${cell.row}-${cell.column}`;
        const { setNodeRef, isOver } = useDroppable({ id: cellId });
        const isVisible = cell.row <= logicalVisibleRowCount;

        return (
          <div
            key={cellId}
            ref={setNodeRef}
            style={{
              gridColumn: `${cell.column} / span 1`,
              gridRow: `${cell.rowStart} / span 2`
            }}
            className={cn(
              'relative flex min-h-0 items-center justify-center border border-dashed !rounded-none transition-colors',
              isVisible && activeKey
                ? 'border-border/30 bg-transparent'
                : 'border-transparent bg-transparent',
              !isVisible ? 'opacity-0' : '',
              isOver ? 'border-amber-300/70 bg-amber-500/10' : ''
            )}
          >
            <div
              className={cn(
                'pointer-events-none text-[9px] text-muted-foreground transition-opacity',
                activeKey && isVisible ? 'opacity-100' : 'opacity-0',
                isOver ? 'text-amber-200' : ''
              )}
            >
              Drop
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DraggableBlockCard({
  block,
  selected,
  onSelect,
  transparentPanels,
  colors
}: {
  block: DisplayLayoutBlockConfig;
  selected: boolean;
  onSelect: (key: DisplayBlockKey) => void;
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const definition = getBlockDefinition(block.key);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.key
  });
  const cardStyle: CSSProperties = {
    backgroundColor: colors.cardBackground
      ? hexToRgba(colors.cardBackground, transparentPanels ? 0.78 : 1)
      : transparentPanels
        ? 'rgba(9, 9, 11, 0.85)'
        : 'rgb(9, 9, 11)',
    borderColor:
      colors.cardBorder ??
      (transparentPanels ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.15)')
  };

  const style = {
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...cardStyle }}
      className={cn(
        'relative z-10 flex h-full min-h-[5.5rem] cursor-default flex-col justify-between border px-3 py-2 shadow-sm transition-colors !rounded-none',
        getDesignerPreviewBlockClass(transparentPanels, selected, isDragging)
      )}
      onClick={() => onSelect(block.key)}
    >
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <div className='truncate text-sm font-semibold !text-[color:var(--display-card-title-text,#f8f4e8)]'>
            {definition.label}
          </div>
          <div className='mt-0.5 text-[10px] !text-[color:var(--display-card-heading-text,#d1b56a)]'>
            {getPlacementLabel(block)}
          </div>
        </div>

        <button
          type='button'
          className='inline-flex size-7 items-center justify-center border border-white/10 bg-white/5 !text-[color:var(--display-card-body-text,#f8f4e8)] transition-colors hover:border-white/20 hover:bg-white/10 !rounded-none'
          aria-label={`Drag ${definition.label}`}
          {...attributes}
          {...listeners}
        >
          <Icons.gripVertical className='size-4' />
        </button>
      </div>

      <div className='mt-2 flex items-center justify-between gap-2 text-[10px] !text-[color:var(--display-card-body-text,#f8f4e8)]'>
        <span>{getRowsPerSlideLabel(block)}</span>
        <Badge
          variant='outline'
          className={cn(
            '!rounded-none px-1.5 py-[2px] text-[9px]',
            block.enabled
              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
              : 'border-white/10 bg-white/5 text-zinc-300'
          )}
        >
          {block.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </div>

      <div className='mt-1 flex flex-wrap gap-1 text-[9px] !text-[color:var(--display-card-heading-text,#d1b56a)]'>
        {definition.headerOnly ? (
          <Badge
            variant='outline'
            className='!rounded-none border-amber-400/30 bg-amber-500/10 px-1.5 py-[2px] text-[9px] text-amber-100'
          >
            Header only
          </Badge>
        ) : (
          <>
            <span>C{block.column}</span>
            <span>R{block.row}</span>
            <span>W{block.colSpan}</span>
          </>
        )}
      </div>
    </div>
  );
}

function DesignerFieldLabel({ children }: { children: ReactNode }) {
  return <div className='text-xs font-medium text-muted-foreground'>{children}</div>;
}

function DisplayColorField({
  label,
  value,
  error,
  onChange
}: {
  label: string;
  value: string | null;
  error?: string;
  onChange: (value: string | null) => void;
}) {
  const hasValidColor = value ? isDisplayColorHex(value) : false;

  return (
    <div className='grid gap-1.5'>
      <DesignerFieldLabel>{label}</DesignerFieldLabel>
      <div className='flex items-center gap-2'>
        <div
          className={cn(
            'size-5 shrink-0 border',
            hasValidColor ? 'border-border/70' : 'border-border/40 bg-muted/30'
          )}
          style={hasValidColor && value ? ({ backgroundColor: value } as CSSProperties) : undefined}
        />
        <Input
          type='text'
          placeholder='#111418'
          value={value ?? ''}
          onChange={(event) => {
            const next = event.target.value.trim();
            onChange(next ? next : null);
          }}
          className={cn(error ? 'border-rose-500/60 focus-visible:ring-rose-500/30' : '')}
        />
      </div>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-[10px] text-muted-foreground'>
          Leave empty to use the default display theme color.
        </p>
        {error ? <p className='text-[10px] text-rose-500'>{error}</p> : null}
      </div>
    </div>
  );
}

export function DisplayLayoutDesignerClient({ displayPage }: DisplayLayoutDesignerClientProps) {
  const router = useRouter();
  const wallpaperInputRef = useRef<HTMLInputElement>(null);
  const [layoutConfig, setLayoutConfig] = useState<DisplayLayoutConfig>(() =>
    normalizeDisplayLayoutConfig(displayPage.layoutConfig)
  );
  const [selectedKey, setSelectedKey] = useState<DisplayBlockKey>(() => {
    return (
      normalizeDisplayLayoutConfig(displayPage.layoutConfig).blocks[0]?.key ?? DISPLAY_BLOCKS[0].key
    );
  });
  const [activeKey, setActiveKey] = useState<DisplayBlockKey | null>(null);
  const [isWallpaperUploading, setIsWallpaperUploading] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = createFormValues(displayPage, layoutConfig);
      const parsed = displayPageSchema.safeParse(payload);

      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? 'Layout is invalid');
      }

      return updateDisplayPage(displayPage.id, parsed.data);
    },
    onSuccess: (response) => {
      toast.success('Layout saved');
      setLayoutConfig(response.displayPage.layoutConfig);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to save layout');
    }
  });

  const validationIssues = useMemo(() => getValidationIssues(layoutConfig), [layoutConfig]);
  const appearance = layoutConfig.appearance ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE;
  const transparentPanels = appearance.transparentPanels;
  const appearanceColors =
    layoutConfig.appearance?.colors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors;
  const appearanceColorErrors = useMemo(
    () => ({
      headerBackground: getDisplayColorError(appearanceColors.headerBackground),
      headerText: getDisplayColorError(appearanceColors.headerText),
      headerMutedText: getDisplayColorError(appearanceColors.headerMutedText),
      cardBackground: getDisplayColorError(appearanceColors.cardBackground),
      cardBorder: getDisplayColorError(appearanceColors.cardBorder),
      cardTitleText: getDisplayColorError(appearanceColors.cardTitleText),
      cardHeadingText: getDisplayColorError(appearanceColors.cardHeadingText),
      cardBodyText: getDisplayColorError(appearanceColors.cardBodyText),
      cardDivider: getDisplayColorError(appearanceColors.cardDivider)
    }),
    [appearanceColors]
  );
  const selectedBlock = useMemo(
    () =>
      layoutConfig.blocks.find((block) => block.key === selectedKey) ??
      layoutConfig.blocks[0] ??
      getDefaultDisplayLayoutConfig().blocks[0],
    [layoutConfig, selectedKey]
  );
  const selectedDefinition = getBlockDefinition(selectedBlock.key);
  const canEditContentColumns =
    !selectedDefinition.headerOnly && selectedBlock.key !== 'movieSchedule';
  const columnTotal =
    layoutConfig.columns.left + layoutConfig.columns.center + layoutConfig.columns.right;
  const background = layoutConfig.background ?? DEFAULT_DISPLAY_LAYOUT_BACKGROUND;

  const gridBlocks = useMemo(
    () =>
      layoutConfig.blocks
        .filter((block) => block.enabled && !isHeaderOnlyDisplayBlock(block.key))
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
        }),
    [layoutConfig]
  );

  const maxGridRowUsed = useMemo(() => {
    return gridBlocks.reduce(
      (highest, block) => Math.max(highest, block.row + (block.rowSpan || 1) - 1),
      1
    );
  }, [gridBlocks]);
  const estimatedHeaderHeight = 88;
  const estimatedAvailableHeight = Math.max(
    0,
    displayPage.resolutionHeight - estimatedHeaderHeight - 32
  );
  const previewRows = Math.max(1, maxGridRowUsed);
  const previewGridRows = Math.min(DISPLAY_GRID_ROW_MAX, previewRows);
  const previewRowHeights = useMemo(
    () => normalizeRowHeights(layoutConfig.rows?.heights, previewGridRows),
    [layoutConfig.rows?.heights, previewGridRows]
  );
  const previewSubRowHeights = useMemo(
    () => expandDisplayLayoutRowsForSlots(previewRowHeights),
    [previewRowHeights]
  );
  const previewRowTemplate = useMemo(
    () => previewSubRowHeights.map((value) => `${value}fr`).join(' '),
    [previewSubRowHeights]
  );
  const previewRowWeightTotal = previewRowHeights.reduce((sum, value) => sum + value, 0);
  const estimatedRowUnitHeight = Math.max(
    1,
    Math.round(estimatedAvailableHeight / Math.max(1, previewRowWeightTotal))
  );
  const hasDenseLayout = maxGridRowUsed > 8;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  const updateLayoutColumns = (key: keyof DisplayLayoutColumns, value: number) => {
    setLayoutConfig((current) => ({
      ...current,
      columns: {
        ...current.columns,
        [key]: clampInt(value, 20, 60)
      }
    }));
  };

  const updateRowHeights = (updater: (current: number[]) => number[]) => {
    setLayoutConfig((current) =>
      normalizeDisplayLayoutConfig({
        ...current,
        rows: {
          heights: updater(current.rows?.heights ?? [])
        }
      })
    );
  };

  const updateBackground = (
    updater: (current: DisplayLayoutBackgroundConfig) => DisplayLayoutBackgroundConfig
  ) => {
    setLayoutConfig((current) =>
      normalizeDisplayLayoutConfig({
        ...current,
        background: updater(current.background ?? DEFAULT_DISPLAY_LAYOUT_BACKGROUND)
      })
    );
  };

  const updateAppearance = (
    updater: (current: DisplayLayoutAppearanceConfig) => DisplayLayoutAppearanceConfig
  ) => {
    setLayoutConfig((current) =>
      normalizeDisplayLayoutConfig({
        ...current,
        appearance: updater(current.appearance ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE)
      })
    );
  };

  const updateAppearanceColors = (
    updater: (current: DisplayLayoutAppearanceColorsConfig) => DisplayLayoutAppearanceColorsConfig
  ) => {
    setLayoutConfig((current) => ({
      ...current,
      appearance: {
        ...(current.appearance ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE),
        colors: updater(
          (current.appearance ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE).colors ??
            DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
        )
      }
    }));
  };

  const handleWallpaperUpload = async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Wallpaper must be a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Wallpaper image must be 5MB or smaller.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsWallpaperUploading(true);
    try {
      const response = await fetch('/api/display-pages/wallpaper-upload', {
        method: 'POST',
        body: formData
      });
      const data = (await response.json().catch(() => null)) as {
        imageUrl?: string;
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message ?? 'Failed to upload wallpaper');
      }

      const imageUrl = typeof data?.imageUrl === 'string' ? data.imageUrl : null;

      if (!imageUrl) {
        throw new Error('Wallpaper upload did not return a file URL');
      }

      updateBackground((current) => ({
        ...current,
        imageUrl
      }));

      toast.success('Wallpaper uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload wallpaper');
    } finally {
      setIsWallpaperUploading(false);
      if (wallpaperInputRef.current) {
        wallpaperInputRef.current.value = '';
      }
    }
  };

  const applyRowHeightPreset = (preset: 'equal' | 'top' | 'middle' | 'bottom') => {
    updateRowHeights((current) => {
      const next = normalizeRowHeights(current, previewGridRows);

      if (preset === 'equal') {
        return Array.from({ length: previewGridRows }, () => 1);
      }

      if (previewGridRows === 1) {
        return [1.3];
      }

      const updated = next.map(() => 1);
      const targetIndex =
        preset === 'top'
          ? 0
          : preset === 'middle'
            ? Math.floor((previewGridRows - 1) / 2)
            : previewGridRows - 1;

      updated[targetIndex] = 1.3;
      return updated;
    });
  };

  const handleBlockChange = (
    key: DisplayBlockKey,
    updater: (block: DisplayLayoutBlockConfig) => DisplayLayoutBlockConfig
  ) => {
    setLayoutConfig((current) =>
      normalizeDisplayLayoutConfig({
        ...current,
        blocks: current.blocks.map((block) => (block.key === key ? updater(block) : block))
      })
    );
    setSelectedKey(key);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveKey(event.active.id as DisplayBlockKey);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveKey(null);

    if (!over) {
      return;
    }

    const blockKey = active.id as DisplayBlockKey;
    const block = layoutConfig.blocks.find((item) => item.key === blockKey);
    if (!block || isHeaderOnlyDisplayBlock(block.key)) {
      return;
    }

    const match = String(over.id).match(/^cell-(\d+)-(\d+)$/);
    if (!match) {
      return;
    }

    const row = Math.min(DISPLAY_GRID_ROW_MAX, Math.max(DISPLAY_GRID_ROW_MIN, Number(match[1])));
    const dropColumn = Math.min(DISPLAY_GRID_COLUMN_COUNT, Math.max(1, Number(match[2])));
    const normalizedPlacement = normalizeWidthSelection(dropColumn, block.colSpan);

    const nextBlocks = layoutConfig.blocks.map((item) =>
      item.key === block.key
        ? {
            ...item,
            column: normalizedPlacement.column,
            row,
            colSpan: normalizedPlacement.colSpan
          }
        : item
    );
    const nextLayoutConfig = normalizeDisplayLayoutConfig({
      ...layoutConfig,
      blocks: nextBlocks
    });
    const parsed = displayLayoutConfigSchema.safeParse(nextLayoutConfig);

    if (!parsed.success) {
      toast.error('This position is already occupied.');
      return;
    }

    setLayoutConfig(nextLayoutConfig);
    setSelectedKey(block.key);
  };

  const resetLayout = () => {
    if (!window.confirm('Reset the layout to the default TV arrangement?')) {
      return;
    }

    const nextLayout = getDefaultDisplayLayoutConfig();
    setLayoutConfig(nextLayout);
    setSelectedKey(nextLayout.blocks[0]?.key ?? DISPLAY_BLOCKS[0].key);
    toast.success('Layout reset to defaults');
  };

  const saveLayout = async () => {
    const parsed = displayPageSchema.safeParse(createFormValues(displayPage, layoutConfig));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Please fix layout errors before saving');
      return;
    }

    await saveMutation.mutateAsync();
  };

  const openPublicDisplayUrl = createDisplayPageUrl(displayPage.slug);
  const columns = layoutConfig.columns;
  const columnTemplate = `${columns.left}fr ${columns.center}fr ${columns.right}fr`;

  return (
    <div className='flex flex-col gap-4'>
      <Card className='border-border/60 bg-card/90 shadow-sm'>
        <CardHeader className='gap-2'>
          <div className='flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-2xl tracking-tight text-foreground'>
                Display Layout Designer
              </CardTitle>
              <CardDescription className='max-w-3xl text-muted-foreground'>
                Visual layout editor for{' '}
                <span className='font-medium text-foreground'>{displayPage.name}</span>. Drag cards
                on the grid, adjust placement and rows per slide, and save the same layout JSON the
                public display already uses.
              </CardDescription>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge variant='outline' className='border-border/60 bg-muted/40 text-foreground'>
                  {displayPage.resolutionWidth}x{displayPage.resolutionHeight}
                </Badge>
                <Badge variant='outline' className='border-border/60 bg-muted/40 text-foreground'>
                  Cols {columns.left}/{columns.center}/{columns.right}
                </Badge>
                <Badge variant='outline' className='border-border/60 bg-muted/40 text-foreground'>
                  {displayPage.status}
                </Badge>
                <Badge variant='outline' className='border-border/60 bg-muted/40 text-foreground'>
                  {displayPage.slug}
                </Badge>
              </div>
            </div>

            <div className='flex flex-wrap items-center justify-start gap-2 xl:justify-end'>
              <Button variant='outline' onClick={() => router.push('/dashboard/display-pages')}>
                <Icons.chevronLeft className='mr-2 size-4' />
                Back
              </Button>

              <Button asChild variant='outline'>
                <Link href={openPublicDisplayUrl} target='_blank' rel='noreferrer'>
                  <Icons.externalLink className='mr-2 size-4' />
                  Open Public Display
                </Link>
              </Button>

              <Button variant='outline' onClick={resetLayout}>
                <Icons.refresh className='mr-2 size-4' />
                Reset to Default Layout
              </Button>

              <Button
                onClick={saveLayout}
                isLoading={saveMutation.isPending}
                disabled={validationIssues.length > 0}
              >
                <Icons.check className='mr-2 size-4' />
                Save Layout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {validationIssues.length > 0 ? (
        <Card className='border-destructive/30 bg-destructive/10 shadow-sm'>
          <CardContent className='flex items-start gap-2 p-4 text-sm text-destructive'>
            <Icons.warning className='mt-0.5 size-4 shrink-0' />
            <div className='space-y-1'>
              <div className='font-medium'>Layout validation needs attention</div>
              <ul className='list-disc space-y-0.5 pl-4 text-xs text-destructive/90'>
                {validationIssues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className='grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]'>
        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg text-foreground'>Blocks</CardTitle>
            <CardDescription className='text-muted-foreground'>
              Choose a block to inspect or edit its placement.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            {layoutConfig.blocks.map((block) => {
              return (
                <BlockListItem
                  key={block.key}
                  block={block}
                  selected={block.key === selectedKey}
                  onSelect={setSelectedKey}
                />
              );
            })}
          </CardContent>
        </Card>

        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg text-foreground'>TV Preview</CardTitle>
            <CardDescription className='text-muted-foreground'>
              Drag a block by its handle and drop it into a grid cell. The preview uses the same
              3-column widths as the public display.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div className='space-y-1'>
                  <div className='text-sm font-medium text-foreground'>TV Column Widths</div>
                  <p className='text-xs text-muted-foreground'>
                    Adjust the public TV columns. The three values must total 100%.
                  </p>
                </div>
                <div
                  className={cn(
                    'text-xs font-medium',
                    columnTotal === 100 ? 'text-foreground' : 'text-destructive'
                  )}
                >
                  Current total: {columnTotal}%
                </div>
              </div>

              <div className='mt-3 grid gap-3 md:grid-cols-3'>
                {(
                  [
                    ['left', 'Left Column %'],
                    ['center', 'Center Column %'],
                    ['right', 'Right Column %']
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className='grid gap-1.5'>
                    <DesignerFieldLabel>{label}</DesignerFieldLabel>
                    <Input
                      type='number'
                      min={20}
                      max={60}
                      step={1}
                      value={columns[key]}
                      onChange={(event) =>
                        updateLayoutColumns(key, toSafeInt(event.target.value, columns[key]))
                      }
                    />
                  </div>
                ))}
              </div>

              {columnTotal !== 100 ? (
                <div className='mt-2 text-xs text-destructive'>Column widths must total 100%.</div>
              ) : null}
            </div>

            <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div className='space-y-1'>
                  <div className='text-sm font-medium text-foreground'>TV Row Heights</div>
                  <p className='text-xs text-muted-foreground'>
                    Adjust vertical space for each TV grid row. A card with Height 2 uses the
                    combined height of two rows.
                  </p>
                </div>
                <div className='text-xs text-muted-foreground'>
                  Example: If Row 1 is 2 and Row 2 is 1, Row 1 gets double the vertical space of Row
                  2.
                </div>
              </div>

              <div className='mt-3 flex flex-wrap gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => applyRowHeightPreset('equal')}
                >
                  Equal Rows
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => applyRowHeightPreset('top')}
                >
                  Top Heavy
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => applyRowHeightPreset('middle')}
                >
                  Middle Heavy
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => applyRowHeightPreset('bottom')}
                >
                  Bottom Heavy
                </Button>
              </div>

              <div className='mt-3 grid gap-3 md:grid-cols-3'>
                {previewRowHeights.map((value, index) => (
                  <div key={`row-height-${index}`} className='grid gap-1.5'>
                    <DesignerFieldLabel>Row {index + 1} Height</DesignerFieldLabel>
                    <Input
                      type='number'
                      min={DISPLAY_GRID_ROW_HEIGHT_MIN}
                      max={DISPLAY_GRID_ROW_HEIGHT_MAX}
                      step={0.1}
                      value={value}
                      onChange={(event) => {
                        const nextValue = clampNumber(
                          toSafeNumber(event.target.value, value),
                          DISPLAY_GRID_ROW_HEIGHT_MIN,
                          DISPLAY_GRID_ROW_HEIGHT_MAX
                        );

                        updateRowHeights((current) => {
                          const normalized = normalizeRowHeights(current, previewGridRows);
                          normalized[index] = nextValue;
                          return normalized;
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className='mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground'>
                <span>TV grid rows used: {previewGridRows}</span>
                <span>Approx card row height: {estimatedRowUnitHeight}px per 1fr</span>
                <span>A card with Height 2 uses about {estimatedRowUnitHeight * 2}px.</span>
                <span>Values are relative. 2 is twice the height of 1.</span>
              </div>
            </div>

            <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
              <div className='flex items-start justify-between gap-3'>
                <div className='space-y-1'>
                  <div className='text-sm font-medium text-foreground'>
                    Transparent Header & Cards
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    When enabled, display header and cards use translucent panels. Turn off for
                    solid panels on low-quality LCDs.
                  </p>
                </div>
                <Switch
                  checked={transparentPanels}
                  onCheckedChange={(checked) =>
                    updateAppearance((current) => ({
                      ...current,
                      transparentPanels: checked
                    }))
                  }
                />
              </div>
            </div>

            <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div className='space-y-1'>
                  <div className='text-sm font-medium text-foreground'>Display Colors</div>
                  <p className='text-xs text-muted-foreground'>
                    Leave empty to use the default display theme color.
                  </p>
                </div>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    updateAppearanceColors((current) => ({
                      ...current,
                      headerBackground: null,
                      headerText: null,
                      headerMutedText: null,
                      cardBackground: null,
                      cardBorder: null,
                      cardTitleText: null,
                      cardHeadingText: null,
                      cardBodyText: null,
                      cardDivider: null
                    }))
                  }
                >
                  Reset Colors
                </Button>
              </div>

              <div className='mt-3 grid gap-4'>
                <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
                  <div className='mb-3'>
                    <div className='text-sm font-medium text-foreground'>Header Colors</div>
                    <p className='text-xs text-muted-foreground'>
                      Leave empty to use the default display theme color.
                    </p>
                  </div>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <DisplayColorField
                      label='Header Background HEX'
                      value={appearanceColors.headerBackground}
                      error={appearanceColorErrors.headerBackground ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({
                          ...current,
                          headerBackground: value
                        }))
                      }
                    />
                    <DisplayColorField
                      label='Header Main Text HEX'
                      value={appearanceColors.headerText}
                      error={appearanceColorErrors.headerText ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({ ...current, headerText: value }))
                      }
                    />
                    <DisplayColorField
                      label='Header Muted Text HEX'
                      value={appearanceColors.headerMutedText}
                      error={appearanceColorErrors.headerMutedText ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({
                          ...current,
                          headerMutedText: value
                        }))
                      }
                    />
                  </div>
                </div>

                <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
                  <div className='mb-3'>
                    <div className='text-sm font-medium text-foreground'>Card Colors</div>
                    <p className='text-xs text-muted-foreground'>
                      Leave empty to use the default display theme color.
                    </p>
                  </div>
                  <div className='grid gap-3 md:grid-cols-2'>
                    <DisplayColorField
                      label='Card Background HEX'
                      value={appearanceColors.cardBackground}
                      error={appearanceColorErrors.cardBackground ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({ ...current, cardBackground: value }))
                      }
                    />
                    <DisplayColorField
                      label='Card Border HEX'
                      value={appearanceColors.cardBorder}
                      error={appearanceColorErrors.cardBorder ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({ ...current, cardBorder: value }))
                      }
                    />
                    <DisplayColorField
                      label='Card Title Text HEX'
                      value={appearanceColors.cardTitleText}
                      error={appearanceColorErrors.cardTitleText ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({ ...current, cardTitleText: value }))
                      }
                    />
                    <DisplayColorField
                      label='Card Heading Text HEX'
                      value={appearanceColors.cardHeadingText}
                      error={appearanceColorErrors.cardHeadingText ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({
                          ...current,
                          cardHeadingText: value
                        }))
                      }
                    />
                    <DisplayColorField
                      label='Card Body Content HEX'
                      value={appearanceColors.cardBodyText}
                      error={appearanceColorErrors.cardBodyText ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({ ...current, cardBodyText: value }))
                      }
                    />
                    <DisplayColorField
                      label='Card Divider Lines HEX'
                      value={appearanceColors.cardDivider}
                      error={appearanceColorErrors.cardDivider ?? undefined}
                      onChange={(value) =>
                        updateAppearanceColors((current) => ({ ...current, cardDivider: value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div className='space-y-1'>
                  <div className='text-sm font-medium text-foreground'>TV Wallpaper</div>
                  <p className='text-xs text-muted-foreground'>
                    Optional wallpaper shown behind the TV preview and public display content.
                  </p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <Badge variant='outline' className='border-border/60 bg-muted/40 text-foreground'>
                    {getBackgroundLabel(background)}
                  </Badge>
                  {background.imageUrl ? (
                    <>
                      <Badge
                        variant='outline'
                        className='border-border/60 bg-muted/40 text-foreground'
                      >
                        {getBackgroundFitLabel(background.fit)}
                      </Badge>
                      <Badge
                        variant='outline'
                        className='border-border/60 bg-muted/40 text-foreground'
                      >
                        {getBackgroundPositionLabel(background.position)}
                      </Badge>
                    </>
                  ) : null}
                </div>
              </div>

              <input
                ref={wallpaperInputRef}
                type='file'
                accept='image/jpeg,image/png,image/webp'
                className='hidden'
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void handleWallpaperUpload(file);
                  }
                }}
              />

              <div className='mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]'>
                <div className='grid gap-1.5'>
                  <DesignerFieldLabel>Background Image URL</DesignerFieldLabel>
                  <Input
                    type='url'
                    placeholder='/uploads/display-wallpapers/cinema-lobby.webp'
                    value={background.imageUrl ?? ''}
                    onChange={(event) =>
                      updateBackground((current) => ({
                        ...current,
                        imageUrl: event.target.value.trim() ? event.target.value.trim() : null
                      }))
                    }
                  />
                </div>

                <div className='flex flex-wrap items-end gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => wallpaperInputRef.current?.click()}
                    isLoading={isWallpaperUploading}
                  >
                    <Icons.upload className='mr-2 size-4' />
                    Upload Background Image
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      updateBackground((current) => ({
                        ...current,
                        imageUrl: null
                      }))
                    }
                    disabled={!background.imageUrl}
                  >
                    <Icons.trash className='mr-2 size-4' />
                    Clear Background
                  </Button>
                </div>
              </div>

              <div className='mt-3 grid gap-3 md:grid-cols-3'>
                <div className='grid gap-1.5'>
                  <DesignerFieldLabel>Fit</DesignerFieldLabel>
                  <Select
                    value={background.fit}
                    onValueChange={(value) =>
                      updateBackground((current) => ({
                        ...current,
                        fit:
                          value === 'contain' || value === 'fill' || value === 'cover'
                            ? value
                            : current.fit
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Fit' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cover'>Cover</SelectItem>
                      <SelectItem value='contain'>Contain</SelectItem>
                      <SelectItem value='fill'>Fill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='grid gap-1.5'>
                  <DesignerFieldLabel>Position</DesignerFieldLabel>
                  <Select
                    value={background.position}
                    onValueChange={(value) =>
                      updateBackground((current) => ({
                        ...current,
                        position:
                          value === 'top' || value === 'bottom' || value === 'center'
                            ? value
                            : current.position
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Position' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='center'>Center</SelectItem>
                      <SelectItem value='top'>Top</SelectItem>
                      <SelectItem value='bottom'>Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='grid gap-1.5'>
                  <DesignerFieldLabel>Image Opacity</DesignerFieldLabel>
                  <Input
                    type='number'
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={background.opacity}
                    onChange={(event) =>
                      updateBackground((current) => ({
                        ...current,
                        opacity: clampNumber(
                          toSafeNumber(event.target.value, current.opacity),
                          0.1,
                          1
                        )
                      }))
                    }
                  />
                </div>
              </div>

              <div className='mt-3 grid gap-3 md:grid-cols-2'>
                <div className='grid gap-1.5'>
                  <DesignerFieldLabel>Overlay Opacity</DesignerFieldLabel>
                  <Input
                    type='number'
                    min={0}
                    max={0.9}
                    step={0.05}
                    value={background.overlayOpacity}
                    onChange={(event) =>
                      updateBackground((current) => ({
                        ...current,
                        overlayOpacity: clampNumber(
                          toSafeNumber(event.target.value, current.overlayOpacity),
                          0,
                          0.9
                        )
                      }))
                    }
                  />
                </div>

                <div className='grid gap-1.5'>
                  <DesignerFieldLabel>Blur</DesignerFieldLabel>
                  <Input
                    type='number'
                    min={0}
                    max={DISPLAY_LAYOUT_BACKGROUND_BLUR_MAX}
                    step={0.5}
                    value={background.blur}
                    onChange={(event) =>
                      updateBackground((current) => ({
                        ...current,
                        blur: clampNumber(
                          toSafeNumber(event.target.value, current.blur),
                          0,
                          DISPLAY_LAYOUT_BACKGROUND_BLUR_MAX
                        )
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={() => setActiveKey(null)}
            >
              <div
                className={cn(
                  'mx-auto overflow-hidden border p-2 !rounded-none',
                  getDisplaySurfaceClass(transparentPanels)
                )}
                style={{
                  ...getDisplayColorSurfaceStyle(transparentPanels, appearanceColors),
                  ...getDisplayPanelStyle(transparentPanels, appearanceColors),
                  width: `min(100%, calc(58vh * ${displayPage.resolutionWidth / displayPage.resolutionHeight}))`,
                  aspectRatio: `${displayPage.resolutionWidth} / ${displayPage.resolutionHeight}`
                }}
              >
                <div className='relative flex h-full min-h-0 flex-col overflow-hidden !rounded-none bg-zinc-950/90'>
                  {background.imageUrl ? (
                    <div className='pointer-events-none absolute inset-0'>
                      <Image
                        src={background.imageUrl}
                        alt=''
                        fill
                        unoptimized
                        sizes='100vw'
                        className='select-none object-cover'
                        style={{
                          objectFit: background.fit,
                          objectPosition: getBackgroundObjectPosition(background.position),
                          opacity: background.opacity,
                          filter: background.blur > 0 ? `blur(${background.blur}px)` : 'none'
                        }}
                      />
                    </div>
                  ) : null}
                  {background.imageUrl ? (
                    <div
                      className='pointer-events-none absolute inset-0 bg-slate-950'
                      style={{ opacity: background.overlayOpacity }}
                    />
                  ) : null}

                  <div
                    className={cn(
                      'relative z-10 flex h-16 shrink-0 items-center justify-between gap-4 px-3',
                      getDisplayHeaderSurfaceClass(transparentPanels)
                    )}
                    style={getDisplayHeaderStyle(transparentPanels, appearanceColors)}
                  >
                    <div className='flex items-center gap-2'>
                      <div className='text-sm font-semibold tracking-[0.28em] !text-[color:var(--display-header-text,#f8f4e8)]'>
                        CUE
                      </div>
                      <div className='text-[10px] uppercase tracking-[0.22em] !text-[color:var(--display-header-muted-text,#d1b56a)]'>
                        Header preview
                      </div>
                    </div>
                    <div className='flex items-center gap-3 text-[10px] !text-[color:var(--display-header-muted-text,#d1b56a)]'>
                      <span>Time</span>
                      <span>Date</span>
                    </div>
                    <div className='flex items-center gap-2 text-[10px] !text-[color:var(--display-header-muted-text,#d1b56a)]'>
                      <span>Weather</span>
                      <span>Alerts</span>
                    </div>
                  </div>

                  <div className='relative z-10 flex min-h-0 flex-1 flex-col p-2'>
                    <div className='relative flex min-h-0 flex-1 flex-col'>
                      <div
                        className='grid gap-2 min-h-0 flex-1'
                        style={{
                          gridTemplateColumns: columnTemplate,
                          gridTemplateRows: previewRowTemplate
                        }}
                      >
                        {gridBlocks.map((block) => {
                          const isActive = activeKey === block.key;
                          const placement = getDisplayBlockGridPlacement(block);
                          return (
                            <div
                              key={block.key}
                              style={{
                                gridColumn: `${block.column} / span ${block.colSpan}`,
                                gridRow: `${placement.rowStart} / span ${placement.rowSpan}`
                              }}
                              className='relative z-10'
                            >
                              <DraggableBlockCard
                                block={block}
                                selected={block.key === selectedKey}
                                transparentPanels={transparentPanels}
                                colors={appearanceColors}
                                onSelect={setSelectedKey}
                              />
                              {isActive ? (
                                <div className='pointer-events-none absolute inset-0 border border-amber-300/70 !rounded-none' />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>

                      <LayoutDropOverlay
                        rowCount={previewGridRows}
                        rowHeights={previewRowHeights}
                        activeKey={activeKey}
                        columnTemplate={columnTemplate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DndContext>

            {hasDenseLayout ? (
              <div className='rounded-none border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-900/90'>
                Some blocks are outside the visible TV area.
              </div>
            ) : null}

            <div className='flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground'>
              <span className='inline-flex items-center gap-1'>
                <span className='size-2 border border-dashed border-border/60 !rounded-none' />
                Empty cell
              </span>
              <span className='inline-flex items-center gap-1'>
                <span className='size-2 bg-amber-500/70 !rounded-none' />
                Current drop target
              </span>
              <span className='inline-flex items-center gap-1'>
                <Icons.gripVertical className='size-3' />
                Drag handle
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-border/60 bg-card/90 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg text-foreground'>Selected Block</CardTitle>
            <CardDescription className='text-muted-foreground'>
              Adjust the currently selected block without touching the public display preview.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {selectedBlock ? (
              <>
                <div className='rounded-none border border-border/60 bg-muted/20 p-3'>
                  <div className='text-sm font-semibold text-foreground'>
                    {getBlockDefinition(selectedBlock.key).label}
                  </div>
                  <div className='mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground'>
                    <span>{getBlockSummaryLabel(selectedBlock)}</span>
                  </div>
                </div>

                <div className='grid gap-3'>
                  <div className='flex items-center justify-between gap-3 rounded-none border border-border/60 bg-muted/30 px-3 py-2'>
                    <div>
                      <div className='text-sm font-medium text-foreground'>Enabled</div>
                      <div className='text-xs text-muted-foreground'>
                        Toggle whether this block appears.
                      </div>
                    </div>
                    <Switch
                      checked={selectedBlock.enabled}
                      onCheckedChange={(checked) =>
                        handleBlockChange(selectedBlock.key, (block) => ({
                          ...block,
                          enabled: checked
                        }))
                      }
                    />
                  </div>

                  {getBlockDefinition(selectedBlock.key).headerOnly ? (
                    <div className='grid gap-3'>
                      <div className='rounded-none border border-amber-400/20 bg-amber-500/10 p-3 text-xs text-amber-100'>
                        Header-only block. It appears in the top header, not inside the TV grid.
                      </div>

                      <div className='grid gap-1.5'>
                        <DesignerFieldLabel>Content Rows / Slide</DesignerFieldLabel>
                        <Input
                          type='number'
                          min={getBlockDefinition(selectedBlock.key).minRowLimit}
                          max={getBlockDefinition(selectedBlock.key).maxRowLimit}
                          step={1}
                          value={selectedBlock.rowLimit}
                          onChange={(event) =>
                            handleBlockChange(selectedBlock.key, (block) => ({
                              ...block,
                              rowLimit: clampInt(
                                toSafeInt(event.target.value, block.rowLimit),
                                getBlockDefinition(block.key).minRowLimit,
                                getBlockDefinition(block.key).maxRowLimit
                              )
                            }))
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='grid gap-3'>
                      <div className='grid gap-2 md:grid-cols-2'>
                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Column</DesignerFieldLabel>
                          <Select
                            value={String(selectedBlock.column)}
                            onValueChange={(value) =>
                              handleBlockChange(selectedBlock.key, (block) => {
                                const column = clampInt(toSafeInt(value, block.column), 1, 3);
                                const normalized = normalizeWidthSelection(column, block.colSpan);
                                return {
                                  ...block,
                                  column: normalized.column,
                                  colSpan: normalized.colSpan
                                };
                              })
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Column' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                              <SelectItem value='3'>3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Start Row</DesignerFieldLabel>
                          <Input
                            type='number'
                            min={1}
                            max={DISPLAY_GRID_ROW_MAX}
                            step={1}
                            value={selectedBlock.row}
                            onChange={(event) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                row: clampInt(
                                  toSafeInt(event.target.value, block.row),
                                  1,
                                  Math.max(
                                    1,
                                    DISPLAY_GRID_ROW_MAX - Math.max(1, block.rowSpan || 1) + 1
                                  )
                                )
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className='grid gap-2 md:grid-cols-2'>
                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Card Width</DesignerFieldLabel>
                          <Select
                            value={String(selectedBlock.colSpan)}
                            onValueChange={(value) =>
                              handleBlockChange(selectedBlock.key, (block) => {
                                const nextSpan = toSafeInt(value, block.colSpan) === 2 ? 2 : 1;
                                if (block.column === DISPLAY_GRID_COLUMN_COUNT && nextSpan === 2) {
                                  return { ...block, column: 2, colSpan: 2 };
                                }

                                return { ...block, colSpan: nextSpan };
                              })
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Width' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='1'>1 column</SelectItem>
                              <SelectItem value='2' disabled={selectedBlock.column === 3}>
                                2 columns
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Cell Slot</DesignerFieldLabel>
                          <Select
                            value={selectedBlock.slot}
                            onValueChange={(value) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                slot: value as DisplayLayoutBlockSlot,
                                rowSpan: value === 'full' ? block.rowSpan : 1
                              }))
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Cell Slot' />
                            </SelectTrigger>
                            <SelectContent>
                              {getSlotOptions().map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className='text-[11px] leading-[1.3] text-muted-foreground'>
                            Cell Slot lets two cards share the same row by using top and bottom
                            halves.
                          </p>
                        </div>
                      </div>

                      <div className='grid gap-2 md:grid-cols-2'>
                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Card Height</DesignerFieldLabel>
                          <Select
                            value={String(selectedBlock.rowSpan)}
                            onValueChange={(value) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                rowSpan: clampInt(
                                  toSafeInt(value, 1),
                                  1,
                                  DISPLAY_GRID_ROW_SPAN_MAX
                                ),
                                slot:
                                  clampInt(toSafeInt(value, 1), 1, DISPLAY_GRID_ROW_SPAN_MAX) > 1
                                    ? 'full'
                                    : block.slot
                              }))
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Card Height' />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: DISPLAY_GRID_ROW_SPAN_MAX }, (_, index) => {
                                const rowCount = index + 1;

                                return (
                                  <SelectItem key={rowCount} value={String(rowCount)}>
                                    {rowCount} row{rowCount === 1 ? '' : 's'}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Content Rows / Slide</DesignerFieldLabel>
                          <Input
                            type='number'
                            min={getBlockDefinition(selectedBlock.key).minRowLimit}
                            max={getBlockDefinition(selectedBlock.key).maxRowLimit}
                            step={1}
                            value={selectedBlock.rowLimit}
                            onChange={(event) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                rowLimit: clampInt(
                                  toSafeInt(event.target.value, block.rowLimit),
                                  getBlockDefinition(block.key).minRowLimit,
                                  getBlockDefinition(block.key).maxRowLimit
                                )
                              }))
                            }
                          />
                        </div>
                      </div>

                      {canEditContentColumns ? (
                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Content Columns</DesignerFieldLabel>
                          <Select
                            value={String(selectedBlock.contentColumns)}
                            onValueChange={(value) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                contentColumns: clampInt(
                                  toSafeInt(value, block.contentColumns),
                                  1,
                                  3
                                )
                              }))
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Content Columns' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='1'>1 column</SelectItem>
                              <SelectItem value='2'>2 columns</SelectItem>
                              <SelectItem value='3'>3 columns</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className='text-[11px] leading-[1.3] text-muted-foreground'>
                            Content Columns splits rows inside the card. Card Width controls the TV
                            grid width.
                          </p>
                        </div>
                      ) : null}

                      <div className='grid gap-1.5'>
                        <p className='text-xs text-muted-foreground'>
                          Start Row controls where the card begins on the TV grid. Card Height
                          controls how many TV rows the card covers vertically. Cell Slot lets two
                          cards share the same row using top and bottom halves. Content Rows / Slide
                          controls how many records show inside the card before slideshow.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className='rounded-none border border-dashed border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground'>
                Select a block to edit its layout settings.
              </div>
            )}

            <div className='rounded-none border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground'>
              <div className='font-medium text-foreground'>Layout rules</div>
              <ul className='mt-1.5 space-y-1.5 pl-4 text-[11px] list-disc'>
                <li>Column widths must total 100%.</li>
                <li>Enabled grid blocks cannot overlap in the same grid area.</li>
                <li>Width 2 blocks cannot start in column 3.</li>
                <li>Cell Slot Top or Bottom only works with Card Height 1.</li>
                <li>Card Height cannot extend beyond layout row 20.</li>
                <li>Start Row is the row where the card begins.</li>
                <li>Content Rows / Slide only controls internal slideshow rows.</li>
                <li>Content Columns splits rows inside the card.</li>
                <li>Header-only blocks stay in the top header.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
