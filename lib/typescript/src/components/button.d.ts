import { type ViewStyle, type TextStyle, type TouchableOpacityProps, type StyleProp } from 'react-native';
import type { ReactNode } from 'react';
export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    title?: string;
    children?: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    iconOnly?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    isLoading?: boolean;
    isDisabled?: boolean;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconSpacing?: number;
    customButtonStyle?: StyleProp<ViewStyle>;
}
export declare function Button({ title, children, leftIcon, rightIcon, iconOnly, variant, size, isLoading, isDisabled, fullWidth, style, textStyle, iconSpacing, onPress, customButtonStyle, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=button.d.ts.map