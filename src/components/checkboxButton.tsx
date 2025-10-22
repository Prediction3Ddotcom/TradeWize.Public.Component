import {
  TouchableOpacity,
  StyleSheet,
  View,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
  type TouchableOpacityProps,
  useColorScheme,
} from 'react-native';
import { CustomText } from './text';

export interface CheckboxButtonProps
  extends Omit<TouchableOpacityProps, 'style'> {
  label?: string;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'success' | 'danger';
  isDisabled?: boolean;
  checkboxPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
  spacing?: number;
}

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
  ...props
}: CheckboxButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = (event: any) => {
    if (!isDisabled) {
      onChange?.(!isChecked);
      onPress?.(event);
    }
  };

  const getCheckboxSize = (): number => {
    const sizes = {
      small: 18,
      medium: 22,
      large: 26,
    };
    return sizes[size];
  };

  const getCheckboxStyles = (): ViewStyle => {
    const checkboxSize = getCheckboxSize();

    const baseStyles: ViewStyle = {
      width: checkboxSize,
      height: checkboxSize,
      borderRadius: 4,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        borderColor: isChecked
          ? isDark
            ? '#0A84FF'
            : '#007AFF'
          : isDark
            ? '#48484A'
            : '#C7C7CC',
        backgroundColor: isChecked
          ? isDark
            ? '#0A84FF'
            : '#007AFF'
          : 'transparent',
      },
      primary: {
        borderColor: isChecked
          ? isDark
            ? '#0A84FF'
            : '#007AFF'
          : isDark
            ? '#48484A'
            : '#C7C7CC',
        backgroundColor: isChecked
          ? isDark
            ? '#0A84FF'
            : '#007AFF'
          : 'transparent',
      },
      success: {
        borderColor: isChecked
          ? isDark
            ? '#30D158'
            : '#34C759'
          : isDark
            ? '#48484A'
            : '#C7C7CC',
        backgroundColor: isChecked
          ? isDark
            ? '#30D158'
            : '#34C759'
          : 'transparent',
      },
      danger: {
        borderColor: isChecked
          ? isDark
            ? '#FF453A'
            : '#FF3B30'
          : isDark
            ? '#48484A'
            : '#C7C7CC',
        backgroundColor: isChecked
          ? isDark
            ? '#FF453A'
            : '#FF3B30'
          : 'transparent',
      },
    };

    const disabledStyles: ViewStyle = {
      opacity: 0.4,
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...(isDisabled && disabledStyles),
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      color: isDark ? '#FFFFFF' : '#000000',
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
    };

    const disabledStyles: TextStyle = {
      opacity: 0.4,
    };

    return {
      ...baseStyles,
      ...sizeTextStyles[size],
      ...(isDisabled && disabledStyles),
    };
  };

  const renderCheckmark = () => {
    if (!isChecked) return null;

    const checkmarkSize = getCheckboxSize() * 0.6;

    return (
      <View style={styles.checkmark}>
        <CustomText
          style={[
            styles.checkmarkText,
            {
              fontSize: checkmarkSize,
            },
          ]}
        >
          ✓
        </CustomText>
      </View>
    );
  };

  const renderCheckbox = () => (
    <View style={[getCheckboxStyles(), checkboxStyle]}>
      {renderCheckmark()}
    </View>
  );

  const renderLabel = () => {
    if (!label) return null;

    return (
      <CustomText style={[getTextStyles(), textStyle]}>{label}</CustomText>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {checkboxPosition === 'left' ? (
        <>
          {renderCheckbox()}
          {label && <View style={{ marginLeft: spacing }} />}
          {renderLabel()}
        </>
      ) : (
        <>
          {renderLabel()}
          {label && <View style={{ marginRight: spacing }} />}
          {renderCheckbox()}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
