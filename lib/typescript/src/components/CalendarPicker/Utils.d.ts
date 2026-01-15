/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
export declare const Utils: {
    START_DATE: string;
    END_DATE: string;
    WEEKDAYS: string[];
    MONTHS: string[];
    MAX_ROWS: number;
    MAX_COLUMNS: number;
    FIRST_DAY_OFFSETS: number[];
    getDaysInMonth: (month: number, year: number) => number;
    isSameMonthAndYear: (date: Date, month: number, year: number) => boolean;
    shallowDiff: (a: any, b: any, exclusions?: string[]) => string[];
    compareDates: (a: Date, b: Date, granularity: "day" | "month") => boolean;
    getWeekdays: (firstDay?: number) => (string | undefined)[];
    getISOWeekdaysOrder: (firstDay?: number) => number[];
};
//# sourceMappingURL=Utils.d.ts.map