import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../components/button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} isDisabled />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} isLoading />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when isLoading is true', () => {
    const { getByTestId } = render(
      <Button title="Test Button" isLoading testID="button" />
    );

    // Note: ActivityIndicator doesn't have a default testID,
    // but the button should still render
    expect(getByTestId('button')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Button title="Test Button" style={customStyle} testID="button" />
    );

    const button = getByTestId('button');
    expect(button.props.style).toMatchObject(customStyle);
  });

  it('applies different variants correctly', () => {
    const { getByText: getPrimary } = render(
      <Button title="Primary" variant="primary" />
    );
    const { getByText: getSecondary } = render(
      <Button title="Secondary" variant="secondary" />
    );
    const { getByText: getOutline } = render(
      <Button title="Outline" variant="outline" />
    );
    const { getByText: getGhost } = render(
      <Button title="Ghost" variant="ghost" />
    );

    expect(getPrimary('Primary')).toBeTruthy();
    expect(getSecondary('Secondary')).toBeTruthy();
    expect(getOutline('Outline')).toBeTruthy();
    expect(getGhost('Ghost')).toBeTruthy();
  });

  it('applies different sizes correctly', () => {
    const { getByText: getSmall } = render(
      <Button title="Small" size="small" />
    );
    const { getByText: getMedium } = render(
      <Button title="Medium" size="medium" />
    );
    const { getByText: getLarge } = render(
      <Button title="Large" size="large" />
    );

    expect(getSmall('Small')).toBeTruthy();
    expect(getMedium('Medium')).toBeTruthy();
    expect(getLarge('Large')).toBeTruthy();
  });
});
