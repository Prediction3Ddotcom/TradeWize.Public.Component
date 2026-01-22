"use strict";

import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from "./Color.js";
import stylesCommon from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: Color.defaultColor,
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.white,
    fontSize: 12
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
      default: -15
    })
  }
});
export function LoadEarlier({
  isLoadingEarlier = false,
  onLoadEarlier = () => {},
  label = 'Load earlier messages',
  containerStyle,
  wrapperStyle,
  textStyle,
  activityIndicatorColor = 'white',
  activityIndicatorSize = 'small',
  activityIndicatorStyle
}) {
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: [styles.container, containerStyle],
    onPress: onLoadEarlier,
    disabled: isLoadingEarlier,
    accessibilityRole: "button",
    children: /*#__PURE__*/_jsx(View, {
      style: [stylesCommon.centerItems, styles.wrapper, wrapperStyle],
      children: isLoadingEarlier ? /*#__PURE__*/_jsxs(View, {
        children: [/*#__PURE__*/_jsx(Text, {
          style: [styles.text, textStyle, {
            opacity: 0
          }],
          children: label
        }), /*#__PURE__*/_jsx(ActivityIndicator, {
          color: activityIndicatorColor,
          size: activityIndicatorSize,
          style: [styles.activityIndicator, activityIndicatorStyle]
        })]
      }) : /*#__PURE__*/_jsx(Text, {
        style: [styles.text, textStyle],
        children: label
      })
    })
  });
}
//# sourceMappingURL=LoadEarlier.js.map