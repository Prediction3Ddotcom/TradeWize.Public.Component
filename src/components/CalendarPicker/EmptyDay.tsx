import { View } from 'react-native';
import PropTypes from 'prop-types';

export default function EmptyDay(props: any) {
  const { styles } = props;
  return (
    <View style={styles.dayWrapper}>
      <View style={styles.dayButton} />
    </View>
  );
}

EmptyDay.propTypes = {
  styles: PropTypes.shape({}),
};
