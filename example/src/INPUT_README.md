# Input Component

A fully-featured, customizable input component for React Native with support for various styles, sizes, icons, and states.

## Features

- ✨ Multiple variants (outline, filled, underline)
- 📏 Three size options (small, medium, large)
- 🎨 Dark mode support
- 🔒 Built-in validation states (error, disabled, required)
- 🎯 Left and right icon support
- 📝 Label, helper text, and error text
- ♿ Accessibility-friendly
- 🎪 Multiline support
- 🎭 Fully typed with TypeScript

## Installation

```typescript
import { Input } from 'tradewize-component';
```

## Basic Usage

```tsx
import { Input } from 'tradewize-component';

function MyComponent() {
  const [email, setEmail] = useState('');

  return (
    <Input
      label="Email"
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />
  );
}
```

## Props

| Prop               | Type                                   | Default     | Description                          |
| ------------------ | -------------------------------------- | ----------- | ------------------------------------ |
| `label`            | `string`                               | -           | Label text displayed above the input |
| `placeholder`      | `string`                               | -           | Placeholder text                     |
| `value`            | `string`                               | -           | Input value                          |
| `onChangeText`     | `(text: string) => void`               | -           | Called when text changes             |
| `variant`          | `'outline' \| 'filled' \| 'underline'` | `'outline'` | Visual style variant                 |
| `size`             | `'small' \| 'medium' \| 'large'`       | `'medium'`  | Size of the input                    |
| `isDisabled`       | `boolean`                              | `false`     | Whether the input is disabled        |
| `isError`          | `boolean`                              | `false`     | Whether the input is in error state  |
| `isRequired`       | `boolean`                              | `false`     | Shows required indicator (\*)        |
| `fullWidth`        | `boolean`                              | `true`      | Whether input takes full width       |
| `helperText`       | `string`                               | -           | Helper text displayed below input    |
| `errorText`        | `string`                               | -           | Error text (overrides helperText)    |
| `leftIcon`         | `ReactNode`                            | -           | Icon displayed on the left           |
| `rightIcon`        | `ReactNode`                            | -           | Icon displayed on the right          |
| `onLeftIconPress`  | `() => void`                           | -           | Called when left icon is pressed     |
| `onRightIconPress` | `() => void`                           | -           | Called when right icon is pressed    |
| `containerStyle`   | `ViewStyle`                            | -           | Style for the outer container        |
| `inputStyle`       | `TextStyle`                            | -           | Style for the input field            |
| `labelStyle`       | `TextStyle`                            | -           | Style for the label                  |

All standard `TextInput` props are also supported.

## Examples

### Variants

```tsx
// Outline (default)
<Input label="Outline" variant="outline" />

// Filled
<Input label="Filled" variant="filled" />

// Underline
<Input label="Underline" variant="underline" />
```

### Sizes

```tsx
<Input label="Small" size="small" />
<Input label="Medium" size="medium" />
<Input label="Large" size="large" />
```

### With Icons

```tsx
import { Icon } from './Icon';

// Search input
<Input placeholder="Search..." leftIcon={<Icon name="search" />} />;

// Password input with toggle
const [showPassword, setShowPassword] = useState(false);

<Input
  label="Password"
  secureTextEntry={!showPassword}
  leftIcon={<Icon name="lock" />}
  rightIcon={<Icon name={showPassword ? 'eye-off' : 'eye'} />}
  onRightIconPress={() => setShowPassword(!showPassword)}
/>;
```

### States

```tsx
// Required field
<Input label="Email" isRequired />

// Disabled
<Input label="Username" isDisabled value="John Doe" />

// Error state
<Input
  label="Email"
  isError
  errorText="Please enter a valid email"
/>

// With helper text
<Input
  label="Password"
  helperText="Must be at least 8 characters"
/>
```

### Multiline

```tsx
<Input
  label="Description"
  placeholder="Enter description..."
  multiline
  numberOfLines={4}
/>
```

### Custom Styling

```tsx
<Input
  label="Custom Input"
  containerStyle={{ marginBottom: 20 }}
  inputStyle={{ fontSize: 18, color: '#333' }}
  labelStyle={{ fontWeight: 'bold' }}
/>
```

### Form Example

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    if (!text.includes('@')) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <View>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        isRequired
        isError={!!emailError}
        errorText={emailError}
        leftIcon={<Icon name="mail" />}
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        isRequired
        leftIcon={<Icon name="lock" />}
        containerStyle={{ marginTop: 16 }}
      />
    </View>
  );
}
```

## Accessibility

The Input component follows accessibility best practices:

- Proper label association
- Support for screen readers
- Keyboard navigation support
- Clear error messaging
- Required field indicators

## Dark Mode

The component automatically adapts to the system color scheme using React Native's `useColorScheme` hook. All colors adjust appropriately for both light and dark modes.

## Styling Guide

### Color Scheme (Light Mode)

- Border: `#C7C7CC`
- Border (Focus): `#007AFF`
- Border (Error): `#FF3B30`
- Background: `#FFFFFF`
- Text: `#000000`
- Placeholder: `#C7C7CC`

### Color Scheme (Dark Mode)

- Border: `#3A3A3C`
- Border (Focus): `#0A84FF`
- Border (Error): `#FF3B30`
- Background: `#1C1C1E`
- Text: `#FFFFFF`
- Placeholder: `#8E8E93`

### Size Specifications

| Size   | Height | Padding (H) | Padding (V) | Font Size |
| ------ | ------ | ----------- | ----------- | --------- |
| Small  | 36px   | 12px        | 8px         | 14px      |
| Medium | 48px   | 16px        | 12px        | 16px      |
| Large  | 56px   | 20px        | 16px        | 18px      |

## Best Practices

1. **Always provide labels** for better accessibility
2. **Use helper text** to guide users
3. **Show clear error messages** when validation fails
4. **Mark required fields** with the `isRequired` prop
5. **Use appropriate keyboard types** (email, numeric, etc.)
6. **Provide visual feedback** for focus and error states
7. **Use icons** to enhance user understanding
8. **Test on both platforms** (iOS and Android)
9. **Test in dark mode** to ensure proper contrast

## Notes

- The component uses safe data access patterns to prevent crashes
- All optional chaining and null checks are implemented
- Icons are automatically sized and colored based on input state
- The component is fully controlled - manage state in parent component
