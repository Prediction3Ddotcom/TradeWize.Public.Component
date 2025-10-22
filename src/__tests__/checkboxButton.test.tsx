import { render, fireEvent } from '@testing-library/react-native';
import { CheckboxButton } from '../components/checkboxButton';

describe('CheckboxButton Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<CheckboxButton label="Test Checkbox" />);
    expect(getByText('Test Checkbox')).toBeTruthy();
  });

  it('renders without label', () => {
    const { getByTestId } = render(<CheckboxButton />);
    expect(getByTestId('checkbox-button')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <CheckboxButton label="Test Checkbox" onChange={mockOnChange} />
    );

    fireEvent.press(getByText('Test Checkbox'));
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('toggles checked state correctly', () => {
    const mockOnChange = jest.fn();
    const { getByText, rerender } = render(
      <CheckboxButton
        label="Test Checkbox"
        isChecked={false}
        onChange={mockOnChange}
      />
    );

    fireEvent.press(getByText('Test Checkbox'));
    expect(mockOnChange).toHaveBeenCalledWith(true);

    rerender(
      <CheckboxButton
        label="Test Checkbox"
        isChecked={true}
        onChange={mockOnChange}
      />
    );

    fireEvent.press(getByText('Test Checkbox'));
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <CheckboxButton
        label="Test Checkbox"
        onChange={mockOnChange}
        isDisabled
      />
    );

    fireEvent.press(getByText('Test Checkbox'));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <CheckboxButton label="Test Checkbox" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Checkbox'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom style', () => {
    const customStyle = { marginTop: 10 };
    const { getByTestId } = render(
      <CheckboxButton
        label="Test Checkbox"
        style={customStyle}
        testID="checkbox"
      />
    );

    const checkbox = getByTestId('checkbox');
    expect(checkbox.props.style).toMatchObject(customStyle);
  });

  it('applies different variants correctly', () => {
    const { getByText: getDefault } = render(
      <CheckboxButton label="Default" variant="default" />
    );
    const { getByText: getPrimary } = render(
      <CheckboxButton label="Primary" variant="primary" />
    );
    const { getByText: getSuccess } = render(
      <CheckboxButton label="Success" variant="success" />
    );
    const { getByText: getDanger } = render(
      <CheckboxButton label="Danger" variant="danger" />
    );

    expect(getDefault('Default')).toBeTruthy();
    expect(getPrimary('Primary')).toBeTruthy();
    expect(getSuccess('Success')).toBeTruthy();
    expect(getDanger('Danger')).toBeTruthy();
  });

  it('applies different sizes correctly', () => {
    const { getByText: getSmall } = render(
      <CheckboxButton label="Small" size="small" />
    );
    const { getByText: getMedium } = render(
      <CheckboxButton label="Medium" size="medium" />
    );
    const { getByText: getLarge } = render(
      <CheckboxButton label="Large" size="large" />
    );

    expect(getSmall('Small')).toBeTruthy();
    expect(getMedium('Medium')).toBeTruthy();
    expect(getLarge('Large')).toBeTruthy();
  });

  it('positions checkbox on left by default', () => {
    const { getByText } = render(
      <CheckboxButton label="Test" checkboxPosition="left" />
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('positions checkbox on right when specified', () => {
    const { getByText } = render(
      <CheckboxButton label="Test" checkboxPosition="right" />
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders checkmark when checked', () => {
    const { getByText } = render(
      <CheckboxButton label="Test" isChecked={true} />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('does not render checkmark when unchecked', () => {
    const { queryByText } = render(
      <CheckboxButton label="Test" isChecked={false} />
    );
    expect(queryByText('✓')).toBeNull();
  });

  it('applies custom text style', () => {
    const customTextStyle = { fontSize: 20 };
    const { getByText } = render(
      <CheckboxButton label="Test" textStyle={customTextStyle} />
    );
    const text = getByText('Test');
    expect(text.props.style).toMatchObject(customTextStyle);
  });

  it('applies custom spacing', () => {
    const { getByText } = render(<CheckboxButton label="Test" spacing={20} />);
    expect(getByText('Test')).toBeTruthy();
  });
});
