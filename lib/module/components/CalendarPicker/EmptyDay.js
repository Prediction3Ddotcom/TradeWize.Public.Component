"use strict";

import { View } from 'react-native';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
export default function EmptyDay(props) {
  const {
    styles
  } = props;
  return /*#__PURE__*/_jsx(View, {
    style: styles.dayWrapper,
    children: /*#__PURE__*/_jsx(View, {
      style: styles.dayButton
    })
  });
}
EmptyDay.propTypes = {
  styles: PropTypes.shape({})
};
//# sourceMappingURL=EmptyDay.js.map