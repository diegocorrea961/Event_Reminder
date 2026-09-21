export function daysUntil(eventDate: Date, now: Date): number {
  const eventUTCDay = Date.UTC(
    eventDate.getUTCFullYear(),
    eventDate.getUTCMonth(),
    eventDate.getUTCDate(),
  );
  const nowUTCDay = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  return Math.round((eventUTCDay - nowUTCDay) / (1000 * 60 * 60 * 24));
}

export function isSameUTCMonth(
  eventDate: Date,
  year: number,
  month: number,
): boolean {
  return (
    eventDate.getUTCFullYear() === year && eventDate.getUTCMonth() === month
  );
}
