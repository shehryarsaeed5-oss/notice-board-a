const INTERNAL_REDIRECT_BASE = 'http://notice-board.local';

export function getSafeInternalRedirectPath(
  value: string | null | undefined,
  fallback = '/dashboard'
): string {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }

  try {
    const target = new URL(trimmed, INTERNAL_REDIRECT_BASE);
    if (target.origin !== INTERNAL_REDIRECT_BASE) {
      return fallback;
    }

    const path = `${target.pathname}${target.search}${target.hash}`;
    if (!path.startsWith('/') || path.startsWith('//')) {
      return fallback;
    }

    return path;
  } catch {
    return fallback;
  }
}
