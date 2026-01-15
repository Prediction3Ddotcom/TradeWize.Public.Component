"use strict";

import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from "./Utils.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Weekdays(props) {
  const {
    styles,
    firstDay,
    currentMonth: month,
    currentYear: year,
    weekdays,
    textStyle,
    dayLabelsWrapper,
    customDayHeaderStyles
  } = props;

  // dayOfWeekNums: ISO week day numbers
  const dayOfWeekNums = Utils.getISOWeekdaysOrder(firstDay);
  let wd = weekdays;
  if (!wd) {
    wd = firstDay ? Utils.getWeekdays(firstDay) : Utils.WEEKDAYS; // English Week days Array
  }
  return /*#__PURE__*/_jsx(View, {
    style: [styles.dayLabelsWrapper, dayLabelsWrapper],
    children: wd.map((day, key) => {
      const dayOfWeekTextStyle = [styles.dayLabels, textStyle];
      let customDayOfWeekStyles = {};
      if (customDayHeaderStyles instanceof Function) {
        const dayOfWeek = dayOfWeekNums[key];
        customDayOfWeekStyles = customDayHeaderStyles({
          dayOfWeek,
          month,
          year
        }) || {};
        dayOfWeekTextStyle.push(customDayOfWeekStyles.textStyle);
      }
      return /*#__PURE__*/_jsx(View, {
        style: customDayOfWeekStyles.style,
        children: /*#__PURE__*/_jsx(Text, {
          style: dayOfWeekTextStyle,
          children: day
        })
      }, key);
    })
  });
}
Weekdays.propTypes = {
  firstDay: PropTypes.number,
  weekdays: PropTypes.array,
  customDayHeaderStyles: PropTypes.func
};
//# sourceMappingURL=Weekdays.js.map