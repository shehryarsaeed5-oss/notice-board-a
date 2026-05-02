'use client';

import { useEffect } from 'react';

interface DisplayBoardAutoRefreshProps {
  pollMs?: number;
  backupMs?: number;
}

export function DisplayBoardAutoRefresh({
  pollMs = 5_000,
  backupMs = 60_000
}: DisplayBoardAutoRefreshProps) {
  useEffect(() => {
    let active = true;
    let currentToken: string | null = null;

    const refresh = async () => {
      try {
        const response = await fetch('/api/display/refresh-token', {
          cache: 'no-store'
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { token?: string };

        if (!active || !data.token) {
          return;
        }

        if (currentToken === null) {
          currentToken = data.token;
          return;
        }

        if (data.token !== currentToken) {
          window.location.reload();
        }
      } catch {
        // Ignore refresh failures. The 60-second backup reload still applies.
      }
    };

    void refresh();

    const pollHandle = window.setInterval(() => {
      void refresh();
    }, pollMs);

    const backupHandle = window.setInterval(() => {
      window.location.reload();
    }, backupMs);

    return () => {
      active = false;
      window.clearInterval(pollHandle);
      window.clearInterval(backupHandle);
    };
  }, [backupMs, pollMs]);

  return null;
}
