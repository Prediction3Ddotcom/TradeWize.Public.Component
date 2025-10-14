"use strict";

import { Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export function CustomText({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  numberOfLines,
  style,
  allowFontScaling = false,
  // Tắt font scaling để không phụ thuộc vào cỡ chữ device
  ...props
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const getTextStyles = () => {
    const baseStyles = {
      // Đặt lineHeight cố định để tránh layout shift
      includeFontPadding: false,
      textAlignVertical: 'center'
    };
    const variantStyles = {
      h1: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '700'
      },
      h2: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '700'
      },
      h3: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600'
      },
      h4: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600'
      },
      h5: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600'
      },
      h6: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600'
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400'
      },
      bodySmall: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400'
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400'
      },
      overline: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 1.5,
        textTransform: 'uppercase'
      },
      button: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600'
      },
      label: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500'
      }
    };
    const colorStyles = {
      primary: {
        color: isDark ? '#FFFFFF' : '#000000'
      },
      secondary: {
        color: isDark ? '#EBEBF5' : '#6D6D70'
      },
      tertiary: {
        color: isDark ? '#EBEBF599' : '#6D6D7099'
      },
      inverse: {
        color: isDark ? '#000000' : '#FFFFFF'
      },
      error: {
        color: '#FF3B30'
      },
      success: {
        color: '#34C759'
      },
      warning: {
        color: '#FF9500'
      }
    };
    const weightStyles = {
      normal: {
        fontWeight: '400'
      },
      medium: {
        fontWeight: '500'
      },
      semibold: {
        fontWeight: '600'
      },
      bold: {
        fontWeight: '700'
      }
    };
    const alignStyles = {
      left: {
        textAlign: 'left'
      },
      center: {
        textAlign: 'center'
      },
      right: {
        textAlign: 'right'
      },
      justify: {
        textAlign: 'justify'
      }
    };
    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...colorStyles[color],
      ...weightStyles[weight],
      ...alignStyles[align]
    };
  };
  return /*#__PURE__*/_jsx(Text, {
    style: [getTextStyles(), style],
    numberOfLines: numberOfLines,
    allowFontScaling: allowFontScaling,
    ...props,
    children: children
  });
}
//# sourceMappingURL=text.js.map