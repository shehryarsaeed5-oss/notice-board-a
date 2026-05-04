export function normalizeText(value: string | null | undefined): string {
  return value?.trim().replace(/\s+/g, ' ') ?? '';
}

export function normalizeItemNameKey(value: string): string {
  return normalizeText(value).toLowerCase();
}

export function parseItemCodeList(value?: string | null): string[] {
  const raw = normalizeText(value);

  if (!raw) {
    return [];
  }

  const parts = raw
    .split(/[\n,;]+/)
    .map((part) => normalizeText(part))
    .filter(Boolean);

  return [...new Set(parts)];
}

export function joinItemCodeList(codes: string[]): string {
  return codes
    .map((code) => normalizeText(code))
    .filter(Boolean)
    .join(', ');
}

export function normalizeOptionalText(value?: string | null): string | null {
  const trimmed = normalizeText(value);
  return trimmed ? trimmed : null;
}

export function normalizeOptionalNumber(value?: number | string | null): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = typeof value === 'string' ? Number(value) : value;

  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeNonNegativeInteger(value?: number | string | null): number {
  const parsed = normalizeOptionalNumber(value);

  if (parsed === null) {
    return 0;
  }

  return Math.max(0, Math.trunc(parsed));
}

export function parseOptionalDateInput(value?: string | null): Date | null {
  const trimmed = normalizeText(value);

  if (!trimmed) {
    return null;
  }

  const candidate = new Date(trimmed);

  return Number.isNaN(candidate.getTime()) ? null : candidate;
}
