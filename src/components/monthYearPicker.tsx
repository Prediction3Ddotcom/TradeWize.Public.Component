import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
  type ImageStyle,
  Image,
  type TextStyle,
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './button';
import { CustomText } from './text';
import Modal from 'react-native-modal';
import { SCREEN_HEIGHT } from '../utils';

export interface MonthYearPickerProps {
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  onChange?: (date: Date | string) => void;
  disabled?: boolean;
  styleInput?: StyleProp<ViewStyle>;
  disabledCancel?: boolean;
  disabledConfirm?: boolean;
  maxDateSelect?: Date;
  textError?: string;
  isShowError?: boolean;
  months?: Record<string, string>;
  // Text customization
  dateFormat?: string;
  modalTitle?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  // Color customization
  inputBackgroundColor?: string;
  inputTextColor?: string;
  inputBorderColor?: string;
  inputBorderWidth?: number;
  disabledBackgroundColor?: string;
  modalBackgroundColor?: string;
  titleTextColor?: string;
  selectedTextColor?: string;
  unselectedTextColor?: string;
  highlightBorderColor?: string;
  buttonBackgroundColor?: string;
  disabledButtonColor?: string;
  errorTextColor?: string;
  lineIndicatorColor?: string;
  // Style customization
  styleModal?: StyleProp<ViewStyle>;
  styleModalContainer?: StyleProp<ViewStyle>;
  stylePickerContainer?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<ViewStyle>;
  styleContentContainer?: StyleProp<ViewStyle>;
  styleScrollView?: StyleProp<ViewStyle>;
  styleOptionText?: StyleProp<ViewStyle>;
  styleSelectedText?: StyleProp<ViewStyle>;
  styleHighlightBox?: StyleProp<ViewStyle>;
  styleButtonContainer?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
  styleCancelButton?: StyleProp<ViewStyle>;
  styleConfirmButton?: StyleProp<ViewStyle>;
  styleErrorText?: StyleProp<ViewStyle>;
  styleInputText?: StyleProp<ViewStyle>;
  styleLineIndicator?: StyleProp<ViewStyle>;
  styleButtonTextCancel?: StyleProp<TextStyle>;
  styleButtonTextConfirm?: StyleProp<TextStyle>;
  // Dimensions customization
  itemHeight?: number;
  visibleItems?: number;
  borderRadius?: number;
  inputPadding?: number;
  // Icon customization
  iconCalendar?: any;
  iconCalendarStyle?: StyleProp<ImageStyle>;
  showIcon?: boolean;
  // Modal behavior
  backdropOpacity?: number;
  animationInTiming?: number;
  animationOutTiming?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onBackdropPress?: () => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  initialDate = null,
  onChange,
  placeholder = '',
  minDate = dayjs().subtract(100, 'year').toDate(),
  maxDate = dayjs().add(100, 'year').toDate(),
  disabled = false,
  styleInput,
  disabledCancel = false,
  disabledConfirm = false,
  maxDateSelect = new Date(),
  textError,
  isShowError = false,
  months = {
    JANUARY: 'January',
    FEBRUARY: 'February',
    MARCH: 'March',
    APRIL: 'April',
    MAY: 'May',
    JUNE: 'June',
    JULY: 'July',
    AUGUST: 'August',
    SEPTEMBER: 'September',
    OCTOBER: 'October',
    NOVEMBER: 'November',
    DECEMBER: 'December',
  },
  // Text customization
  dateFormat = 'MM-YYYY',
  modalTitle = 'Select month and year',
  cancelButtonText = 'CANCEL',
  confirmButtonText = 'CONFIRM',
  // Color customization
  inputBackgroundColor = '#FFFFFF',
  inputTextColor = '#000000',
  inputBorderColor,
  inputBorderWidth = 1,
  disabledBackgroundColor = '#9CA4AB',
  modalBackgroundColor = '#FFFFFF',
  titleTextColor = '#000000',
  selectedTextColor = '#000000',
  unselectedTextColor = '#9CA4AB',
  highlightBorderColor = '#002E94',
  buttonBackgroundColor = '#002E94',
  disabledButtonColor = '#9CA4AB',
  errorTextColor = '#FF0000',
  lineIndicatorColor = '#000000',
  // Style customization
  styleModal,
  styleModalContainer,
  stylePickerContainer,
  styleTitle,
  styleContentContainer,
  styleScrollView,
  styleOptionText,
  styleSelectedText,
  styleHighlightBox,
  styleButtonContainer,
  styleButton,
  styleCancelButton,
  styleConfirmButton,
  styleButtonTextCancel,
  styleButtonTextConfirm,
  styleErrorText,
  styleInputText,
  styleLineIndicator,
  // Dimensions customization
  itemHeight = 52,
  visibleItems = 5,
  borderRadius = 20,
  inputPadding = 12,
  // Icon customization
  iconCalendar,
  iconCalendarStyle,
  showIcon = true,
  // Modal behavior
  backdropOpacity = 0,
  animationInTiming = 400,
  animationOutTiming = 400,
  onOpen,
  onClose: onCloseProp,
  onBackdropPress: onBackdropPressProp,
}) => {
  const [selectedMonthKey, setSelectedMonthKey] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<Date | null>(initialDate);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

  const insets = useSafeAreaInsets();

  const monthScrollRef = useRef<any>(null);
  const yearScrollRef = useRef<any>(null);

  // Dynamic dimensions based on props
  const ITEM_HEIGHT = itemHeight;
  const PICKER_HEIGHT = ITEM_HEIGHT * visibleItems;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const monthData: Record<string, string> = useMemo(() => months, []);

  const monthKeys = useMemo(() => Object.keys(monthData), [monthData]);

  // Create an array with 3 copies of months for infinite scroll effect
  const infiniteMonthKeys = useMemo(() => {
    return [...monthKeys, ...monthKeys, ...monthKeys];
  }, [monthKeys]);

  const years = useMemo(() => {
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const listYears = [];
    for (let i = minYear; i <= maxYear; i++) {
      listYears.push(i.toString());
    }
    return listYears;
  }, [minDate, maxDate]);

  useEffect(() => {
    if (isVisible) {
      // Get current month and year
      const currentDate = new Date();
      const currentMonthKey = initialDate
        ? monthKeys[initialDate.getMonth()]
        : monthKeys[currentDate.getMonth()];
      const currentYear = initialDate
        ? initialDate.getFullYear().toString()
        : currentDate.getFullYear().toString();

      const initialMonthIndex = initialDate
        ? initialDate.getMonth()
        : currentDate.getMonth();

      // Set selected values to current month and year
      setSelectedMonthKey(currentMonthKey as string);
      setSelectedYear(currentYear);

      // Scroll to current positions
      setTimeout(() => {
        if (monthScrollRef.current) {
          monthScrollRef.current?.scrollTo({
            y: (initialMonthIndex + monthKeys.length) * ITEM_HEIGHT,
            animated: false,
          });
        }

        if (yearScrollRef.current) {
          const yearIndex = years.indexOf(currentYear);
          if (yearIndex !== -1) {
            yearScrollRef.current?.scrollTo({
              y: yearIndex * ITEM_HEIGHT,
              animated: false,
            });
          }
        }
      }, 100);
    }
  }, [initialDate, monthKeys, years, isVisible, ITEM_HEIGHT]);

  useEffect(() => {
    if (selectedMonthKey && selectedYear && maxDateSelect) {
      const monthIndex = Object.keys(monthData).indexOf(selectedMonthKey);
      const yearNum = Number(selectedYear);

      const maxMonth = dayjs(maxDateSelect).month();
      const maxYear = dayjs(maxDateSelect).year();

      // So sánh theo năm trước, sau đó mới so sánh tháng
      const isInvalid =
        yearNum > maxYear || (yearNum === maxYear && monthIndex > maxMonth);

      setIsConfirmDisabled(isInvalid);
    }
  }, [selectedMonthKey, selectedYear, maxDateSelect, monthData]);

  const handleYearSelect = (year: string, index: number) => {
    const _selectedYear = parseInt(year, 10);
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();

    if (_selectedYear >= minYear && _selectedYear <= maxYear) {
      setSelectedYear(year);
      yearScrollRef.current?.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  const handleMonthSelect = (
    monthKey: keyof typeof monthData,
    index: number
  ) => {
    const selectedMonthIndex = monthKeys.indexOf(monthKey);
    const currentYear = parseInt(selectedYear, 10);
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const minMonth = minDate.getMonth();
    const maxMonth = maxDate.getMonth();

    // Check if the selected month is within the allowed range
    if (
      (currentYear > minYear ||
        (currentYear === minYear && selectedMonthIndex >= minMonth)) &&
      (currentYear < maxYear ||
        (currentYear === maxYear && selectedMonthIndex <= maxMonth))
    ) {
      setSelectedMonthKey(monthKey);
      monthScrollRef.current?.scrollTo({
        y: (index + monthKeys.length) * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  const handleMonthScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const actualIndex = index % monthKeys.length;

    // Update selected month first
    if (monthKeys[actualIndex]) {
      setSelectedMonthKey(monthKeys[actualIndex] as keyof typeof monthData);
    }

    // Then handle scroll reset if needed
    if (index >= monthKeys.length * 2) {
      requestAnimationFrame(() => {
        monthScrollRef.current?.scrollTo({
          y: ((index % monthKeys.length) + monthKeys.length) * ITEM_HEIGHT,
          animated: false,
        });
      });
    } else if (index < monthKeys.length) {
      requestAnimationFrame(() => {
        monthScrollRef.current?.scrollTo({
          y: ((index % monthKeys.length) + monthKeys.length) * ITEM_HEIGHT,
          animated: false,
        });
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onCloseProp?.();
  };

  const handleBackdropPress = () => {
    if (onBackdropPressProp) {
      onBackdropPressProp();
    } else {
      handleClose();
    }
  };

  const handleOpenModal = () => {
    if (!disabled) {
      setIsVisible(true);
      onOpen?.();
    }
  };

  const handleConfirm = () => {
    if (isConfirmDisabled) {
      return;
    }

    const monthIndex = monthKeys.indexOf(selectedMonthKey);
    const year = parseInt(selectedYear, 10);
    const date = new Date(year, monthIndex, 1);
    setValue(date);
    onChange?.(date);
    handleClose();
  };
  return (
    <>
      <Button
        variant="ghost"
        style={[
          styles.inputDate,
          {
            backgroundColor: inputBackgroundColor,
            borderWidth: inputBorderWidth,
            borderColor: inputBorderColor,
            padding: inputPadding,
          },
          disabled && { backgroundColor: disabledBackgroundColor },
          styleInput,
        ]}
        onPress={handleOpenModal}
      >
        <CustomText
          variant="body"
          style={[styles.input, { color: inputTextColor }, styleInputText]}
        >
          {value ? dayjs(value).format(dateFormat) : placeholder}
        </CustomText>

        {showIcon && (
          <>
            {iconCalendar || (
              <Image
                source={require('../assets/calendar.png')}
                style={[styles.iconCalendar, iconCalendarStyle]}
              />
            )}
          </>
        )}
      </Button>

      <Modal
        style={[styles.modal, styleModal]}
        onBackdropPress={handleBackdropPress}
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        backdropOpacity={backdropOpacity}
      >
        <View style={[styles.modalContainer, styleModalContainer]}>
          <ShadowedView
            style={[
              styles.pickerContainer,
              styles.shadowGlobal,
              {
                paddingBottom: insets.bottom + 12,
                backgroundColor: modalBackgroundColor,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
              },
              stylePickerContainer,
            ]}
          >
            <View
              style={[
                styles.line,
                { backgroundColor: lineIndicatorColor },
                styleLineIndicator,
              ]}
            />
            <CustomText
              variant="h2"
              style={[styles.title, { color: titleTextColor }, styleTitle]}
            >
              {modalTitle}
            </CustomText>

            <View
              style={[
                styles.contentContainer,
                { height: PICKER_HEIGHT },
                styleContentContainer,
              ]}
            >
              {/* Month Picker */}
              <View style={[styles.column, { height: PICKER_HEIGHT }]}>
                <View
                  style={[
                    styles.highlightBox,
                    {
                      height: ITEM_HEIGHT,
                      marginTop: -ITEM_HEIGHT / 2,
                      borderColor: highlightBorderColor,
                    },
                    styleHighlightBox,
                  ]}
                />
                <ScrollView
                  ref={monthScrollRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  style={[
                    styles.scrollView,
                    { height: PICKER_HEIGHT },
                    styleScrollView,
                  ]}
                  contentContainerStyle={styles.scrollContent}
                  onMomentumScrollEnd={handleMonthScroll}
                  onScrollEndDrag={handleMonthScroll}
                >
                  <View
                    style={[
                      styles.paddingTop,
                      { height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 },
                    ]}
                  />
                  {infiniteMonthKeys.map((monthKey, index) => (
                    <Button
                      variant="ghost"
                      key={`${monthKey}-${index}`}
                      onPress={() =>
                        handleMonthSelect(
                          monthKey as keyof typeof monthData,
                          index
                        )
                      }
                      style={[styles.optionContainer, { height: ITEM_HEIGHT }]}
                    >
                      <CustomText
                        variant="body"
                        style={[
                          styles.optionText,
                          { color: unselectedTextColor },
                          styleOptionText,
                          selectedMonthKey === monthKey && [
                            styles.selectedText,
                            { color: selectedTextColor },
                            styleSelectedText,
                          ],
                        ]}
                      >
                        {monthData[monthKey as keyof typeof monthData]}
                      </CustomText>
                    </Button>
                  ))}
                  <View
                    style={[
                      styles.paddingBottom,
                      { height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 },
                    ]}
                  />
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={[styles.column, { height: PICKER_HEIGHT }]}>
                <View
                  style={[
                    styles.highlightBox,
                    {
                      height: ITEM_HEIGHT,
                      marginTop: -ITEM_HEIGHT / 2,
                      borderColor: highlightBorderColor,
                    },
                    styleHighlightBox,
                  ]}
                />
                <ScrollView
                  ref={yearScrollRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  style={[
                    styles.scrollView,
                    { height: PICKER_HEIGHT },
                    styleScrollView,
                  ]}
                  contentContainerStyle={styles.scrollContent}
                  onMomentumScrollEnd={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    const index = Math.round(offsetY / ITEM_HEIGHT);
                    if (years[index]) {
                      setSelectedYear(years[index]);
                    }
                  }}
                  onScrollEndDrag={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    const index = Math.round(offsetY / ITEM_HEIGHT);
                    if (years[index]) {
                      setSelectedYear(years[index]);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.paddingTop,
                      { height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 },
                    ]}
                  />
                  {years.map((year, index) => (
                    <Button
                      variant="ghost"
                      key={year}
                      onPress={() => handleYearSelect(year, index)}
                      style={[styles.optionContainer, { height: ITEM_HEIGHT }]}
                    >
                      <CustomText
                        variant="body"
                        style={[
                          styles.optionText,
                          { color: unselectedTextColor },
                          styleOptionText,
                          selectedYear === year && [
                            styles.selectedText,
                            { color: selectedTextColor },
                            styleSelectedText,
                          ],
                        ]}
                      >
                        {year}
                      </CustomText>
                    </Button>
                  ))}
                  <View
                    style={[
                      styles.paddingBottom,
                      { height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 },
                    ]}
                  />
                </ScrollView>
              </View>
            </View>

            {isShowError && isConfirmDisabled && (
              <CustomText
                variant="caption"
                style={[
                  styles.errorText,
                  { color: errorTextColor },
                  styleErrorText,
                ]}
              >
                {textError ? textError : 'Cannot exceed the present time'}
              </CustomText>
            )}

            <View style={[styles.buttonContainer, styleButtonContainer]}>
              <Button
                isDisabled={disabledCancel}
                onPress={handleClose}
                title={cancelButtonText}
                textStyle={styleButtonTextCancel}
                style={[styles.button, styleCancelButton, styleButton]}
              />
              <Button
                disabled={disabledConfirm}
                onPress={handleConfirm}
                title={confirmButtonText}
                textStyle={styleButtonTextConfirm}
                style={[
                  styles.button,
                  { backgroundColor: buttonBackgroundColor },
                  isConfirmDisabled && { backgroundColor: disabledButtonColor },
                  styleConfirmButton,
                  styleButton,
                ]}
                variant="primary"
              />
            </View>
          </ShadowedView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    margin: 0,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  inputDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 6,
    width: 72,
    marginBottom: 12,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 8,
  },
  pickerContainer: {
    paddingHorizontal: 16,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    marginBottom: 28,
  },
  column: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    // Height is dynamic based on props
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    textAlign: 'center',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  highlightBox: {
    position: 'absolute',
    top: '50%',
    left: 8,
    right: 8,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    zIndex: -1,
  },
  paddingTop: {
    // Height is dynamic based on props
  },
  paddingBottom: {
    // Height is dynamic based on props
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  shadowGlobal: {
    shadowOpacity: 0.4,
    shadowRadius: Platform.OS === 'ios' ? 4 : 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  iconCalendar: {
    width: 24,
    height: 24,
  },
});

export default MonthYearPicker;
