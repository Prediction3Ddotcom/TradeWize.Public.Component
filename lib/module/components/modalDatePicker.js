"use strict";

import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from "./button.js";
import { CustomText } from "./text.js";
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  initialDate = new Date()
}) => {
  const [date, setDate] = useState(initialDate);
  if (Platform.OS === 'ios') {
    return /*#__PURE__*/_jsx(DatePicker, {
      title: null,
      modal: true,
      open: openDatePicker,
      date: date,
      mode: "date",
      minimumDate: minDate,
      maximumDate: maxDate,
      onConfirm: datePicked => {
        setOpenDatePicker(false);
        setDate(datePicked);
        onChangeDate(datePicked);
      },
      onCancel: () => {
        setOpenDatePicker(false);
      }
    });
  }
  return /*#__PURE__*/_jsx(Modal, {
    isVisible: openDatePicker,
    onBackdropPress: () => setOpenDatePicker(false),
    style: styles.modalContainer,
    backdropOpacity: 0.2,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.container,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.content,
        children: [/*#__PURE__*/_jsx(CustomText, {
          style: styles.title,
          children: title ?? 'Chọn ngày'
        }), /*#__PURE__*/_jsx(DatePicker, {
          dividerColor: dividerColor,
          minimumDate: minDate,
          maximumDate: maxDate,
          mode: "date",
          date: date,
          onDateChange: setDate
        })]
      }), /*#__PURE__*/_jsx(Button, {
        size: "large",
        style: styles.buttonConfirm,
        onPress: () => {
          setOpenDatePicker(false);
          onChangeDate(date);
        },
        children: /*#__PURE__*/_jsx(CustomText, {
          style: styles.buttonConfirmText,
          children: confirmButtonText ?? 'Xác nhận'
        })
      }), /*#__PURE__*/_jsx(Button, {
        size: "large",
        style: styles.buttonCancel,
        onPress: () => setOpenDatePicker(false),
        children: /*#__PURE__*/_jsx(CustomText, {
          style: styles.buttonCancelText,
          children: cancelButtonText ?? 'Hủy'
        })
      })]
    })
  });
};
const styles = StyleSheet.create({
  modalContainer: {
    margin: 0
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
    paddingHorizontal: 8
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonConfirm: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  buttonCancel: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
    borderRadius: 12
  },
  buttonCancelText: {
    color: '#0A84FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  buttonConfirmText: {
    color: '#0A84FF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24
  }
});
export default DatePickerModal;
//# sourceMappingURL=modalDatePicker.js.map