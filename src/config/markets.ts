/**
 * Markets (countries) the app supports.
 *
 * Everything country-specific lives here: language, currency, number/date
 * format and the list of supermarkets. To launch in the UK later, we fill in
 * the UK entry and set `enabled: true`. No screen code has to change.
 */

export type MarketCode = 'DE' | 'UK';
export type LanguageCode = 'de' | 'en';
export type CurrencyCode = 'EUR' | 'GBP';

export type RetailerCode =
  // Germany
  | 'aldi_nord'
  | 'aldi_sued'
  | 'lidl_de'
  | 'rewe'
  | 'edeka'
  | 'kaufland'
  | 'netto_md'
  | 'penny'
  // United Kingdom (prepared, not active yet)
  | 'tesco'
  | 'sainsburys'
  | 'asda'
  | 'aldi_uk'
  | 'lidl_uk';

export interface Retailer {
  code: RetailerCode;
  /** Display name. Shown as plain text only – no logos without permission. */
  name: string;
}

export interface Market {
  code: MarketCode;
  enabled: boolean;
  language: LanguageCode;
  /** BCP-47 locale used for number, currency and date formatting. */
  locale: string;
  currency: CurrencyCode;
  /** Metric everywhere for now (g, kg, ml, l). */
  measurementSystem: 'metric';
  /** 1 = Monday. German weeks start on Monday. */
  firstDayOfWeek: 1 | 7;
  retailers: Retailer[];
}

export const MARKETS: Record<MarketCode, Market> = {
  DE: {
    code: 'DE',
    enabled: true,
    language: 'de',
    locale: 'de-DE',
    currency: 'EUR',
    measurementSystem: 'metric',
    firstDayOfWeek: 1,
    retailers: [
      { code: 'aldi_nord', name: 'Aldi Nord' },
      { code: 'aldi_sued', name: 'Aldi Süd' },
      { code: 'lidl_de', name: 'Lidl' },
      { code: 'rewe', name: 'Rewe' },
      { code: 'edeka', name: 'Edeka' },
      { code: 'kaufland', name: 'Kaufland' },
      { code: 'netto_md', name: 'Netto Marken-Discount' },
      { code: 'penny', name: 'Penny' },
    ],
  },
  UK: {
    code: 'UK',
    enabled: false,
    language: 'en',
    locale: 'en-GB',
    currency: 'GBP',
    measurementSystem: 'metric',
    firstDayOfWeek: 1,
    retailers: [
      { code: 'tesco', name: 'Tesco' },
      { code: 'sainsburys', name: "Sainsbury's" },
      { code: 'asda', name: 'Asda' },
      { code: 'aldi_uk', name: 'Aldi' },
      { code: 'lidl_uk', name: 'Lidl' },
    ],
  },
};

export const DEFAULT_MARKET_CODE: MarketCode = 'DE';

export function isMarketCode(value: unknown): value is MarketCode {
  return value === 'DE' || value === 'UK';
}

/** Returns the configured market, falling back to Germany. */
export function getMarket(code?: string | null): Market {
  if (isMarketCode(code) && MARKETS[code].enabled) {
    return MARKETS[code];
  }
  return MARKETS[DEFAULT_MARKET_CODE];
}
