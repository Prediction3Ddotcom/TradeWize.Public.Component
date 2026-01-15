import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { makeStyles } from './makeStyles';
import { Utils } from './Utils';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';
import Scroller from './Scroller';

import { addMonths } from 'date-fns/addMonths';
import { getMonth } from 'date-fns/getMonth';
import { getYear } from 'date-fns/getYear';
import { isAfter } from 'date-fns/isAfter';
import { isBefore } from 'date-fns/isBefore';
import { isSameDay } from 'date-fns/isSameDay';
import { isSameMonth } from 'date-fns/isSameMonth';
import { startOfMonth } from 'date-fns/startOfMonth';
import { subMonths } from 'date-fns/subMonths';

export interface CustomDateStyle {
  date: Date | string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface RangeDuration {
  date: Date | string;
  minDuration?: number;
  maxDuration?: number;
}

export interface CalendarPickerProps {
  // Date configuration
  initialDate?: Date | string;
  selectedStartDate?: Date | string | null;
  selectedEndDate?: Date | string | null;
  minDate?: Date | string | null;
  maxDate?: Date | string | null;
  initialView?: 'days' | 'months' | 'years';

  // Disabled dates
  disabledDates?: (Date | string)[] | ((date: Date) => boolean) | null;

  // Range selection
  allowRangeSelection?: boolean;
  allowBackwardRangeSelect?: boolean;
  minRangeDuration?: RangeDuration[] | number | null;
  maxRangeDuration?: RangeDuration[] | number | null;

  // Layout & dimensions
  width?: number | null;
  height?: number | null;
  scaleFactor?: number;
  horizontal?: boolean;

  // Styling - colors
  selectedDayColor?: string;
  selectedDayTextColor?: string;
  todayBackgroundColor?: string;
  sundayColor?: string;
  dayShape?: string;

  // Styling - text styles
  textStyle?: StyleProp<TextStyle>;
  todayTextStyle?: StyleProp<TextStyle>;
  selectedDayTextStyle?: StyleProp<TextStyle>;
  selectedRangeStartTextStyle?: StyleProp<TextStyle>;
  selectedRangeEndTextStyle?: StyleProp<TextStyle>;
  disabledDatesTextStyle?: StyleProp<TextStyle>;
  selectedDisabledDatesTextStyle?: StyleProp<TextStyle>;
  monthTitleStyle?: StyleProp<TextStyle>;
  yearTitleStyle?: StyleProp<TextStyle>;
  previousTitleStyle?: StyleProp<TextStyle>;
  nextTitleStyle?: StyleProp<TextStyle>;

  // Styling - view styles
  selectedDayStyle?: StyleProp<ViewStyle> | null;
  selectedRangeStartStyle?: StyleProp<ViewStyle> | null;
  selectedRangeEndStyle?: StyleProp<ViewStyle> | null;
  selectedRangeStyle?: StyleProp<ViewStyle> | null;
  selectedMonthStyle?: StyleProp<ViewStyle> | null;
  selectedMonthTextStyle?: StyleProp<TextStyle> | null;
  selectedYearStyle?: StyleProp<ViewStyle> | null;
  selectedYearTextStyle?: StyleProp<TextStyle> | null;
  monthYearHeaderWrapperStyle?: StyleProp<ViewStyle>;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  dayLabelsWrapper?: StyleProp<ViewStyle>;
  customDayHeaderStyles?:
    | StyleProp<ViewStyle>
    | ((params: { dayOfWeek: number; month: number; year: number }) => {
        style?: StyleProp<ViewStyle>;
        textStyle?: StyleProp<TextStyle>;
      } | null);

  // Custom date styles
  customDatesStyles?:
    | CustomDateStyle[]
    | ((date: Date) => CustomDateStyle | null)
    | [];

  // Scrollable configuration
  scrollable?: boolean;
  scrollDecelerationRate?: 'normal' | 'fast';
  scrollDecelarationRate?: 'normal' | 'fast'; // Note: typo in original prop name

  // Navigation
  restrictMonthNavigation?: boolean;
  startFromMonday?: boolean;
  firstDay?: number;
  showDayStragglers?: boolean;

  // Localization
  weekdays?: string[];
  months?: string[];
  previousTitle?: string;
  nextTitle?: string;
  selectMonthTitle?: string;
  selectYearTitle?: string;

  // Custom components
  previousComponent?: React.ReactNode;
  nextComponent?: React.ReactNode;

  // Callbacks
  onDateChange?: (
    date: Date | null,
    type: typeof Utils.START_DATE | typeof Utils.END_DATE
  ) => void;
  onMonthChange?: (date: Date) => void;

  // Other
  enableDateChange?: boolean;
  headingLevel?: number;
  fontScaling?: boolean;
}

export class CalendarPicker extends Component<CalendarPickerProps, any> {
  constructor(props: any) {
    super(props);
    (this as any).numMonthsScroll = 60; // 5 years
    this.state = {
      currentMonth: null,
      currentYear: null,
      currentView: props.initialView || 'days',
      selectedStartDate:
        props.selectedStartDate && new Date(props.selectedStartDate),
      selectedEndDate: props.selectedEndDate && new Date(props.selectedEndDate),
      minDate: props.minDate && new Date(props.minDate),
      maxDate: props.maxDate && new Date(props.maxDate),
      styles: {},
      ...(this as any).updateScaledStyles(props),
      ...(this as any).updateMonthYear(props.initialDate),
      ...this.updateDisabledDates(props.disabledDates),
      ...this.updateMinMaxRanges(
        props.minRangeDuration,
        props.maxRangeDuration
      ),
      ...(this as any).createMonths(props, {}),
    };
    (this.state as any).renderMonthParams = this.createMonthProps(
      this.state as any
    );
    (Text as any).defaultProps = {
      ...(Text as any).defaultProps,
      allowFontScaling: props.fontScaling,
    };
  }

  static defaultProps = {
    initialDate: new Date(),
    scaleFactor: 375,
    scrollable: false,
    scrollDecelerationRate: 'normal',
    onDateChange: () => {
      console.log('onDateChange() not provided');
    },
    enableDateChange: true,
    headingLevel: 1,
    sundayColor: '#FFFFFF',
    customDatesStyles: [],
    previousTitle: 'Previous',
    nextTitle: 'Next',
    selectMonthTitle: 'Select Month in ',
    selectYearTitle: 'Select Year',
    horizontal: true,
    selectedDayStyle: null,
    selectedRangeStartStyle: null,
    selectedRangeEndStyle: null,
    selectedRangeStyle: null,
    selectedMonthStyle: null,
    selectedMonthTextStyle: null,
    selectedYearStyle: null,
    selectedYearTextStyle: null,
    fontScaling: true,
  };

  componentDidUpdate(prevProps: any) {
    let doStateUpdate = false;

    let newStyles = {};
    if (
      prevProps.width !== (this.props as any).width ||
      prevProps.height !== (this.props as any).height
    ) {
      newStyles = (this as any).updateScaledStyles(this.props);
      doStateUpdate = true;
    }

    let newMonthYear = {};

    if (!isSameDay(prevProps.initialDate, (this.props as any).initialDate)) {
      newMonthYear = (this as any).updateMonthYear(
        (this.props as any).initialDate
      );
      doStateUpdate = true;
    }

    let selectedDateRanges = {};
    const { selectedStartDate, selectedEndDate } = this.props as any;
    if (
      selectedStartDate !== prevProps.selectedStartDate ||
      selectedEndDate !== prevProps.selectedEndDate
    ) {
      selectedDateRanges = {
        selectedStartDate: selectedStartDate && new Date(selectedStartDate),
        selectedEndDate: selectedEndDate && new Date(selectedEndDate),
      };
      doStateUpdate = true;
    }

    let disabledDates = {};
    if (prevProps.disabledDates !== (this.props as any).disabledDates) {
      disabledDates = (this as any).updateDisabledDates(
        (this.props as any).disabledDates
      );
      doStateUpdate = true;
    }

    let rangeDurations = {};
    if (
      prevProps.minRangeDuration !== (this.props as any).minRangeDuration ||
      prevProps.maxRangeDuration !== (this.props as any).maxRangeDuration
    ) {
      const { minRangeDuration, maxRangeDuration } = this.props as any;
      rangeDurations = (this as any).updateMinMaxRanges(
        minRangeDuration,
        maxRangeDuration
      );
      doStateUpdate = true;
    }

    let minMaxDates: any = {};
    if (
      prevProps.minDate !== (this.props as any).minDate ||
      prevProps.minDate !== (this.props as any).minDate
    ) {
      minMaxDates.minDate =
        (this.props as any).minDate && new Date((this.props as any).minDate);
      minMaxDates.maxDate =
        (this.props as any).maxDate && new Date((this.props as any).maxDate);
      doStateUpdate = true;
    }

    if (prevProps.customDatesStyles !== (this.props as any).customDatesStyles) {
      // Update renderMonthParams on customDatesStyles change
      doStateUpdate = true;
    }

    if (doStateUpdate) {
      const newState = {
        ...newStyles,
        ...newMonthYear,
        ...selectedDateRanges,
        ...disabledDates,
        ...rangeDurations,
        ...minMaxDates,
      };
      let renderMonthParams = {};
      const _state = { ...this.state, ...newState };
      renderMonthParams = this.createMonthProps(_state);
      this.setState({ ...newState, renderMonthParams });
    }
  }

  updateScaledStyles = (props: any) => {
    const {
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width,
      height,
      dayShape,
    } = props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width ? width : Dimensions.get('window').width;
    const containerHeight = height ? height : Dimensions.get('window').height;
    return {
      styles: makeStyles({
        containerWidth,
        containerHeight,
        scaleFactor,
        selectedDayColor,
        selectedDayTextColor,
        todayBackgroundColor,
        dayShape,
      }),
    };
  };

  updateMonthYear = (
    initialDate = (this.props as any).initialDate,
    updateState: any
  ) => {
    const newState = {
      currentMonth: parseInt(getMonth(new Date(initialDate)).toString(), 10),
      currentYear: parseInt(getYear(new Date(initialDate)).toString(), 10),
    };
    if (updateState) {
      this.setState(newState);
    }
    return newState;
  };

  updateDisabledDates = (_disabledDates: any = []) => {
    let disabledDates: any = [];
    if (_disabledDates) {
      if (Array.isArray(_disabledDates)) {
        // Convert input date into timestamp
        _disabledDates.map((date) => {
          let thisDate = new Date(date);
          thisDate.setHours(12, 0, 0, 0);
          disabledDates.push(thisDate.valueOf());
        });
      } else if (_disabledDates instanceof Function) {
        disabledDates = _disabledDates;
      }
    }
    return { disabledDates };
  };

  updateMinMaxRanges = (_minRangeDuration: any, _maxRangeDuration: any) => {
    let minRangeDuration = [];
    let maxRangeDuration = [];

    if (_minRangeDuration) {
      if (Array.isArray(_minRangeDuration)) {
        _minRangeDuration.map((mrd) => {
          let thisDate = new Date(mrd.date);
          thisDate.setHours(12, 0, 0, 0);
          minRangeDuration.push({
            date: thisDate.valueOf(),
            minDuration: mrd.minDuration,
          });
        });
      } else {
        minRangeDuration = _minRangeDuration;
      }
    }

    if (_maxRangeDuration) {
      if (Array.isArray(_maxRangeDuration)) {
        _maxRangeDuration.map((mrd) => {
          let thisDate = new Date(mrd.date);
          thisDate.setHours(12, 0, 0, 0);
          maxRangeDuration.push({
            date: thisDate.valueOf(),
            maxDuration: mrd.maxDuration,
          });
        });
      } else {
        maxRangeDuration = _maxRangeDuration;
      }
    }
    return { minRangeDuration, maxRangeDuration };
  };

  goToDate = (date = new Date(), options: any = {}) => {
    if ((this.props as any).scrollable) {
      console.error('goToDate() is not supported when scrollable is true');
      return;
    }

    const defaultOptions = {
      /*
       * isSelected - if true, the date will be shown as selected.
       * useful when you have different style for today and selected date.
       */
      isSelected: true,
      ...options,
    };

    const cloneDate = new Date(date);
    const fullYear = cloneDate.getFullYear();
    const fullMonth = cloneDate.getMonth();
    const fullDay = cloneDate.getDate();

    if (
      !(Utils as any).isSameMonthAndYear(
        cloneDate,
        (this.state as any).selectedStartDate
      )
    ) {
      if (defaultOptions.isSelected) {
        (this as any).handleOnPressDay({
          year: fullYear,
          month: fullMonth,
          day: fullDay,
          setAsCurrentDate: true,
        });
        const currentMonthYear = new Date(fullYear, fullMonth, 1, 12);
        (this.props as any).onMonthChange &&
          (this.props as any).onMonthChange(currentMonthYear);
      } else {
        this.handleOnPressFinisher({
          year: fullYear,
          month: fullMonth,
          scrollFinisher: null,
          extraState: null,
        });
      }
    } else {
      // the date is in the same month and year as the selected date

      if (defaultOptions.isSelected) {
        this.handleOnPressDay({
          year: fullYear,
          month: fullMonth,
          day: fullDay,
        });
      }
    }
  };

  handleOnPressDay = ({ year, month, day }: any) => {
    const {
      selectedStartDate: prevSelectedStartDate,
      selectedEndDate: prevSelectedEndDate,
    } = this.state as any;

    const {
      allowRangeSelection,
      allowBackwardRangeSelect,
      enableDateChange,
      onDateChange,
    } = this.props as any;

    if (!enableDateChange) {
      return;
    }

    const date = new Date(year, month, day, 12);

    if (allowRangeSelection && prevSelectedStartDate && !prevSelectedEndDate) {
      if (isAfter(date, prevSelectedStartDate)) {
        const selectedStartDate = prevSelectedStartDate;
        const selectedEndDate = date;
        this.setState({
          selectedEndDate,
          renderMonthParams: this.createMonthProps({
            ...this.state,
            selectedStartDate,
            selectedEndDate,
          }),
        });
        // Sync end date with parent
        onDateChange(date, Utils.END_DATE);
      } else if (allowBackwardRangeSelect) {
        // date is before selectedStartDate
        // Flip dates so that start is always before end.
        const selectedEndDate = new Date(prevSelectedStartDate);
        const selectedStartDate = date;
        this.setState(
          {
            selectedStartDate,
            selectedEndDate,
            renderMonthParams: this.createMonthProps({
              ...this.state,
              selectedStartDate,
              selectedEndDate,
            }),
          },
          () => {
            // Sync both start and end dates with parent *after* state update.
            onDateChange(
              (this.state as any).selectedStartDate,
              Utils.START_DATE
            );
            onDateChange((this.state as any).selectedEndDate, Utils.END_DATE);
          }
        );
      }
    } else {
      const syncEndDate = !!prevSelectedEndDate;
      const selectedStartDate = date;
      const selectedEndDate = null;
      this.setState(
        {
          selectedStartDate,
          selectedEndDate,
          renderMonthParams: this.createMonthProps({
            ...this.state,
            selectedStartDate,
            selectedEndDate,
          }),
        },
        () => {
          // Sync start date with parent *after* state update.
          onDateChange((this.state as any).selectedStartDate, Utils.START_DATE);
          if (syncEndDate) {
            // sync end date with parent - must be cleared if previously set.
            onDateChange(null, Utils.END_DATE);
          }
        }
      );
    }
  };

  handleOnPressPrevious = () => {
    const { currentMonth, currentYear } = this.state as any;
    let previousMonth = currentMonth - 1;
    let year = currentYear;
    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    if (previousMonth < 0) {
      previousMonth = 11;
      year--;
    }
    const scrollFinisher =
      (this.props as any).scrollable && (this as any).scroller.scrollLeft;
    (this as any).handleOnPressFinisher({
      year,
      month: previousMonth,
      scrollFinisher,
    });
  };

  handleOnPressNext = () => {
    const { currentMonth, currentYear } = this.state as any;
    let nextMonth = currentMonth + 1;
    let year = currentYear;
    // if nextMonth is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    if (nextMonth > 11) {
      nextMonth = 0;
      year++;
    }
    const scrollFinisher =
      (this.props as any).scrollable && (this as any).scroller.scrollRight;
    (this as any).handleOnPressFinisher({
      year,
      month: nextMonth,
      scrollFinisher,
    });
  };

  handleOnPressFinisher = ({
    year,
    month,
    scrollFinisher,
    extraState,
  }: any) => {
    if (scrollFinisher) {
      scrollFinisher();
    } else {
      const currentMonth = parseInt(month, 10);
      const currentYear = parseInt(year, 10);
      const renderMonthParams = extraState || {
        renderMonthParams: {
          ...(this.state as any).renderMonthParams,
          month,
          year,
        },
      };
      this.setState({ currentMonth, currentYear, ...renderMonthParams });
    }
    const currentMonthYear = new Date(year, month, 1, 12);
    (this.props as any).onMonthChange &&
      (this.props as any).onMonthChange(currentMonthYear);
  };

  handleOnPressYear = () => {
    this.setState({
      currentView: 'years',
    });
  };

  handleOnPressMonth = () => {
    this.setState({
      currentView: 'months',
    });
  };

  handleOnSelectMonthYear = ({ month, year }: any) => {
    const currentYear = year;
    const currentMonth = month;
    const scrollableState = (this.props as any).scrollable
      ? {
          ...this.createMonths(this.props, { currentYear, currentMonth }),
        }
      : {};

    const extraState = {
      renderMonthParams: {
        ...(this.state as any).renderMonthParams,
        month,
        year,
      },
      currentView: 'days',
      ...scrollableState,
    };

    this.handleOnPressFinisher({ month, year, extraState });
  };

  resetSelections = () => {
    this.setState((state: any) => ({
      selectedStartDate: null,
      selectedEndDate: null,
      renderMonthParams: {
        ...(state as any).renderMonthParams,
        selectedStartDate: null,
        selectedEndDate: null,
      },
    }));
  };

  createMonthProps = (state: any) => {
    return {
      onPressDay: this.handleOnPressDay,
      month: state.currentMonth,
      year: state.currentYear,
      styles: (state as any).styles,
      disabledDates: (state as any).disabledDates,
      minDate: (state as any).minDate,
      maxDate: (state as any).maxDate,
      minRangeDuration: (state as any).minRangeDuration,
      maxRangeDuration: (state as any).maxRangeDuration,
      selectedStartDate: (state as any).selectedStartDate,
      selectedEndDate: (state as any).selectedEndDate,
      enableDateChange: (this.props as any).enableDateChange,
      firstDay: (this.props as any).startFromMonday
        ? 1
        : (this.props as any).firstDay,
      allowRangeSelection: (this.props as any).allowRangeSelection,
      allowBackwardRangeSelect: (this.props as any).allowBackwardRangeSelect,
      showDayStragglers: (this.props as any).showDayStragglers,
      disabledDatesTextStyle: (this.props as any).disabledDatesTextStyle,
      textStyle: (this.props as any).textStyle,
      todayTextStyle: (this.props as any).todayTextStyle,
      selectedDayTextStyle: (this.props as any).selectedDayTextStyle,
      selectedRangeStartTextStyle: (this.props as any)
        .selectedRangeStartTextStyle,
      selectedRangeEndTextStyle: (this.props as any).selectedRangeEndTextStyle,
      selectedDayStyle: (this.props as any).selectedDayStyle,
      selectedDisabledDatesTextStyle: (this.props as any)
        .selectedDisabledDatesTextStyle,
      selectedRangeStartStyle: (this.props as any).selectedRangeStartStyle,
      selectedRangeStyle: (this.props as any).selectedRangeStyle,
      selectedRangeEndStyle: (this.props as any).selectedRangeEndStyle,
      customDatesStyles: (this.props as any).customDatesStyles,
      fontScaling: (this.props as any).fontScaling,
    };
  };

  createMonths = (props: any, { currentMonth, currentYear }: any) => {
    if (!props.scrollable) {
      return [];
    }

    const { initialDate, minDate, maxDate, restrictMonthNavigation } = props;

    let monthsList = [];
    let numMonths = (this as any).numMonthsScroll;
    let initialScrollerIndex = 0;

    // Center start month in scroller.  Visible month is either the initialDate
    // prop, or the current month & year that has been selected.
    let _initialDate =
      Number.isInteger(currentMonth) &&
      Number.isInteger(currentYear) &&
      new Date(currentYear, currentMonth, 1, 12);
    _initialDate = _initialDate || initialDate;
    let firstScrollerMonth = subMonths(_initialDate as Date, numMonths / 2);
    if (
      minDate &&
      restrictMonthNavigation &&
      isBefore(startOfMonth(firstScrollerMonth), startOfMonth(minDate))
    ) {
      firstScrollerMonth = new Date(minDate);
    }

    for (let i = 0; i < numMonths; i++) {
      let month = addMonths(firstScrollerMonth, i);
      if (
        maxDate &&
        restrictMonthNavigation &&
        isAfter(startOfMonth(month), startOfMonth(maxDate))
      ) {
        break;
      }
      if (isSameMonth(month, _initialDate as Date)) {
        initialScrollerIndex = i;
      }
      monthsList.push(month);
    }

    return {
      monthsList,
      initialScrollerIndex,
    };
  };

  renderMonth(props: any) {
    return <DaysGridView {...props} />;
  }

  render() {
    const {
      currentView,
      currentMonth,
      currentYear,
      minDate,
      maxDate,
      styles,
      monthsList,
      renderMonthParams,
      initialScrollerIndex,
    } = this.state as any;

    const {
      startFromMonday,
      firstDay,
      initialDate,
      weekdays,
      months,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      monthTitleStyle,
      yearTitleStyle,
      textStyle,
      restrictMonthNavigation,
      headingLevel,
      dayLabelsWrapper,
      customDayHeaderStyles,
      selectMonthTitle,
      selectYearTitle,
      monthYearHeaderWrapperStyle,
      headerWrapperStyle,
      onMonthChange,
      scrollable,
      horizontal,
      scrollDecelarationRate,
      selectedMonthStyle,
      selectedMonthTextStyle,
      selectedYearStyle,
      selectedYearTextStyle,
    } = this.props as any;

    let content;
    switch (currentView) {
      case 'months':
        content = (
          <MonthSelector
            styles={styles}
            textStyle={textStyle}
            title={selectMonthTitle}
            currentYear={currentYear}
            currentMonth={currentMonth}
            months={months}
            minDate={minDate}
            maxDate={maxDate}
            onSelectMonth={this.handleOnSelectMonthYear}
            headingLevel={headingLevel}
            selectedMonthStyle={selectedMonthStyle}
            selectedMonthTextStyle={selectedMonthTextStyle}
          />
        );
        break;
      case 'years':
        content = (
          <YearSelector
            styles={styles}
            textStyle={textStyle}
            title={selectYearTitle}
            initialDate={new Date(initialDate)}
            currentMonth={currentMonth}
            currentYear={currentYear}
            minDate={minDate}
            maxDate={maxDate}
            restrictNavigation={restrictMonthNavigation}
            previousComponent={previousComponent}
            nextComponent={nextComponent}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            previousTitleStyle={previousTitleStyle}
            nextTitleStyle={nextTitleStyle}
            onSelectYear={this.handleOnSelectMonthYear}
            headingLevel={headingLevel}
            selectedYearStyle={selectedYearStyle}
            selectedYearTextStyle={selectedYearTextStyle}
          />
        );
        break;
      default:
        content = (
          <View style={styles.calendar}>
            <HeaderControls
              styles={styles}
              currentMonth={currentMonth}
              currentYear={currentYear}
              initialDate={new Date(initialDate)}
              onPressPrevious={this.handleOnPressPrevious}
              onPressNext={this.handleOnPressNext}
              onPressMonth={this.handleOnPressMonth}
              onPressYear={this.handleOnPressYear}
              months={months}
              previousComponent={previousComponent}
              nextComponent={nextComponent}
              previousTitle={previousTitle}
              nextTitle={nextTitle}
              previousTitleStyle={previousTitleStyle}
              nextTitleStyle={nextTitleStyle}
              monthTitleStyle={monthTitleStyle}
              yearTitleStyle={yearTitleStyle}
              textStyle={textStyle}
              restrictMonthNavigation={restrictMonthNavigation}
              minDate={minDate}
              maxDate={maxDate}
              headingLevel={headingLevel}
              monthYearHeaderWrapperStyle={monthYearHeaderWrapperStyle}
              headerWrapperStyle={headerWrapperStyle}
            />
            <Weekdays
              styles={styles}
              firstDay={startFromMonday ? 1 : firstDay}
              currentMonth={currentMonth}
              currentYear={currentYear}
              weekdays={weekdays}
              textStyle={textStyle}
              dayLabelsWrapper={dayLabelsWrapper}
              customDayHeaderStyles={customDayHeaderStyles}
            />
            {scrollable ? (
              <Scroller
                ref={(scroller: any) => ((this as any).scroller = scroller)}
                data={monthsList}
                renderMonth={this.renderMonth}
                renderMonthParams={renderMonthParams}
                maxSimultaneousMonths={(this as any).numMonthsScroll}
                initialRenderIndex={initialScrollerIndex}
                minDate={minDate}
                maxDate={maxDate}
                restrictMonthNavigation={restrictMonthNavigation}
                updateMonthYear={this.updateMonthYear}
                onMonthChange={onMonthChange}
                horizontal={horizontal}
                scrollDecelarationRate={scrollDecelarationRate}
              />
            ) : (
              this.renderMonth(renderMonthParams)
            )}
          </View>
        );
    }

    return content;
  }
}
