import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../src';

export function TextExample() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="h1" style={styles.sectionTitle}>
          Text Component Demo
        </Text>
        <Text variant="body" color="secondary" style={styles.description}>
          Component Text này có kích thước font cố định và không bị ảnh hưởng
          bởi cài đặt accessibility của device
        </Text>
      </View>

      {/* Headings */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Headings
        </Text>
        <Text variant="h1">Heading 1 (32px)</Text>
        <Text variant="h2">Heading 2 (28px)</Text>
        <Text variant="h3">Heading 3 (24px)</Text>
        <Text variant="h4">Heading 4 (20px)</Text>
        <Text variant="h5">Heading 5 (18px)</Text>
        <Text variant="h6">Heading 6 (16px)</Text>
      </View>

      {/* Body Text */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Body Text
        </Text>
        <Text variant="body">
          Đây là body text với kích thước 16px và line height 24px. Text này sẽ
          không thay đổi kích thước khi người dùng thay đổi cài đặt font size
          trong device.
        </Text>
        <Text variant="bodySmall" style={styles.marginTop}>
          Đây là body small text với kích thước 14px và line height 20px.
        </Text>
      </View>

      {/* Colors */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Colors
        </Text>
        <Text variant="body" color="primary">
          Primary Color
        </Text>
        <Text variant="body" color="secondary">
          Secondary Color
        </Text>
        <Text variant="body" color="tertiary">
          Tertiary Color
        </Text>
        <Text variant="body" color="error">
          Error Color
        </Text>
        <Text variant="body" color="success">
          Success Color
        </Text>
        <Text variant="body" color="warning">
          Warning Color
        </Text>
      </View>

      {/* Weights */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Font Weights
        </Text>
        <Text variant="body" weight="normal">
          Normal Weight (400)
        </Text>
        <Text variant="body" weight="medium">
          Medium Weight (500)
        </Text>
        <Text variant="body" weight="semibold">
          Semibold Weight (600)
        </Text>
        <Text variant="body" weight="bold">
          Bold Weight (700)
        </Text>
      </View>

      {/* Alignment */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Text Alignment
        </Text>
        <Text variant="body" align="left">
          Left aligned text
        </Text>
        <Text variant="body" align="center">
          Center aligned text
        </Text>
        <Text variant="body" align="right">
          Right aligned text
        </Text>
        <Text variant="body" align="justify" style={styles.justifyText}>
          Justified text will distribute the text evenly across the full width
          of the container. This is useful for creating clean,
          professional-looking paragraphs.
        </Text>
      </View>

      {/* Other Variants */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Other Variants
        </Text>
        <Text variant="caption">Caption text (12px)</Text>
        <Text variant="overline">OVERLINE TEXT (10px, uppercase)</Text>
        <Text variant="button">Button Text (16px, semibold)</Text>
        <Text variant="label">Label Text (14px, medium)</Text>
      </View>

      {/* Number of Lines */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Number of Lines
        </Text>
        <Text variant="body" numberOfLines={2} style={styles.longText}>
          Đây là một đoạn text rất dài để demo tính năng numberOfLines. Khi
          numberOfLines được set là 2, text này sẽ bị cắt sau 2 dòng và hiển thị
          dấu "..." ở cuối.
        </Text>
      </View>

      {/* Custom Style */}
      <View style={styles.section}>
        <Text variant="h2" style={styles.sectionTitle}>
          Custom Style
        </Text>
        <Text
          variant="body"
          style={[styles.customText, styles.customTextBackground]}
        >
          Text với custom style - background màu xanh nhạt, padding và border
          radius
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  justifyText: {
    marginTop: 8,
  },
  longText: {
    marginTop: 8,
  },
  customText: {
    marginTop: 8,
  },
  customTextBackground: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 4,
  },
});
