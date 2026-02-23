import { View, Text, Platform } from 'react-native';
import Controls from './Controls';

import { getYear } from 'date-fns/getYear';

interface YearsHeaderProps {
  styles: any;
  textStyle: any;
  headingLevel: number;
  startYear: number;
  endYear: number;
  minDate: Date | null;
  maxDate: Date | null;
  restrictNavigation: boolean;
  previousComponent: React.ReactNode;
  nextComponent: React.ReactNode;
  previousTitle: string;
  nextTitle: string;
  previousTitleStyle: any;
  nextTitleStyle: any;
  onYearViewPrevious: () => void;
  onYearViewNext: () => void;
}

export default function YearsHeader(props: YearsHeaderProps) {
  const {
    startYear,
    endYear,
    maxDate,
    minDate,
    restrictNavigation,
    styles,
    textStyle,
    previousComponent,
    nextComponent,
    previousTitle,
    nextTitle,
    previousTitleStyle,
    nextTitleStyle,
    onYearViewPrevious,
    onYearViewNext,
    headingLevel,
  } = props;

  const disablePrevious = !!(
    restrictNavigation &&
    minDate &&
    getYear(minDate) >= startYear
  );
  const disableNext = !!(
    restrictNavigation &&
    maxDate &&
    getYear(maxDate) <= endYear
  );

  const accessibilityProps: any = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={styles.headerWrapper}>
      <Controls
        disabled={disablePrevious}
        label={previousTitle}
        component={previousComponent}
        onPressControl={onYearViewPrevious}
        styles={styles.previousContainer}
        textStyles={[styles.navButtonText, textStyle, previousTitleStyle]}
      />
      <Text style={[styles.yearsHeaderText, textStyle]} {...accessibilityProps}>
        {`${startYear} – ${endYear}`}
      </Text>
      <Controls
        disabled={disableNext}
        label={nextTitle}
        component={nextComponent}
        onPressControl={onYearViewNext}
        styles={styles.nextContainer}
        textStyles={[styles.navButtonText, textStyle, nextTitleStyle]}
      />
    </View>
  );
}
