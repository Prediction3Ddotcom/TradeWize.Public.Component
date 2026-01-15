import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { stylePropType } from './localPropTypes';

export default function MonthsHeader(props: any) {
  const { styles, textStyle, headingLevel, title } = props;

  const accessibilityProps: any = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={styles.headerWrapper}>
      <Text style={[styles.monthsHeaderText, textStyle]}>{title}</Text>
    </View>
  );
}

MonthsHeader.propTypes = {
  styles: stylePropType,
  textStyle: stylePropType,
  title: PropTypes.string,
};
