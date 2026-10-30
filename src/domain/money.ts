/**
 * Money helpers.
 *
 * All amounts are stored as WHOLE CENTS (integers), e.g. 3,99 € = 399.
 * This avoids rounding errors that happen with decimal numbers
 * (in JavaScript 0.1 + 0.2 is not exactly 0.3).
 */

import type { CurrencyCode } from '@/config/markets';

export type Cents = number;

const formatterCache = new Map<string, Intl.NumberFormat>();

function currencyFormatter(locale: string, currency: CurrencyCode): Intl.NumberFormat {
  const key = `${locale}|${currency}`;
  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    formatterCache.set(key, formatter);
  }
  return formatter;
}

/**
 * Formats cents for display, e.g. formatMoney(1234, 'de-DE', 'EUR') → "12,34 €".
 * Note: German formatting uses a non-breaking space before the € sign.
 */
export function formatMoney(cents: Cents, locale: string, currency: CurrencyCode): string {
  assertCents(cents);
  return currencyFormatter(locale, currency).format(cents / 100);
}

/**
 * Turns user input into cents. Accepts German style ("12,50", "1.234,50",
 * "12,50 €") and plain numbers ("12.50", "12").
 * Returns null if the input is not a valid, non-negative amount.
 */
export function parseMoneyInput(input: string): Cents | null {
  const cleaned = input.replace(/[€£\s ]/g, '');
  if (cleaned === '') return null;

  let normalised: string;
  if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(cleaned)) {
    // German thousands separator: 1.234,50
    normalised = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (/^\d+(,\d{1,2})?$/.test(cleaned)) {
    // German decimal comma: 12,50
    normalised = cleaned.replace(',', '.');
  } else if (/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    // Plain decimal point: 12.50
    normalised = cleaned;
  } else {
    return null;
  }

  const value = Number(normalised);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}

/** Divides an amount fairly, rounding to whole cents (e.g. cost per person). */
export function divideCents(cents: Cents, divisor: number): Cents {
  assertCents(cents);
  if (!Number.isFinite(divisor) || divisor <= 0) {
    throw new RangeError('divisor must be a positive number');
  }
  return Math.round(cents / divisor);
}

/** Multiplies an amount by a factor (e.g. 1.5 portions), rounding to whole cents. */
export function multiplyCents(cents: Cents, factor: number): Cents {
  assertCents(cents);
  if (!Number.isFinite(factor) || factor < 0) {
    throw new RangeError('factor must be a non-negative number');
  }
  return Math.round(cents * factor);
}

export function sumCents(values: readonly Cents[]): Cents {
  return values.reduce<number>((total, value) => {
    assertCents(value);
    return total + value;
  }, 0);
}

function assertCents(value: number): void {
  if (!Number.isInteger(value)) {
    throw new TypeError(`Amount must be whole cents, got ${value}`);
  }
}
