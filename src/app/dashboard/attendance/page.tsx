import type { Metadata } from 'next';
import { requireRouteAccess } from '@/lib/access';
import { AttendancePage } from '@/features/attendance/components/attendance-page';
import { toDateInputValue } from '@/features/attendance/lib/date';

export const metadata: Metadata = {
  title: 'Attendance'
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function Page({ searchParams }: PageProps) {
  await requireRouteAccess('/dashboard/attendance');
  const params = await searchParams;
  const date = readQueryValue(params.date) ?? toDateInputValue(new Date());

  return <AttendancePage date={date} />;
}
