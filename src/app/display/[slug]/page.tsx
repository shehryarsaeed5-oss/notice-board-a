import type { Metadata } from 'next';

import { DisplayBoardPage } from '@/features/display-board/components/display-board-page';

export const metadata: Metadata = {
  title: 'Display Board'
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <DisplayBoardPage slug={slug} />;
}
