import { View } from 'react-native';

import { useAppTheme } from '@/theme';

import { AppText } from './AppText';

type Tone = 'neutral' | 'estimate' | 'success' | 'danger';

/** Small label, e.g. "Schätzung" next to every estimated price. */
export function Badge({ label, tone = 'neutral' }: { label: string; tone?: Tone }) {
  const { colors, radius, spacing } = useAppTheme();
  const map = {
    neutral: { bg: colors.surfaceMuted, fg: 'textMuted' },
    estimate: { bg: colors.accentSoft, fg: 'accent' },
    success: { bg: colors.primarySoft, fg: 'primary' },
    danger: { bg: colors.dangerSoft, fg: 'danger' },
  } as const;
  return (
    <View
      style={{
        backgroundColor: map[tone].bg,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        alignSelf: 'flex-start',
      }}>
      <AppText variant="label" color={map[tone].fg}>
        {label}
      </AppText>
    </View>
  );
}
