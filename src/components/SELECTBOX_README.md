# SelectBox Component

Component SelectBox với modal để chọn một hoặc nhiều tùy chọn. Component này được thiết kế với UX tốt, hỗ trợ tìm kiếm, dark mode và tuân theo data-safety best practices.

## Features

- ✨ Single và Multiple selection
- 🔍 Tìm kiếm options (searchable)
- 🎨 3 variants: outline, filled, underline
- 📏 3 sizes: small, medium, large
- 🌙 Dark mode support
- ♿ Accessibility support
- 🛡️ Safe data access (null/undefined handling)
- 📱 Modal presentation với animation (center hoặc bottom)
- 🎯 Disabled options support
- 💬 Label, helper text, error text
- 🔄 Loading states
- 🎨 Custom styling

## Basic Usage

### Single Select

```tsx
import { SelectBox, SelectOption } from 'tradewize-component';

const options: SelectOption[] = [
  { label: 'Táo', value: 'apple' },
  { label: 'Chuối', value: 'banana' },
  { label: 'Cam', value: 'orange' },
];

function Example() {
  const [value, setValue] = useState('');

  return (
    <SelectBox
      label="Chọn trái cây"
      placeholder="Chọn một trái cây"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

### Multiple Select

```tsx
function MultipleExample() {
  const [values, setValues] = useState<Array<string | number>>([]);

  return (
    <SelectBox
      label="Chọn màu sắc"
      placeholder="Chọn nhiều màu"
      options={colorOptions}
      value={values}
      onChange={setValues}
      multiple
    />
  );
}
```

## Props

### SelectOption Interface

```tsx
interface SelectOption {
  label: string; // Text hiển thị
  value: string | number; // Giá trị
  disabled?: boolean; // Vô hiệu hóa option
  icon?: ReactNode; // Icon cho option
  description?: string; // Mô tả thêm
}
```

### SelectBoxProps

| Prop                | Type                                          | Default              | Description                |
| ------------------- | --------------------------------------------- | -------------------- | -------------------------- |
| `label`             | `string`                                      | -                    | Label của select           |
| `placeholder`       | `string`                                      | `"Chọn..."`          | Placeholder text           |
| `helperText`        | `string`                                      | -                    | Text hướng dẫn             |
| `errorText`         | `string`                                      | -                    | Text lỗi                   |
| `options`           | `SelectOption[]`                              | `[]`                 | Danh sách options          |
| `value`             | `string \| number \| Array<string \| number>` | -                    | Giá trị đã chọn            |
| `onChange`          | `function`                                    | -                    | Callback khi thay đổi      |
| `multiple`          | `boolean`                                     | `false`              | Cho phép chọn nhiều        |
| `searchable`        | `boolean`                                     | `true`               | Hiển thị ô tìm kiếm        |
| `leftIcon`          | `ReactNode`                                   | -                    | Icon bên trái              |
| `rightIcon`         | `ReactNode`                                   | -                    | Icon bên phải              |
| `variant`           | `'outline' \| 'filled' \| 'underline'`        | `'outline'`          | Style variant              |
| `size`              | `'small' \| 'medium' \| 'large'`              | `'medium'`           | Kích thước                 |
| `isDisabled`        | `boolean`                                     | `false`              | Vô hiệu hóa                |
| `isError`           | `boolean`                                     | `false`              | Hiển thị trạng thái lỗi    |
| `isRequired`        | `boolean`                                     | `false`              | Đánh dấu bắt buộc          |
| `fullWidth`         | `boolean`                                     | `true`               | Full width                 |
| `closeOnSelect`     | `boolean`                                     | `true`               | Đóng modal sau khi chọn    |
| `emptyMessage`      | `string`                                      | `"Không có dữ liệu"` | Message khi không có data  |
| `searchPlaceholder` | `string`                                      | `"Tìm kiếm..."`      | Placeholder của search     |
| `maxHeight`         | `number`                                      | `60% screen height`  | Chiều cao tối đa của modal |
| `modalPosition`     | `'center' \| 'bottom'`                        | `'center'`           | Vị trí modal (giữa/dưới)   |

### Style Props

| Prop                  | Type        | Description               |
| --------------------- | ----------- | ------------------------- |
| `containerStyle`      | `ViewStyle` | Style của container ngoài |
| `inputStyle`          | `TextStyle` | Style của text hiển thị   |
| `labelStyle`          | `TextStyle` | Style của label           |
| `inputContainerStyle` | `ViewStyle` | Style của container input |
| `modalStyle`          | `ViewStyle` | Style của modal           |
| `optionStyle`         | `ViewStyle` | Style của mỗi option      |
| `borderColorActive`   | `string`    | Màu border khi active     |
| `borderColorError`    | `string`    | Màu border khi error      |
| `borderColor`         | `string`    | Màu border mặc định       |

## Advanced Examples

### With Descriptions

```tsx
const options: SelectOption[] = [
  {
    label: 'Táo',
    value: 'apple',
    description: 'Trái cây có màu đỏ',
  },
  {
    label: 'Chuối',
    value: 'banana',
    description: 'Trái cây có màu vàng',
  },
];

<SelectBox
  label="Chọn trái cây"
  options={options}
  value={value}
  onChange={setValue}
/>;
```

### With Disabled Options

```tsx
const options: SelectOption[] = [
  { label: 'Việt Nam', value: 'vn' },
  { label: 'Hoa Kỳ', value: 'us', disabled: true },
  { label: 'Nhật Bản', value: 'jp' },
];

<SelectBox
  label="Chọn quốc gia"
  options={options}
  value={value}
  onChange={setValue}
/>;
```

### Custom Error Handling

```tsx
<SelectBox
  label="Loại tài khoản"
  options={accountTypes}
  value={accountType}
  onChange={setAccountType}
  isRequired
  isError={!accountType && submitted}
  errorText={!accountType && submitted ? 'Vui lòng chọn loại tài khoản' : ''}
/>
```

### Different Variants

```tsx
// Outline
<SelectBox variant="outline" {...props} />

// Filled
<SelectBox variant="filled" {...props} />

// Underline
<SelectBox variant="underline" {...props} />
```

### Different Sizes

```tsx
// Small
<SelectBox size="small" {...props} />

// Medium (default)
<SelectBox size="medium" {...props} />

// Large
<SelectBox size="large" {...props} />
```

### Modal Position

```tsx
// Center modal (default)
<SelectBox modalPosition="center" {...props} />

// Bottom modal (bottom sheet style)
<SelectBox modalPosition="bottom" {...props} />
```

### Without Search

```tsx
<SelectBox searchable={false} options={shortList} {...props} />
```

### Custom Render Option

```tsx
<SelectBox
  options={options}
  value={value}
  onChange={setValue}
  renderOption={(option, isSelected) => (
    <View style={styles.customOption}>
      <Image source={{ uri: option.icon }} style={styles.icon} />
      <Text>{option.label}</Text>
      {isSelected && <Text>✓</Text>}
    </View>
  )}
/>
```

## Data Safety

Component này tuân theo data-safety best practices:

```tsx
// ✅ Safe access với optional chaining và fallback
const selectedValues = useMemo(() => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}, [value]);

// ✅ Safe filtering với null checks
const filteredOptions = useMemo(() => {
  if (!searchQuery?.trim()) return options ?? [];

  const query = searchQuery.toLowerCase().trim();
  return (options ?? []).filter((option) => {
    const optionLabel = option?.label?.toLowerCase() ?? '';
    return optionLabel.includes(query);
  });
}, [options, searchQuery]);
```

## Accessibility

- ✅ Support SafeAreaView cho notches và status bar
- ✅ Keyboard accessible
- ✅ Screen reader support với proper labels
- ✅ Touch targets đủ lớn (minimum 44x44)
- ✅ Color contrast đạt chuẩn WCAG

## Dark Mode

Component tự động hỗ trợ dark mode dựa trên system theme:

```tsx
const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';
```

## Performance

- ✅ useMemo cho filtered options và display text
- ✅ FlatList với proper keyExtractor
- ✅ Conditional rendering
- ✅ Optimized re-renders

## Notes

- Modal sử dụng SafeAreaView để tránh notch và status bar
- Search tự động focus khi mở modal (nếu searchable = true)
- Multiple select có footer với nút "Xóa" và "Xong"
- Single select tự động đóng modal sau khi chọn (có thể tùy chỉnh với closeOnSelect)
- Options được render với FlatList để tối ưu performance với danh sách lớn

## TypeScript Support

Component được viết hoàn toàn bằng TypeScript với full type safety:

```tsx
import type { SelectOption, SelectBoxProps } from 'tradewize-component';
```
