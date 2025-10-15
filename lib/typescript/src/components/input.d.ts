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
    inputContainerStyle?: ViewStyle;
    borderColorActive?: string;
    borderColorError?: string;
    borderColor?: string;
    autoCorrect?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoComplete?: ('additional-name' | 'address-line1' | 'address-line2' | 'birthdate-day' | 'birthdate-full' | 'birthdate-month' | 'birthdate-year' | 'cc-csc' | 'cc-exp' | 'cc-exp-day' | 'cc-exp-month' | 'cc-exp-year' | 'cc-number' | 'cc-name' | 'cc-given-name' | 'cc-middle-name' | 'cc-family-name' | 'cc-type' | 'country' | 'current-password' | 'email' | 'family-name' | 'gender' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'name' | 'name-family' | 'name-given' | 'name-middle' | 'name-middle-initial' | 'name-prefix' | 'name-suffix' | 'new-password' | 'nickname' | 'one-time-code' | 'organization' | 'organization-title' | 'password' | 'password-new' | 'postal-address' | 'postal-address-country' | 'postal-address-extended' | 'postal-address-extended-postal-code' | 'postal-address-locality' | 'postal-address-region' | 'postal-code' | 'street-address' | 'sms-otp' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-device' | 'url' | 'username' | 'username-new' | 'off') | undefined;
    spellCheck?: boolean;
    onRightIconPress?: () => void;
    onLeftIconPress?: () => void;
}
export declare function Input({ label, helperText, errorText, leftIcon, rightIcon, variant, size, isDisabled, isError, isRequired, fullWidth, containerStyle, inputStyle, labelStyle, inputContainerStyle, borderColorActive, borderColorError, borderColor, onRightIconPress, onLeftIconPress, onFocus, onBlur, autoCorrect, // Tắt tự động sửa lỗi chính tả
autoCapitalize, // Không tự động viết hoa
autoComplete, // Tắt gợi ý tự động (Android/iOS)
spellCheck, // Tắt kiểm tra chính tả
...props }: InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=input.d.ts.map