import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { MIN_TOUCH_TARGET, useAppTheme } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: Variant;
  icon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  icon,
  loading = false,
  disabled,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  const { colors, radius, spacing } = useAppTheme();
  const isDisabled = disabled || loading;

  const background = { primary: colors.primary, secondary: colors.primarySoft, ghost: 'transparent' }[variant];
  const pressedBackground = {
    primary: colors.primaryPressed,
    secondary: colors.border,
    ghost: colors.surfaceMuted,
  }[variant];
  const textColor = variant === 'primary' ? 'textOnPrimary' : 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed ? pressedBackground : background,
          borderRadius: radius.md,
          paddingHorizontal: spacing.xl,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
      ]}
      {...rest}>
      <View style={[styles.content, { gap: spacing.sm }]}>
        {loading ? (
          <ActivityIndicator color={colors[textColor]} />
        ) : (
          icon && <Icon name={icon} size={20} color={textColor} />
        )}
        <AppText variant="bodyStrong" color={textColor}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
