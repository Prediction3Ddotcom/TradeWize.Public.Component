import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ButtonExample } from './ButtonExample';
import { TextExample } from './TextExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TextExample />
        <ButtonExample />
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
