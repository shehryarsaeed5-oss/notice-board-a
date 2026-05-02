import { NextResponse } from 'next/server';

import { getDisplayBoardRefreshToken } from '@/features/display-board/api/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = await getDisplayBoardRefreshToken();

  return NextResponse.json({
    token,
    timestamp: new Date().toISOString()
  });
}
