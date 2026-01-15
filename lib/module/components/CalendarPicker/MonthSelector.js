"use strict";

// Parent view for Month selector

import { Component } from 'react';
import { View } from 'react-native';
import MonthsGridView from "./MonthsGridView.js";
import MonthsHeader from "./MonthsHeader.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default class MonthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: props.currentYear
    };
  }
  render() {
    const {
      styles,
      textStyle,
      title,
      headingLevel,
      currentYear,
      currentMonth,
      months,
      minDate,
      maxDate,
      onSelectMonth,
      selectedMonthStyle,
      selectedMonthTextStyle
    } = this.props;
    return /*#__PURE__*/_jsxs(View, {
      style: styles.calendar,
      children: [/*#__PURE__*/_jsx(MonthsHeader, {
        styles: styles,
        textStyle: textStyle,
        title: title + currentYear,
        headingLevel: headingLevel
      }), /*#__PURE__*/_jsx(MonthsGridView, {
        styles: styles,
        textStyle: textStyle,
        currentYear: currentYear,
        currentMonth: currentMonth,
        months: months,
        minDate: minDate,
        maxDate: maxDate,
        onSelectMonth: onSelectMonth,
        selectedMonthStyle: selectedMonthStyle,
        selectedMonthTextStyle: selectedMonthTextStyle
      })]
    });
  }
}
//# sourceMappingURL=MonthSelector.js.map