"use strict";

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from "./button.js";
import { CustomText } from "./text.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const HeaderBase = ({
  title,
  titleAlign = 'center',
  leftActions = [],
  rightActions = [],
  containerStyle,
  titleStyle,
  height = 56,
  backgroundColor = '#fff',
  border = false,
  styleButtonLeft,
  showDefaultLeft = true,
  colorIconLeft = '#000000',
  onPressBack,
  renderCustomContent
}) => {
  if (renderCustomContent) {
    return /*#__PURE__*/_jsx(View, {
      style: [styles.container, containerStyle],
      children: renderCustomContent()
    });
  }
  const getTitleAlignment = () => {
    if (titleAlign === 'center') return 'center';
    if (titleAlign === 'left') return 'flex-start';
    return 'flex-end';
  };
  const renderLeftActions = () => {
    // Nếu có leftActions → render chúng
    if (leftActions && leftActions.length > 0) {
      return leftActions.filter(a => a.visible !== false).map((action, index) => /*#__PURE__*/_jsx(Button, {
        variant: "ghost",
        style: [styles.actionButton, styleButtonLeft],
        onPress: action.onPress,
        hitSlop: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },
        children: action.icon || /*#__PURE__*/_jsx(CustomText, {
          style: styles.actionLabel,
          children: action.label
        })
      }, `left-${index}`));
    }

    // Nếu không có và showDefaultLeft = true → render nút back mặc định
    if (showDefaultLeft) {
      return /*#__PURE__*/_jsx(Button, {
        variant: "ghost",
        onPress: onPressBack,
        style: [styles.actionButton, styleButtonLeft],
        hitSlop: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },
        children: /*#__PURE__*/_jsx(Image, {
          source: require('../assets/back.png'),
          style: styles.iconLeft,
          tintColor: colorIconLeft
        })
      });
    }

    // Nếu tắt defaultLeft → render View rỗng để giữ cân đối layout
    return /*#__PURE__*/_jsx(View, {
      style: [styles.layoutLeftDefault, styleButtonLeft]
    });
  };
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, {
      backgroundColor,
      height
    }, border && styles.border, containerStyle],
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.sideContainer,
      children: renderLeftActions()
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.titleContainer, {
        alignItems: getTitleAlignment()
      }],
      children: typeof title === 'string' ? /*#__PURE__*/_jsx(CustomText, {
        numberOfLines: 1,
        style: [styles.title, titleStyle],
        children: title
      }) : title
    }), /*#__PURE__*/_jsx(View, {
      style: styles.sideContainer,
      children: rightActions.map((action, index) => /*#__PURE__*/_jsx(Button, {
        variant: "ghost",
        style: styles.actionButton,
        onPress: action.onPress,
        hitSlop: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },
        children: action.icon || /*#__PURE__*/_jsx(CustomText, {
          style: styles.actionLabel,
          children: action.label
        })
      }, `right-${index}`))
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd'
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 40
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111'
  },
  actionButton: {
    paddingHorizontal: 6
  },
  actionLabel: {
    fontSize: 16,
    color: '#007AFF'
  },
  layoutLeftDefault: {
    width: 24
  },
  iconLeft: {
    width: 24,
    height: 24
  }
});
export default HeaderBase;
//# sourceMappingURL=header.js.map