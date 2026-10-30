import Constants from 'expo-constants';

import { getMarket } from './markets';

/** The app name, configurable via EXPO_PUBLIC_APP_NAME (see .env.example). */
export const APP_NAME: string = Constants.expoConfig?.name ?? 'MealSaver';

export const APP_VERSION: string = Constants.expoConfig?.version ?? '0.0.0';

/** The active market (Germany unless configured otherwise). */
export const ACTIVE_MARKET = getMarket(process.env.EXPO_PUBLIC_DEFAULT_MARKET);

/**
 * Feature switches. Paid subscriptions and the AI assistant stay OFF until
 * the free MVP has been tested (see docs/PHASE-1-PLAN.md).
 */
export const FEATURES = {
  subscriptions: false,
  aiAssistant: false,
} as const;
