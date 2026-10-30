import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Badge, EmptyState, Screen } from '@/components/ui';
import { useAppTheme } from '@/theme';

const FILTERS = ['vegetarian', 'quick', 'kidFriendly', 'highProtein', 'budget'] as const;

export default function RecipesScreen() {
  const { t } = useTranslation();
  const { spacing } = useAppTheme();

  return (
    <Screen title={t('recipes.title')} subtitle={t('recipes.subtitle')}>
      <View
        accessibilityLabel={FILTERS.map((f) => t(`recipes.filters.${f}`)).join(', ')}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {FILTERS.map((filter) => (
          <Badge key={filter} label={t(`recipes.filters.${filter}`)} tone="success" />
        ))}
      </View>
      <EmptyState icon="restaurant-outline" title={t('recipes.emptyTitle')} body={t('recipes.emptyBody')} />
    </Screen>
  );
}
