import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ButtonExample } from './ButtonExample';
import { TextExample } from './TextExample';
import { InputExample } from './InputExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TextExample />
        <ButtonExample />
        <InputExample />
      </ScrollView>
    </SafeAreaView>
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
