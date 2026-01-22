"use strict";

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from "../indicator/index.js";
import styles from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default class SkypeIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 1600,
    color: 'rgb(0, 0, 0)',
    count: 5,
    size: 40,
    minScale: 0.2,
    maxScale: 1.0
  };
  static propTypes = {
    ...Indicator.propTypes,
    color: PropTypes.string,
    size: PropTypes.number,
    minScale: PropTypes.number,
    maxScale: PropTypes.number
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
      minScale,
      maxScale,
      color: backgroundColor,
      animationDuration
    } = this.props;
    let frames = 60 * animationDuration / 1000;
    let offset = index / (count - 1);
    let easing = Easing.bezier(0.5, offset, 0.5, 1.0);
    let inputRange = Array.from(new Array(frames), (_item, index) => index / (frames - 1));
    let outputRange = Array.from(new Array(frames), (_item, index) => easing(index / (frames - 1)) * 360 + 'deg');
    let layerStyle = {
      transform: [{
        rotate: progress.interpolate({
          inputRange,
          outputRange
        })
      }]
    };
    let ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [maxScale - (maxScale - minScale) * offset, minScale + (maxScale - minScale) * offset]
        })
      }]
    };
    return /*#__PURE__*/_jsx(Animated.View, {
      style: [styles.layer, layerStyle],
      key: index,
      children: /*#__PURE__*/_jsx(Animated.View, {
        style: ballStyle
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