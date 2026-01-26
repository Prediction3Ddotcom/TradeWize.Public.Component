import DateTimePickerIOS, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import DateTimePickerAndroid from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT } from '../utils';
import { CustomText } from './text';
import { Button } from './button';
import { useMemo, useState } from 'react';

export interface WheelDatePickerProps {
  initialDate: Date;
  isVisible: boolean;
  title?: string;
  helperText?: string;
  helperTextStyle?: StyleProp<TextStyle>;
  confirmButtonText?: string;
  confirmButtonTextStyle?: StyleProp<TextStyle>;
  confirmButtonStyle?: StyleProp<ViewStyle>;
  maxDate?: Date;
  minDate?: Date;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  confirmButtonOnPress?: (date: string) => void;
  cancelButtonText?: string;
  cancelButtonTextStyle?: StyleProp<TextStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonOnPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const WheelDatePicker = ({
  initialDate = new Date(),
  isVisible,
  title,
  helperText,
  helperTextStyle,
  confirmButtonText,
  confirmButtonTextStyle,
  confirmButtonStyle,
  confirmButtonOnPress,
  cancelButtonText,
  cancelButtonTextStyle,
  cancelButtonStyle,
  cancelButtonOnPress,
  contentStyle,
  titleStyle,
  maxDate,
  minDate,
  customHeader,
  customFooter,
}: WheelDatePickerProps) => {
  const insets = useSafeAreaInsets();

  const [formattedDate, setFormattedDate] = useState<string>('');

  const handleDateChange = (selectedDate: Date) => {
    // Format MM/DD/YYYY
    const formatted = `${(selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${selectedDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${selectedDate.getFullYear()}`;

    setFormattedDate(formatted);
  };

  const renderHeader = useMemo(() => {
    if (customHeader) {
      return customHeader;
    }
    return (
      <>
        {title && (
          <CustomText variant="h4" style={[styles.title, titleStyle]}>
            {title}
          </CustomText>
        )}
      </>
    );
  }, [customHeader, title, titleStyle]);

  const renderFooter = useMemo(() => {
    if (customFooter) {
      return customFooter;
    }
    return (
      <>
        {helperText && (
          <CustomText
            variant="body"
            style={[styles.helperText, helperTextStyle]}
          >
            {helperText}
          </CustomText>
        )}
      </>
    );
  }, [customFooter, helperText, helperTextStyle]);

  return (
    <ReactNativeModal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={() => {
        if (cancelButtonOnPress) {
          cancelButtonOnPress();
        }
      }}
      backdropOpacity={0.2}
    >
      <View style={styles.container}>
        <View style={[styles.content, contentStyle]}>
          <View style={styles.contentContainer}>
            {renderHeader}
            {Platform.OS === 'ios' ? (
              <DateTimePickerIOS
                value={initialDate}
                maximumDate={maxDate}
                minimumDate={minDate}
                onChange={(
                  _event: DateTimePickerEvent,
                  selectedDate: Date | undefined
                ) => {
                  if (selectedDate) {
                    handleDateChange(selectedDate);
                  }
                }}
                display="spinner"
              />
            ) : (
              <DateTimePickerAndroid
                maximumDate={maxDate}
                minimumDate={minDate}
                mode="date"
                date={initialDate}
                onDateChange={(dateSelected: Date) => {
                  if (dateSelected) {
                    handleDateChange(dateSelected);
                  }
                }}
              />
            )}
            {renderFooter}
            <View
              style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}
            >
              <Button
                textStyle={cancelButtonTextStyle}
                style={[styles.cancelButton, cancelButtonStyle]}
                title={cancelButtonText ?? 'Cancel'}
                onPress={cancelButtonOnPress}
              />
              <Button
                textStyle={confirmButtonTextStyle}
                style={[styles.confirmButton, confirmButtonStyle]}
                title={confirmButtonText ?? 'Confirm'}
                onPress={() => {
                  if (confirmButtonOnPress) {
                    confirmButtonOnPress(formattedDate);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    flex: 1,
  },
  content: {
    minHeight: SCREEN_HEIGHT * 0.2,
    paddingHorizontal: 8,
  },
  modal: {
    margin: 0,
  },

  title: {
    marginBottom: 8,
    color: 'black',
  },
  cancelButton: {
    flex: 1,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  confirmButton: {
    flex: 1,
  },
  helperText: {
    marginVertical: 8,
    color: 'gray',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
  },
});

export default WheelDatePicker;
