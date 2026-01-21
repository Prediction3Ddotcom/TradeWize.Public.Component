"use strict";

import { Text, StyleSheet } from 'react-native';
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
        fontWeight: '700',
        fontFamily: 'PlusJakartaSans-Bold'
      },
      h2: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '700',
        fontFamily: 'PlusJakartaSans-Bold'
      },
      h3: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold'
      },
      h4: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold'
      },
      h5: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold'
      },
      h6: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold'
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular'
      },
      bodySmall: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular'
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular'
      },
      overline: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        fontFamily: 'PlusJakartaSans-SemiBold'
      },
      button: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold'
      },
      label: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium'
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
  const flattenedStyle = StyleSheet.flatten(style);
  const fontWeight = flattenedStyle?.fontWeight || 'normal';
  const fontFamily = getFontFamilyByWeight(fontWeight);
  return /*#__PURE__*/_jsx(Text, {
    style: [getTextStyles(), {
      fontFamily
    }, style],
    numberOfLines: numberOfLines,
    allowFontScaling: allowFontScaling,
    ...props,
    children: children
  });
}
const getFontFamilyByWeight = fontWeight => {
  switch (fontWeight) {
    case 'bold':
    case '700':
    case '800':
    case '900':
      return 'PlusJakartaSans-Bold';
    case '500':
    case '600':
    case 'medium':
      return 'PlusJakartaSans-Medium';
    case 'normal':
    case '400':
    case '300':
    case '200':
    case '100':
    default:
      return 'PlusJakartaSans-Regular';
  }
};
//# sourceMappingURL=text.js.map