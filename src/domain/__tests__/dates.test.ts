import { formatDate, formatWeekRange, formatWeekday, startOfWeek, toIsoDate, weekDays } from '../dates';

describe('dates', () => {
  it('starts weeks on Monday', () => {
    // Friday 30 October 2026
    expect(toIsoDate(startOfWeek(new Date(2026, 9, 30)))).toBe('2026-10-26');
    // Sunday 1 November 2026 still belongs to the week starting Monday 26 October
    expect(toIsoDate(startOfWeek(new Date(2026, 10, 1)))).toBe('2026-10-26');
    // Monday stays Monday
    expect(toIsoDate(startOfWeek(new Date(2026, 9, 26)))).toBe('2026-10-26');
  });

  it('returns seven days Monday to Sunday', () => {
    const days = weekDays(new Date(2026, 9, 30));
    expect(days).toHaveLength(7);
    expect(formatWeekday(days[0])).toBe('Montag');
    expect(formatWeekday(days[6])).toBe('Sonntag');
  });

  it('formats dates in German style', () => {
    expect(formatDate(new Date(2026, 9, 30))).toBe('30.10.2026');
    expect(formatWeekRange(new Date(2026, 9, 30))).toBe('26.10. – 01.11.2026');
  });

  it('handles a week that crosses the year', () => {
    expect(toIsoDate(startOfWeek(new Date(2027, 0, 1)))).toBe('2026-12-28');
  });
});
