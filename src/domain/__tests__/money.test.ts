import { divideCents, formatMoney, multiplyCents, parseMoneyInput, sumCents } from '../money';

// German formatting puts a non-breaking space (U+00A0) before the € sign.
const nbsp = ' ';

describe('formatMoney', () => {
  it('formats euros in German style', () => {
    expect(formatMoney(1234, 'de-DE', 'EUR')).toBe(`12,34${nbsp}€`);
    expect(formatMoney(0, 'de-DE', 'EUR')).toBe(`0,00${nbsp}€`);
    expect(formatMoney(123456, 'de-DE', 'EUR')).toBe(`1.234,56${nbsp}€`);
  });

  it('is ready for British pounds', () => {
    expect(formatMoney(1234, 'en-GB', 'GBP')).toBe('£12.34');
  });

  it('rejects amounts that are not whole cents', () => {
    expect(() => formatMoney(12.5, 'de-DE', 'EUR')).toThrow(TypeError);
  });
});

describe('parseMoneyInput', () => {
  it.each([
    ['12,50', 1250],
    ['12', 1200],
    ['0,99', 99],
    ['1.234,50', 123450],
    ['12,50 €', 1250],
    ['  80 ', 8000],
    ['12.50', 1250],
    ['12,5', 1250],
  ])('reads "%s" as %i cents', (input, expected) => {
    expect(parseMoneyInput(input)).toBe(expected);
  });

  it.each(['', 'abc', '-5', '12,345', '1,2,3', '12.50.1'])('rejects "%s"', (input) => {
    expect(parseMoneyInput(input)).toBeNull();
  });
});

describe('cent arithmetic', () => {
  it('divides and rounds to whole cents', () => {
    expect(divideCents(1000, 3)).toBe(333);
    expect(divideCents(1001, 2)).toBe(501);
  });

  it('refuses to divide by zero', () => {
    expect(() => divideCents(1000, 0)).toThrow(RangeError);
  });

  it('multiplies by portion factors', () => {
    expect(multiplyCents(299, 1.5)).toBe(449);
  });

  it('sums without floating point errors', () => {
    expect(sumCents([10, 20, 30])).toBe(60);
    expect(sumCents([])).toBe(0);
  });
});
