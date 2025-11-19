import React, { type ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  type ViewStyle,
  type StyleProp,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BaseContainerProps {
  children: ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  statusBarStyle?: 'light-content' | 'dark-content';
  isPaddingToSafeArea?: boolean;
  backgroundStatusBarColor?: string;
  backgroundBottomSafeAreaColor?: string;
}

const BaseContainer: React.FC<BaseContainerProps> = ({
  children,
  backgroundColor = '#fff',
  style,
  statusBarStyle = 'dark-content',
  isPaddingToSafeArea = true,
  backgroundStatusBarColor,
  backgroundBottomSafeAreaColor,
}) => {
  const insets = useSafeAreaInsets();

  const getPaddingBottom = () =>
    insets.bottom + (Platform.OS === 'ios' ? 0 : 8);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        isPaddingToSafeArea && { paddingTop: insets.top },
      ]}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundStatusBarColor}
      />
      <View style={[styles.content, style]}>
        {children}
        {isPaddingToSafeArea && (
          <View
            style={[
              styles.footerContainer,
              {
                height: getPaddingBottom(),
                backgroundColor: backgroundBottomSafeAreaColor
                  ? backgroundBottomSafeAreaColor
                  : backgroundColor,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footerContainer: {
    marginTop: 'auto',
  },
});

export default BaseContainer;
