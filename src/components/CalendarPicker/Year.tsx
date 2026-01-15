import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { getMonth } from 'date-fns/getMonth';
import { getYear } from 'date-fns/getYear';
import { isAfter } from 'date-fns/isAfter';
import { isBefore } from 'date-fns/isBefore';
import { startOfMonth } from 'date-fns/startOfMonth';

export default function Year(props: any) {
  const {
    year,
    currentMonth,
    currentYear,
    styles,
    onSelectYear,
    textStyle,
    minDate,
    maxDate,
    selectedYearStyle,
    selectedYearTextStyle,
  } = props;

  let yearOutOfRange;
  let yearIsBeforeMin = false;
  let yearIsAfterMax = false;
  let yearIsDisabled = false;

  // Check whether year is outside of min/max range.
  if (maxDate) {
    yearIsAfterMax = year > getYear(maxDate);
  }
  if (minDate) {
    yearIsBeforeMin = year < getYear(minDate);
  }

  // ToDo: disabledYears props to disable years separate from disabledDates

  yearOutOfRange = yearIsAfterMax || yearIsBeforeMin || yearIsDisabled;

  const isSelected = currentYear === year;

  const onSelect = () => {
    // Guard against navigating to months beyond min/max dates.
    let month = currentMonth;
    let currentMonthYear = new Date(currentYear, month);
    if (maxDate && isAfter(currentMonthYear, startOfMonth(maxDate))) {
      month = getMonth(maxDate);
    }
    if (minDate && isBefore(currentMonthYear, startOfMonth(minDate))) {
      month = getMonth(minDate);
    }
    onSelectYear({ month, year });
  };

  return (
    <View
      style={[
        styles.yearContainer,
        isSelected && styles.selectedYearContainer,
        isSelected && selectedYearStyle,
      ]}
    >
      {!yearOutOfRange ? (
        <TouchableOpacity onPress={onSelect}>
          <Text
            style={[
              styles.yearText,
              textStyle,
              isSelected && styles.selectedYearText,
              isSelected && selectedYearTextStyle,
            ]}
          >
            {year}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={[textStyle, styles.disabledText]}>{year}</Text>
      )}
    </View>
  );
}

Year.propTypes = {
  styles: PropTypes.shape({}),
  year: PropTypes.number,
  onSelectYear: PropTypes.func,
};
