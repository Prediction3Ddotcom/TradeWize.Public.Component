import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  requireNativeComponent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { WheelPicker } from '@hortau/react-native-wheel-picker-android';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils';
import { CustomText } from './text';
import { Button } from './button';

export interface InfinitePickerProps {
  // ✅ Mode 1: Dùng array items
  items?: string[];

  // Common props
  infiniteLoop?: boolean;
  selectedIndex?: number;
  onValueChange?: (event: {
    nativeEvent: {
      value: string;
      index: number;
      numericValue: number; // ✅ Giá trị số (hữu ích khi dùng min/max)
    };
  }) => void;
  style?: StyleProp<ViewStyle>;
}

export interface WheelMonthYearPickerProps {
  isVisible?: boolean;
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  title?: string;
  stylePickerContainer?: StyleProp<ViewStyle>;
  textConfirm?: string;
  textCancel?: string;
  styleButtonConfirm?: StyleProp<ViewStyle>;
  styleButtonCancel?: StyleProp<ViewStyle>;
  styleTextConfirm?: StyleProp<TextStyle>;
  styleTextCancel?: StyleProp<TextStyle>;
  indicatorColor?: string;
  wheelMonthData?: string[];
  stylePickerIosItem?: StyleProp<ViewStyle>;

  customHeader?: React.ReactNode;

  handleSelectedDate?: (date: Date) => void;
  onCancel?: () => void;
}

// Lazy initialization to prevent duplicate registration with Re.pack
let NativeInfinitePicker: React.ComponentType<InfinitePickerProps> | null =
  null;

function getNativeInfinitePicker() {
  if (NativeInfinitePicker === null) {
    NativeInfinitePicker =
      requireNativeComponent<InfinitePickerProps>('InfinitePickerView');
  }
  return NativeInfinitePicker;
}

const WheelMonthYearPicker: React.FC<WheelMonthYearPickerProps> = (props) => {
  const {
    isVisible,
    initialDate,
    minDate,
    maxDate,
    title,
    customHeader,
    stylePickerContainer,
    textConfirm,
    textCancel,
    styleButtonConfirm,
    styleButtonCancel,
    styleTextConfirm,
    styleTextCancel,
    indicatorColor,
    stylePickerIosItem,
    wheelMonthData = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    handleSelectedDate,
    onCancel,
  } = props;
  const [selectedItem, setSelectedItem] = useState<{
    month: number;
    year: number;
  }>({ month: 0, year: 0 });

  // Track if we're initializing from initialDate to prevent auto-adjust interference
  const isInitializingRef = React.useRef(false);
  // Track last initialized month/year để tránh re-initialize không cần thiết
  const lastInitializedRef = React.useRef<{
    month: number;
    year: number;
  } | null>(null);

  // Tính toán danh sách years dựa trên minDate và maxDate
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const minYear = minDate?.getFullYear() ?? 1900;
    const maxYear = maxDate?.getFullYear() ?? currentYear;

    return Array.from({ length: maxYear - minYear + 1 }, (_, i) =>
      (minYear + i).toString()
    );
  }, [minDate, maxDate]);

  const onItemSelected = useCallback(
    (index: number, type: 'month' | 'year') => {
      try {
        if (type === 'month') {
          setSelectedItem((prev) => ({ ...prev, month: index }));
        } else {
          setSelectedItem((prev) => ({ ...prev, year: index }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleConfirm = () => {
    try {
      const yearSelected = years[selectedItem.year];
      if (!yearSelected) return;

      const monthSelected =
        selectedItem.month + 1 < 10
          ? `0${selectedItem.month + 1}`
          : selectedItem.month + 1;
      const dateSelected = `${monthSelected}-${yearSelected}`;
      const [month, year] = dateSelected.split('-').map(Number);

      handleSelectedDate?.(new Date(Number(year), Number(month) - 1, 1));
    } catch (error) {
      console.log('handleConfirm error', error);
    }
  };

  // Reset state sau khi modal đóng hoàn toàn để tránh hiệu ứng nhảy
  const handleModalHide = useCallback(() => {
    setSelectedItem({ month: 0, year: 0 });
    lastInitializedRef.current = null;
  }, []);

  // Sync selectedItem với initialDate khi modal mở
  // Sử dụng ref để track previous isVisible để chỉ khởi tạo khi modal chuyển từ đóng sang mở
  const prevIsVisibleRef = React.useRef<boolean | undefined>(undefined);

  useEffect(() => {
    const wasVisible = prevIsVisibleRef.current;
    const isNowVisible = isVisible;

    // Chỉ khởi tạo khi modal chuyển từ đóng sang mở (false -> true)
    if (isNowVisible && !wasVisible && initialDate) {
      // Validate initialDate nằm trong khoảng minDate - maxDate
      let validDate = initialDate;

      if (minDate && initialDate < minDate) {
        validDate = minDate;
      } else if (maxDate && initialDate > maxDate) {
        validDate = maxDate;
      }

      const monthIndex = validDate.getMonth();
      const yearIndex = years.findIndex(
        (year) => year === validDate.getFullYear().toString()
      );

      if (yearIndex >= 0) {
        // Set flag để prevent auto-adjust can thiệp
        isInitializingRef.current = true;
        setSelectedItem({
          month: monthIndex,
          year: yearIndex,
        });
        lastInitializedRef.current = { month: monthIndex, year: yearIndex };
        // Reset flag sau khi state đã được set
        setTimeout(() => {
          isInitializingRef.current = false;
        }, 0);
      }
    } else if (!isNowVisible && wasVisible) {
      // Không reset state ngay khi modal đóng
      // State sẽ được reset trong onModalHide callback sau khi modal đóng hoàn toàn
      // để tránh hiệu ứng nhảy về default trước khi modal đóng
    }

    // Update ref để track state cho lần tiếp theo
    prevIsVisibleRef.current = isNowVisible;
  }, [isVisible, initialDate, maxDate, minDate, years]);

  // Auto-adjust month khi user chọn vượt quá minDate/maxDate
  // Chỉ chạy khi user tương tác, không chạy khi đang initialize từ initialDate
  useEffect(() => {
    // Skip nếu đang initialize hoặc modal không visible
    if (isInitializingRef.current || !isVisible) return;

    const yearSelected = years[selectedItem.year];
    if (!yearSelected) return;

    const yearNum = parseInt(yearSelected, 10);
    const minYear = minDate?.getFullYear();
    const maxYear = maxDate?.getFullYear();
    const minMonth = minDate?.getMonth();
    const maxMonth = maxDate?.getMonth();

    let adjustedMonth: number | null = null;

    // Nếu đang ở năm min và tháng < minMonth → scroll về minMonth
    if (minYear && minMonth !== undefined && yearNum === minYear) {
      if (selectedItem.month < minMonth) {
        adjustedMonth = minMonth;
      }
    }

    // Nếu đang ở năm max và tháng > maxMonth → scroll về maxMonth
    if (maxYear && maxMonth !== undefined && yearNum === maxYear) {
      if (selectedItem.month > maxMonth) {
        adjustedMonth = maxMonth;
      }
    }

    // Nếu cần adjust, update selectedItem
    if (adjustedMonth !== null && adjustedMonth !== selectedItem.month) {
      setSelectedItem((prev) => ({ ...prev, month: adjustedMonth! }));
    }
  }, [
    selectedItem.month,
    selectedItem.year,
    years,
    minDate,
    maxDate,
    isVisible,
  ]);

  const NativePickerComponent = useMemo(() => getNativeInfinitePicker(), []);

  const renderWheelPickerByPlatform = useMemo(() => {
    if (Platform.OS === 'ios') {
      return (
        <View
          style={[
            styles.pickerContainer,
            !title && styles.borderTop,
            stylePickerContainer,
          ]}
        >
          <View style={styles.pickerItem}>
            <NativePickerComponent
              selectedIndex={selectedItem.month}
              style={[styles.pickerItemIos, stylePickerIosItem]}
              items={wheelMonthData}
              onValueChange={(event: {
                nativeEvent: { value: string; index: number };
              }) => onItemSelected(event.nativeEvent.index, 'month')}
            />
          </View>
          <View style={styles.pickerItem}>
            <NativePickerComponent
              selectedIndex={selectedItem.year}
              style={[styles.pickerItemIos, stylePickerIosItem]}
              items={years}
              onValueChange={(event: {
                nativeEvent: { value: string; index: number };
              }) => onItemSelected(event.nativeEvent.index, 'year')}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.pickerContainer,
            !title && styles.borderTop,
            stylePickerContainer,
          ]}
        >
          <View style={styles.pickerItem}>
            <WheelPicker
              isCyclic
              selectedItem={selectedItem.month}
              data={wheelMonthData}
              onItemSelected={(index: number) => onItemSelected(index, 'month')}
              indicatorColor={indicatorColor || '#000000'}
            />
          </View>
          <View style={styles.pickerItem}>
            <WheelPicker
              selectedItem={selectedItem.year}
              data={years}
              onItemSelected={(index: number) => onItemSelected(index, 'year')}
              indicatorColor={indicatorColor || '#000000'}
            />
          </View>
        </View>
      );
    }
  }, [
    NativePickerComponent,
    indicatorColor,
    onItemSelected,
    selectedItem.month,
    selectedItem.year,
    stylePickerContainer,
    stylePickerIosItem,
    title,
    wheelMonthData,
    years,
  ]);

  const renderHeader = useMemo(() => {
    if (customHeader) {
      return customHeader;
    }
    if (title) {
      return (
        <View style={[styles.header, styles.borderTop]}>
          <CustomText variant="h5">{title}</CustomText>
        </View>
      );
    }
    return null;
  }, [customHeader, title]);

  return (
    <ReactNativeModal
      backdropOpacity={0.1}
      style={styles.modal}
      isVisible={isVisible}
      onModalHide={handleModalHide}
    >
      <View style={styles.container}>
        {renderHeader}

        {renderWheelPickerByPlatform}
        <Button
          textStyle={styleTextConfirm}
          title={textConfirm || 'Confirm'}
          style={[styles.buttonConfirm, styleButtonConfirm]}
          onPress={handleConfirm}
        />
      </View>
      <View style={styles.footerContainerWithPadding}>
        <Button
          textStyle={styleTextCancel}
          title={textCancel || 'Cancel'}
          style={[styles.buttonCancel, styleButtonCancel]}
          onPress={onCancel}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 8,
  },
  pickerContainer: {
    backgroundColor: 'white',
    minHeight: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerItem: {
    width: Platform.OS === 'ios' ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.25,
  },
  pickerItemIos: {
    height: Dimensions.get('window').height * 0.2,
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  borderTop: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  buttonConfirm: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  buttonCancel: {
    marginTop: 12,
  },
  footerContainer: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  footerContainerWithPadding: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
});

export default WheelMonthYearPicker;
