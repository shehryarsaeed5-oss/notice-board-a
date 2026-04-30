import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Attendance'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Attendance'
      description='Attendance capture and daily tracking will be implemented in the next phase.'
    />
  );
}
