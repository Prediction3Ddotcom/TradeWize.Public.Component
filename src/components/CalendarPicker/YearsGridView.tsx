import { View } from 'react-native';
import Year from './Year';

interface YearsGridViewProps {
  startYear: number;
  yearsPerPage: number;
  currentMonth: number;
  currentYear: number;
  styles: any;
  onSelectYear: (params: { month: number; year: number }) => void;
  textStyle: any;
  minDate: Date | null;
  maxDate: Date | null;
  selectedYearStyle: any;
  selectedYearTextStyle: any;
}

export default function YearsGridView(props: YearsGridViewProps) {
  const {
    startYear,
    yearsPerPage,
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

  const columns = 3;
  const rows = Math.ceil(yearsPerPage / columns);

  const grid: number[][] = [];
  let year = startYear;
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < columns; c++) {
      if (year < startYear + yearsPerPage) {
        row.push(year);
        year++;
      }
    }
    grid.push(row);
  }

  return (
    <View style={styles.yearsWrapper}>
      {grid.map((rowYears, rowIndex) => (
        <View key={`year-row-${rowIndex}`} style={styles.yearsRow}>
          {rowYears.map((y) => (
            <Year
              key={y}
              year={y}
              currentMonth={currentMonth}
              currentYear={currentYear}
              styles={styles}
              onSelectYear={onSelectYear}
              minDate={minDate}
              maxDate={maxDate}
              textStyle={textStyle}
              selectedYearStyle={selectedYearStyle}
              selectedYearTextStyle={selectedYearTextStyle}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
