import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
export interface WheelDatePickerProps {
    initialDate: Date;
    isVisible: boolean;
    title?: string;
    helperText?: string;
    helperTextStyle?: StyleProp<TextStyle>;
    confirmButtonText?: string;
    confirmButtonTextStyle?: StyleProp<TextStyle>;
    confirmButtonStyle?: StyleProp<ViewStyle>;
    maxDate?: Date;
    minDate?: Date;
    customHeader?: React.ReactNode;
    customFooter?: React.ReactNode;
    confirmButtonOnPress?: (date: string) => void;
    cancelButtonText?: string;
    cancelButtonTextStyle?: StyleProp<TextStyle>;
    cancelButtonStyle?: StyleProp<ViewStyle>;
    cancelButtonOnPress?: () => void;
    contentStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    theme?: 'light' | 'dark';
}
declare const WheelDatePicker: ({ initialDate, isVisible, title, helperText, helperTextStyle, confirmButtonText, confirmButtonTextStyle, confirmButtonStyle, confirmButtonOnPress, cancelButtonText, cancelButtonTextStyle, cancelButtonStyle, cancelButtonOnPress, contentStyle, titleStyle, maxDate, minDate, customHeader, customFooter, theme, }: WheelDatePickerProps) => import("react/jsx-runtime").JSX.Element;
export default WheelDatePicker;
//# sourceMappingURL=WheelDatePicker.d.ts.map