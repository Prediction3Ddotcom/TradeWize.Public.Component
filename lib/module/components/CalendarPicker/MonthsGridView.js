"use strict";

import { View } from 'react-native';
import PropTypes from 'prop-types';
import Month from "./Month.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function MonthsGridView(props) {
  const {
    currentYear,
    currentMonth,
    months,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
    selectedMonthStyle,
    selectedMonthTextStyle
  } = props;
  const _months = Array.from(Array(12).keys());
  const columnArray = [0, 1, 2];
  const rowArray = [0, 1, 2, 3];
  function generateColumns() {
    const column = columnArray.map(index => {
      const monthIndex = _months.shift();
      return /*#__PURE__*/_jsx(Month, {
        currentMonth: monthIndex,
        selectedMonth: currentMonth,
        currentYear: currentYear,
        months: months,
        styles: styles,
        onSelectMonth: onSelectMonth,
        minDate: minDate,
        maxDate: maxDate,
        textStyle: textStyle,
        selectedMonthStyle: selectedMonthStyle,
        selectedMonthTextStyle: selectedMonthTextStyle
      }, monthIndex !== undefined ? monthIndex + index : index);
    });
    return column;
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.monthsWrapper,
    children: rowArray.map(index => /*#__PURE__*/_jsx(View, {
      style: styles.monthsRow,
      children: generateColumns()
    }, index))
  });
}
MonthsGridView.propTypes = {
  styles: PropTypes.shape({}),
  currentYear: PropTypes.number.isRequired,
  months: PropTypes.array,
  onSelectMonth: PropTypes.func
};
//# sourceMappingURL=MonthsGridView.js.map