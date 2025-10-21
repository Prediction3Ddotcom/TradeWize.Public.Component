# MonthYearPicker Component

Component chọn tháng và năm với modal scroll picker cho React Native.

## Cài đặt

Đảm bảo bạn đã cài đặt các dependencies cần thiết:

```bash
npm install react-native-modal react-native-safe-area-context react-native-fast-shadow dayjs
# hoặc
yarn add react-native-modal react-native-safe-area-context react-native-fast-shadow dayjs
```

## Sử dụng cơ bản

```tsx
import MonthYearPicker from 'tradewize-component/monthYearPicker';
import { useState } from 'react';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MonthYearPicker
      placeholder="Chọn tháng và năm..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate ?? undefined}
    />
  );
}
```

## Props

### Basic Props

| Prop              | Type                             | Default                  | Mô tả                                         |
| ----------------- | -------------------------------- | ------------------------ | --------------------------------------------- |
| `initialDate`     | `Date`                           | `null`                   | Giá trị ngày tháng năm khởi tạo               |
| `minDate`         | `Date`                           | `100 năm trước`          | Ngày nhỏ nhất có thể chọn                     |
| `maxDate`         | `Date`                           | `100 năm sau`            | Ngày lớn nhất có thể chọn                     |
| `maxDateSelect`   | `Date`                           | `new Date()`             | Ngày tối đa có thể chọn (để validation)       |
| `placeholder`     | `string`                         | `''`                     | Text hiển thị khi chưa chọn                   |
| `onChange`        | `(date: Date \| string) => void` | -                        | Callback khi tháng/năm được chọn              |
| `disabled`        | `boolean`                        | `false`                  | Vô hiệu hóa MonthYearPicker                   |
| `disabledCancel`  | `boolean`                        | `false`                  | Vô hiệu hóa nút Cancel                        |
| `disabledConfirm` | `boolean`                        | `false`                  | Vô hiệu hóa nút Confirm                       |
| `isShowError`     | `boolean`                        | `false`                  | Hiển thị thông báo lỗi                        |
| `textError`       | `string`                         | `'Cannot exceed the...'` | Nội dung thông báo lỗi                        |
| `styleInput`      | `StyleProp<ViewStyle>`           | -                        | Custom style cho input container              |
| `months`          | `{ [key: string]: string }`      | English month names      | Custom tên tháng (có thể dùng để đa ngôn ngữ) |

### Month Names

Mặc định, component sử dụng tên tháng tiếng Anh:

```typescript
{
  JANUARY: 'January',
  FEBRUARY: 'February',
  MARCH: 'March',
  APRIL: 'April',
  MAY: 'May',
  JUNE: 'June',
  JULY: 'July',
  AUGUST: 'August',
  SEPTEMBER: 'September',
  OCTOBER: 'October',
  NOVEMBER: 'November',
  DECEMBER: 'December',
}
```

Bạn có thể tùy chỉnh tên tháng thông qua prop `months`.

## Ví dụ

### MonthYearPicker cơ bản

```tsx
import MonthYearPicker from 'tradewize-component/monthYearPicker';
import { useState } from 'react';

function BasicExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MonthYearPicker
      placeholder="Chọn tháng và năm..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate ?? undefined}
    />
  );
}
```

### MonthYearPicker với giá trị mặc định

```tsx
function DefaultValueExample() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(2024, 0, 1) // January 2024
  );

  return (
    <MonthYearPicker
      placeholder="Chọn tháng và năm..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate}
    />
  );
}
```

### MonthYearPicker với giới hạn min/max date

```tsx
function MinMaxDateExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MonthYearPicker
      placeholder="Chọn tháng và năm..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate ?? undefined}
      minDate={new Date(2020, 0, 1)} // January 2020
      maxDate={new Date(2025, 11, 31)} // December 2025
    />
  );
}
```

### MonthYearPicker với giới hạn thời gian hiện tại

```tsx
function MaxDateSelectExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MonthYearPicker
      placeholder="Chọn tháng và năm..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate ?? undefined}
      maxDateSelect={new Date()} // Không được vượt quá tháng hiện tại
      isShowError={true}
      textError="Không được chọn tháng vượt quá thời gian hiện tại"
    />
  );
}
```

### MonthYearPicker bị vô hiệu hóa

```tsx
function DisabledExample() {
  return (
    <MonthYearPicker
      placeholder="Không thể chọn..."
      onChange={() => {}}
      initialDate={new Date(2024, 5, 1)} // June 2024
      disabled={true}
    />
  );
}
```

### MonthYearPicker với custom style

```tsx
function CustomStyleExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MonthYearPicker
      placeholder="Chọn tháng sinh..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate ?? undefined}
      styleInput={{
        backgroundColor: '#E3F2FD',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2196F3',
      }}
    />
  );
}
```

### MonthYearPicker với tên tháng tiếng Việt

```tsx
function VietnameseMonthsExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <MonthYearPicker
      placeholder="Chọn tháng và năm..."
      onChange={(date) => setSelectedDate(date as Date)}
      initialDate={selectedDate ?? undefined}
      months={{
        JANUARY: 'Tháng 1',
        FEBRUARY: 'Tháng 2',
        MARCH: 'Tháng 3',
        APRIL: 'Tháng 4',
        MAY: 'Tháng 5',
        JUNE: 'Tháng 6',
        JULY: 'Tháng 7',
        AUGUST: 'Tháng 8',
        SEPTEMBER: 'Tháng 9',
        OCTOBER: 'Tháng 10',
        NOVEMBER: 'Tháng 11',
        DECEMBER: 'Tháng 12',
      }}
    />
  );
}
```

### MonthYearPicker với validation phức tạp

```tsx
function ValidationExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleChange = (date: Date | string) => {
    const selectedDate = date as Date;
    const now = new Date();

    if (
      selectedDate.getFullYear() > now.getFullYear() ||
      (selectedDate.getFullYear() === now.getFullYear() &&
        selectedDate.getMonth() > now.getMonth())
    ) {
      setError('Không được chọn tháng trong tương lai');
    } else {
      setError('');
      setSelectedDate(selectedDate);
    }
  };

  return (
    <>
      <MonthYearPicker
        placeholder="Chọn tháng và năm..."
        onChange={handleChange}
        initialDate={selectedDate ?? undefined}
        maxDateSelect={new Date()}
        isShowError={!!error}
        textError={error}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </>
  );
}
```

## Hiển thị giá trị

Component trả về giá trị dạng `Date`. Bạn có thể format theo nhu cầu:

```tsx
import dayjs from 'dayjs';

function DisplayValueExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <MonthYearPicker
        placeholder="Chọn tháng và năm..."
        onChange={(date) => setSelectedDate(date as Date)}
        initialDate={selectedDate ?? undefined}
      />
      {selectedDate && (
        <Text>Giá trị đã chọn: {dayjs(selectedDate).format('MM/YYYY')}</Text>
      )}
    </>
  );
}
```

## Các format khác:

```typescript
// MM/YYYY - 01/2024
dayjs(selectedDate).format('MM/YYYY');

// MM-YYYY - 01-2024
dayjs(selectedDate).format('MM-YYYY');

// MMMM YYYY - January 2024
dayjs(selectedDate).format('MMMM YYYY');

// MMM YYYY - Jan 2024
dayjs(selectedDate).format('MMM YYYY')
// Tháng M, YYYY (tiếng Việt)
`Tháng ${selectedDate.getMonth() + 1}, ${selectedDate.getFullYear()}`;
```

## Tính năng

### Infinite Scroll cho Tháng

Component sử dụng infinite scroll cho danh sách tháng, cho phép người dùng cuộn vô hạn mà không bị giới hạn bởi đầu hoặc cuối danh sách.

### Snap to Interval

Component sử dụng snap to interval để tự động căn giữa item khi người dùng ngừng cuộn, tạo trải nghiệm mượt mà và chính xác.

### Highlight Box

Component hiển thị một khung highlight để đánh dấu item đang được chọn, giúp người dùng dễ dàng nhận biết lựa chọn của mình.

### Validation

Component tự động kiểm tra giá trị được chọn có vượt quá `maxDateSelect` hay không, và hiển thị thông báo lỗi nếu cần.

## Styling

Component sử dụng các màu sắc và kích thước có thể tùy chỉnh:

### Màu sắc mặc định:

- **Background**: `#FFFFFF` (modal), `#F6F8FE` (input)
- **Border**: `#002E94` (highlight box)
- **Text**: `#000000` (selected), `#78828A` (unselected)
- **Disabled**: `#9CA4AB`
- **Error**: `#FF0000`

### Kích thước:

- **Item Height**: `52px`
- **Visible Items**: `5`
- **Picker Height**: `260px` (52px × 5)

Bạn có thể tùy chỉnh style thông qua prop `styleInput`:

```tsx
<MonthYearPicker
  styleInput={{
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
    padding: 16,
  }}
/>
```

## Safe Area

Component tự động xử lý safe area cho iOS và Android thông qua `useSafeAreaInsets` từ `react-native-safe-area-context`.

## Accessibility

Component hỗ trợ accessibility:

- Sử dụng `CustomText` component với các thuộc tính accessibility
- Button components có thể được truy cập bằng screen reader
- Modal có thể đóng bằng cách nhấn vào backdrop

## Lưu ý

1. **Date Value**: Component trả về `Date` object với ngày được set là ngày 1 của tháng
2. **Min/Max Date**: Khi set `minDate` hoặc `maxDate`, component sẽ giới hạn danh sách năm theo range này
3. **Max Date Select**: Sử dụng `maxDateSelect` để validation, khác với `maxDate` dùng để giới hạn danh sách
4. **Months Object**: Phải có đầy đủ 12 tháng với key là tên tháng tiếng Anh viết hoa
5. **Initial Date**: Nếu không truyền `initialDate`, component sẽ mặc định là tháng/năm hiện tại khi mở modal
6. **Safe Area**: Component tự động xử lý safe area, không cần wrapper thêm SafeAreaView
7. **Dependencies**: Đảm bảo đã cài đặt đầy đủ peer dependencies

## Performance

Component được tối ưu hóa với:

- `useMemo` cho danh sách tháng và năm
- `useRef` cho scroll references
- `requestAnimationFrame` cho scroll animations
- Infinite scroll với efficient re-rendering

## Troubleshooting

### Modal không hiển thị

Đảm bảo component được wrap trong `SafeAreaProvider`:

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <YourComponent />
    </SafeAreaProvider>
  );
}
```

### Scroll không mượt

Kiểm tra performance của device và đảm bảo không có quá nhiều heavy computations trong render cycle.

### Custom months không hoạt động

Đảm bảo object `months` có đầy đủ 12 keys với tên tháng tiếng Anh viết hoa (JANUARY, FEBRUARY, ..., DECEMBER).

## API Reference

Component sử dụng:

- [react-native-modal](https://github.com/react-native-modal/react-native-modal) cho modal
- [react-native-fast-shadow](https://github.com/alan-eu/react-native-fast-shadow) cho shadow effects
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) cho safe area handling
- [dayjs](https://day.js.org/) cho date manipulation
