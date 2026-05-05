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
        <div className={cn('mt-auto flex items-center justify-end gap-2 pt-1', indicatorClassName)}>
          <span className='inline-flex items-center border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-zinc-200 rounded-none'>
            {pageIndex + 1}/{pageCount}
          </span>
          <div className='flex items-center gap-1'>
            {pages.map((_, index) => (
              <span
                key={index}
                className={cn(
                  'size-1.5 rounded-none transition-colors',
                  index === pageIndex ? 'bg-amber-300' : 'bg-white/20'
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
