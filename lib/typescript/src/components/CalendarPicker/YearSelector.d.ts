import React from 'react';
interface YearSelectorProps {
    styles: any;
    textStyle: any;
    title: string;
    initialDate: Date;
    currentMonth: number;
    currentYear: number;
    minDate: Date | null;
    maxDate: Date | null;
    restrictNavigation: boolean;
    previousComponent: React.ReactNode;
    nextComponent: React.ReactNode;
    previousTitle: string;
    nextTitle: string;
    previousTitleStyle: any;
    nextTitleStyle: any;
    onSelectYear: (params: {
        month: number;
        year: number;
    }) => void;
    headingLevel: number;
    selectedYearStyle: any;
    selectedYearTextStyle: any;
}
export default function YearSelector(props: YearSelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=YearSelector.d.ts.map