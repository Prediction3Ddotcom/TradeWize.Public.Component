import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import HeaderBase, { type HeaderAction } from '../components/header';

describe('HeaderBase', () => {
  it('renders with title string', () => {
    const { getByText } = render(<HeaderBase title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders with custom title component', () => {
    const CustomTitle = () => <Text>Custom Component Title</Text>;
    const { getByText } = render(<HeaderBase title={<CustomTitle />} />);
    expect(getByText('Custom Component Title')).toBeTruthy();
  });

  it('applies default height of 56', () => {
    const { getByText } = render(<HeaderBase title="Test" />);
    // Header should have default height
    const title = getByText('Test');
    const container = title.parent?.parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ height: 56 })])
    );
  });

  it('applies custom height', () => {
    const customHeight = 80;
    const { getByText } = render(
      <HeaderBase title="Test" height={customHeight} />
    );
    const title = getByText('Test');
    const container = title.parent?.parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ height: 80 })])
    );
  });

  it('applies custom background color', () => {
    const customColor = '#ff0000';
    const { getByText } = render(
      <HeaderBase title="Test" backgroundColor={customColor} />
    );
    const title = getByText('Test');
    const container = title.parent?.parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: customColor }),
      ])
    );
  });

  it('renders default back button when showDefaultLeft is true', () => {
    const onPressBack = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <HeaderBase
        title="Test"
        showDefaultLeft={true}
        onPressBack={onPressBack}
      />
    );

    // Should have default back button image
    const images = UNSAFE_getAllByType(require('react-native').Image);
    expect(images.length).toBeGreaterThan(0);
  });

  it('does not render default back button when showDefaultLeft is false', () => {
    const { UNSAFE_queryAllByType } = render(
      <HeaderBase title="Test" showDefaultLeft={false} />
    );

    // Should not have any images (no default back button)
    const images = UNSAFE_queryAllByType(require('react-native').Image);
    expect(images.length).toBe(0);
  });

  it('calls onPressBack when back button is pressed', () => {
    const onPressBack = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <HeaderBase
        title="Test"
        showDefaultLeft={true}
        onPressBack={onPressBack}
      />
    );

    const buttons = UNSAFE_getAllByType(require('../components/button').Button);
    const backButton = buttons[0];
    fireEvent.press(backButton);

    expect(onPressBack).toHaveBeenCalledTimes(1);
  });

  it('renders left actions when provided', () => {
    const onPress = jest.fn();
    const leftActions: HeaderAction[] = [
      {
        label: 'Cancel',
        onPress,
      },
    ];

    const { getByText } = render(
      <HeaderBase title="Test" leftActions={leftActions} />
    );

    expect(getByText('Cancel')).toBeTruthy();
  });

  it('renders right actions when provided', () => {
    const onPress = jest.fn();
    const rightActions: HeaderAction[] = [
      {
        label: 'Done',
        onPress,
      },
    ];

    const { getByText } = render(
      <HeaderBase title="Test" rightActions={rightActions} />
    );

    expect(getByText('Done')).toBeTruthy();
  });

  it('calls onPress when left action is pressed', () => {
    const onPress = jest.fn();
    const leftActions: HeaderAction[] = [
      {
        label: 'Cancel',
        onPress,
      },
    ];

    const { getByText } = render(
      <HeaderBase title="Test" leftActions={leftActions} />
    );

    fireEvent.press(getByText('Cancel'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('calls onPress when right action is pressed', () => {
    const onPress = jest.fn();
    const rightActions: HeaderAction[] = [
      {
        label: 'Done',
        onPress,
      },
    ];

    const { getByText } = render(
      <HeaderBase title="Test" rightActions={rightActions} />
    );

    fireEvent.press(getByText('Done'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders multiple left and right actions', () => {
    const leftActions: HeaderAction[] = [
      { label: 'Action1', onPress: jest.fn() },
      { label: 'Action2', onPress: jest.fn() },
    ];

    const rightActions: HeaderAction[] = [
      { label: 'Action3', onPress: jest.fn() },
      { label: 'Action4', onPress: jest.fn() },
    ];

    const { getByText } = render(
      <HeaderBase
        title="Test"
        leftActions={leftActions}
        rightActions={rightActions}
      />
    );

    expect(getByText('Action1')).toBeTruthy();
    expect(getByText('Action2')).toBeTruthy();
    expect(getByText('Action3')).toBeTruthy();
    expect(getByText('Action4')).toBeTruthy();
  });

  it('renders icon in action', () => {
    const IconComponent = () => <Text>🔍</Text>;
    const leftActions: HeaderAction[] = [
      {
        icon: <IconComponent />,
        onPress: jest.fn(),
      },
    ];

    const { getByText } = render(
      <HeaderBase title="Test" leftActions={leftActions} />
    );

    expect(getByText('🔍')).toBeTruthy();
  });

  it('applies border when border prop is true', () => {
    const { getByText } = render(<HeaderBase title="Test" border={true} />);

    const title = getByText('Test');
    const container = title.parent?.parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderBottomWidth: expect.any(Number) }),
      ])
    );
  });

  it('aligns title to center by default', () => {
    const { getByText } = render(<HeaderBase title="Test Title" />);
    const title = getByText('Test Title');
    const titleContainer = title.parent;

    expect(titleContainer?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ alignItems: 'center' }),
      ])
    );
  });

  it('aligns title to left when titleAlign is left', () => {
    const { getByText } = render(
      <HeaderBase title="Test Title" titleAlign="left" />
    );
    const title = getByText('Test Title');
    const titleContainer = title.parent;

    expect(titleContainer?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ alignItems: 'flex-start' }),
      ])
    );
  });

  it('aligns title to right when titleAlign is right', () => {
    const { getByText } = render(
      <HeaderBase title="Test Title" titleAlign="right" />
    );
    const title = getByText('Test Title');
    const titleContainer = title.parent;

    expect(titleContainer?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ alignItems: 'flex-end' }),
      ])
    );
  });

  it('renders custom content when renderCustomContent is provided', () => {
    const CustomContent = () => <Text>Custom Header Content</Text>;
    const { getByText, queryByText } = render(
      <HeaderBase title="Test" renderCustomContent={CustomContent} />
    );

    expect(getByText('Custom Header Content')).toBeTruthy();
    // Title should not be rendered when custom content is provided
    expect(queryByText('Test')).toBeNull();
  });

  it('applies custom containerStyle', () => {
    const customStyle = { paddingHorizontal: 20 };
    const { getByText } = render(
      <HeaderBase title="Test" containerStyle={customStyle} />
    );

    const title = getByText('Test');
    const container = title.parent?.parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ paddingHorizontal: 20 }),
      ])
    );
  });

  it('applies custom titleStyle', () => {
    const customStyle = { fontSize: 24, color: 'red' };
    const { getByText } = render(
      <HeaderBase title="Test Title" titleStyle={customStyle} />
    );

    const title = getByText('Test Title');
    expect(title.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 24, color: 'red' }),
      ])
    );
  });

  it('applies custom styleButtonLeft', () => {
    const customStyle = { paddingLeft: 10 };
    const onPressBack = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <HeaderBase
        title="Test"
        styleButtonLeft={customStyle}
        onPressBack={onPressBack}
      />
    );

    const buttons = UNSAFE_getAllByType(require('../components/button').Button);
    const backButton = buttons[0];

    expect(backButton.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ paddingLeft: 10 })])
    );
  });

  it('filters out invisible left actions', () => {
    const leftActions: any[] = [
      { label: 'Visible', onPress: jest.fn(), visible: true },
      { label: 'Hidden', onPress: jest.fn(), visible: false },
      { label: 'AlsoVisible', onPress: jest.fn() },
    ];

    const { getByText, queryByText } = render(
      <HeaderBase title="Test" leftActions={leftActions} />
    );

    expect(getByText('Visible')).toBeTruthy();
    expect(getByText('AlsoVisible')).toBeTruthy();
    expect(queryByText('Hidden')).toBeNull();
  });

  it('truncates long title with numberOfLines', () => {
    const longTitle = 'This is a very long title that should be truncated';
    const { getByText } = render(<HeaderBase title={longTitle} />);

    const titleElement = getByText(longTitle);
    expect(titleElement.props.numberOfLines).toBe(1);
  });
});
