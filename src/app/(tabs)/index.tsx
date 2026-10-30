import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppText, Badge, Button, Card, Icon, Screen, StatTile } from '@/components/ui';
import { ACTIVE_MARKET, APP_NAME } from '@/config/app';
import { divideCents, formatMoney } from '@/domain/money';
import { useAppTheme } from '@/theme';

/**
 * Preview household used only to show the layout until onboarding exists
 * (Phase 3). Clearly marked as "Vorschau" on screen.
 */
const PREVIEW = { people: 4, mealsPerWeek: 21, budgetCents: 12000, estimatedCents: 9840 };

export default function OverviewScreen() {
  const { t } = useTranslation();
  const { spacing } = useAppTheme();
  const money = (cents: number) => formatMoney(cents, ACTIVE_MARKET.locale, ACTIVE_MARKET.currency);
  const remaining = PREVIEW.budgetCents - PREVIEW.estimatedCents;

  return (
    <Screen title={APP_NAME} subtitle={t('overview.subtitle')}>
      <View style={{ gap: spacing.lg }}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <AppText variant="heading">{t('overview.budgetTitle')}</AppText>
            <Badge label={t('common.preview')} tone="estimate" />
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg }}>
            <StatTile label={t('overview.remaining')} value={money(remaining)} emphasis />
            <StatTile label={t('overview.weeklyBudget')} value={money(PREVIEW.budgetCents)} />
          </View>

          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, marginTop: spacing.lg }}>
            <StatTile label={t('overview.estimatedSpend')} value={money(PREVIEW.estimatedCents)} />
            <StatTile label={t('overview.perPerson')} value={money(divideCents(PREVIEW.estimatedCents, PREVIEW.people))} />
            <StatTile label={t('overview.perMeal')} value={money(divideCents(PREVIEW.estimatedCents, PREVIEW.mealsPerWeek))} />
          </View>

          <AppText variant="caption" color="textMuted" style={{ marginTop: spacing.lg }}>
            {t('overview.previewNotice')}
          </AppText>
        </Card>

        <Card tone="primarySoft">
          <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center', marginBottom: spacing.sm }}>
            <Icon name="people" color="primary" />
            <AppText variant="heading">{t('overview.setupTitle')}</AppText>
          </View>
          <AppText color="textMuted" style={{ marginBottom: spacing.lg }}>
            {t('overview.setupBody')}
          </AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, flexWrap: 'wrap' }}>
            <Button label={t('overview.setupButton')} icon="arrow-forward" disabled />
            <Badge label={t('common.comingSoon')} />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
