# CheckboxButton Component

A customizable checkbox button component for React Native with support for multiple variants, sizes, and dark mode.

## Features

- ✅ Multiple size options (small, medium, large)
- ✅ Multiple variants (default, primary, success, danger)
- ✅ Dark mode support
- ✅ Customizable checkbox position (left or right)
- ✅ Disabled state
- ✅ Custom styling support
- ✅ TypeScript support
- ✅ Accessibility-friendly

## Installation

```bash
npm install tradewize-component
# or
yarn add tradewize-component
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { CheckboxButton } from 'tradewize-component';

function MyComponent() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CheckboxButton
      label="Accept terms and conditions"
      isChecked={isChecked}
      onChange={setIsChecked}
    />
  );
}
```

## Props

| Prop               | Type                                              | Default     | Description                                   |
| ------------------ | ------------------------------------------------- | ----------- | --------------------------------------------- |
| `label`            | `string`                                          | `undefined` | The text label displayed next to the checkbox |
| `isChecked`        | `boolean`                                         | `false`     | Whether the checkbox is checked               |
| `onChange`         | `(checked: boolean) => void`                      | `undefined` | Callback function when checkbox state changes |
| `size`             | `'small' \| 'medium' \| 'large'`                  | `'medium'`  | Size of the checkbox                          |
| `variant`          | `'default' \| 'primary' \| 'success' \| 'danger'` | `'default'` | Visual variant of the checkbox                |
| `isDisabled`       | `boolean`                                         | `false`     | Whether the checkbox is disabled              |
| `checkboxPosition` | `'left' \| 'right'`                               | `'left'`    | Position of checkbox relative to label        |
| `style`            | `StyleProp<ViewStyle>`                            | `undefined` | Custom style for the container                |
| `textStyle`        | `StyleProp<TextStyle>`                            | `undefined` | Custom style for the label text               |
| `checkboxStyle`    | `StyleProp<ViewStyle>`                            | `undefined` | Custom style for the checkbox                 |
| `spacing`          | `number`                                          | `8`         | Space between checkbox and label              |

## Examples

### Different Sizes

```tsx
<CheckboxButton
  label="Small checkbox"
  size="small"
  isChecked={checked}
  onChange={setChecked}
/>

<CheckboxButton
  label="Medium checkbox"
  size="medium"
  isChecked={checked}
  onChange={setChecked}
/>

<CheckboxButton
  label="Large checkbox"
  size="large"
  isChecked={checked}
  onChange={setChecked}
/>
```

### Variants

```tsx
<CheckboxButton
  label="Default variant"
  variant="default"
  isChecked={checked}
  onChange={setChecked}
/>

<CheckboxButton
  label="Primary variant"
  variant="primary"
  isChecked={checked}
  onChange={setChecked}
/>

<CheckboxButton
  label="Success variant"
  variant="success"
  isChecked={checked}
  onChange={setChecked}
/>

<CheckboxButton
  label="Danger variant"
  variant="danger"
  isChecked={checked}
  onChange={setChecked}
/>
```

### Checkbox Position

```tsx
<CheckboxButton
  label="Checkbox on left"
  checkboxPosition="left"
  isChecked={checked}
  onChange={setChecked}
/>

<CheckboxButton
  label="Checkbox on right"
  checkboxPosition="right"
  isChecked={checked}
  onChange={setChecked}
/>
```

### Disabled State

```tsx
<CheckboxButton
  label="Disabled checkbox"
  isChecked={false}
  isDisabled={true}
/>

<CheckboxButton
  label="Disabled checked"
  isChecked={true}
  isDisabled={true}
/>
```

### Without Label

```tsx
<CheckboxButton isChecked={checked} onChange={setChecked} />
```

### Form Example

```tsx
function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
  });

  return (
    <View>
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
      />

      <CheckboxButton
        label="Dark mode"
        isChecked={preferences.darkMode}
        onChange={(checked) =>
          setPreferences((prev) => ({ ...prev, darkMode: checked }))
        }
        variant="primary"
      />
    </View>
  );
}
```

### Custom Styling

```tsx
<CheckboxButton
  label="Custom styled checkbox"
  isChecked={checked}
  onChange={setChecked}
  style={{ paddingVertical: 12 }}
  textStyle={{ fontSize: 18, fontWeight: 'bold' }}
  checkboxStyle={{ borderRadius: 12 }}
  spacing={16}
/>
```

## Dark Mode Support

The component automatically adapts to the device's color scheme using React Native's `useColorScheme` hook. Colors adjust automatically for both light and dark modes.

## Accessibility

The component uses `TouchableOpacity` for proper touch feedback and supports standard React Native accessibility props.

## TypeScript

The component is written in TypeScript and exports the `CheckboxButtonProps` interface for type safety.

```tsx
import type { CheckboxButtonProps } from 'tradewize-component';
```

## License

MIT
