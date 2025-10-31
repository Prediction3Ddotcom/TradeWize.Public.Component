import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
export interface WheelDatePickerProps {
    date: Date;
    isVisible: boolean;
    title?: string;
    helperText?: string;
    helperTextStyle?: StyleProp<TextStyle>;
    confirmButtonText?: string;
    confirmButtonTextStyle?: StyleProp<TextStyle>;
    confirmButtonStyle?: StyleProp<ViewStyle>;
    confirmButtonOnPress?: (date: string) => void;
    cancelButtonText?: string;
    cancelButtonTextStyle?: StyleProp<TextStyle>;
    cancelButtonStyle?: StyleProp<ViewStyle>;
    cancelButtonOnPress?: () => void;
    contentStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}
declare const WheelDatePicker: ({ date, isVisible, title, helperText, helperTextStyle, confirmButtonText, confirmButtonTextStyle, confirmButtonStyle, confirmButtonOnPress, cancelButtonText, cancelButtonTextStyle, cancelButtonStyle, cancelButtonOnPress, contentStyle, titleStyle, }: WheelDatePickerProps) => import("react/jsx-runtime").JSX.Element;
export default WheelDatePicker;
//# sourceMappingURL=WheelDatePicker.d.ts.map