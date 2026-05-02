'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DisplayBoardAutoRefreshProps {
  intervalMs?: number;
}

export function DisplayBoardAutoRefresh({ intervalMs = 60_000 }: DisplayBoardAutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    const handle = window.setInterval(() => {
      router.refresh();
    }, intervalMs);

    return () => window.clearInterval(handle);
  }, [intervalMs, router]);

  return null;
}
