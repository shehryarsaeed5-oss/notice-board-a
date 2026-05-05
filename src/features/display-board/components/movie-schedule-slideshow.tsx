'use client';

import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

export interface MovieScheduleSlideshowScreenGroup {
  screenName: string;
  times: string[];
}

export interface MovieScheduleSlideshowMovieGroup {
  movieName: string;
  firstShowTime: string;
  screenGroups: MovieScheduleSlideshowScreenGroup[];
}

interface MovieScheduleSlideshowProps {
  movieGroups: MovieScheduleSlideshowMovieGroup[];
  rowLimit: number;
}

const SLIDE_INTERVAL_MS = 7_000;
const MAX_VISIBLE_TIMES_PER_SCREEN = 3;
const MOVIE_GROUP_TITLE_CLASS =
  'truncate text-[12px] font-semibold leading-tight text-zinc-50 xl:text-[13px]';

function chunkMovieGroups(
  movieGroups: MovieScheduleSlideshowMovieGroup[],
  rowLimit: number
): MovieScheduleSlideshowMovieGroup[][] {
  const size = Math.max(1, rowLimit);
  const pages: MovieScheduleSlideshowMovieGroup[][] = [];

  for (let index = 0; index < movieGroups.length; index += size) {
    pages.push(movieGroups.slice(index, index + size));
  }

  return pages;
}

function getCompactScreenLabel(screenName: string) {
  const normalized = screenName.trim().toLowerCase();

  switch (normalized) {
    case 'maximus':
      return 'Max';
    case 'screen 2':
      return 'S2';
    case 'screen 3':
      return 'S3';
    case 'screen 4':
      return 'S4';
    case 'screen 5':
      return 'S5';
    case 'screen 6':
      return 'S6';
    case 'platinum 7':
      return 'P7';
    case 'platinum 8':
      return 'P8';
    default:
      return screenName.trim();
  }
}

function MovieGroupCard({ group }: { group: MovieScheduleSlideshowMovieGroup }) {
  return (
    <div className='border border-white/10 bg-black/20 px-3 py-2.5 rounded-none'>
      <div className='space-y-1.5'>
        <div className={MOVIE_GROUP_TITLE_CLASS}>{group.movieName}</div>
        <div className='flex flex-wrap gap-1 text-[11px] text-zinc-200'>
          {group.screenGroups.map((screenGroup) => {
            const visibleTimes = screenGroup.times.slice(0, MAX_VISIBLE_TIMES_PER_SCREEN);
            const hiddenCount = screenGroup.times.length - visibleTimes.length;

            return (
              <span
                key={`${group.movieName}-${screenGroup.screenName}`}
                className='inline-flex max-w-full items-center border border-white/10 bg-white/5 px-1.5 py-[3px] rounded-none'
              >
                <span className='shrink-0 font-semibold text-zinc-50'>
                  {getCompactScreenLabel(screenGroup.screenName)}
                </span>
                <span className='mx-1 text-zinc-400'> </span>
                <span className='min-w-0 truncate text-zinc-200'>
                  {visibleTimes.join(', ')}
                  {hiddenCount > 0 ? ` +${hiddenCount}` : ''}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MovieScheduleSlideshow({ movieGroups, rowLimit }: MovieScheduleSlideshowProps) {
  const pages = useMemo(() => chunkMovieGroups(movieGroups, rowLimit), [movieGroups, rowLimit]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = pages.length;
  const currentPage = pages[pageIndex] ?? pages[0] ?? [];
  const showPagination = pageCount > 1;

  useEffect(() => {
    setPageIndex(0);
  }, [movieGroups, rowLimit]);

  useEffect(() => {
    if (pageCount <= 1) {
      setPageIndex(0);
      return;
    }

    const handle = window.setInterval(() => {
      setPageIndex((current) => (current + 1) % pageCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(handle);
  }, [pageCount]);

  useEffect(() => {
    if (pageIndex >= pageCount) {
      setPageIndex(0);
    }
  }, [pageCount, pageIndex]);

  return (
    <div className='flex h-full min-h-0 flex-col'>
      <div className='space-y-1.5'>
        {currentPage.map((movie) => (
          <MovieGroupCard key={`${movie.movieName}-${movie.firstShowTime}`} group={movie} />
        ))}
      </div>

      {showPagination ? (
        <div className='mt-0.5 flex items-center justify-end gap-2 text-[9px] text-zinc-400'>
          <span
            className={cn(
              'inline-flex items-center border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-zinc-200 rounded-none'
            )}
          >
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
