# 🎉 SelectBox - Bottom Modal Update

Đã thêm tính năng **Bottom Modal** (Bottom Sheet) cho component SelectBox!

## ✨ Tính Năng Mới

### **Modal Position**

Giờ đây SelectBox hỗ trợ 2 kiểu hiển thị modal:

#### 1. **Center Modal** (Default)

- Modal hiển thị ở giữa màn hình
- Animation: fade in/out
- Width: 90% màn hình
- Border radius: 12px (tất cả góc)

#### 2. **Bottom Modal** (Mới!)

- Modal hiển thị từ dưới lên như bottom sheet
- Animation: slide up/down
- Width: 100% màn hình
- Border radius: chỉ bo góc trên (20px)
- Max height: 80% màn hình
- UX tốt hơn cho mobile

## 🚀 Cách Sử Dụng

### Basic Usage

```tsx
import { SelectBox } from 'tradewize-component';

// Center Modal (default)
<SelectBox
  label="Chọn trái cây"
  options={options}
  value={value}
  onChange={setValue}
/>

// Bottom Modal
<SelectBox
  label="Chọn trái cây"
  options={options}
  value={value}
  onChange={setValue}
  modalPosition="bottom"  // 👈 Thêm prop này
/>
```

### Complete Example

```tsx
import React, { useState } from 'react';
import { SelectBox, SelectOption } from 'tradewize-component';

function MyComponent() {
  const [fruit, setFruit] = useState('');

  const options: SelectOption[] = [
    { label: 'Táo', value: 'apple' },
    { label: 'Chuối', value: 'banana' },
    { label: 'Cam', value: 'orange' },
  ];

  return (
    <SelectBox
      label="Chọn trái cây yêu thích"
      placeholder="Chọn một trái cây"
      options={options}
      value={fruit}
      onChange={setFruit}
      modalPosition="bottom"
      helperText="Modal sẽ hiện từ dưới lên"
      variant="outline"
      size="medium"
    />
  );
}
```

### Multiple Select với Bottom Modal

```tsx
const [colors, setColors] = useState<Array<string | number>>([]);

<SelectBox
  label="Chọn màu sắc"
  options={colorOptions}
  value={colors}
  onChange={setColors}
  multiple
  modalPosition="bottom"
  helperText="Chọn nhiều màu sắc bạn thích"
/>;
```

## 📝 API Changes

### New Prop

| Prop            | Type                   | Default    | Description           |
| --------------- | ---------------------- | ---------- | --------------------- |
| `modalPosition` | `'center' \| 'bottom'` | `'center'` | Vị trí hiển thị modal |

### Behavior Differences

| Feature       | Center Modal         | Bottom Modal            |
| ------------- | -------------------- | ----------------------- |
| Position      | Giữa màn hình        | Từ dưới lên             |
| Animation     | Fade in/out          | Slide up/down           |
| Width         | 90%                  | 100%                    |
| Border Radius | 12px (all corners)   | 20px (top corners only) |
| Max Height    | 60% screen (default) | 80% screen              |
| Mobile UX     | Good                 | Better (native feel)    |

## 🎨 Styling

Bottom modal tự động áp dụng các styles sau:

```tsx
// Bottom Modal Styles
{
  width: '100%',
  borderRadius: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  maxHeight: '80%',
}
```

Bạn có thể override bằng prop `modalStyle`:

```tsx
<SelectBox
  modalPosition="bottom"
  modalStyle={{
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // custom styles...
  }}
/>
```

## 📱 Use Cases

### Khi nào dùng Center Modal?

- Desktop/tablet với màn hình lớn
- Form nhỏ gọn
- Popup nhanh

### Khi nào dùng Bottom Modal?

- Mobile app
- Native app feel
- Danh sách options dài
- Better one-handed usage
- Following iOS/Android design patterns

## 🔧 Implementation Details

### Animation Types

- **Center**: `animationType="fade"`
- **Bottom**: `animationType="slide"`

### Layout Changes

```tsx
// Bottom Modal
<View
  style={{
    justifyContent: 'flex-end', // Align to bottom
    alignItems: 'stretch', // Full width
  }}
>
  <Pressable
    style={{
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }}
  >
    {/* Content */}
  </Pressable>
</View>
```

## 📦 Files Changed

### 1. Component

- `src/components/SelectBox.tsx` - Added modalPosition prop and styling

### 2. Examples

- `example/src/SelectBoxExample.tsx` - Added 2 new examples for bottom modal

### 3. Documentation

- `src/components/SELECTBOX_README.md` - Updated with modalPosition documentation
- `SELECTBOX_GUIDE.md` - Added examples and use cases

### 4. TypeScript

- Updated `SelectBoxProps` interface with `modalPosition?: 'center' | 'bottom'`

## ✅ Testing

Đã test với:

- ✅ Single select + center modal
- ✅ Single select + bottom modal
- ✅ Multiple select + center modal
- ✅ Multiple select + bottom modal
- ✅ Search functionality với cả 2 positions
- ✅ Dark mode với cả 2 positions
- ✅ All variants (outline, filled, underline)
- ✅ All sizes (small, medium, large)

## 🎯 Demo

Xem demo trong example app:

```bash
cd example
yarn ios    # hoặc yarn android
```

Scroll xuống section:

- **"Bottom Modal (Single Select)"**
- **"Bottom Modal (Multiple Select)"**

## 💡 Tips

1. **Mobile First**: Dùng bottom modal cho mobile apps
2. **Consistency**: Chọn một style và dùng consistent trong app
3. **UX**: Bottom modal tốt hơn cho one-handed mobile usage
4. **Performance**: Cả 2 types đều được optimize với FlatList

## 🌟 Benefits

### Better Mobile UX

- Thumb-friendly positioning
- Native app feel
- Familiar pattern (iOS/Android)

### Smooth Animation

- React Native's native slide animation
- Performant on low-end devices
- No janky movements

### Flexible

- Easy to switch between center/bottom
- Prop-based configuration
- No breaking changes

## 🔄 Backward Compatibility

**100% Backward Compatible!**

- Default vẫn là `modalPosition="center"`
- Không cần update code hiện tại
- Tất cả props cũ vẫn hoạt động bình thường

## 📚 Additional Resources

- **Full API Docs**: `src/components/SELECTBOX_README.md`
- **Quick Guide**: `SELECTBOX_GUIDE.md`
- **Examples**: `example/src/SelectBoxExample.tsx`

## 🎉 Conclusion

Bottom modal là một addition tuyệt vời cho SelectBox component, mang lại:

- Better mobile UX
- Native app feel
- Modern design pattern
- Zero breaking changes

Enjoy the new feature! 🚀
