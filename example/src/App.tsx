import { ScrollView, StyleSheet } from 'react-native';
import { ButtonExample } from './ButtonExample';
import { CheckboxButtonExample } from './CheckboxButtonExample';
import { TextExample } from './TextExample';
import { InputExample } from './InputExample';
import DatePickerExample from './DatePickerExample';
import WheelDatePickerExample from './WheelDatePickerExample';
import BottomSelectorExample from './BottomSelectorExample';
// import MonthYearPickerExample from './MonthYearPickerExample';
import BaseContainer from '../../src/components/baseContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderBase from '../../src/components/header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
// import CalenderPicker from './CalenderPicker';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <BaseContainer style={styles.container}>
            <HeaderBase title="Component Examples" />
            <ScrollView>
              <TextExample />
              <ButtonExample />
              <CheckboxButtonExample />
              <InputExample />
              <DatePickerExample />
              <WheelDatePickerExample />
              <BottomSelectorExample />
              {/* <MonthYearPickerExample /> */}
            </ScrollView>
          </BaseContainer>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
});
