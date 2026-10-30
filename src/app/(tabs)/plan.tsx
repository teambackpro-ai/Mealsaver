import { useTranslation } from 'react-i18next';

import { Button, EmptyState, Screen } from '@/components/ui';
import { formatWeekRange } from '@/domain/dates';
import { ACTIVE_MARKET } from '@/config/app';

export default function PlanScreen() {
  const { t } = useTranslation();
  const range = formatWeekRange(new Date(), ACTIVE_MARKET.locale);

  return (
    <Screen title={t('plan.title')} subtitle={t('plan.week', { range })}>
      <EmptyState
        icon="calendar-outline"
        title={t('plan.emptyTitle')}
        body={t('plan.emptyBody')}
        action={<Button label={`${t('plan.generate')} · ${t('common.comingSoon')}`} icon="sparkles-outline" disabled />}
      />
    </Screen>
  );
}
