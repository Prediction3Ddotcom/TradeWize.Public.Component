"use strict";

import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Pressable, StatusBar, Dimensions, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { CustomText } from "./text.js";
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "./button.js";
import { ShadowedView } from 'react-native-fast-shadow';
import { Calendar } from 'react-native-calendars';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const {
  height: SCREEN_HEIGHT
} = Dimensions.get('window');
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
  markingType = 'simple',
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
  modalTestID
}) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState(value);
  const hasError = isError || !!errorText;

  // Dynamic styles with custom color support
  const dynamicStyles = useMemo(() => {
    return {
      modalBackgroundColor: modalBackgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      displayTextPlaceholderColor: placeholderColor ?? (isDark ? '#8E8E93' : '#C7C7CC'),
      selectedDayBackgroundColor: selectedDayBackgroundColor ?? borderColorActive,
      todayTextColor: todayTextColor ?? borderColorActive,
      backgroundColor: backgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      textColor: textColor ?? (isDark ? '#FFFFFF' : '#000000')
    };
  }, [isDark, modalBackgroundColor, placeholderColor, selectedDayBackgroundColor, borderColorActive, todayTextColor, backgroundColor, textColor]);

  // Format date for display
  const formatDisplayDate = useCallback(date => {
    if (!date) return placeholder;
    if (formatDate) {
      return formatDate(date);
    }

    // Simple date formatting from YYYY-MM-DD to DD/MM/YYYY
    const parts = date.split('-');
    if (parts.length !== 3) return date;
    const [year, month, day] = parts;
    return dateFormat.replace('DD', day ?? '').replace('MM', month ?? '').replace('YYYY', year ?? '');
  }, [dateFormat, formatDate, placeholder]);
  const displayText = useMemo(() => formatDisplayDate(value), [value, formatDisplayDate]);
  const getIconSize = useCallback(() => {
    const sizes = {
      small: 12,
      medium: 16,
      large: 20
    };
    return sizes[size];
  }, [size]);
  const getIconColor = useCallback(() => {
    if (hasError) return borderColorError;
    if (isFocused) return borderColorActive;
    return isDark ? '#8E8E93' : '#6D6D70';
  }, [hasError, isFocused, isDark, borderColorError, borderColorActive]);
  const chevronIconStyle = useMemo(() => ({
    width: getIconSize(),
    height: getIconSize(),
    tintColor: getIconColor()
  }), [getIconSize, getIconColor]);
  const getModalContentStyle = useCallback(() => ({
    backgroundColor: dynamicStyles.modalBackgroundColor,
    maxHeight
  }), [dynamicStyles.modalBackgroundColor, maxHeight]);
  const getDisplayTextStyle = useCallback(() => {
    if (!value) {
      return {
        color: dynamicStyles.displayTextPlaceholderColor
      };
    }
    return {};
  }, [value, dynamicStyles.displayTextPlaceholderColor]);
  const handleOpenModal = () => {
    if (!isDisabled) {
      setTempSelectedDate(value);
      setIsModalVisible(true);
      setIsFocused(true);
      onOpen?.();
      onFocus?.();
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsFocused(false);
    setTempSelectedDate(undefined);
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
  const handleDayPress = day => {
    setTempSelectedDate(day.dateString);
  };
  const getContainerStyles = () => {
    const baseStyles = {
      ...(fullWidth && {
        width: '100%'
      })
    };
    return {
      ...baseStyles
    };
  };
  const getInputContainerStyles = () => {
    const baseStyles = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8
    };
    const variantStyles = {
      outline: {
        borderWidth: 1,
        borderColor: hasError ? borderColorError : isFocused ? borderColorActive : borderColor,
        backgroundColor: backgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF')
      },
      filled: {
        borderWidth: 0,
        backgroundColor: backgroundColor ?? (isDark ? '#2C2C2E' : '#F2F2F7'),
        borderBottomWidth: 2,
        borderBottomColor: hasError ? borderColorError : isFocused ? borderColorActive : 'transparent'
      },
      underline: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: hasError ? borderColorError : isFocused ? borderColorActive : borderColor,
        backgroundColor: backgroundColor ?? 'transparent',
        borderRadius: 0
      }
    };
    const sizeStyles = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 36
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 56
      }
    };
    const disabledStyles = {
      opacity: 0.6
    };
    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(isDisabled && disabledStyles)
    };
  };
  const getInputStyles = () => {
    const baseStyles = {
      flex: 1,
      color: dynamicStyles.textColor,
      fontWeight: '400'
    };
    const sizeStyles = {
      small: {
        fontSize: 14,
        lineHeight: 20
      },
      medium: {
        fontSize: 16,
        lineHeight: 24
      },
      large: {
        fontSize: 18,
        lineHeight: 26
      }
    };
    return {
      ...baseStyles,
      ...sizeStyles[size]
    };
  };
  const renderChevronIcon = () => {
    if (renderChevron) {
      return renderChevron(isModalVisible);
    }
    return /*#__PURE__*/_jsx(View, {
      style: styles.chevronIcon,
      children: /*#__PURE__*/_jsx(Image, {
        source: require('../assets/up_arrows.png'),
        tintColor: getIconColor(),
        style: [{
          transform: [{
            rotate: isModalVisible ? '0deg' : '180deg'
          }]
        }, chevronIconStyle, customChevronIconStyle]
      })
    });
  };

  // Calendar theme
  const calendarThemeConfig = useMemo(() => ({
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
        justifyContent: 'space-between'
      }
    },
    ...calendarTheme
  }), [isDark, dynamicStyles, selectedDayTextColor, borderColorActive, calendarTheme]);

  // Marked dates
  const markedDatesConfig = useMemo(() => {
    const marked = {
      ...customMarkedDates
    };
    if (tempSelectedDate) {
      marked[tempSelectedDate] = {
        ...marked[tempSelectedDate],
        selected: true,
        selectedColor: dynamicStyles.selectedDayBackgroundColor
      };
    }
    return marked;
  }, [tempSelectedDate, customMarkedDates, dynamicStyles]);
  const renderModalContent = () => {
    const isBottomModal = modalPosition === 'bottom';
    return /*#__PURE__*/_jsx(Modal, {
      style: [styles.modal, modalStyle],
      isVisible: isModalVisible,
      animationIn: isBottomModal ? 'slideInUp' : 'zoomIn',
      animationOut: isBottomModal ? 'slideOutDown' : 'zoomOut',
      animationInTiming: animationInTiming,
      animationOutTiming: animationOutTiming,
      backdropOpacity: backdropOpacity,
      onBackdropPress: handleCloseModal,
      useNativeDriver: true,
      statusBarTranslucent: true,
      testID: modalTestID,
      onModalShow: onModalShow,
      onModalHide: onModalHide,
      onModalWillShow: onModalWillShow,
      onModalWillHide: onModalWillHide,
      swipeDirection: swipeDirection,
      onSwipeComplete: onSwipeComplete,
      swipeThreshold: swipeThreshold,
      backdropColor: backdropColor,
      backdropTransitionInTiming: backdropTransitionInTiming,
      backdropTransitionOutTiming: backdropTransitionOutTiming,
      hideModalContentWhileAnimating: hideModalContentWhileAnimating,
      avoidKeyboard: avoidKeyboard,
      coverScreen: coverScreen,
      hasBackdrop: hasBackdrop,
      customBackdrop: customBackdrop,
      children: /*#__PURE__*/_jsx(ShadowedView, {
        style: [styles.shadowContainer, {
          shadowColor: shadowColor
        }, shadowContentStyle],
        children: /*#__PURE__*/_jsxs(Pressable, {
          style: [styles.modalOverlay, isBottomModal && styles.modalOverlayBottom, modalOverlayStyle],
          onPress: handleCloseModal,
          children: [/*#__PURE__*/_jsx(StatusBar, {
            backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
            barStyle: isDark ? 'light-content' : 'light-content'
          }), /*#__PURE__*/_jsx(View, {
            style: [styles.modalSafeArea, isBottomModal && styles.modalSafeAreaBottom, isBottomModal && {
              paddingBottom: insets.bottom
            }],
            children: /*#__PURE__*/_jsxs(Pressable, {
              style: [styles.modalContent, isBottomModal && styles.modalContentBottom, getModalContentStyle(), modalContentStyle],
              onPress: e => e.stopPropagation(),
              children: [renderModalHeader ? renderModalHeader(modalTitle ?? label ?? 'Chọn ngày', handleCloseModal) : /*#__PURE__*/_jsx(View, {
                style: [styles.modalHeader, modalHeaderStyle],
                children: /*#__PURE__*/_jsx(CustomText, {
                  variant: "h6",
                  color: "primary",
                  style: [styles.modalTitle, modalTitleStyle],
                  children: modalTitle ?? label ?? 'Chọn ngày'
                })
              }), /*#__PURE__*/_jsx(View, {
                style: styles.calendarContainer,
                children: /*#__PURE__*/_jsx(Calendar, {
                  current: tempSelectedDate ?? value ?? undefined,
                  onDayPress: handleDayPress,
                  markedDates: markedDatesConfig,
                  markingType: markingType,
                  minDate: minDate,
                  maxDate: maxDate,
                  theme: calendarThemeConfig,
                  firstDay: firstDayOfWeek,
                  showWeekNumbers: showWeekNumbers,
                  disableAllTouchEventsForDisabledDays: disableAllTouchEventsForDisabledDays,
                  enableSwipeMonths: enableSwipeMonths,
                  hideExtraDays: hideExtraDays,
                  hideDayNames: hideDayNames,
                  hideArrows: hideArrows,
                  monthFormat: monthFormat
                })
              }), renderModalFooter ? renderModalFooter(handleConfirm, handleCancel, tempSelectedDate) : /*#__PURE__*/_jsxs(View, {
                style: [styles.modalFooter, modalFooterStyle],
                children: [noteDescription && /*#__PURE__*/_jsx(CustomText, {
                  style: [styles.noteDescription, noteDescriptionStyle],
                  variant: "caption",
                  color: "primary",
                  children: noteDescription
                }), /*#__PURE__*/_jsxs(View, {
                  style: styles.footerButtonContainer,
                  children: [/*#__PURE__*/_jsx(Button, {
                    variant: "secondary",
                    style: [styles.footerButton, cancelButtonStyle],
                    onPress: handleCancel,
                    children: /*#__PURE__*/_jsx(CustomText, {
                      variant: "button",
                      color: "secondary",
                      style: cancelButtonTextStyle,
                      children: cancelButtonText
                    })
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "primary",
                    style: [styles.footerButton, confirmButtonStyle],
                    onPress: handleConfirm,
                    children: /*#__PURE__*/_jsx(CustomText, {
                      variant: "button",
                      color: "inverse",
                      style: confirmButtonTextStyle,
                      children: confirmButtonText
                    })
                  })]
                })]
              })]
            })
          })]
        })
      })
    });
  };
  return /*#__PURE__*/_jsxs(View, {
    style: [getContainerStyles(), containerStyle],
    testID: testID,
    accessibilityLabel: accessibilityLabel,
    accessibilityHint: accessibilityHint,
    children: [label && (renderLabel ? renderLabel(label, isRequired) : /*#__PURE__*/_jsx(View, {
      style: styles.labelContainer,
      children: /*#__PURE__*/_jsxs(CustomText, {
        variant: "label",
        color: "primary",
        style: [styles.label, labelStyle],
        children: [label, isRequired && /*#__PURE__*/_jsxs(CustomText, {
          variant: "label",
          color: "error",
          children: [' ', "*"]
        })]
      })
    })), /*#__PURE__*/_jsxs(Pressable, {
      onPress: handleOpenModal,
      disabled: isDisabled,
      style: [getInputContainerStyles(), inputContainerStyle],
      children: [leftIcon && (renderLeftIcon ? /*#__PURE__*/_jsx(View, {
        style: [styles.leftIconContainer, leftIconContainerStyle],
        children: renderLeftIcon(getIconSize(), getIconColor())
      }) : /*#__PURE__*/_jsx(View, {
        style: [styles.leftIconContainer, leftIconContainerStyle],
        children: /*#__PURE__*/React.cloneElement(leftIcon, {
          size: getIconSize(),
          color: getIconColor()
        })
      })), renderDisplayText ? /*#__PURE__*/_jsx(View, {
        style: styles.displayTextContainer,
        children: renderDisplayText(displayText, value)
      }) : /*#__PURE__*/_jsx(CustomText, {
        style: [getInputStyles(), inputStyle, getDisplayTextStyle()],
        numberOfLines: 1,
        children: displayText
      }), rightIcon ? renderRightIcon ? /*#__PURE__*/_jsx(View, {
        style: [styles.rightIconContainer, rightIconContainerStyle],
        children: renderRightIcon(getIconSize(), getIconColor())
      }) : /*#__PURE__*/_jsx(View, {
        style: [styles.rightIconContainer, rightIconContainerStyle],
        children: /*#__PURE__*/React.cloneElement(rightIcon, {
          size: getIconSize(),
          color: getIconColor()
        })
      }) : renderChevronIcon()]
    }), (helperText || errorText) && /*#__PURE__*/_jsx(CustomText, {
      variant: "caption",
      color: hasError ? 'error' : 'secondary',
      style: [styles.helperText, hasError ? errorTextStyle : helperTextStyle],
      children: errorText ?? helperText
    }), renderModalContent()]
  });
}
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  labelContainer: {
    marginBottom: 8
  },
  label: {
    marginBottom: 0
  },
  displayTextContainer: {
    flex: 1
  },
  leftIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chevronIcon: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalSafeArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12
  },
  modalContent: {
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  modalOverlayBottom: {
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  modalSafeAreaBottom: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  modalContentBottom: {
    width: '100%',
    borderRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingTop: 12,
    paddingBottom: 8
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#000000'
  },
  closeButtonText: {
    fontSize: 24
  },
  calendarContainer: {
    paddingVertical: 8
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingVertical: 12,
    gap: 12
  },
  footerButton: {
    flex: 1
  },
  footerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  shadowContainer: {
    flex: 1,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: {
      width: 5,
      height: 3
    }
  },
  noteDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    textAlign: 'center'
  }
});
//# sourceMappingURL=DatePicker.js.map