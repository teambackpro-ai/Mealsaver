import { useTranslation } from 'react-i18next';

import { EmptyState, Screen } from '@/components/ui';

export default function ShoppingScreen() {
  const { t } = useTranslation();
  return (
    <Screen title={t('shopping.title')}>
      <EmptyState icon="cart-outline" title={t('shopping.emptyTitle')} body={t('shopping.emptyBody')} />
    </Screen>
  );
}
