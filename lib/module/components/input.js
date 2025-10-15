"use strict";

import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { CustomText } from "./text.js";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function Input({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  variant = 'outline',
  size = 'medium',
  isDisabled = false,
  isError = false,
  isRequired = false,
  fullWidth = true,
  containerStyle,
  inputStyle,
  labelStyle,
  inputContainerStyle,
  borderColorActive = '#007AFF',
  borderColorError = '#FF3B30',
  borderColor = '#C7C7CC',
  onRightIconPress,
  onLeftIconPress,
  onFocus,
  onBlur,
  autoCorrect = false,
  // Tắt tự động sửa lỗi chính tả
  autoCapitalize = 'none',
  // Không tự động viết hoa
  autoComplete = 'off',
  // Tắt gợi ý tự động (Android/iOS)
  spellCheck = false,
  // Tắt kiểm tra chính tả
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = isError || !!errorText;
  const handleFocus = e => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleBlur = e => {
    setIsFocused(false);
    onBlur?.(e);
  };
  const getContainerStyles = () => {
    const baseStyles = {
      ...(fullWidth && {
        width: '100%'
      })
    };
    return {
      ...baseStyles
    };
  };
  const getInputContainerStyles = () => {
    const baseStyles = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8
    };
    const variantStyles = {
      outline: {
        borderWidth: 1,
        borderColor: hasError ? borderColorError : isFocused ? borderColorActive : borderColor,
        backgroundColor: '#FFFFFF'
      },
      filled: {
        borderWidth: 0,
        backgroundColor: '#F2F2F7',
        borderBottomWidth: 2,
        borderBottomColor: hasError ? borderColorError : isFocused ? borderColorActive : 'transparent'
      },
      underline: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: hasError ? borderColorError : isFocused ? borderColorActive : borderColor,
        backgroundColor: 'transparent',
        borderRadius: 0
      }
    };
    const sizeStyles = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 36
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 56
      }
    };
    const disabledStyles = {
      opacity: 0.6
    };
    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(isDisabled && disabledStyles)
    };
  };
  const getInputStyles = () => {
    const baseStyles = {
      flex: 1,
      color: '#000000',
      fontWeight: '400'
    };
    const sizeStyles = {
      small: {
        fontSize: 14,
        lineHeight: 20
      },
      medium: {
        fontSize: 16,
        lineHeight: 24
      },
      large: {
        fontSize: 18,
        lineHeight: 26
      }
    };
    return {
      ...baseStyles,
      ...sizeStyles[size]
    };
  };
  const getIconSize = () => {
    const sizes = {
      small: 16,
      medium: 20,
      large: 24
    };
    return sizes[size];
  };
  const getIconColor = () => {
    if (hasError) return '#FF3B30';
    if (isFocused) return '#007AFF';
    return '#6D6D70';
  };
  const placeholderColor = '#C7C7CC';
  return /*#__PURE__*/_jsxs(View, {
    style: [getContainerStyles(), containerStyle],
    children: [label && /*#__PURE__*/_jsx(View, {
      style: styles.labelContainer,
      children: /*#__PURE__*/_jsxs(CustomText, {
        variant: "label",
        color: "primary",
        style: [styles.label, labelStyle],
        children: [label, isRequired && /*#__PURE__*/_jsxs(CustomText, {
          variant: "label",
          color: "error",
          children: [' ', "*"]
        })]
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: [getInputContainerStyles(), inputContainerStyle],
      children: [leftIcon && /*#__PURE__*/_jsx(Pressable, {
        onPress: onLeftIconPress,
        disabled: !onLeftIconPress || isDisabled,
        style: styles.leftIconContainer,
        children: /*#__PURE__*/React.cloneElement(leftIcon, {
          size: getIconSize(),
          color: getIconColor()
        })
      }), /*#__PURE__*/_jsx(TextInput, {
        style: [getInputStyles(), inputStyle],
        placeholderTextColor: placeholderColor,
        editable: !isDisabled,
        onFocus: handleFocus,
        onBlur: handleBlur,
        autoCorrect: autoCorrect,
        autoCapitalize: autoCapitalize,
        autoComplete: autoComplete,
        spellCheck: spellCheck,
        ...props
      }), rightIcon && /*#__PURE__*/_jsx(Pressable, {
        onPress: onRightIconPress,
        disabled: !onRightIconPress || isDisabled,
        style: styles.rightIconContainer,
        children: /*#__PURE__*/React.cloneElement(rightIcon, {
          size: getIconSize(),
          color: getIconColor()
        })
      })]
    }), (helperText || errorText) && /*#__PURE__*/_jsx(CustomText, {
      variant: "caption",
      color: hasError ? 'error' : 'secondary',
      style: styles.helperText,
      children: errorText ?? helperText
    })]
  });
}
const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 8
  },
  label: {
    marginBottom: 0
  },
  leftIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4
  }
});
//# sourceMappingURL=input.js.map