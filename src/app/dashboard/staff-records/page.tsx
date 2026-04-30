import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Staff Records'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Staff Records'
      description='Staff records, shifts, and employee details will live here in the next phase.'
    />
  );
}
