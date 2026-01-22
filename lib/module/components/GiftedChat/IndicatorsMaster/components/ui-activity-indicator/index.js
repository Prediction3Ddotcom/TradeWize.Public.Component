"use strict";

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import Indicator from "../indicator/index.js";
import styles from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default class UIActivityIndicator extends PureComponent {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 12,
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
  renderComponent({
    index,
    count,
    progress
  }) {
    let {
      size,
      color: backgroundColor
    } = this.props;
    let angle = index * 360 / count;
    let layerStyle = {
      transform: [{
        rotate: angle + 'deg'
      }]
    };
    let inputRange = Array.from(new Array(count + 1), (_item, index) => index / count);
    let outputRange = Array.from(new Array(count), (_item, index) => Math.max(1.0 - index * (1 / (count - 1)), 0));
    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop());
    }
    outputRange.unshift(...outputRange.slice(-1));
    let barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({
        inputRange,
        outputRange
      })
    };
    return /*#__PURE__*/_jsx(Animated.View, {
      style: [styles.layer, layerStyle],
      key: index,
      children: /*#__PURE__*/_jsx(Animated.View, {
        style: barStyle
      })
    });
  }
  render() {
    let {
      style,
      size: width,
      size: height,
      ...props
    } = this.props;
    return /*#__PURE__*/_jsx(View, {
      style: [styles.container, style],
      children: /*#__PURE__*/_jsx(Indicator, {
        style: {
          width,
          height
        },
        renderComponent: this.renderComponent,
        ...props
      })
    });
  }
}
//# sourceMappingURL=index.js.map