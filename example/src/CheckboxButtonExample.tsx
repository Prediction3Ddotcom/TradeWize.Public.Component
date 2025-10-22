import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CheckboxButton, Text } from 'tradewize-component';

export function CheckboxButtonExample() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Checkbox</Text>
        <CheckboxButton
          label="Accept terms and conditions"
          isChecked={isChecked1}
          onChange={setIsChecked1}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <CheckboxButton
          label="Small checkbox"
          size="small"
          isChecked={isChecked2}
          onChange={setIsChecked2}
        />
        <CheckboxButton
          label="Medium checkbox"
          size="medium"
          isChecked={isChecked2}
          onChange={setIsChecked2}
          style={styles.spacing}
        />
        <CheckboxButton
          label="Large checkbox"
          size="large"
          isChecked={isChecked2}
          onChange={setIsChecked2}
          style={styles.spacing}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variants</Text>
        <CheckboxButton
          label="Default variant"
          variant="default"
          isChecked={isChecked3}
          onChange={setIsChecked3}
        />
        <CheckboxButton
          label="Primary variant"
          variant="primary"
          isChecked={isChecked3}
          onChange={setIsChecked3}
          style={styles.spacing}
        />
        <CheckboxButton
          label="Success variant"
          variant="success"
          isChecked={isChecked3}
          onChange={setIsChecked3}
          style={styles.spacing}
        />
        <CheckboxButton
          label="Danger variant"
          variant="danger"
          isChecked={isChecked3}
          onChange={setIsChecked3}
          style={styles.spacing}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Checkbox Position</Text>
        <CheckboxButton
          label="Checkbox on left"
          checkboxPosition="left"
          isChecked={isChecked4}
          onChange={setIsChecked4}
        />
        <CheckboxButton
          label="Checkbox on right"
          checkboxPosition="right"
          isChecked={isChecked5}
          onChange={setIsChecked5}
          style={styles.spacing}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <CheckboxButton
          label="Disabled unchecked"
          isChecked={false}
          isDisabled={true}
        />
        <CheckboxButton
          label="Disabled checked"
          isChecked={true}
          isDisabled={true}
          style={styles.spacing}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Without Label</Text>
        <CheckboxButton isChecked={isChecked6} onChange={setIsChecked6} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences Form Example</Text>
        <View style={styles.form}>
          <CheckboxButton
            label="Push notifications"
            isChecked={preferences.notifications}
            onChange={(checked) =>
              setPreferences((prev) => ({ ...prev, notifications: checked }))
            }
            variant="primary"
          />
          <CheckboxButton
            label="Email updates"
            isChecked={preferences.emailUpdates}
            onChange={(checked) =>
              setPreferences((prev) => ({ ...prev, emailUpdates: checked }))
            }
            variant="primary"
            style={styles.spacing}
          />
          <CheckboxButton
            label="Dark mode"
            isChecked={preferences.darkMode}
            onChange={(checked) =>
              setPreferences((prev) => ({ ...prev, darkMode: checked }))
            }
            variant="primary"
            style={styles.spacing}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <CheckboxButton
          label="Custom styled checkbox"
          isChecked={isChecked3}
          onChange={setIsChecked3}
          style={{ paddingVertical: 12 }}
          textStyle={{ fontSize: 18, fontWeight: 'bold' }}
          checkboxStyle={{ borderRadius: 12 }}
          spacing={16}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  spacing: {
    marginTop: 12,
  },
  form: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
});
