const DISPLAY_PAGE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeDisplayPageSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function isDisplayPageSlug(value: string): boolean {
  return DISPLAY_PAGE_SLUG_PATTERN.test(value);
}

export function createDisplayPageUrl(slug: string): string {
  return `/display/${slug}`;
}
