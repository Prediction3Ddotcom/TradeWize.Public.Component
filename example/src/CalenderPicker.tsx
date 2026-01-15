import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Switch,
} from 'react-native';

import { addDays } from 'date-fns/addDays';
import { format } from 'date-fns/format';
import { subDays } from 'date-fns/subDays';

import CalendarPicker from '../../src/components/CalendarPicker';

export default class App extends Component {
  constructor(props: any) {
    super(props);

    let minDate = subDays(new Date(), 15);
    let day = minDate;
    let customDatesStyles = [];
    for (let i = 0; i < 30; i++) {
      customDatesStyles.push({
        date: day,
        // Random colors
        style: {
          backgroundColor:
            '#' +
            (
              '#00000' + ((Math.random() * (64 << 22)) | 32768).toString(16)
            ).slice(-6),
        },
        textStyle: { color: 'black' }, // sets the font color
        containerStyle: [], // extra styling for day container
      });
      day = addDays(day, 1);
    }

    this.state = {
      customDatesStyles,
      enableRangeSelect: false,
      minDate,
      maxDate: addDays(new Date(), 90),
      minRangeDuration: '1',
      maxRangeDuration: '5',
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.clear = this.clear.bind(this);
    this.toggleEnableRange = this.toggleEnableRange.bind(this);
    this.onMinRangeDuration = this.onMinRangeDuration.bind(this);
    this.onMaxRangeDuration = this.onMaxRangeDuration.bind(this);
    this.goToToday = this.goToToday.bind(this);

    (this as any).calendarPickerRef = React.createRef();
  }

  onDateChange(date: any, type: string) {
    if (type === 'START_DATE') {
      this.setState({
        selectedStartDate: date,
      });
    } else {
      this.setState({
        selectedEndDate: date,
      });
    }
  }

  clear() {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  toggleEnableRange() {
    this.setState({
      enableRangeSelect: !(this.state as any).enableRangeSelect,
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  onMinRangeDuration(val: any) {
    let parsedVal = parseInt(val);
    this.setState({
      minRangeDuration: val && !isNaN(parsedVal) ? parsedVal + '' : undefined,
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  onMaxRangeDuration(val: any) {
    let parsedVal = parseInt(val);
    this.setState({
      maxRangeDuration: val && !isNaN(parsedVal) ? parsedVal + '' : undefined,
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  customDayHeaderStylesCallback({ dayOfWeek }: any) {
    switch (dayOfWeek) {
      case 4: // Thursday
        return {
          style: {
            borderRadius: 12,
            backgroundColor: 'cyan',
          },
          textStyle: {
            color: 'blue',
            fontWeight: 'bold',
          },
        };
    }
  }

  goToToday() {
    (this as any).calendarPickerRef.current.goToDate(new Date(), {
      isSelected: false,
    });
  }

  render() {
    const {
      customDatesStyles,
      enableRangeSelect,
      minDate,
      // maxDate,
      minRangeDuration,
      maxRangeDuration,
      selectedStartDate,
      selectedEndDate,
    } = this.state as any;
    const formattedStartDate = selectedStartDate
      ? format(selectedStartDate, 'yyyy-MM-dd')
      : '';
    const formattedEndDate = selectedEndDate
      ? format(selectedEndDate, 'yyyy-MM-dd')
      : '';

    return (
      <View style={styles.container}>
        <CalendarPicker
          ref={(this as any).calendarPickerRef}
          scrollable
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={(this as any).onDateChange}
          initialDate={minDate}
          customDatesStyles={customDatesStyles}
          customDayHeaderStyles={this.customDayHeaderStylesCallback}
          // minDate={minDate}
          // maxDate={maxDate}
          allowRangeSelection={enableRangeSelect}
          allowBackwardRangeSelect={enableRangeSelect}
          minRangeDuration={minRangeDuration && parseInt(minRangeDuration)}
          maxRangeDuration={maxRangeDuration && parseInt(maxRangeDuration)}
          headerWrapperStyle={styles.headerWrapperStyle}
          selectedMonthStyle={styles.selectedMonthStyle}
          selectedMonthTextStyle={styles.selectedMonthTextStyle}
          selectedYearStyle={styles.selectedYearStyle}
          selectedYearTextStyle={styles.selectedYearTextStyle}
        />

        <View style={styles.topSpacing}>
          <Button onPress={this.goToToday} title="Go to Today" />
        </View>

        <View style={styles.topSpacing}>
          <Text style={styles.text}>
            Selected (Start) date: {formattedStartDate}
          </Text>
          {!!formattedEndDate && (
            <Text style={styles.text}>
              Selected End date: {formattedEndDate}
            </Text>
          )}
        </View>

        <View style={styles.topSpacing}>
          <Button onPress={this.clear} title="Clear Selection" />
        </View>

        <View style={styles.topSpacing}>
          <Text style={styles.text}>Range select:</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={enableRangeSelect ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={this.toggleEnableRange}
          value={enableRangeSelect}
        />

        {enableRangeSelect && (
          <View>
            <Text style={styles.text}>minRangeDuration:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onMinRangeDuration}
              value={minRangeDuration || ''}
              keyboardType={'number-pad'}
            />

            <Text style={styles.text}>maxRangeDuration:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onMaxRangeDuration}
              value={maxRangeDuration || ''}
              keyboardType={'number-pad'}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
    alignItems: 'center',
  },
  topSpacing: {
    marginTop: 20,
  },
  text: {
    fontSize: 24,
  },
  textInput: {
    height: 40,
    fontSize: 24,
    borderColor: 'gray',
    borderWidth: 1,
  },
  headerWrapperStyle: {
    backgroundColor: '#ffbdab',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  selectedMonthStyle: {
    backgroundColor: 'red',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedMonthTextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedYearStyle: {
    backgroundColor: 'red',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedYearTextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
