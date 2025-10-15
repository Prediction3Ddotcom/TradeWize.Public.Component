import React, { type ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BaseContainerProps {
  children: ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  statusBarStyle?: 'light-content' | 'dark-content';
  isPaddingToSafeArea?: boolean;
}

const BaseContainer: React.FC<BaseContainerProps> = ({
  children,
  backgroundColor = '#fff',
  style,
  statusBarStyle = 'dark-content',
  isPaddingToSafeArea = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        isPaddingToSafeArea && { paddingTop: insets.top },
      ]}
    >
      <StatusBar barStyle={statusBarStyle} />
      <View style={[styles.content, style]}>
        {children}
        {isPaddingToSafeArea && (
          <View style={{ height: insets.bottom, backgroundColor }} />
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
});

export default BaseContainer;
