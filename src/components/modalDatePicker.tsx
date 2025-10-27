import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from './button';
import { CustomText } from './text';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

export interface DatePickerModalProps {
  openDatePicker: boolean;
  setOpenDatePicker: (open: boolean) => void;
  setDate: (date: Date) => void;
  onChangeDate: (date: Date) => void;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  dividerColor: string;
  maxDate: Date;
  minDate: Date;
  initialDate: Date;
}

const DatePickerModal = ({
  openDatePicker,
  setOpenDatePicker,
  onChangeDate,
  title,
  confirmButtonText,
  cancelButtonText,
  dividerColor = '#000000',
  maxDate = new Date(),
  minDate = new Date(),
  initialDate = new Date(),
}: DatePickerModalProps) => {
  const [date, setDate] = useState<Date>(initialDate);

  if (Platform.OS === 'ios') {
    return (
      <DatePicker
        title={null}
        modal
        open={openDatePicker}
        date={date}
        mode="date"
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={(datePicked: Date) => {
          setOpenDatePicker(false);
          setDate(datePicked);
          onChangeDate(datePicked);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    );
  }
  return (
    <Modal
      isVisible={openDatePicker}
      onBackdropPress={() => setOpenDatePicker(false)}
      style={styles.modalContainer}
      backdropOpacity={0.2}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <CustomText style={styles.title}>{title ?? 'Chọn ngày'}</CustomText>
          <DatePicker
            dividerColor={dividerColor}
            minimumDate={minDate}
            maximumDate={maxDate}
            mode="date"
            date={date}
            onDateChange={setDate}
          />
        </View>
        <Button
          size="large"
          style={styles.buttonConfirm}
          onPress={() => {
            setOpenDatePicker(false);
            onChangeDate(date);
          }}
        >
          <CustomText style={styles.buttonConfirmText}>
            {confirmButtonText ?? 'Xác nhận'}
          </CustomText>
        </Button>
        <Button
          size="large"
          style={styles.buttonCancel}
          onPress={() => setOpenDatePicker(false)}
        >
          <CustomText style={styles.buttonCancelText}>
            {cancelButtonText ?? 'Hủy'}
          </CustomText>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonConfirm: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonCancel: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  buttonCancelText: {
    color: '#0A84FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  buttonConfirmText: {
    color: '#0A84FF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default DatePickerModal;
