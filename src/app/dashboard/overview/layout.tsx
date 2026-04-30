import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const statCards = [
    {
      title: 'Active Displays',
      value: '12',
      description: 'Online display boards ready to publish notices.',
      icon: Icons.panelLeft,
      badge: 'Live'
    },
    {
      title: 'Today Events',
      value: '4',
      description: 'Scheduled cinema events for today.',
      icon: Icons.calendar,
      badge: 'Today'
    },
    {
      title: 'Staff Records',
      value: '86',
      description: 'Current staff entries tracked in the system.',
      icon: Icons.teams,
      badge: 'Updated'
    },
    {
      title: 'Movie Shows Today',
      value: '5',
      description: 'Movie screenings planned for this shift.',
      icon: Icons.video,
      badge: 'Today'
    },
    {
      title: 'Active Ads',
      value: '18',
      description: 'Promotions queued for the display network.',
      icon: Icons.media,
      badge: 'Running'
    },
    {
      title: 'Sales Targets',
      value: '21',
      description: 'Target entries available for review.',
      icon: Icons.adjustments,
      badge: 'Planned'
    }
  ];

  return (
    <PageContainer
      pageTitle='Notice Board Dashboard'
      pageDescription='Monitor display activity, schedules, and operational modules from one place.'
    >
      <div className='flex flex-1 flex-col space-y-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className='@container/card'>
                <CardHeader>
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {card.value}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <Icon />
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

        <Card className='border-dashed'>
          <CardHeader>
            <CardDescription>Module readiness</CardDescription>
            <CardTitle>Coming next phase</CardTitle>
          </CardHeader>
          <CardFooter className='text-muted-foreground text-sm leading-6'>
            Boards, staff, events, schedules, advertisements, and settings will be built as full
            modules in the next phase. This screen is intentionally placeholder-first.
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
