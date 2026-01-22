"use strict";

import { StyleSheet, Text, View } from 'react-native';
import Color from "./Color.js";
import stylesCommon from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '300'
  }
});
export function SystemMessage({
  currentMessage,
  containerStyle,
  wrapperStyle,
  textStyle,
  children
}) {
  if (currentMessage == null || currentMessage.system === false) return null;
  return /*#__PURE__*/_jsx(View, {
    style: [stylesCommon.fill, stylesCommon.centerItems, styles.container, containerStyle],
    children: /*#__PURE__*/_jsxs(View, {
      style: wrapperStyle,
      children: [!!currentMessage.text && /*#__PURE__*/_jsx(Text, {
        style: [styles.text, textStyle],
        children: currentMessage.text
      }), children]
    })
  });
}
//# sourceMappingURL=SystemMessage.js.map