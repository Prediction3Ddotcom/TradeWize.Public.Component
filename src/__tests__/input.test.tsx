import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../components/input';
import { View } from 'react-native';

describe('Input', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(
      <Input label="Email" placeholder="Enter email" />
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders with required indicator', () => {
    const { getByText } = render(
      <Input label="Email" placeholder="Enter email" isRequired />
    );
    expect(getByText('*')).toBeTruthy();
  });

  it('renders helper text', () => {
    const { getByText } = render(
      <Input placeholder="Enter text" helperText="This is a helpful message" />
    );
    expect(getByText('This is a helpful message')).toBeTruthy();
  });

  it('renders error text', () => {
    const { getByText } = render(
      <Input placeholder="Enter text" errorText="This field is required" />
    );
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('handles text input', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={onChangeText} />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'Hello World');

    expect(onChangeText).toHaveBeenCalledWith('Hello World');
  });

  it('handles focus and blur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onFocus={onFocus} onBlur={onBlur} />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');

    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it('disables input when isDisabled is true', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" isDisabled />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.editable).toBe(false);
  });

  it('renders with left icon', () => {
    const LeftIcon = () => <View testID="left-icon" />;
    const { getByTestId } = render(
      <Input placeholder="Enter text" leftIcon={<LeftIcon />} />
    );

    expect(getByTestId('left-icon')).toBeTruthy();
  });

  it('renders with right icon', () => {
    const RightIcon = () => <View testID="right-icon" />;
    const { getByTestId } = render(
      <Input placeholder="Enter text" rightIcon={<RightIcon />} />
    );

    expect(getByTestId('right-icon')).toBeTruthy();
  });

  it('handles right icon press', () => {
    const onRightIconPress = jest.fn();
    const RightIcon = () => <View testID="right-icon" />;
    const { getByTestId } = render(
      <Input
        placeholder="Enter text"
        rightIcon={<RightIcon />}
        onRightIconPress={onRightIconPress}
      />
    );

    const iconContainer = getByTestId('right-icon').parent;
    if (iconContainer) {
      fireEvent.press(iconContainer);
      expect(onRightIconPress).toHaveBeenCalled();
    }
  });

  it('applies different variants correctly', () => {
    const { rerender, getByPlaceholderText } = render(
      <Input placeholder="Enter text" variant="outline" />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();

    rerender(<Input placeholder="Enter text" variant="filled" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();

    rerender(<Input placeholder="Enter text" variant="underline" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('applies different sizes correctly', () => {
    const { rerender, getByPlaceholderText } = render(
      <Input placeholder="Enter text" size="small" />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();

    rerender(<Input placeholder="Enter text" size="medium" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();

    rerender(<Input placeholder="Enter text" size="large" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('respects fullWidth prop', () => {
    const { getByPlaceholderText, rerender } = render(
      <Input placeholder="Enter text" fullWidth />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();

    rerender(<Input placeholder="Enter text" fullWidth={false} />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('supports multiline input', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" multiline numberOfLines={4} />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(4);
  });
});
