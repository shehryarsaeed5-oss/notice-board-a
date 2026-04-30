import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Weather'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Weather'
      description='Weather settings and location-based display logic will be added later.'
    />
  );
}
