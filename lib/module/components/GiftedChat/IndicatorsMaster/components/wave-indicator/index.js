"use strict";

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from "../indicator/index.js";
import styles from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const floatEpsilon = Math.pow(2, -23);
export default class WaveIndicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,
    waveFactor: 0.54,
    waveMode: 'fill',
    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 40
  };
  static propTypes = {
    ...Indicator.propTypes,
    waveFactor: PropTypes.number,
    waveMode: PropTypes.oneOf(['fill', 'outline']),
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
      color,
      waveFactor,
      waveMode
    } = this.props;
    let fill = waveMode === 'fill';
    let factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);
    let waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),
      [fill ? 'backgroundColor' : 'borderColor']: color,
      transform: [{
        scale: progress.interpolate({
          inputRange: [factor, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
      }],
      opacity: progress.interpolate({
        inputRange: [0, factor, 1],
        outputRange: [0, 1, 0]
      })
    };
    return /*#__PURE__*/_jsx(Animated.View, {
      style: styles.layer,
      key: index,
      children: /*#__PURE__*/_jsx(Animated.View, {
        style: waveStyle
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