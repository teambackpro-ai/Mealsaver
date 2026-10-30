import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppText, Card, Screen } from '@/components/ui';
import { useAppTheme } from '@/theme';

/**
 * Legal and information pages.
 * IMPORTANT: privacy policy, imprint and terms are PLACEHOLDERS. They must be
 * written and reviewed by a qualified professional before public launch.
 */
export default function LegalScreen() {
  const { t } = useTranslation();
  const { spacing } = useAppTheme();
  const { page } = useLocalSearchParams<{ page: string }>();

  const titles: Record<string, string> = {
    privacy: t('legal.privacyTitle'),
    imprint: t('legal.imprintTitle'),
    terms: t('legal.termsTitle'),
    prices: t('legal.priceInfoTitle'),
  };
  const title = titles[page ?? ''] ?? t('notFound.title');

  return (
    <>
      <Stack.Screen options={{ title }} />
      <Screen>
        <View style={{ gap: spacing.lg }}>
          <AppText variant="title">{title}</AppText>
          {page === 'prices' ? (
            <>
              <AppText>{t('legal.priceInfoBody')}</AppText>
              <AppText color="textMuted">{t('legal.allergenNotice')}</AppText>
            </>
          ) : (
            <Card tone="accentSoft">
              <AppText color="text">{t('legal.draftNotice')}</AppText>
            </Card>
          )}
        </View>
      </Screen>
    </>
  );
}
