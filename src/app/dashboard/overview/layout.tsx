import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getDashboardOverviewCounts } from '@/features/dashboard/lib/get-dashboard-overview';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Notice Board Dashboard'
};

interface OverviewLayoutProps {
  sales: ReactNode;
  pie_stats: ReactNode;
  bar_stats: ReactNode;
  area_stats: ReactNode;
}

export default async function OverViewLayout({
  sales: _sales,
  pie_stats: _pieStats,
  bar_stats: _barStats,
  area_stats: _areaStats
}: OverviewLayoutProps) {
  const counts = await getDashboardOverviewCounts();

  const statCards = [
    {
      title: 'Staff Records',
      value: counts.staffRecords,
      description: 'Staff member records stored in PostgreSQL.',
      icon: Icons.teams,
      badge: 'Loaded'
    },
    {
      title: 'Manager Records',
      value: counts.managerRecords,
      description: 'Manager profiles ready for the operations team.',
      icon: Icons.account,
      badge: 'Loaded'
    },
    {
      title: 'Today Events',
      value: counts.todayEvents,
      description: 'Event records scheduled for today.',
      icon: Icons.calendar,
      badge: 'Today'
    },
    {
      title: 'Today Meetings',
      value: counts.todayMeetings,
      description: 'Meeting schedules beginning today.',
      icon: Icons.clock,
      badge: 'Today'
    },
    {
      title: 'Today Movie Shows',
      value: counts.todayMovieShows,
      description: 'Movie schedule entries starting today.',
      icon: Icons.video,
      badge: 'Today'
    },
    {
      title: 'Active Ads',
      value: counts.activeAds,
      description: 'Advertisement items currently active.',
      icon: Icons.media,
      badge: 'Live'
    },
    {
      title: 'Active Sales Targets',
      value: counts.activeSalesTargets,
      description: 'Sales target records currently active.',
      icon: Icons.adjustments,
      badge: 'Live'
    },
    {
      title: 'Display Pages',
      value: counts.displayPages,
      description: 'Configured display page definitions.',
      icon: Icons.page,
      badge: 'Configured'
    }
  ];

  return (
    <PageContainer
      pageTitle='Notice Board Dashboard'
      pageDescription='Monitor cinema board operations, schedules, and configuration at a glance.'
    >
      <div className='flex flex-1 flex-col space-y-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className='@container/card border-border/60 bg-card/90 shadow-sm'
              >
                <CardHeader>
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {card.value.toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='gap-1.5'>
                      <Icon className='size-3.5' />
                      {card.badge}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    {card.title}
                    <Icon className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>{card.description}</div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className='grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]'>
          <Card className='border-border/60 bg-card/90 shadow-sm'>
            <CardHeader>
              <CardDescription>System readiness</CardDescription>
              <CardTitle>Platform status</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-sm'>
              <StatusRow label='PostgreSQL' value='Connected' tone='success' />
              <StatusRow label='Auth' value='Local' tone='success' />
              <StatusRow label='Redis' value='Configured' tone='success' />
              <StatusRow label='Display Pages' value='Pending next phase' tone='neutral' />
            </CardContent>
          </Card>

          <Card className='border-dashed'>
            <CardHeader>
              <CardDescription>Module readiness</CardDescription>
              <CardTitle>Next phase queue</CardTitle>
            </CardHeader>
            <CardFooter className='text-muted-foreground text-sm leading-6'>
              Boards, staff, attendance, events, schedules, advertisements, and display pages will
              move into full module work after the overview foundation is complete.
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

function StatusRow({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: 'success' | 'neutral';
}) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <span className='text-muted-foreground'>{label}</span>
      <Badge
        variant='outline'
        className={
          tone === 'success'
            ? 'gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : 'gap-1.5'
        }
      >
        {tone === 'success' ? (
          <Icons.circleCheck className='size-3.5' />
        ) : (
          <Icons.info className='size-3.5' />
        )}
        {value}
      </Badge>
    </div>
  );
}
