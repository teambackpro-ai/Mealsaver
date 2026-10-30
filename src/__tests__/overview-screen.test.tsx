import '@/i18n';

import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import OverviewScreen from '@/app/(tabs)/index';

describe('Overview screen', () => {
  it('shows German preview figures with euro formatting and a preview label', async () => {
    await render(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        <OverviewScreen />
      </SafeAreaProvider>,
    );
    expect(screen.getByText('Dein Wochenbudget')).toBeOnTheScreen();
    expect(screen.getByText('Vorschau')).toBeOnTheScreen();
    // 120,00 € budget − 98,40 € estimate = 21,60 € remaining
    expect(screen.getByText('21,60 €')).toBeOnTheScreen();
    expect(screen.getByText('120,00 €')).toBeOnTheScreen();
  });
});
