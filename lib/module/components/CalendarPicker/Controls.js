"use strict";

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
export default function Controls(props) {
  const {
    onPressControl,
    styles,
    textStyles,
    label,
    component,
    disabled
  } = props;
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    onPress: () => onPressControl(),
    style: styles,
    disabled: disabled,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 40
    },
    children: /*#__PURE__*/_jsx(View, {
      style: {
        opacity: disabled ? 0 : 1
      },
      children: component || /*#__PURE__*/_jsx(Text, {
        style: [textStyles],
        children: label
      })
    })
  });
}
Controls.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  onPressControl: PropTypes.func.isRequired
};
//# sourceMappingURL=Controls.js.map