import { type TextStyle, type TextProps as RNTextProps, type StyleProp } from 'react-native';
import type { ReactNode } from 'react';
export interface TextProps extends Omit<RNTextProps, 'style'> {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodySmall' | 'caption' | 'overline' | 'button' | 'label';
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error' | 'success' | 'warning';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right' | 'justify';
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    allowFontScaling?: boolean;
}
export declare function CustomText({ children, variant, color, weight, align, numberOfLines, style, allowFontScaling, // Tắt font scaling để không phụ thuộc vào cỡ chữ device
...props }: TextProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=text.d.ts.map