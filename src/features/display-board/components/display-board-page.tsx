import { format } from 'date-fns';
import type { ComponentType, ReactNode } from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { getDisplayBoardBySlug } from '../api/service';
import type { DisplayBoardAlertItem, DisplayBoardWeatherData } from '../api/types';
import {
  getEnabledSortedDisplayBlocks,
  type DisplayBlockKey,
  type DisplayLayoutBlockConfig
} from '@/features/display-pages/lib/display-layout-config';
import { DisplayBoardAutoRefresh } from './display-board-auto-refresh';
import { DisplayBoardClock } from './display-board-clock';

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

function getVisibleCount(block: DisplayLayoutBlockConfig, fallback: number) {
  return Math.max(1, block.rowLimit || fallback);
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
        'rounded-[18px] border px-3 py-2 text-zinc-50 backdrop-blur-xl',
        theme.accent,
        alert.alertType === 'URGENT' ? 'animate-pulse' : ''
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <theme.icon className={cn('size-4 shrink-0', theme.iconClass)} />
            <div className='truncate text-[13px] font-semibold tracking-tight text-zinc-50 xl:text-sm'>
              {alert.title}
            </div>
          </div>
          {alert.message ? (
            <div className='mt-1 max-h-8 overflow-hidden text-[11px] leading-4 text-zinc-100/90'>
              {alert.message}
            </div>
          ) : null}
        </div>
        <Badge
          variant='outline'
          className={cn('rounded-full px-2.5 py-0.5 text-[10px]', theme.badge)}
        >
          {alert.alertType}
        </Badge>
      </div>

      <div className='mt-2 flex flex-wrap gap-1.5 text-[10px] text-zinc-200/80'>
        <RecordChip>Priority {alert.priority}</RecordChip>
        <RecordChip>Until {formatAlertExpiry(alert.endAt)}</RecordChip>
      </div>
    </div>
  );
}

function statusTone(status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'LATE') {
  switch (status) {
    case 'PRESENT':
      return 'border-emerald-400/30 bg-emerald-400/15 text-emerald-100';
    case 'ABSENT':
      return 'border-rose-400/30 bg-rose-400/10 text-rose-100';
    case 'LEAVE':
      return 'border-amber-400/30 bg-amber-400/10 text-amber-100';
    case 'LATE':
      return 'border-orange-400/30 bg-orange-400/10 text-orange-100';
  }
}

function SummaryStatPill({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'rose' | 'amber' | 'orange' | 'zinc';
}) {
  const toneClass =
    tone === 'zinc'
      ? 'border-white/10 bg-white/5 text-zinc-100'
      : tone === 'emerald'
        ? statusTone('PRESENT')
        : tone === 'rose'
          ? statusTone('ABSENT')
          : tone === 'amber'
            ? statusTone('LEAVE')
            : statusTone('LATE');

  return (
    <div className={cn('rounded-lg border px-2 py-1', toneClass)}>
      <div className='text-[9px] uppercase tracking-[0.2em] text-current/70'>{label}</div>
      <div className='mt-0.5 text-[11px] font-semibold text-current'>{value.toLocaleString()}</div>
    </div>
  );
}

function AttendanceRosterItem({
  name,
  designation,
  department,
  shift,
  remarks
}: {
  name: string;
  designation: string | null;
  department?: string | null;
  shift: string | null;
  remarks?: string | null;
}) {
  return (
    <div className='rounded-lg border border-white/10 bg-black/20 px-3 py-2'>
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <div className='truncate text-[12px] font-medium text-zinc-50 xl:text-[13px]'>{name}</div>
          <div className='mt-0.5 flex flex-wrap gap-1 text-[10px] text-zinc-300'>
            {designation && <RecordChip>{designation}</RecordChip>}
            {department && <RecordChip>{department}</RecordChip>}
          </div>
        </div>
        <Badge className='border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-100'>
          PRESENT
        </Badge>
      </div>
      <div className='mt-1 flex flex-wrap gap-1 text-[10px] text-zinc-400'>
        <RecordChip>Shift: {shift ?? '—'}</RecordChip>
      </div>
      {remarks ? (
        <div className='mt-1 max-h-7 overflow-hidden text-[10px] text-zinc-400'>{remarks}</div>
      ) : null}
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  count,
  children,
  footer
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  count: number;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Card className='flex h-full min-h-0 flex-col gap-0 overflow-hidden border-white/10 bg-white/6 py-0 text-zinc-50 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl'>
      <CardHeader className='shrink-0 px-3.5 pt-2 pb-0.5'>
        <div className='flex items-start justify-between gap-3'>
          <CardTitle className='text-[14px] font-semibold text-zinc-50 xl:text-[15px]'>
            {title}
          </CardTitle>
          <Badge
            variant='outline'
            className='rounded-full border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-100'
          >
            <Icon className='mr-1 size-3' />
            {count.toLocaleString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='flex min-h-0 flex-1 flex-col gap-1.5 px-3.5 pb-3.5 pt-1'>
        {children}
        {footer}
      </CardContent>
    </Card>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <div className='flex items-center gap-2 rounded-lg border border-dashed border-white/10 bg-black/18 px-2.5 py-1 text-[11px] leading-4 text-zinc-400'>
      <Icons.info className='size-3.5 shrink-0 text-amber-300/80' />
      <span className='max-h-8 overflow-hidden'>{message}</span>
    </div>
  );
}

function CompactMorePill({ label }: { label: string }) {
  return (
    <div className='inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[9px] font-medium tracking-wide text-amber-200'>
      {label}
    </div>
  );
}

function RecordChip({ children }: { children: ReactNode }) {
  return (
    <span className='inline-flex items-center rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-zinc-100'>
      {children}
    </span>
  );
}

function HeaderWidgetBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Badge
      variant='outline'
      className={cn(
        'rounded-full border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-zinc-100',
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
    <div className='flex min-w-0 max-w-[340px] flex-none items-center gap-2 rounded-[16px] bg-black/15 px-2.5 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl'>
      <div className='relative size-9 shrink-0 overflow-hidden rounded-full bg-white/5'>
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
              <div className='truncate text-[13px] font-semibold leading-none text-zinc-50'>
                {temperatureLabel} {weather.city}
              </div>
              <div className='truncate text-[10px] text-zinc-300'>
                {weather.condition ?? 'Weather unavailable'}
              </div>
            </div>
          ) : (
            <div className='space-y-0.5'>
              <div className='truncate text-[12px] font-medium text-zinc-50'>
                Weather unavailable
              </div>
              <div className='truncate text-[10px] text-zinc-300'>Weather unavailable</div>
            </div>
          )
        ) : (
          <div className='space-y-0.5'>
            <div className='text-[12px] font-medium text-zinc-50'>Weather not set</div>
            <div className='truncate text-[10px] text-zinc-300'>
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
        'flex min-w-0 items-center gap-2 rounded-[16px] border px-2.5 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl',
        toneClass
      )}
    >
      <div className='flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20'>
        <Icon className={cn('size-4', iconClass)} />
      </div>
      <div className='min-w-0'>
        <div className='flex items-center gap-2'>
          <div className='text-[9px] uppercase tracking-[0.22em] text-zinc-300'>{label}</div>
          <HeaderWidgetBadge>{countLabel}</HeaderWidgetBadge>
        </div>
        {detail ? <div className='truncate text-[11px] text-zinc-200/90'>{detail}</div> : null}
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
    <div className={`rounded-lg border px-2 py-1 ${toneClass}`}>
      <div className='text-[9px] uppercase tracking-[0.18em] text-current/70'>{label}</div>
      <div className='mt-0.5 text-[10px] font-semibold leading-4 text-current'>{value}</div>
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
        <Card className='max-w-2xl border-white/10 bg-white/6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl'>
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
              <Badge variant='outline' className='border-white/10 bg-white/5 text-zinc-100'>
                <Icons.info className='mr-1 size-3.5' />
                {reason === 'not_found' ? 'No record found' : 'Status not active'}
              </Badge>
              <Badge variant='outline' className='border-white/10 bg-white/5 text-zinc-100'>
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
    attendance,
    weather,
    attendanceSummary
  } = data;

  const renderedAt = new Date();
  const layoutBlocks = getEnabledSortedDisplayBlocks(displayPage.layoutConfig);
  const layoutBlockMap = new Map(layoutBlocks.map((block) => [block.key, block] as const));
  const getBlock = (key: DisplayBlockKey) => layoutBlockMap.get(key);
  const weatherBlock = getBlock('weather');
  const alertsBlock = getBlock('alerts');
  const visibleGridBlocks = layoutBlocks.filter(
    (block) => block.key !== 'weather' && block.key !== 'alerts'
  );
  const presentStaff = attendance.staff.items.filter((item) => item.status === 'PRESENT');
  const presentManagers = attendance.managers.items.filter((item) => item.status === 'PRESENT');
  const currentDate = formatDate(renderedAt);
  const totalAttendance = attendanceSummary.staffMarked + attendanceSummary.managerMarked;
  const expectedAttendance = attendanceSummary.staffExpected + attendanceSummary.managerExpected;
  const firstAlert = alerts.items[0] ?? null;

  const renderBlockCard = (key: DisplayBlockKey) => {
    const block = getBlock(key);

    if (!block) {
      return null;
    }

    switch (key) {
      case 'alerts': {
        return null;
      }

      case 'events': {
        const visibleEvents = events.items.slice(0, getVisibleCount(block, VISIBLE_EVENT_COUNT));

        return (
          <SectionCard
            title='Today Events'
            icon={Icons.calendar}
            count={events.total}
            footer={
              events.total > visibleEvents.length ? (
                <div className='flex justify-end'>
                  <CompactMorePill
                    label={`Showing ${visibleEvents.length} of ${events.total} events`}
                  />
                </div>
              ) : null
            }
          >
            {visibleEvents.length === 0 ? (
              <EmptySection message='No active events scheduled for today.' />
            ) : (
              <div className='space-y-2'>
                {visibleEvents.map((event) => (
                  <div
                    key={event.id}
                    className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>
                          {event.title}
                        </div>
                        <div className='mt-1 text-sm text-zinc-300'>
                          {event.clientName ?? event.companyName ?? 'General event'}
                        </div>
                      </div>
                      <Badge className='border-white/10 bg-white/5 text-zinc-100'>
                        {formatTime(event.startAt)}
                      </Badge>
                    </div>
                    <div className='mt-3 flex flex-wrap gap-2 text-xs text-zinc-400'>
                      <RecordChip>{event.screenName ?? '—'}</RecordChip>
                      {event.endAt ? (
                        <RecordChip>Ends {formatTime(event.endAt)}</RecordChip>
                      ) : (
                        <RecordChip>Ends —</RecordChip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        );
      }

      case 'movieSchedule': {
        const visibleMovies = movieSchedules.items.slice(
          0,
          getVisibleCount(block, VISIBLE_MOVIE_COUNT)
        );

        return (
          <SectionCard
            title='Movie Schedule'
            icon={Icons.video}
            count={movieSchedules.total}
            footer={
              movieSchedules.total > visibleMovies.length ? (
                <div className='flex justify-end'>
                  <CompactMorePill
                    label={`Showing ${visibleMovies.length} of ${movieSchedules.total} shows`}
                  />
                </div>
              ) : null
            }
          >
            {visibleMovies.length === 0 ? (
              <EmptySection message='No active movie shows scheduled for today.' />
            ) : (
              <div className='space-y-2'>
                {visibleMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>
                          {movie.movieName}
                        </div>
                        <div className='mt-1 text-sm text-zinc-300'>{movie.screenName}</div>
                      </div>
                      <Badge className='border-white/10 bg-white/5 text-zinc-100'>
                        {formatTime(movie.showTime)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        );
      }

      case 'meetingSchedule': {
        const visibleMeetings = meetings.items.slice(
          0,
          getVisibleCount(block, VISIBLE_MEETING_COUNT)
        );

        return (
          <SectionCard
            title='Meeting Schedule'
            icon={Icons.clock}
            count={meetings.total}
            footer={
              meetings.total > visibleMeetings.length ? (
                <div className='flex justify-end'>
                  <CompactMorePill
                    label={`Showing ${visibleMeetings.length} of ${meetings.total} meetings`}
                  />
                </div>
              ) : null
            }
          >
            {visibleMeetings.length === 0 ? (
              <EmptySection message='No active meetings scheduled for today.' />
            ) : (
              <div className='space-y-2'>
                {visibleMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>
                          {meeting.title}
                        </div>
                        <div className='mt-1 text-sm text-zinc-300'>
                          {meeting.organizer ?? 'No organizer listed'}
                        </div>
                      </div>
                      <Badge className='border-white/10 bg-white/5 text-zinc-100'>
                        {formatTime(meeting.startAt)}
                      </Badge>
                    </div>
                    <div className='mt-3 flex flex-wrap gap-2 text-xs text-zinc-400'>
                      {meeting.location && <RecordChip>{meeting.location}</RecordChip>}
                      {meeting.endAt && <RecordChip>Ends {formatTime(meeting.endAt)}</RecordChip>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        );
      }

      case 'weather': {
        return null;
      }

      case 'attendance': {
        const attendanceLimit = getVisibleCount(block, VISIBLE_STAFF_ATTENDANCE_COUNT);
        const staffLimit = Math.max(1, Math.ceil(attendanceLimit / 2));
        const managerLimit = Math.max(0, attendanceLimit - staffLimit);
        const visibleStaff = presentStaff.slice(0, staffLimit);
        const visibleManagers = presentManagers.slice(0, managerLimit);

        return (
          <SectionCard title='Attendance' icon={Icons.teams} count={totalAttendance}>
            {attendanceSummary.staffMarked + attendanceSummary.managerMarked === 0 ? (
              <EmptySection message='Attendance not marked yet.' />
            ) : (
              <div className='space-y-3'>
                <div className='grid grid-cols-2 gap-1.5 xl:grid-cols-5'>
                  <SummaryStatPill
                    label='Staff Present'
                    value={attendanceSummary.staffCounts.PRESENT}
                    tone='emerald'
                  />
                  <SummaryStatPill
                    label='Absent'
                    value={attendanceSummary.staffCounts.ABSENT}
                    tone='rose'
                  />
                  <SummaryStatPill
                    label='Leave'
                    value={attendanceSummary.staffCounts.LEAVE}
                    tone='amber'
                  />
                  <SummaryStatPill
                    label='Late'
                    value={attendanceSummary.staffCounts.LATE}
                    tone='orange'
                  />
                  <SummaryStatPill
                    label='Manager Present'
                    value={attendanceSummary.managerCounts.PRESENT}
                    tone='emerald'
                  />
                </div>

                <div className='grid gap-3 xl:grid-cols-2'>
                  <div className='space-y-2 rounded-[22px] border border-white/10 bg-black/18 p-3'>
                    <div className='flex items-center justify-between gap-2'>
                      <div>
                        <div className='text-[10px] uppercase tracking-[0.22em] text-zinc-400'>
                          Staff Present
                        </div>
                        <div className='mt-0.5 text-sm font-semibold text-zinc-50'>
                          {attendanceSummary.staffCounts.PRESENT.toLocaleString()} present
                        </div>
                      </div>
                      <Badge
                        variant='outline'
                        className='border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-100'
                      >
                        {visibleStaff.length} shown
                      </Badge>
                    </div>
                    {visibleStaff.length === 0 ? (
                      <EmptySection message='No present staff entries yet.' />
                    ) : (
                      <div className='space-y-2'>
                        {visibleStaff.map((item) => (
                          <AttendanceRosterItem
                            key={item.id}
                            name={item.name}
                            designation={item.designation}
                            department={item.department}
                            shift={item.shift}
                            remarks={item.remarks}
                          />
                        ))}
                        {presentStaff.length > visibleStaff.length && (
                          <CompactMorePill
                            label={`+${presentStaff.length - visibleStaff.length} more staff`}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div className='space-y-2 rounded-[22px] border border-white/10 bg-black/18 p-3'>
                    <div className='flex items-center justify-between gap-2'>
                      <div>
                        <div className='text-[10px] uppercase tracking-[0.22em] text-zinc-400'>
                          Manager Present
                        </div>
                        <div className='mt-0.5 text-sm font-semibold text-zinc-50'>
                          {attendanceSummary.managerCounts.PRESENT.toLocaleString()} present
                        </div>
                      </div>
                      <Badge
                        variant='outline'
                        className='border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-100'
                      >
                        {visibleManagers.length} shown
                      </Badge>
                    </div>
                    {visibleManagers.length === 0 ? (
                      <EmptySection message='No present manager entries yet.' />
                    ) : (
                      <div className='space-y-2'>
                        {visibleManagers.map((item) => (
                          <AttendanceRosterItem
                            key={item.id}
                            name={item.name}
                            designation={item.designation}
                            shift={item.shift}
                            remarks={item.remarks}
                          />
                        ))}
                        {presentManagers.length > visibleManagers.length && (
                          <CompactMorePill
                            label={`+${presentManagers.length - visibleManagers.length} more managers`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SectionCard>
        );
      }

      case 'advertisements': {
        const visibleAds = advertisements.items.slice(0, getVisibleCount(block, VISIBLE_AD_COUNT));

        return (
          <SectionCard
            title='Advertisement Contracts'
            icon={Icons.media}
            count={advertisements.total}
            footer={
              advertisements.total > visibleAds.length ? (
                <div className='flex justify-end'>
                  <CompactMorePill
                    label={`Showing ${visibleAds.length} of ${advertisements.total} contracts`}
                  />
                </div>
              ) : null
            }
          >
            {visibleAds.length === 0 ? (
              <EmptySection message='No active advertisement contracts are currently available.' />
            ) : (
              <div className='space-y-2'>
                {visibleAds.map((ad) => (
                  <div
                    key={ad.id}
                    className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>
                          {ad.title}
                        </div>
                        <div className='mt-1 flex flex-wrap gap-2 text-xs text-zinc-300'>
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
            )}
          </SectionCard>
        );
      }

      case 'itemSalesTarget': {
        const visibleTargets = salesTargets.items.slice(
          0,
          getVisibleCount(block, VISIBLE_TARGET_COUNT)
        );

        return (
          <SectionCard
            title='Sales Targets'
            icon={Icons.adjustments}
            count={salesTargets.total}
            footer={
              salesTargets.total > visibleTargets.length ? (
                <div className='flex justify-end'>
                  <CompactMorePill
                    label={`Showing ${visibleTargets.length} of ${salesTargets.total} targets`}
                  />
                </div>
              ) : null
            }
          >
            {visibleTargets.length === 0 ? (
              <EmptySection message='No active sales targets are currently available.' />
            ) : (
              <div className='space-y-1.5'>
                {visibleTargets.map((target) => (
                  <div
                    key={target.id}
                    className='rounded-xl border border-white/10 bg-black/20 px-3 py-2.5'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='truncate text-[13px] font-medium text-zinc-50 xl:text-sm'>
                          {target.itemName}
                        </div>
                        <div className='mt-1 flex flex-wrap gap-1.5 text-[11px] text-zinc-300'>
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
                      <div className='flex flex-col items-end gap-1 text-right'>
                        <Badge className='border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-100'>
                          Order {target.displayOrder}
                        </Badge>
                        <div className='text-[10px] uppercase tracking-[0.18em] text-zinc-400'>
                          Last import
                        </div>
                        <div className='text-[11px] text-zinc-200'>
                          {formatDateTime(target.lastImportAt)}
                        </div>
                      </div>
                    </div>

                    {!target.daily.dataAvailable &&
                    !target.weekly.dataAvailable &&
                    !target.monthly.dataAvailable ? (
                      <div className='mt-2'>
                        <EmptySection message='Sales data not imported for the selected period.' />
                      </div>
                    ) : null}

                    <div className='mt-2.5 grid grid-cols-1 gap-1.5 text-xs text-zinc-300 xl:grid-cols-3'>
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
            )}
          </SectionCard>
        );
      }

      case 'concessionPriceList': {
        const visibleConcessions = concessionPriceList.items.slice(
          0,
          getVisibleCount(block, VISIBLE_CONCESSION_COUNT)
        );

        return (
          <SectionCard
            title='Concession Price List'
            icon={Icons.billing}
            count={concessionPriceList.total}
            footer={
              concessionPriceList.total > visibleConcessions.length ? (
                <div className='flex justify-end'>
                  <CompactMorePill
                    label={`Showing ${visibleConcessions.length} of ${concessionPriceList.total} items`}
                  />
                </div>
              ) : null
            }
          >
            {visibleConcessions.length === 0 ? (
              <EmptySection message='No active concession price items are currently available.' />
            ) : (
              <div className='space-y-2'>
                {visibleConcessions.map((item) => (
                  <div
                    key={item.id}
                    className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='min-w-0'>
                        <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>
                          {item.itemName}
                        </div>
                        <div className='mt-1 flex flex-wrap gap-2 text-xs text-zinc-300'>
                          {item.category && <RecordChip>{item.category}</RecordChip>}
                          <RecordChip>{item.status}</RecordChip>
                        </div>
                      </div>
                      <Badge className='border-amber-400/30 bg-amber-400/15 text-amber-100'>
                        {formatPrice(item.price)}
                      </Badge>
                    </div>
                    <div className='mt-2 flex flex-wrap gap-2 text-xs text-zinc-400'>
                      <RecordChip>Sort {item.sortOrder}</RecordChip>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        );
      }

      default:
        return null;
    }
  };

  return (
    <main className='relative min-h-[100dvh] overflow-hidden bg-zinc-950 text-zinc-50'>
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(180,83,9,0.12),transparent_30%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500' />

      <div
        className='relative mx-auto flex min-h-[100dvh] w-full max-w-full flex-col gap-3 overflow-hidden p-3 md:p-4 xl:h-[100dvh] xl:min-h-0 xl:p-4 2xl:p-5'
        style={{
          maxWidth: `${displayPage.resolutionWidth}px`,
          minHeight: `${displayPage.resolutionHeight}px`
        }}
      >
        <header className='shrink-0 rounded-[22px] border border-white/10 bg-white/6 px-3 py-2.5 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl xl:px-4 xl:py-3'>
          <div className='grid min-h-[76px] grid-cols-[minmax(300px,1.25fr)_minmax(0,0.75fr)_minmax(220px,1fr)] items-center gap-2 xl:min-h-[86px] xl:gap-3'>
            <div className='flex min-w-0 items-center gap-2.5 justify-self-start overflow-visible'>
              <Image
                src='/Logo/cue-logo.png'
                alt='CUE logo'
                width={200}
                height={80}
                priority
                className='h-[64px] w-auto max-h-[80px] max-w-[150px] shrink-0 object-contain xl:h-[72px]'
              />
              {weatherBlock ? <HeaderWeatherWidget weather={weather} /> : null}
            </div>

            <div className='flex flex-col items-center justify-center text-center justify-self-center'>
              <div className='text-[1.9rem] font-semibold leading-none tracking-tight text-zinc-50 md:text-[2.3rem] xl:text-[2.75rem]'>
                <DisplayBoardClock initialIso={renderedAt.toISOString()} />
              </div>
              <div className='mt-1.5 text-[14px] font-medium text-zinc-300 md:text-[15px]'>
                {currentDate}
              </div>
            </div>

            <div className='flex min-w-0 items-center justify-end gap-2 justify-self-end overflow-hidden'>
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
          <section className='flex flex-1 items-center justify-center rounded-[30px] border border-white/10 bg-white/6 px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl'>
            <div className='max-w-xl space-y-3'>
              <div className='text-2xl font-semibold text-zinc-50'>No display sections enabled</div>
              <div className='text-sm text-zinc-300'>
                Open the display page settings and enable the widgets you want to show on this
                screen.
              </div>
            </div>
          </section>
        ) : (
          <section className='grid flex-1 min-h-0 gap-3 overflow-hidden xl:grid-cols-3 xl:auto-rows-[minmax(0,1fr)]'>
            {visibleGridBlocks.map((block) => (
              <div key={block.key} className='min-h-0'>
                {renderBlockCard(block.key)}
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
