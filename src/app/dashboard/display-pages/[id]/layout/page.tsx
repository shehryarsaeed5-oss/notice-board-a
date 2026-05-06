import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { requireRouteAccess } from '@/lib/access';
import { getDisplayPageById } from '@/features/display-pages/api/service';
import { DisplayLayoutDesignerPage } from '@/features/display-pages/components/display-layout-designer-page';

export const metadata: Metadata = {
  title: 'Display Layout Designer'
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  await requireRouteAccess('/dashboard/display-pages');
  const { id } = await params;
  const displayPage = await getDisplayPageById(id);

  if (!displayPage) {
    notFound();
  }

  return <DisplayLayoutDesignerPage displayPage={displayPage} />;
}
