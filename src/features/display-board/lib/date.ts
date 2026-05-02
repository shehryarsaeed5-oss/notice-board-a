export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + 1);
  return result;
}
