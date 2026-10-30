import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ACTIVE_MARKET } from '@/config/app';

import { de } from './locales/de';
import { en } from './locales/en';

export const resources = {
  de: { translation: de },
  en: { translation: en },
} as const;

if (!i18n.isInitialized) {
  // i18n.use() is the documented i18next API; the lint rule is a false alarm here.
  // eslint-disable-next-line import/no-named-as-default-member
  void i18n.use(initReactI18next).init({
    resources,
    // Language follows the market (Germany → German), not the phone setting,
    // so prices, units and texts always match.
    lng: ACTIVE_MARKET.language,
    fallbackLng: 'de',
    interpolation: { escapeValue: false }, // React already escapes text
    returnNull: false,
  });
}

export default i18n;
