/**
 * Design tokens: the single source for colours, spacing, corner radius and
 * text styles. Change a value here and the whole app updates.
 *
 * Colour pairs were chosen for WCAG AA contrast (≥ 4.5:1 for normal text).
 */

export const palette = {
  green900: '#0F3D2B',
  green700: '#1F6F4E', // brand – 6.1:1 on white
  green600: '#2A8560',
  green100: '#E3F1E9',
  green050: '#F1F8F4',
  apricot600: '#B45309', // warm accent text – 5.0:1 on white
  apricot400: '#F59E0B',
  apricot100: '#FEF3E2',
  red700: '#B42318',
  red100: '#FDECEA',
  stone950: '#141A17',
  stone800: '#2B3330',
  stone600: '#56615C', // secondary text – 6.4:1 on white
  stone400: '#9AA49F',
  stone200: '#E2E6E3',
  stone100: '#F1F2EF',
  cream: '#FAF8F4',
  white: '#FFFFFF',
} as const;

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  textOnPrimary: string;
  primary: string;
  primaryPressed: string;
  primarySoft: string;
  accent: string;
  accentSoft: string;
  danger: string;
  dangerSoft: string;
  tabInactive: string;
}

export const lightColors: ColorTokens = {
  background: palette.cream,
  surface: palette.white,
  surfaceMuted: palette.stone100,
  border: palette.stone200,
  text: palette.stone950,
  textMuted: palette.stone600,
  textOnPrimary: palette.white,
  primary: palette.green700,
  primaryPressed: palette.green900,
  primarySoft: palette.green100,
  accent: palette.apricot600,
  accentSoft: palette.apricot100,
  danger: palette.red700,
  dangerSoft: palette.red100,
  tabInactive: palette.stone600,
};

export const darkColors: ColorTokens = {
  background: '#0E1311',
  surface: '#171E1B',
  surfaceMuted: '#1F2824',
  border: '#2C3732',
  text: '#F1F4F2',
  textMuted: '#AEB8B3',
  textOnPrimary: '#0E1311',
  primary: '#5CC495',
  primaryPressed: '#7FD3AC',
  primarySoft: '#1C3A2D',
  accent: '#F8B54A',
  accentSoft: '#3A2C14',
  danger: '#F97066',
  dangerSoft: '#3D1C19',
  tabInactive: '#8D9893',
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 30, lineHeight: 36, fontWeight: '700' },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  heading: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 23, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 23, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
  number: { fontSize: 26, lineHeight: 32, fontWeight: '700' },
} as const;

export type TypographyVariant = keyof typeof typography;

/** Minimum size of anything tappable (Apple & Google accessibility guidance). */
export const MIN_TOUCH_TARGET = 48;

/** Content is centred and limited in width on tablets and web. */
export const MAX_CONTENT_WIDTH = 720;
