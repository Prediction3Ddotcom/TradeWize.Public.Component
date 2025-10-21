"use strict";

import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View, Image } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "./button.js";
import { CustomText } from "./text.js";
import Modal from 'react-native-modal';
import { SCREEN_HEIGHT } from "../utils/index.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const MonthYearPicker = ({
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
    DECEMBER: 'December'
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
  onBackdropPress: onBackdropPressProp
}) => {
  const [selectedMonthKey, setSelectedMonthKey] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(initialDate);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);
  const insets = useSafeAreaInsets();
  const monthScrollRef = useRef(null);
  const yearScrollRef = useRef(null);

  // Dynamic dimensions based on props
  const ITEM_HEIGHT = itemHeight;
  const PICKER_HEIGHT = ITEM_HEIGHT * visibleItems;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const monthData = useMemo(() => months, []);
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
      const currentMonthKey = initialDate ? monthKeys[initialDate.getMonth()] : monthKeys[currentDate.getMonth()];
      const currentYear = initialDate ? initialDate.getFullYear().toString() : currentDate.getFullYear().toString();
      const initialMonthIndex = initialDate ? initialDate.getMonth() : currentDate.getMonth();

      // Set selected values to current month and year
      setSelectedMonthKey(currentMonthKey);
      setSelectedYear(currentYear);

      // Scroll to current positions
      setTimeout(() => {
        if (monthScrollRef.current) {
          monthScrollRef.current?.scrollTo({
            y: (initialMonthIndex + monthKeys.length) * ITEM_HEIGHT,
            animated: false
          });
        }
        if (yearScrollRef.current) {
          const yearIndex = years.indexOf(currentYear);
          if (yearIndex !== -1) {
            yearScrollRef.current?.scrollTo({
              y: yearIndex * ITEM_HEIGHT,
              animated: false
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
      const isInvalid = yearNum > maxYear || yearNum === maxYear && monthIndex > maxMonth;
      setIsConfirmDisabled(isInvalid);
    }
  }, [selectedMonthKey, selectedYear, maxDateSelect, monthData]);
  const handleYearSelect = (year, index) => {
    const _selectedYear = parseInt(year, 10);
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    if (_selectedYear >= minYear && _selectedYear <= maxYear) {
      setSelectedYear(year);
      yearScrollRef.current?.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true
      });
    }
  };
  const handleMonthSelect = (monthKey, index) => {
    const selectedMonthIndex = monthKeys.indexOf(monthKey);
    const currentYear = parseInt(selectedYear, 10);
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const minMonth = minDate.getMonth();
    const maxMonth = maxDate.getMonth();

    // Check if the selected month is within the allowed range
    if ((currentYear > minYear || currentYear === minYear && selectedMonthIndex >= minMonth) && (currentYear < maxYear || currentYear === maxYear && selectedMonthIndex <= maxMonth)) {
      setSelectedMonthKey(monthKey);
      monthScrollRef.current?.scrollTo({
        y: (index + monthKeys.length) * ITEM_HEIGHT,
        animated: true
      });
    }
  };
  const handleMonthScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const actualIndex = index % monthKeys.length;

    // Update selected month first
    if (monthKeys[actualIndex]) {
      setSelectedMonthKey(monthKeys[actualIndex]);
    }

    // Then handle scroll reset if needed
    if (index >= monthKeys.length * 2) {
      requestAnimationFrame(() => {
        monthScrollRef.current?.scrollTo({
          y: (index % monthKeys.length + monthKeys.length) * ITEM_HEIGHT,
          animated: false
        });
      });
    } else if (index < monthKeys.length) {
      requestAnimationFrame(() => {
        monthScrollRef.current?.scrollTo({
          y: (index % monthKeys.length + monthKeys.length) * ITEM_HEIGHT,
          animated: false
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
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Button, {
      variant: "ghost",
      style: [styles.inputDate, {
        backgroundColor: inputBackgroundColor,
        borderWidth: inputBorderWidth,
        borderColor: inputBorderColor,
        padding: inputPadding
      }, disabled && {
        backgroundColor: disabledBackgroundColor
      }, styleInput],
      onPress: handleOpenModal,
      children: [/*#__PURE__*/_jsx(CustomText, {
        variant: "body",
        style: [styles.input, {
          color: inputTextColor
        }, styleInputText],
        children: value ? dayjs(value).format(dateFormat) : placeholder
      }), showIcon && /*#__PURE__*/_jsx(_Fragment, {
        children: iconCalendar || /*#__PURE__*/_jsx(Image, {
          source: require('../assets/calendar.png'),
          style: [styles.iconCalendar, iconCalendarStyle]
        })
      })]
    }), /*#__PURE__*/_jsx(Modal, {
      style: [styles.modal, styleModal],
      onBackdropPress: handleBackdropPress,
      isVisible: isVisible,
      animationIn: "slideInUp",
      animationOut: "slideOutDown",
      animationInTiming: animationInTiming,
      animationOutTiming: animationOutTiming,
      backdropOpacity: backdropOpacity,
      children: /*#__PURE__*/_jsx(View, {
        style: [styles.modalContainer, styleModalContainer],
        children: /*#__PURE__*/_jsxs(ShadowedView, {
          style: [styles.pickerContainer, styles.shadowGlobal, {
            paddingBottom: insets.bottom + 12,
            backgroundColor: modalBackgroundColor,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius
          }, stylePickerContainer],
          children: [/*#__PURE__*/_jsx(View, {
            style: [styles.line, {
              backgroundColor: lineIndicatorColor
            }, styleLineIndicator]
          }), /*#__PURE__*/_jsx(CustomText, {
            variant: "h2",
            style: [styles.title, {
              color: titleTextColor
            }, styleTitle],
            children: modalTitle
          }), /*#__PURE__*/_jsxs(View, {
            style: [styles.contentContainer, {
              height: PICKER_HEIGHT
            }, styleContentContainer],
            children: [/*#__PURE__*/_jsxs(View, {
              style: [styles.column, {
                height: PICKER_HEIGHT
              }],
              children: [/*#__PURE__*/_jsx(View, {
                style: [styles.highlightBox, {
                  height: ITEM_HEIGHT,
                  marginTop: -ITEM_HEIGHT / 2,
                  borderColor: highlightBorderColor
                }, styleHighlightBox]
              }), /*#__PURE__*/_jsxs(ScrollView, {
                ref: monthScrollRef,
                showsVerticalScrollIndicator: false,
                snapToInterval: ITEM_HEIGHT,
                decelerationRate: "fast",
                style: [styles.scrollView, {
                  height: PICKER_HEIGHT
                }, styleScrollView],
                contentContainerStyle: styles.scrollContent,
                onMomentumScrollEnd: handleMonthScroll,
                onScrollEndDrag: handleMonthScroll,
                children: [/*#__PURE__*/_jsx(View, {
                  style: [styles.paddingTop, {
                    height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2
                  }]
                }), infiniteMonthKeys.map((monthKey, index) => /*#__PURE__*/_jsx(Button, {
                  variant: "ghost",
                  onPress: () => handleMonthSelect(monthKey, index),
                  style: [styles.optionContainer, {
                    height: ITEM_HEIGHT
                  }],
                  children: /*#__PURE__*/_jsx(CustomText, {
                    variant: "body",
                    style: [styles.optionText, {
                      color: unselectedTextColor
                    }, styleOptionText, selectedMonthKey === monthKey && [styles.selectedText, {
                      color: selectedTextColor
                    }, styleSelectedText]],
                    children: monthData[monthKey]
                  })
                }, `${monthKey}-${index}`)), /*#__PURE__*/_jsx(View, {
                  style: [styles.paddingBottom, {
                    height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2
                  }]
                })]
              })]
            }), /*#__PURE__*/_jsxs(View, {
              style: [styles.column, {
                height: PICKER_HEIGHT
              }],
              children: [/*#__PURE__*/_jsx(View, {
                style: [styles.highlightBox, {
                  height: ITEM_HEIGHT,
                  marginTop: -ITEM_HEIGHT / 2,
                  borderColor: highlightBorderColor
                }, styleHighlightBox]
              }), /*#__PURE__*/_jsxs(ScrollView, {
                ref: yearScrollRef,
                showsVerticalScrollIndicator: false,
                snapToInterval: ITEM_HEIGHT,
                decelerationRate: "fast",
                style: [styles.scrollView, {
                  height: PICKER_HEIGHT
                }, styleScrollView],
                contentContainerStyle: styles.scrollContent,
                onMomentumScrollEnd: event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  const index = Math.round(offsetY / ITEM_HEIGHT);
                  if (years[index]) {
                    setSelectedYear(years[index]);
                  }
                },
                onScrollEndDrag: event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  const index = Math.round(offsetY / ITEM_HEIGHT);
                  if (years[index]) {
                    setSelectedYear(years[index]);
                  }
                },
                children: [/*#__PURE__*/_jsx(View, {
                  style: [styles.paddingTop, {
                    height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2
                  }]
                }), years.map((year, index) => /*#__PURE__*/_jsx(Button, {
                  variant: "ghost",
                  onPress: () => handleYearSelect(year, index),
                  style: [styles.optionContainer, {
                    height: ITEM_HEIGHT
                  }],
                  children: /*#__PURE__*/_jsx(CustomText, {
                    variant: "body",
                    style: [styles.optionText, {
                      color: unselectedTextColor
                    }, styleOptionText, selectedYear === year && [styles.selectedText, {
                      color: selectedTextColor
                    }, styleSelectedText]],
                    children: year
                  })
                }, year)), /*#__PURE__*/_jsx(View, {
                  style: [styles.paddingBottom, {
                    height: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2
                  }]
                })]
              })]
            })]
          }), isShowError && isConfirmDisabled && /*#__PURE__*/_jsx(CustomText, {
            variant: "caption",
            style: [styles.errorText, {
              color: errorTextColor
            }, styleErrorText],
            children: textError ? textError : 'Cannot exceed the present time'
          }), /*#__PURE__*/_jsxs(View, {
            style: [styles.buttonContainer, styleButtonContainer],
            children: [/*#__PURE__*/_jsx(Button, {
              isDisabled: disabledCancel,
              onPress: handleClose,
              title: cancelButtonText,
              style: [styles.button, styleCancelButton, styleButton]
            }), /*#__PURE__*/_jsx(Button, {
              disabled: disabledConfirm,
              onPress: handleConfirm,
              title: confirmButtonText,
              style: [styles.button, {
                backgroundColor: buttonBackgroundColor
              }, isConfirmDisabled && {
                backgroundColor: disabledButtonColor
              }, styleConfirmButton, styleButton],
              variant: "primary"
            })]
          })]
        })
      })
    })]
  });
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modal: {
    margin: 0
  },
  input: {
    flex: 1,
    fontSize: 14
  },
  inputDate: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    height: 6,
    width: 72,
    marginBottom: 12,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 8
  },
  pickerContainer: {
    paddingHorizontal: 16,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.7
  },
  title: {
    textAlign: 'center',
    marginBottom: 16
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    marginBottom: 28
  },
  column: {
    flex: 1,
    position: 'relative'
  },
  scrollView: {
    // Height is dynamic based on props
  },
  scrollContent: {
    paddingHorizontal: 10
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: {
    textAlign: 'center'
  },
  selectedText: {
    fontWeight: 'bold'
  },
  highlightBox: {
    position: 'absolute',
    top: '50%',
    left: 8,
    right: 8,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    zIndex: -1
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
    gap: 16
  },
  button: {
    flex: 1
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 12
  },
  shadowGlobal: {
    shadowOpacity: 0.4,
    shadowRadius: Platform.OS === 'ios' ? 4 : 12,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  iconCalendar: {
    width: 24,
    height: 24
  }
});
export default MonthYearPicker;
//# sourceMappingURL=monthYearPicker.js.map