import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'tradewize-component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthYearPicker from '../../src/components/monthYearPicker';
import dayjs from 'dayjs';

export default function MonthYearPickerExample() {
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="h4" style={styles.title}>
          MonthYearPicker Component
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Component chọn tháng và năm với modal
        </Text>

        {/* Basic MonthYearPicker */}
        <View style={styles.section}>
          <Text variant="h6" style={styles.sectionTitle}>
            Basic MonthYearPicker
          </Text>
          <MonthYearPicker
            initialDate={selectedDate1 ?? undefined}
            minDate={new Date(dayjs().year() - 25, 0)}
            maxDate={new Date(dayjs().year() + 25, 11)}
            onChange={(date: string | Date) => {
              const dateObj = typeof date === 'string' ? new Date(date) : date;
              setSelectedDate1(dateObj);
            }}
            maxDateSelect={new Date(dayjs().year(), dayjs().month())}
          />
          {selectedDate1 && (
            <Text variant="caption" color="secondary" style={styles.result}>
              Giá trị đã chọn: {dayjs(selectedDate1).format('MM/YYYY')}
            </Text>
          )}
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
  helperText: {
    marginTop: 4,
    fontSize: 12,
  },
  bottomSpace: {
    height: 40,
  },
  customInput: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
});
