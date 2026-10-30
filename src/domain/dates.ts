/**
 * Date helpers. German weeks start on Monday.
 * Dates are handled as local calendar days (no time of day).
 */

/** Returns the Monday of the week that contains `date` (at 00:00 local time). */
export function startOfWeek(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = result.getDay(); // 0 = Sunday, 1 = Monday, …
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  return result;
}

/** The seven days (Monday → Sunday) of the week that contains `date`. */
export function weekDays(date: Date): Date[] {
  const monday = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

/** e.g. "30.10.2026" */
export function formatDate(date: Date, locale = 'de-DE'): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

/** e.g. "Montag" */
export function formatWeekday(date: Date, locale = 'de-DE'): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
}

/** e.g. "26.10. – 01.11.2026" */
export function formatWeekRange(date: Date, locale = 'de-DE'): string {
  const days = weekDays(date);
  const first = days[0];
  const last = days[6];
  if (locale.startsWith('de')) {
    // Built by hand: phones differ in whether "day + month" ends with a dot.
    const dd = String(first.getDate()).padStart(2, '0');
    const mm = String(first.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}. – ${formatDate(last, locale)}`;
  }
  const short = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit' }).format(first);
  return `${short} – ${formatDate(last, locale)}`;
}

/** ISO date string (YYYY-MM-DD) in local time, used for storing week starts. */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
