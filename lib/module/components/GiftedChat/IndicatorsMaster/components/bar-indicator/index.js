"use strict";

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import Indicator from "../indicator/index.js";
import styles from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default class BarIndicator extends PureComponent {
  static defaultProps = {
    count: 3,
    color: 'rgb(0, 0, 0)',
    size: 40
  };
  static propTypes = {
    ...Indicator.propTypes,
    color: PropTypes.string,
    size: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }
  outputRange(base, index, count, samples) {
    let range = Array.from(new Array(samples), (_item, i) => base * Math.abs(Math.cos(Math.PI * i / (samples - 1))));
    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop());
    }
    range.unshift(...range.slice(-1));
    return range;
  }
  renderComponent({
    index,
    count,
    progress
  }) {
    let {
      color: backgroundColor,
      size,
      animationDuration
    } = this.props;
    let frames = 60 * animationDuration / 1000;
    let samples = 0;
    do samples += count; while (samples < frames);
    let inputRange = Array.from(new Array(samples + 1), (_item, i) => i / samples);
    let width = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2);
    let containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius
    };
    let topStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(+(height - radius) / 2, index, count, samples)
        })
      }]
    };
    let bottomStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(-(height - radius) / 2, index, count, samples)
        })
      }]
    };
    return /*#__PURE__*/_jsxs(View, {
      style: containerStyle,
      key: index,
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: topStyle
      }), /*#__PURE__*/_jsx(Animated.View, {
        style: bottomStyle
      })]
    });
  }
  render() {
    let {
      style,
      ...props
    } = this.props;
    return /*#__PURE__*/_jsx(Indicator, {
      style: [styles.container, style],
      renderComponent: this.renderComponent,
      ...props
    });
  }
}
//# sourceMappingURL=index.js.map