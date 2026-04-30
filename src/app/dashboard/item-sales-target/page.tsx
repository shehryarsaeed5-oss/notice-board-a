import type { Metadata } from 'next';
import ModulePlaceholderPage from '@/components/layout/module-placeholder-page';

export const metadata: Metadata = {
  title: 'Item Sales Target'
};

export default function Page() {
  return (
    <ModulePlaceholderPage
      title='Item Sales Target'
      description='Item and concession sales targets will be built out in a later module.'
    />
  );
}
