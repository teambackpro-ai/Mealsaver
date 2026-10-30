import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('shows its label and reacts to taps', async () => {
    const onPress = jest.fn();
    await render(<Button label="Speichern" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Speichern' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does nothing when disabled and tells screen readers', async () => {
    const onPress = jest.fn();
    await render(<Button label="Speichern" onPress={onPress} disabled />);
    const button = screen.getByRole('button', { name: 'Speichern' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('is marked busy while loading', async () => {
    await render(<Button label="Speichern" loading />);
    expect(screen.getByRole('button', { name: 'Speichern' })).toBeBusy();
  });
});
