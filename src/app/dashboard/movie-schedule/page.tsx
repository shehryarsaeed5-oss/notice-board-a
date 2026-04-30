import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Movie Schedule'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Movie Schedule'
      description='Movie scheduling and showtime management will arrive in the next phase.'
    />
  );
}
