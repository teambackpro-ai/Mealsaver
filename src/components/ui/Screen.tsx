import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MAX_CONTENT_WIDTH, useAppTheme } from '@/theme';

import { AppText } from './AppText';

interface ScreenProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  /** Set to false for screens that manage their own scrolling (e.g. long lists). */
  scroll?: boolean;
}

/** Standard page frame: safe area, background, large title, consistent padding. */
export function Screen({ title, subtitle, children, scroll = true }: ScreenProps) {
  const { colors, spacing } = useAppTheme();

  const header = title ? (
    <View style={{ gap: spacing.xs, marginBottom: spacing.xl }}>
      <AppText variant="display">{title}</AppText>
      {subtitle ? <AppText color="textMuted">{subtitle}</AppText> : null}
    </View>
  ) : null;

  const contentStyle = [styles.content, { padding: spacing.lg, paddingBottom: spacing.xxxl }];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.root, { backgroundColor: colors.background }]}>
      {scroll ? (
        <ScrollView contentContainerStyle={contentStyle} keyboardShouldPersistTaps="handled">
          {header}
          {children}
        </ScrollView>
      ) : (
        <View style={[contentStyle, styles.root]}>
          {header}
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { width: '100%', maxWidth: MAX_CONTENT_WIDTH, alignSelf: 'center' },
});
