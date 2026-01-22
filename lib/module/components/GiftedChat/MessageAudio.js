"use strict";

import Color from "./Color.js";
import { View, Text } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MessageAudio() {
  return /*#__PURE__*/_jsxs(View, {
    style: {
      padding: 20
    },
    children: [/*#__PURE__*/_jsx(Text, {
      style: {
        color: Color.alizarin,
        fontWeight: '600'
      },
      children: 'Audio is not implemented by GiftedChat.'
    }), /*#__PURE__*/_jsx(Text, {
      style: {
        color: Color.alizarin,
        fontWeight: '600'
      },
      children: '\nYou need to provide your own implementation by using renderMessageAudio prop.'
    })]
  });
}
//# sourceMappingURL=MessageAudio.js.map