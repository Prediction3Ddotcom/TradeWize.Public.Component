import { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { stylePropType } from './localPropTypes';
import Day from './Day';
import EmptyDay from './EmptyDay';

import { getISODay } from 'date-fns/getISODay';
import { Utils } from './Utils';

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
  constructor(props: any) {
    super(props);

    this.initMonthSettings = (params: any) => {
      const { month, year, showDayStragglers, firstDay = 0 } = params;

      // Retrieve total days in this month & year, accounting for leap years.
      const numDaysInMonth = Utils.getDaysInMonth(month, year);

      // Calculate days in prev month for day stragglers.
      let prevMonth, prevMonthYear;
      let numDaysInPrevMonth;
      if (showDayStragglers) {
        prevMonth = month - 1;
        prevMonthYear = year;
        if (prevMonth < 0) {
          prevMonth = 11;
          prevMonthYear--;
        }
        numDaysInPrevMonth = Utils.getDaysInMonth(prevMonth, prevMonthYear);
      }

      // Create a date for day one of the current given month and year
      const firstDayOfMonth = new Date(year, month, 1);

      // Determine which day of the week day 1 falls on.
      // See https://github.com/stephy/CalendarPicker/issues/49
      // isoWeekday() gets the ISO day of the week with 1=Monday and 7=Sunday.
      const firstWeekDay = getISODay(firstDayOfMonth);

      // Determine starting index based on first day of week prop.
      const startIndex =
        (firstDay > 0
          ? firstWeekDay + (Utils.FIRST_DAY_OFFSETS[firstDay] || 0)
          : firstWeekDay) % 7;

      return {
        maxWeekRows: 6,
        numDaysInWeek: 7,
        numDaysInMonth,
        numDaysInPrevMonth,
        firstDayOfMonth,
        firstWeekDay,
        startIndex,
      };
    };

    const monthSettings = this.initMonthSettings(props);
    this.state = {
      monthSettings,
      daysGrid: this.generateDaysGrid(monthSettings),
    };
  }

  componentDidUpdate(prevProps: any) {
    // Optimize re-renders by checking props, with special handling for selected dates.
    // Shallow compare prop changes, excluding selected dates.
    let excludedProps: string[] = [];

    // Avoid unecessary re-render when selecting date range
    if ((this.props as any).selectedEndDate) {
      excludedProps = ['selectedStartDate', 'selectedEndDate'];
    }

    const propDiffs = Utils.shallowDiff(this.props, prevProps, excludedProps);

    if (propDiffs.length) {
      // Recreate days
      const monthSettings = this.initMonthSettings(this.props);
      this.setState({
        monthSettings,
        daysGrid: this.generateDaysGrid(monthSettings),
      });
    } else {
      // Update daysGrid entries when selected date(s) affect this month.
      const { selectedStartDate, selectedEndDate } = this.props as any;
      const { selectedStartDate: prevSelStart, selectedEndDate: prevSelEnd } =
        prevProps;
      const { firstDayOfMonth } = (this.state as any).monthSettings;
      const isSelectedDiff =
        !Utils.compareDates(selectedStartDate, prevSelStart, 'day') ||
        !Utils.compareDates(selectedEndDate, prevSelEnd, 'day');
      // Check that selected date(s) match this month.
      if (
        isSelectedDiff &&
        (Utils.compareDates(selectedStartDate, firstDayOfMonth, 'month') ||
          Utils.compareDates(selectedEndDate, firstDayOfMonth, 'month') ||
          Utils.compareDates(prevSelStart, firstDayOfMonth, 'month') ||
          Utils.compareDates(prevSelEnd, firstDayOfMonth, 'month'))
      ) {
        // Range selection potentially affects all dates in the month. Recreate.
        if ((this.props as any).allowRangeSelection) {
          this.setState({
            daysGrid: this.generateDaysGrid((this.state as any).monthSettings),
          });
        } else {
          // Search for affected dates and modify those only
          const daysGrid = [...(this.state as any).daysGrid];
          const { year } = this.props as any;
          for (let i = 0; i < daysGrid.length; i++) {
            for (let j = 0; j < daysGrid[i].length; j++) {
              const { month, day } = daysGrid[i][j];
              // Empty days and stragglers can't be selected.
              if (month === undefined) {
                continue;
              }
              // Check single date
              const thisDay: any = { year, month, day };
              const isSelected = Utils.compareDates(
                selectedStartDate,
                thisDay,
                'day'
              );
              const isPrevSelected = Utils.compareDates(
                prevSelStart,
                thisDay,
                'day'
              );
              if (isSelected || isPrevSelected) {
                daysGrid[i][j] = this.renderDayInCurrentMonth(day);
              }
            }
          }
          this.setState({ daysGrid });
        }
      }
    }
  }

  renderDayInCurrentMonth(day: number) {
    return {
      day,
      month: (this.props as any).month,
      component: <Day key={day} day={day} {...(this.props as any)} />,
    };
  }

  renderEmptyDay(key: string) {
    return {
      component: (
        <EmptyDay key={'empty' + key} styles={(this.props as any).styles} />
      ),
    };
  }

  renderDayStraggler({ key, day }: { key: string; day: number }) {
    return {
      day,
      // month doesn't matter for stragglers as long as isn't set to current month
      component: (
        <Day
          key={key}
          day={day}
          styles={(this.props as any).styles}
          disabledDates={() => true}
          disabledDatesTextStyle={(this.props as any).disabledDatesTextStyle}
          textStyle={(this.props as any).textStyle}
        />
      ),
    };
  }

  // Create grid of days.
  generateDaysGrid = (params: any) => {
    const {
      numDaysInWeek,
      maxWeekRows,
      startIndex,
      numDaysInMonth,
      numDaysInPrevMonth,
    } = params;
    let daysGrid: any[][] = [[]];
    let dayOfMonth = 1;
    let dayNextMonth = 1;
    let lastFilledRow = 0;

    // Week rows
    for (let i = 0; i < maxWeekRows; i++) {
      daysGrid[i] = [];
      // Days in week
      for (let j = 0; j < numDaysInWeek; j++) {
        if (i === 0) {
          // first row: start current month's day on the correct weekday
          if (j >= startIndex) {
            if (dayOfMonth <= numDaysInMonth) {
              daysGrid[i]?.push(this.renderDayInCurrentMonth(dayOfMonth++));
            }
          } else {
            const key = '' + i + j;
            daysGrid[i]?.push(
              (this.props as any).showDayStragglers
                ? // Show previous month's days
                  this.renderDayStraggler({
                    key,
                    day: numDaysInPrevMonth - startIndex + j + 1,
                  })
                : //... otherwise blank
                  this.renderEmptyDay(key)
            );
          }
        } else {
          if (dayOfMonth <= numDaysInMonth) {
            lastFilledRow = i;
            daysGrid[i]?.push(this.renderDayInCurrentMonth(dayOfMonth++));
          } else {
            if ((this.props as any).showDayStragglers && i <= lastFilledRow) {
              // Show next month's days
              daysGrid[i]?.push(
                this.renderDayStraggler({
                  key: '' + i + j,
                  day: dayNextMonth++,
                })
              );
            }
          }
        }
      }
    }
    return daysGrid;
  };

  render() {
    const { styles } = this.props as any;
    const { daysGrid } = this.state as any;
    const renderedDaysGrid = daysGrid.map((weekRow: any[], i: number) => (
      <View key={i} style={styles.weekRow}>
        {weekRow?.map((day: any) => day.component)}
      </View>
    ));

    return <View style={styles.daysWrapper}>{renderedDaysGrid}</View>;
  }
}

DaysGridView.propTypes = {
  styles: stylePropType,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  onPressDay: PropTypes.func,
  firstDay: PropTypes.number,
  selectedDayStyle: stylePropType,
  selectedRangeStartStyle: stylePropType,
  selectedRangeStyle: stylePropType,
  selectedRangeEndStyle: stylePropType,
  todayTextStyle: stylePropType,
  selectedDayTextStyle: stylePropType,
  customDatesStyles: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]),
        containerStyle: stylePropType,
        style: stylePropType,
        textStyle: stylePropType,
      })
    ),
  ]),
  disabledDates: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  disabledDatesTextStyle: stylePropType,
  minRangeDuration: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  maxRangeDuration: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
};
