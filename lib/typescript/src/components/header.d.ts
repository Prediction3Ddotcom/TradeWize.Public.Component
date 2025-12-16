import React from 'react';
import { type ViewStyle, type TextStyle } from 'react-native';
export interface HeaderAction {
    icon?: React.ReactNode;
    label?: string;
    onPress?: () => void;
}
export interface HeaderBaseProps {
    title?: string | React.ReactNode;
    titleAlign?: 'left' | 'center' | 'right';
    leftActions?: HeaderAction[];
    rightActions?: HeaderAction[];
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    height?: number;
    backgroundColor?: string;
    border?: boolean;
    styleButtonLeft?: ViewStyle;
    colorIconLeft?: string;
    showDefaultLeft?: boolean;
    onPressBack?: () => void;
    renderCustomContent?: () => React.ReactNode;
}
declare const HeaderBase: React.FC<HeaderBaseProps>;
export default HeaderBase;
//# sourceMappingURL=header.d.ts.map