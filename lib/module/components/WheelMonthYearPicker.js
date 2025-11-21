"use strict";

import React from 'react';
import { Dimensions, Platform, StyleSheet, View, requireNativeComponent } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { WheelPicker } from '@hortau/react-native-wheel-picker-android';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/index.js";
import { CustomText } from "./text.js";
import { Button } from "./button.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Lazy initialization to prevent duplicate registration with Re.pack
let NativeInfinitePicker = null;
function getNativeInfinitePicker() {
  if (NativeInfinitePicker === null) {
    NativeInfinitePicker = requireNativeComponent('InfinitePickerView');
  }
  return NativeInfinitePicker;
}
const WheelMonthYearPicker = props => {
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
    wheelMonthData = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    handleSelectedDate,
    onCancel
  } = props;
  const [selectedItem, setSelectedItem] = useState({
    month: 0,
    year: 0
  });

  // Track if we're initializing from initialDate to prevent auto-adjust interference
  const isInitializingRef = React.useRef(false);
  // Track last initialized month/year để tránh re-initialize không cần thiết
  const lastInitializedRef = React.useRef(null);

  // Tính toán danh sách years dựa trên minDate và maxDate
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const minYear = minDate?.getFullYear() ?? 1900;
    const maxYear = maxDate?.getFullYear() ?? currentYear;
    return Array.from({
      length: maxYear - minYear + 1
    }, (_, i) => (minYear + i).toString());
  }, [minDate, maxDate]);
  const onItemSelected = useCallback((index, type) => {
    try {
      if (type === 'month') {
        setSelectedItem(prev => ({
          ...prev,
          month: index
        }));
      } else {
        setSelectedItem(prev => ({
          ...prev,
          year: index
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleConfirm = () => {
    try {
      const yearSelected = years[selectedItem.year];
      if (!yearSelected) return;
      const monthSelected = selectedItem.month + 1 < 10 ? `0${selectedItem.month + 1}` : selectedItem.month + 1;
      const dateSelected = `${monthSelected}-${yearSelected}`;
      const [month, year] = dateSelected.split('-').map(Number);
      handleSelectedDate?.(new Date(Number(year), Number(month) - 1, 1));
    } catch (error) {
      console.log('handleConfirm error', error);
    }
  };

  // Reset state sau khi modal đóng hoàn toàn để tránh hiệu ứng nhảy
  const handleModalHide = useCallback(() => {
    setSelectedItem({
      month: 0,
      year: 0
    });
    lastInitializedRef.current = null;
  }, []);

  // Sync selectedItem với initialDate khi modal mở
  // Sử dụng ref để track previous isVisible để chỉ khởi tạo khi modal chuyển từ đóng sang mở
  const prevIsVisibleRef = React.useRef(undefined);
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
      const yearIndex = years.findIndex(year => year === validDate.getFullYear().toString());
      if (yearIndex >= 0) {
        // Set flag để prevent auto-adjust can thiệp
        isInitializingRef.current = true;
        setSelectedItem({
          month: monthIndex,
          year: yearIndex
        });
        lastInitializedRef.current = {
          month: monthIndex,
          year: yearIndex
        };
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
    let adjustedMonth = null;

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
      setSelectedItem(prev => ({
        ...prev,
        month: adjustedMonth
      }));
    }
  }, [selectedItem.month, selectedItem.year, years, minDate, maxDate, isVisible]);
  const NativePickerComponent = useMemo(() => getNativeInfinitePicker(), []);
  const renderWheelPickerByPlatform = useMemo(() => {
    if (Platform.OS === 'ios') {
      return /*#__PURE__*/_jsxs(View, {
        style: [styles.pickerContainer, !title && styles.borderTop, stylePickerContainer],
        children: [/*#__PURE__*/_jsx(View, {
          style: styles.pickerItem,
          children: /*#__PURE__*/_jsx(NativePickerComponent, {
            infiniteLoop: true,
            selectedIndex: selectedItem.month,
            style: [styles.pickerItemIos, stylePickerIosItem],
            items: wheelMonthData,
            onValueChange: event => onItemSelected(event.nativeEvent.index, 'month')
          })
        }), /*#__PURE__*/_jsx(View, {
          style: styles.pickerItem,
          children: /*#__PURE__*/_jsx(NativePickerComponent, {
            selectedIndex: selectedItem.year,
            style: [styles.pickerItemIos, stylePickerIosItem],
            items: years,
            onValueChange: event => onItemSelected(event.nativeEvent.index, 'year')
          })
        })]
      });
    } else {
      return /*#__PURE__*/_jsxs(View, {
        style: [styles.pickerContainer, !title && styles.borderTop, stylePickerContainer],
        children: [/*#__PURE__*/_jsx(View, {
          style: styles.pickerItem,
          children: /*#__PURE__*/_jsx(WheelPicker, {
            isCyclic: true,
            selectedItem: selectedItem.month,
            data: wheelMonthData,
            onItemSelected: index => onItemSelected(index, 'month'),
            indicatorColor: indicatorColor || '#000000'
          })
        }), /*#__PURE__*/_jsx(View, {
          style: styles.pickerItem,
          children: /*#__PURE__*/_jsx(WheelPicker, {
            selectedItem: selectedItem.year,
            data: years,
            onItemSelected: index => onItemSelected(index, 'year'),
            indicatorColor: indicatorColor || '#000000'
          })
        })]
      });
    }
  }, [NativePickerComponent, indicatorColor, onItemSelected, selectedItem.month, selectedItem.year, stylePickerContainer, stylePickerIosItem, title, wheelMonthData, years]);
  const renderHeader = useMemo(() => {
    if (customHeader) {
      return customHeader;
    }
    if (title) {
      return /*#__PURE__*/_jsx(View, {
        style: [styles.header, styles.borderTop],
        children: /*#__PURE__*/_jsx(CustomText, {
          variant: "h5",
          children: title
        })
      });
    }
    return null;
  }, [customHeader, title]);
  return /*#__PURE__*/_jsxs(ReactNativeModal, {
    backdropOpacity: 0.1,
    style: styles.modal,
    isVisible: isVisible,
    onModalHide: handleModalHide,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.container,
      children: [renderHeader, renderWheelPickerByPlatform, /*#__PURE__*/_jsx(Button, {
        textStyle: styleTextConfirm,
        title: textConfirm || 'Confirm',
        style: [styles.buttonConfirm, styleButtonConfirm],
        onPress: handleConfirm
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.footerContainerWithPadding,
      children: /*#__PURE__*/_jsx(Button, {
        textStyle: styleTextCancel,
        title: textCancel || 'Cancel',
        style: [styles.buttonCancel, styleButtonCancel],
        onPress: onCancel
      })
    })]
  });
};
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 8
  },
  pickerContainer: {
    backgroundColor: 'white',
    minHeight: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  pickerItem: {
    width: Platform.OS === 'ios' ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.25
  },
  pickerItemIos: {
    height: Dimensions.get('window').height * 0.2
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12
  },
  borderTop: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  },
  buttonConfirm: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
  buttonCancel: {
    marginTop: 12
  },
  footerContainer: {
    paddingHorizontal: 8,
    paddingBottom: 12
  },
  footerContainerWithPadding: {
    paddingHorizontal: 8,
    paddingBottom: 24
  }
});
export default WheelMonthYearPicker;
//# sourceMappingURL=WheelMonthYearPicker.js.map