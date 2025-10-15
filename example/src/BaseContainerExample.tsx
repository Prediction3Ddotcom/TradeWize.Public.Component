import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BaseContainer from '../../src/components/baseContainer';
import { CustomText } from '../../src/components/text';
import { Button } from '../../src/components/button';

/**
 * BaseContainer Example
 *
 * BaseContainer là component wrapper chính cho các màn hình,
 * tự động xử lý safe area (notch, status bar) và background.
 */
export default function BaseContainerExample() {
  const [bgColor, setBgColor] = useState('#fff');
  const [statusBarStyle, setStatusBarStyle] = useState<
    'light-content' | 'dark-content'
  >('dark-content');
  const [isPaddingEnabled, setIsPaddingEnabled] = useState(true);

  return (
    <BaseContainer
      backgroundColor={bgColor}
      statusBarStyle={statusBarStyle}
      isPaddingToSafeArea={isPaddingEnabled}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <CustomText variant="h1" style={styles.title}>
            BaseContainer Examples
          </CustomText>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              1. Basic Usage
            </CustomText>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`<BaseContainer>
  <YourContent />
</BaseContainer>`}
              </CustomText>
            </View>
            <CustomText style={styles.description}>
              Sử dụng cơ bản nhất, tự động xử lý safe area và background trắng.
            </CustomText>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              2. Background Color
            </CustomText>
            <View style={styles.buttonRow}>
              <Button
                variant={bgColor === '#fff' ? 'primary' : 'outline'}
                onPress={() => setBgColor('#fff')}
                style={styles.smallButton}
              >
                <CustomText>White</CustomText>
              </Button>
              <Button
                variant={bgColor === '#f5f5f5' ? 'primary' : 'outline'}
                onPress={() => setBgColor('#f5f5f5')}
                style={styles.smallButton}
              >
                <CustomText>Gray</CustomText>
              </Button>
              <Button
                variant={bgColor === '#1a1a1a' ? 'primary' : 'outline'}
                onPress={() => setBgColor('#1a1a1a')}
                style={styles.smallButton}
              >
                <CustomText>Dark</CustomText>
              </Button>
            </View>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`<BaseContainer backgroundColor="${bgColor}">
  <YourContent />
</BaseContainer>`}
              </CustomText>
            </View>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              3. Status Bar Style
            </CustomText>
            <View style={styles.buttonRow}>
              <Button
                variant={
                  statusBarStyle === 'dark-content' ? 'primary' : 'outline'
                }
                onPress={() => setStatusBarStyle('dark-content')}
                style={styles.smallButton}
              >
                <CustomText>Dark</CustomText>
              </Button>
              <Button
                variant={
                  statusBarStyle === 'light-content' ? 'primary' : 'outline'
                }
                onPress={() => setStatusBarStyle('light-content')}
                style={styles.smallButton}
              >
                <CustomText>Light</CustomText>
              </Button>
            </View>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`<BaseContainer 
  statusBarStyle="${statusBarStyle}"
>
  <YourContent />
</BaseContainer>`}
              </CustomText>
            </View>
            <CustomText style={styles.description}>
              • dark-content: text màu đen (dùng cho background sáng)
              {'\n'}• light-content: text màu trắng (dùng cho background tối)
            </CustomText>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              4. Safe Area Padding
            </CustomText>
            <Button
              variant={isPaddingEnabled ? 'primary' : 'outline'}
              onPress={() => setIsPaddingEnabled(!isPaddingEnabled)}
              style={styles.button}
            >
              <CustomText>
                {isPaddingEnabled ? 'Disable' : 'Enable'} Safe Area Padding
              </CustomText>
            </Button>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`<BaseContainer 
  isPaddingToSafeArea={${isPaddingEnabled}}
>
  <YourContent />
</BaseContainer>`}
              </CustomText>
            </View>
            <CustomText style={styles.description}>
              Tự động thêm padding cho notch/status bar (top) và home indicator
              (bottom)
            </CustomText>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              5. Custom Style
            </CustomText>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`<BaseContainer 
  style={{ paddingHorizontal: 20 }}
>
  <YourContent />
</BaseContainer>`}
              </CustomText>
            </View>
            <CustomText style={styles.description}>
              Có thể thêm custom style cho content area
            </CustomText>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              📝 Props Summary
            </CustomText>
            <View style={styles.propsTable}>
              <View style={styles.propRow}>
                <CustomText style={styles.propName}>children</CustomText>
                <CustomText style={styles.propType}>ReactNode</CustomText>
                <CustomText style={styles.propDesc}>
                  Nội dung bên trong
                </CustomText>
              </View>
              <View style={styles.propRow}>
                <CustomText style={styles.propName}>backgroundColor</CustomText>
                <CustomText style={styles.propType}>string</CustomText>
                <CustomText style={styles.propDesc}>
                  Màu nền (default: '#fff')
                </CustomText>
              </View>
              <View style={styles.propRow}>
                <CustomText style={styles.propName}>statusBarStyle</CustomText>
                <CustomText style={styles.propType}>
                  'light-content' | 'dark-content'
                </CustomText>
                <CustomText style={styles.propDesc}>
                  Style của status bar (default: 'dark-content')
                </CustomText>
              </View>
              <View style={styles.propRow}>
                <CustomText style={styles.propName}>
                  isPaddingToSafeArea
                </CustomText>
                <CustomText style={styles.propType}>boolean</CustomText>
                <CustomText style={styles.propDesc}>
                  Tự động padding safe area (default: true)
                </CustomText>
              </View>
              <View style={styles.propRow}>
                <CustomText style={styles.propName}>style</CustomText>
                <CustomText style={styles.propType}>StyleProp</CustomText>
                <CustomText style={styles.propDesc}>Custom style</CustomText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              💡 Use Cases
            </CustomText>
            <CustomText style={styles.description}>
              {`• Screen wrapper chính cho mọi màn hình\n• Tự động xử lý safe area cho iPhone X+\n• Quản lý background color và status bar\n• Có thể kết hợp với Header component\n• Support cả light và dark mode`}
            </CustomText>
          </View>

          <View style={styles.section}>
            <CustomText variant="h2" style={styles.sectionTitle}>
              🔥 Complete Example
            </CustomText>
            <View style={styles.codeBlock}>
              <CustomText variant="caption" style={styles.code}>
                {`import BaseContainer from './components/baseContainer';
import HeaderBase from './components/header';

function MyScreen() {
  return (
    <BaseContainer
      backgroundColor="#f5f5f5"
      statusBarStyle="dark-content"
      isPaddingToSafeArea={true}
    >
      <HeaderBase 
        title="My Screen"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView>
        {/* Your content here */}
      </ScrollView>
    </BaseContainer>
  );
}`}
              </CustomText>
            </View>
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
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
    marginVertical: 8,
  },
  code: {
    fontFamily: 'monospace',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
  },
  smallButton: {
    flex: 1,
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
});
