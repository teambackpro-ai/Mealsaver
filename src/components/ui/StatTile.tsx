import { View } from 'react-native';

import { useAppTheme } from '@/theme';

import { AppText } from './AppText';

/** A labelled number, e.g. "Noch übrig  42,50 €". */
export function StatTile({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  const { spacing } = useAppTheme();
  return (
    <View accessible accessibilityLabel={`${label}: ${value}`} style={{ flex: 1, minWidth: 130, gap: spacing.xxs }}>
      <AppText variant="caption" color="textMuted">
        {label}
      </AppText>
      <AppText variant={emphasis ? 'number' : 'heading'} color={emphasis ? 'primary' : 'text'}>
        {value}
      </AppText>
    </View>
  );
}
