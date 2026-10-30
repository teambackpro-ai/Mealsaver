import { useColorScheme } from 'react-native';

import { darkColors, lightColors, radius, spacing, typography, type ColorTokens } from './tokens';

export * from './tokens';

export interface AppTheme {
  dark: boolean;
  colors: ColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
}

/** Use inside any component to get the current colours (light or dark mode). */
export function useAppTheme(): AppTheme {
  const dark = useColorScheme() === 'dark';
  return {
    dark,
    colors: dark ? darkColors : lightColors,
    spacing,
    radius,
    typography,
  };
}
