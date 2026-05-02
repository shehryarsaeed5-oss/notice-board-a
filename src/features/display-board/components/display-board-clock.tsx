'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface DisplayBoardClockProps {
  initialIso: string;
}

export function DisplayBoardClock({ initialIso }: DisplayBoardClockProps) {
  const [now, setNow] = useState(() => new Date(initialIso));

  useEffect(() => {
    const handle = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(handle);
  }, []);

  return <span>{format(now, 'h:mm:ss a')}</span>;
}
