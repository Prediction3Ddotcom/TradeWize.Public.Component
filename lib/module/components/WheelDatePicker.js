"use strict";

import DateTimePickerIOS from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, View } from 'react-native';
import DateTimePickerAndroid from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT } from "../utils/index.js";
import { CustomText } from "./text.js";
import { Button } from "./button.js";
import { useMemo, useState } from 'react';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
  customFooter
}) => {
  const insets = useSafeAreaInsets();
  const [formattedDate, setFormattedDate] = useState('');
  const handleDateChange = selectedDate => {
    // Format MM/DD/YYYY
    const formatted = `${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getDate().toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
    setFormattedDate(formatted);
  };
  const renderHeader = useMemo(() => {
    if (customHeader) {
      return customHeader;
    }
    return /*#__PURE__*/_jsx(_Fragment, {
      children: title && /*#__PURE__*/_jsx(CustomText, {
        variant: "h4",
        style: [styles.title, titleStyle],
        children: title
      })
    });
  }, [customHeader, title, titleStyle]);
  const renderFooter = useMemo(() => {
    if (customFooter) {
      return customFooter;
    }
    return /*#__PURE__*/_jsx(_Fragment, {
      children: helperText && /*#__PURE__*/_jsx(CustomText, {
        variant: "body",
        style: [styles.helperText, helperTextStyle],
        children: helperText
      })
    });
  }, [customFooter, helperText, helperTextStyle]);
  return /*#__PURE__*/_jsx(ReactNativeModal, {
    style: styles.modal,
    isVisible: isVisible,
    onBackdropPress: () => {},
    backdropOpacity: 0.2,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.container,
      children: [/*#__PURE__*/_jsx(View, {
        style: [styles.content, contentStyle],
        children: /*#__PURE__*/_jsxs(View, {
          style: styles.contentContainer,
          children: [renderHeader, Platform.OS === 'ios' ? /*#__PURE__*/_jsx(DateTimePickerIOS, {
            value: initialDate,
            maximumDate: maxDate,
            minimumDate: minDate,
            onChange: (_event, selectedDate) => {
              if (selectedDate) {
                handleDateChange(selectedDate);
              }
            },
            display: "spinner"
          }) : /*#__PURE__*/_jsx(DateTimePickerAndroid, {
            maximumDate: maxDate,
            minimumDate: minDate,
            mode: "date",
            date: initialDate,
            onDateChange: dateSelected => {
              if (dateSelected) {
                handleDateChange(dateSelected);
              }
            }
          }), renderFooter, /*#__PURE__*/_jsx(Button, {
            fullWidth: true,
            textStyle: confirmButtonTextStyle,
            style: [styles.confirmButton, confirmButtonStyle],
            title: confirmButtonText ?? 'Confirm',
            onPress: () => {
              if (confirmButtonOnPress) {
                confirmButtonOnPress(formattedDate);
              }
            }
          })]
        })
      }), /*#__PURE__*/_jsx(View, {
        style: [styles.footerContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12
        }],
        children: /*#__PURE__*/_jsx(Button, {
          fullWidth: true,
          textStyle: cancelButtonTextStyle,
          style: [styles.cancelButton, cancelButtonStyle],
          title: cancelButtonText ?? 'Cancel',
          onPress: cancelButtonOnPress
        })
      })]
    })
  });
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    flex: 1
  },
  content: {
    minHeight: SCREEN_HEIGHT * 0.2,
    paddingHorizontal: 8
  },
  modal: {
    margin: 0
  },
  title: {
    marginBottom: 8,
    color: 'black'
  },
  cancelButton: {
    alignSelf: 'center'
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 8
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16
  },
  confirmButton: {
    marginTop: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  helperText: {
    marginVertical: 8,
    color: 'gray',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    width: '100%'
  }
});
export default WheelDatePicker;
//# sourceMappingURL=WheelDatePicker.js.map