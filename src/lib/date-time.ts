import { format } from 'date-fns';

const DATE_TIME_INPUT_FORMAT = "yyyy-MM-dd'T'HH:mm";

export function formatDateTimeInputValue(date: Date): string {
  return format(date, DATE_TIME_INPUT_FORMAT);
}

export function isValidDateTimeInputValue(value: string): boolean {
  if (!value.trim()) {
    return false;
  }

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

export function parseDateTimeInputValue(value: string): Date {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date and time value');
  }

  return date;
}
