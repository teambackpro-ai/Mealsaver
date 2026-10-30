import type { de } from './locales/de';

/** Same shape as the German texts, but any string values. */
type DeepStrings<T> = { -readonly [K in keyof T]: T[K] extends string ? string : DeepStrings<T[K]> };

export type Translation = DeepStrings<typeof de>;
