import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  type ViewStyle,
  type TextStyle,
  StatusBar,
  Dimensions,
  Image,
  type ImageStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';
import type { ReactNode } from 'react';
import { CustomText } from './text';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './button';
import { ShadowedView } from 'react-native-fast-shadow';
import { Calendar, type DateData } from 'react-native-calendars';
import type { MarkingTypes } from 'react-native-calendars/src/types';
import { SCREEN_WIDTH } from '../utils';

export interface DatePickerProps {
  // Basic Props
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  value?: string; // Format: 'YYYY-MM-DD'
  onChange?: (date: string) => void;
  minDate?: string; // Format: 'YYYY-MM-DD'
  maxDate?: string; // Format: 'YYYY-MM-DD'
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'outline' | 'filled' | 'underline';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  fullWidth?: boolean;
  shadowColor?: string;
  noteDescription?: string;
  enableMonthYearPicker?: boolean; // Enable month/year picker when clicking header
  localeConfig?: string;

  // Style Props - Main Container
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  helperTextStyle?: TextStyle;
  errorTextStyle?: TextStyle;
  noteDescriptionStyle?: TextStyle;

  // Style Props - Modal
  modalStyle?: ViewStyle;
  modalOverlayStyle?: ViewStyle;
  modalContentStyle?: ViewStyle;
  modalHeaderStyle?: ViewStyle;
  modalFooterStyle?: ViewStyle;
  modalTitleStyle?: TextStyle;
  shadowContentStyle?: ViewStyle;

  // Style Props - Icons
  leftIconContainerStyle?: ViewStyle;
  rightIconContainerStyle?: ViewStyle;
  chevronIconStyle?: ImageStyle;

  // Color Props
  borderColorActive?: string;
  borderColorError?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  modalBackgroundColor?: string;
  selectedDayBackgroundColor?: string;
  selectedDayTextColor?: string;
  todayTextColor?: string;

  // Behavior Props
  maxHeight?: number;
  modalPosition?: 'center' | 'bottom';
  animationInTiming?: number;
  animationOutTiming?: number;
  backdropOpacity?: number;

  // Additional Modal Props
  onModalShow?: () => void;
  onModalHide?: () => void;
  onModalWillShow?: () => void;
  onModalWillHide?: () => void;
  swipeDirection?:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | Array<'up' | 'down' | 'left' | 'right'>;
  onSwipeComplete?: () => void;
  swipeThreshold?: number;
  backdropColor?: string;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  hideModalContentWhileAnimating?: boolean;
  avoidKeyboard?: boolean;
  coverScreen?: boolean;
  hasBackdrop?: boolean;
  customBackdrop?: ReactNode;

  // Text Props
  modalTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;

  // Button Style Props
  confirmButtonStyle?: ViewStyle;
  confirmButtonTextStyle?: TextStyle;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;

  // Render Props
  renderLabel?: (label: string, isRequired: boolean) => ReactNode;
  renderDisplayText?: (displayText: string, selectedDate?: string) => ReactNode;
  renderModalHeader?: (title: string, onClose: () => void) => ReactNode;
  renderModalFooter?: (
    onConfirm: () => void,
    onCancel: () => void,
    selectedDate?: string
  ) => ReactNode;
  renderLeftIcon?: (size: number, color: string) => ReactNode;
  renderRightIcon?: (size: number, color: string) => ReactNode;
  renderChevron?: (isOpen: boolean) => ReactNode;

  // Callback Props
  onOpen?: () => void;
  onClose?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;

  // Calendar Props
  calendarTheme?: any;
  markedDates?: { [key: string]: any };
  markingType?: MarkingTypes;
  firstDayOfWeek?: number;
  showWeekNumbers?: boolean;
  disableAllTouchEventsForDisabledDays?: boolean;
  enableSwipeMonths?: boolean;
  hideExtraDays?: boolean;
  hideDayNames?: boolean;
  hideArrows?: boolean;
  monthFormat?: string;

  // Date Format Props
  dateFormat?: string; // Display format
  formatDate?: (date: string) => string;

  // Accessibility Props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  modalTestID?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function DatePicker({
  // Basic Props
  label,
  placeholder = 'Chọn ngày...',
  helperText,
  errorText,
  value,
  onChange,
  minDate,
  maxDate,
  leftIcon,
  rightIcon,
  variant = 'outline',
  size = 'medium',
  isDisabled = false,
  isError = false,
  isRequired = false,
  fullWidth = true,
  shadowColor = '#000000',
  noteDescription,
  enableMonthYearPicker = true,
  localeConfig = 'en',

  // Style Props - Main Container
  containerStyle,
  inputStyle,
  labelStyle,
  inputContainerStyle,
  helperTextStyle,
  errorTextStyle,
  shadowContentStyle,
  noteDescriptionStyle,

  // Style Props - Modal
  modalStyle,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalFooterStyle,
  modalTitleStyle,

  // Style Props - Icons
  leftIconContainerStyle,
  rightIconContainerStyle,
  chevronIconStyle: customChevronIconStyle,
  // Color Props
  borderColorActive = '#007AFF',
  borderColorError = '#FF3B30',
  borderColor = '#C7C7CC',
  backgroundColor,
  textColor,
  placeholderColor,
  modalBackgroundColor,
  selectedDayBackgroundColor,
  selectedDayTextColor = '#FFFFFF',
  todayTextColor,

  // Behavior Props
  maxHeight = SCREEN_HEIGHT * 0.7,
  modalPosition = 'center',
  animationInTiming = 400,
  animationOutTiming = 400,
  backdropOpacity = 0.5,

  // Additional Modal Props
  onModalShow,
  onModalHide,
  onModalWillShow,
  onModalWillHide,
  swipeDirection,
  onSwipeComplete,
  swipeThreshold,
  backdropColor = 'transparent',
  backdropTransitionInTiming,
  backdropTransitionOutTiming,
  hideModalContentWhileAnimating = false,
  avoidKeyboard = true,
  coverScreen = true,
  hasBackdrop = true,
  customBackdrop,

  // Text Props
  modalTitle,
  confirmButtonText = 'Xác nhận',
  cancelButtonText = 'Hủy',

  // Button Style Props
  confirmButtonStyle,
  confirmButtonTextStyle,
  cancelButtonStyle,
  cancelButtonTextStyle,

  // Render Props
  renderLabel,
  renderDisplayText,
  renderModalHeader,
  renderModalFooter,
  renderLeftIcon,
  renderRightIcon,
  renderChevron,

  // Callback Props
  onOpen,
  onClose,
  onFocus,
  onBlur,
  onClear,

  // Calendar Props
  calendarTheme,
  markedDates: customMarkedDates,
  markingType = 'simple' as MarkingTypes,
  firstDayOfWeek = 1,
  showWeekNumbers = false,
  disableAllTouchEventsForDisabledDays = true,
  enableSwipeMonths = true,
  hideExtraDays = true,
  hideDayNames = false,
  hideArrows = false,
  monthFormat = 'MMMM yyyy',

  // Date Format Props
  dateFormat = 'DD/MM/YYYY',
  formatDate,

  // Accessibility Props
  accessibilityLabel,
  accessibilityHint,
  testID,
  modalTestID,
}: DatePickerProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<string | undefined>(
    value
  );
  const [pickerView, setPickerView] = useState<'date' | 'month' | 'year'>(
    'date'
  );
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const [year, month] = value.split('-');
      return `${year}-${month}`;
    }
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    if (value) {
      return parseInt(
        value.split('-')[0] ?? String(new Date().getFullYear()),
        10
      );
    }
    return new Date().getFullYear();
  });
  const [currentDecade, setCurrentDecade] = useState(() => {
    const year = value
      ? parseInt(value.split('-')[0] ?? String(new Date().getFullYear()), 10)
      : new Date().getFullYear();
    return Math.floor(year / 10) * 10;
  });

  const hasError = isError || !!errorText;

  // Dynamic styles with custom color support
  const dynamicStyles = useMemo(() => {
    return {
      modalBackgroundColor:
        modalBackgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      displayTextPlaceholderColor:
        placeholderColor ?? (isDark ? '#8E8E93' : '#C7C7CC'),
      selectedDayBackgroundColor:
        selectedDayBackgroundColor ?? borderColorActive,
      todayTextColor: todayTextColor ?? borderColorActive,
      backgroundColor: backgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      textColor: textColor ?? (isDark ? '#FFFFFF' : '#000000'),
    };
  }, [
    isDark,
    modalBackgroundColor,
    placeholderColor,
    selectedDayBackgroundColor,
    borderColorActive,
    todayTextColor,
    backgroundColor,
    textColor,
  ]);

  // Format date for display
  const formatDisplayDate = useCallback(
    (date?: string): string => {
      if (!date) return placeholder;

      if (formatDate) {
        return formatDate(date);
      }

      // Simple date formatting from YYYY-MM-DD to DD/MM/YYYY
      const parts = date.split('-');
      if (parts.length !== 3) return date;

      const [year, month, day] = parts;
      return dateFormat
        .replace('DD', day ?? '')
        .replace('MM', month ?? '')
        .replace('YYYY', year ?? '');
    },
    [dateFormat, formatDate, placeholder]
  );

  const displayText = useMemo(
    () => formatDisplayDate(value),
    [value, formatDisplayDate]
  );

  const getIconSize = useCallback((): number => {
    const sizes = {
      small: 12,
      medium: 16,
      large: 20,
    };
    return sizes[size];
  }, [size]);

  const getIconColor = useCallback((): string => {
    if (hasError) return borderColorError;
    if (isFocused) return borderColorActive;
    return isDark ? '#8E8E93' : '#6D6D70';
  }, [hasError, isFocused, isDark, borderColorError, borderColorActive]);

  const chevronIconStyle = useMemo(
    () => ({
      width: getIconSize(),
      height: getIconSize(),
      tintColor: getIconColor(),
    }),
    [getIconSize, getIconColor]
  );

  const getModalContentStyle = useCallback(
    (): ViewStyle => ({
      backgroundColor: dynamicStyles.modalBackgroundColor,
      maxHeight,
    }),
    [dynamicStyles.modalBackgroundColor, maxHeight]
  );

  const getDisplayTextStyle = useCallback((): TextStyle => {
    if (!value) {
      return {
        color: dynamicStyles.displayTextPlaceholderColor,
      };
    }
    return {};
  }, [value, dynamicStyles.displayTextPlaceholderColor]);

  const handleOpenModal = () => {
    if (!isDisabled) {
      setTempSelectedDate(value);
      setIsModalVisible(true);
      setIsFocused(true);
      setPickerView('date');
      // Reset decade to selected year's decade
      const year = value
        ? parseInt(value.split('-')[0] ?? String(new Date().getFullYear()), 10)
        : new Date().getFullYear();
      setCurrentDecade(Math.floor(year / 10) * 10);
      onOpen?.();
      onFocus?.();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsFocused(false);
    setTempSelectedDate(undefined);
    setPickerView('date');
    onClose?.();
    onBlur?.();
  };

  const handleConfirm = () => {
    if (tempSelectedDate) {
      onChange?.(tempSelectedDate);
    }
    handleCloseModal();
  };

  const handleCancel = () => {
    setTempSelectedDate(value);
    onClear?.();
    handleCloseModal();
  };

  const handleDayPress = (day: DateData) => {
    setTempSelectedDate(day.dateString);
  };

  const handleMonthPress = (month: number) => {
    const year = selectedYear;
    const monthStr = String(month).padStart(2, '0');
    setCurrentMonth(`${year}-${monthStr}`);
    setPickerView('date');
  };

  const handlePreviousYear = () => {
    const newYear = selectedYear - 1;
    if (minDate) {
      const minYear = parseInt(minDate.split('-')[0] ?? '0', 10);
      if (newYear >= minYear) {
        setSelectedYear(newYear);
      }
    } else {
      setSelectedYear(newYear);
    }
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    if (maxDate) {
      const maxYear = parseInt(maxDate.split('-')[0] ?? '9999', 10);
      if (newYear <= maxYear) {
        setSelectedYear(newYear);
      }
    } else {
      setSelectedYear(newYear);
    }
  };

  const handleYearPress = (year: number) => {
    setSelectedYear(year);
    setCurrentDecade(Math.floor(year / 10) * 10);
    setPickerView('month');
  };

  const handleHeaderPress = () => {
    if (enableMonthYearPicker) {
      if (pickerView === 'date') {
        setPickerView('month');
      } else if (pickerView === 'month') {
        setPickerView('year');
      }
    }
  };

  const getContainerStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      ...(fullWidth && { width: '100%' }),
    };

    return {
      ...baseStyles,
    };
  };

  const getInputContainerStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
    };

    const variantStyles: Record<string, ViewStyle> = {
      outline: {
        borderWidth: 1,
        borderColor: hasError
          ? borderColorError
          : isFocused
            ? borderColorActive
            : borderColor,
        backgroundColor: backgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      },
      filled: {
        borderWidth: 0,
        backgroundColor: backgroundColor ?? (isDark ? '#2C2C2E' : '#F2F2F7'),
        borderBottomWidth: 2,
        borderBottomColor: hasError
          ? borderColorError
          : isFocused
            ? borderColorActive
            : 'transparent',
      },
      underline: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: hasError
          ? borderColorError
          : isFocused
            ? borderColorActive
            : borderColor,
        backgroundColor: backgroundColor ?? 'transparent',
        borderRadius: 0,
      },
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 56,
      },
    };

    const disabledStyles: ViewStyle = {
      opacity: 0.6,
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(isDisabled && disabledStyles),
    };
  };

  const getInputStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      flex: 1,
      color: dynamicStyles.textColor,
      fontWeight: '400',
    };

    const sizeStyles: Record<string, TextStyle> = {
      small: {
        fontSize: 14,
        lineHeight: 20,
      },
      medium: {
        fontSize: 16,
        lineHeight: 24,
      },
      large: {
        fontSize: 18,
        lineHeight: 26,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
    };
  };

  const renderChevronIcon = () => {
    if (renderChevron) {
      return renderChevron(isModalVisible);
    }

    return (
      <View style={styles.chevronIcon}>
        <Image
          source={require('../assets/up_arrows.png')}
          tintColor={getIconColor()}
          style={[
            { transform: [{ rotate: isModalVisible ? '0deg' : '180deg' }] },
            chevronIconStyle,
            customChevronIconStyle,
          ]}
        />
      </View>
    );
  };

  // Calendar theme
  const calendarThemeConfig = useMemo(
    () => ({
      'backgroundColor': dynamicStyles.modalBackgroundColor,
      'calendarBackground': dynamicStyles.modalBackgroundColor,
      'textSectionTitleColor': isDark ? '#8E8E93' : '#6D6D70',
      'selectedDayBackgroundColor': dynamicStyles.selectedDayBackgroundColor,
      'selectedDayTextColor': selectedDayTextColor,
      'todayTextColor': dynamicStyles.todayTextColor,
      'dayTextColor': isDark ? '#FFFFFF' : '#000000',
      'textDisabledColor': isDark ? '#3A3A3C' : '#C7C7CC',
      'monthTextColor': isDark ? '#FFFFFF' : '#000000',
      'indicatorColor': borderColorActive,
      'textDayFontWeight': '400',
      'textMonthFontWeight': '600',
      'textDayHeaderFontWeight': '500',
      'textDayFontSize': 16,
      'textMonthFontSize': 18,
      'textDayHeaderFontSize': 14,
      'arrowColor': borderColorActive,
      'stylesheet.calendar.header': {
        week: {
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      },
      ...calendarTheme,
    }),
    [
      isDark,
      dynamicStyles,
      selectedDayTextColor,
      borderColorActive,
      calendarTheme,
    ]
  );

  // Marked dates
  const markedDatesConfig = useMemo(() => {
    const marked: { [key: string]: any } = { ...customMarkedDates };

    if (tempSelectedDate) {
      marked[tempSelectedDate] = {
        ...marked[tempSelectedDate],
        selected: true,
        selectedColor: dynamicStyles.selectedDayBackgroundColor,
      };
    }

    return marked;
  }, [tempSelectedDate, customMarkedDates, dynamicStyles]);

  const renderMonthPicker = () => {
    const listMonth = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString(localeConfig, { month: 'long' })
    );

    return (
      <View style={styles.pickerContainer}>
        <View style={[styles.pickerHeader, styles.pickMonthHeader]}>
          <Pressable onPress={handlePreviousYear} style={styles.yearButton}>
            <CustomText
              variant="body"
              style={[styles.yearArrow, { color: borderColorActive }]}
            >
              ‹
            </CustomText>
          </Pressable>

          <Pressable onPress={handleHeaderPress}>
            <CustomText
              style={styles.yearSelected}
              color="primary"
              variant="h6"
            >
              {selectedYear}
            </CustomText>
          </Pressable>

          <Pressable onPress={handleNextYear} style={styles.yearButton}>
            <CustomText
              variant="body"
              style={[styles.yearArrow, { color: borderColorActive }]}
            >
              ›
            </CustomText>
          </Pressable>
        </View>
        <View style={styles.monthGrid}>
          {listMonth.map((month, index) => {
            const monthNum = index + 1;
            const monthDate = `${selectedYear}-${String(monthNum).padStart(2, '0')}-01`;
            const isSelected =
              currentMonth ===
              `${selectedYear}-${String(monthNum).padStart(2, '0')}`;
            const isMonthDisabled =
              (minDate && monthDate < minDate) ||
              (maxDate && monthDate > maxDate);
            return (
              <Pressable
                key={month}
                style={[
                  styles.monthItem,
                  isSelected && {
                    backgroundColor: dynamicStyles.selectedDayBackgroundColor,
                  },
                  isMonthDisabled && styles.disabledItem,
                ]}
                onPress={() => !isMonthDisabled && handleMonthPress(monthNum)}
                disabled={!!isMonthDisabled}
              >
                <CustomText
                  variant="body"
                  style={[
                    styles.monthText,
                    isSelected && { color: selectedDayTextColor },
                    !isSelected && { color: dynamicStyles.textColor },
                    isMonthDisabled && styles.disabledText,
                  ]}
                >
                  {month}
                </CustomText>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  const renderYearPicker = () => {
    const years = Array.from({ length: 10 }, (_, i) => currentDecade + i);
    const decadeStart = currentDecade;
    const decadeEnd = currentDecade + 9;

    const handlePreviousDecade = () => {
      const newDecade = currentDecade - 10;
      if (minDate) {
        const minYear = parseInt(minDate.split('-')[0] ?? '0', 10);
        const minDecade = Math.floor(minYear / 10) * 10;
        if (newDecade >= minDecade) {
          setCurrentDecade(newDecade);
        }
      } else {
        setCurrentDecade(newDecade);
      }
    };

    const handleNextDecade = () => {
      const newDecade = currentDecade + 10;
      if (maxDate) {
        const maxYear = parseInt(maxDate.split('-')[0] ?? '9999', 10);
        const maxDecade = Math.floor(maxYear / 10) * 10;
        if (newDecade <= maxDecade) {
          setCurrentDecade(newDecade);
        }
      } else {
        setCurrentDecade(newDecade);
      }
    };

    return (
      <View style={styles.pickerContainer}>
        <View style={[styles.pickerHeader, styles.pickYearHeader]}>
          <Pressable onPress={handlePreviousDecade} style={styles.decadeButton}>
            <CustomText
              variant="body"
              style={[styles.decadeArrow, { color: borderColorActive }]}
            >
              ‹
            </CustomText>
          </Pressable>

          <CustomText
            variant="h6"
            color="primary"
            style={styles.headerYearPick}
          >
            {decadeStart} - {decadeEnd}
          </CustomText>

          <Pressable onPress={handleNextDecade} style={styles.decadeButton}>
            <CustomText
              variant="body"
              style={[styles.decadeArrow, { color: borderColorActive }]}
            >
              ›
            </CustomText>
          </Pressable>
        </View>
        <View style={styles.yearGrid}>
          {years.map((year) => {
            const isSelected = selectedYear === year;
            const isYearDisabled =
              (minDate && year < parseInt(minDate.split('-')[0] ?? '0', 10)) ||
              (maxDate && year > parseInt(maxDate.split('-')[0] ?? '9999', 10));
            return (
              <Pressable
                key={year}
                style={[
                  styles.yearItem,
                  isSelected && {
                    backgroundColor: dynamicStyles.selectedDayBackgroundColor,
                  },
                  isYearDisabled && styles.disabledItem,
                ]}
                onPress={() => !isYearDisabled && handleYearPress(year)}
                disabled={!!isYearDisabled}
              >
                <CustomText
                  variant="body"
                  style={[
                    styles.yearText,
                    isSelected && { color: selectedDayTextColor },
                    !isSelected && { color: dynamicStyles.textColor },
                    isYearDisabled && styles.disabledText,
                  ]}
                >
                  {year}
                </CustomText>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  const renderModalContent = () => {
    const isBottomModal = modalPosition === 'bottom';

    return (
      <Modal
        style={[styles.modal, modalStyle]}
        isVisible={isModalVisible}
        animationIn={isBottomModal ? 'slideInUp' : 'zoomIn'}
        animationOut={isBottomModal ? 'slideOutDown' : 'zoomOut'}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        backdropOpacity={backdropOpacity}
        onBackdropPress={handleCloseModal}
        useNativeDriver
        statusBarTranslucent
        testID={modalTestID}
        onModalShow={onModalShow}
        onModalHide={onModalHide}
        onModalWillShow={onModalWillShow}
        onModalWillHide={onModalWillHide}
        swipeDirection={swipeDirection}
        onSwipeComplete={onSwipeComplete}
        swipeThreshold={swipeThreshold}
        backdropColor={backdropColor}
        backdropTransitionInTiming={backdropTransitionInTiming}
        backdropTransitionOutTiming={backdropTransitionOutTiming}
        hideModalContentWhileAnimating={hideModalContentWhileAnimating}
        avoidKeyboard={avoidKeyboard}
        coverScreen={coverScreen}
        hasBackdrop={hasBackdrop}
        customBackdrop={customBackdrop}
      >
        <ShadowedView
          style={[
            styles.shadowContainer,
            { shadowColor: shadowColor },
            shadowContentStyle,
          ]}
        >
          <Pressable
            style={[
              styles.modalOverlay,
              isBottomModal && styles.modalOverlayBottom,
              modalOverlayStyle,
            ]}
            onPress={handleCloseModal}
          >
            <StatusBar
              backgroundColor={`rgba(0, 0, 0, ${backdropOpacity})`}
              barStyle={isDark ? 'light-content' : 'light-content'}
            />
            <View
              style={[
                styles.modalSafeArea,
                isBottomModal && styles.modalSafeAreaBottom,
                isBottomModal && { paddingBottom: insets.bottom },
              ]}
            >
              <Pressable
                style={[
                  styles.modalContent,
                  isBottomModal && styles.modalContentBottom,
                  getModalContentStyle(),
                  modalContentStyle,
                ]}
                onPress={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                {renderModalHeader ? (
                  renderModalHeader(
                    modalTitle ?? label ?? 'Chọn ngày',
                    handleCloseModal
                  )
                ) : (
                  <View style={[styles.modalHeader, modalHeaderStyle]}>
                    <CustomText
                      variant="h6"
                      color="primary"
                      style={[styles.modalTitle, modalTitleStyle]}
                    >
                      {modalTitle ?? label ?? 'Chọn ngày'}
                    </CustomText>
                  </View>
                )}

                {/* Calendar / Month Picker / Year Picker */}
                <View style={styles.calendarContainer}>
                  {pickerView === 'date' && (
                    <Calendar
                      current={currentMonth}
                      onDayPress={handleDayPress}
                      markedDates={markedDatesConfig}
                      markingType={markingType as MarkingTypes}
                      minDate={minDate}
                      maxDate={maxDate}
                      theme={calendarThemeConfig}
                      firstDay={firstDayOfWeek}
                      showWeekNumbers={showWeekNumbers}
                      disableAllTouchEventsForDisabledDays={
                        disableAllTouchEventsForDisabledDays
                      }
                      enableSwipeMonths={enableSwipeMonths}
                      hideExtraDays={hideExtraDays}
                      hideDayNames={hideDayNames}
                      hideArrows={hideArrows}
                      monthFormat={monthFormat}
                      onPressArrowLeft={(subtractMonth) => {
                        subtractMonth();
                      }}
                      onPressArrowRight={(addMonth) => {
                        addMonth();
                      }}
                      renderHeader={(date) => {
                        const monthNames = [
                          'Tháng 1',
                          'Tháng 2',
                          'Tháng 3',
                          'Tháng 4',
                          'Tháng 5',
                          'Tháng 6',
                          'Tháng 7',
                          'Tháng 8',
                          'Tháng 9',
                          'Tháng 10',
                          'Tháng 11',
                          'Tháng 12',
                        ];
                        const month = date?.getMonth() ?? 0;
                        const year =
                          date?.getFullYear() ?? new Date().getFullYear();
                        return (
                          <Pressable
                            onPress={handleHeaderPress}
                            style={styles.calendarHeaderContainer}
                          >
                            <CustomText
                              variant="h6"
                              color="primary"
                              style={styles.calendarHeaderText}
                            >
                              {monthNames[month]} {year}
                            </CustomText>
                          </Pressable>
                        );
                      }}
                    />
                  )}
                  {pickerView === 'month' && renderMonthPicker()}
                  {pickerView === 'year' && renderYearPicker()}
                </View>

                {/* Modal Footer */}
                {renderModalFooter ? (
                  renderModalFooter(
                    handleConfirm,
                    handleCancel,
                    tempSelectedDate
                  )
                ) : (
                  <View style={[styles.modalFooter, modalFooterStyle]}>
                    {noteDescription && (
                      <CustomText
                        style={[styles.noteDescription, noteDescriptionStyle]}
                        variant="caption"
                        color="primary"
                      >
                        {noteDescription}
                      </CustomText>
                    )}
                    <View style={styles.footerButtonContainer}>
                      <Button
                        variant="secondary"
                        style={[styles.footerButton, cancelButtonStyle]}
                        onPress={handleCancel}
                      >
                        <CustomText
                          variant="button"
                          color="secondary"
                          style={cancelButtonTextStyle}
                        >
                          {cancelButtonText}
                        </CustomText>
                      </Button>
                      <Button
                        variant="primary"
                        style={[styles.footerButton, confirmButtonStyle]}
                        onPress={handleConfirm}
                      >
                        <CustomText
                          variant="button"
                          color="inverse"
                          style={confirmButtonTextStyle}
                        >
                          {confirmButtonText}
                        </CustomText>
                      </Button>
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
          </Pressable>
        </ShadowedView>
      </Modal>
    );
  };

  return (
    <View
      style={[getContainerStyles(), containerStyle]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {label &&
        (renderLabel ? (
          renderLabel(label, isRequired)
        ) : (
          <View style={styles.labelContainer}>
            <CustomText
              variant="label"
              color="primary"
              style={[styles.label, labelStyle]}
            >
              {label}
              {isRequired && (
                <CustomText variant="label" color="error">
                  {' '}
                  *
                </CustomText>
              )}
            </CustomText>
          </View>
        ))}

      <Pressable
        onPress={handleOpenModal}
        disabled={isDisabled}
        style={[getInputContainerStyles(), inputContainerStyle]}
      >
        {leftIcon &&
          (renderLeftIcon ? (
            <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
              {renderLeftIcon(getIconSize(), getIconColor())}
            </View>
          ) : (
            <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
              {React.cloneElement(
                leftIcon as React.ReactElement,
                {
                  size: getIconSize(),
                  color: getIconColor(),
                } as any
              )}
            </View>
          ))}

        {renderDisplayText ? (
          <View style={styles.displayTextContainer}>
            {renderDisplayText(displayText, value)}
          </View>
        ) : (
          <CustomText
            style={[getInputStyles(), inputStyle, getDisplayTextStyle()]}
            numberOfLines={1}
          >
            {displayText}
          </CustomText>
        )}

        {rightIcon ? (
          renderRightIcon ? (
            <View style={[styles.rightIconContainer, rightIconContainerStyle]}>
              {renderRightIcon(getIconSize(), getIconColor())}
            </View>
          ) : (
            <View style={[styles.rightIconContainer, rightIconContainerStyle]}>
              {React.cloneElement(
                rightIcon as React.ReactElement,
                {
                  size: getIconSize(),
                  color: getIconColor(),
                } as any
              )}
            </View>
          )
        ) : (
          renderChevronIcon()
        )}
      </Pressable>

      {(helperText || errorText) && (
        <CustomText
          variant="caption"
          color={hasError ? 'error' : 'secondary'}
          style={[
            styles.helperText,
            hasError ? errorTextStyle : helperTextStyle,
          ]}
        >
          {errorText ?? helperText}
        </CustomText>
      )}

      {renderModalContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 0,
  },
  displayTextContainer: {
    flex: 1,
  },
  leftIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSafeArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  modalContent: {
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlayBottom: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalSafeAreaBottom: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  modalContentBottom: {
    width: '100%',
    borderRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingTop: 12,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#000000',
  },
  closeButtonText: {
    fontSize: 24,
  },
  calendarContainer: {
    paddingVertical: 8,
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingVertical: 12,
    gap: 12,
  },
  footerButton: {
    flex: 1,
  },
  footerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shadowContainer: {
    flex: 1,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: {
      width: 5,
      height: 3,
    },
  },
  noteDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    textAlign: 'center',
  },
  pickerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    position: 'relative',
  },
  pickYearHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickMonthHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  monthItem: {
    width: SCREEN_WIDTH / 3 - 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingVertical: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  yearItem: {
    width: SCREEN_WIDTH / 3 - 40,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  yearText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  decadeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  decadeArrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  yearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  yearArrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  disabledItem: {
    backgroundColor: '#F5F5F5',
  },
  disabledText: {
    color: '#C7C7CC',
  },
  calendarHeaderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  calendarHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerYearPick: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  yearSelected: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});
