import { Pressable, View } from 'react-native';

import { MIN_TOUCH_TARGET, useAppTheme } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

interface ListRowProps {
  label: string;
  icon?: IconName;
  value?: string;
  onPress?: () => void;
  disabled?: boolean;
}

/** A row in a settings-style list, e.g. "Datenschutzerklärung  ›". */
export function ListRow({ label, icon, value, onPress, disabled }: ListRowProps) {
  const { colors, spacing } = useAppTheme();
  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: MIN_TOUCH_TARGET }}>
      {icon ? <Icon name={icon} color={disabled ? 'textMuted' : 'primary'} /> : null}
      <AppText style={{ flex: 1 }} color={disabled ? 'textMuted' : 'text'}>
        {label}
      </AppText>
      {value ? <AppText color="textMuted">{value}</AppText> : null}
      {onPress && !disabled ? <Icon name="chevron-forward" size={18} color="textMuted" /> : null}
    </View>
  );

  if (!onPress) {
    return <View style={{ paddingHorizontal: spacing.lg }}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: spacing.lg,
        backgroundColor: pressed ? colors.surfaceMuted : 'transparent',
      })}>
      {content}
    </Pressable>
  );
}

/** Groups rows into a rounded box with thin separators. */
export function ListGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  const { colors, radius, spacing } = useAppTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      {title ? (
        <AppText variant="label" color="textMuted" style={{ paddingHorizontal: spacing.xs, textTransform: 'uppercase' }}>
          {title}
        </AppText>
      ) : null}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}>
        {children}
      </View>
    </View>
  );
}
