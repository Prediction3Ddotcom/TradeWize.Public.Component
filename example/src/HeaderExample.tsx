import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import BaseContainer from '../../src/components/baseContainer';
import HeaderBase, { type HeaderAction } from '../../src/components/header';
import { CustomText } from '../../src/components/text';
import { Button } from '../../src/components/button';

/**
 * HeaderBase Example
 *
 * HeaderBase là component header linh hoạt với nhiều tùy chọn:
 * - Title (string hoặc custom component)
 * - Left/Right actions
 * - Default back button
 * - Custom styling
 */

// Component definitions moved outside to avoid re-rendering issues
function SearchIcon() {
  return <CustomText style={styles.iconText}>🔍</CustomText>;
}

function MenuIcon() {
  return <CustomText style={styles.iconText}>☰</CustomText>;
}

function CustomTitle() {
  return (
    <View style={styles.customTitleContainer}>
      <CustomText style={styles.customTitleMain}>TradeWize</CustomText>
      <CustomText style={styles.customTitleSub}>
        Your Trading Partner
      </CustomText>
    </View>
  );
}

function ChatTitle() {
  return (
    <View>
      <CustomText style={styles.chatTitleMain}>John Doe</CustomText>
      <CustomText style={styles.chatTitleSub}>Online</CustomText>
    </View>
  );
}

function CartIcon() {
  return <CustomText style={styles.iconText}>🛒</CustomText>;
}

function CallIcon() {
  return <CustomText style={styles.iconText}>📞</CustomText>;
}

function InfoIcon() {
  return <CustomText style={styles.iconText}>ℹ️</CustomText>;
}

export default function HeaderExample() {
  const [exampleIndex, setExampleIndex] = useState(0);

  const examples = [
    {
      title: '1. Basic Header',
      description: 'Header cơ bản với title',
      render: () => <HeaderBase title="Basic Header" showDefaultLeft={false} />,
      code: `<HeaderBase 
  title="Basic Header" 
  showDefaultLeft={false} 
/>`,
    },
    {
      title: '2. Header with Back Button',
      description: 'Header với nút back mặc định',
      render: () => (
        <HeaderBase
          title="With Back Button"
          onPressBack={() => Alert.alert('Back pressed')}
        />
      ),
      code: `<HeaderBase 
  title="With Back Button"
  onPressBack={() => navigation.goBack()}
/>`,
    },
    {
      title: '3. Title Alignment',
      description: 'Title căn trái, giữa, phải',
      render: () => (
        <View>
          <HeaderBase
            title="Left Aligned"
            titleAlign="left"
            showDefaultLeft={false}
          />
          <View style={styles.divider} />
          <HeaderBase
            title="Center Aligned"
            titleAlign="center"
            showDefaultLeft={false}
          />
          <View style={styles.divider} />
          <HeaderBase
            title="Right Aligned"
            titleAlign="right"
            showDefaultLeft={false}
          />
        </View>
      ),
      code: `<HeaderBase title="Left" titleAlign="left" />
<HeaderBase title="Center" titleAlign="center" />
<HeaderBase title="Right" titleAlign="right" />`,
    },
    {
      title: '4. Left Actions',
      description: 'Custom actions bên trái',
      render: () => {
        const leftActions: HeaderAction[] = [
          {
            label: 'Cancel',
            onPress: () => Alert.alert('Cancel pressed'),
          },
        ];
        return <HeaderBase title="Left Action" leftActions={leftActions} />;
      },
      code: `const leftActions = [
  {
    label: 'Cancel',
    onPress: () => Alert.alert('Cancel pressed'),
  },
];

<HeaderBase 
  title="Left Action" 
  leftActions={leftActions} 
/>`,
    },
    {
      title: '5. Right Actions',
      description: 'Custom actions bên phải',
      render: () => {
        const rightActions: HeaderAction[] = [
          {
            label: 'Done',
            onPress: () => Alert.alert('Done pressed'),
          },
        ];
        return <HeaderBase title="Right Action" rightActions={rightActions} />;
      },
      code: `const rightActions = [
  {
    label: 'Done',
    onPress: () => Alert.alert('Done pressed'),
  },
];

<HeaderBase 
  title="Right Action" 
  rightActions={rightActions} 
/>`,
    },
    {
      title: '6. Multiple Actions',
      description: 'Nhiều actions cả 2 bên',
      render: () => {
        const leftActions: HeaderAction[] = [
          {
            label: 'Cancel',
            onPress: () => Alert.alert('Cancel'),
          },
        ];
        const rightActions: HeaderAction[] = [
          {
            label: 'Save',
            onPress: () => Alert.alert('Save'),
          },
          {
            label: 'Share',
            onPress: () => Alert.alert('Share'),
          },
        ];
        return (
          <HeaderBase
            title="Multiple Actions"
            leftActions={leftActions}
            rightActions={rightActions}
          />
        );
      },
      code: `const leftActions = [
  { label: 'Cancel', onPress: () => {} },
];
const rightActions = [
  { label: 'Save', onPress: () => {} },
  { label: 'Share', onPress: () => {} },
];

<HeaderBase 
  title="Multiple Actions"
  leftActions={leftActions}
  rightActions={rightActions} 
/>`,
    },
    {
      title: '7. Icon Actions',
      description: 'Actions với icon thay vì text',
      render: () => {
        const rightActions: HeaderAction[] = [
          {
            icon: <SearchIcon />,
            onPress: () => Alert.alert('Search'),
          },
          {
            icon: <MenuIcon />,
            onPress: () => Alert.alert('Menu'),
          },
        ];
        return (
          <HeaderBase
            title="Icon Actions"
            rightActions={rightActions}
            onPressBack={() => Alert.alert('Back')}
          />
        );
      },
      code: `const rightActions = [
  {
    icon: <SearchIcon />,
    onPress: () => Alert.alert('Search'),
  },
  {
    icon: <MenuIcon />,
    onPress: () => Alert.alert('Menu'),
  },
];

<HeaderBase 
  title="Icon Actions" 
  rightActions={rightActions} 
/>`,
    },
    {
      title: '8. Custom Height & Background',
      description: 'Tùy chỉnh chiều cao và màu nền',
      render: () => (
        <HeaderBase
          title="Custom Style"
          height={80}
          backgroundColor="#007AFF"
          titleStyle={styles.customTitleStyle}
          onPressBack={() => Alert.alert('Back')}
        />
      ),
      code: `<HeaderBase 
  title="Custom Style"
  height={80}
  backgroundColor="#007AFF"
  titleStyle={{ color: '#fff', fontSize: 22 }}
/>`,
    },
    {
      title: '9. With Border',
      description: 'Header với border bottom',
      render: () => (
        <HeaderBase title="With Border" border={true} showDefaultLeft={false} />
      ),
      code: `<HeaderBase 
  title="With Border" 
  border={true} 
/>`,
    },
    {
      title: '10. Custom Title Component',
      description: 'Title là custom component',
      render: () => {
        return (
          <HeaderBase
            title={<CustomTitle />}
            height={70}
            onPressBack={() => Alert.alert('Back')}
          />
        );
      },
      code: `const CustomTitle = () => (
  <View>
    <Text>TradeWize</Text>
    <Text>Your Trading Partner</Text>
  </View>
);

<HeaderBase 
  title={<CustomTitle />}
  height={70}
/>`,
    },
    {
      title: '11. Custom Content',
      description: 'Tùy chỉnh hoàn toàn nội dung header',
      render: () => (
        <HeaderBase
          renderCustomContent={() => (
            <View style={styles.customContent}>
              <CustomText style={styles.customContentText}>
                🎨 Completely Custom Header
              </CustomText>
            </View>
          )}
        />
      ),
      code: `<HeaderBase 
  renderCustomContent={() => (
    <View style={styles.customContent}>
      <Text>Custom Content</Text>
    </View>
  )}
/>`,
    },
    {
      title: '12. E-commerce Header',
      description: 'Ví dụ thực tế: Header cho app shopping',
      render: () => {
        const rightActions: HeaderAction[] = [
          {
            icon: <SearchIcon />,
            onPress: () => Alert.alert('Search'),
          },
          {
            icon: <CartIcon />,
            onPress: () => Alert.alert('Cart'),
          },
        ];
        return (
          <HeaderBase
            title="Shop"
            titleAlign="left"
            rightActions={rightActions}
            showDefaultLeft={false}
            backgroundColor="#fff"
            border={true}
          />
        );
      },
      code: `// E-commerce Header
const rightActions = [
  { icon: <SearchIcon />, onPress: () => {} },
  { icon: <CartIcon />, onPress: () => {} },
];

<HeaderBase 
  title="Shop"
  titleAlign="left"
  rightActions={rightActions}
  showDefaultLeft={false}
  border={true}
/>`,
    },
    {
      title: '13. Chat Header',
      description: 'Ví dụ thực tế: Header cho chat',
      render: () => {
        const rightActions: HeaderAction[] = [
          {
            icon: <CallIcon />,
            onPress: () => Alert.alert('Call'),
          },
          {
            icon: <InfoIcon />,
            onPress: () => Alert.alert('Info'),
          },
        ];
        return (
          <HeaderBase
            title={<ChatTitle />}
            titleAlign="left"
            rightActions={rightActions}
            onPressBack={() => Alert.alert('Back')}
            height={64}
          />
        );
      },
      code: `// Chat Header
const ChatTitle = () => (
  <View>
    <Text>John Doe</Text>
    <Text>Online</Text>
  </View>
);

<HeaderBase 
  title={<ChatTitle />}
  titleAlign="left"
  rightActions={[
    { icon: <CallIcon /> },
    { icon: <InfoIcon /> },
  ]}
/>`,
    },
  ];

  const currentExample = examples[exampleIndex];

  return (
    <BaseContainer>
      <View style={styles.container}>
        {/* Demo Area */}
        <View style={styles.demoArea}>{currentExample?.render()}</View>

        {/* Content Area */}
        <ScrollView style={styles.content}>
          <CustomText variant="h1" style={styles.mainTitle}>
            HeaderBase Examples
          </CustomText>

          <CustomText variant="h2" style={styles.sectionTitle}>
            {currentExample?.title}
          </CustomText>
          <CustomText style={styles.description}>
            {currentExample?.description}
          </CustomText>

          <View style={styles.codeBlock}>
            <CustomText variant="caption" style={styles.code}>
              {currentExample?.code}
            </CustomText>
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <Button
              variant="outline"
              onPress={() =>
                setExampleIndex(
                  exampleIndex > 0 ? exampleIndex - 1 : examples.length - 1
                )
              }
              style={styles.navButton}
            >
              <CustomText>← Previous</CustomText>
            </Button>
            <CustomText style={styles.pageIndicator}>
              {exampleIndex + 1} / {examples.length}
            </CustomText>
            <Button
              variant="outline"
              onPress={() =>
                setExampleIndex((exampleIndex + 1) % examples.length)
              }
              style={styles.navButton}
            >
              <CustomText>Next →</CustomText>
            </Button>
          </View>

          {/* Props Documentation */}
          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              📝 Props Summary
            </CustomText>
            <View style={styles.propsTable}>
              <PropRow
                name="title"
                type="string | ReactNode"
                description="Tiêu đề (text hoặc custom component)"
              />
              <PropRow
                name="titleAlign"
                type="'left' | 'center' | 'right'"
                description="Căn chỉnh title (default: 'center')"
              />
              <PropRow
                name="leftActions"
                type="HeaderAction[]"
                description="Các nút bên trái"
              />
              <PropRow
                name="rightActions"
                type="HeaderAction[]"
                description="Các nút bên phải"
              />
              <PropRow
                name="showDefaultLeft"
                type="boolean"
                description="Hiển thị nút back mặc định (default: true)"
              />
              <PropRow
                name="onPressBack"
                type="() => void"
                description="Callback khi nhấn nút back"
              />
              <PropRow
                name="height"
                type="number"
                description="Chiều cao header (default: 56)"
              />
              <PropRow
                name="backgroundColor"
                type="string"
                description="Màu nền (default: '#fff')"
              />
              <PropRow
                name="border"
                type="boolean"
                description="Hiển thị border bottom"
              />
              <PropRow
                name="containerStyle"
                type="ViewStyle"
                description="Custom style cho container"
              />
              <PropRow
                name="titleStyle"
                type="TextStyle"
                description="Custom style cho title"
              />
              <PropRow
                name="styleButtonLeft"
                type="ViewStyle"
                description="Custom style cho nút trái"
              />
              <PropRow
                name="renderCustomContent"
                type="() => ReactNode"
                description="Custom hoàn toàn nội dung header"
              />
            </View>
          </View>

          {/* HeaderAction Interface */}
          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              📦 HeaderAction Interface
            </CustomText>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`interface HeaderAction {
  icon?: React.ReactNode;
  label?: string;
  onPress?: () => void;
}`}
              </CustomText>
            </View>
          </View>

          {/* Use Cases */}
          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              💡 Common Use Cases
            </CustomText>
            <CustomText style={styles.description}>
              {`• Navigation header với back button\n• Search & filter actions\n• Chat/messaging header\n• E-commerce product header\n• Settings/profile header\n• Custom branded headers\n• Modal/sheet headers`}
            </CustomText>
          </View>

          {/* Best Practices */}
          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              ✅ Best Practices
            </CustomText>
            <CustomText style={styles.description}>
              {`• Dùng với BaseContainer để handle safe area\n• Giới hạn số lượng actions (max 2-3 mỗi bên)\n• Dùng icon cho actions phổ biến (search, menu...)\n• Đảm bảo hitSlop đủ lớn cho touch target\n• Thống nhất style trong toàn app\n• Test trên nhiều kích thước màn hình\n• Hỗ trợ dark mode nếu cần`}
            </CustomText>
          </View>

          {/* Complete Example */}
          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              🔥 Complete Real-World Example
            </CustomText>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`import BaseContainer from './components/baseContainer';
import HeaderBase from './components/header';

function ProductDetailScreen({ navigation, product }) {
  const rightActions = [
    {
      icon: <ShareIcon />,
      onPress: () => shareProduct(product),
    },
    {
      icon: <FavoriteIcon />,
      onPress: () => toggleFavorite(product),
    },
  ];

  return (
    <BaseContainer>
      <HeaderBase
        title={product.name}
        titleAlign="left"
        rightActions={rightActions}
        onPressBack={() => navigation.goBack()}
        backgroundColor="#fff"
        border={true}
      />
      <ScrollView>
        {/* Product content */}
      </ScrollView>
    </BaseContainer>
  );
}`}
              </CustomText>
            </View>
          </View>
        </ScrollView>
      </View>
    </BaseContainer>
  );
}

// Helper component for props table
function PropRow({
  name,
  type,
  description,
}: {
  name: string;
  type: string;
  description: string;
}) {
  return (
    <View style={styles.propRow}>
      <CustomText style={styles.propName}>{name}</CustomText>
      <CustomText style={styles.propType}>{type}</CustomText>
      <CustomText style={styles.propDesc}>{description}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  demoArea: {
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainTitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    marginTop: 8,
    color: '#666',
    lineHeight: 20,
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  code: {
    fontFamily: 'monospace',
    color: '#333',
    fontSize: 12,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
  pageIndicator: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  propsTable: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  propRow: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  propName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  propType: {
    color: '#007AFF',
    fontSize: 12,
    marginBottom: 4,
  },
  propDesc: {
    color: '#666',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  customTitleContainer: {
    alignItems: 'center',
  },
  customTitleMain: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  customTitleSub: {
    fontSize: 11,
    color: '#666',
  },
  customContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  customContentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconText: {
    fontSize: 20,
  },
  customTitleStyle: {
    color: '#fff',
    fontSize: 22,
  },
  chatTitleMain: {
    fontWeight: '600',
    fontSize: 16,
  },
  chatTitleSub: {
    fontSize: 12,
    color: '#666',
  },
});
