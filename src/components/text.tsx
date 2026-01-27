import {
  Text,
  type TextStyle,
  type TextProps as RNTextProps,
  type StyleProp,
  StyleSheet,
} from 'react-native';
import { useColorScheme } from 'react-native';
import type { ReactNode } from 'react';
import { responsiveFontSize } from '../utils';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  children: ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body'
    | 'bodySmall'
    | 'caption'
    | 'overline'
    | 'button'
    | 'label';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'inverse'
    | 'error'
    | 'success'
    | 'warning';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
}

export function CustomText({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  numberOfLines,
  style,
  allowFontScaling = false, // Tắt font scaling để không phụ thuộc vào cỡ chữ device
  ...props
}: TextProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      // Đặt lineHeight cố định để tránh layout shift
      includeFontPadding: false,
      textAlignVertical: 'center',
    };

    const variantStyles: Record<string, TextStyle> = {
      h1: {
        fontSize: responsiveFontSize(32),
        lineHeight: 40,
        fontWeight: '700',
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h2: {
        fontSize: responsiveFontSize(28),
        lineHeight: 36,
        fontWeight: '700',
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h3: {
        fontSize: responsiveFontSize(24),
        lineHeight: 32,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
      h4: {
        fontSize: responsiveFontSize(20),
        lineHeight: 28,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
      h5: {
        fontSize: responsiveFontSize(18),
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
      h6: {
        fontSize: responsiveFontSize(16),
        lineHeight: 22,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
      body: {
        fontSize: responsiveFontSize(16),
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular',
      },
      bodySmall: {
        fontSize: responsiveFontSize(14),
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular',
      },
      caption: {
        fontSize: responsiveFontSize(12),
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular',
      },
      overline: {
        fontSize: responsiveFontSize(10),
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
      button: {
        fontSize: responsiveFontSize(16),
        lineHeight: 20,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
      label: {
        fontSize: responsiveFontSize(14),
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
      },
    };

    const colorStyles: Record<string, TextStyle> = {
      primary: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      secondary: {
        color: isDark ? '#EBEBF5' : '#6D6D70',
      },
      tertiary: {
        color: isDark ? '#EBEBF599' : '#6D6D7099',
      },
      inverse: {
        color: isDark ? '#000000' : '#FFFFFF',
      },
      error: {
        color: '#FF3B30',
      },
      success: {
        color: '#34C759',
      },
      warning: {
        color: '#FF9500',
      },
    };

    const weightStyles: Record<string, TextStyle> = {
      normal: {
        fontWeight: '400',
      },
      medium: {
        fontWeight: '500',
      },
      semibold: {
        fontWeight: '600',
      },
      bold: {
        fontWeight: '700',
      },
    };

    const alignStyles: Record<string, TextStyle> = {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
      justify: {
        textAlign: 'justify',
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...colorStyles[color],
      ...weightStyles[weight],
      ...alignStyles[align],
    };
  };

  const flattenedStyle = StyleSheet.flatten(style) as TextStyle;
  const fontWeight = flattenedStyle?.fontWeight || 'normal';
  const fontFamily = getFontFamilyByWeight(fontWeight);
  const fontSize = getFontSize(Number(flattenedStyle?.fontSize));

  return (
    <Text
      style={[
        getTextStyles(),
        { fontFamily },
        fontSize > 0 && { fontSize },
        style,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      {...props}
    >
      {children}
    </Text>
  );
}

const getFontSize = (fontSize: TextStyle['fontSize']): number => {
  return responsiveFontSize(Number(fontSize));
};

const getFontFamilyByWeight = (fontWeight: TextStyle['fontWeight']): string => {
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
