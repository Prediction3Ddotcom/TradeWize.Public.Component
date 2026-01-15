import { Component } from 'react';
export default class CalendarPicker extends Component<any, any> {
    constructor(props: any);
    static defaultProps: {
        initialDate: Date;
        scaleFactor: number;
        scrollable: boolean;
        scrollDecelerationRate: string;
        onDateChange: () => void;
        enableDateChange: boolean;
        headingLevel: number;
        sundayColor: string;
        customDatesStyles: never[];
        previousTitle: string;
        nextTitle: string;
        selectMonthTitle: string;
        selectYearTitle: string;
        horizontal: boolean;
        selectedDayStyle: null;
        selectedRangeStartStyle: null;
        selectedRangeEndStyle: null;
        selectedRangeStyle: null;
        selectedMonthStyle: null;
        selectedMonthTextStyle: null;
        fontScaling: boolean;
    };
    componentDidUpdate(prevProps: any): void;
    updateScaledStyles: (props: any) => {
        styles: {
            containerWidth: any;
            containerHeight: any;
            calendar: {
                height: number;
                marginTop: number;
            };
            dayButton: {
                width: number;
                height: number;
                borderRadius: number;
                alignSelf: string;
                justifyContent: string;
            };
            dayLabel: {
                fontSize: number;
                color: string;
                alignSelf: string;
            };
            selectedDayLabel: {
                color: any;
            };
            dayLabelsWrapper: {
                flexDirection: string;
                borderBottomWidth: number;
                borderTopWidth: number;
                paddingTop: number;
                paddingBottom: number;
                alignSelf: string;
                justifyContent: string;
                backgroundColor: string;
                borderColor: string;
            };
            daysWrapper: {
                alignSelf: string;
                justifyContent: string;
            };
            dayLabels: {
                width: number;
                fontSize: number;
                color: string;
                textAlign: string;
            };
            selectedDay: {
                width: number;
                height: number;
                borderRadius: number;
                alignSelf: string;
                justifyContent: string;
            };
            selectedDayBackground: {
                backgroundColor: any;
            };
            selectedToday: {
                width: number;
                height: number;
                backgroundColor: any;
                borderRadius: number;
                alignSelf: string;
                justifyContent: string;
            };
            dayWrapper: {
                alignItems: string;
                justifyContent: string;
                width: number;
                height: number;
                backgroundColor: string;
            };
            startDayWrapper: {
                width: number;
                height: number;
                borderTopLeftRadius: number;
                borderBottomLeftRadius: number;
                backgroundColor: any;
                alignSelf: string;
                justifyContent: string;
            };
            endDayWrapper: {
                width: number;
                height: number;
                borderTopRightRadius: number;
                borderBottomRightRadius: number;
                backgroundColor: any;
                alignSelf: string;
                justifyContent: string;
            };
            inRangeDay: {
                width: number;
                height: number;
                backgroundColor: any;
                alignSelf: string;
                justifyContent: string;
            };
            headerWrapper: {
                flexDirection: string;
                alignItems: string;
                alignSelf: string;
                justifyContent: string;
                width: any;
                padding: number;
                paddingBottom: number;
                marginBottom: number;
                backgroundColor: string;
            };
            monthYearHeaderWrapper: {
                flexDirection: string;
                justifyContent: string;
                alignItems: string;
                paddingHorizontal: number;
            };
            previousContainer: {
                marginLeft: number;
            };
            nextContainer: {
                marginRight: number;
                alignItems: string;
            };
            navButtonText: {
                fontSize: number;
            };
            weeks: {
                flexDirection: string;
            };
            weekRow: {
                flexDirection: string;
            };
            disabledText: {
                fontSize: number;
                color: string;
                alignSelf: string;
                justifyContent: string;
            };
            selectedDisabledText: {
                fontSize: number;
                color: string;
                alignSelf: string;
                justifyContent: string;
            };
            monthHeaderMainText: {
                fontSize: number;
                color: string;
                textAlign: string;
                marginHorizontal: number;
            };
            monthButton: {
                width: number;
                height: number;
                borderRadius: number;
                alignSelf: string;
                justifyContent: string;
            };
            monthsHeaderText: {
                flex: number;
                fontSize: number;
                color: string;
                textAlign: string;
            };
            monthContainer: {
                flex: number;
                alignItems: string;
                paddingVertical: number;
                paddingHorizontal: number;
            };
            selectedMonthContainer: {
                backgroundColor: any;
                borderRadius: number;
            };
            monthText: {
                fontSize: number;
                color: string;
                alignSelf: string;
            };
            selectedMonthText: {
                color: any;
                fontWeight: string;
            };
            monthsWrapper: {
                alignSelf: string;
                justifyContent: string;
                width: any;
            };
            monthsRow: {
                flexDirection: string;
                padding: number;
            };
            yearHeaderMainText: {
                fontSize: number;
                color: string;
                marginHorizontal: number;
            };
            yearContainer: {
                flex: number;
                alignItems: string;
            };
            yearText: {
                fontSize: number;
                color: string;
                alignSelf: string;
            };
            yearsHeaderText: {
                fontSize: number;
                color: string;
                width: number;
                textAlign: string;
            };
            yearsWrapper: {
                alignSelf: string;
                justifyContent: string;
                width: any;
            };
            yearsRow: {
                flexDirection: string;
                padding: number;
            };
        };
    };
    updateMonthYear: (initialDate: any, updateState: any) => {
        currentMonth: number;
        currentYear: number;
    };
    updateDisabledDates: (_disabledDates?: any) => {
        disabledDates: any;
    };
    updateMinMaxRanges: (_minRangeDuration: any, _maxRangeDuration: any) => {
        minRangeDuration: any;
        maxRangeDuration: any;
    };
    goToDate: (date?: Date, options?: any) => void;
    handleOnPressDay: ({ year, month, day }: any) => void;
    handleOnPressPrevious: () => void;
    handleOnPressNext: () => void;
    handleOnPressFinisher: ({ year, month, scrollFinisher, extraState, }: any) => void;
    handleOnPressYear: () => void;
    handleOnPressMonth: () => void;
    handleOnSelectMonthYear: ({ month, year }: any) => void;
    resetSelections: () => void;
    createMonthProps: (state: any) => {
        onPressDay: ({ year, month, day }: any) => void;
        month: any;
        year: any;
        styles: any;
        disabledDates: any;
        minDate: any;
        maxDate: any;
        minRangeDuration: any;
        maxRangeDuration: any;
        selectedStartDate: any;
        selectedEndDate: any;
        enableDateChange: any;
        firstDay: any;
        allowRangeSelection: any;
        allowBackwardRangeSelect: any;
        showDayStragglers: any;
        disabledDatesTextStyle: any;
        textStyle: any;
        todayTextStyle: any;
        selectedDayTextStyle: any;
        selectedRangeStartTextStyle: any;
        selectedRangeEndTextStyle: any;
        selectedDayStyle: any;
        selectedDisabledDatesTextStyle: any;
        selectedRangeStartStyle: any;
        selectedRangeStyle: any;
        selectedRangeEndStyle: any;
        customDatesStyles: any;
        fontScaling: any;
    };
    createMonths: (props: any, { currentMonth, currentYear }: any) => never[] | {
        monthsList: Date[];
        initialScrollerIndex: number;
    };
    renderMonth(props: any): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
//# sourceMappingURL=index.d.ts.map