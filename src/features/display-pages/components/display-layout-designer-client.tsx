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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type ReactNode } from 'react';
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
  DISPLAY_GRID_ROW_MAX,
  DISPLAY_GRID_ROW_MIN,
  getDefaultDisplayLayoutConfig,
  isHeaderOnlyDisplayBlock,
  normalizeDisplayLayoutConfig,
  type DisplayBlockDefinition,
  type DisplayBlockKey,
  type DisplayLayoutBlockConfig,
  type DisplayLayoutConfig
} from '../lib/display-layout-config';

interface DisplayLayoutDesignerClientProps {
  displayPage: DisplayPageRecord;
}

function getBlockDefinition(key: DisplayBlockKey): DisplayBlockDefinition {
  return DISPLAY_BLOCKS.find((block) => block.key === key) ?? DISPLAY_BLOCKS[0];
}

function getPlacementLabel(block: DisplayLayoutBlockConfig): string {
  return `C${block.column} • R${block.row} • W${block.colSpan}`;
}

function getRowsPerSlideLabel(block: DisplayLayoutBlockConfig) {
  return `${block.rowLimit} row${block.rowLimit === 1 ? '' : 's'}/slide`;
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

function normalizeWidthSelection(column: number, colSpan: number) {
  if (column === DISPLAY_GRID_COLUMN_COUNT && colSpan === 2) {
    return { column: 2, colSpan: 2 };
  }

  return { column, colSpan };
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
  activeKey,
  columnTemplate
}: {
  rowCount: number;
  activeKey: DisplayBlockKey | null;
  columnTemplate: string;
}) {
  const cells = useMemo(() => {
    return Array.from({ length: rowCount }).flatMap((_, rowIndex) =>
      Array.from({ length: DISPLAY_GRID_COLUMN_COUNT }).map((__, columnIndex) => ({
        row: rowIndex + 1,
        column: columnIndex + 1
      }))
    );
  }, [rowCount]);

  return (
    <div
      className={cn(
        'absolute inset-0 z-30 grid gap-2',
        activeKey ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      style={{
        gridTemplateColumns: columnTemplate,
        gridTemplateRows: `repeat(${rowCount}, minmax(3.5rem, 1fr))`
      }}
    >
      {cells.map((cell) => {
        const cellId = `cell-${cell.row}-${cell.column}`;
        const { setNodeRef, isOver } = useDroppable({ id: cellId });

        return (
          <div
            key={cellId}
            ref={setNodeRef}
            className={cn(
              'relative flex min-h-0 items-center justify-center border border-dashed !rounded-none transition-colors',
              activeKey ? 'border-border/30 bg-transparent' : 'border-transparent bg-transparent',
              isOver ? 'border-amber-300/70 bg-amber-500/10' : ''
            )}
          >
            <div
              className={cn(
                'pointer-events-none text-[9px] text-muted-foreground transition-opacity',
                activeKey ? 'opacity-100' : 'opacity-0',
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
  onSelect
}: {
  block: DisplayLayoutBlockConfig;
  selected: boolean;
  onSelect: (key: DisplayBlockKey) => void;
}) {
  const definition = getBlockDefinition(block.key);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.key
  });

  const style = {
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative z-10 flex h-full min-h-[5.5rem] cursor-default flex-col justify-between border px-3 py-2 shadow-sm transition-colors !rounded-none',
        selected
          ? 'border-amber-500/50 bg-amber-500/15 shadow-[0_0_0_1px_rgba(245,158,11,0.15)]'
          : 'border-white/15 bg-zinc-950/85 hover:border-white/25 hover:bg-zinc-950',
        isDragging ? 'opacity-70 ring-2 ring-amber-300/40' : ''
      )}
      onClick={() => onSelect(block.key)}
    >
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <div className='truncate text-sm font-semibold text-zinc-50'>{definition.label}</div>
          <div className='mt-0.5 text-[10px] text-zinc-300'>{getPlacementLabel(block)}</div>
        </div>

        <button
          type='button'
          className='inline-flex size-7 items-center justify-center border border-white/10 bg-white/5 text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/10 !rounded-none'
          aria-label={`Drag ${definition.label}`}
          {...attributes}
          {...listeners}
        >
          <Icons.gripVertical className='size-4' />
        </button>
      </div>

      <div className='mt-2 flex items-center justify-between gap-2 text-[10px] text-zinc-300'>
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

      <div className='mt-1 flex flex-wrap gap-1 text-[9px] text-zinc-400'>
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

export function DisplayLayoutDesignerClient({ displayPage }: DisplayLayoutDesignerClientProps) {
  const router = useRouter();
  const [layoutConfig, setLayoutConfig] = useState<DisplayLayoutConfig>(() =>
    normalizeDisplayLayoutConfig(displayPage.layoutConfig)
  );
  const [selectedKey, setSelectedKey] = useState<DisplayBlockKey>(() => {
    return (
      normalizeDisplayLayoutConfig(displayPage.layoutConfig).blocks[0]?.key ?? DISPLAY_BLOCKS[0].key
    );
  });
  const [activeKey, setActiveKey] = useState<DisplayBlockKey | null>(null);

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
  const selectedBlock = useMemo(
    () => layoutConfig.blocks.find((block) => block.key === selectedKey) ?? layoutConfig.blocks[0],
    [layoutConfig, selectedKey]
  );

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

  const maxRow = useMemo(() => {
    return gridBlocks.reduce((highest, block) => Math.max(highest, block.row), 1);
  }, [gridBlocks]);

  const previewRows = Math.max(1, maxRow);
  const previewGridRows = Math.min(DISPLAY_GRID_ROW_MAX, previewRows);
  const hasDenseLayout = maxRow > 8;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={() => setActiveKey(null)}
            >
              <div
                className='mx-auto overflow-hidden border border-border/60 bg-muted/20 p-2 !rounded-none'
                style={{
                  width: `min(100%, calc(58vh * ${displayPage.resolutionWidth / displayPage.resolutionHeight}))`,
                  aspectRatio: `${displayPage.resolutionWidth} / ${displayPage.resolutionHeight}`
                }}
              >
                <div className='flex h-full min-h-0 flex-col overflow-hidden !rounded-none bg-zinc-950/90'>
                  <div className='flex h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-3'>
                    <div className='flex items-center gap-2'>
                      <div className='text-sm font-semibold tracking-[0.28em] text-zinc-100'>
                        CUE
                      </div>
                      <div className='text-[10px] uppercase tracking-[0.22em] text-zinc-400'>
                        Header preview
                      </div>
                    </div>
                    <div className='flex items-center gap-3 text-[10px] text-zinc-300'>
                      <span>Time</span>
                      <span>Date</span>
                    </div>
                    <div className='flex items-center gap-2 text-[10px] text-zinc-300'>
                      <span>Weather</span>
                      <span>Alerts</span>
                    </div>
                  </div>

                  <div className='flex min-h-0 flex-1 flex-col p-2'>
                    <div className='relative flex min-h-0 flex-1 flex-col'>
                      <div
                        className='grid gap-2 min-h-0 flex-1'
                        style={{
                          gridTemplateColumns: columnTemplate,
                          gridTemplateRows: `repeat(${previewGridRows}, minmax(3.5rem, 1fr))`
                        }}
                      >
                        {gridBlocks.map((block) => {
                          const isActive = activeKey === block.key;
                          return (
                            <div
                              key={block.key}
                              style={{
                                gridColumn: `${block.column} / span ${block.colSpan}`,
                                gridRow: block.row
                              }}
                              className='relative z-10'
                            >
                              <DraggableBlockCard
                                block={block}
                                selected={block.key === selectedKey}
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
                    <span>{getPlacementLabel(selectedBlock)}</span>
                    <span>•</span>
                    <span>{getRowsPerSlideLabel(selectedBlock)}</span>
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
                    <div className='rounded-none border border-amber-400/20 bg-amber-500/10 p-3 text-xs text-amber-100'>
                      Header-only block. It appears in the top header, not inside the TV grid.
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
                                const column = Math.min(3, Math.max(1, Number(value)));
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
                          <DesignerFieldLabel>Row</DesignerFieldLabel>
                          <Input
                            type='number'
                            min={1}
                            max={DISPLAY_GRID_ROW_MAX}
                            step={1}
                            value={selectedBlock.row}
                            onChange={(event) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                row: Math.min(
                                  DISPLAY_GRID_ROW_MAX,
                                  Math.max(1, Number(event.target.value || block.row))
                                )
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className='grid gap-2 md:grid-cols-2'>
                        <div className='grid gap-1.5'>
                          <DesignerFieldLabel>Width</DesignerFieldLabel>
                          <Select
                            value={String(selectedBlock.colSpan)}
                            onValueChange={(value) =>
                              handleBlockChange(selectedBlock.key, (block) => {
                                const nextSpan = Number(value) === 2 ? 2 : 1;
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
                          <DesignerFieldLabel>Rows/Slide</DesignerFieldLabel>
                          <Input
                            type='number'
                            min={getBlockDefinition(selectedBlock.key).minRowLimit}
                            max={getBlockDefinition(selectedBlock.key).maxRowLimit}
                            step={1}
                            value={selectedBlock.rowLimit}
                            onChange={(event) =>
                              handleBlockChange(selectedBlock.key, (block) => ({
                                ...block,
                                rowLimit: Math.min(
                                  getBlockDefinition(block.key).maxRowLimit,
                                  Math.max(
                                    getBlockDefinition(block.key).minRowLimit,
                                    Number(event.target.value || block.rowLimit)
                                  )
                                )
                              }))
                            }
                          />
                        </div>
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
                <li>Enabled grid blocks cannot overlap in the same row.</li>
                <li>Width 2 blocks cannot start in column 3.</li>
                <li>Header-only blocks stay in the top header.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
