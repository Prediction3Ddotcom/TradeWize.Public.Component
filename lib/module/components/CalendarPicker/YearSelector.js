"use strict";

// Parent view for Year selector

import { Component } from 'react';
import { View } from 'react-native';
import YearsGridView from "./YearsGridView.js";
import YearsHeader from "./YearsHeader.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default class YearSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialYear: props.currentYear
    };
  }
  handleOnYearViewPrevious = () => {
    this.setState({
      initialYear: parseInt(Math.max(this.state.initialYear - 25, 0).toString(), 10)
    });
  };
  handleOnYearViewNext = () => {
    this.setState({
      initialYear: parseInt(this.state.initialYear + 25, 10)
    });
  };
  render() {
    const {
      styles,
      textStyle,
      title,
      initialDate,
      currentMonth,
      currentYear,
      minDate,
      maxDate,
      restrictNavigation,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      headingLevel,
      onSelectYear
    } = this.props;
    return /*#__PURE__*/_jsxs(View, {
      style: styles.calendar,
      children: [/*#__PURE__*/_jsx(YearsHeader, {
        styles: styles,
        textStyle: textStyle,
        title: title,
        headingLevel: headingLevel,
        initialDate: initialDate,
        minDate: minDate,
        maxDate: maxDate,
        restrictNavigation: restrictNavigation,
        year: this.state.initialYear,
        previousComponent: previousComponent,
        nextComponent: nextComponent,
        previousTitle: previousTitle,
        nextTitle: nextTitle,
        previousTitleStyle: previousTitleStyle,
        nextTitleStyle: nextTitleStyle,
        onYearViewPrevious: this.handleOnYearViewPrevious,
        onYearViewNext: this.handleOnYearViewNext
      }), /*#__PURE__*/_jsx(YearsGridView, {
        intialYear: this.state.initialYear,
        currentMonth: currentMonth,
        currentYear: currentYear,
        styles: styles,
        onSelectYear: onSelectYear,
        minDate: minDate,
        maxDate: maxDate,
        textStyle: textStyle
      })]
    });
  }
}
//# sourceMappingURL=YearSelector.js.map