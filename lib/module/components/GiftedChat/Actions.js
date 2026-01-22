"use strict";

import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from "./Color.js";
import { useChatContext } from "./GiftedChatContext.js";
import stylesCommon from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function Actions({
  options,
  optionTintColor = Color.optionTintColor,
  icon,
  wrapperStyle,
  iconTextStyle,
  onPressActionButton,
  containerStyle
}) {
  const {
    actionSheet
  } = useChatContext();
  const onActionsPress = useCallback(() => {
    if (!options) return;
    const optionKeys = Object.keys(options);
    const cancelButtonIndex = optionKeys.indexOf('Cancel');
    actionSheet().showActionSheetWithOptions({
      options: optionKeys,
      cancelButtonIndex,
      tintColor: optionTintColor
    }, buttonIndex => {
      if (buttonIndex === undefined) return;
      const key = optionKeys[buttonIndex];
      if (key) options[key]?.();
    });
  }, [actionSheet, options, optionTintColor]);
  const renderIcon = useCallback(() => {
    if (icon) return icon();
    return /*#__PURE__*/_jsx(View, {
      style: [stylesCommon.fill, stylesCommon.centerItems, styles.wrapper, wrapperStyle],
      children: /*#__PURE__*/_jsx(Text, {
        style: [styles.iconText, iconTextStyle],
        children: '+'
      })
    });
  }, [icon, iconTextStyle, wrapperStyle]);
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: [styles.container, containerStyle],
    onPress: onPressActionButton || onActionsPress,
    children: renderIcon()
  });
}
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: Color.defaultColor,
    borderWidth: 2
  },
  iconText: {
    color: Color.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
    backgroundColor: Color.backgroundTransparent,
    textAlign: 'center'
  }
});
//# sourceMappingURL=Actions.js.map