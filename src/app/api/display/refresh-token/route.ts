import { NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import {
  bumpDisplayBoardRefreshToken,
  getDisplayBoardRefreshToken
} from '@/features/display-board/api/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = await getDisplayBoardRefreshToken();

  return NextResponse.json({
    token,
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  const forbidden = await requireApiAccess('/api/display/refresh-token', 'POST');
  if (forbidden) {
    return forbidden;
  }

  await bumpDisplayBoardRefreshToken();
  const token = await getDisplayBoardRefreshToken();

  return NextResponse.json({
    token,
    timestamp: new Date().toISOString()
  });
}
