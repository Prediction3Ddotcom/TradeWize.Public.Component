// Parent view for Month selector

import { Component } from 'react';
import { View } from 'react-native';
import MonthsGridView from './MonthsGridView';
import MonthsHeader from './MonthsHeader';

export default class MonthSelector extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentYear: props.currentYear,
    };
  }

  render() {
    const {
      styles,
      textStyle,
      title,
      headingLevel,
      currentYear,
      currentMonth,
      months,
      minDate,
      maxDate,
      onSelectMonth,
      selectedMonthStyle,
      selectedMonthTextStyle,
    } = this.props as any;

    return (
      <View style={styles.calendar}>
        <MonthsHeader
          styles={styles}
          textStyle={textStyle}
          title={title + currentYear}
          headingLevel={headingLevel}
        />
        <MonthsGridView
          styles={styles}
          textStyle={textStyle}
          currentYear={currentYear}
          currentMonth={currentMonth}
          months={months}
          minDate={minDate}
          maxDate={maxDate}
          onSelectMonth={onSelectMonth}
          selectedMonthStyle={selectedMonthStyle}
          selectedMonthTextStyle={selectedMonthTextStyle}
        />
      </View>
    );
  }
}
