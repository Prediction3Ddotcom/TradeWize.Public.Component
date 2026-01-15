/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import PropTypes from 'prop-types';

interface ControlsProps {
  styles: StyleProp<ViewStyle>;
  textStyles: StyleProp<TextStyle>;
  label: string;
  component: React.ReactNode;
  onPressControl: () => void;
  disabled: boolean;
}

export default function Controls(props: ControlsProps) {
  const { onPressControl, styles, textStyles, label, component, disabled } =
    props;

  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
      style={styles}
      disabled={disabled}
      hitSlop={{ top: 20, bottom: 20, left: 40, right: 40 }}
    >
      <View style={{ opacity: disabled ? 0 : 1 }}>
        {component || <Text style={[textStyles]}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  onPressControl: PropTypes.func.isRequired,
};
