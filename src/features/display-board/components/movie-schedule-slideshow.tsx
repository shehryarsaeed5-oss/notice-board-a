'use client';

import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { DisplayCardSlideshow } from './display-card-slideshow';

export interface MovieScheduleSlideshowTimeItem {
  label: string;
  startTimeIso: string;
}

export interface MovieScheduleSlideshowScreenGroup {
  screenName: string;
  times: MovieScheduleSlideshowTimeItem[];
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

const DEFAULT_MOVIE_RUNTIME_MINUTES = 150;

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

function useLiveNow() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const handle = window.setInterval(() => {
      setNow(Date.now());
    }, 30_000);

    return () => window.clearInterval(handle);
  }, []);

  return now;
}

function isPlayingTime(startTimeIso: string, now: number) {
  const startTime = new Date(startTimeIso);
  if (Number.isNaN(startTime.getTime())) {
    return false;
  }

  const endTime = new Date(startTime.getTime() + DEFAULT_MOVIE_RUNTIME_MINUTES * 60_000);
  const current = new Date(now);

  return current >= startTime && current <= endTime;
}

function MovieTimeChip({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-[9px] leading-none rounded-none',
        isActive
          ? 'text-emerald-200 underline decoration-emerald-400/60 decoration-1 underline-offset-2'
          : 'text-zinc-200'
      )}
    >
      {label}
    </span>
  );
}

function MovieGroupCard({ group, now }: { group: MovieScheduleSlideshowMovieGroup; now: number }) {
  return (
    <div className='border border-white/10 bg-black/20 px-2.5 py-1.5 rounded-none'>
      <div className='flex items-center gap-2'>
        <div className='w-[clamp(7rem,22%,10rem)] shrink-0'>
          <div className='truncate text-left text-[11px] font-semibold leading-[1.05] text-zinc-50 xl:text-[12px]'>
            {group.movieName}
          </div>
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-zinc-200'>
            {group.screenGroups.map((screenGroup) => {
              return (
                <span
                  key={`${group.movieName}-${screenGroup.screenName}`}
                  className='inline-flex max-w-full min-w-0 items-center gap-1 rounded-none'
                >
                  <span className='shrink-0 font-semibold text-zinc-50'>
                    {getCompactScreenLabel(screenGroup.screenName)}
                  </span>
                  <span className='flex min-w-0 flex-wrap items-center gap-0.5 whitespace-nowrap text-zinc-300'>
                    {screenGroup.times.map((time, index) => {
                      const active = isPlayingTime(time.startTimeIso, now);

                      return (
                        <span
                          key={`${group.movieName}-${screenGroup.screenName}-${time.startTimeIso}`}
                        >
                          {index > 0 ? <span className='mr-1 text-zinc-500'>|</span> : null}
                          <MovieTimeChip label={time.label} isActive={active} />
                        </span>
                      );
                    })}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieSchedulePage({
  movieGroups,
  now
}: {
  movieGroups: MovieScheduleSlideshowMovieGroup[];
  now: number;
}) {
  return (
    <div className='space-y-1'>
      {movieGroups.map((movie) => (
        <MovieGroupCard key={`${movie.movieName}-${movie.firstShowTime}`} group={movie} now={now} />
      ))}
    </div>
  );
}

export function MovieScheduleSlideshow({ movieGroups, rowLimit }: MovieScheduleSlideshowProps) {
  const now = useLiveNow();

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
    return <MovieSchedulePage movieGroups={pages[0]} now={now} />;
  }

  return (
    <DisplayCardSlideshow className='h-full min-h-0' intervalMs={7_000}>
      {pages.map((pageMovies, index) => (
        <MovieSchedulePage key={index} movieGroups={pageMovies} now={now} />
      ))}
    </DisplayCardSlideshow>
  );
}
