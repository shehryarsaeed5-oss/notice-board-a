import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Meeting Schedule'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Meeting Schedule'
      description='Meeting planning and scheduling will be added in a dedicated module.'
    />
  );
}
