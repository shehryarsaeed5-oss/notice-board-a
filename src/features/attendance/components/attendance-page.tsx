import PageContainer from '@/components/layout/page-container';
import { getAttendancePageData } from '../api/service';
import { AttendanceDashboard } from './attendance-dashboard';

interface AttendancePageProps {
  date?: string;
}

export async function AttendancePage({ date }: AttendancePageProps) {
  const data = await getAttendancePageData(date);

  return (
    <PageContainer
      pageTitle='Attendance'
      pageDescription='Capture daily attendance for staff and managers from one screen.'
    >
      <AttendanceDashboard data={data} />
    </PageContainer>
  );
}
