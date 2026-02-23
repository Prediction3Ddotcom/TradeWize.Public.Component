"use strict";

import { View, Text, Platform } from 'react-native';
import Controls from "./Controls.js";
import { getYear } from 'date-fns/getYear';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function YearsHeader(props) {
  const {
    startYear,
    endYear,
    maxDate,
    minDate,
    restrictNavigation,
    styles,
    textStyle,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    onYearViewPrevious,
    onYearViewNext,
    headingLevel
  } = props;
  const disablePrevious = !!(restrictNavigation && minDate && getYear(minDate) >= startYear);
  const disableNext = !!(restrictNavigation && maxDate && getYear(maxDate) <= endYear);
  const accessibilityProps = {
    accessibilityRole: 'header'
  };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }
  return /*#__PURE__*/_jsxs(View, {
    style: styles.headerWrapper,
    children: [/*#__PURE__*/_jsx(Controls, {
      disabled: disablePrevious,
      label: previousTitle,
      component: previousComponent,
      onPressControl: onYearViewPrevious,
      styles: styles.previousContainer,
      textStyles: [styles.navButtonText, textStyle, previousTitleStyle]
    }), /*#__PURE__*/_jsx(Text, {
      style: [styles.yearsHeaderText, textStyle],
      ...accessibilityProps,
      children: `${startYear} – ${endYear}`
    }), /*#__PURE__*/_jsx(Controls, {
      disabled: disableNext,
      label: nextTitle,
      component: nextComponent,
      onPressControl: onYearViewNext,
      styles: styles.nextContainer,
      textStyles: [styles.navButtonText, textStyle, nextTitleStyle]
    })]
  });
}
//# sourceMappingURL=YearsHeader.js.map