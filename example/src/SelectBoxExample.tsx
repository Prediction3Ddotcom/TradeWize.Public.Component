import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SelectBox, type SelectOption, Text } from 'tradewize-component';

export default function SelectBoxExample() {
  const [singleValue, setSingleValue] = useState<string | number>('');
  const [multipleValue, setMultipleValue] = useState<Array<string | number>>(
    []
  );
  const [countryValue, setCountryValue] = useState<string | number>('');

  // Single select options
  const fruitOptions: SelectOption[] = [
    { label: 'Táo', value: 'apple', description: 'Trái cây có màu đỏ' },
    { label: 'Chuối', value: 'banana', description: 'Trái cây có màu vàng' },
    { label: 'Cam', value: 'orange', description: 'Trái cây có múi' },
    { label: 'Nho', value: 'grape', description: 'Trái cây nhỏ' },
    { label: 'Dưa hấu', value: 'watermelon', description: 'Trái cây to' },
    { label: 'Dâu tây', value: 'strawberry', description: 'Trái cây màu đỏ' },
  ];

  // Multiple select options
  const colorOptions: SelectOption[] = [
    { label: 'Đỏ', value: 'red' },
    { label: 'Xanh lá', value: 'green' },
    { label: 'Xanh dương', value: 'blue' },
    { label: 'Vàng', value: 'yellow' },
    { label: 'Tím', value: 'purple' },
    { label: 'Cam', value: 'orange' },
    { label: 'Hồng', value: 'pink' },
    { label: 'Nâu', value: 'brown' },
  ];

  // Country options with some disabled
  const countryOptions: SelectOption[] = [
    { label: 'Việt Nam', value: 'vn' },
    { label: 'Hoa Kỳ', value: 'us' },
    { label: 'Nhật Bản', value: 'jp' },
    { label: 'Hàn Quốc', value: 'kr' },
    { label: 'Trung Quốc', value: 'cn', disabled: true },
    { label: 'Singapore', value: 'sg' },
    { label: 'Malaysia', value: 'my' },
    { label: 'Thái Lan', value: 'th' },
    { label: 'Indonesia', value: 'id' },
    { label: 'Philippines', value: 'ph', disabled: true },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant="h4" style={styles.title}>
        SelectBox Examples
      </Text>

      {/* Single Select - Outline Variant */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Single Select - Outline
        </Text>
        <SelectBox
          label="Chọn trái cây yêu thích"
          placeholder="Chọn một trái cây"
          options={fruitOptions}
          value={singleValue}
          onChange={(value) => setSingleValue(value as string | number)}
          helperText="Chọn một trái cây bạn thích nhất"
          variant="outline"
          size="medium"
        />
        {singleValue && (
          <Text
            variant="bodySmall"
            color="secondary"
            style={styles.selectedText}
          >
            Đã chọn: {singleValue}
          </Text>
        )}
      </View>

      {/* Multiple Select - Filled Variant */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Multiple Select - Filled
        </Text>
        <SelectBox
          label="Chọn màu sắc yêu thích"
          placeholder="Chọn nhiều màu"
          options={colorOptions}
          value={multipleValue}
          onChange={(value) => setMultipleValue(value as (string | number)[])}
          multiple
          helperText="Có thể chọn nhiều màu"
          variant="filled"
          size="medium"
        />
        {multipleValue?.length > 0 && (
          <Text
            variant="bodySmall"
            color="secondary"
            style={styles.selectedText}
          >
            Đã chọn: {multipleValue.join(', ')}
          </Text>
        )}
      </View>

      {/* Single Select with Disabled Options - Underline Variant */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          With Disabled Options - Underline
        </Text>
        <SelectBox
          label="Chọn quốc gia"
          placeholder="Chọn một quốc gia"
          options={countryOptions}
          value={countryValue}
          onChange={(value) => setCountryValue(value as string | number)}
          helperText="Một số quốc gia không khả dụng"
          variant="underline"
          size="large"
        />
        {countryValue && (
          <Text
            variant="bodySmall"
            color="secondary"
            style={styles.selectedText}
          >
            Đã chọn: {countryValue}
          </Text>
        )}
      </View>

      {/* Required Field with Error */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Required Field (Small Size)
        </Text>
        <SelectBox
          label="Chọn loại tài khoản"
          placeholder="Vui lòng chọn"
          options={[
            { label: 'Cá nhân', value: 'personal' },
            { label: 'Doanh nghiệp', value: 'business' },
            { label: 'Tổ chức', value: 'organization' },
          ]}
          value=""
          onChange={() => {}}
          isRequired
          isError
          errorText="Vui lòng chọn loại tài khoản"
          variant="outline"
          size="small"
        />
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Disabled State
        </Text>
        <SelectBox
          label="Tùy chọn không khả dụng"
          placeholder="Không thể chọn"
          options={fruitOptions}
          value="apple"
          onChange={() => {}}
          isDisabled
          helperText="Tùy chọn này đã bị vô hiệu hóa"
          variant="outline"
          size="medium"
        />
      </View>

      {/* Without Search */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Without Search Feature
        </Text>
        <SelectBox
          label="Chọn không có tìm kiếm"
          placeholder="Chọn một tùy chọn"
          options={[
            { label: 'Tùy chọn 1', value: '1' },
            { label: 'Tùy chọn 2', value: '2' },
            { label: 'Tùy chọn 3', value: '3' },
          ]}
          value=""
          onChange={() => {}}
          searchable={false}
          variant="outline"
          size="medium"
        />
      </View>

      {/* Custom Empty Message */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Custom Empty Message
        </Text>
        <SelectBox
          label="Danh sách rỗng"
          placeholder="Không có dữ liệu"
          options={[]}
          value=""
          onChange={() => {}}
          emptyMessage="Không tìm thấy dữ liệu nào!"
          variant="outline"
          size="medium"
        />
      </View>

      {/* Bottom Modal Position - Single */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Bottom Modal (Single Select)
        </Text>
        <SelectBox
          label="Chọn trái cây (Modal từ dưới)"
          placeholder="Chọn một trái cây"
          options={fruitOptions}
          value={singleValue}
          onChange={(value) => {
            if (typeof value === 'string' || typeof value === 'number') {
              setSingleValue(value);
            }
          }}
          modalPosition="bottom"
          helperText="Modal sẽ hiện từ dưới lên như bottom sheet"
          variant="outline"
          size="medium"
        />
      </View>

      {/* Bottom Modal Position - Multiple */}
      <View style={styles.section}>
        <Text variant="h6" style={styles.sectionTitle}>
          Bottom Modal (Multiple Select)
        </Text>
        <SelectBox
          label="Chọn màu sắc (Modal từ dưới)"
          placeholder="Chọn nhiều màu"
          options={colorOptions}
          value={multipleValue}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setMultipleValue(value);
            }
          }}
          multiple
          modalPosition="bottom"
          helperText="Modal bottom sheet với multiple selection"
          variant="filled"
          size="medium"
        />
        {multipleValue?.length > 0 && (
          <Text
            variant="bodySmall"
            color="secondary"
            style={styles.selectedText}
          >
            Đã chọn: {multipleValue.join(', ')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  selectedText: {
    marginTop: 12,
    fontStyle: 'italic',
  },
});
