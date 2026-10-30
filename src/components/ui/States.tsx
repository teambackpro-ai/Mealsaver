import type { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppTheme } from '@/theme';

import { AppText } from './AppText';
import { Button } from './Button';
import { Icon, type IconName } from './Icon';

/** Friendly placeholder when there is nothing to show yet. */
export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: IconName;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  const { colors, spacing, radius } = useAppTheme();
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.md }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: radius.pill,
          backgroundColor: colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={icon} size={34} color="primary" />
      </View>
      <AppText variant="title" align="center">
        {title}
      </AppText>
      <AppText color="textMuted" align="center" style={{ maxWidth: 420 }}>
        {body}
      </AppText>
      {action ? <View style={{ marginTop: spacing.sm }}>{action}</View> : null}
    </View>
  );
}

export function LoadingState({ label }: { label?: string }) {
  const { t } = useTranslation();
  const { colors, spacing } = useAppTheme();
  const text = label ?? t('common.loading');
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={text}
      style={{ alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.md }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText color="textMuted">{text}</AppText>
    </View>
  );
}

export function ErrorState({ title, body, onRetry }: { title?: string; body?: string; onRetry?: () => void }) {
  const { t } = useTranslation();
  return (
    <EmptyState
      icon="cloud-offline-outline"
      title={title ?? t('common.errorTitle')}
      body={body ?? t('common.errorBody')}
      action={onRetry ? <Button label={t('common.retry')} variant="secondary" icon="refresh" onPress={onRetry} /> : undefined}
    />
  );
}
