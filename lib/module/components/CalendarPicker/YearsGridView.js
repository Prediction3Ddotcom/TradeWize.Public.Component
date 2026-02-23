"use strict";

import { View } from 'react-native';
import Year from "./Year.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function YearsGridView(props) {
  const {
    startYear,
    yearsPerPage,
    currentMonth,
    currentYear,
    styles,
    onSelectYear,
    textStyle,
    minDate,
    maxDate,
    selectedYearStyle,
    selectedYearTextStyle
  } = props;
  const columns = 3;
  const rows = Math.ceil(yearsPerPage / columns);
  const grid = [];
  let year = startYear;
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < columns; c++) {
      if (year < startYear + yearsPerPage) {
        row.push(year);
        year++;
      }
    }
    grid.push(row);
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.yearsWrapper,
    children: grid.map((rowYears, rowIndex) => /*#__PURE__*/_jsx(View, {
      style: styles.yearsRow,
      children: rowYears.map(y => /*#__PURE__*/_jsx(Year, {
        year: y,
        currentMonth: currentMonth,
        currentYear: currentYear,
        styles: styles,
        onSelectYear: onSelectYear,
        minDate: minDate,
        maxDate: maxDate,
        textStyle: textStyle,
        selectedYearStyle: selectedYearStyle,
        selectedYearTextStyle: selectedYearTextStyle
      }, y))
    }, `year-row-${rowIndex}`))
  });
}
//# sourceMappingURL=YearsGridView.js.map