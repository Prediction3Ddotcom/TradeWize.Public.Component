export interface DatePickerModalProps {
    openDatePicker: boolean;
    setOpenDatePicker: (open: boolean) => void;
    setDate: (date: Date) => void;
    onChangeDate: (date: Date) => void;
    title: string;
    confirmButtonText: string;
    cancelButtonText: string;
    dividerColor: string;
    maxDate: Date;
    minDate: Date;
    initialDate: Date;
}
declare const DatePickerModal: ({ openDatePicker, setOpenDatePicker, onChangeDate, title, confirmButtonText, cancelButtonText, dividerColor, maxDate, minDate, initialDate, }: DatePickerModalProps) => import("react/jsx-runtime").JSX.Element;
export default DatePickerModal;
//# sourceMappingURL=modalDatePicker.d.ts.map