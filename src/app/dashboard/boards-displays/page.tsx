import type { Metadata } from 'next';
import { requireRouteAccess } from '@/lib/access';
import { BoardsDisplaysPage } from '@/features/boards-displays/components/boards-displays-page';

export const metadata: Metadata = {
  title: 'Boards / Displays'
};

export default async function Page() {
  await requireRouteAccess('/dashboard/boards-displays');
  return <BoardsDisplaysPage />;
}
