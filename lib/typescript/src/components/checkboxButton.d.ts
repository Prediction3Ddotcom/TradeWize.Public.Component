import { type ViewStyle, type TextStyle, type StyleProp, type TouchableOpacityProps } from 'react-native';
export interface CheckboxButtonProps extends Omit<TouchableOpacityProps, 'style'> {
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
    customCheckmark?: React.ReactNode;
}
export declare function CheckboxButton({ label, isChecked, onChange, size, variant, isDisabled, checkboxPosition, style, textStyle, checkboxStyle, spacing, onPress, customCheckmark, ...props }: CheckboxButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=checkboxButton.d.ts.map