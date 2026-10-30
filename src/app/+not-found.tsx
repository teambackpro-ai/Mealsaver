import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Button, EmptyState, Screen } from '@/components/ui';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <EmptyState
        icon="help-circle-outline"
        title={t('notFound.title')}
        body={t('notFound.body')}
        action={<Button label={t('notFound.home')} onPress={() => router.replace('/')} />}
      />
    </Screen>
  );
}
