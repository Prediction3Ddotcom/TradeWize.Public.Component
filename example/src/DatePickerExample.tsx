import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DatePicker, Text } from 'tradewize-component';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DatePickerExample() {
  const [selectedDate1, setSelectedDate1] = useState<string>('');
  const [selectedDate2, setSelectedDate2] = useState<string>('2024-01-15');
  const [selectedDate3, setSelectedDate3] = useState<string>('');
  const [selectedDate4, setSelectedDate4] = useState<string>('');
  const [selectedDate5, setSelectedDate5] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="h4" style={styles.title}>
          DatePicker Component
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Component chọn ngày tháng năm với modal
        </Text>

        {/* Basic DatePicker */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Basic DatePicker
          </Text>
          <DatePicker
            label="Ngày sinh"
            placeholder="Chọn ngày sinh..."
            value={selectedDate1}
            onChange={setSelectedDate1}
            helperText="Chọn ngày tháng năm sinh của bạn"
          />
          {selectedDate1 && (
            <Text variant="caption" color="secondary" style={styles.result}>
              Giá trị đã chọn: {selectedDate1}
            </Text>
          )}
        </View>

        {/* DatePicker with Value */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            DatePicker với giá trị mặc định
          </Text>
          <DatePicker
            label="Ngày hẹn"
            placeholder="Chọn ngày hẹn..."
            value={selectedDate2}
            onChange={setSelectedDate2}
            variant="filled"
          />
          {selectedDate2 && (
            <Text variant="caption" color="secondary" style={styles.result}>
              Giá trị đã chọn: {selectedDate2}
            </Text>
          )}
        </View>

        {/* DatePicker with Min/Max Date */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            DatePicker với giới hạn ngày
          </Text>
          <DatePicker
            label="Ngày bắt đầu"
            placeholder="Chọn ngày..."
            value={selectedDate3}
            onChange={setSelectedDate3}
            minDate="2024-01-01"
            maxDate="2024-11-31"
            helperText="Chỉ được chọn từ 01/01/2024 đến 31/12/2024"
            variant="underline"
          />
          {selectedDate3 && (
            <Text variant="caption" color="secondary" style={styles.result}>
              Giá trị đã chọn: {selectedDate3}
            </Text>
          )}
        </View>

        {/* Required DatePicker */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Required DatePicker
          </Text>
          <DatePicker
            label="Ngày khám bệnh"
            placeholder="Chọn ngày khám..."
            value={selectedDate4}
            onChange={setSelectedDate4}
            isRequired
            isError={!selectedDate4}
            errorText={!selectedDate4 ? 'Vui lòng chọn ngày khám' : undefined}
          />
        </View>

        {/* Bottom Modal DatePicker */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Bottom Modal DatePicker
          </Text>
          <DatePicker
            label="Ngày đặt hàng"
            placeholder="Chọn ngày đặt hàng..."
            value={selectedDate5}
            onChange={setSelectedDate5}
            modalPosition="bottom"
            modalTitle="Chọn ngày đặt hàng"
            confirmButtonText="Chọn"
            cancelButtonText="Đóng"
          />
          {selectedDate5 && (
            <Text variant="caption" color="secondary" style={styles.result}>
              Giá trị đã chọn: {selectedDate5}
            </Text>
          )}
        </View>

        {/* Small Size */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Small Size DatePicker
          </Text>
          <DatePicker
            label="Ngày"
            placeholder="Chọn..."
            size="small"
            value={selectedDate1}
            onChange={setSelectedDate1}
          />
        </View>

        {/* Large Size */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Large Size DatePicker
          </Text>
          <DatePicker
            label="Ngày"
            placeholder="Chọn ngày..."
            size="large"
            value={selectedDate1}
            onChange={setSelectedDate1}
          />
        </View>

        {/* Disabled DatePicker */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Disabled DatePicker
          </Text>
          <DatePicker
            label="Ngày"
            placeholder="Không thể chọn..."
            isDisabled
            value={selectedDate2}
            onChange={setSelectedDate2}
          />
        </View>

        {/* Custom Colors */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Custom Colors DatePicker
          </Text>
          <DatePicker
            label="Ngày sự kiện"
            placeholder="Chọn ngày sự kiện..."
            value={selectedDate1}
            onChange={setSelectedDate1}
            borderColorActive="#FF6B6B"
            selectedDayBackgroundColor="#FF6B6B"
            todayTextColor="#FF6B6B"
          />
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  result: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  bottomSpace: {
    height: 40,
  },
});
