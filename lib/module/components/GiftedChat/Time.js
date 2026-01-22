"use strict";

import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import Color from "./Color.js";
import { TIME_FORMAT } from "./Constant.js";
import { useChatContext } from "./GiftedChatContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
const {
  containerStyle
} = StyleSheet.create({
  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  }
});
const {
  textStyle
} = StyleSheet.create({
  textStyle: {
    fontSize: 10,
    textAlign: 'right'
  }
});
const styles = {
  left: StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: Color.timeTextColor,
      ...textStyle
    }
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: Color.white,
      ...textStyle
    }
  })
};
export function Time({
  position = 'left',
  containerStyle,
  currentMessage,
  timeFormat = TIME_FORMAT,
  timeTextStyle
}) {
  const {
    getLocale
  } = useChatContext();
  if (currentMessage == null) return null;
  return /*#__PURE__*/_jsx(View, {
    style: [styles[position].container, containerStyle?.[position]],
    children: /*#__PURE__*/_jsx(Text, {
      style: [styles[position].text, timeTextStyle?.[position]],
      children: dayjs(currentMessage.createdAt).locale(getLocale()).format(timeFormat)
    })
  });
}
//# sourceMappingURL=Time.js.map