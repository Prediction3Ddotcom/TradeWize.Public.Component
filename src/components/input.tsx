import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
  Pressable,
  useColorScheme,
} from 'react-native';
import type { ReactNode } from 'react';
import { CustomText } from './text';

export interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'outline' | 'filled' | 'underline';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
}

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
  onRightIconPress,
  onLeftIconPress,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const hasError = isError || !!errorText;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getContainerStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      ...(fullWidth && { width: '100%' }),
    };

    return {
      ...baseStyles,
      ...containerStyle,
    };
  };

  const getInputContainerStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
    };

    const variantStyles: Record<string, ViewStyle> = {
      outline: {
        borderWidth: 1,
        borderColor: hasError
          ? '#FF3B30'
          : isFocused
            ? isDark
              ? '#0A84FF'
              : '#007AFF'
            : isDark
              ? '#3A3A3C'
              : '#C7C7CC',
        backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      },
      filled: {
        borderWidth: 0,
        backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
        borderBottomWidth: 2,
        borderBottomColor: hasError
          ? '#FF3B30'
          : isFocused
            ? isDark
              ? '#0A84FF'
              : '#007AFF'
            : 'transparent',
      },
      underline: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: hasError
          ? '#FF3B30'
          : isFocused
            ? isDark
              ? '#0A84FF'
              : '#007AFF'
            : isDark
              ? '#3A3A3C'
              : '#C7C7CC',
        backgroundColor: 'transparent',
        borderRadius: 0,
      },
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 56,
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

  const getInputStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      flex: 1,
      color: isDark ? '#FFFFFF' : '#000000',
      fontWeight: '400',
    };

    const sizeStyles: Record<string, TextStyle> = {
      small: {
        fontSize: 14,
        lineHeight: 20,
      },
      medium: {
        fontSize: 16,
        lineHeight: 24,
      },
      large: {
        fontSize: 18,
        lineHeight: 26,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...inputStyle,
    };
  };

  const getIconSize = (): number => {
    const sizes = {
      small: 16,
      medium: 20,
      large: 24,
    };
    return sizes[size];
  };

  const getIconColor = (): string => {
    if (hasError) return '#FF3B30';
    if (isFocused) return isDark ? '#0A84FF' : '#007AFF';
    return isDark ? '#8E8E93' : '#6D6D70';
  };

  const placeholderColor = isDark ? '#8E8E93' : '#C7C7CC';

  return (
    <View style={getContainerStyles()}>
      {label && (
        <View style={styles.labelContainer}>
          <CustomText
            variant="label"
            color="primary"
            style={[styles.label, labelStyle]}
          >
            {label}
            {isRequired && (
              <CustomText variant="label" color="error">
                {' '}
                *
              </CustomText>
            )}
          </CustomText>
        </View>
      )}

      <View style={getInputContainerStyles()}>
        {leftIcon && (
          <Pressable
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress || isDisabled}
            style={styles.leftIconContainer}
          >
            {React.cloneElement(
              leftIcon as React.ReactElement,
              {
                size: getIconSize(),
                color: getIconColor(),
              } as any
            )}
          </Pressable>
        )}

        <TextInput
          style={getInputStyles()}
          placeholderTextColor={placeholderColor}
          editable={!isDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            disabled={!onRightIconPress || isDisabled}
            style={styles.rightIconContainer}
          >
            {React.cloneElement(
              rightIcon as React.ReactElement,
              {
                size: getIconSize(),
                color: getIconColor(),
              } as any
            )}
          </Pressable>
        )}
      </View>

      {(helperText || errorText) && (
        <CustomText
          variant="caption"
          color={hasError ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {errorText ?? helperText}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 0,
  },
  leftIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
