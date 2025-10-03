"use strict";

import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { CustomText } from "./text.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Button({
  title,
  children,
  leftIcon,
  rightIcon,
  iconOnly = false,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  style,
  textStyle,
  iconSpacing = 8,
  onPress,
  ...props
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...(fullWidth && {
        width: '100%'
      })
    };
    const variantStyles = {
      primary: {
        backgroundColor: '#007AFF',
        ...(isDark && {
          backgroundColor: '#0A84FF'
        })
      },
      secondary: {
        backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
        borderWidth: 1,
        borderColor: isDark ? '#3A3A3C' : '#C7C7CC'
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
        ...(isDark && {
          borderColor: '#0A84FF'
        })
      },
      ghost: {
        backgroundColor: 'transparent'
      },
      danger: {
        backgroundColor: '#FF3B30',
        ...(isDark && {
          backgroundColor: '#FF453A'
        })
      },
      success: {
        backgroundColor: '#34C759',
        ...(isDark && {
          backgroundColor: '#30D158'
        })
      }
    };
    const sizeStyles = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 32,
        ...(iconOnly && {
          paddingHorizontal: 8,
          width: 32
        })
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 44,
        ...(iconOnly && {
          paddingHorizontal: 12,
          width: 44
        })
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 52,
        ...(iconOnly && {
          paddingHorizontal: 16,
          width: 52
        })
      },
      xlarge: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        minHeight: 60,
        ...(iconOnly && {
          paddingHorizontal: 20,
          width: 60
        })
      }
    };
    const disabledStyles = {
      opacity: 0.6
    };
    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(isDisabled && disabledStyles),
      ...style
    };
  };
  const getTextStyles = () => {
    const baseStyles = {
      fontWeight: '600',
      textAlign: 'center'
    };
    const variantTextStyles = {
      primary: {
        color: '#FFFFFF'
      },
      secondary: {
        color: isDark ? '#FFFFFF' : '#000000'
      },
      outline: {
        color: '#007AFF',
        ...(isDark && {
          color: '#0A84FF'
        })
      },
      ghost: {
        color: '#007AFF',
        ...(isDark && {
          color: '#0A84FF'
        })
      },
      danger: {
        color: '#FFFFFF'
      },
      success: {
        color: '#FFFFFF'
      }
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
      },
      xlarge: {
        fontSize: 20
      }
    };
    return {
      ...baseStyles,
      ...variantTextStyles[variant],
      ...sizeTextStyles[size],
      ...textStyle
    };
  };
  const handlePress = event => {
    if (!isDisabled && !isLoading && onPress) {
      onPress(event);
    }
  };
  const getIconColor = () => {
    if (variant === 'primary' || variant === 'danger' || variant === 'success') {
      return '#FFFFFF';
    }
    return isDark ? '#0A84FF' : '#007AFF';
  };
  const getLoadingColor = () => {
    if (variant === 'primary' || variant === 'danger' || variant === 'success') {
      return '#FFFFFF';
    }
    return isDark ? '#0A84FF' : '#007AFF';
  };
  const renderContent = () => {
    if (isLoading) {
      return /*#__PURE__*/_jsx(ActivityIndicator, {
        size: "small",
        color: getLoadingColor(),
        style: styles.loader
      });
    }
    if (children) {
      return children;
    }
    if (iconOnly && (leftIcon || rightIcon)) {
      return leftIcon || rightIcon;
    }
    const iconSize = size === 'small' ? 16 : size === 'medium' ? 18 : size === 'large' ? 20 : 22;
    return /*#__PURE__*/_jsxs(View, {
      style: styles.content,
      children: [leftIcon && /*#__PURE__*/_jsx(View, {
        style: [styles.icon, {
          marginRight: iconSpacing
        }],
        children: /*#__PURE__*/React.cloneElement(leftIcon, {
          size: iconSize,
          color: getIconColor()
        })
      }), title && /*#__PURE__*/_jsx(CustomText, {
        style: getTextStyles(),
        children: title
      }), rightIcon && /*#__PURE__*/_jsx(View, {
        style: [styles.icon, {
          marginLeft: iconSpacing
        }],
        children: /*#__PURE__*/React.cloneElement(rightIcon, {
          size: iconSize,
          color: getIconColor()
        })
      })]
    });
  };
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: getButtonStyles(),
    onPress: handlePress,
    disabled: isDisabled || isLoading,
    activeOpacity: 0.7,
    ...props,
    children: renderContent()
  });
}
const styles = StyleSheet.create({
  loader: {
    marginRight: 8
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=button.js.map