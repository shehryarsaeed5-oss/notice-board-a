'use client';

import { useMemo } from 'react';

import { DisplayCardSlideshow } from './display-card-slideshow';

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

const MAX_VISIBLE_TIMES_PER_SCREEN = 3;

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
        <div className='truncate text-[12px] font-semibold leading-tight text-zinc-50 xl:text-[13px]'>
          {group.movieName}
        </div>
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
                  {visibleTimes.join(' | ')}
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

function MovieSchedulePage({ movieGroups }: { movieGroups: MovieScheduleSlideshowMovieGroup[] }) {
  return (
    <div className='space-y-1.5'>
      {movieGroups.map((movie) => (
        <MovieGroupCard key={`${movie.movieName}-${movie.firstShowTime}`} group={movie} />
      ))}
    </div>
  );
}

export function MovieScheduleSlideshow({ movieGroups, rowLimit }: MovieScheduleSlideshowProps) {
  const pages = useMemo(() => {
    const size = Math.max(1, rowLimit);
    const chunks: MovieScheduleSlideshowMovieGroup[][] = [];

    for (let index = 0; index < movieGroups.length; index += size) {
      chunks.push(movieGroups.slice(index, index + size));
    }

    return chunks;
  }, [movieGroups, rowLimit]);

  if (pages.length === 0) {
    return null;
  }

  if (pages.length === 1) {
    return <MovieSchedulePage movieGroups={pages[0]} />;
  }

  return (
    <DisplayCardSlideshow className='h-full min-h-0' intervalMs={7_000}>
      {pages.map((pageMovies, index) => (
        <MovieSchedulePage key={index} movieGroups={pageMovies} />
      ))}
    </DisplayCardSlideshow>
  );
}
