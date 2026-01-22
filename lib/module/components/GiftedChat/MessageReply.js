"use strict";

import { StyleSheet, View } from 'react-native';
import Color from "./Color.js";
import { MessageFile } from "./MessageFile.js";
import { MessageText } from "./MessageText.js";
import { SCREEN_WIDTH } from 'tradewize-component';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MessageReply({
  messageReply,
  onPressFile,
  onSaveThumbnail
}) {
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [messageReply?.file?.length && /*#__PURE__*/_jsx(MessageFile, {
      onPressFile: onPressFile,
      onSaveThumbnail: onSaveThumbnail,
      currentMessage: messageReply,
      messageWidth: {
        width: SCREEN_WIDTH * 0.9,
        _id: '1'
      }
    }), !messageReply?.text && /*#__PURE__*/_jsx(View, {
      style: styles.space
    }), messageReply?.text && /*#__PURE__*/_jsx(MessageText, {
      currentMessage: messageReply,
      position: "left",
      customTextStyle: {
        color: Color.black
      }
    }), /*#__PURE__*/_jsx(View, {
      style: styles.space
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    minWidth: SCREEN_WIDTH * 0.12,
    borderRadius: 8,
    marginBottom: -4,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)'
  },
  space: {
    height: 4
  }
});
//# sourceMappingURL=MessageReply.js.map