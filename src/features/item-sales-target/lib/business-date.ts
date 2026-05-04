import { format, startOfMonth, startOfWeek, subDays } from 'date-fns';

export interface BusinessDateContext {
  timezone: string;
  cutoffHour: number;
  businessDateKey: string;
  referenceDate: Date;
}

function getDateParts(value: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });

  const parts = formatter.formatToParts(value);
  const lookup = new Map(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(lookup.get('year') ?? value.getFullYear()),
    month: Number(lookup.get('month') ?? value.getMonth() + 1),
    day: Number(lookup.get('day') ?? value.getDate()),
    hour: Number(lookup.get('hour') ?? value.getHours()),
    minute: Number(lookup.get('minute') ?? value.getMinutes()),
    second: Number(lookup.get('second') ?? value.getSeconds())
  };
}

export function toBusinessDateKey(value: Date, timeZone: string, cutoffHour: number): string {
  const parts = getDateParts(value, timeZone);
  const currentDate = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));

  if (Number.isNaN(currentDate.getTime())) {
    return format(value, 'yyyy-MM-dd');
  }

  if (parts.hour < cutoffHour) {
    return format(subDays(currentDate, 1), 'yyyy-MM-dd');
  }

  return format(currentDate, 'yyyy-MM-dd');
}

export function createBusinessDateContext(
  referenceDate: Date,
  timeZone: string,
  cutoffHour: number
): BusinessDateContext {
  return {
    timezone: timeZone,
    cutoffHour,
    businessDateKey: toBusinessDateKey(referenceDate, timeZone, cutoffHour),
    referenceDate
  };
}

export function parseBusinessDateKey(value: string): Date {
  return new Date(`${value.trim()}T00:00:00`);
}

export function formatBusinessDateKey(value: Date): string {
  return format(value, 'yyyy-MM-dd');
}

export function addBusinessDays(value: string, offsetDays: number): string {
  const candidate = parseBusinessDateKey(value);

  if (Number.isNaN(candidate.getTime())) {
    return value;
  }

  candidate.setDate(candidate.getDate() + offsetDays);
  return formatBusinessDateKey(candidate);
}

export function getBusinessMonthStartKey(referenceKey: string): string {
  const date = parseBusinessDateKey(referenceKey);

  if (Number.isNaN(date.getTime())) {
    return referenceKey;
  }

  return format(startOfMonth(date), 'yyyy-MM-dd');
}

export function getBusinessWeekStartKey(referenceKey: string): string {
  const date = parseBusinessDateKey(referenceKey);

  if (Number.isNaN(date.getTime())) {
    return referenceKey;
  }

  return format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
}

export function enumerateBusinessDateKeys(startKey: string, endKey: string): string[] {
  const keys: string[] = [];
  const start = parseBusinessDateKey(startKey);
  const end = parseBusinessDateKey(endKey);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return keys;
  }

  const current = new Date(start);

  while (current <= end) {
    keys.push(formatBusinessDateKey(current));
    current.setDate(current.getDate() + 1);
  }

  return keys;
}
