"use strict";

import { TouchableOpacity, StyleSheet, View, useColorScheme } from 'react-native';
import { CustomText } from "./text.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export function CheckboxButton({
  label,
  isChecked = false,
  onChange,
  size = 'medium',
  variant = 'default',
  isDisabled = false,
  checkboxPosition = 'left',
  style,
  textStyle,
  checkboxStyle,
  spacing = 8,
  onPress,
  customCheckmark,
  ...props
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const handlePress = event => {
    if (!isDisabled) {
      onChange?.(!isChecked);
      onPress?.(event);
    }
  };
  const getCheckboxSize = () => {
    const sizes = {
      small: 18,
      medium: 22,
      large: 26
    };
    return sizes[size];
  };
  const getCheckboxStyles = () => {
    const checkboxSize = getCheckboxSize();
    const baseStyles = {
      width: checkboxSize,
      height: checkboxSize,
      borderRadius: 4,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center'
    };
    const variantStyles = {
      default: {
        borderColor: isChecked ? isDark ? '#0A84FF' : '#007AFF' : isDark ? '#48484A' : '#C7C7CC',
        backgroundColor: isChecked ? isDark ? '#0A84FF' : '#007AFF' : 'transparent'
      },
      primary: {
        borderColor: isChecked ? isDark ? '#0A84FF' : '#007AFF' : isDark ? '#48484A' : '#C7C7CC',
        backgroundColor: isChecked ? isDark ? '#0A84FF' : '#007AFF' : 'transparent'
      },
      success: {
        borderColor: isChecked ? isDark ? '#30D158' : '#34C759' : isDark ? '#48484A' : '#C7C7CC',
        backgroundColor: isChecked ? isDark ? '#30D158' : '#34C759' : 'transparent'
      },
      danger: {
        borderColor: isChecked ? isDark ? '#FF453A' : '#FF3B30' : isDark ? '#48484A' : '#C7C7CC',
        backgroundColor: isChecked ? isDark ? '#FF453A' : '#FF3B30' : 'transparent'
      }
    };
    const disabledStyles = {
      opacity: 0.4
    };
    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...(isDisabled && disabledStyles)
    };
  };
  const getTextStyles = () => {
    const baseStyles = {
      color: isDark ? '#FFFFFF' : '#000000'
    };
    const sizeTextStyles = {
      small: {
        fontSize: 14
      },
      medium: {
        fontSize: 16
      },
      large: {
        fontSize: 18
      }
    };
    const disabledStyles = {
      opacity: 0.4
    };
    return {
      ...baseStyles,
      ...sizeTextStyles[size],
      ...(isDisabled && disabledStyles)
    };
  };
  const renderCheckmark = () => {
    if (!isChecked) return null;
    const checkmarkSize = getCheckboxSize() * 0.6;
    if (customCheckmark) {
      return customCheckmark;
    }
    return /*#__PURE__*/_jsx(View, {
      style: styles.checkmark,
      children: /*#__PURE__*/_jsx(CustomText, {
        style: [styles.checkmarkText, {
          fontSize: checkmarkSize,
          lineHeight: checkmarkSize * 1.2
        }],
        children: "\u2713"
      })
    });
  };
  const renderCheckbox = () => /*#__PURE__*/_jsx(View, {
    style: [getCheckboxStyles(), checkboxStyle],
    children: renderCheckmark()
  });
  const renderLabel = () => {
    if (!label) return null;
    return /*#__PURE__*/_jsx(CustomText, {
      style: [getTextStyles(), textStyle],
      children: label
    });
  };
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: [styles.container, style],
    onPress: handlePress,
    disabled: isDisabled,
    activeOpacity: 0.7,
    ...props,
    children: checkboxPosition === 'left' ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [renderCheckbox(), label && /*#__PURE__*/_jsx(View, {
        style: {
          marginLeft: spacing
        }
      }), renderLabel()]
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [renderLabel(), label && /*#__PURE__*/_jsx(View, {
        style: {
          marginRight: spacing
        }
      }), renderCheckbox()]
    })
  });
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});
//# sourceMappingURL=checkboxButton.js.map