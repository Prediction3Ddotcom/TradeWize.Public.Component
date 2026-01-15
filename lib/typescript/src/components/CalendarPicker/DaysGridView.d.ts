import { Component } from 'react';
export default class DaysGridView extends Component {
    initMonthSettings: (props: any) => {
        maxWeekRows: number;
        numDaysInWeek: number;
        numDaysInMonth: any;
        numDaysInPrevMonth: any;
        firstDayOfMonth: Date;
        firstWeekDay: number;
        startIndex: number;
    };
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    renderDayInCurrentMonth(day: number): {
        day: number;
        month: any;
        component: import("react/jsx-runtime").JSX.Element;
    };
    renderEmptyDay(key: string): {
        component: import("react/jsx-runtime").JSX.Element;
    };
    renderDayStraggler({ key, day }: {
        key: string;
        day: number;
    }): {
        day: number;
        component: import("react/jsx-runtime").JSX.Element;
    };
    generateDaysGrid: (params: any) => any[][];
    render(): import("react/jsx-runtime").JSX.Element;
}
//# sourceMappingURL=DaysGridView.d.ts.map