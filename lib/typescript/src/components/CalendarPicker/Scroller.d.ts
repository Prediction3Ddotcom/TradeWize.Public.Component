import { Component } from 'react';
import PropTypes from 'prop-types';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
export default class CalendarScroller extends Component<any, any> {
    static propTypes: {
        data: PropTypes.Validator<any[]>;
        initialRenderIndex: PropTypes.Requireable<number>;
        renderMonth: PropTypes.Requireable<(...args: any[]) => any>;
        renderMonthParams: PropTypes.Validator<object>;
        minDate: PropTypes.Requireable<any>;
        maxDate: PropTypes.Requireable<any>;
        maxSimultaneousMonths: PropTypes.Requireable<number>;
        horizontal: PropTypes.Requireable<boolean>;
        updateMonthYear: PropTypes.Requireable<(...args: any[]) => any>;
        onMonthChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        data: never[];
        renderMonthParams: {
            styles: {};
        };
    };
    updateLayout: (dims: any) => {
        layoutProvider: LayoutProvider;
        itemHeight: any;
        itemWidth: any;
    };
    dataProvider: DataProvider;
    updateMonthsData: (data: any) => {
        data: any;
        numMonths: any;
        dataProvider: any;
    };
    rlv: any;
    shifting: any;
    constructor(props: any);
    shouldComponentUpdate(prevProps: any, prevState: any): boolean;
    componentDidUpdate(prevProps: any): void;
    goToDate: (date: any, delay: any) => void;
    scrollLeft: () => void;
    scrollRight: () => void;
    shiftMonthsForward: (currentMonth: any) => void;
    shiftMonthsBackward: (currentMonth: any) => void;
    shiftMonths: (currentMonth: any, offset: any) => void;
    updateMonths: (prevVisMonth: any, newStartMonth: any) => void;
    onVisibleIndicesChanged: (all: any, now: any) => void;
    onLayout: (event: any) => void;
    rowRenderer: (_type: any, rowMonth: any, _i: any, extState: any) => any;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
//# sourceMappingURL=Scroller.d.ts.map