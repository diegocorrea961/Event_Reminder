// const WEEKS_PER_GRID = 6;
// const DAYS_PER_WEEK = 7;
// const TOTAL_CELLS = WEEKS_PER_GRID * DAYS_PER_WEEK;
const TOTAL_CELLS = 6 * 7;

export function getCalendarCells(
  year: number,
  month: number,
): (number | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const trailingNulls = TOTAL_CELLS - cells.length;
  return [...cells, ...Array(trailingNulls).fill(null)];
}
