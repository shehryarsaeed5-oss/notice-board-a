'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import { AttendancePanel } from './attendance-panel';
import type { AttendancePageData } from '../api/types';

interface AttendanceDashboardProps {
  data: AttendancePageData;
}

export function AttendanceDashboard({ data }: AttendanceDashboardProps) {
  const router = useRouter();

  const stats = useMemo(
    () => ({
      staffCount: data.staff.length,
      managerCount: data.managers.length
    }),
    [data.managers.length, data.staff.length]
  );

  const handleDateChange = (value: string) => {
    const params = new URLSearchParams();
    if (value) {
      params.set('date', value);
    }
    router.replace(`/dashboard/attendance${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className='flex flex-col gap-4'>
      <Card className='border-border/60 bg-card/90 shadow-sm'>
        <CardContent className='flex flex-col gap-4 pt-6 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Select attendance date</p>
            <p className='text-muted-foreground text-sm'>
              Switch dates to load the current staff and manager attendance data.
            </p>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='attendance-date'>Date</Label>
            <Input
              id='attendance-date'
              type='date'
              value={data.date}
              onChange={(event) => handleDateChange(event.target.value)}
              className='w-fit min-w-52'
            />
          </div>
        </CardContent>
      </Card>

      <Card className='border-border/60 bg-card/90 shadow-sm'>
        <CardContent className='flex flex-wrap items-center gap-3 pt-6 text-sm'>
          <span className='text-muted-foreground flex items-center gap-2'>
            <Icons.teams className='size-4' />
            Staff: {stats.staffCount}
          </span>
          <span className='text-muted-foreground flex items-center gap-2'>
            <Icons.account className='size-4' />
            Managers: {stats.managerCount}
          </span>
        </CardContent>
      </Card>

      <Tabs defaultValue='staff' className='space-y-4'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='staff'>Staff Attendance</TabsTrigger>
          <TabsTrigger value='manager'>Manager Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value='staff'>
          <AttendancePanel
            key={`staff-${data.date}`}
            type='staff'
            title='Staff Attendance'
            description='Mark attendance for all active staff members on the selected date.'
            date={data.date}
            rows={data.staff}
          />
        </TabsContent>

        <TabsContent value='manager'>
          <AttendancePanel
            key={`manager-${data.date}`}
            type='manager'
            title='Manager Attendance'
            description='Mark attendance for all active managers on the selected date.'
            date={data.date}
            rows={data.managers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
