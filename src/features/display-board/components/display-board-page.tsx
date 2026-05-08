import { format, isSameDay } from 'date-fns';
import type { CSSProperties, ComponentType, ReactNode } from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { getDisplayBoardBySlug } from '../api/service';
import type {
  DisplayBoardAlertItem,
  DisplayBoardAttendanceDisplayStatus,
  DisplayBoardMovieItem,
  DisplayBoardWeatherData
} from '../api/types';
import {
  expandDisplayLayoutRowsForSlots,
  getDisplayBlockDefinition,
  getDisplayBlockGridPlacement,
  getEnabledSortedDisplayBlocks,
  DEFAULT_DISPLAY_LAYOUT_APPEARANCE,
  hexToRgba,
  normalizeDisplayLayoutConfig,
  type DisplayBlockKey,
  type DisplayLayoutAppearanceColorsConfig,
  type DisplayLayoutBackgroundConfig,
  type DisplayLayoutBlockConfig
} from '@/features/display-pages/lib/display-layout-config';
import { DisplayBoardAutoRefresh } from './display-board-auto-refresh';
import { DisplayBoardClock } from './display-board-clock';
import { DisplayCardSlideshow } from './display-card-slideshow';
import {
  MovieScheduleSlideshow,
  type MovieScheduleSlideshowTimeItem,
  type MovieScheduleSlideshowMovieGroup
} from './movie-schedule-slideshow';

interface DisplayBoardPageProps {
  slug: string;
}

const DISPLAY_FONT_FAMILY = 'Arial, Helvetica, sans-serif';

const VISIBLE_EVENT_COUNT = 4;
const VISIBLE_MEETING_COUNT = 4;
const VISIBLE_MOVIE_COUNT = 4;
const VISIBLE_AD_COUNT = 3;
const VISIBLE_ALERT_COUNT = 3;
const VISIBLE_TARGET_COUNT = 4;
const VISIBLE_CONCESSION_COUNT = 4;
const VISIBLE_STAFF_ATTENDANCE_COUNT = 6;
const VISIBLE_MANAGER_ATTENDANCE_COUNT = 3;
const DISPLAY_LAYOUT_GAP_CLASS = 'gap-2';
const DISPLAY_LAYOUT_PADDING_CLASS = 'p-2';
const DISPLAY_TABLE_HEADING_CLASS =
  'text-[11px] font-extrabold uppercase tracking-[0.14em] leading-none';
const DISPLAY_TABLE_BODY_CLASS = 'text-[14px] font-semibold leading-[1.2]';
const DISPLAY_TABLE_TITLE_CLASS = 'text-[15px] font-extrabold leading-[1.1]';
const DISPLAY_TABLE_STATUS_CLASS = 'text-[10px] font-extrabold leading-none';
const DISPLAY_TABLE_ROW_CLASS =
  'grid items-center min-h-[24px] gap-y-0 px-2 py-[4px] leading-[1.2]';
const DISPLAY_TABLE_HEADING_ROW_CLASS =
  'grid items-center min-h-[24px] gap-y-0 px-2 py-[4px] leading-[1.2]';
const DISPLAY_HEADER_TEXT_CLASS = '!text-[color:var(--display-header-text,#f8f4e8)]';
const DISPLAY_HEADER_MUTED_TEXT_CLASS = '!text-[color:var(--display-header-muted-text,#d1b56a)]';
const DISPLAY_CARD_TITLE_TEXT_CLASS = '!text-[color:var(--display-card-title-text,#f8f4e8)]';
const DISPLAY_CARD_HEADING_TEXT_CLASS = '!text-[color:var(--display-card-heading-text,#d1b56a)]';
const DISPLAY_CARD_BODY_TEXT_CLASS = '!text-[color:var(--display-card-body-text,#f8f4e8)]';
const DISPLAY_CARD_DIVIDER_COLOR = 'var(--display-card-divider, rgba(255,255,255,0.10))';
const DISPLAY_SECTION_LIST_GAP_CLASS = 'space-y-1';
const DISPLAY_SECTION_ROW_CLASS =
  'border-b border-white/10 px-3 py-2 last:border-b-0 bg-transparent rounded-none';
const DISPLAY_META_INLINE_CLASS =
  'inline-flex min-w-0 items-center truncate text-[11px] font-bold leading-none';

function getDisplayPanelStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
): CSSProperties {
  const cardBackground = colors.cardBackground
    ? hexToRgba(colors.cardBackground, transparentPanels ? 0.72 : 1)
    : transparentPanels
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgb(9, 9, 11)';
  const cardBorder =
    colors.cardBorder ??
    (transparentPanels ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.15)');

  return {
    backgroundColor: cardBackground,
    borderColor: cardBorder
  };
}

function getDisplayCardTitleBarStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
): CSSProperties {
  const fallbackBackground = colors.cardBackground
    ? hexToRgba(colors.cardBackground, transparentPanels ? 0.72 : 1)
    : transparentPanels
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgb(9, 9, 11)';

  return {
    backgroundColor: colors.cardTitleBarBackground
      ? hexToRgba(colors.cardTitleBarBackground, transparentPanels ? 0.72 : 1)
      : fallbackBackground,
    borderColor:
      colors.cardDivider ??
      colors.cardBorder ??
      (transparentPanels ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.15)')
  };
}

function getDisplayRowStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig,
  rowIndex: number
): CSSProperties {
  const hasZebraRows = Boolean(colors.cardRowBackground || colors.cardRowAlternateBackground);
  const useAlternateRow = rowIndex % 2 === 1;
  const rowColor = useAlternateRow ? colors.cardRowAlternateBackground : colors.cardRowBackground;

  return {
    borderColor: hasZebraRows ? 'transparent' : undefined,
    backgroundColor: rowColor ? hexToRgba(rowColor, transparentPanels ? 0.55 : 1) : undefined
  };
}

function getDisplayZebraRowBackgroundStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig,
  rowIndex: number
): CSSProperties {
  return getDisplayRowStyle(transparentPanels, colors, rowIndex);
}

function getDisplayHeadingRowStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
): CSSProperties {
  const headingRowColor = colors.cardRowAlternateBackground;

  return {
    backgroundColor: headingRowColor
      ? hexToRgba(headingRowColor, transparentPanels ? 0.55 : 1)
      : undefined,
    borderColor: 'transparent'
  };
}

function getDisplayHeaderStyle(
  transparentPanels: boolean,
  colors: DisplayLayoutAppearanceColorsConfig
): CSSProperties {
  const headerBackground = colors.headerBackground
    ? hexToRgba(colors.headerBackground, transparentPanels ? 0.72 : 1)
    : transparentPanels
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgb(24, 24, 27)';
  const cardBorder =
    colors.cardBorder ??
    (transparentPanels ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.15)');

  return {
    backgroundColor: headerBackground,
    borderColor: cardBorder
  };
}

function getDisplayTextStyles(colors: DisplayLayoutAppearanceColorsConfig): {
  headerText: CSSProperties;
  headerMutedText: CSSProperties;
  cardTitleText: CSSProperties;
  cardHeadingText: CSSProperties;
  cardBodyText: CSSProperties;
  cardDivider: CSSProperties;
} {
  return {
    headerText: {
      color: colors.headerText ?? 'var(--display-header-text, #f8f4e8)'
    },
    headerMutedText: {
      color: colors.headerMutedText ?? 'var(--display-header-muted-text, #d1b56a)'
    },
    cardTitleText: {
      color:
        colors.cardTitleText ?? colors.cardBodyText ?? 'var(--display-card-title-text, #f8f4e8)'
    },
    cardHeadingText: {
      color:
        colors.cardHeadingText ?? colors.cardBodyText ?? 'var(--display-card-heading-text, #d1b56a)'
    },
    cardBodyText: {
      color: colors.cardBodyText ?? 'var(--display-card-body-text, #f8f4e8)'
    },
    cardDivider: {
      borderColor: colors.cardDivider ?? 'rgba(255, 255, 255, 0.10)'
    }
  };
}

function getDisplayPanelSurfaceClass(transparentPanels: boolean) {
  return transparentPanels
    ? 'border-white/10 bg-white/6 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl'
    : 'border-white/15 bg-zinc-950/95 shadow-[0_18px_42px_rgba(0,0,0,0.38)]';
}

function getDisplayHeaderSurfaceClass(transparentPanels: boolean) {
  return transparentPanels
    ? 'border-white/10 bg-white/6 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl'
    : 'border-white/15 bg-zinc-950/95 shadow-[0_18px_42px_rgba(0,0,0,0.38)]';
}

function getVisibleCount(block: DisplayLayoutBlockConfig, fallback: number) {
  return Math.max(1, block.rowLimit || fallback);
}

function chunkItems<T>(items: T[], pageSize: number): T[][] {
  const size = Math.max(1, pageSize);
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages;
}

function formatTime(value: Date) {
  return format(value, 'h:mm a');
}

function formatDate(value: Date) {
  return format(value, 'EEEE, MMM d, yyyy');
}

function formatDateTime(value: Date | null | undefined) {
  return value ? format(value, 'EEEE, MMM d, yyyy • h:mm a') : '—';
}

function formatMeetingDateLabel(value: Date, now: Date) {
  if (Number.isNaN(value.getTime())) {
    return '—';
  }

  if (isSameDay(value, now)) {
    return 'TODAY';
  }

  return value.getFullYear() === now.getFullYear()
    ? format(value, 'MMM d')
    : format(value, 'MMM d, yyyy');
}

function formatProgress(progress: {
  soldQty: number;
  targetQty: number | null;
  remainingQty: number | null;
  percent: number | null;
  dataAvailable: boolean;
}) {
  if (!progress.dataAvailable) {
    return 'Sales data not imported';
  }

  const sold = progress.soldQty.toLocaleString();
  const target = progress.targetQty === null ? '—' : progress.targetQty.toLocaleString();
  const remaining = progress.remainingQty === null ? '—' : progress.remainingQty.toLocaleString();
  const percent = progress.percent === null ? '—' : `${progress.percent}%`;

  return `${sold} / ${target} • Rem ${remaining} • ${percent}`;
}

function formatShortDate(value: Date | null) {
  return value ? format(value, 'MMM d, yyyy') : '—';
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

function formatPrice(value: number) {
  return `Rs. ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2
  }).format(value)}`;
}

function formatCompactMovieTime(value: Date) {
  return format(value, 'h:mm');
}

interface MovieScheduleScreenGroup {
  screenName: string;
  times: Date[];
  firstShowTime: Date;
}

interface MovieScheduleGroup {
  movieName: string;
  screenGroups: MovieScheduleScreenGroup[];
  firstShowTime: Date;
}

function groupMovieSchedules(items: DisplayBoardMovieItem[]): MovieScheduleGroup[] {
  const movieMap = new Map<string, MovieScheduleScreenGroup[]>();

  for (const item of items) {
    const movieName = item.movieName.trim();
    const screenName = item.screenName.trim();

    const screenGroups = movieMap.get(movieName) ?? [];
    const existingGroup = screenGroups.find((group) => group.screenName === screenName);

    if (existingGroup) {
      existingGroup.times.push(item.showTime);
      if (item.showTime < existingGroup.firstShowTime) {
        existingGroup.firstShowTime = item.showTime;
      }
    } else {
      screenGroups.push({
        screenName,
        times: [item.showTime],
        firstShowTime: item.showTime
      });
      movieMap.set(movieName, screenGroups);
    }
  }

  return Array.from(movieMap.entries())
    .map(([movieName, screenGroups]) => ({
      movieName,
      screenGroups: screenGroups
        .map((group) => ({
          ...group,
          times: group.times.slice().sort((left, right) => left.getTime() - right.getTime())
        }))
        .sort((left, right) => left.firstShowTime.getTime() - right.firstShowTime.getTime()),
      firstShowTime: screenGroups.reduce(
        (earliest, group) =>
          group.firstShowTime.getTime() < earliest.getTime() ? group.firstShowTime : earliest,
        screenGroups[0]?.firstShowTime ?? new Date()
      )
    }))
    .sort((left, right) => left.firstShowTime.getTime() - right.firstShowTime.getTime());
}

function toMovieScheduleSlideshowGroups(
  groupedMovies: MovieScheduleGroup[]
): MovieScheduleSlideshowMovieGroup[] {
  return groupedMovies.map((movie) => ({
    movieName: movie.movieName,
    firstShowTime: movie.firstShowTime.toISOString(),
    screenGroups: movie.screenGroups.map((screenGroup) => {
      const times: MovieScheduleSlideshowTimeItem[] = screenGroup.times.map((time) => ({
        label: formatCompactMovieTime(time),
        startTimeIso: time.toISOString()
      }));

      return {
        screenName: screenGroup.screenName,
        times
      };
    })
  }));
}

function formatAlertExpiry(value: Date) {
  return format(value, 'MMM d, h:mm a');
}

function getAlertTheme(alertType: DisplayBoardAlertItem['alertType']) {
  switch (alertType) {
    case 'INFO':
      return {
        accent: 'border-sky-400/25 bg-sky-500/10',
        badge: 'border-sky-400/30 bg-sky-400/15 text-sky-100',
        icon: Icons.info,
        iconClass: 'text-sky-200'
      };
    case 'WARNING':
      return {
        accent: 'border-amber-400/25 bg-amber-500/12',
        badge: 'border-amber-400/30 bg-amber-400/15 text-amber-100',
        icon: Icons.warning,
        iconClass: 'text-amber-200'
      };
    case 'URGENT':
      return {
        accent: 'border-rose-400/30 bg-rose-500/15 shadow-[0_0_0_1px_rgba(251,113,133,0.15)]',
        badge: 'border-rose-400/30 bg-rose-400/15 text-rose-100',
        icon: Icons.alertCircle,
        iconClass: 'text-rose-200'
      };
    case 'SUCCESS':
      return {
        accent: 'border-emerald-400/25 bg-emerald-500/12',
        badge: 'border-emerald-400/30 bg-emerald-400/15 text-emerald-100',
        icon: Icons.circleCheck,
        iconClass: 'text-emerald-200'
      };
    default:
      return {
        accent: 'border-white/10 bg-white/6',
        badge: 'border-white/10 bg-white/5 text-zinc-100',
        icon: Icons.info,
        iconClass: 'text-zinc-200'
      };
  }
}

function AlertBannerCard({
  alert,
  transparentPanels,
  colors
}: {
  alert: DisplayBoardAlertItem;
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const theme = getAlertTheme(alert.alertType);
  const textStyles = getDisplayTextStyles(colors);

  return (
    <div
      className={cn(
        'border-b px-2 py-1.5',
        transparentPanels ? 'border-white/10 backdrop-blur-xl' : 'border-white/15 bg-zinc-950/95',
        theme.accent,
        alert.alertType === 'URGENT' ? 'animate-pulse' : ''
      )}
      style={{
        ...getDisplayPanelStyle(transparentPanels, colors),
        ...textStyles.cardBodyText,
        borderColor: colors.cardDivider ?? 'rgba(255, 255, 255, 0.10)'
      }}
    >
      <div className='flex items-center justify-between gap-2.5'>
        <div className='min-w-0'>
          <div className='flex items-center gap-1.5'>
            <theme.icon className={cn('size-4 shrink-0', theme.iconClass)} />
            <div className={DISPLAY_TABLE_BODY_CLASS} style={textStyles.cardBodyText}>
              {alert.title}
            </div>
          </div>
          {alert.message ? (
            <div
              className={cn('mt-0.5 max-h-8 overflow-hidden', DISPLAY_TABLE_BODY_CLASS)}
              style={textStyles.cardBodyText}
            >
              {alert.message}
            </div>
          ) : null}
        </div>
        <Badge
          variant='outline'
          className={cn('!rounded-none px-2 py-[2px] text-[9px]', theme.badge)}
        >
          {alert.alertType}
        </Badge>
      </div>

      <div className='mt-1.5 flex flex-wrap gap-1' style={textStyles.cardBodyText}>
        <RecordChip>Priority {alert.priority}</RecordChip>
        <RecordChip>Until {formatAlertExpiry(alert.endAt)}</RecordChip>
      </div>
    </div>
  );
}

function attendanceStatusTone(status: DisplayBoardAttendanceDisplayStatus) {
  switch (status) {
    case 'PRESENT':
      return 'border-emerald-400/30 bg-emerald-400/15 text-emerald-100';
    case 'ABSENT':
      return 'border-rose-400/30 bg-rose-400/10 text-rose-100';
    case 'LEAVE':
      return 'border-amber-400/30 bg-amber-400/10 text-amber-100';
    case 'LATE':
      return 'border-orange-400/30 bg-orange-400/10 text-orange-100';
    case 'NOT_MARKED':
      return `border-white/10 bg-white/5 ${DISPLAY_CARD_BODY_TEXT_CLASS}`;
  }
}

function attendanceStatusLabel(status: DisplayBoardAttendanceDisplayStatus) {
  return status === 'NOT_MARKED' ? 'Not marked' : status;
}

function AttendanceStatusBadge({ status }: { status: DisplayBoardAttendanceDisplayStatus }) {
  return (
    <Badge
      className={cn(
        '!rounded-none px-1.5 py-[1px]',
        DISPLAY_TABLE_STATUS_CLASS,
        attendanceStatusTone(status)
      )}
      style={
        status === 'NOT_MARKED' ? { color: 'var(--display-card-body-text, #f8f4e8)' } : undefined
      }
    >
      {attendanceStatusLabel(status)}
    </Badge>
  );
}

function getManagerDutyLabel(status: DisplayBoardAttendanceDisplayStatus) {
  switch (status) {
    case 'PRESENT':
      return 'ON DUTY';
    case 'LEAVE':
      return 'ON LEAVE';
    case 'ABSENT':
      return 'OFF';
    case 'LATE':
      return 'LATE';
    case 'NOT_MARKED':
      return 'OFF';
    default:
      return 'OFF';
  }
}

function getManagerDutyTone(status: DisplayBoardAttendanceDisplayStatus) {
  switch (status) {
    case 'PRESENT':
      return 'text-emerald-300';
    case 'LEAVE':
      return 'text-amber-300';
    case 'LATE':
      return 'text-orange-300';
    case 'ABSENT':
    case 'NOT_MARKED':
    default:
      return DISPLAY_CARD_BODY_TEXT_CLASS;
  }
}

function AttendanceRosterRow({
  name,
  designation,
  department,
  shift,
  remarks,
  status,
  kind,
  contentColumns = 1,
  phone,
  rowIndex,
  transparentPanels,
  colors
}: {
  name: string;
  designation: string | null;
  department?: string | null;
  shift: string | null;
  remarks?: string | null;
  status: DisplayBoardAttendanceDisplayStatus;
  kind: 'staff' | 'manager';
  contentColumns?: number;
  phone?: string | null;
  rowIndex: number;
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));
  const textStyles = getDisplayTextStyles(colors);

  if (kind === 'manager') {
    return (
      <div
        className={cn(
          DISPLAY_TABLE_ROW_CLASS,
          'gap-x-4 border-b border-white/10 last:border-b-0 rounded-none',
          getManagerAvailabilityGridTemplate(safeContentColumns)
        )}
        style={{
          ...textStyles.cardDivider,
          ...getDisplayRowStyle(transparentPanels, colors, rowIndex)
        }}
      >
        <CompactTableCell className='truncate text-left' style={textStyles.cardBodyText}>
          {name}
        </CompactTableCell>
        {safeContentColumns === 1 ? (
          <>
            <CompactTableCell
              className='justify-self-end truncate text-right'
              style={textStyles.cardBodyText}
            >
              {designation ?? '—'}
            </CompactTableCell>
            <CompactTableCell
              className='justify-self-end truncate text-right'
              style={textStyles.cardBodyText}
            >
              {phone ?? '—'}
            </CompactTableCell>
          </>
        ) : null}
        {safeContentColumns === 2 ? (
          <CompactTableCell
            className='justify-self-end truncate text-right'
            style={textStyles.cardBodyText}
          >
            {phone ?? '—'}
          </CompactTableCell>
        ) : null}
        <div
          className={cn(DISPLAY_TABLE_STATUS_CLASS, getManagerDutyTone(status))}
          style={
            status === 'ABSENT' || status === 'NOT_MARKED' ? textStyles.cardBodyText : undefined
          }
        >
          {getManagerDutyLabel(status)}
        </div>
      </div>
    );
  }

  const layout = getStaffRosterGridTemplate(safeContentColumns);

  return (
    <div
      className={cn(
        DISPLAY_TABLE_ROW_CLASS,
        'gap-x-4 border-b border-white/10 last:border-b-0 rounded-none',
        layout
      )}
      style={{
        ...textStyles.cardDivider,
        ...getDisplayRowStyle(transparentPanels, colors, rowIndex)
      }}
    >
      <CompactTableCell className='truncate text-left' style={textStyles.cardBodyText}>
        {name}
      </CompactTableCell>
      {safeContentColumns === 1 ? (
        <>
          <CompactTableCell
            className='justify-self-end truncate text-right'
            style={textStyles.cardBodyText}
          >
            {designation || '—'}
          </CompactTableCell>
          <CompactTableCell
            className='justify-self-end truncate text-right'
            style={textStyles.cardBodyText}
          >
            {department || '—'}
          </CompactTableCell>
        </>
      ) : null}
      {safeContentColumns === 2 ? (
        <CompactTableCell
          className='justify-self-end truncate text-right'
          style={textStyles.cardBodyText}
        >
          {designation || '—'}
        </CompactTableCell>
      ) : null}
      <div className='flex justify-end'>
        <AttendanceStatusBadge status={status} />
      </div>
    </div>
  );
}

function ManagerAvailabilityRow({
  name,
  designation,
  phone,
  status,
  contentColumns = 1,
  rowIndex,
  transparentPanels,
  colors
}: {
  name: string;
  designation: string | null;
  phone: string | null;
  status: DisplayBoardAttendanceDisplayStatus;
  contentColumns?: number;
  rowIndex: number;
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));
  const layout = getManagerAvailabilityGridTemplate(safeContentColumns);
  const textStyles = getDisplayTextStyles(colors);

  return (
    <div
      className={cn(
        'grid items-center gap-x-4 gap-y-0 border-b border-white/10 px-2 py-[5px] last:border-b-0 rounded-none',
        layout
      )}
      style={{
        ...textStyles.cardDivider,
        ...getDisplayRowStyle(transparentPanels, colors, rowIndex)
      }}
    >
      <CompactTableCell className='truncate text-left' style={textStyles.cardBodyText}>
        {name}
      </CompactTableCell>
      {safeContentColumns === 1 ? (
        <>
          <CompactTableCell
            className='justify-self-start truncate text-left'
            style={textStyles.cardBodyText}
          >
            {designation ?? '—'}
          </CompactTableCell>
          <CompactTableCell
            className='justify-self-start truncate text-left'
            style={textStyles.cardBodyText}
          >
            {phone ?? '—'}
          </CompactTableCell>
        </>
      ) : null}
      {safeContentColumns === 2 ? (
        <CompactTableCell
          className='justify-self-start truncate text-left'
          style={textStyles.cardBodyText}
        >
          {phone ?? '—'}
        </CompactTableCell>
      ) : null}
      <div
        className={cn(
          'min-w-0 justify-self-end truncate text-right uppercase tracking-[0.08em]',
          DISPLAY_TABLE_STATUS_CLASS,
          getManagerDutyTone(status)
        )}
      >
        {getManagerDutyLabel(status)}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  count,
  transparentPanels,
  colors,
  children
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  count: number;
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
  children: ReactNode;
}) {
  const textStyles = getDisplayTextStyles(colors);
  return (
    <Card
      className={cn(
        '!rounded-none flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0',
        getDisplayPanelSurfaceClass(transparentPanels)
      )}
      style={{ ...getDisplayPanelStyle(transparentPanels, colors), ...textStyles.cardBodyText }}
    >
      <CardHeader
        className='shrink-0 grid grid-cols-[1fr_auto_1fr] items-center gap-0 border-b px-2 py-[5px] !pb-[5px]'
        style={getDisplayCardTitleBarStyle(transparentPanels, colors)}
      >
        <div aria-hidden='true' />
        <CardTitle
          className={cn(DISPLAY_TABLE_TITLE_CLASS, 'justify-self-center text-center')}
          style={textStyles.cardTitleText}
        >
          {title}
        </CardTitle>
        <div
          className='flex h-auto min-h-0 items-center justify-self-end gap-1 leading-none'
          style={textStyles.cardTitleText}
        >
          <Icon className='size-3' />
          <span className={DISPLAY_TABLE_STATUS_CLASS + ' tabular-nums leading-none'}>
            {count.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className='flex min-h-0 flex-1 flex-col gap-0.5 px-2.5 pb-2.5 pt-0.5'>
        {children}
      </CardContent>
    </Card>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <div
      className={cn('flex items-center gap-1.5 border-b border-dashed px-2 py-0.5 last:border-b-0')}
      style={{
        borderColor: DISPLAY_CARD_DIVIDER_COLOR,
        color: 'var(--display-card-body-text, #f8f4e8)'
      }}
    >
      <Icons.info className='size-3.5 shrink-0 text-amber-300/80' />
      <span className={cn('max-h-8 overflow-hidden', DISPLAY_TABLE_BODY_CLASS)}>{message}</span>
    </div>
  );
}

function RecordChip({ children }: { children: ReactNode }) {
  return <span className={DISPLAY_META_INLINE_CLASS}>{children}</span>;
}

function CompactTableCell({
  children,
  className,
  style
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn('min-w-0 truncate', DISPLAY_TABLE_BODY_CLASS, className)} style={style}>
      {children}
    </div>
  );
}

function getSafeContentColumns(block: DisplayLayoutBlockConfig) {
  return Math.min(3, Math.max(1, block.contentColumns || 1));
}

function getManagerAvailabilityGridTemplate(contentColumns: number) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));

  if (safeContentColumns === 2) {
    return 'grid-cols-[minmax(120px,1.35fr)_minmax(110px,0.95fr)_minmax(4rem,0.55fr)]';
  }

  if (safeContentColumns === 3) {
    return 'grid-cols-[minmax(120px,1.6fr)_minmax(4rem,0.55fr)]';
  }

  return 'grid-cols-[minmax(150px,1.4fr)_minmax(120px,1fr)_minmax(105px,0.85fr)_minmax(60px,0.55fr)]';
}

function getManagerAvailabilityHeadingAlignments(contentColumns: number) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));

  if (safeContentColumns === 2) {
    return ['left', 'left', 'right'] as const;
  }

  if (safeContentColumns === 3) {
    return ['left', 'right'] as const;
  }

  return ['left', 'left', 'left', 'right'] as const;
}

function getStaffRosterGridTemplate(contentColumns: number) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));

  return 'grid-cols-[minmax(120px,1.2fr)_minmax(90px,0.9fr)_minmax(110px,0.9fr)_auto]';
}

const STAFF_ROSTER_MULTI_COLUMN_ENTRY_TEMPLATE =
  'grid-cols-[minmax(90px,1fr)_minmax(80px,0.8fr)_minmax(65px,0.55fr)]';

function getStaffRosterColumnTemplate(contentColumns: number) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));
  return `repeat(${safeContentColumns}, minmax(0, 1fr))`;
}

const EVENTS_TABLE_GRID_TEMPLATE =
  'grid-cols-[minmax(120px,1.05fr)_minmax(145px,1.15fr)_minmax(115px,0.9fr)_minmax(75px,0.58fr)_minmax(70px,0.52fr)_minmax(62px,0.45fr)]';

const MEETING_TABLE_GRID_TEMPLATE =
  'grid-cols-[minmax(150px,1.35fr)_minmax(125px,1fr)_minmax(110px,0.9fr)_minmax(75px,0.65fr)_minmax(75px,0.65fr)]';

const ADVERTISEMENT_TABLE_GRID_TEMPLATE =
  'grid-cols-[minmax(180px,1.5fr)_minmax(105px,0.8fr)_minmax(105px,0.8fr)_minmax(95px,0.75fr)]';

const CONCESSION_PRICE_TABLE_GRID_TEMPLATE = 'grid-cols-[minmax(0,1fr)_minmax(85px,0.35fr)]';

function getConcessionPriceListColumnTemplate(contentColumns: number) {
  const safeContentColumns = Math.min(3, Math.max(1, Math.trunc(contentColumns) || 1));
  return `repeat(${safeContentColumns}, minmax(0, 1fr))`;
}

function splitItemsIntoColumns<T>(items: T[], columnCount: number): T[][] {
  const safeColumnCount = Math.min(3, Math.max(1, Math.trunc(columnCount) || 1));
  const baseSize = Math.floor(items.length / safeColumnCount);
  const remainder = items.length % safeColumnCount;
  const columns: T[][] = [];
  let startIndex = 0;

  for (let columnIndex = 0; columnIndex < safeColumnCount; columnIndex += 1) {
    const size = baseSize + (columnIndex < remainder ? 1 : 0);
    columns.push(size > 0 ? items.slice(startIndex, startIndex + size) : []);
    startIndex += size;
  }

  return columns;
}

function CompactTableHeadingRow({
  labels,
  columnsClassName,
  className,
  paddingClassName,
  gapClassName,
  alignments = [],
  surfaceStyle
}: {
  labels: string[];
  columnsClassName: string;
  className?: string;
  paddingClassName?: string;
  gapClassName?: string;
  alignments?: Array<'left' | 'right'>;
  surfaceStyle?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        'border-b last:border-b-0',
        DISPLAY_TABLE_HEADING_ROW_CLASS,
        DISPLAY_TABLE_HEADING_CLASS,
        paddingClassName,
        className
      )}
      style={{
        borderColor: DISPLAY_CARD_DIVIDER_COLOR,
        color: 'var(--display-card-heading-text, #d1b56a)',
        ...surfaceStyle
      }}
    >
      <div
        className={cn(
          'grid items-center gap-y-0 whitespace-nowrap',
          gapClassName ?? 'gap-x-4',
          columnsClassName
        )}
      >
        {labels.map((label, index) => (
          <div
            key={label}
            className={cn(
              'truncate',
              alignments[index] === 'right'
                ? 'justify-self-end text-right'
                : 'justify-self-start text-left'
            )}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function HeaderWidgetBadge({
  children,
  className,
  transparentPanels = true
}: {
  children: ReactNode;
  className?: string;
  transparentPanels?: boolean;
}) {
  return (
    <Badge
      variant='outline'
      className={cn(
        `!rounded-none border-white/10 px-1.5 py-[2px] text-[9px] ${DISPLAY_HEADER_TEXT_CLASS}`,
        transparentPanels ? 'bg-white/5' : 'bg-zinc-950/95',
        className
      )}
    >
      {children}
    </Badge>
  );
}

function HeaderWeatherWidget({
  weather,
  transparentPanels,
  colors
}: {
  weather: DisplayBoardWeatherData | null;
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const weatherIconSrc = weather?.iconPath ?? '/weather-icons/meteocons/not-available.svg';
  const temperatureLabel =
    weather && weather.status === 'ready' && weather.temperatureC !== null
      ? `${Math.round(weather.temperatureC)}°C`
      : 'Weather unavailable';
  const textStyles = getDisplayTextStyles(colors);

  return (
    <div
      className={cn(
        'flex min-w-0 max-w-[340px] flex-none items-center gap-2',
        transparentPanels
          ? 'bg-transparent px-0 py-0 shadow-none backdrop-blur-0'
          : 'border border-white/15 bg-zinc-950/95 px-2 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-0'
      )}
    >
      <div
        className={cn(
          'relative size-10 shrink-0 overflow-hidden',
          transparentPanels ? 'bg-transparent' : 'bg-zinc-950/95'
        )}
      >
        <Image
          src={weatherIconSrc}
          alt=''
          width={40}
          height={40}
          unoptimized
          className='size-full object-contain'
        />
      </div>
      <div className='min-w-0'>
        {weather ? (
          weather.status === 'ready' ? (
            <div className='space-y-0.5'>
              <div
                className='truncate text-[15px] font-bold leading-none'
                style={textStyles.headerText}
              >
                {temperatureLabel} {weather.city}
              </div>
              <div
                className='truncate text-[12px] font-semibold'
                style={textStyles.headerMutedText}
              >
                {weather.condition ?? 'Weather unavailable'}
              </div>
            </div>
          ) : (
            <div className='space-y-0.5'>
              <div className='truncate text-[15px] font-bold' style={textStyles.headerText}>
                Weather unavailable
              </div>
              <div
                className='truncate text-[12px] font-semibold'
                style={textStyles.headerMutedText}
              >
                Weather unavailable
              </div>
            </div>
          )
        ) : (
          <div className='space-y-0.5'>
            <div className='text-[15px] font-bold' style={textStyles.headerText}>
              Weather not set
            </div>
            <div className='truncate text-[12px] font-semibold' style={textStyles.headerMutedText}>
              Enable the weather block and configure a city
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeaderSummaryWidget({
  label,
  icon: Icon,
  countLabel,
  detail,
  tone,
  transparentPanels,
  colors
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  countLabel: string;
  detail: string | null;
  tone: 'amber' | 'rose' | 'violet';
  transparentPanels: boolean;
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const textStyles = getDisplayTextStyles(colors);
  const toneClass = transparentPanels
    ? tone === 'amber'
      ? 'border-amber-400/20 bg-amber-400/10 text-amber-100'
      : tone === 'rose'
        ? 'border-rose-400/20 bg-rose-400/10 text-rose-100'
        : 'border-violet-400/20 bg-violet-400/10 text-violet-100'
    : tone === 'amber'
      ? 'border-amber-400/20 bg-zinc-950/95 text-amber-100'
      : tone === 'rose'
        ? 'border-rose-400/20 bg-zinc-950/95 text-rose-100'
        : 'border-violet-400/20 bg-zinc-950/95 text-violet-100';

  const iconClass =
    tone === 'amber' ? 'text-amber-200' : tone === 'rose' ? 'text-rose-200' : 'text-violet-200';

  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-1.5 border px-2 py-1.5 !rounded-none shadow-[0_10px_26px_rgba(0,0,0,0.22)]',
        toneClass,
        transparentPanels ? 'backdrop-blur-xl' : 'backdrop-blur-0'
      )}
    >
      <div
        className={cn(
          '!rounded-none flex size-7 shrink-0 items-center justify-center border border-white/10',
          transparentPanels ? 'bg-black/20' : 'bg-zinc-950/95'
        )}
      >
        <Icon className={cn('size-3.5', iconClass)} />
      </div>
      <div className='min-w-0'>
        <div className='flex items-center gap-1.5'>
          <div
            className='text-[9px] font-semibold uppercase tracking-[0.22em]'
            style={textStyles.headerMutedText}
          >
            {label}
          </div>
          <HeaderWidgetBadge transparentPanels={transparentPanels}>{countLabel}</HeaderWidgetBadge>
        </div>
        {detail ? (
          <div className='truncate text-[10px] font-semibold' style={textStyles.headerText}>
            {detail}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatBlock({
  label,
  value,
  tone = 'zinc',
  colors
}: {
  label: string;
  value: string;
  tone?: 'zinc' | 'emerald' | 'amber';
  colors: DisplayLayoutAppearanceColorsConfig;
}) {
  const textStyles = getDisplayTextStyles(colors);
  const toneClass =
    tone === 'emerald'
      ? 'text-emerald-200'
      : tone === 'amber'
        ? 'text-amber-100'
        : DISPLAY_CARD_BODY_TEXT_CLASS;

  return (
    <div className='flex items-center justify-between gap-2 py-1'>
      <div className={DISPLAY_TABLE_HEADING_CLASS} style={textStyles.cardHeadingText}>
        {label}
      </div>
      <div className={cn(DISPLAY_TABLE_BODY_CLASS, toneClass)}>{value}</div>
    </div>
  );
}

function DisplayBoardUnavailable({
  slug,
  reason
}: {
  slug: string;
  reason: 'inactive' | 'not_found';
}) {
  return (
    <main
      data-display-board-root
      className={cn(
        'relative min-h-[100dvh] overflow-hidden bg-zinc-950',
        DISPLAY_CARD_BODY_TEXT_CLASS
      )}
      style={{ fontFamily: DISPLAY_FONT_FAMILY, color: 'var(--display-card-body-text, #f8f4e8)' }}
    >
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_25%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='relative flex min-h-[100dvh] items-center justify-center p-6'>
        <Card
          className={cn(
            '!rounded-none max-w-2xl border-white/10 bg-white/6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl',
            DISPLAY_CARD_BODY_TEXT_CLASS
          )}
        >
          <CardHeader className='shrink-0 grid-rows-[auto] items-center gap-0 border-b px-2 py-[2px] !pb-0'>
            <CardDescription className={DISPLAY_HEADER_MUTED_TEXT_CLASS}>
              Public display board
            </CardDescription>
            <CardTitle className={cn('text-3xl', DISPLAY_CARD_TITLE_TEXT_CLASS)}>
              {reason === 'not_found' ? 'Display page not found' : 'Display page is inactive'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className={DISPLAY_HEADER_MUTED_TEXT_CLASS}>
              The display route for{' '}
              <span className={DISPLAY_CARD_BODY_TEXT_CLASS}>/display/{slug}</span> is not currently
              available on the board.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <Badge
                variant='outline'
                className={cn(
                  '!rounded-none border-white/10 bg-white/5',
                  DISPLAY_CARD_BODY_TEXT_CLASS
                )}
              >
                <Icons.info className='mr-1 size-3.5' />
                {reason === 'not_found' ? 'No record found' : 'Status not active'}
              </Badge>
              <Badge
                variant='outline'
                className={cn(
                  '!rounded-none border-white/10 bg-white/5',
                  DISPLAY_CARD_BODY_TEXT_CLASS
                )}
              >
                Auto-refresh every 60 seconds
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export async function DisplayBoardPage({ slug }: DisplayBoardPageProps) {
  const { availability, data } = await getDisplayBoardBySlug(slug);

  if (availability !== 'active' || !data) {
    return (
      <DisplayBoardUnavailable
        slug={slug}
        reason={availability === 'inactive' ? 'inactive' : 'not_found'}
      />
    );
  }

  const {
    displayPage,
    events,
    meetings,
    movieSchedules,
    advertisements,
    alerts,
    salesTargets,
    concessionPriceList,
    activeManagersWithAttendanceToday,
    activeStaffWithAttendanceToday,
    weather
  } = data;

  const renderedAt = new Date();
  const normalizedLayoutConfig = normalizeDisplayLayoutConfig(displayPage.layoutConfig);
  const layoutBlocks = getEnabledSortedDisplayBlocks(normalizedLayoutConfig);
  const layoutColumns = normalizedLayoutConfig.columns;
  const layoutRowHeights = normalizedLayoutConfig.rows.heights;
  const transparentPanels = normalizedLayoutConfig.appearance?.transparentPanels ?? true;
  const appearanceColors = normalizedLayoutConfig.appearance?.colors;
  const hasZebraRows = Boolean(
    appearanceColors?.cardRowBackground || appearanceColors?.cardRowAlternateBackground
  );
  const wallpaper = normalizedLayoutConfig.background;
  const displayTextStyles = getDisplayTextStyles(
    appearanceColors ?? {
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
  );
  const displayGridColumns = `${layoutColumns.left}fr ${layoutColumns.center}fr ${layoutColumns.right}fr`;
  const layoutBlockMap = new Map(layoutBlocks.map((block) => [block.key, block] as const));
  const getBlock = (key: DisplayBlockKey) => layoutBlockMap.get(key);
  const weatherBlock = getBlock('weather');
  const alertsBlock = getBlock('alerts');
  const visibleGridBlocks = layoutBlocks.filter(
    (block) => !getDisplayBlockDefinition(block.key).headerOnly
  );
  const positionedGridBlocks = visibleGridBlocks.slice().sort((left, right) => {
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
  const visibleGridRowCount = Math.max(
    1,
    visibleGridBlocks.reduce(
      (highest, block) => Math.max(highest, block.row + (block.rowSpan || 1) - 1),
      1
    )
  );
  const displaySubRowHeights = expandDisplayLayoutRowsForSlots(layoutRowHeights);
  const displayGridRows = displaySubRowHeights
    .slice(0, Math.max(1, visibleGridRowCount) * 2)
    .map((value) => `${value}fr`)
    .join(' ');
  const currentDate = formatDate(renderedAt);
  const firstAlert = alerts.items[0] ?? null;

  const renderBlockCards = (key: DisplayBlockKey): ReactNode[] => {
    const block = getBlock(key);

    if (!block) {
      return [];
    }

    switch (key) {
      case 'alerts': {
        return [];
      }

      case 'events': {
        const pageSize = getVisibleCount(block, VISIBLE_EVENT_COUNT);
        const eventPages = chunkItems(events.items, pageSize);
        const renderEventPage = (pageItems: typeof events.items) => (
          <div className='space-y-0.5'>
            <CompactTableHeadingRow
              labels={['Title', 'Client Name', 'Company Name', 'Screen', 'Date', 'Time']}
              columnsClassName='grid-cols-[minmax(125px,1.1fr)_minmax(170px,1.35fr)_minmax(130px,1fr)_minmax(85px,0.65fr)_minmax(70px,0.5fr)_minmax(76px,0.55fr)]'
              paddingClassName='px-2 py-[4px]'
              gapClassName='gap-x-5'
              alignments={['left', 'left', 'left', 'left', 'left', 'right']}
              className='tracking-[0.10em]'
              surfaceStyle={
                hasZebraRows
                  ? getDisplayHeadingRowStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                    )
                  : undefined
              }
            />
            <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
              {pageItems.map((event, rowIndex) => (
                <div
                  key={event.id}
                  className={cn(
                    DISPLAY_TABLE_ROW_CLASS,
                    'grid-cols-[minmax(125px,1.1fr)_minmax(170px,1.35fr)_minmax(130px,1fr)_minmax(85px,0.65fr)_minmax(70px,0.5fr)_minmax(76px,0.55fr)]',
                    'gap-x-5 border-b border-white/10 last:border-b-0 rounded-none'
                  )}
                  style={{
                    ...displayTextStyles.cardDivider,
                    ...getDisplayZebraRowBackgroundStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                      rowIndex
                    )
                  }}
                >
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {event.title}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {event.clientName ?? '—'}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {event.companyName ?? '—'}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {event.screenName ?? '—'}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={
                      isSameDay(event.startAt, renderedAt)
                        ? { color: 'rgb(167, 243, 208)' }
                        : displayTextStyles.cardBodyText
                    }
                  >
                    {formatMeetingDateLabel(event.startAt, renderedAt)}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-end truncate text-right',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {formatTime(event.startAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return [
          <SectionCard
            title='Today & Upcoming Events'
            icon={Icons.calendar}
            count={events.total}
            transparentPanels={transparentPanels}
            colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
          >
            {eventPages.length === 0 ? (
              <EmptySection message='No active events scheduled.' />
            ) : eventPages.length === 1 ? (
              renderEventPage(eventPages[0])
            ) : (
              <DisplayCardSlideshow className='h-full min-h-0'>
                {eventPages.map((page, index) => (
                  <div key={index}>{renderEventPage(page)}</div>
                ))}
              </DisplayCardSlideshow>
            )}
          </SectionCard>
        ];
      }

      case 'movieSchedule': {
        const groupedMovies = groupMovieSchedules(movieSchedules.items);
        const rowLimit = getVisibleCount(block, VISIBLE_MOVIE_COUNT);
        const slideshowMovies = toMovieScheduleSlideshowGroups(groupedMovies);

        return [
          <SectionCard
            title='Movie Schedule'
            icon={Icons.video}
            count={movieSchedules.total}
            transparentPanels={transparentPanels}
            colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
          >
            {slideshowMovies.length === 0 ? (
              <EmptySection message='No active movie shows scheduled for today.' />
            ) : (
              <MovieScheduleSlideshow
                movieGroups={slideshowMovies}
                rowLimit={rowLimit}
                hasZebraRows={hasZebraRows}
              />
            )}
          </SectionCard>
        ];
      }

      case 'meetingSchedule': {
        const pageSize = getVisibleCount(block, VISIBLE_MEETING_COUNT);
        const meetingPages = chunkItems(meetings.items, pageSize);
        const renderMeetingPage = (pageItems: typeof meetings.items) => (
          <div className='space-y-0.5'>
            <CompactTableHeadingRow
              labels={['Title', 'Organizer', 'Location', 'Date', 'Time']}
              columnsClassName={MEETING_TABLE_GRID_TEMPLATE}
              paddingClassName='px-2 py-[4px]'
              alignments={['left', 'left', 'left', 'left', 'right']}
              surfaceStyle={
                hasZebraRows
                  ? getDisplayHeadingRowStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                    )
                  : undefined
              }
            />
            <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
              {pageItems.map((meeting, rowIndex) => (
                <div
                  key={meeting.id}
                  className={cn(
                    DISPLAY_TABLE_ROW_CLASS,
                    'gap-x-4 border-b border-white/10 last:border-b-0 rounded-none',
                    MEETING_TABLE_GRID_TEMPLATE
                  )}
                  style={{
                    ...displayTextStyles.cardDivider,
                    ...getDisplayZebraRowBackgroundStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                      rowIndex
                    )
                  }}
                >
                  <div className={DISPLAY_TABLE_BODY_CLASS} style={displayTextStyles.cardBodyText}>
                    {meeting.title}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {meeting.organizer ?? '—'}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {meeting.location ?? '—'}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={
                      isSameDay(meeting.startAt, renderedAt)
                        ? { color: 'rgb(167, 243, 208)' }
                        : displayTextStyles.cardBodyText
                    }
                  >
                    {formatMeetingDateLabel(meeting.startAt, renderedAt)}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-end truncate text-right',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {formatTime(meeting.startAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return [
          <SectionCard
            title='Meeting Schedule'
            icon={Icons.clock}
            count={meetings.total}
            transparentPanels={transparentPanels}
            colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
          >
            {meetingPages.length === 0 ? (
              <EmptySection message='No active meetings scheduled for today.' />
            ) : meetingPages.length === 1 ? (
              renderMeetingPage(meetingPages[0])
            ) : (
              <DisplayCardSlideshow className='h-full min-h-0'>
                {meetingPages.map((page, index) => (
                  <div key={index}>{renderMeetingPage(page)}</div>
                ))}
              </DisplayCardSlideshow>
            )}
          </SectionCard>
        ];
      }

      case 'weather': {
        return [];
      }

      case 'managerAvailability':
      case 'staffRoster': {
        const contentColumns = getSafeContentColumns(block);
        const managerGridTemplate = getManagerAvailabilityGridTemplate(contentColumns);
        const staffGridTemplate = getStaffRosterGridTemplate(contentColumns);

        const renderManagerPage = (pageItems: typeof activeManagersWithAttendanceToday.items) => (
          <div className='space-y-0.5'>
            <CompactTableHeadingRow
              labels={
                contentColumns === 2
                  ? ['Name', 'Phone', 'Status']
                  : contentColumns === 3
                    ? ['Name', 'Status']
                    : ['Name', 'Designation', 'Phone', 'Status']
              }
              columnsClassName={managerGridTemplate}
              alignments={
                contentColumns === 2
                  ? ['left', 'left', 'right']
                  : contentColumns === 3
                    ? ['left', 'right']
                    : ['left', 'left', 'left', 'right']
              }
              surfaceStyle={
                hasZebraRows
                  ? getDisplayHeadingRowStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                    )
                  : undefined
              }
            />
            <div
              className='grid gap-x-4 gap-y-2'
              style={{
                gridTemplateColumns: `repeat(${contentColumns}, minmax(0, 1fr))`
              }}
            >
              {splitItemsIntoColumns(pageItems, contentColumns).map((columnItems, columnIndex) => (
                <div key={columnIndex} className='space-y-0.5'>
                  {columnItems.map((item, rowIndex) => (
                    <ManagerAvailabilityRow
                      key={item.id}
                      name={item.name}
                      designation={item.designation}
                      phone={item.phone}
                      status={item.status}
                      contentColumns={contentColumns}
                      rowIndex={rowIndex}
                      transparentPanels={transparentPanels}
                      colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

        const renderStaffPage = (pageItems: typeof activeStaffWithAttendanceToday.items) => {
          const rowsPerColumn = getVisibleCount(block, VISIBLE_STAFF_ATTENDANCE_COUNT);

          return (
            <div className='space-y-0.5'>
              {contentColumns === 1 ? (
                <>
                  <CompactTableHeadingRow
                    labels={['Name', 'Designation', 'Department', 'Status']}
                    columnsClassName={staffGridTemplate}
                    alignments={['left', 'left', 'left', 'right']}
                    surfaceStyle={
                      hasZebraRows
                        ? getDisplayHeadingRowStyle(
                            transparentPanels,
                            appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                          )
                        : undefined
                    }
                  />
                  <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
                    {pageItems.map((item, rowIndex) => (
                      <AttendanceRosterRow
                        key={item.id}
                        kind='staff'
                        name={item.name}
                        designation={item.designation}
                        department={item.department}
                        shift={item.shift}
                        remarks={item.remarks}
                        status={item.status}
                        contentColumns={contentColumns}
                        rowIndex={rowIndex}
                        transparentPanels={transparentPanels}
                        colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div
                  className='grid gap-x-4 gap-y-2'
                  style={{
                    gridTemplateColumns: getStaffRosterColumnTemplate(contentColumns)
                  }}
                >
                  {Array.from({ length: contentColumns }, (_, columnIndex) =>
                    pageItems.slice(columnIndex * rowsPerColumn, (columnIndex + 1) * rowsPerColumn)
                  ).map((columnItems, columnIndex) => (
                    <div key={columnIndex} className='space-y-0.5'>
                      <CompactTableHeadingRow
                        labels={['Name', 'Designation', 'Status']}
                        columnsClassName={STAFF_ROSTER_MULTI_COLUMN_ENTRY_TEMPLATE}
                        alignments={['left', 'left', 'right']}
                        surfaceStyle={
                          hasZebraRows
                            ? getDisplayHeadingRowStyle(
                                transparentPanels,
                                appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                              )
                            : undefined
                        }
                      />
                      <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
                        {columnItems.map((item, rowIndex) => (
                          <div
                            key={item.id}
                            className={cn(
                              DISPLAY_TABLE_ROW_CLASS,
                              'gap-x-2 border-b border-white/10 last:border-b-0 rounded-none',
                              STAFF_ROSTER_MULTI_COLUMN_ENTRY_TEMPLATE
                            )}
                            style={{
                              ...displayTextStyles.cardDivider,
                              ...getDisplayRowStyle(
                                transparentPanels,
                                appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                                rowIndex
                              )
                            }}
                          >
                            <CompactTableCell
                              className='truncate text-left'
                              style={displayTextStyles.cardBodyText}
                            >
                              {item.name}
                            </CompactTableCell>
                            <CompactTableCell
                              className='truncate text-left'
                              style={displayTextStyles.cardBodyText}
                            >
                              {item.designation || '—'}
                            </CompactTableCell>
                            <div
                              className={cn(
                                'min-w-0 justify-self-end truncate text-right uppercase tracking-[0.08em]',
                                DISPLAY_TABLE_STATUS_CLASS,
                                attendanceStatusTone(item.status)
                              )}
                              style={
                                item.status === 'ABSENT' || item.status === 'NOT_MARKED'
                                  ? displayTextStyles.cardBodyText
                                  : undefined
                              }
                            >
                              {attendanceStatusLabel(item.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        };

        function renderPagedCard<T extends { id: string }>(
          title: string,
          icon: ComponentType<{ className?: string }>,
          total: number,
          items: T[],
          pageSize: number,
          renderPage: (pageItems: T[]) => ReactNode,
          emptyMessage: string
        ) {
          const pageChunks = chunkItems(items, pageSize);

          return (
            <SectionCard
              title={title}
              icon={icon}
              count={total}
              transparentPanels={transparentPanels}
              colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
            >
              {pageChunks.length === 0 ? (
                <EmptySection message={emptyMessage} />
              ) : pageChunks.length === 1 ? (
                renderPage(pageChunks[0] ?? [])
              ) : (
                <DisplayCardSlideshow className='h-full min-h-0'>
                  {pageChunks.map((page, index) => (
                    <div key={index}>{renderPage(page)}</div>
                  ))}
                </DisplayCardSlideshow>
              )}
            </SectionCard>
          );
        }

        if (key === 'managerAvailability') {
          const blockRowLimit = getVisibleCount(block, VISIBLE_MANAGER_ATTENDANCE_COUNT);

          return [
            renderPagedCard(
              'Manager Availability',
              Icons.teams,
              activeManagersWithAttendanceToday.total,
              activeManagersWithAttendanceToday.items,
              blockRowLimit,
              renderManagerPage,
              'No active managers found.'
            )
          ];
        }

        if (key === 'staffRoster') {
          const blockRowLimit = getVisibleCount(block, VISIBLE_STAFF_ATTENDANCE_COUNT);
          const pageSizeForStaffRoster = blockRowLimit * contentColumns;
          const pageChunks = chunkItems(
            activeStaffWithAttendanceToday.items,
            pageSizeForStaffRoster
          );

          return [
            <SectionCard
              key='staff-roster'
              title='Staff Roster'
              icon={Icons.user}
              count={activeStaffWithAttendanceToday.total}
              transparentPanels={transparentPanels}
              colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
            >
              {pageChunks.length === 0 ? (
                <EmptySection message='No active staff found.' />
              ) : pageChunks.length === 1 ? (
                renderStaffPage(pageChunks[0] ?? [])
              ) : (
                <DisplayCardSlideshow className='h-full min-h-0'>
                  {pageChunks.map((page, index) => (
                    <div key={index}>{renderStaffPage(page)}</div>
                  ))}
                </DisplayCardSlideshow>
              )}
            </SectionCard>
          ];
        }

        const legacyRowLimit = getVisibleCount(block, VISIBLE_STAFF_ATTENDANCE_COUNT);

        return [
          renderPagedCard(
            'Manager Availability',
            Icons.teams,
            activeManagersWithAttendanceToday.total,
            activeManagersWithAttendanceToday.items,
            legacyRowLimit,
            renderManagerPage,
            'No active managers found.'
          ),
          renderPagedCard(
            'Staff Roster',
            Icons.user,
            activeStaffWithAttendanceToday.total,
            activeStaffWithAttendanceToday.items,
            legacyRowLimit,
            renderStaffPage,
            'No active staff found.'
          )
        ];
      }

      case 'advertisements': {
        const pageSize = getVisibleCount(block, VISIBLE_AD_COUNT);
        const adPages = chunkItems(advertisements.items, pageSize);
        const renderAdPage = (pageItems: typeof advertisements.items) => (
          <div className='space-y-0.5'>
            <CompactTableHeadingRow
              labels={['Company', 'Start Date', 'End Date', 'Screens']}
              columnsClassName={ADVERTISEMENT_TABLE_GRID_TEMPLATE}
              paddingClassName='px-2 py-[4px]'
              alignments={['left', 'left', 'left', 'right']}
              surfaceStyle={
                hasZebraRows
                  ? getDisplayHeadingRowStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                    )
                  : undefined
              }
            />
            <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
              {pageItems.map((ad, rowIndex) => (
                <div
                  key={ad.id}
                  className={cn(
                    DISPLAY_TABLE_ROW_CLASS,
                    'gap-x-4 border-b border-white/10 last:border-b-0 rounded-none',
                    ADVERTISEMENT_TABLE_GRID_TEMPLATE
                  )}
                  style={{
                    ...displayTextStyles.cardDivider,
                    ...getDisplayZebraRowBackgroundStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                      rowIndex
                    )
                  }}
                >
                  <div className={DISPLAY_TABLE_BODY_CLASS} style={displayTextStyles.cardBodyText}>
                    {ad.title}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {formatShortDate(ad.startAt)}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-start truncate text-left',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {formatShortDate(ad.endAt)}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 justify-self-end truncate text-right',
                      DISPLAY_TABLE_BODY_CLASS
                    )}
                    style={displayTextStyles.cardBodyText}
                  >
                    {ad.adLocation?.trim() ? ad.adLocation : 'All Screens'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return [
          <SectionCard
            title='Advertisement Contracts'
            icon={Icons.media}
            count={advertisements.total}
            transparentPanels={transparentPanels}
            colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
          >
            {adPages.length === 0 ? (
              <EmptySection message='No active advertisement contracts are currently available.' />
            ) : adPages.length === 1 ? (
              renderAdPage(adPages[0])
            ) : (
              <DisplayCardSlideshow className='h-full min-h-0'>
                {adPages.map((page, index) => (
                  <div key={index}>{renderAdPage(page)}</div>
                ))}
              </DisplayCardSlideshow>
            )}
          </SectionCard>
        ];
      }

      case 'itemSalesTarget': {
        const pageSize = getVisibleCount(block, VISIBLE_TARGET_COUNT);
        const targetPages = chunkItems(salesTargets.items, pageSize);
        const renderTargetPage = (pageItems: typeof salesTargets.items) => (
          <div className='space-y-0.5'>
            <CompactTableHeadingRow
              labels={['Item', 'Daily', 'Weekly', 'Monthly']}
              columnsClassName='grid-cols-[minmax(0,1.2fr)_minmax(4rem,0.6fr)_minmax(4rem,0.6fr)_minmax(4rem,0.6fr)]'
              alignments={['left', 'right', 'right', 'right']}
              surfaceStyle={
                hasZebraRows
                  ? getDisplayHeadingRowStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                    )
                  : undefined
              }
            />
            <div className='divide-y divide-white/10'>
              {pageItems.map((target, rowIndex) => (
                <div
                  key={target.id}
                  className={cn(
                    DISPLAY_TABLE_ROW_CLASS,
                    'items-start gap-x-4 border-b border-white/10 last:border-b-0 rounded-none [grid-template-columns:minmax(0,1.2fr)_minmax(4rem,0.6fr)_minmax(4rem,0.6fr)_minmax(4rem,0.6fr)]'
                  )}
                  style={{
                    ...displayTextStyles.cardDivider,
                    ...getDisplayZebraRowBackgroundStyle(
                      transparentPanels,
                      appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                      rowIndex
                    )
                  }}
                >
                  <div className='min-w-0 overflow-hidden whitespace-nowrap'>
                    <div
                      className={DISPLAY_TABLE_BODY_CLASS}
                      style={displayTextStyles.cardBodyText}
                    >
                      {target.itemName}
                    </div>
                    <div
                      className={cn(
                        'mt-0.5 flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap',
                        DISPLAY_TABLE_STATUS_CLASS
                      )}
                      style={displayTextStyles.cardBodyText}
                    >
                      {target.itemCodes.length > 0 ? (
                        <RecordChip>
                          {target.itemCodes.length} code
                          {target.itemCodes.length === 1 ? '' : 's'}
                        </RecordChip>
                      ) : target.itemCode ? (
                        <RecordChip>{target.itemCode}</RecordChip>
                      ) : null}
                      <RecordChip>{target.status}</RecordChip>
                      {target.startDate && (
                        <RecordChip>Start {formatShortDate(target.startDate)}</RecordChip>
                      )}
                    </div>
                    <div
                      className={cn('mt-0.5 flex flex-wrap gap-1', DISPLAY_TABLE_HEADING_CLASS)}
                      style={displayTextStyles.cardHeadingText}
                    >
                      <span>Order {target.displayOrder}</span>
                      <span>Last import</span>
                      <span
                        className={DISPLAY_TABLE_BODY_CLASS}
                        style={displayTextStyles.cardBodyText}
                      >
                        {formatDateTime(target.lastImportAt)}
                      </span>
                    </div>
                  </div>
                  <div className='min-w-0 justify-self-end'>
                    <StatBlock
                      label='Daily'
                      value={formatProgress(target.daily)}
                      tone={target.daily.dataAvailable ? 'emerald' : 'zinc'}
                      colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                    />
                  </div>
                  <div className='min-w-0 justify-self-end'>
                    <StatBlock
                      label='Weekly'
                      value={formatProgress(target.weekly)}
                      tone={target.weekly.dataAvailable ? 'amber' : 'zinc'}
                      colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                    />
                  </div>
                  <div className='min-w-0 justify-self-end'>
                    <StatBlock
                      label='Monthly'
                      value={formatProgress(target.monthly)}
                      tone={target.monthly.dataAvailable ? 'emerald' : 'zinc'}
                      colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return [
          <SectionCard
            title='Sales Targets'
            icon={Icons.adjustments}
            count={salesTargets.total}
            transparentPanels={transparentPanels}
            colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
          >
            {targetPages.length === 0 ? (
              <EmptySection message='No active sales targets are currently available.' />
            ) : targetPages.length === 1 ? (
              renderTargetPage(targetPages[0])
            ) : (
              <DisplayCardSlideshow className='h-full min-h-0'>
                {targetPages.map((page, index) => (
                  <div key={index}>{renderTargetPage(page)}</div>
                ))}
              </DisplayCardSlideshow>
            )}
          </SectionCard>
        ];
      }

      case 'concessionPriceList': {
        const contentColumns = getSafeContentColumns(block);
        const rowsPerColumn = getVisibleCount(block, VISIBLE_CONCESSION_COUNT);
        const pageSize = rowsPerColumn * contentColumns;
        const concessionPages = chunkItems(concessionPriceList.items, pageSize);
        const renderConcessionPage = (pageItems: typeof concessionPriceList.items) => (
          <div className='space-y-0.5'>
            {contentColumns === 1 ? (
              <>
                <CompactTableHeadingRow
                  labels={['Item', 'Price']}
                  columnsClassName={CONCESSION_PRICE_TABLE_GRID_TEMPLATE}
                  alignments={['left', 'right']}
                  surfaceStyle={
                    hasZebraRows
                      ? getDisplayHeadingRowStyle(
                          transparentPanels,
                          appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                        )
                      : undefined
                  }
                />
                <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
                  {pageItems.map((item, rowIndex) => (
                    <div
                      key={item.id}
                      className={cn(
                        DISPLAY_TABLE_ROW_CLASS,
                        'gap-x-4 border-b border-white/10 last:border-b-0 rounded-none',
                        CONCESSION_PRICE_TABLE_GRID_TEMPLATE
                      )}
                      style={{
                        ...displayTextStyles.cardDivider,
                        ...getDisplayZebraRowBackgroundStyle(
                          transparentPanels,
                          appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                          rowIndex
                        )
                      }}
                    >
                      <CompactTableCell
                        className='truncate text-left'
                        style={displayTextStyles.cardBodyText}
                      >
                        {item.itemName}
                      </CompactTableCell>
                      <CompactTableCell
                        className='justify-self-end truncate text-right tabular-nums'
                        style={displayTextStyles.cardBodyText}
                      >
                        {formatPrice(item.price)}
                      </CompactTableCell>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                className='grid gap-x-4 gap-y-2'
                style={{
                  gridTemplateColumns: getConcessionPriceListColumnTemplate(contentColumns)
                }}
              >
                {Array.from({ length: contentColumns }, (_, columnIndex) =>
                  pageItems.slice(columnIndex * rowsPerColumn, (columnIndex + 1) * rowsPerColumn)
                ).map((columnItems, columnIndex) => (
                  <div key={columnIndex} className='space-y-0.5'>
                    <CompactTableHeadingRow
                      labels={['Item', 'Price']}
                      columnsClassName={CONCESSION_PRICE_TABLE_GRID_TEMPLATE}
                      alignments={['left', 'right']}
                      surfaceStyle={
                        hasZebraRows
                          ? getDisplayHeadingRowStyle(
                              transparentPanels,
                              appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors
                            )
                          : undefined
                      }
                    />
                    <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
                      {columnItems.map((item, rowIndex) => (
                        <div
                          key={item.id}
                          className={cn(
                            DISPLAY_TABLE_ROW_CLASS,
                            'gap-x-4 border-b border-white/10 last:border-b-0 rounded-none',
                            CONCESSION_PRICE_TABLE_GRID_TEMPLATE
                          )}
                          style={{
                            ...displayTextStyles.cardDivider,
                            ...getDisplayZebraRowBackgroundStyle(
                              transparentPanels,
                              appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors,
                              rowIndex
                            )
                          }}
                        >
                          <CompactTableCell
                            className='truncate text-left'
                            style={displayTextStyles.cardBodyText}
                          >
                            {item.itemName}
                          </CompactTableCell>
                          <CompactTableCell
                            className='justify-self-end truncate text-right tabular-nums'
                            style={displayTextStyles.cardBodyText}
                          >
                            {formatPrice(item.price)}
                          </CompactTableCell>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

        return [
          <SectionCard
            title='Concession Price List'
            icon={Icons.billing}
            count={concessionPriceList.total}
            transparentPanels={transparentPanels}
            colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
          >
            {concessionPages.length === 0 ? (
              <EmptySection message='No active concession price items are currently available.' />
            ) : concessionPages.length === 1 ? (
              renderConcessionPage(concessionPages[0])
            ) : (
              <DisplayCardSlideshow className='h-full min-h-0'>
                {concessionPages.map((page, index) => (
                  <div key={index}>{renderConcessionPage(page)}</div>
                ))}
              </DisplayCardSlideshow>
            )}
          </SectionCard>
        ];
      }

      default:
        return [];
    }
  };

  return (
    <main
      data-display-board-root
      className={cn(
        'relative min-h-[100dvh] overflow-hidden bg-zinc-950',
        DISPLAY_CARD_BODY_TEXT_CLASS
      )}
      style={
        {
          fontFamily: DISPLAY_FONT_FAMILY,
          ['--display-header-bg' as string]: appearanceColors?.headerBackground ?? undefined,
          ['--display-header-text' as string]: appearanceColors?.headerText ?? undefined,
          ['--display-header-muted-text' as string]: appearanceColors?.headerMutedText ?? undefined,
          ['--display-card-bg' as string]: appearanceColors?.cardBackground ?? undefined,
          ['--display-card-border' as string]: appearanceColors?.cardBorder ?? undefined,
          ['--display-card-title-bar-bg' as string]:
            appearanceColors?.cardTitleBarBackground ?? undefined,
          ['--display-card-row-bg' as string]: appearanceColors?.cardRowBackground
            ? hexToRgba(appearanceColors.cardRowBackground, transparentPanels ? 0.55 : 1)
            : undefined,
          ['--display-card-row-alt-bg' as string]: appearanceColors?.cardRowAlternateBackground
            ? hexToRgba(appearanceColors.cardRowAlternateBackground, transparentPanels ? 0.55 : 1)
            : undefined,
          ['--display-card-title-text' as string]: appearanceColors?.cardTitleText ?? undefined,
          ['--display-card-heading-text' as string]: appearanceColors?.cardHeadingText ?? undefined,
          ['--display-card-body-text' as string]: appearanceColors?.cardBodyText ?? undefined,
          ['--display-card-divider' as string]: appearanceColors?.cardDivider ?? undefined,
          color: 'var(--display-card-body-text, #f8f4e8)'
        } as CSSProperties
      }
    >
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(180,83,9,0.12),transparent_30%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      {wallpaper?.imageUrl ? (
        <div className='absolute inset-0'>
          <Image
            src={wallpaper.imageUrl}
            alt=''
            fill
            unoptimized
            sizes='100vw'
            className='pointer-events-none select-none object-cover'
            style={{
              objectFit: wallpaper.fit,
              objectPosition: getBackgroundObjectPosition(wallpaper.position),
              opacity: wallpaper.opacity,
              filter: wallpaper.blur > 0 ? `blur(${wallpaper.blur}px)` : 'none'
            }}
          />
        </div>
      ) : null}
      {wallpaper?.imageUrl ? (
        <div
          className='absolute inset-0 bg-slate-950'
          style={{ opacity: wallpaper.overlayOpacity }}
        />
      ) : null}
      <div
        className={cn(
          'relative mx-auto flex min-h-[100dvh] w-full max-w-full flex-col gap-2 overflow-hidden xl:h-[100dvh] xl:min-h-0',
          DISPLAY_LAYOUT_PADDING_CLASS
        )}
        style={{
          maxWidth: `${displayPage.resolutionWidth}px`,
          minHeight: `${displayPage.resolutionHeight}px`
        }}
      >
        <header
          className={cn(
            'relative flex min-h-[76px] shrink-0 items-center overflow-hidden rounded-none px-3 py-2 xl:min-h-[84px] xl:px-4 xl:py-2.5',
            getDisplayHeaderSurfaceClass(transparentPanels)
          )}
        >
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center text-center'>
              <div
                className={cn(
                  'text-[1.65rem] font-semibold leading-none tracking-tight md:text-[1.95rem] xl:text-[2.3rem]',
                  DISPLAY_HEADER_TEXT_CLASS
                )}
              >
                <DisplayBoardClock initialIso={renderedAt.toISOString()} />
              </div>
              <div
                className={cn(
                  'mt-0.5 text-[15px] font-medium md:text-[16px]',
                  DISPLAY_HEADER_MUTED_TEXT_CLASS
                )}
              >
                {currentDate}
              </div>
            </div>
          </div>

          <div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 xl:left-4'>
            <div className='flex min-w-0 items-center gap-4 overflow-visible pointer-events-auto xl:gap-6'>
              <Image
                src='/Logo/cue-logo.png'
                alt='CUE logo'
                width={200}
                height={80}
                priority
                className='h-[60px] w-auto max-h-[76px] max-w-[145px] shrink-0 object-contain xl:h-[66px]'
              />
              {weatherBlock ? (
                <HeaderWeatherWidget
                  weather={weather}
                  transparentPanels={transparentPanels}
                  colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                />
              ) : null}
            </div>
          </div>

          <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 xl:right-4'>
            <div className='flex min-w-0 items-center justify-end gap-2 overflow-hidden pointer-events-auto'>
              {alertsBlock ? (
                <HeaderSummaryWidget
                  label='Alerts'
                  icon={Icons.alertCircle}
                  countLabel={`${alerts.total.toLocaleString()} active`}
                  detail={firstAlert ? firstAlert.title : 'No active alerts'}
                  tone='rose'
                  transparentPanels={transparentPanels}
                  colors={appearanceColors ?? DEFAULT_DISPLAY_LAYOUT_APPEARANCE.colors}
                />
              ) : null}
              {!alertsBlock ? <div aria-hidden='true' /> : null}
            </div>
          </div>
        </header>

        {layoutBlocks.length === 0 ? (
          <section
            className={cn(
              'flex flex-1 items-center justify-center px-6 py-10 text-center rounded-none',
              getDisplayPanelSurfaceClass(transparentPanels)
            )}
          >
            <div className='max-w-xl space-y-3'>
              <div className={cn('text-2xl font-semibold', DISPLAY_CARD_BODY_TEXT_CLASS)}>
                No display sections enabled
              </div>
              <div className={cn('text-sm', DISPLAY_CARD_BODY_TEXT_CLASS)}>
                Open the display page settings and enable the widgets you want to show on this
                screen.
              </div>
            </div>
          </section>
        ) : (
          <section
            className={cn(
              'grid flex-1 min-h-0 overflow-hidden xl:auto-rows-[minmax(0,1fr)] xl:[grid-template-columns:var(--display-grid-columns)]',
              DISPLAY_LAYOUT_GAP_CLASS
            )}
            style={
              {
                boxSizing: 'border-box',
                maxWidth: '100%',
                width: '100%',
                gridTemplateRows: displayGridRows,
                '--display-grid-columns': displayGridColumns
              } as CSSProperties
            }
          >
            {positionedGridBlocks.flatMap((block) =>
              renderBlockCards(block.key).map((node, index) => {
                const placement = getDisplayBlockGridPlacement(block);

                return (
                  <div
                    key={`${block.key}-${index}`}
                    className='min-h-0'
                    style={{
                      gridColumn: `${block.column} / span ${block.colSpan}`,
                      gridRow: `${placement.rowStart} / span ${placement.rowSpanUnits}`
                    }}
                  >
                    {node}
                  </div>
                );
              })
            )}
          </section>
        )}
      </div>
    </main>
  );
}
