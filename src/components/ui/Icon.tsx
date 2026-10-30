import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

import { useAppTheme, type ColorTokens } from '@/theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  color?: keyof ColorTokens;
}

/** Decorative icon. Hidden from screen readers – the text next to it carries the meaning. */
export function Icon({ name, size = 22, color = 'text' }: IconProps) {
  const { colors } = useAppTheme();
  return (
    <Ionicons
      name={name}
      size={size}
      color={colors[color]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
