import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppText, ListGroup, ListRow, Screen } from '@/components/ui';
import { APP_VERSION } from '@/config/app';
import { checkSupabaseConnection, type ConnectionStatus } from '@/services/supabase';
import { useAppTheme } from '@/theme';

type LegalPage = 'privacy' | 'imprint' | 'terms' | 'prices';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { spacing } = useAppTheme();
  const openLegal = (page: LegalPage) => router.push({ pathname: '/legal/[page]', params: { page } });

  return (
    <Screen title={t('profile.title')}>
      <View style={{ gap: spacing.xl }}>
        <ListGroup title={t('profile.sectionAccount')}>
          <ListRow icon="log-in-outline" label={t('profile.signIn')} value={t('common.comingSoon')} disabled />
        </ListGroup>

        <ListGroup title={t('profile.sectionHousehold')}>
          <ListRow icon="people-outline" label={t('profile.household')} value={t('common.comingSoon')} disabled />
          <ListRow icon="leaf-outline" label={t('profile.preferences')} value={t('common.comingSoon')} disabled />
          <ListRow icon="storefront-outline" label={t('profile.supermarkets')} value={t('common.comingSoon')} disabled />
        </ListGroup>

        <ListGroup title={t('profile.sectionInfo')}>
          <ListRow icon="pricetag-outline" label={t('profile.priceInfo')} onPress={() => openLegal('prices')} />
          <ListRow icon="shield-checkmark-outline" label={t('profile.privacy')} onPress={() => openLegal('privacy')} />
          <ListRow icon="document-text-outline" label={t('profile.terms')} onPress={() => openLegal('terms')} />
          <ListRow icon="business-outline" label={t('profile.imprint')} onPress={() => openLegal('imprint')} />
        </ListGroup>

        {__DEV__ ? <DeveloperInfo /> : null}

        <AppText variant="caption" color="textMuted" align="center">
          {t('profile.version', { version: APP_VERSION })}
        </AppText>
      </View>
    </Screen>
  );
}

/** Only visible while developing: shows whether the database is reachable. */
function DeveloperInfo() {
  const { t } = useTranslation();
  const { data, isPending } = useQuery<ConnectionStatus>({
    queryKey: ['supabase-health'],
    queryFn: () => checkSupabaseConnection(),
    retry: false,
  });

  const label = isPending
    ? t('profile.statusChecking')
    : {
        connected: t('profile.statusConnected'),
        not_configured: t('profile.statusNotConfigured'),
        unreachable: t('profile.statusUnreachable'),
      }[data ?? 'unreachable'];

  return (
    <ListGroup title={t('profile.sectionDeveloper')}>
      <ListRow icon="server-outline" label={t('profile.supabaseStatus')} value={label} />
    </ListGroup>
  );
}
