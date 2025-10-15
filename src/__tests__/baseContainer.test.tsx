import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BaseContainer from '../components/baseContainer';

// Mock useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

describe('BaseContainer', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <BaseContainer>
        <Text>Test Content</Text>
      </BaseContainer>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies default background color', () => {
    const { getByTestId } = render(
      <BaseContainer>
        <View testID="test-view" />
      </BaseContainer>
    );

    const container = getByTestId('test-view').parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#fff' }),
      ])
    );
  });

  it('applies custom background color', () => {
    const customColor = '#123456';
    const { getByTestId } = render(
      <BaseContainer backgroundColor={customColor}>
        <View testID="test-view" />
      </BaseContainer>
    );

    const container = getByTestId('test-view').parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: customColor }),
      ])
    );
  });

  it('applies safe area padding when isPaddingToSafeArea is true', () => {
    const { getByTestId } = render(
      <BaseContainer isPaddingToSafeArea={true}>
        <View testID="test-view" />
      </BaseContainer>
    );

    const container = getByTestId('test-view').parent?.parent;
    expect(container?.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ paddingTop: 44 })])
    );
  });

  it('does not apply safe area padding when isPaddingToSafeArea is false', () => {
    const { getByTestId } = render(
      <BaseContainer isPaddingToSafeArea={false}>
        <View testID="test-view" />
      </BaseContainer>
    );

    const container = getByTestId('test-view').parent?.parent;
    const styles = container?.props.style;
    const hasPaddingTop = styles?.some(
      (style: any) => style?.paddingTop === 44
    );
    expect(hasPaddingTop).toBeFalsy();
  });

  it('applies custom style prop', () => {
    const customStyle = { padding: 20 };
    const { getByTestId } = render(
      <BaseContainer style={customStyle}>
        <View testID="test-view" />
      </BaseContainer>
    );

    const content = getByTestId('test-view').parent;
    expect(content?.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ padding: 20 })])
    );
  });

  it('renders with light-content status bar style', () => {
    const { UNSAFE_root } = render(
      <BaseContainer statusBarStyle="light-content">
        <Text>Content</Text>
      </BaseContainer>
    );

    const statusBar = UNSAFE_root.findAllByType(
      require('react-native').StatusBar
    )[0];
    expect(statusBar?.props.barStyle).toBe('light-content');
  });

  it('renders with dark-content status bar style by default', () => {
    const { UNSAFE_root } = render(
      <BaseContainer>
        <Text>Content</Text>
      </BaseContainer>
    );

    const statusBar = UNSAFE_root.findAllByType(
      require('react-native').StatusBar
    )[0];
    expect(statusBar?.props.barStyle).toBe('dark-content');
  });

  it('renders multiple children', () => {
    const { getByText } = render(
      <BaseContainer>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </BaseContainer>
    );

    expect(getByText('First Child')).toBeTruthy();
    expect(getByText('Second Child')).toBeTruthy();
  });
});
