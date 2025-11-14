import { type StyleProp, type ViewStyle } from 'react-native';
export interface InfinitePickerProps {
    items?: string[];
    infiniteLoop?: boolean;
    selectedIndex?: number;
    onValueChange?: (event: {
        nativeEvent: {
            value: string;
            index: number;
            numericValue: number;
        };
    }) => void;
    style?: StyleProp<ViewStyle>;
}
export interface WheelMonthYearPickerProps {
    initialDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    title?: string;
    stylePickerContainer?: StyleProp<ViewStyle>;
    textConfirm?: string;
    textCancel?: string;
    styleButtonConfirm?: StyleProp<ViewStyle>;
    styleButtonCancel?: StyleProp<ViewStyle>;
    indicatorColor?: string;
    wheelMonthData?: string[];
    stylePickerIosItem?: StyleProp<ViewStyle>;
    customHeader?: React.ReactNode;
    handleSelectedDate?: (date: string) => void;
    onCancel?: () => void;
}
declare const WheelMonthYearPicker: (props: WheelMonthYearPickerProps) => import("react/jsx-runtime").JSX.Element;
export default WheelMonthYearPicker;
//# sourceMappingURL=WheelMonthYearPicker.d.ts.map