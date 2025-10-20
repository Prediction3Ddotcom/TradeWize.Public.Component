# BottomSelector Component

A highly customizable bottom sheet selector component built with `react-native-modal` and optimized with `FlatList` for performance.

## Features

- ✅ Smooth slide-up animation
- ✅ **Swipe-to-dismiss** - Swipe down to close
- ✅ **Backdrop press to close** - Tap outside to dismiss
- ✅ **Search functionality** - Filter options by label in real-time
- ✅ Dark mode support
- ✅ Icon support for each option
- ✅ Selected state with checkmark
- ✅ Disabled options
- ✅ Customizable styles
- ✅ TypeScript support
- ✅ Accessibility-friendly
- ✅ **Optimized with FlatList** - Efficiently handles large lists with virtualization
- ✅ Empty state support

## Installation

Make sure you have the required peer dependencies installed:

```bash
npm install react-native-modal react-native-reanimated react-native-gesture-handler
# or
yarn add react-native-modal react-native-reanimated react-native-gesture-handler
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { BottomSelector } from 'tradewize-component';

function Example() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <View>
      <Button title="Open Selector" onPress={() => setIsVisible(true)} />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={options}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Select an option"
      />
    </View>
  );
}
```

## Props

### Required Props

| Prop        | Type                                     | Description                                    |
| ----------- | ---------------------------------------- | ---------------------------------------------- |
| `isVisible` | `boolean`                                | Controls the visibility of the bottom selector |
| `onClose`   | `() => void`                             | Callback when the selector is closed           |
| `options`   | `BottomSelectorOption[]`                 | Array of options to display                    |
| `onSelect`  | `(option: BottomSelectorOption) => void` | Callback when an option is selected            |

### Optional Props

| Prop                  | Type                     | Default                   | Description                                                 |
| --------------------- | ------------------------ | ------------------------- | ----------------------------------------------------------- |
| `title`               | `string`                 | -                         | Title text displayed at the top                             |
| `selectedValue`       | `any`                    | -                         | Currently selected value                                    |
| `showSelectedIcon`    | `boolean`                | `true`                    | Show checkmark for selected option                          |
| `maxHeight`           | `number`                 | `400`                     | Maximum height of the options list                          |
| `cancelText`          | `string`                 | `'Hủy'`                   | Text for cancel button                                      |
| `showCancelButton`    | `boolean`                | `true`                    | Show/hide cancel button                                     |
| `containerStyle`      | `StyleProp<ViewStyle>`   | -                         | Custom style for the container                              |
| `optionStyle`         | `StyleProp<ViewStyle>`   | -                         | Custom style for each option                                |
| `titleStyle`          | `StyleProp<TextStyle>`   | -                         | Custom style for the title                                  |
| `optionTextStyle`     | `StyleProp<TextStyle>`   | -                         | Custom style for option text                                |
| `selectedOptionStyle` | `StyleProp<ViewStyle>`   | -                         | Custom style for selected option                            |
| `disabledOptionStyle` | `StyleProp<ViewStyle>`   | -                         | Custom style for disabled option                            |
| `emptyText`           | `string`                 | `'Không có tùy chọn nào'` | Text to show when options are empty                         |
| `initialNumToRender`  | `number`                 | `10`                      | Number of items to render initially (FlatList optimization) |
| `enableSearch`        | `boolean`                | `false`                   | Enable search functionality to filter options               |
| `searchPlaceholder`   | `string`                 | `'Tìm kiếm...'`           | Placeholder text for search input                           |
| `searchInputStyle`    | `StyleProp<ViewStyle>`   | -                         | Custom style for search input container                     |
| `onSearchChange`      | `(text: string) => void` | -                         | Callback when search text changes                           |

### BottomSelectorOption Interface

```typescript
interface BottomSelectorOption<T = any> {
  label: string; // Display text
  value: T; // Value associated with the option
  icon?: React.ReactNode; // Optional icon component
  disabled?: boolean; // Disable the option
}
```

## Advanced Examples

### With Icons

```tsx
import { BottomSelector } from 'tradewize-component';
import Icon from 'react-native-vector-icons/Ionicons';

const optionsWithIcons = [
  {
    label: 'Home',
    value: 'home',
    icon: <Icon name="home" size={24} color="#007AFF" />,
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: <Icon name="settings" size={24} color="#007AFF" />,
  },
  {
    label: 'Profile',
    value: 'profile',
    icon: <Icon name="person" size={24} color="#007AFF" />,
  },
];

<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={optionsWithIcons}
  onSelect={handleSelect}
  title="Choose a section"
/>;
```

### With Large List (500+ items)

```tsx
// Generate large list
const largeOptions = Array.from({ length: 500 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: index,
}));

<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={largeOptions}
  onSelect={handleSelect}
  title="Select from large list"
  maxHeight={500}
  initialNumToRender={15} // Optimize initial render
/>;
```

### With Empty State

```tsx
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={[]} // Empty array
  onSelect={handleSelect}
  title="Empty List"
  emptyText="No options available at the moment 😢"
/>
```

### With Search

```tsx
const countries = [
  'Vietnam',
  'United States',
  'China',
  'Japan',
  'Korea',
  'Thailand',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Philippines',
  // ... more countries
];

const countryOptions = countries.map((country) => ({
  label: country,
  value: country.toLowerCase(),
}));

<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={countryOptions}
  onSelect={handleSelect}
  title="Select Country"
  enableSearch={true} // Enable search
  searchPlaceholder="Search countries..."
  maxHeight={500}
  onSearchChange={(text) => console.log('Searching:', text)}
/>;
```

### With Disabled Options

```tsx
const options = [
  { label: 'Available Option', value: 'available' },
  { label: 'Disabled Option', value: 'disabled', disabled: true },
  { label: 'Another Available', value: 'available2' },
];

<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
/>;
```

### Custom Styling

```tsx
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
  title="Custom Styled Selector"
  containerStyle={{
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  }}
  optionStyle={{
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 6,
  }}
  titleStyle={{
    fontSize: 20,
    color: '#333333',
  }}
  selectedOptionStyle={{
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#007AFF',
  }}
/>
```

### Without Cancel Button

```tsx
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
  showCancelButton={false}
/>
```

### Complex Values

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const userOptions: BottomSelectorOption<User>[] = [
  {
    label: 'John Doe',
    value: { id: 1, name: 'John Doe', email: 'john@example.com' },
  },
  {
    label: 'Jane Smith',
    value: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  },
];

<BottomSelector<User>
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={userOptions}
  onSelect={(option) => {
    console.log('Selected user:', option.value);
  }}
  title="Select a user"
/>;
```

## Interaction Methods

The BottomSelector can be closed in multiple ways:

1. **Backdrop Press** - Tap outside the modal (on the backdrop)
2. **Swipe Down** - Swipe down on the modal
3. **Cancel Button** - Tap the cancel button at the bottom
4. **After Selection** - Automatically closes when an option is selected

### Backdrop Behavior

By default, the backdrop is **transparent** (`backdropOpacity={0}`) but still **clickable**. This provides a clean look while maintaining the ability to close the modal by tapping outside.

You can customize the backdrop appearance:

```tsx
// Transparent backdrop (default) - Still clickable!
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
  backdropOpacity={0} // Transparent but clickable
/>

// Dark backdrop for better focus
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
  backdropOpacity={0.7} // Visible dark backdrop
/>

// Custom interaction behaviors
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
  showCancelButton={false} // Hide cancel button
  swipeDirection={['down']} // Enable swipe to close
/>
```

## Customization with Modal Props

The component extends `react-native-modal` props, so you can pass any additional modal props:

```tsx
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={options}
  onSelect={handleSelect}
  animationIn="fadeInUp"
  animationOut="fadeOutDown"
  backdropOpacity={0.7}
  backdropTransitionOutTiming={0}
  onBackdropPress={() => console.log('Backdrop pressed!')}
/>
```

## Dark Mode Support

The component automatically adapts to the system's color scheme. No additional configuration needed!

## TypeScript Support

The component is fully typed with TypeScript. You can use generic types for type-safe option values:

```typescript
const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'vi' | 'fr'>();

const languageOptions: BottomSelectorOption<'en' | 'vi' | 'fr'>[] = [
  { label: 'English', value: 'en' },
  { label: 'Tiếng Việt', value: 'vi' },
  { label: 'Français', value: 'fr' },
];

<BottomSelector<'en' | 'vi' | 'fr'>
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={languageOptions}
  selectedValue={selectedLanguage}
  onSelect={(option) => setSelectedLanguage(option.value)}
/>
```

## Performance Optimization

The component uses **FlatList** under the hood for optimal performance:

- **Virtualization**: Only renders visible items on screen
- **Lazy loading**: Items are rendered as you scroll
- **Efficient re-renders**: Uses `getItemLayout` for better scrolling performance
- **Configurable rendering**: Customize `initialNumToRender` based on your needs

This means you can safely use BottomSelector with **hundreds of options** without performance concerns!

```tsx
<BottomSelector
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  options={largeOptionList} // 500+ items? No problem!
  onSelect={handleSelect}
  initialNumToRender={15} // Render 15 items initially
/>
```

## Search Functionality

The search feature filters options in real-time based on the label text (case-insensitive):

### Features:

- ✅ **Real-time filtering** - Options filter as you type
- ✅ **Case-insensitive** - Matches regardless of case
- ✅ **Auto-reset** - Search clears when modal closes or option is selected
- ✅ **Callback support** - Get notified when search text changes via `onSearchChange`
- ✅ **Performance optimized** - Uses `useMemo` to prevent unnecessary re-renders
- ✅ **Keyboard persistence** - Keyboard stays open while scrolling through results
  - Uses `keyboardShouldPersistTaps="handled"` on FlatList
  - Uses `keyboardDismissMode="none"` to prevent dismiss on scroll
  - Modal's `avoidKeyboard={true}` prevents automatic keyboard dismissal

### When to use search:

- ✅ Lists with **10+ options**
- ✅ Options with similar names
- ✅ Country/city/state selectors
- ✅ Long dropdown replacements
- ❌ Lists with < 5 options (not necessary)

### Example:

```tsx
<BottomSelector
  options={manyOptions}
  onSelect={handleSelect}
  enableSearch={true}
  searchPlaceholder="Type to filter..."
  onSearchChange={(text) => {
    // Optional: Track searches, show suggestions, etc.
    analytics.track('search', { query: text });
  }}
/>
```

## Best Practices

1. **Keep options concise**: Use short, clear labels for better UX
2. **Use icons**: Icons help users quickly identify options
3. **FlatList optimized**: The component can handle large lists efficiently thanks to FlatList
4. **Handle selection gracefully**: Always update your state and close the modal after selection
5. **Provide feedback**: Use the selected state to show users their current selection
6. **Custom empty state**: Provide meaningful `emptyText` when options might be empty
7. **Enable search for large lists**: For 10+ options, enable search to improve UX

## Accessibility

The component supports accessibility features out of the box:

- Proper touch targets (minimum 44x44 points)
- Support for dark mode
- Disabled state indication
- Swipe-to-dismiss gesture for better UX

## License

MIT
