export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const BADGE_TONE_CLASSES: Record<BadgeTone, string> = {
  success:
    'border-emerald-700/40 bg-emerald-950/35 text-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
  warning:
    'border-amber-700/40 bg-amber-950/35 text-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200',
  danger:
    'border-rose-700/40 bg-rose-950/35 text-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
  info: 'border-sky-700/40 bg-sky-950/35 text-sky-100 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200',
  neutral:
    'border-slate-600/40 bg-slate-900/55 text-slate-200 dark:border-border/60 dark:bg-muted/50 dark:text-foreground'
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
