import { View } from 'react-native';
import PropTypes from 'prop-types';
import Month from './Month';

export default function MonthsGridView(props: any) {
  const {
    currentYear,
    currentMonth,
    months,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
    selectedMonthStyle,
    selectedMonthTextStyle,
  } = props as any;
  const _months = Array.from(Array(12).keys());
  const columnArray = [0, 1, 2];
  const rowArray = [0, 1, 2, 3];

  function generateColumns() {
    const column = columnArray.map((index) => {
      const monthIndex = _months.shift();
      return (
        <Month
          key={monthIndex !== undefined ? monthIndex + index : index}
          currentMonth={monthIndex}
          selectedMonth={currentMonth}
          currentYear={currentYear}
          months={months}
          styles={styles}
          onSelectMonth={onSelectMonth}
          minDate={minDate}
          maxDate={maxDate}
          textStyle={textStyle}
          selectedMonthStyle={selectedMonthStyle}
          selectedMonthTextStyle={selectedMonthTextStyle}
        />
      );
    });
    return column;
  }

  return (
    <View style={styles.monthsWrapper}>
      {rowArray.map((index) => (
        <View key={index} style={styles.monthsRow}>
          {generateColumns()}
        </View>
      ))}
    </View>
  );
}

MonthsGridView.propTypes = {
  styles: PropTypes.shape({}),
  currentYear: PropTypes.number.isRequired,
  months: PropTypes.array,
  onSelectMonth: PropTypes.func,
};
