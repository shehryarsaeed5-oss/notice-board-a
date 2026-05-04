export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const BADGE_TONE_CLASSES: Record<BadgeTone, string> = {
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  warning:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  danger:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
  info: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
  neutral:
    'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300'
};

const STATUS_TONE_MAP: Record<string, BadgeTone> = {
  SUCCESS: 'success',
  COMPLETED: 'success',
  IMPORTED: 'success',
  ACTIVE: 'success',
  PRESENT: 'success',
  FAILED: 'danger',
  ERROR: 'danger',
  ARCHIVED: 'danger',
  ABSENT: 'danger',
  EMPTY: 'warning',
  WARNING: 'warning',
  PENDING: 'warning',
  LEAVE: 'warning',
  LATE: 'warning',
  INACTIVE: 'neutral',
  CLEARED: 'info',
  INFO: 'info',
  RUNNING: 'info',
  MISSING: 'warning',
  NO_TARGET: 'neutral',
  SKIPPED: 'neutral'
};

export function badgeToneClass(tone: BadgeTone): string {
  return BADGE_TONE_CLASSES[tone];
}

export function statusBadgeClass(status: string | null | undefined): string {
  const tone = STATUS_TONE_MAP[(status ?? '').toUpperCase()] ?? 'neutral';
  return badgeToneClass(tone);
}
