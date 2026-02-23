interface YearsGridViewProps {
    startYear: number;
    yearsPerPage: number;
    currentMonth: number;
    currentYear: number;
    styles: any;
    onSelectYear: (params: {
        month: number;
        year: number;
    }) => void;
    textStyle: any;
    minDate: Date | null;
    maxDate: Date | null;
    selectedYearStyle: any;
    selectedYearTextStyle: any;
}
export default function YearsGridView(props: YearsGridViewProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=YearsGridView.d.ts.map