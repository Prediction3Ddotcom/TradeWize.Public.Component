"use strict";

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from "../indicator/index.js";
import styles from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default class PulseIndicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
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
  renderComponent({
    index,
    progress
  }) {
    let {
      size,
      color
    } = this.props;
    let pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0]
        })
      }],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0]
      })
    };
    return /*#__PURE__*/_jsx(Animated.View, {
      style: styles.layer,
      key: index,
      children: /*#__PURE__*/_jsx(Animated.View, {
        style: pulseStyle
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
        ...props,
        count: 2
      })
    });
  }
}
//# sourceMappingURL=index.js.map