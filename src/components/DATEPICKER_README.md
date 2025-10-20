# DatePicker Component

Component chọn ngày tháng năm sử dụng `react-native-calendars` với modal cho React Native.

## Cài đặt

Đảm bảo bạn đã cài đặt các dependencies cần thiết:

```bash
npm install react-native-calendars react-native-modal react-native-safe-area-context react-native-fast-shadow
# hoặc
yarn add react-native-calendars react-native-modal react-native-safe-area-context react-native-fast-shadow
```

## Sử dụng cơ bản

```tsx
import { DatePicker } from 'tradewize-component';
import { useState } from 'react';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <DatePicker
      label="Ngày sinh"
      placeholder="Chọn ngày sinh..."
      value={selectedDate}
      onChange={setSelectedDate}
      helperText="Chọn ngày tháng năm sinh của bạn"
    />
  );
}
```

## Props

### Basic Props

| Prop          | Type                                   | Default          | Mô tả                                            |
| ------------- | -------------------------------------- | ---------------- | ------------------------------------------------ |
| `label`       | `string`                               | -                | Nhãn của DatePicker                              |
| `placeholder` | `string`                               | `'Chọn ngày...'` | Text hiển thị khi chưa chọn                      |
| `helperText`  | `string`                               | -                | Text hướng dẫn bên dưới input                    |
| `errorText`   | `string`                               | -                | Text lỗi hiển thị bên dưới input                 |
| `value`       | `string`                               | -                | Giá trị ngày đã chọn (Format: 'YYYY-MM-DD')      |
| `onChange`    | `(date: string) => void`               | -                | Callback khi ngày được chọn                      |
| `minDate`     | `string`                               | -                | Ngày nhỏ nhất có thể chọn (Format: 'YYYY-MM-DD') |
| `maxDate`     | `string`                               | -                | Ngày lớn nhất có thể chọn (Format: 'YYYY-MM-DD') |
| `variant`     | `'outline' \| 'filled' \| 'underline'` | `'outline'`      | Kiểu hiển thị của input                          |
| `size`        | `'small' \| 'medium' \| 'large'`       | `'medium'`       | Kích thước của input                             |
| `isDisabled`  | `boolean`                              | `false`          | Vô hiệu hóa DatePicker                           |
| `isError`     | `boolean`                              | `false`          | Hiển thị trạng thái lỗi                          |
| `isRequired`  | `boolean`                              | `false`          | Đánh dấu là bắt buộc                             |
| `fullWidth`   | `boolean`                              | `true`           | Chiếm toàn bộ chiều rộng                         |

### Color Props

| Prop                         | Type     | Default             | Mô tả                  |
| ---------------------------- | -------- | ------------------- | ---------------------- |
| `borderColorActive`          | `string` | `'#007AFF'`         | Màu viền khi focus     |
| `borderColorError`           | `string` | `'#FF3B30'`         | Màu viền khi có lỗi    |
| `borderColor`                | `string` | `'#C7C7CC'`         | Màu viền mặc định      |
| `backgroundColor`            | `string` | auto                | Màu nền của input      |
| `textColor`                  | `string` | auto                | Màu chữ                |
| `placeholderColor`           | `string` | auto                | Màu placeholder        |
| `modalBackgroundColor`       | `string` | auto                | Màu nền của modal      |
| `selectedDayBackgroundColor` | `string` | `borderColorActive` | Màu nền ngày được chọn |
| `selectedDayTextColor`       | `string` | `'#FFFFFF'`         | Màu chữ ngày được chọn |
| `todayTextColor`             | `string` | `borderColorActive` | Màu chữ ngày hôm nay   |

### Modal Props

| Prop                 | Type                   | Default       | Mô tả                             |
| -------------------- | ---------------------- | ------------- | --------------------------------- |
| `modalPosition`      | `'center' \| 'bottom'` | `'center'`    | Vị trí hiển thị modal             |
| `modalTitle`         | `string`               | `'Chọn ngày'` | Tiêu đề của modal                 |
| `confirmButtonText`  | `string`               | `'Xác nhận'`  | Text nút xác nhận                 |
| `cancelButtonText`   | `string`               | `'Hủy'`       | Text nút hủy                      |
| `animationInTiming`  | `number`               | `400`         | Thời gian animation khi mở (ms)   |
| `animationOutTiming` | `number`               | `400`         | Thời gian animation khi đóng (ms) |
| `backdropOpacity`    | `number`               | `0.5`         | Độ mờ của backdrop                |

### Calendar Props

| Prop                | Type                                                    | Default       | Mô tả                                |
| ------------------- | ------------------------------------------------------- | ------------- | ------------------------------------ |
| `calendarTheme`     | `object`                                                | -             | Theme tùy chỉnh cho calendar         |
| `markedDates`       | `object`                                                | -             | Đánh dấu các ngày đặc biệt           |
| `markingType`       | `'simple' \| 'period' \| 'multi-dot' \| 'multi-period'` | `'simple'`    | Kiểu đánh dấu ngày                   |
| `firstDayOfWeek`    | `number`                                                | `1`           | Ngày đầu tuần (0: Sunday, 1: Monday) |
| `showWeekNumbers`   | `boolean`                                               | `false`       | Hiển thị số tuần                     |
| `enableSwipeMonths` | `boolean`                                               | `true`        | Cho phép vuốt để đổi tháng           |
| `hideExtraDays`     | `boolean`                                               | `true`        | Ẩn các ngày ngoài tháng              |
| `hideDayNames`      | `boolean`                                               | `false`       | Ẩn tên các ngày trong tuần           |
| `hideArrows`        | `boolean`                                               | `false`       | Ẩn mũi tên chuyển tháng              |
| `monthFormat`       | `string`                                                | `'MMMM yyyy'` | Format hiển thị tháng năm            |

### Date Format Props

| Prop         | Type                       | Default        | Mô tả                     |
| ------------ | -------------------------- | -------------- | ------------------------- |
| `dateFormat` | `string`                   | `'DD/MM/YYYY'` | Format hiển thị ngày      |
| `formatDate` | `(date: string) => string` | -              | Hàm tùy chỉnh format ngày |

### Callback Props

| Prop          | Type         | Mô tả                       |
| ------------- | ------------ | --------------------------- |
| `onOpen`      | `() => void` | Callback khi mở modal       |
| `onClose`     | `() => void` | Callback khi đóng modal     |
| `onFocus`     | `() => void` | Callback khi focus          |
| `onBlur`      | `() => void` | Callback khi blur           |
| `onClear`     | `() => void` | Callback khi xóa            |
| `onModalShow` | `() => void` | Callback khi modal hiển thị |
| `onModalHide` | `() => void` | Callback khi modal ẩn       |

### Style Props

DatePicker hỗ trợ nhiều style props để tùy chỉnh giao diện:

- `containerStyle`: Style cho container chính
- `inputStyle`: Style cho text input
- `labelStyle`: Style cho label
- `inputContainerStyle`: Style cho container của input
- `helperTextStyle`: Style cho helper text
- `errorTextStyle`: Style cho error text
- `modalStyle`: Style cho modal
- `modalContentStyle`: Style cho nội dung modal
- `modalHeaderStyle`: Style cho header của modal
- `modalFooterStyle`: Style cho footer của modal
- `modalTitleStyle`: Style cho tiêu đề modal
- và nhiều props khác...

### Render Props

DatePicker hỗ trợ render props để tùy chỉnh hoàn toàn giao diện:

- `renderLabel`: Tùy chỉnh label
- `renderDisplayText`: Tùy chỉnh text hiển thị
- `renderModalHeader`: Tùy chỉnh header modal
- `renderModalFooter`: Tùy chỉnh footer modal
- `renderLeftIcon`: Tùy chỉnh icon bên trái
- `renderRightIcon`: Tùy chỉnh icon bên phải
- `renderChevron`: Tùy chỉnh icon mũi tên

## Ví dụ

### DatePicker với giới hạn ngày

```tsx
<DatePicker
  label="Ngày bắt đầu"
  placeholder="Chọn ngày..."
  value={selectedDate}
  onChange={setSelectedDate}
  minDate="2024-01-01"
  maxDate="2024-12-31"
  helperText="Chỉ được chọn từ 01/01/2024 đến 31/12/2024"
/>
```

### DatePicker bắt buộc với validation

```tsx
<DatePicker
  label="Ngày khám bệnh"
  placeholder="Chọn ngày khám..."
  value={selectedDate}
  onChange={setSelectedDate}
  isRequired
  isError={!selectedDate}
  errorText={!selectedDate ? 'Vui lòng chọn ngày khám' : undefined}
/>
```

### DatePicker với modal từ dưới lên

```tsx
<DatePicker
  label="Ngày đặt hàng"
  placeholder="Chọn ngày đặt hàng..."
  value={selectedDate}
  onChange={setSelectedDate}
  modalPosition="bottom"
  modalTitle="Chọn ngày đặt hàng"
  confirmButtonText="Chọn"
  cancelButtonText="Đóng"
/>
```

### DatePicker với variant khác nhau

```tsx
{
  /* Outline (default) */
}
<DatePicker
  label="Outline"
  variant="outline"
  value={date}
  onChange={setDate}
/>;

{
  /* Filled */
}
<DatePicker label="Filled" variant="filled" value={date} onChange={setDate} />;

{
  /* Underline */
}
<DatePicker
  label="Underline"
  variant="underline"
  value={date}
  onChange={setDate}
/>;
```

### DatePicker với custom colors

```tsx
<DatePicker
  label="Ngày sự kiện"
  placeholder="Chọn ngày sự kiện..."
  value={selectedDate}
  onChange={setSelectedDate}
  borderColorActive="#FF6B6B"
  selectedDayBackgroundColor="#FF6B6B"
  todayTextColor="#FF6B6B"
/>
```

### DatePicker với markedDates

```tsx
<DatePicker
  label="Chọn ngày"
  value={selectedDate}
  onChange={setSelectedDate}
  markedDates={{
    '2024-01-15': { marked: true, dotColor: 'red' },
    '2024-01-20': { marked: true, dotColor: 'blue' },
    '2024-01-25': { disabled: true, disableTouchEvent: true },
  }}
/>
```

### DatePicker với custom format

```tsx
<DatePicker
  label="Ngày sinh"
  value={selectedDate}
  onChange={setSelectedDate}
  dateFormat="DD-MM-YYYY"
  // hoặc sử dụng custom function
  formatDate={(date) => {
    // date format: YYYY-MM-DD
    const [year, month, day] = date.split('-');
    return `${day} tháng ${month}, ${year}`;
  }}
/>
```

### DatePicker với size khác nhau

```tsx
{
  /* Small */
}
<DatePicker label="Small" size="small" value={date} onChange={setDate} />;

{
  /* Medium (default) */
}
<DatePicker label="Medium" size="medium" value={date} onChange={setDate} />;

{
  /* Large */
}
<DatePicker label="Large" size="large" value={date} onChange={setDate} />;
```

### DatePicker với render props

```tsx
<DatePicker
  label="Custom DatePicker"
  value={selectedDate}
  onChange={setSelectedDate}
  renderDisplayText={(displayText, selectedDate) => (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="calendar" size={16} color="#007AFF" />
      <Text style={{ marginLeft: 8 }}>{displayText}</Text>
    </View>
  )}
  renderModalFooter={(onConfirm, onCancel, selectedDate) => (
    <View style={{ flexDirection: 'row', padding: 16 }}>
      <Button onPress={onCancel} title="Cancel" />
      <Button onPress={onConfirm} title="OK" />
    </View>
  )}
/>
```

## Dark Mode Support

Component tự động hỗ trợ Dark Mode dựa trên system theme:

```tsx
// Component tự động điều chỉnh màu sắc theo theme
<DatePicker
  label="Ngày"
  value={selectedDate}
  onChange={setSelectedDate}
/>

// Hoặc tùy chỉnh màu sắc cho dark mode
<DatePicker
  label="Ngày"
  value={selectedDate}
  onChange={setSelectedDate}
  backgroundColor={isDark ? '#1C1C1E' : '#FFFFFF'}
  textColor={isDark ? '#FFFFFF' : '#000000'}
/>
```

## Accessibility

Component hỗ trợ các thuộc tính accessibility:

```tsx
<DatePicker
  label="Ngày sinh"
  value={selectedDate}
  onChange={setSelectedDate}
  accessibilityLabel="Chọn ngày sinh"
  accessibilityHint="Nhấn để mở calendar và chọn ngày"
  testID="birthday-date-picker"
/>
```

## Lưu ý

1. **Date Format**: Giá trị `value` và `onChange` luôn sử dụng format `YYYY-MM-DD` (ISO 8601)
2. **Display Format**: Bạn có thể tùy chỉnh format hiển thị bằng prop `dateFormat` hoặc `formatDate`
3. **Min/Max Date**: Khi set `minDate` hoặc `maxDate`, đảm bảo sử dụng format `YYYY-MM-DD`
4. **Safe Area**: Component tự động xử lý safe area cho iOS và Android
5. **Dark Mode**: Component tự động điều chỉnh theo system theme, bạn cũng có thể tùy chỉnh màu sắc
6. **Dependencies**: Đảm bảo đã cài đặt đầy đủ peer dependencies

## API Reference

Xem thêm tại [react-native-calendars](https://github.com/wix/react-native-calendars) để biết thêm về calendar props và customization.
