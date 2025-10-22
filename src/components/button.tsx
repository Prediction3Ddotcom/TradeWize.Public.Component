import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  ActivityIndicator,
  type TouchableOpacityProps,
  View,
  type StyleProp,
} from 'react-native';
import { useColorScheme } from 'react-native';
import type { ReactNode } from 'react';
import { CustomText } from './text';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title?: string;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconSpacing?: number;
  customButtonStyle?: StyleProp<ViewStyle>;
}

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
  customButtonStyle,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...(fullWidth && { width: '100%' }),
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: '#007AFF',
        ...(isDark && { backgroundColor: '#0A84FF' }),
      },
      secondary: {
        backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
        borderWidth: 1,
        borderColor: isDark ? '#3A3A3C' : '#C7C7CC',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
        ...(isDark && { borderColor: '#0A84FF' }),
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      danger: {
        backgroundColor: '#FF3B30',
        ...(isDark && { backgroundColor: '#FF453A' }),
      },
      success: {
        backgroundColor: '#34C759',
        ...(isDark && { backgroundColor: '#30D158' }),
      },
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 32,
        ...(iconOnly && {
          paddingHorizontal: 8,
          width: 32,
        }),
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 44,
        ...(iconOnly && {
          paddingHorizontal: 12,
          width: 44,
        }),
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 52,
        ...(iconOnly && {
          paddingHorizontal: 16,
          width: 52,
        }),
      },
      xlarge: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        minHeight: 60,
        ...(iconOnly && {
          paddingHorizontal: 20,
          width: 60,
        }),
      },
    };

    const disabledStyles: ViewStyle = {
      opacity: 0.6,
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(isDisabled && disabledStyles),
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: isDark ? '#FFFFFF' : '#000000',
      },
      outline: {
        color: '#007AFF',
        ...(isDark && { color: '#0A84FF' }),
      },
      ghost: {
        color: '#007AFF',
        ...(isDark && { color: '#0A84FF' }),
      },
      danger: {
        color: '#FFFFFF',
      },
      success: {
        color: '#FFFFFF',
      },
    };

    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        fontSize: 14,
      },
      medium: {
        fontSize: 16,
      },
      large: {
        fontSize: 18,
      },
      xlarge: {
        fontSize: 20,
      },
    };

    return {
      ...baseStyles,
      ...variantTextStyles[variant],
      ...sizeTextStyles[size],
    };
  };

  const handlePress = (event: any) => {
    if (!isDisabled && !isLoading && onPress) {
      onPress(event);
    }
  };

  const getIconColor = (): string => {
    if (
      variant === 'primary' ||
      variant === 'danger' ||
      variant === 'success'
    ) {
      return '#FFFFFF';
    }
    return isDark ? '#0A84FF' : '#007AFF';
  };

  const getLoadingColor = (): string => {
    if (
      variant === 'primary' ||
      variant === 'danger' ||
      variant === 'success'
    ) {
      return '#FFFFFF';
    }
    return isDark ? '#0A84FF' : '#007AFF';
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="small"
          color={getLoadingColor()}
          style={styles.loader}
        />
      );
    }

    if (children) {
      return children;
    }

    if (iconOnly && (leftIcon || rightIcon)) {
      return leftIcon || rightIcon;
    }

    const iconSize =
      size === 'small'
        ? 16
        : size === 'medium'
          ? 18
          : size === 'large'
            ? 20
            : 22;

    return (
      <View style={styles.content}>
        {leftIcon && (
          <View style={[styles.icon, { marginRight: iconSpacing }]}>
            {React.cloneElement(
              leftIcon as React.ReactElement,
              {
                size: iconSize,
                color: getIconColor(),
              } as any
            )}
          </View>
        )}

        {title && (
          <CustomText style={[getTextStyles(), textStyle]}>{title}</CustomText>
        )}

        {rightIcon && (
          <View style={[styles.icon, { marginLeft: iconSpacing }]}>
            {React.cloneElement(
              rightIcon as React.ReactElement,
              {
                size: iconSize,
                color: getIconColor(),
              } as any
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={
        customButtonStyle ? customButtonStyle : [(getButtonStyles(), style)]
      }
      onPress={handlePress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.7}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginRight: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
