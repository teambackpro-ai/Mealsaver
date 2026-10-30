import '@/i18n';

import { QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { queryClient } from '@/services/queryClient';
import { useAppTheme } from '@/theme';

/** The outer frame of the app: providers, theme and top-level navigation. */
export default function RootLayout() {
  const { t } = useTranslation();
  const { dark, colors } = useAppTheme();
  const base = dark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style={dark ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerBackTitle: t('common.back'), headerTintColor: colors.primary }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="legal/[page]" options={{ title: '' }} />
          <Stack.Screen name="+not-found" options={{ title: t('notFound.title') }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
