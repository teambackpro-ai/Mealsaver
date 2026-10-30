import { areCompatible, formatQuantity, toBase, toDisplayUnit } from '../units';

const nbsp = ' ';

describe('units', () => {
  it('converts to base units', () => {
    expect(toBase({ amount: 1.5, unit: 'kg' })).toEqual({ amount: 1500, unit: 'g' });
    expect(toBase({ amount: 0.5, unit: 'l' })).toEqual({ amount: 500, unit: 'ml' });
    expect(toBase({ amount: 3, unit: 'piece' })).toEqual({ amount: 3, unit: 'piece' });
  });

  it('knows which units can be added together', () => {
    expect(areCompatible('g', 'kg')).toBe(true);
    expect(areCompatible('ml', 'l')).toBe(true);
    expect(areCompatible('g', 'ml')).toBe(false);
    expect(areCompatible('piece', 'g')).toBe(false);
  });

  it('chooses a readable display unit', () => {
    expect(toDisplayUnit({ amount: 1500, unit: 'g' })).toEqual({ amount: 1.5, unit: 'kg' });
    expect(toDisplayUnit({ amount: 999, unit: 'g' })).toEqual({ amount: 999, unit: 'g' });
    expect(toDisplayUnit({ amount: 2000, unit: 'ml' })).toEqual({ amount: 2, unit: 'l' });
  });

  it('formats quantities in German style', () => {
    expect(formatQuantity({ amount: 1500, unit: 'g' })).toBe(`1,5${nbsp}kg`);
    expect(formatQuantity({ amount: 250, unit: 'g' })).toBe(`250${nbsp}g`);
    expect(formatQuantity({ amount: 333.33, unit: 'g' })).toBe(`333${nbsp}g`);
    expect(formatQuantity({ amount: 1.25, unit: 'l' })).toBe(`1,25${nbsp}l`);
    expect(formatQuantity({ amount: 2, unit: 'piece' })).toBe(`2${nbsp}Stück`);
  });
});
