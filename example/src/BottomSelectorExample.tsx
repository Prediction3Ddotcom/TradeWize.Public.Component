import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  BottomSelector,
  type BottomSelectorOption,
  Button,
  Text,
  BaseContainer,
} from 'tradewize-component';

// Example 1: Simple selector
function SimpleExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const options: BottomSelectorOption<string>[] = [
    { label: 'Tùy chọn 1', value: 'option1' },
    { label: 'Tùy chọn 2', value: 'option2' },
    { label: 'Tùy chọn 3', value: 'option3' },
    { label: 'Tùy chọn 4', value: 'option4' },
    { label: 'Tùy chọn 5', value: 'option5' },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Simple Selector</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedValue ?? 'None'}
      </Text>
      <Button
        title="Mở Simple Selector"
        onPress={() => setIsVisible(true)}
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={options}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Chọn một tùy chọn"
      />
    </View>
  );
}

// Example 2: With Icons
function WithIconsExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const options: BottomSelectorOption<string>[] = [
    {
      label: 'Ngân hàng',
      value: 'bank',
      icon: <Text style={styles.iconText}>🏦</Text>,
    },
    {
      label: 'Thẻ tín dụng',
      value: 'credit-card',
      icon: <Text style={styles.iconText}>💳</Text>,
    },
    {
      label: 'Ví điện tử',
      value: 'wallet',
      icon: <Text style={styles.iconText}>👛</Text>,
    },
    {
      label: 'Tiền mặt',
      value: 'cash',
      icon: <Text style={styles.iconText}>💵</Text>,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>With Icons</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedValue ?? 'None'}
      </Text>
      <Button
        title="Chọn phương thức thanh toán"
        onPress={() => setIsVisible(true)}
        variant="secondary"
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={options}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Phương thức thanh toán"
      />
    </View>
  );
}

// Example 3: With Disabled Options
function WithDisabledExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const options: BottomSelectorOption<string>[] = [
    { label: 'Miễn phí', value: 'free' },
    { label: 'Cơ bản - 99.000đ/tháng', value: 'basic' },
    { label: 'Pro - 199.000đ/tháng', value: 'pro' },
    {
      label: 'Enterprise - Liên hệ',
      value: 'enterprise',
      disabled: true,
    },
    {
      label: 'VIP - Sắp ra mắt',
      value: 'vip',
      disabled: true,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>With Disabled Options</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedValue ?? 'None'}
      </Text>
      <Button
        title="Chọn gói dịch vụ"
        onPress={() => setIsVisible(true)}
        variant="outline"
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={options}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Gói dịch vụ"
      />
    </View>
  );
}

// Example 4: Without Cancel Button
function WithoutCancelExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('vi');

  const languageOptions: BottomSelectorOption<string>[] = [
    { label: 'Tiếng Việt', value: 'vi', icon: <Text>🇻🇳</Text> },
    { label: 'English', value: 'en', icon: <Text>🇺🇸</Text> },
    { label: '中文', value: 'zh', icon: <Text>🇨🇳</Text> },
    { label: '日本語', value: 'ja', icon: <Text>🇯🇵</Text> },
    { label: '한국어', value: 'ko', icon: <Text>🇰🇷</Text> },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Without Cancel Button</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedLanguage ?? 'None'}
      </Text>
      <Button
        title="Chọn ngôn ngữ"
        onPress={() => setIsVisible(true)}
        variant="success"
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={languageOptions}
        selectedValue={selectedLanguage}
        onSelect={(option) => setSelectedLanguage(option.value)}
        title="Chọn ngôn ngữ"
        showCancelButton={false}
      />
    </View>
  );
}

// Example 5: Custom Styling
function CustomStyledExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const options: BottomSelectorOption<string>[] = [
    { label: 'Đỏ', value: 'red' },
    { label: 'Xanh lá', value: 'green' },
    { label: 'Xanh dương', value: 'blue' },
    { label: 'Vàng', value: 'yellow' },
    { label: 'Tím', value: 'purple' },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Custom Styled</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedValue ?? 'None'}
      </Text>
      <Button
        title="Chọn màu sắc"
        onPress={() => setIsVisible(true)}
        variant="danger"
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={options}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Màu sắc yêu thích"
        containerStyle={{
          backgroundColor: '#FFF5F5',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        optionStyle={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          marginVertical: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        titleStyle={{
          fontSize: 20,
          color: '#E53E3E',
        }}
        selectedOptionStyle={{
          backgroundColor: '#FED7D7',
          borderWidth: 2,
          borderColor: '#E53E3E',
        }}
        cancelText="Đóng"
      />
    </View>
  );
}

// Example 6: Complex Objects
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

function ComplexObjectExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const productOptions: BottomSelectorOption<Product>[] = [
    {
      label: 'iPhone 14 Pro - 27.999.000đ',
      value: {
        id: 1,
        name: 'iPhone 14 Pro',
        price: 27999000,
        category: 'phone',
      },
      icon: <Text style={styles.iconText}>📱</Text>,
    },
    {
      label: 'MacBook Pro M2 - 49.999.000đ',
      value: {
        id: 2,
        name: 'MacBook Pro M2',
        price: 49999000,
        category: 'laptop',
      },
      icon: <Text style={styles.iconText}>💻</Text>,
    },
    {
      label: 'iPad Air - 17.999.000đ',
      value: { id: 3, name: 'iPad Air', price: 17999000, category: 'tablet' },
      icon: <Text style={styles.iconText}>📱</Text>,
    },
    {
      label: 'AirPods Pro - 5.999.000đ',
      value: {
        id: 4,
        name: 'AirPods Pro',
        price: 5999000,
        category: 'accessory',
      },
      icon: <Text style={styles.iconText}>🎧</Text>,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Complex Objects</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedProduct?.name ?? 'None'}
      </Text>
      {selectedProduct ? (
        <Text style={styles.detailText}>
          Price: {selectedProduct.price.toLocaleString('vi-VN')}đ
        </Text>
      ) : null}
      <Button
        title="Chọn sản phẩm"
        onPress={() => setIsVisible(true)}
        variant="primary"
        fullWidth
      />

      <BottomSelector<Product>
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={productOptions}
        selectedValue={selectedProduct}
        onSelect={(option) => setSelectedProduct(option.value)}
        title="Chọn sản phẩm"
      />
    </View>
  );
}

// Example 7: Large List (FlatList Performance Demo)
function LargeListExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number>();

  // Generate large list of options
  const largeOptions: BottomSelectorOption<number>[] = Array.from(
    { length: 500 },
    (_, index) => ({
      label: `Option ${index + 1} - Item number ${index + 1}`,
      value: index,
      icon: index % 5 === 0 ? <Text>⭐</Text> : undefined,
    })
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Large List (FlatList Performance)</Text>
      <Text style={styles.selectedText}>
        Selected:{' '}
        {selectedValue !== undefined ? `Option ${selectedValue + 1}` : 'None'}
      </Text>
      <Text style={[styles.detailText, { marginBottom: 12 }]}>
        500 options - Optimized with FlatList virtualization
      </Text>
      <Button
        title="Chọn từ 500 options"
        onPress={() => setIsVisible(true)}
        variant="primary"
        fullWidth
      />

      <BottomSelector<number>
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={largeOptions}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Chọn từ danh sách lớn"
        initialNumToRender={15}
      />
    </View>
  );
}

// Example 8: Empty State
function EmptyStateExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Empty State</Text>
      <Text style={styles.detailText}>
        Demonstrates empty state when no options available
      </Text>
      <Button
        title="Xem Empty State"
        onPress={() => setIsVisible(true)}
        variant="secondary"
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={[]}
        onSelect={() => {}}
        title="Danh sách trống"
        emptyText="Không có dữ liệu để hiển thị 😢"
      />
    </View>
  );
}

// Example 9: With Search
function WithSearchExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const countries = [
    'Việt Nam',
    'United States',
    'China',
    'Japan',
    'Korea',
    'Thailand',
    'Singapore',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'India',
    'Australia',
    'Canada',
    'United Kingdom',
    'France',
    'Germany',
    'Italy',
    'Spain',
    'Brazil',
    'Mexico',
  ];

  const countryOptions: BottomSelectorOption<string>[] = countries.map(
    (country) => ({
      label: country,
      value: country.toLowerCase().replace(/\s+/g, '-'),
    })
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>With Search</Text>
      <Text style={styles.selectedText}>
        Selected: {selectedValue ?? 'None'}
      </Text>
      <Text style={[styles.detailText, { marginBottom: 12 }]}>
        Searchable list with {countries.length} countries
      </Text>
      <Button
        title="Chọn quốc gia"
        onPress={() => setIsVisible(true)}
        variant="primary"
        fullWidth
      />

      <BottomSelector
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        options={countryOptions}
        selectedValue={selectedValue}
        onSelect={(option) => setSelectedValue(option.value)}
        title="Chọn quốc gia"
        enableSearch
        searchPlaceholder="Tìm kiếm quốc gia..."
      />
    </View>
  );
}

// Main Example Component
export default function BottomSelectorExample() {
  return (
    <BaseContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>BottomSelector Examples</Text>
        <Text style={styles.description}>
          Các ví dụ sử dụng BottomSelector component với react-native-modal
        </Text>

        <SimpleExample />
        <WithIconsExample />
        <WithDisabledExample />
        <WithoutCancelExample />
        <CustomStyledExample />
        <ComplexObjectExample />
        <LargeListExample />
        <EmptyStateExample />
        <WithSearchExample />
      </ScrollView>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
});
