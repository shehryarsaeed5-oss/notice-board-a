import type { Metadata } from 'next';
import { BoardsDisplaysPage } from '@/features/boards-displays/components/boards-displays-page';

export const metadata: Metadata = {
  title: 'Boards / Displays'
};

export default function Page() {
  return <BoardsDisplaysPage />;
}
