import { format } from 'date-fns';
import type { ComponentType, ReactNode } from 'react';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DisplayBoardAutoRefresh } from './display-board-auto-refresh';
import { DisplayBoardClock } from './display-board-clock';
import { getDisplayBoardBySlug } from '../api/service';

interface DisplayBoardPageProps {
  slug: string;
}

function formatTime(value: Date) {
  return format(value, 'h:mm a');
}

function formatDate(value: Date) {
  return format(value, 'EEEE, MMM d, yyyy');
}

function formatTarget(value: number | null) {
  return value === null ? '—' : value.toLocaleString();
}

function formatDuration(value: number | null) {
  return value === null ? '—' : `${value}s`;
}

function SectionCard({
  title,
  description,
  icon: Icon,
  count,
  children
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  count: number;
  children: ReactNode;
}) {
  return (
    <Card className='border-white/10 bg-white/5 text-zinc-50 shadow-2xl backdrop-blur'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <CardDescription className='text-zinc-300'>{description}</CardDescription>
            <CardTitle className='mt-1 text-xl text-zinc-50'>{title}</CardTitle>
          </div>
          <Badge variant='outline' className='border-white/10 bg-white/5 text-zinc-100'>
            <Icon className='mr-1 size-3.5' />
            {count.toLocaleString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>{children}</CardContent>
    </Card>
  );
}

function EmptySection({ message }: { message: string }) {
  return <div className='text-sm text-zinc-400'>{message}</div>;
}

function DisplayBoardUnavailable({
  slug,
  reason
}: {
  slug: string;
  reason: 'inactive' | 'not_found';
}) {
  return (
    <main className='relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50'>
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_35%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='relative flex min-h-screen items-center justify-center p-6'>
        <Card className='max-w-2xl border-white/10 bg-white/5 text-center shadow-2xl backdrop-blur'>
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
    salesTargets,
    weatherSetting,
    attendanceSummary
  } = data;

  return (
    <main className='relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50'>
      <DisplayBoardAutoRefresh />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_35%),linear-gradient(180deg,#09090b_0%,#020202_100%)]' />
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500' />

      <div className='relative flex min-h-screen flex-col gap-5 p-6 xl:p-8'>
        <header className='flex flex-col gap-3 border-b border-white/10 pb-5 xl:flex-row xl:items-end xl:justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <Badge className='border-amber-400/30 bg-amber-400/15 text-amber-200'>
                Live Display
              </Badge>
              <Badge variant='outline' className='border-white/10 bg-white/5 text-zinc-100'>
                {displayPage.slug}
              </Badge>
            </div>
            <h1 className='text-3xl font-semibold tracking-tight text-balance text-zinc-50 md:text-5xl'>
              {displayPage.name}
            </h1>
            <p className='max-w-3xl text-sm text-zinc-300 md:text-base'>
              Public cinema display board for events, meetings, movie shows, advertisements, sales
              targets, weather, and attendance.
            </p>
          </div>

          <div className='flex flex-col gap-2 text-right'>
            <div className='text-sm text-zinc-400'>Updated</div>
            <div className='text-lg font-medium text-zinc-100 md:text-2xl'>
              <DisplayBoardClock initialIso={generatedAt.toISOString()} />
            </div>
            <div className='text-sm text-zinc-400'>{formatDate(generatedAt)}</div>
          </div>
        </header>

        <section className='grid gap-4 xl:grid-cols-3'>
          <div className='space-y-4 xl:col-span-2'>
            <SectionCard
              title='Today Events'
              description='Active event records scheduled for today.'
              icon={Icons.calendar}
              count={events.total}
            >
              {events.items.length === 0 ? (
                <EmptySection message='No active events scheduled for today.' />
              ) : (
                <div className='space-y-3'>
                  {events.items.map((event) => (
                    <div
                      key={event.id}
                      className='rounded-xl border border-white/10 bg-black/20 p-4'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <div className='font-medium text-zinc-50'>{event.title}</div>
                          <div className='mt-1 text-sm text-zinc-300'>
                            {event.clientName ?? event.companyName ?? 'General event'}
                          </div>
                        </div>
                        <Badge className='border-white/10 bg-white/5 text-zinc-100'>
                          {formatTime(event.startAt)}
                        </Badge>
                      </div>
                      <div className='mt-3 flex flex-wrap gap-2 text-xs text-zinc-400'>
                        {event.screenName && (
                          <Badge variant='outline' className='border-white/10 bg-white/5'>
                            {event.screenName}
                          </Badge>
                        )}
                        {event.endAt && (
                          <Badge variant='outline' className='border-white/10 bg-white/5'>
                            Ends {formatTime(event.endAt)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              title='Meetings'
              description='Today’s active meeting schedule.'
              icon={Icons.clock}
              count={meetings.total}
            >
              {meetings.items.length === 0 ? (
                <EmptySection message='No active meetings scheduled for today.' />
              ) : (
                <div className='space-y-3'>
                  {meetings.items.map((meeting) => (
                    <div
                      key={meeting.id}
                      className='rounded-xl border border-white/10 bg-black/20 p-4'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <div className='font-medium text-zinc-50'>{meeting.title}</div>
                          <div className='mt-1 text-sm text-zinc-300'>
                            {meeting.organizer ?? 'No organizer listed'}
                          </div>
                        </div>
                        <Badge className='border-white/10 bg-white/5 text-zinc-100'>
                          {formatTime(meeting.startAt)}
                        </Badge>
                      </div>
                      <div className='mt-3 flex flex-wrap gap-2 text-xs text-zinc-400'>
                        {meeting.location && (
                          <Badge variant='outline' className='border-white/10 bg-white/5'>
                            {meeting.location}
                          </Badge>
                        )}
                        {meeting.endAt && (
                          <Badge variant='outline' className='border-white/10 bg-white/5'>
                            Ends {formatTime(meeting.endAt)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              title='Movie Schedule'
              description='Today’s active movie showtimes.'
              icon={Icons.video}
              count={movieSchedules.total}
            >
              {movieSchedules.items.length === 0 ? (
                <EmptySection message='No active movie shows scheduled for today.' />
              ) : (
                <div className='space-y-3'>
                  {movieSchedules.items.map((movie) => (
                    <div
                      key={movie.id}
                      className='rounded-xl border border-white/10 bg-black/20 p-4'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <div className='font-medium text-zinc-50'>{movie.movieName}</div>
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
          </div>

          <div className='space-y-4'>
            <SectionCard
              title='Weather'
              description='Current weather configuration in use.'
              icon={Icons.sun}
              count={weatherSetting ? 1 : 0}
            >
              {weatherSetting ? (
                <div className='space-y-3 rounded-xl border border-white/10 bg-black/20 p-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <div className='font-medium text-zinc-50'>{weatherSetting.city}</div>
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
              title='Attendance'
              description='Today’s staff and manager attendance summary.'
              icon={Icons.teams}
              count={attendanceSummary.staffMarked + attendanceSummary.managerMarked}
            >
              <div className='space-y-4'>
                <div className='rounded-xl border border-white/10 bg-black/20 p-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <div className='font-medium text-zinc-50'>Staff</div>
                      <div className='mt-1 text-sm text-zinc-300'>
                        {attendanceSummary.staffMarked} / {attendanceSummary.staffExpected} marked
                      </div>
                    </div>
                    <Badge variant='outline' className='border-white/10 bg-white/5 text-zinc-100'>
                      Total {attendanceSummary.staffExpected}
                    </Badge>
                  </div>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {(['PRESENT', 'ABSENT', 'LEAVE', 'LATE'] as const).map((status) => (
                      <Badge key={status} variant='outline' className='border-white/10 bg-white/5'>
                        {status}: {attendanceSummary.staffCounts[status]}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className='rounded-xl border border-white/10 bg-black/20 p-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <div className='font-medium text-zinc-50'>Managers</div>
                      <div className='mt-1 text-sm text-zinc-300'>
                        {attendanceSummary.managerMarked} / {attendanceSummary.managerExpected}{' '}
                        marked
                      </div>
                    </div>
                    <Badge variant='outline' className='border-white/10 bg-white/5 text-zinc-100'>
                      Total {attendanceSummary.managerExpected}
                    </Badge>
                  </div>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {(['PRESENT', 'ABSENT', 'LEAVE', 'LATE'] as const).map((status) => (
                      <Badge key={status} variant='outline' className='border-white/10 bg-white/5'>
                        {status}: {attendanceSummary.managerCounts[status]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title='Advertisements'
              description='Active advertisements ready for the screen.'
              icon={Icons.media}
              count={advertisements.total}
            >
              {advertisements.items.length === 0 ? (
                <EmptySection message='No active advertisements are currently available.' />
              ) : (
                <div className='space-y-3'>
                  {advertisements.items.map((ad) => (
                    <div key={ad.id} className='rounded-xl border border-white/10 bg-black/20 p-4'>
                      <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <div className='truncate font-medium text-zinc-50'>{ad.title}</div>
                          <div className='mt-1 text-sm text-zinc-300'>
                            {ad.mediaType} {ad.duration ? `• ${formatDuration(ad.duration)}` : ''}
                          </div>
                        </div>
                        <Badge
                          variant='outline'
                          className='border-white/10 bg-white/5 text-zinc-100'
                        >
                          Order {ad.sortOrder}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              title='Sales Targets'
              description='Active item sales targets.'
              icon={Icons.adjustments}
              count={salesTargets.total}
            >
              {salesTargets.items.length === 0 ? (
                <EmptySection message='No active sales targets are currently available.' />
              ) : (
                <div className='space-y-3'>
                  {salesTargets.items.map((target) => (
                    <div
                      key={target.id}
                      className='rounded-xl border border-white/10 bg-black/20 p-4'
                    >
                      <div className='font-medium text-zinc-50'>{target.itemName}</div>
                      <div className='mt-2 grid grid-cols-3 gap-2 text-xs text-zinc-300'>
                        <div className='rounded-lg border border-white/10 bg-white/5 p-2'>
                          <div className='text-zinc-400'>Daily</div>
                          <div className='text-zinc-50'>{formatTarget(target.dailyTarget)}</div>
                        </div>
                        <div className='rounded-lg border border-white/10 bg-white/5 p-2'>
                          <div className='text-zinc-400'>Weekly</div>
                          <div className='text-zinc-50'>{formatTarget(target.weeklyTarget)}</div>
                        </div>
                        <div className='rounded-lg border border-white/10 bg-white/5 p-2'>
                          <div className='text-zinc-400'>Monthly</div>
                          <div className='text-zinc-50'>{formatTarget(target.monthlyTarget)}</div>
                        </div>
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
