import { View, type ViewProps } from 'react-native';

import { useAppTheme, type ColorTokens } from '@/theme';

interface CardProps extends ViewProps {
  tone?: Extract<keyof ColorTokens, 'surface' | 'primarySoft' | 'accentSoft' | 'surfaceMuted'>;
}

export function Card({ tone = 'surface', style, ...rest }: CardProps) {
  const { colors, radius, spacing, dark } = useAppTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors[tone],
          borderRadius: radius.lg,
          padding: spacing.lg,
          borderWidth: tone === 'surface' ? 1 : 0,
          borderColor: colors.border,
          // Soft shadow in light mode only
          boxShadow: dark || tone !== 'surface' ? undefined : '0 1px 3px rgba(20, 26, 23, 0.06)',
        },
        style,
      ]}
      {...rest}
    />
  );
}
