import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Events'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Events'
      description='Cinema events, bookings, and event notices will be managed here later.'
    />
  );
}
