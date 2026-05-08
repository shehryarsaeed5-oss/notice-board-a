'use client';

import { Children, useEffect, useMemo, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface DisplayCardSlideshowProps {
  children: ReactNode;
  intervalMs?: number;
  className?: string;
  contentClassName?: string;
  indicatorClassName?: string;
}

export function DisplayCardSlideshow({
  children,
  intervalMs = 7_000,
  className,
  contentClassName,
  indicatorClassName
}: DisplayCardSlideshowProps) {
  const pages = useMemo(() => Children.toArray(children), [children]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = pages.length;
  const showPagination = pageCount > 1;

  useEffect(() => {
    setPageIndex(0);
  }, [pageCount]);

  useEffect(() => {
    if (pageCount <= 1) {
      setPageIndex(0);
      return;
    }

    const handle = window.setInterval(() => {
      setPageIndex((current) => (current + 1) % pageCount);
    }, intervalMs);

    return () => window.clearInterval(handle);
  }, [intervalMs, pageCount]);

  if (pageCount === 0) {
    return null;
  }

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      <div className={cn('flex-1 min-h-0', contentClassName)}>{pages[pageIndex] ?? pages[0]}</div>

      {showPagination ? (
        <div
          className={cn('mt-auto flex items-center justify-end gap-1 pt-0.5', indicatorClassName)}
        >
          <span
            className='text-[9px] font-semibold tabular-nums'
            style={{ color: 'var(--display-card-body-text, #3b2d17)' }}
          >
            {pageIndex + 1}/{pageCount}
          </span>
          <div className='flex items-center gap-0.5'>
            {pages.map((_, index) => (
              <span
                key={index}
                className={cn(
                  'size-1.5 transition-colors',
                  index === pageIndex
                    ? 'bg-[color:var(--display-card-body-text,#3b2d17)]'
                    : 'bg-[color:var(--display-card-heading-text,#9a7b35)] opacity-60'
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
