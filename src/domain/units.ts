/**
 * Units of measurement (metric only).
 *
 * Every quantity can be converted to a "base unit" so that we can add up
 * ingredients from different recipes: grams (g), millilitres (ml) or pieces.
 */

export type Unit = 'g' | 'kg' | 'ml' | 'l' | 'piece';
export type BaseUnit = 'g' | 'ml' | 'piece';

interface UnitInfo {
  base: BaseUnit;
  /** How many base units one of this unit is. */
  factor: number;
}

const UNITS: Record<Unit, UnitInfo> = {
  g: { base: 'g', factor: 1 },
  kg: { base: 'g', factor: 1000 },
  ml: { base: 'ml', factor: 1 },
  l: { base: 'ml', factor: 1000 },
  piece: { base: 'piece', factor: 1 },
};

export interface Quantity {
  amount: number;
  unit: Unit;
}

export function isUnit(value: unknown): value is Unit {
  return typeof value === 'string' && value in UNITS;
}

export function baseUnitOf(unit: Unit): BaseUnit {
  return UNITS[unit].base;
}

/** Converts e.g. 1.5 kg → 1500 g. */
export function toBase(quantity: Quantity): { amount: number; unit: BaseUnit } {
  const info = UNITS[quantity.unit];
  return { amount: quantity.amount * info.factor, unit: info.base };
}

/** Can these two units be added together (e.g. g and kg: yes; g and ml: no)? */
export function areCompatible(a: Unit, b: Unit): boolean {
  return UNITS[a].base === UNITS[b].base;
}

/**
 * Picks a readable unit: 1500 g → 1,5 kg; 250 ml → 250 ml; 3 piece → 3 piece.
 */
export function toDisplayUnit(quantity: Quantity): Quantity {
  const { amount, unit } = toBase(quantity);
  if (unit === 'g' && amount >= 1000) return { amount: amount / 1000, unit: 'kg' };
  if (unit === 'ml' && amount >= 1000) return { amount: amount / 1000, unit: 'l' };
  return { amount, unit };
}

const UNIT_LABELS_DE: Record<Unit, { one: string; other: string }> = {
  g: { one: 'g', other: 'g' },
  kg: { one: 'kg', other: 'kg' },
  ml: { one: 'ml', other: 'ml' },
  l: { one: 'l', other: 'l' },
  piece: { one: 'Stück', other: 'Stück' },
};

/**
 * Formats a quantity in German style, e.g. { 1.5, 'kg' } → "1,5 kg".
 * Rounds sensibly: grams/ml to whole numbers, kg/l to up to 2 decimals.
 */
export function formatQuantity(quantity: Quantity, locale = 'de-DE'): string {
  const display = toDisplayUnit(quantity);
  const maxDecimals = display.unit === 'kg' || display.unit === 'l' ? 2 : display.unit === 'piece' ? 1 : 0;
  const number = new Intl.NumberFormat(locale, {
    maximumFractionDigits: maxDecimals,
  }).format(display.amount);
  const label = display.amount === 1 ? UNIT_LABELS_DE[display.unit].one : UNIT_LABELS_DE[display.unit].other;
  return `${number} ${label}`;
}
