import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Advertisements'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Advertisements'
      description='Advertisement scheduling and media rotation will be built in the next phase.'
    />
  );
}
