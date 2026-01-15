"use strict";

import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from "./Utils.js";
import { getMonth } from 'date-fns/getMonth';
import { getYear } from 'date-fns/getYear';
import { jsx as _jsx } from "react/jsx-runtime";
export default function Month(props) {
  const {
    months,
    currentMonth: month,
    selectedMonth,
    currentYear: year,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
    selectedMonthStyle,
    selectedMonthTextStyle
  } = props;
  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[month];
  let monthOutOfRange;
  let monthIsBeforeMin = false;
  let monthIsAfterMax = false;
  let monthIsDisabled = false;

  // Check whether month is outside of min/max range.
  if (maxDate && getYear(maxDate) === year) {
    monthIsAfterMax = month > getMonth(maxDate);
  }
  if (minDate && getYear(minDate) === year) {
    monthIsBeforeMin = month < getMonth(minDate);
  }

  // ToDo: disabledMonths props to disable months separate from disabledDates

  monthOutOfRange = monthIsAfterMax || monthIsBeforeMin || monthIsDisabled;
  const isSelected = selectedMonth !== undefined && selectedMonth === month;
  const onSelect = () => {
    let _year = year;
    if (minDate && year < getYear(minDate)) {
      _year = getYear(minDate);
    }
    if (maxDate && year > getYear(maxDate)) {
      _year = getYear(maxDate);
    }
    onSelectMonth({
      month,
      year: _year
    });
  };
  return /*#__PURE__*/_jsx(View, {
    style: [styles.monthContainer, isSelected && styles.selectedMonthContainer, isSelected && selectedMonthStyle],
    children: !monthOutOfRange ? /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: onSelect,
      children: /*#__PURE__*/_jsx(Text, {
        style: [styles.monthText, textStyle, isSelected && styles.selectedMonthText, isSelected && selectedMonthTextStyle],
        children: monthName
      })
    }) : /*#__PURE__*/_jsx(Text, {
      style: [textStyle, styles.disabledText],
      children: monthName
    })
  });
}
Month.propTypes = {
  styles: PropTypes.shape({}),
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onSelectMonth: PropTypes.func
};
//# sourceMappingURL=Month.js.map