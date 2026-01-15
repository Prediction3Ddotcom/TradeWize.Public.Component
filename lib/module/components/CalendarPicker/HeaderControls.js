"use strict";

import { View, Text, Platform, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from "./Utils.js";
import Controls from "./Controls.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function HeaderControls(props) {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    onPressMonth,
    onPressYear,
    months,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    monthTitleStyle,
    yearTitleStyle,
    textStyle,
    restrictMonthNavigation,
    maxDate,
    minDate,
    headingLevel,
    monthYearHeaderWrapperStyle,
    headerWrapperStyle
  } = props;
  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[currentMonth];
  const year = currentYear;
  const disablePreviousMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(minDate, currentMonth, currentYear);
  const disableNextMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(maxDate, currentMonth, currentYear);
  const accessibilityProps = {
    accessibilityRole: 'header'
  };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.headerWrapper, headerWrapperStyle],
    children: [/*#__PURE__*/_jsx(Controls, {
      disabled: disablePreviousMonth,
      label: previousTitle,
      component: previousComponent,
      onPressControl: onPressPrevious,
      styles: styles.previousContainer,
      textStyles: [styles.navButtonText, textStyle, previousTitleStyle]
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.monthYearHeaderWrapper, monthYearHeaderWrapperStyle],
      children: [/*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: onPressMonth,
        children: /*#__PURE__*/_jsx(Text, {
          style: [styles.monthHeaderMainText, textStyle, monthTitleStyle],
          ...accessibilityProps,
          children: monthName
        })
      }), /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: onPressYear,
        children: /*#__PURE__*/_jsx(Text, {
          style: [styles.yearHeaderMainText, textStyle, yearTitleStyle],
          children: year
        })
      })]
    }), /*#__PURE__*/_jsx(Controls, {
      disabled: disableNextMonth,
      label: nextTitle,
      component: nextComponent,
      onPressControl: onPressNext,
      styles: styles.nextContainer,
      textStyles: [styles.navButtonText, textStyle, nextTitleStyle]
    })]
  });
}
HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  onPressMonth: PropTypes.func,
  onPressYear: PropTypes.func
};
//# sourceMappingURL=HeaderControls.js.map