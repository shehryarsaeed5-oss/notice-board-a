import { format } from 'date-fns';
import type { ComponentType, ReactNode } from 'react';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { getDisplayBoardBySlug } from '../api/service';
import type { DisplayBoardAlertItem } from '../api/types';
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

function formatTime(value: Date) {
  return format(value, 'h:mm a');
}

function formatDate(value: Date) {
  return format(value, 'EEEE, MMM d, yyyy');
}

function formatDateTime(value: Date) {
  return format(value, 'EEEE, MMM d, yyyy • h:mm a');
}

function formatTarget(value: number | null) {
  return value === null ? '—' : value.toLocaleString();
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
        'rounded-[24px] border px-4 py-3.5 text-zinc-50 backdrop-blur-xl',
        theme.accent,
        alert.alertType === 'URGENT' ? 'animate-pulse' : ''
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <theme.icon className={cn('size-4 shrink-0', theme.iconClass)} />
            <div className='truncate text-[15px] font-semibold tracking-tight text-zinc-50 xl:text-base'>
              {alert.title}
            </div>
          </div>
          {alert.message ? (
            <div className='mt-2 max-h-10 overflow-hidden text-sm leading-5 text-zinc-100/90'>
              {alert.message}
            </div>
          ) : null}
        </div>
        <Badge variant='outline' className={cn('rounded-full px-3 py-1 text-xs', theme.badge)}>
          {alert.alertType}
        </Badge>
      </div>

      <div className='mt-3 flex flex-wrap gap-2 text-xs text-zinc-200/80'>
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
    <div className={cn('rounded-2xl border px-3 py-2.5', toneClass)}>
      <div className='text-[11px] uppercase tracking-[0.24em] text-current/70'>{label}</div>
      <div className='mt-1 text-base font-semibold text-current'>{value.toLocaleString()}</div>
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
    <div className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>{name}</div>
          <div className='mt-1 flex flex-wrap gap-2 text-xs text-zinc-300'>
            {designation && <RecordChip>{designation}</RecordChip>}
            {department && <RecordChip>{department}</RecordChip>}
          </div>
        </div>
        <Badge className='border-emerald-400/30 bg-emerald-400/15 text-emerald-100'>PRESENT</Badge>
      </div>
      <div className='mt-2 flex flex-wrap gap-2 text-xs text-zinc-400'>
        <RecordChip>Shift: {shift ?? '—'}</RecordChip>
      </div>
      {remarks ? <div className='mt-2 text-xs text-zinc-400'>{remarks}</div> : null}
    </div>
  );
}

function SectionCard({
  title,
  description,
  icon: Icon,
  count,
  children,
  footer
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  count: number;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Card className='flex h-full min-h-0 flex-col overflow-hidden border-white/10 bg-white/6 text-zinc-50 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl'>
      <CardHeader className='shrink-0 pb-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-1'>
            <CardDescription className='text-[11px] uppercase tracking-[0.28em] text-zinc-400'>
              {description}
            </CardDescription>
            <CardTitle className='text-lg font-semibold text-zinc-50 xl:text-[21px]'>
              {title}
            </CardTitle>
          </div>
          <Badge
            variant='outline'
            className='rounded-full border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-100'
          >
            <Icon className='mr-1.5 size-3.5' />
            {count.toLocaleString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='flex min-h-0 flex-1 flex-col gap-3 pt-0'>
        {children}
        {footer}
      </CardContent>
    </Card>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <div className='flex items-center gap-2 rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-400'>
      <Icons.info className='size-4 shrink-0 text-amber-300/80' />
      <span>{message}</span>
    </div>
  );
}

function CompactMorePill({ label }: { label: string }) {
  return (
    <div className='inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-medium tracking-wide text-amber-200'>
      {label}
    </div>
  );
}

function RecordChip({ children }: { children: ReactNode }) {
  return (
    <span className='inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-100'>
      {children}
    </span>
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
    <div className={`rounded-2xl border px-3 py-2.5 ${toneClass}`}>
      <div className='text-[11px] uppercase tracking-[0.24em] text-current/70'>{label}</div>
      <div className='mt-1 text-base font-semibold text-current'>{value}</div>
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
    generatedAt,
    events,
    meetings,
    movieSchedules,
    advertisements,
    alerts,
    salesTargets,
    concessionPriceList,
    attendance,
    weatherSetting,
    attendanceSummary
  } = data;

  const renderedAt = new Date();
  const visibleEvents = events.items.slice(0, VISIBLE_EVENT_COUNT);
  const visibleMeetings = meetings.items.slice(0, VISIBLE_MEETING_COUNT);
  const visibleMovies = movieSchedules.items.slice(0, VISIBLE_MOVIE_COUNT);
  const visibleAds = advertisements.items.slice(0, VISIBLE_AD_COUNT);
  const visibleAlerts = alerts.items.slice(0, VISIBLE_ALERT_COUNT);
  const visibleTargets = salesTargets.items.slice(0, VISIBLE_TARGET_COUNT);
  const visibleConcessions = concessionPriceList.items.slice(0, VISIBLE_CONCESSION_COUNT);
  const presentStaff = attendance.staff.items.filter((item) => item.status === 'PRESENT');
  const presentManagers = attendance.managers.items.filter((item) => item.status === 'PRESENT');
  const currentDate = formatDate(renderedAt);
  const updatedAt = formatDateTime(generatedAt);
  const totalAttendance = attendanceSummary.staffMarked + attendanceSummary.managerMarked;
  const expectedAttendance = attendanceSummary.staffExpected + attendanceSummary.managerExpected;

  return (
    <main className='relative min-h-[100dvh] overflow-hidden bg-zinc-950 text-zinc-50'>
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(180,83,9,0.12),transparent_30%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500' />

      <div className='relative flex min-h-[100dvh] flex-col gap-4 p-4 md:p-6 xl:h-[100dvh] xl:min-h-0 xl:overflow-hidden xl:p-6 2xl:p-8'>
        <header className='shrink-0 grid gap-4 xl:grid-cols-[minmax(0,1.72fr)_minmax(340px,0.9fr)]'>
          <div className='rounded-[30px] border border-white/10 bg-white/6 px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl xl:px-6 xl:py-5'>
            <div className='flex flex-wrap items-center gap-2'>
              <Badge className='border-amber-400/30 bg-amber-400/15 px-3 py-1 text-amber-200'>
                Live Display
              </Badge>
              <Badge
                variant='outline'
                className='border-white/10 bg-white/5 px-3 py-1 text-zinc-100'
              >
                {displayPage.slug}
              </Badge>
              <Badge
                variant='outline'
                className='border-white/10 bg-white/5 px-3 py-1 text-zinc-100'
              >
                Premium cinema board
              </Badge>
            </div>

            <div className='mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-semibold tracking-tight text-balance text-zinc-50 md:text-5xl xl:text-6xl'>
                  {displayPage.name}
                </h1>
                <p className='max-w-4xl text-sm leading-6 text-zinc-300 md:text-[15px] xl:max-w-5xl'>
                  Today&apos;s cinema notice board for events, meetings, movie shows,
                  advertisements, sales targets, weather, and attendance.
                </p>
              </div>

              <div className='rounded-3xl border border-white/10 bg-black/20 px-4 py-3 shadow-inner shadow-black/20 xl:min-w-[320px] xl:px-5'>
                <div className='text-[11px] font-medium uppercase tracking-[0.28em] text-amber-200/80'>
                  Current date / time
                </div>
                <div className='mt-2 flex items-end gap-3'>
                  <div className='text-3xl font-semibold leading-none tracking-tight text-zinc-50 md:text-4xl xl:text-5xl'>
                    <DisplayBoardClock initialIso={renderedAt.toISOString()} />
                  </div>
                  <div className='pb-1 text-sm text-zinc-300 md:text-[15px]'>{currentDate}</div>
                </div>
                <div className='mt-3 text-[11px] uppercase tracking-[0.22em] text-zinc-400'>
                  Last updated
                </div>
                <div className='mt-1 text-sm text-zinc-100 md:text-[15px]'>{updatedAt}</div>
              </div>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-1'>
            <div className='rounded-[30px] border border-white/10 bg-white/6 px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400'>
                    Weather
                  </div>
                  <div className='mt-2 text-xl font-semibold text-zinc-50 xl:text-[22px]'>
                    {weatherSetting ? weatherSetting.city : 'No weather setting'}
                  </div>
                  <div className='mt-1 text-sm text-zinc-300'>
                    {weatherSetting
                      ? `Provider: ${weatherSetting.provider}`
                      : 'No enabled provider'}
                  </div>
                </div>
                <Badge
                  className={
                    weatherSetting
                      ? 'border-emerald-400/30 bg-emerald-400/15 text-emerald-200'
                      : 'border-white/10 bg-white/5 text-zinc-200'
                  }
                >
                  {weatherSetting ? 'Enabled' : 'Inactive'}
                </Badge>
              </div>
            </div>

            <div className='rounded-[30px] border border-white/10 bg-white/6 px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl'>
              <div className='text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400'>
                Attendance
              </div>
              <div className='mt-2 text-xl font-semibold text-zinc-50 xl:text-[22px]'>
                {totalAttendance} marked today
              </div>
              <div className='mt-1 text-sm text-zinc-300'>{expectedAttendance} expected</div>
            </div>
          </div>
        </header>

        {visibleAlerts.length > 0 ? (
          <section className='shrink-0 rounded-[30px] border border-rose-400/20 bg-white/6 px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div>
                <div className='text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400'>
                  Alerts
                </div>
                <div className='mt-1 text-xl font-semibold text-zinc-50 xl:text-[22px]'>
                  Live notices
                </div>
              </div>
              <Badge className='border-rose-400/30 bg-rose-400/15 text-rose-100'>
                <Icons.alertCircle className='mr-1.5 size-3.5' />
                {alerts.total.toLocaleString()}
              </Badge>
            </div>

            <div className='mt-4 grid gap-3 xl:grid-cols-3'>
              {visibleAlerts.map((alert) => (
                <AlertBannerCard key={alert.id} alert={alert} />
              ))}
            </div>

            {alerts.total > visibleAlerts.length ? (
              <div className='mt-3 flex justify-end'>
                <CompactMorePill label={`+${alerts.total - visibleAlerts.length} more alerts`} />
              </div>
            ) : null}
          </section>
        ) : null}

        <section className='grid flex-1 min-h-0 gap-4 xl:grid-cols-[minmax(0,1.72fr)_minmax(360px,0.9fr)]'>
          <div className='grid min-h-0 gap-4 xl:grid-rows-[minmax(0,1.08fr)_minmax(0,0.97fr)_minmax(0,0.95fr)]'>
            <SectionCard
              title='Today Events'
              description='Scheduled today'
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

            <SectionCard
              title='Movie Schedule'
              description="Today's showtimes"
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

            <SectionCard
              title='Meeting Schedule'
              description="Today's meetings"
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
          </div>

          <div className='grid min-h-0 gap-4 xl:grid-rows-[minmax(0,0.62fr)_minmax(0,1.18fr)_minmax(0,0.92fr)_minmax(0,0.82fr)_minmax(0,0.76fr)]'>
            <SectionCard
              title='Weather'
              description='Live configuration'
              icon={Icons.sun}
              count={weatherSetting ? 1 : 0}
            >
              {weatherSetting ? (
                <div className='rounded-2xl border border-white/10 bg-black/20 px-4 py-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <div className='text-lg font-medium text-zinc-50 xl:text-[20px]'>
                        {weatherSetting.city}
                      </div>
                      <div className='mt-1 text-sm text-zinc-300'>
                        Provider: {weatherSetting.provider}
                      </div>
                    </div>
                    <Badge className='border-emerald-400/30 bg-emerald-400/15 text-emerald-200'>
                      Enabled
                    </Badge>
                  </div>
                </div>
              ) : (
                <EmptySection message='No enabled weather setting is configured.' />
              )}
            </SectionCard>

            <SectionCard
              title='Attendance Summary'
              description="Today's roster and status"
              icon={Icons.teams}
              count={totalAttendance}
            >
              {attendanceSummary.staffMarked + attendanceSummary.managerMarked === 0 ? (
                <EmptySection message='Attendance not marked yet.' />
              ) : (
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-2 xl:grid-cols-5'>
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

                  <div className='grid gap-4 xl:grid-cols-2'>
                    <div className='space-y-3 rounded-[26px] border border-white/10 bg-black/18 p-4'>
                      <div className='flex items-center justify-between gap-3'>
                        <div>
                          <div className='text-sm uppercase tracking-[0.24em] text-zinc-400'>
                            Staff Present
                          </div>
                          <div className='mt-1 text-lg font-semibold text-zinc-50'>
                            {attendanceSummary.staffCounts.PRESENT.toLocaleString()} present
                          </div>
                        </div>
                        <Badge
                          variant='outline'
                          className='border-white/10 bg-white/5 text-zinc-100'
                        >
                          {presentStaff.length} shown
                        </Badge>
                      </div>
                      {presentStaff.length === 0 ? (
                        <EmptySection message='No present staff entries yet.' />
                      ) : (
                        <div className='space-y-2'>
                          {presentStaff.slice(0, VISIBLE_STAFF_ATTENDANCE_COUNT).map((item) => (
                            <AttendanceRosterItem
                              key={item.id}
                              name={item.name}
                              designation={item.designation}
                              department={item.department}
                              shift={item.shift}
                              remarks={item.remarks}
                            />
                          ))}
                          {presentStaff.length > VISIBLE_STAFF_ATTENDANCE_COUNT && (
                            <CompactMorePill
                              label={`+${
                                presentStaff.length - VISIBLE_STAFF_ATTENDANCE_COUNT
                              } more staff`}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <div className='space-y-3 rounded-[26px] border border-white/10 bg-black/18 p-4'>
                      <div className='flex items-center justify-between gap-3'>
                        <div>
                          <div className='text-sm uppercase tracking-[0.24em] text-zinc-400'>
                            Manager Present
                          </div>
                          <div className='mt-1 text-lg font-semibold text-zinc-50'>
                            {attendanceSummary.managerCounts.PRESENT.toLocaleString()} present
                          </div>
                        </div>
                        <Badge
                          variant='outline'
                          className='border-white/10 bg-white/5 text-zinc-100'
                        >
                          {presentManagers.length} shown
                        </Badge>
                      </div>
                      {presentManagers.length === 0 ? (
                        <EmptySection message='No present manager entries yet.' />
                      ) : (
                        <div className='space-y-2'>
                          {presentManagers
                            .slice(0, VISIBLE_MANAGER_ATTENDANCE_COUNT)
                            .map((item) => (
                              <AttendanceRosterItem
                                key={item.id}
                                name={item.name}
                                designation={item.designation}
                                shift={item.shift}
                                remarks={item.remarks}
                              />
                            ))}
                          {presentManagers.length > VISIBLE_MANAGER_ATTENDANCE_COUNT && (
                            <CompactMorePill
                              label={`+${
                                presentManagers.length - VISIBLE_MANAGER_ATTENDANCE_COUNT
                              } more managers`}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </SectionCard>

            <SectionCard
              title='Advertisement Contracts'
              description='Active company contracts'
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

            <SectionCard
              title='Sales Targets'
              description='Active targets'
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
                <div className='space-y-2'>
                  {visibleTargets.map((target) => (
                    <div
                      key={target.id}
                      className='rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <div className='truncate text-[15px] font-medium text-zinc-50 xl:text-base'>
                            {target.itemName}
                          </div>
                          <div className='mt-1 flex flex-wrap gap-2 text-xs text-zinc-300'>
                            {target.itemCode && <RecordChip>{target.itemCode}</RecordChip>}
                            <RecordChip>{target.status}</RecordChip>
                          </div>
                        </div>
                      </div>
                      <div className='mt-3 grid grid-cols-3 gap-2 text-xs text-zinc-300'>
                        <StatBlock label='Daily' value={formatTarget(target.dailyTarget)} />
                        <StatBlock label='Weekly' value={formatTarget(target.weeklyTarget)} />
                        <StatBlock label='Monthly' value={formatTarget(target.monthlyTarget)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              title='Concession Price List'
              description='Live counter prices'
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
          </div>
        </section>
      </div>
    </main>
  );
}
