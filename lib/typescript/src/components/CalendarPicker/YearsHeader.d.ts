interface YearsHeaderProps {
    styles: any;
    textStyle: any;
    headingLevel: number;
    startYear: number;
    endYear: number;
    minDate: Date | null;
    maxDate: Date | null;
    restrictNavigation: boolean;
    previousComponent: React.ReactNode;
    nextComponent: React.ReactNode;
    previousTitle: string;
    nextTitle: string;
    previousTitleStyle: any;
    nextTitleStyle: any;
    onYearViewPrevious: () => void;
    onYearViewNext: () => void;
}
export default function YearsHeader(props: YearsHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=YearsHeader.d.ts.map