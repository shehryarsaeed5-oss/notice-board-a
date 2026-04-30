import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Boards / Displays'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Boards / Displays'
      description='Manage cinema boards and display endpoints from this section.'
    />
  );
}
