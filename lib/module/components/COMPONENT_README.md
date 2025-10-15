# BaseContainer & Header Components

Hướng dẫn sử dụng và test cho BaseContainer và HeaderBase components.

## 📦 Components

### BaseContainer

Component wrapper chính cho các màn hình, tự động xử lý safe area (notch, status bar) và background.

**Props:**

- `children`: ReactNode - Nội dung bên trong
- `backgroundColor?`: string - Màu nền (default: '#fff')
- `statusBarStyle?`: 'light-content' | 'dark-content' - Style của status bar (default: 'dark-content')
- `isPaddingToSafeArea?`: boolean - Tự động padding safe area (default: true)
- `style?`: StyleProp<ViewStyle> - Custom style cho content area

**Example:**

```tsx
import BaseContainer from './components/baseContainer';

function MyScreen() {
  return (
    <BaseContainer
      backgroundColor="#f5f5f5"
      statusBarStyle="dark-content"
      isPaddingToSafeArea={true}
    >
      <YourContent />
    </BaseContainer>
  );
}
```

### HeaderBase

Component header linh hoạt với nhiều tùy chọn: title, left/right actions, default back button, custom styling.

**Props:**

- `title?`: string | ReactNode - Tiêu đề (text hoặc custom component)
- `titleAlign?`: 'left' | 'center' | 'right' - Căn chỉnh title (default: 'center')
- `leftActions?`: HeaderAction[] - Các nút bên trái
- `rightActions?`: HeaderAction[] - Các nút bên phải
- `showDefaultLeft?`: boolean - Hiển thị nút back mặc định (default: true)
- `onPressBack?`: () => void - Callback khi nhấn nút back
- `height?`: number - Chiều cao header (default: 56)
- `backgroundColor?`: string - Màu nền (default: '#fff')
- `border?`: boolean - Hiển thị border bottom
- `containerStyle?`: ViewStyle - Custom style cho container
- `titleStyle?`: TextStyle - Custom style cho title
- `styleButtonLeft?`: ViewStyle - Custom style cho nút trái
- `renderCustomContent?`: () => ReactNode - Custom hoàn toàn nội dung header

**HeaderAction Interface:**

```tsx
interface HeaderAction {
  icon?: React.ReactNode;
  label?: string;
  onPress?: () => void;
}
```

**Example:**

```tsx
import HeaderBase from './components/header';

function MyScreen({ navigation }) {
  const rightActions = [
    {
      icon: <SearchIcon />,
      onPress: () => handleSearch(),
    },
    {
      label: 'Done',
      onPress: () => handleDone(),
    },
  ];

  return (
    <BaseContainer>
      <HeaderBase
        title="My Screen"
        titleAlign="left"
        rightActions={rightActions}
        onPressBack={() => navigation.goBack()}
        border={true}
      />
      <Content />
    </BaseContainer>
  );
}
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
yarn test

# Run specific test file
yarn test baseContainer.test.tsx
yarn test header.test.tsx

# Run tests in watch mode
yarn test --watch
```

### Test Files

- `src/__tests__/baseContainer.test.tsx` - Tests cho BaseContainer component
- `src/__tests__/header.test.tsx` - Tests cho HeaderBase component

### Test Coverage

**BaseContainer Tests:**

- ✅ Renders children correctly
- ✅ Applies default/custom background color
- ✅ Safe area padding (enabled/disabled)
- ✅ Custom style prop
- ✅ Status bar style (light/dark)
- ✅ Multiple children rendering

**HeaderBase Tests:**

- ✅ Renders with title (string/component)
- ✅ Title alignment (left/center/right)
- ✅ Default back button
- ✅ Custom left/right actions
- ✅ Multiple actions
- ✅ Icon actions
- ✅ Custom height & background
- ✅ Border bottom
- ✅ Custom styling
- ✅ Custom content rendering
- ✅ Action visibility filtering
- ✅ Title truncation

## 📱 Examples

### Run Example App

```bash
# Navigate to example directory
cd example

# Install dependencies
yarn install

# Run on iOS
yarn ios

# Run on Android
yarn android
```

### Example Files

- `example/src/BaseContainerExample.tsx` - Demo cách sử dụng BaseContainer với interactive controls
- `example/src/HeaderExample.tsx` - Demo 13 use cases khác nhau của HeaderBase

## 💡 Common Use Cases

### 1. Basic Screen with Header

```tsx
function BasicScreen({ navigation }) {
  return (
    <BaseContainer>
      <HeaderBase
        title="Basic Screen"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView>{/* Your content */}</ScrollView>
    </BaseContainer>
  );
}
```

### 2. Screen with Actions

```tsx
function ActionsScreen({ navigation }) {
  const rightActions = [
    {
      label: 'Save',
      onPress: handleSave,
    },
    {
      label: 'Share',
      onPress: handleShare,
    },
  ];

  return (
    <BaseContainer>
      <HeaderBase
        title="Edit Profile"
        rightActions={rightActions}
        onPressBack={() => navigation.goBack()}
      />
      <Content />
    </BaseContainer>
  );
}
```

### 3. E-commerce Header

```tsx
function ShopScreen() {
  const rightActions = [
    {
      icon: <SearchIcon />,
      onPress: () => navigation.navigate('Search'),
    },
    {
      icon: <CartIcon />,
      onPress: () => navigation.navigate('Cart'),
    },
  ];

  return (
    <BaseContainer backgroundColor="#fff">
      <HeaderBase
        title="Shop"
        titleAlign="left"
        rightActions={rightActions}
        showDefaultLeft={false}
        border={true}
      />
      <ProductList />
    </BaseContainer>
  );
}
```

### 4. Chat Header

```tsx
function ChatScreen({ user, navigation }) {
  const ChatTitle = () => (
    <View>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.status}>{user.isOnline ? 'Online' : 'Offline'}</Text>
    </View>
  );

  const rightActions = [
    {
      icon: <CallIcon />,
      onPress: () => handleCall(),
    },
    {
      icon: <InfoIcon />,
      onPress: () => navigation.navigate('UserInfo'),
    },
  ];

  return (
    <BaseContainer>
      <HeaderBase
        title={<ChatTitle />}
        titleAlign="left"
        rightActions={rightActions}
        onPressBack={() => navigation.goBack()}
        height={64}
      />
      <MessageList />
    </BaseContainer>
  );
}
```

### 5. Dark Mode Screen

```tsx
function DarkScreen({ navigation }) {
  return (
    <BaseContainer backgroundColor="#1a1a1a" statusBarStyle="light-content">
      <HeaderBase
        title="Dark Mode"
        backgroundColor="#1a1a1a"
        titleStyle={{ color: '#fff' }}
        onPressBack={() => navigation.goBack()}
      />
      <Content />
    </BaseContainer>
  );
}
```

## ✅ Best Practices

1. **Always use BaseContainer** cho screen wrapper để handle safe area
2. **Combine BaseContainer + HeaderBase** cho consistent layout
3. **Limit actions** - max 2-3 actions mỗi bên để tránh clutter
4. **Use icons** cho common actions (search, menu, cart...)
5. **Test on multiple devices** - especially devices với notch/dynamic island
6. **Support dark mode** - test cả light và dark themes
7. **Ensure proper hitSlop** - buttons có touch target đủ lớn (default: 10px)
8. **Handle navigation properly** - always provide onPressBack callback

## 🔧 Dependencies

```json
{
  "react-native-safe-area-context": "^4.x.x"
}
```

**Note:** BaseContainer sử dụng `react-native-safe-area-context` để handle safe area. Đảm bảo bạn đã:

1. Install package: `yarn add react-native-safe-area-context`
2. Wrap app với `SafeAreaProvider` trong root component
3. Run `pod install` cho iOS

```tsx
// App.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <YourApp />
    </SafeAreaProvider>
  );
}
```

## 🐛 Troubleshooting

### Safe Area not working

- Đảm bảo app được wrap với `SafeAreaProvider`
- Check `isPaddingToSafeArea` prop của BaseContainer
- Verify `react-native-safe-area-context` được install đúng

### Header back button not showing

- Check `showDefaultLeft` prop (default: true)
- Provide `onPressBack` callback
- Nếu có `leftActions`, nó sẽ override default back button

### Title not aligned correctly

- Use `titleAlign` prop: 'left' | 'center' | 'right'
- Check `titleStyle` for custom styling
- Verify không có conflicting styles

### Actions not appearing

- Check array không empty
- Verify không có `visible: false` trong action object
- Check icon/label được render đúng

## 📚 References

- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest Testing Framework](https://jestjs.io/)

---

**Maintained by:** TradeWize Team  
**Last Updated:** October 2025
