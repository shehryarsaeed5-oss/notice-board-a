import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Display Pages'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Display Pages'
      description='Display page templates and screen routes will be configured here later.'
    />
  );
}
