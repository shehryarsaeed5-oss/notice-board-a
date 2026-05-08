'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';

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
  hasZebraRows?: boolean;
}

const DEFAULT_MOVIE_RUNTIME_MINUTES = 150;
const MOVIE_SCHEDULE_GRID_TEMPLATE = 'grid-cols-[minmax(190px,1.25fr)_minmax(0,2fr)]';
const MOVIE_TABLE_HEADING_CLASS =
  'text-[11px] font-extrabold uppercase tracking-[0.14em] leading-none';
const MOVIE_TABLE_BODY_CLASS = 'text-[14px] font-semibold leading-[1.2]';
const MOVIE_TABLE_ROW_CLASS = 'grid items-center min-h-[24px] gap-y-0 px-2 py-[4px] leading-[1.2]';
const MOVIE_CARD_DIVIDER_STYLE = {
  borderColor: 'var(--display-card-divider, rgba(255,255,255,0.10))'
} as const;

function getMovieRowBackgroundStyle(rowIndex: number): CSSProperties {
  return {
    backgroundColor:
      rowIndex % 2 === 1
        ? 'var(--display-card-row-alt-bg, transparent)'
        : 'var(--display-card-row-bg, transparent)'
  };
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
        'inline-flex items-center rounded-none',
        MOVIE_TABLE_BODY_CLASS,
        isActive
          ? 'text-emerald-200 underline decoration-emerald-400/60 decoration-1 underline-offset-2'
          : ''
      )}
    >
      {label}
    </span>
  );
}

function MovieGroupCard({
  group,
  now,
  rowIndex,
  hasZebraRows = false
}: {
  group: MovieScheduleSlideshowMovieGroup;
  now: number;
  rowIndex: number;
  hasZebraRows?: boolean;
}) {
  return (
    <div
      className='border-b last:border-b-0 rounded-none'
      style={{
        ...MOVIE_CARD_DIVIDER_STYLE,
        borderColor: hasZebraRows ? 'transparent' : MOVIE_CARD_DIVIDER_STYLE.borderColor,
        ...getMovieRowBackgroundStyle(rowIndex)
      }}
    >
      <div
        className={cn(
          MOVIE_TABLE_ROW_CLASS,
          'gap-x-5 whitespace-nowrap',
          MOVIE_SCHEDULE_GRID_TEMPLATE
        )}
      >
        <div className='min-w-0'>
          <div className={cn('truncate text-left', MOVIE_TABLE_BODY_CLASS)}>{group.movieName}</div>
        </div>

        <div className='min-w-0 flex-1 overflow-hidden'>
          <div
            className={cn('flex flex-wrap items-center gap-x-3 gap-y-0', MOVIE_TABLE_BODY_CLASS)}
          >
            {group.screenGroups.map((screenGroup) => (
              <span
                key={`${group.movieName}-${screenGroup.screenName}`}
                className='inline-flex max-w-full min-w-0 items-center gap-1 rounded-none'
              >
                <span className={cn('shrink-0', MOVIE_TABLE_BODY_CLASS)}>
                  {getCompactScreenLabel(screenGroup.screenName)}
                </span>
                <span
                  className={cn(
                    'flex min-w-0 flex-wrap items-center gap-0 whitespace-nowrap',
                    MOVIE_TABLE_BODY_CLASS
                  )}
                >
                  {screenGroup.times.map((time, index) => {
                    const active = isPlayingTime(time.startTimeIso, now);

                    return (
                      <span
                        key={`${group.movieName}-${screenGroup.screenName}-${time.startTimeIso}`}
                      >
                        {index > 0 ? (
                          <span
                            className='mr-1'
                            style={{ color: 'var(--display-card-divider, rgba(255,255,255,0.10))' }}
                          >
                            |
                          </span>
                        ) : null}
                        <MovieTimeChip label={time.label} isActive={active} />
                      </span>
                    );
                  })}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieScheduleHeadingRow({ hasZebraRows = false }: { hasZebraRows?: boolean }) {
  return (
    <div
      className={cn('border-b', MOVIE_TABLE_ROW_CLASS, MOVIE_TABLE_HEADING_CLASS)}
      style={{
        ...MOVIE_CARD_DIVIDER_STYLE,
        backgroundColor: hasZebraRows ? 'var(--display-card-row-alt-bg, transparent)' : undefined,
        borderColor: hasZebraRows ? 'transparent' : MOVIE_CARD_DIVIDER_STYLE.borderColor
      }}
    >
      <div
        className={cn(
          MOVIE_TABLE_ROW_CLASS,
          'gap-x-5 whitespace-nowrap',
          MOVIE_SCHEDULE_GRID_TEMPLATE
        )}
      >
        <div className='min-w-0'>Movie</div>
        <div className='min-w-0 flex-1 overflow-hidden'>Showtimes</div>
      </div>
    </div>
  );
}

function MovieSchedulePage({
  movieGroups,
  now,
  hasZebraRows = false
}: {
  movieGroups: MovieScheduleSlideshowMovieGroup[];
  now: number;
  hasZebraRows?: boolean;
}) {
  return (
    <div className='space-y-0.5'>
      <MovieScheduleHeadingRow hasZebraRows={hasZebraRows} />
      <div className='divide-y divide-white/10'>
        {movieGroups.map((movie, rowIndex) => (
          <MovieGroupCard
            key={`${movie.movieName}-${movie.firstShowTime}`}
            group={movie}
            now={now}
            rowIndex={rowIndex}
            hasZebraRows={hasZebraRows}
          />
        ))}
      </div>
    </div>
  );
}

export function MovieScheduleSlideshow({
  movieGroups,
  rowLimit,
  hasZebraRows = false
}: MovieScheduleSlideshowProps) {
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
    return <MovieSchedulePage movieGroups={pages[0]} now={now} hasZebraRows={hasZebraRows} />;
  }

  return (
    <DisplayCardSlideshow className='h-full min-h-0' intervalMs={7_000}>
      {pages.map((pageMovies, index) => (
        <MovieSchedulePage
          key={index}
          movieGroups={pageMovies}
          now={now}
          hasZebraRows={hasZebraRows}
        />
      ))}
    </DisplayCardSlideshow>
  );
}
