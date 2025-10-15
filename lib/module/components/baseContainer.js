"use strict";

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BaseContainer = ({
  children,
  backgroundColor = '#fff',
  style,
  statusBarStyle = 'dark-content',
  isPaddingToSafeArea = true
}) => {
  const insets = useSafeAreaInsets();
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, {
      backgroundColor
    }, isPaddingToSafeArea && {
      paddingTop: insets.top
    }],
    children: [/*#__PURE__*/_jsx(StatusBar, {
      barStyle: statusBarStyle
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.content, style],
      children: [children, isPaddingToSafeArea && /*#__PURE__*/_jsx(View, {
        style: {
          height: insets.bottom,
          backgroundColor
        }
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
});
export default BaseContainer;
//# sourceMappingURL=baseContainer.js.map