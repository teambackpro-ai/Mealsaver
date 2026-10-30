import type { ExpoConfig } from 'expo/config';

/**
 * App configuration.
 *
 * The app name is configurable: set EXPO_PUBLIC_APP_NAME in your .env file
 * (see .env.example). If it is not set, "MealSaver" is used.
 */
const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME?.trim() || 'MealSaver';

const BRAND_GREEN = '#1F6F4E';

const config: ExpoConfig = {
  name: APP_NAME,
  slug: 'mealsaver',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'mealsaver',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    // Bundle identifier will be set in Phase 10 (app-store preparation).
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E8F3EC',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: 'single',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        backgroundColor: BRAND_GREEN,
        image: './assets/images/splash-icon.png',
        imageWidth: 76,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
