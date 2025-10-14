import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Text } from 'tradewize-component';
import { Icon } from './Icon';

export function InputExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const [errorInput, setErrorInput] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="h3" style={styles.sectionTitle}>
        Input Component Examples
      </Text>

      {/* Basic Inputs */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          Basic Inputs
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Username"
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
          helperText="Must be at least 3 characters"
          containerStyle={styles.input}
        />
      </View>

      {/* Variants */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          Variants
        </Text>

        <Input
          label="Outline (Default)"
          placeholder="Outline variant"
          variant="outline"
        />

        <Input
          label="Filled"
          placeholder="Filled variant"
          variant="filled"
          containerStyle={styles.input}
        />

        <Input
          label="Underline"
          placeholder="Underline variant"
          variant="underline"
          containerStyle={styles.input}
        />
      </View>

      {/* Sizes */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          Sizes
        </Text>

        <Input label="Small" placeholder="Small input" size="small" />

        <Input
          label="Medium (Default)"
          placeholder="Medium input"
          size="medium"
          containerStyle={styles.input}
        />

        <Input
          label="Large"
          placeholder="Large input"
          size="large"
          containerStyle={styles.input}
        />
      </View>

      {/* With Icons */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          With Icons
        </Text>

        <Input
          label="Search"
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          leftIcon={<Icon name="search" />}
          rightIcon={search ? <Icon name="x" /> : undefined}
          onRightIconPress={() => setSearch('')}
        />

        <Input
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          leftIcon={<Icon name="lock" />}
          rightIcon={<Icon name={showPassword ? 'eye-off' : 'eye'} />}
          onRightIconPress={() => setShowPassword(!showPassword)}
          containerStyle={styles.input}
        />
      </View>

      {/* States */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          States
        </Text>

        <Input
          label="Required Field"
          placeholder="This is required"
          isRequired
        />

        <Input
          label="Disabled"
          placeholder="Disabled input"
          value="Cannot edit this"
          isDisabled
          containerStyle={styles.input}
        />

        <Input
          label="Error State"
          placeholder="Enter value"
          value={errorInput}
          onChangeText={setErrorInput}
          isError
          errorText="This field has an error"
          containerStyle={styles.input}
        />

        <Input
          label="With Helper Text"
          placeholder="Enter something"
          helperText="This is a helpful message"
          containerStyle={styles.input}
        />
      </View>

      {/* Multiline */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          Multiline
        </Text>

        <Input
          label="Description"
          placeholder="Enter description..."
          multiline
          numberOfLines={4}
          containerStyle={styles.input}
        />
      </View>

      {/* Full Width */}
      <View style={styles.section}>
        <Text variant="h5" style={styles.subtitle}>
          Full Width Control
        </Text>

        <Input
          label="Full Width (Default)"
          placeholder="Full width input"
          fullWidth
        />

        <Input
          label="Custom Width"
          placeholder="Custom width"
          fullWidth={false}
          containerStyle={styles.customWidth}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  subtitle: {
    marginBottom: 16,
  },
  input: {
    marginTop: 16,
  },
  customWidth: {
    width: 200,
    marginTop: 16,
  },
});
