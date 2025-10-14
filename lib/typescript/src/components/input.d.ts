import { type ViewStyle, type TextStyle, type TextInputProps } from 'react-native';
import type { ReactNode } from 'react';
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
    borderColorActive?: string;
    borderColorError?: string;
    borderColor?: string;
    onRightIconPress?: () => void;
    onLeftIconPress?: () => void;
}
export declare function Input({ label, helperText, errorText, leftIcon, rightIcon, variant, size, isDisabled, isError, isRequired, fullWidth, containerStyle, inputStyle, labelStyle, borderColorActive, borderColorError, borderColor, onRightIconPress, onLeftIconPress, onFocus, onBlur, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=input.d.ts.map