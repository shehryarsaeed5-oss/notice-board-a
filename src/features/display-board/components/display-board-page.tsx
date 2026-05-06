import { format } from 'date-fns';
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
  normalizeDisplayLayoutConfig,
  type DisplayBlockKey,
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
const DISPLAY_CONTENT_TITLE_CLASS = 'truncate text-[12px] font-medium text-zinc-50 xl:text-[13px]';
const DISPLAY_CONTENT_SMALL_CLASS = 'text-[11px] leading-[1.15]';
const DISPLAY_SECTION_LIST_GAP_CLASS = 'space-y-1';
const DISPLAY_SECTION_ROW_CLASS = 'border border-white/10 bg-black/20 px-3 py-2 rounded-none';
const DISPLAY_META_INLINE_CLASS =
  'inline-flex min-w-0 items-center truncate text-[10px] leading-none text-zinc-300';
const DISPLAY_META_SEPARATOR_CLASS = 'mx-1 shrink-0 text-zinc-500';

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

function AlertBannerCard({ alert }: { alert: DisplayBoardAlertItem }) {
  const theme = getAlertTheme(alert.alertType);

  return (
    <div
      className={cn(
        'border px-2 py-1.5 text-zinc-50 backdrop-blur-xl',
        theme.accent,
        alert.alertType === 'URGENT' ? 'animate-pulse' : ''
      )}
    >
      <div className='flex items-center justify-between gap-2.5'>
        <div className='min-w-0'>
          <div className='flex items-center gap-1.5'>
            <theme.icon className={cn('size-4 shrink-0', theme.iconClass)} />
            <div className='truncate text-[13px] font-semibold tracking-tight text-zinc-50 xl:text-sm'>
              {alert.title}
            </div>
          </div>
          {alert.message ? (
            <div className='mt-0.5 max-h-8 overflow-hidden text-[11px] leading-[1.15] text-zinc-100/90'>
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

      <div className='mt-1.5 flex flex-wrap gap-1 text-[10px] text-zinc-200/80'>
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
      return 'border-white/10 bg-white/5 text-zinc-200';
  }
}

function attendanceStatusLabel(status: DisplayBoardAttendanceDisplayStatus) {
  return status === 'NOT_MARKED' ? 'Not marked' : status;
}

function AttendanceStatusBadge({ status }: { status: DisplayBoardAttendanceDisplayStatus }) {
  return (
    <Badge className={cn('!rounded-none px-1.5 py-[1px] text-[9px]', attendanceStatusTone(status))}>
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
      return 'text-zinc-400';
  }
}

function AttendanceRosterRow({
  name,
  designation,
  department,
  shift,
  remarks,
  status,
  kind
}: {
  name: string;
  designation: string | null;
  department?: string | null;
  shift: string | null;
  remarks?: string | null;
  status: DisplayBoardAttendanceDisplayStatus;
  kind: 'staff' | 'manager';
}) {
  return (
    <div className='border border-white/10 bg-black/20 px-2 py-[5px] rounded-none'>
      <div className='flex items-center justify-between gap-1.5'>
        <div className='flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap'>
          <div className={cn(DISPLAY_CONTENT_TITLE_CLASS, 'shrink-0 leading-none')}>{name}</div>
          {designation ? (
            <span className={cn(DISPLAY_META_INLINE_CLASS, 'gap-1 shrink-0')}>
              {kind === 'manager' ? (
                <Icons.badgeCheck className='size-3 shrink-0 text-amber-300/90' />
              ) : null}
              <span className='truncate'>{designation}</span>
            </span>
          ) : null}
          {kind === 'staff' && department ? (
            <>
              <span className={DISPLAY_META_SEPARATOR_CLASS}>•</span>
              <span className={cn(DISPLAY_META_INLINE_CLASS, 'truncate')}>{department}</span>
            </>
          ) : null}
          {shift ? (
            <>
              <span className={DISPLAY_META_SEPARATOR_CLASS}>•</span>
              <span className={cn(DISPLAY_META_INLINE_CLASS, 'shrink-0')}>Shift {shift}</span>
            </>
          ) : null}
          {remarks ? (
            <>
              <span className={DISPLAY_META_SEPARATOR_CLASS}>•</span>
              <span className='truncate text-[10px] leading-none text-zinc-400'>{remarks}</span>
            </>
          ) : null}
        </div>
        <AttendanceStatusBadge status={status} />
      </div>
    </div>
  );
}

function ManagerAvailabilityRow({
  name,
  designation,
  phone,
  status
}: {
  name: string;
  designation: string | null;
  phone: string | null;
  status: DisplayBoardAttendanceDisplayStatus;
}) {
  return (
    <div className='border border-white/10 bg-black/20 px-2 py-[5px] rounded-none'>
      <div className='grid items-center gap-2 whitespace-nowrap [grid-template-columns:minmax(120px,1.2fr)_minmax(90px,0.9fr)_minmax(110px,0.9fr)_auto]'>
        <div className='min-w-0 truncate text-[12px] font-medium leading-none text-zinc-50 xl:text-[13px]'>
          {name}
        </div>
        <div className='min-w-0 truncate text-[10px] leading-none text-zinc-300'>
          {designation ?? '—'}
        </div>
        <div className='min-w-0 truncate text-[10px] leading-none text-zinc-300'>
          {phone ?? '—'}
        </div>
        <div
          className={cn(
            'min-w-0 truncate text-right text-[10px] font-semibold uppercase tracking-[0.08em]',
            getManagerDutyTone(status)
          )}
        >
          {getManagerDutyLabel(status)}
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  count,
  children
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  count: number;
  children: ReactNode;
}) {
  return (
    <Card className='!rounded-none flex h-full min-h-0 flex-col gap-0 overflow-hidden border-white/10 bg-white/6 py-0 text-zinc-50 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl'>
      <CardHeader className='shrink-0 px-2.5 pt-1 pb-0'>
        <div className='flex items-center justify-between gap-2.5'>
          <CardTitle className='text-[14px] font-semibold text-zinc-50 xl:text-[15px]'>
            {title}
          </CardTitle>
          <div className='flex items-center gap-1 text-[9px] text-zinc-100'>
            <Icon className='size-3 text-zinc-200' />
            <span className='font-medium tabular-nums leading-none'>{count.toLocaleString()}</span>
          </div>
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
      className={cn(
        'flex items-center gap-1.5 border border-dashed border-white/10 bg-black/18 px-2 py-0.5 text-zinc-400',
        DISPLAY_CONTENT_SMALL_CLASS
      )}
    >
      <Icons.info className='size-3.5 shrink-0 text-amber-300/80' />
      <span className='max-h-8 overflow-hidden'>{message}</span>
    </div>
  );
}

function RecordChip({ children }: { children: ReactNode }) {
  return <span className={DISPLAY_META_INLINE_CLASS}>{children}</span>;
}

function HeaderWidgetBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Badge
      variant='outline'
      className={cn(
        '!rounded-none border-white/10 bg-white/5 px-1.5 py-[2px] text-[9px] text-zinc-100',
        className
      )}
    >
      {children}
    </Badge>
  );
}

function HeaderWeatherWidget({ weather }: { weather: DisplayBoardWeatherData | null }) {
  const weatherIconSrc = weather?.iconPath ?? '/weather-icons/meteocons/not-available.svg';
  const temperatureLabel =
    weather && weather.status === 'ready' && weather.temperatureC !== null
      ? `${Math.round(weather.temperatureC)}°C`
      : 'Weather unavailable';

  return (
    <div className='flex min-w-0 max-w-[340px] flex-none items-center gap-2 bg-transparent px-0 py-0 shadow-none backdrop-blur-0'>
      <div className='relative size-10 shrink-0 overflow-hidden bg-transparent'>
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
              <div className='truncate text-[15px] font-semibold leading-none text-zinc-50'>
                {temperatureLabel} {weather.city}
              </div>
              <div className='truncate text-[12px] text-zinc-300'>
                {weather.condition ?? 'Weather unavailable'}
              </div>
            </div>
          ) : (
            <div className='space-y-0.5'>
              <div className='truncate text-[15px] font-medium text-zinc-50'>
                Weather unavailable
              </div>
              <div className='truncate text-[12px] text-zinc-300'>Weather unavailable</div>
            </div>
          )
        ) : (
          <div className='space-y-0.5'>
            <div className='text-[15px] font-medium text-zinc-50'>Weather not set</div>
            <div className='truncate text-[12px] text-zinc-300'>
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
  tone
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  countLabel: string;
  detail: string | null;
  tone: 'amber' | 'rose' | 'violet';
}) {
  const toneClass =
    tone === 'amber'
      ? 'border-amber-400/20 bg-amber-400/10 text-amber-100'
      : tone === 'rose'
        ? 'border-rose-400/20 bg-rose-400/10 text-rose-100'
        : 'border-violet-400/20 bg-violet-400/10 text-violet-100';

  const iconClass =
    tone === 'amber' ? 'text-amber-200' : tone === 'rose' ? 'text-rose-200' : 'text-violet-200';

  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-1.5 border px-2 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl !rounded-none',
        toneClass
      )}
    >
      <div className='!rounded-none flex size-7 shrink-0 items-center justify-center border border-white/10 bg-black/20'>
        <Icon className={cn('size-3.5', iconClass)} />
      </div>
      <div className='min-w-0'>
        <div className='flex items-center gap-1.5'>
          <div className='text-[9px] uppercase tracking-[0.22em] text-zinc-300'>{label}</div>
          <HeaderWidgetBadge>{countLabel}</HeaderWidgetBadge>
        </div>
        {detail ? <div className='truncate text-[10px] text-zinc-200/90'>{detail}</div> : null}
      </div>
    </div>
  );
}

function StatBlock({
  label,
  value,
  tone = 'zinc'
}: {
  label: string;
  value: string;
  tone?: 'zinc' | 'emerald' | 'amber';
}) {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
      : tone === 'amber'
        ? 'border-amber-400/20 bg-amber-400/10 text-amber-100'
        : 'border-white/10 bg-white/5 text-zinc-100';

  return (
    <div className={`border px-2 py-1 rounded-none ${toneClass}`}>
      <div className='text-[9px] uppercase tracking-[0.18em] text-current/70'>{label}</div>
      <div className='mt-0.5 text-[10px] font-semibold leading-[1.15] text-current xl:text-[11px]'>
        {value}
      </div>
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
    <main className='relative min-h-[100dvh] overflow-hidden bg-zinc-950 text-zinc-50'>
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_25%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='relative flex min-h-[100dvh] items-center justify-center p-6'>
        <Card className='!rounded-none max-w-2xl border-white/10 bg-white/6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl'>
          <CardHeader>
            <CardDescription className='text-zinc-300'>Public display board</CardDescription>
            <CardTitle className='text-3xl text-zinc-50'>
              {reason === 'not_found' ? 'Display page not found' : 'Display page is inactive'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-zinc-300'>
              The display route for <span className='font-mono text-zinc-100'>/display/{slug}</span>{' '}
              is not currently available on the board.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <Badge
                variant='outline'
                className='!rounded-none border-white/10 bg-white/5 text-zinc-100'
              >
                <Icons.info className='mr-1 size-3.5' />
                {reason === 'not_found' ? 'No record found' : 'Status not active'}
              </Badge>
              <Badge
                variant='outline'
                className='!rounded-none border-white/10 bg-white/5 text-zinc-100'
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
          <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
            {pageItems.map((event) => (
              <div key={event.id} className={DISPLAY_SECTION_ROW_CLASS}>
                <div className='flex items-center justify-between gap-2.5'>
                  <div className='min-w-0 flex-1 overflow-hidden whitespace-nowrap'>
                    <div className={cn(DISPLAY_CONTENT_TITLE_CLASS, 'leading-none')}>
                      {event.title}
                    </div>
                    <div className='mt-0.5 flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap text-[10px] text-zinc-300'>
                      <RecordChip>
                        {event.clientName ?? event.companyName ?? 'General event'}
                      </RecordChip>
                      <RecordChip>{event.screenName ?? '—'}</RecordChip>
                      <RecordChip>
                        {event.endAt ? `Ends ${formatTime(event.endAt)}` : 'Ends —'}
                      </RecordChip>
                    </div>
                  </div>
                  <Badge className='!rounded-none border-white/10 bg-white/5 text-zinc-100'>
                    {formatTime(event.startAt)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );

        return [
          <SectionCard title='Today Events' icon={Icons.calendar} count={events.total}>
            {eventPages.length === 0 ? (
              <EmptySection message='No active events scheduled for today.' />
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
          <SectionCard title='Movie Schedule' icon={Icons.video} count={movieSchedules.total}>
            {slideshowMovies.length === 0 ? (
              <EmptySection message='No active movie shows scheduled for today.' />
            ) : (
              <MovieScheduleSlideshow movieGroups={slideshowMovies} rowLimit={rowLimit} />
            )}
          </SectionCard>
        ];
      }

      case 'meetingSchedule': {
        const pageSize = getVisibleCount(block, VISIBLE_MEETING_COUNT);
        const meetingPages = chunkItems(meetings.items, pageSize);
        const renderMeetingPage = (pageItems: typeof meetings.items) => (
          <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
            {pageItems.map((meeting) => (
              <div key={meeting.id} className={DISPLAY_SECTION_ROW_CLASS}>
                <div className='flex items-center justify-between gap-2.5'>
                  <div className='min-w-0 flex-1 overflow-hidden whitespace-nowrap'>
                    <div className={cn(DISPLAY_CONTENT_TITLE_CLASS, 'leading-none')}>
                      {meeting.title}
                    </div>
                    <div className='mt-0.5 flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap text-[10px] text-zinc-300'>
                      <RecordChip>{meeting.organizer ?? 'No organizer listed'}</RecordChip>
                      {meeting.location ? <RecordChip>{meeting.location}</RecordChip> : null}
                      {meeting.endAt ? (
                        <RecordChip>Ends {formatTime(meeting.endAt)}</RecordChip>
                      ) : null}
                    </div>
                  </div>
                  <Badge className='!rounded-none border-white/10 bg-white/5 text-zinc-100'>
                    {formatTime(meeting.startAt)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );

        return [
          <SectionCard title='Meeting Schedule' icon={Icons.clock} count={meetings.total}>
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
        const renderManagerPage = (pageItems: typeof activeManagersWithAttendanceToday.items) => (
          <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
            {pageItems.map((item) => (
              <ManagerAvailabilityRow
                key={item.id}
                name={item.name}
                designation={item.designation}
                phone={item.phone}
                status={item.status}
              />
            ))}
          </div>
        );

        const renderStaffPage = (pageItems: typeof activeStaffWithAttendanceToday.items) => (
          <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
            {pageItems.map((item) => (
              <AttendanceRosterRow
                key={item.id}
                kind='staff'
                name={item.name}
                designation={item.designation}
                department={item.department}
                shift={item.shift}
                remarks={item.remarks}
                status={item.status}
              />
            ))}
          </div>
        );

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
            <SectionCard title={title} icon={icon} count={total}>
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

          return [
            renderPagedCard(
              'Staff Roster',
              Icons.user,
              activeStaffWithAttendanceToday.total,
              activeStaffWithAttendanceToday.items,
              blockRowLimit,
              renderStaffPage,
              'No active staff found.'
            )
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
          <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
            {pageItems.map((ad) => (
              <div key={ad.id} className={DISPLAY_SECTION_ROW_CLASS}>
                <div className='flex items-center justify-between gap-2.5'>
                  <div className='min-w-0 flex-1 overflow-hidden whitespace-nowrap'>
                    <div className={cn(DISPLAY_CONTENT_TITLE_CLASS, 'leading-none')}>
                      {ad.title}
                    </div>
                    <div className='mt-0.5 flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap text-[10px] text-zinc-300'>
                      <RecordChip>Active contract</RecordChip>
                      <RecordChip>
                        {formatShortDate(ad.startAt)} - {formatShortDate(ad.endAt)}
                      </RecordChip>
                      {ad.adLocation && <RecordChip>{ad.adLocation}</RecordChip>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

        return [
          <SectionCard
            title='Advertisement Contracts'
            icon={Icons.media}
            count={advertisements.total}
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
            {pageItems.map((target) => (
              <div
                key={target.id}
                className='border border-white/10 bg-black/20 px-2.5 py-1.5 rounded-none'
              >
                <div className='flex items-center justify-between gap-2.5'>
                  <div className='min-w-0 flex-1 overflow-hidden whitespace-nowrap'>
                    <div className='truncate text-[12px] font-medium leading-none text-zinc-50 xl:text-[13px]'>
                      {target.itemName}
                    </div>
                    <div className='mt-0.5 flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap text-[10px] text-zinc-300'>
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
                  </div>
                  <div className='flex flex-col items-end gap-0.5 text-right'>
                    <Badge className='!rounded-none border-white/10 bg-white/5 px-1.5 py-[2px] text-[9px] text-zinc-100'>
                      Order {target.displayOrder}
                    </Badge>
                    <div className='text-[9px] uppercase tracking-[0.18em] text-zinc-400'>
                      Last import
                    </div>
                    <div className='text-[10px] text-zinc-200'>
                      {formatDateTime(target.lastImportAt)}
                    </div>
                  </div>
                </div>

                {!target.daily.dataAvailable &&
                !target.weekly.dataAvailable &&
                !target.monthly.dataAvailable ? (
                  <div className='mt-1.5'>
                    <EmptySection message='Sales data not imported for the selected period.' />
                  </div>
                ) : null}

                <div className='mt-1.5 grid grid-cols-1 gap-1 xl:grid-cols-3'>
                  <StatBlock
                    label='Daily'
                    value={formatProgress(target.daily)}
                    tone={target.daily.dataAvailable ? 'emerald' : 'zinc'}
                  />
                  <StatBlock
                    label='Weekly'
                    value={formatProgress(target.weekly)}
                    tone={target.weekly.dataAvailable ? 'amber' : 'zinc'}
                  />
                  <StatBlock
                    label='Monthly'
                    value={formatProgress(target.monthly)}
                    tone={target.monthly.dataAvailable ? 'emerald' : 'zinc'}
                  />
                </div>
              </div>
            ))}
          </div>
        );

        return [
          <SectionCard title='Sales Targets' icon={Icons.adjustments} count={salesTargets.total}>
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
        const pageSize = getVisibleCount(block, VISIBLE_CONCESSION_COUNT);
        const concessionPages = chunkItems(concessionPriceList.items, pageSize);
        const renderConcessionPage = (pageItems: typeof concessionPriceList.items) => (
          <div className={DISPLAY_SECTION_LIST_GAP_CLASS}>
            {pageItems.map((item) => (
              <div key={item.id} className={DISPLAY_SECTION_ROW_CLASS}>
                <div className='flex items-center justify-between gap-2.5'>
                  <div className='min-w-0 flex-1 overflow-hidden whitespace-nowrap'>
                    <div className={cn(DISPLAY_CONTENT_TITLE_CLASS, 'leading-none')}>
                      {item.itemName}
                    </div>
                    <div className='mt-0.5 flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap text-[10px] text-zinc-300'>
                      {item.category && <RecordChip>{item.category}</RecordChip>}
                      <RecordChip>{item.status}</RecordChip>
                    </div>
                  </div>
                  <Badge className='!rounded-none border-amber-400/30 bg-amber-400/15 text-amber-100'>
                    {formatPrice(item.price)}
                  </Badge>
                </div>
                <div className='mt-1 flex flex-wrap gap-1 text-[10px] text-zinc-400'>
                  <RecordChip>Sort {item.sortOrder}</RecordChip>
                </div>
              </div>
            ))}
          </div>
        );

        return [
          <SectionCard
            title='Concession Price List'
            icon={Icons.billing}
            count={concessionPriceList.total}
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
    <main className='relative min-h-[100dvh] overflow-hidden bg-zinc-950 text-zinc-50'>
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(180,83,9,0.12),transparent_30%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500' />

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
        <header className='relative flex min-h-[76px] shrink-0 items-center overflow-hidden rounded-none border border-white/10 bg-white/6 px-3 py-2 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl xl:min-h-[84px] xl:px-4 xl:py-2.5'>
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center text-center'>
              <div className='text-[1.65rem] font-semibold leading-none tracking-tight text-zinc-50 md:text-[1.95rem] xl:text-[2.3rem]'>
                <DisplayBoardClock initialIso={renderedAt.toISOString()} />
              </div>
              <div className='mt-0.5 text-[15px] font-medium text-zinc-300 md:text-[16px]'>
                {currentDate}
              </div>
            </div>
          </div>

          <div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 xl:left-4'>
            <div className='flex min-w-0 items-center gap-2 overflow-visible pointer-events-auto'>
              <Image
                src='/Logo/cue-logo.png'
                alt='CUE logo'
                width={200}
                height={80}
                priority
                className='h-[60px] w-auto max-h-[76px] max-w-[145px] shrink-0 object-contain xl:h-[66px]'
              />
              {weatherBlock ? <HeaderWeatherWidget weather={weather} /> : null}
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
                />
              ) : null}
              {!alertsBlock ? <div aria-hidden='true' /> : null}
            </div>
          </div>
        </header>

        {layoutBlocks.length === 0 ? (
          <section className='flex flex-1 items-center justify-center border border-white/10 bg-white/6 px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl rounded-none'>
            <div className='max-w-xl space-y-3'>
              <div className='text-2xl font-semibold text-zinc-50'>No display sections enabled</div>
              <div className='text-sm text-zinc-300'>
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
                      gridRow: `${placement.rowStart} / span ${placement.rowSpan}`
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
