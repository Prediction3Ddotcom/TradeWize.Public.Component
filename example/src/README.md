# Text Component

Component Text được thiết kế để hiển thị text với kích thước font cố định, không bị ảnh hưởng bởi cài đặt accessibility của device.

## Tính năng chính

- **Font size cố định**: Kích thước font không thay đổi khi người dùng thay đổi cài đặt font size trong device
- **Dark mode support**: Tự động thay đổi màu sắc theo theme của device
- **Nhiều variant**: Hỗ trợ các kiểu text khác nhau (heading, body, caption, etc.)
- **Customizable**: Có thể tùy chỉnh màu sắc, font weight, alignment
- **TypeScript support**: Đầy đủ type definitions

## Cách sử dụng

### Import

```typescript
import { Text } from 'tradewize-component';
```

### Basic Usage

```typescript
<Text variant="body">Hello World</Text>
```

### Các Variant có sẵn

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`: Headings với kích thước giảm dần
- `body`: Text thông thường (16px)
- `bodySmall`: Text nhỏ hơn (14px)
- `caption`: Caption text (12px)
- `overline`: Overline text (10px, uppercase)
- `button`: Text cho button (16px, semibold)
- `label`: Label text (14px, medium)

### Màu sắc

- `primary`: Màu chính (trắng/đen tùy theme)
- `secondary`: Màu phụ (xám nhạt)
- `tertiary`: Màu phụ nhạt hơn
- `inverse`: Màu ngược lại với theme
- `error`: Màu đỏ cho lỗi
- `success`: Màu xanh cho thành công
- `warning`: Màu cam cho cảnh báo

### Font Weight

- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

### Text Alignment

- `left`: Căn trái
- `center`: Căn giữa
- `right`: Căn phải
- `justify`: Căn đều

## Ví dụ

```typescript
// Heading
<Text variant="h1">Main Title</Text>

// Body text với màu secondary
<Text variant="body" color="secondary">
  This is a description text
</Text>

// Text với custom style
<Text
  variant="body"
  weight="bold"
  align="center"
  style={{ marginTop: 16 }}
>
  Centered bold text
</Text>

// Text giới hạn số dòng
<Text variant="body" numberOfLines={2}>
  Long text that will be truncated after 2 lines...
</Text>
```

## Props

| Prop               | Type          | Default     | Description           |
| ------------------ | ------------- | ----------- | --------------------- |
| `children`         | `ReactNode`   | -           | Nội dung text         |
| `variant`          | `TextVariant` | `'body'`    | Kiểu text             |
| `color`            | `TextColor`   | `'primary'` | Màu sắc               |
| `weight`           | `TextWeight`  | `'normal'`  | Font weight           |
| `align`            | `TextAlign`   | `'left'`    | Text alignment        |
| `numberOfLines`    | `number`      | -           | Số dòng tối đa        |
| `style`            | `TextStyle`   | -           | Custom style          |
| `allowFontScaling` | `boolean`     | `false`     | Cho phép font scaling |

## Lưu ý

- Component này có `allowFontScaling={false}` để đảm bảo kích thước font cố định
- `includeFontPadding={false}` để tránh layout shift
- Tự động hỗ trợ dark mode
- Kích thước font được tính bằng pixel, không phụ thuộc vào device settings
