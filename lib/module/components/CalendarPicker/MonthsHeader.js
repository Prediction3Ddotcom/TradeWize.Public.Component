"use strict";

import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { stylePropType } from "./localPropTypes.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function MonthsHeader(props) {
  const {
    styles,
    textStyle,
    headingLevel,
    title
  } = props;
  const accessibilityProps = {
    accessibilityRole: 'header'
  };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.headerWrapper,
    children: /*#__PURE__*/_jsx(Text, {
      style: [styles.monthsHeaderText, textStyle],
      children: title
    })
  });
}
MonthsHeader.propTypes = {
  styles: stylePropType,
  textStyle: stylePropType,
  title: PropTypes.string
};
//# sourceMappingURL=MonthsHeader.js.map