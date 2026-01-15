"use strict";

import { View } from 'react-native';
import PropTypes from 'prop-types';
import Year from "./Year.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function YearsGridView(props) {
  const {
    intialYear,
    currentMonth,
    currentYear,
    styles,
    onSelectYear,
    textStyle,
    minDate,
    maxDate
  } = props;
  const guideArray = [0, 1, 2, 3, 4];
  let year = intialYear - 13; // center current year in grid

  function generateColumns() {
    const column = guideArray.map(() => {
      year++;
      return /*#__PURE__*/_jsx(Year, {
        year: year,
        currentMonth: currentMonth,
        currentYear: currentYear,
        styles: styles,
        onSelectYear: onSelectYear,
        minDate: minDate,
        maxDate: maxDate,
        textStyle: textStyle
      }, year);
    });
    return column;
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.yearsWrapper,
    children: guideArray.map(() => /*#__PURE__*/_jsx(View, {
      style: styles.yearsRow,
      children: generateColumns()
    }, year))
  });
}
YearsGridView.propTypes = {
  styles: PropTypes.shape({}),
  intialYear: PropTypes.number.isRequired,
  onSelectYear: PropTypes.func
};
//# sourceMappingURL=YearsGridView.js.map