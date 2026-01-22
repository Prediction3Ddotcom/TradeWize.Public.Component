"use strict";

import { useMemo } from 'react';
import { Text, View } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import { DATE_FORMAT } from "../Constant.js";
import { useChatContext } from "../GiftedChatContext.js";
import stylesCommon from "../styles.js";
import styles from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export * from "./types.js";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
export function Day({
  dateFormat = DATE_FORMAT,
  dateFormatCalendar,
  createdAt,
  containerStyle,
  wrapperStyle,
  textStyle
}) {
  const {
    getLocale
  } = useChatContext();
  const dateStr = useMemo(() => {
    if (createdAt == null) return null;
    const now = dayjs().startOf('day');
    const date = dayjs(createdAt).locale(getLocale()).startOf('day');
    if (!now.isSame(date, 'year')) return date.format('D MMMM YYYY');
    if (now.diff(date, 'days') < 1) return date.calendar(now, {
      sameDay: '[Today]',
      ...dateFormatCalendar
    });
    return date.format(dateFormat);
  }, [createdAt, dateFormat, getLocale, dateFormatCalendar]);
  if (!dateStr) return null;
  return /*#__PURE__*/_jsx(View, {
    style: [stylesCommon.centerItems, styles.container, containerStyle],
    children: /*#__PURE__*/_jsx(View, {
      style: [styles.wrapper, wrapperStyle],
      children: /*#__PURE__*/_jsx(Text, {
        style: [styles.text, textStyle],
        children: dateStr
      })
    })
  });
}
//# sourceMappingURL=index.js.map