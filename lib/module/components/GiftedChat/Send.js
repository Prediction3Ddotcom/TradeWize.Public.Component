"use strict";

import { useMemo, useCallback } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Color from "./Color.js";
import { TEST_ID } from "./Constant.js";
import { jsx as _jsx } from "react/jsx-runtime";
const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10
  }
});
export const Send = ({
  text,
  containerStyle,
  children,
  alwaysShowSend = false,
  sendButtonProps,
  onSend,
  iconStyle,
  iconSend,
  disableComposer
}) => {
  const handleOnPress = useCallback(() => {
    onSend?.({
      text: text?.trim()
    }, true);
  }, [text, onSend]);
  const showSend = useMemo(() => alwaysShowSend || text && text.trim().length > 0, [alwaysShowSend, text]);
  if (!showSend) return null;
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    testID: TEST_ID.SEND_TOUCHABLE,
    accessible: true,
    accessibilityLabel: "send",
    style: [styles.container, containerStyle, {
      opacity: disableComposer ? 0.5 : 1
    }],
    onPress: handleOnPress,
    disabled: disableComposer,
    ...sendButtonProps,
    children: /*#__PURE__*/_jsx(View, {
      children: children || /*#__PURE__*/_jsx(Image, {
        source: iconSend ? iconSend : require('./assets/send.png'),
        style: [{
          width: 24,
          height: 24
        }, iconStyle],
        tintColor: Color.defaultBlue
      })
    })
  });
};
//# sourceMappingURL=Send.js.map