# 🎉 SelectBox Component - Hướng Dẫn Nhanh

Component SelectBox đã được tạo thành công! Đây là một component Select hiện đại với modal, hỗ trợ đầy đủ các tính năng cần thiết.

## ✨ Tính Năng Chính

### 1. **Single & Multiple Selection**

- Chọn một tùy chọn (single select)
- Chọn nhiều tùy chọn (multiple select)

### 2. **Tìm Kiếm (Search)**

- Tự động filter options khi gõ
- Có thể tắt tính năng search

### 3. **3 Style Variants**

- **Outline**: Border viền xung quanh
- **Filled**: Background có màu
- **Underline**: Chỉ có border dưới

### 4. **3 Kích Thước**

- **Small**: Nhỏ gọn
- **Medium**: Tiêu chuẩn
- **Large**: Lớn hơn

### 5. **Dark Mode**

- Tự động theo system theme
- Màu sắc tối ưu cho cả light và dark mode

### 6. **Data Safety**

- Xử lý null/undefined an toàn
- Optional chaining và fallback values
- Không bao giờ crash app

### 7. **Modal Position**

- **Center**: Modal hiện ở giữa màn hình (default)
- **Bottom**: Modal hiện từ dưới lên như bottom sheet

## 🚀 Bắt Đầu Nhanh

### Cài Đặt

Component đã được export trong `src/index.tsx`:

```tsx
import { SelectBox, SelectOption } from 'tradewize-component';
```

### Ví Dụ Cơ Bản

```tsx
import React, { useState } from 'react';
import { SelectBox, SelectOption } from 'tradewize-component';

function MyComponent() {
  const [value, setValue] = useState('');

  const options: SelectOption[] = [
    { label: 'Táo', value: 'apple' },
    { label: 'Chuối', value: 'banana' },
    { label: 'Cam', value: 'orange' },
  ];

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

## 📁 Files Đã Tạo

### 1. **Component**

- `src/components/SelectBox.tsx` - Component chính
- `src/components/SELECTBOX_README.md` - Documentation chi tiết

### 2. **Example**

- `example/src/SelectBoxExample.tsx` - Ví dụ đầy đủ các use cases

### 3. **Export**

- `src/index.tsx` - Đã export SelectBox và SelectOption

### 4. **Demo**

- `example/src/App.tsx` - Đã thêm SelectBoxExample vào demo app

## 🎯 Chạy Demo

```bash
# Di chuyển đến thư mục example
cd example

# Cài đặt dependencies (nếu chưa cài)
yarn install

# Chạy trên iOS
yarn ios

# Chạy trên Android
yarn android
```

## 📖 Các Ví Dụ Sử Dụng

### Single Select

```tsx
const [fruit, setFruit] = useState('');

<SelectBox
  label="Chọn trái cây"
  options={fruitOptions}
  value={fruit}
  onChange={setFruit}
/>;
```

### Multiple Select

```tsx
const [colors, setColors] = useState<Array<string | number>>([]);

<SelectBox
  label="Chọn màu sắc"
  options={colorOptions}
  value={colors}
  onChange={setColors}
  multiple
/>;
```

### With Description

```tsx
const options: SelectOption[] = [
  {
    label: 'Táo',
    value: 'apple',
    description: 'Trái cây có màu đỏ',
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
];

<SelectBox
  label="Chọn quốc gia"
  options={options}
  value={value}
  onChange={setValue}
/>;
```

### Required with Error

```tsx
<SelectBox
  label="Loại tài khoản"
  options={accountTypes}
  value={accountType}
  onChange={setAccountType}
  isRequired
  isError={!accountType}
  errorText="Vui lòng chọn loại tài khoản"
/>
```

### Different Variants

```tsx
// Outline (default)
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
// Center modal (default) - modal ở giữa màn hình
<SelectBox modalPosition="center" {...props} />

// Bottom modal - modal từ dưới lên (bottom sheet)
<SelectBox
  modalPosition="bottom"
  options={options}
  value={value}
  onChange={setValue}
/>
```

## 🎨 Customization

### Custom Colors

```tsx
<SelectBox
  borderColor="#E0E0E0"
  borderColorActive="#2196F3"
  borderColorError="#F44336"
  {...props}
/>
```

### Custom Styles

```tsx
<SelectBox
  containerStyle={{ marginBottom: 20 }}
  inputStyle={{ fontSize: 18 }}
  labelStyle={{ fontWeight: 'bold' }}
  modalStyle={{ backgroundColor: '#F5F5F5' }}
  {...props}
/>
```

### Without Search

```tsx
<SelectBox searchable={false} options={options} {...props} />
```

### Custom Messages

```tsx
<SelectBox
  emptyMessage="Không tìm thấy dữ liệu nào!"
  searchPlaceholder="Nhập để tìm kiếm..."
  placeholder="Vui lòng chọn..."
  {...props}
/>
```

## 🛡️ Data Safety Features

Component này tuân theo data-safety best practices:

```tsx
// ✅ Xử lý null/undefined an toàn
const selectedValues = useMemo(() => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}, [value]);

// ✅ Safe array access
const filteredOptions = (options ?? []).filter(...);

// ✅ Safe property access
const optionLabel = option?.label?.toLowerCase() ?? '';

// ✅ Safe array length check
if (selectedValues?.length > 0) { ... }
```

## ♿ Accessibility

- ✅ SafeAreaView support
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Proper touch targets (44x44 minimum)
- ✅ WCAG color contrast

## 🎯 Props Chính

| Prop            | Type                                   | Default     | Description           |
| --------------- | -------------------------------------- | ----------- | --------------------- |
| `options`       | `SelectOption[]`                       | `[]`        | Danh sách options     |
| `value`         | `string \| number \| Array`            | -           | Giá trị đã chọn       |
| `onChange`      | `function`                             | -           | Callback khi thay đổi |
| `multiple`      | `boolean`                              | `false`     | Cho phép chọn nhiều   |
| `searchable`    | `boolean`                              | `true`      | Hiển thị search       |
| `variant`       | `'outline' \| 'filled' \| 'underline'` | `'outline'` | Style                 |
| `size`          | `'small' \| 'medium' \| 'large'`       | `'medium'`  | Kích thước            |
| `modalPosition` | `'center' \| 'bottom'`                 | `'center'`  | Vị trí modal          |
| `isDisabled`    | `boolean`                              | `false`     | Vô hiệu hóa           |
| `isError`       | `boolean`                              | `false`     | Trạng thái lỗi        |
| `isRequired`    | `boolean`                              | `false`     | Bắt buộc              |

## 📚 Documentation

Xem documentation chi tiết tại:

- `src/components/SELECTBOX_README.md`

Xem ví dụ đầy đủ tại:

- `example/src/SelectBoxExample.tsx`

## 🎓 Best Practices

### 1. Always Handle Value Changes

```tsx
const [value, setValue] = useState('');

<SelectBox
  value={value}
  onChange={setValue} // ✅ Always provide onChange
  options={options}
/>;
```

### 2. Provide Meaningful Labels

```tsx
<SelectBox
  label="Chọn loại tài khoản" // ✅ Clear label
  placeholder="Vui lòng chọn" // ✅ Helpful placeholder
  helperText="Chọn loại tài khoản phù hợp" // ✅ Additional guidance
  options={options}
/>
```

### 3. Handle Empty States

```tsx
<SelectBox
  options={options}
  emptyMessage={isLoading ? 'Đang tải...' : 'Không có dữ liệu'}
/>
```

### 4. Validate Required Fields

```tsx
<SelectBox
  isRequired
  isError={!value && submitted}
  errorText={!value && submitted ? 'Trường này là bắt buộc' : ''}
/>
```

## 🐛 Troubleshooting

### Modal không hiển thị

- Đảm bảo app được wrap trong `SafeAreaProvider`
- Check permissions cho overlay (Android)

### Options không hiển thị

- Kiểm tra format của `options` array
- Đảm bảo mỗi option có `label` và `value`

### Search không hoạt động

- Set `searchable={true}`
- Kiểm tra options có `label` để search

## 💡 Tips

1. Sử dụng `useMemo` cho danh sách options lớn
2. Implement virtualization cho danh sách > 100 items
3. Debounce search cho performance tốt hơn
4. Cache selected values để tránh re-render

## 🎉 Hoàn Thành!

Component SelectBox đã sẵn sàng sử dụng! Enjoy coding! 🚀

---

**Need Help?**

- Xem: `src/components/SELECTBOX_README.md` cho chi tiết
- Chạy: `example/src/SelectBoxExample.tsx` để xem demo
