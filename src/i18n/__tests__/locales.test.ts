import { de } from '../locales/de';
import { en } from '../locales/en';

function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('translations', () => {
  it('English has exactly the same keys as German', () => {
    expect(keys(en).sort()).toEqual(keys(de).sort());
  });

  it('has no empty German texts', () => {
    const empty = keys(de).filter((key) => {
      const value = key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], de);
      return typeof value !== 'string' || value.trim() === '';
    });
    expect(empty).toEqual([]);
  });
});
