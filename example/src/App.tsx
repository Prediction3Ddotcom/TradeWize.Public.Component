import { ScrollView, StyleSheet } from 'react-native';
import { ButtonExample } from './ButtonExample';
import { TextExample } from './TextExample';
import { InputExample } from './InputExample';
import SelectBoxExample from './SelectBoxExample';
import BaseContainer from '../../src/components/baseContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderBase from '../../src/components/header';

export default function App() {
  return (
    <SafeAreaProvider>
      <BaseContainer style={styles.container}>
        <HeaderBase title="Component Examples" />
        <ScrollView>
          <TextExample />
          <ButtonExample />
          <InputExample />
          <SelectBoxExample />
        </ScrollView>
      </BaseContainer>
    </SafeAreaProvider>
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
