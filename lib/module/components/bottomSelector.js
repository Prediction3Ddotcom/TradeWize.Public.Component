"use strict";

import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import { CustomText } from "./text.js";
import { Input } from "./input.js";
import { ShadowedView } from 'react-native-fast-shadow';
import { SCREEN_HEIGHT } from "../utils/index.js";
import { Button } from "./button.js";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_MAX_HEIGHT = SCREEN_HEIGHT * 0.7;
export function BottomSelector({
  isVisible,
  onClose,
  options = [],
  onSelect,
  title,
  selectedValue,
  showSelectedIcon = true,
  containerStyle,
  optionStyle,
  titleStyle,
  optionTextStyle,
  selectedOptionStyle,
  disabledOptionStyle,
  cancelText = 'Hủy',
  showCancelButton = true,
  emptyText = 'Không có tùy chọn nào',
  initialNumToRender = 10,
  enableSearch = false,
  searchPlaceholder = 'Tìm kiếm...',
  searchInputStyle,
  buttonCancelStyle,
  buttonCancelTextStyle,
  onSearchChange,
  ...modalProps
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const insets = useSafeAreaInsets();
  const handleSelect = option => {
    if (option.disabled) return;
    onSelect?.(option);
    setSearchText(''); // Reset search when option is selected
    onClose?.();
  };
  const handleClose = () => {
    setSearchText(''); // Reset search when modal closes
    onClose?.();
  };
  const isSelected = option => {
    if (selectedValue === undefined || selectedValue === null) return false;
    return option.value === selectedValue;
  };

  // Filter options based on search text
  const filteredOptions = useMemo(() => {
    if (!enableSearch || !searchText.trim()) {
      return options;
    }
    const searchLower = searchText.toLowerCase().trim();
    return options.filter(option => option.label.toLowerCase().includes(searchLower));
  }, [options, searchText, enableSearch]);
  const handleSearchChange = text => {
    setSearchText(text);
    onSearchChange?.(text);
  };
  const renderOption = ({
    item: option
  }) => {
    const selected = isSelected(option);
    const disabled = option.disabled ?? false;
    return /*#__PURE__*/_jsxs(TouchableOpacity, {
      style: [styles.option, isDark ? styles.optionDark : styles.optionLight, selected && styles.selectedOption, selected && selectedOptionStyle, disabled && styles.disabledOption, disabled && disabledOptionStyle, optionStyle],
      onPress: () => handleSelect(option),
      disabled: disabled,
      activeOpacity: 0.7,
      children: [option.icon ? /*#__PURE__*/_jsx(View, {
        style: styles.iconContainer,
        children: option.icon
      }) : null, /*#__PURE__*/_jsx(CustomText, {
        style: [styles.optionText, isDark ? styles.optionTextDark : styles.optionTextLight, selected && styles.selectedOptionText, disabled && styles.disabledOptionText, optionTextStyle],
        numberOfLines: 1,
        children: option.label
      }), showSelectedIcon && selected ? /*#__PURE__*/_jsx(View, {
        style: styles.checkmark,
        children: /*#__PURE__*/_jsx(CustomText, {
          style: styles.checkmarkText,
          children: "\u2713"
        })
      }) : null]
    });
  };
  const keyExtractor = (item, index) => `${item.value}-${index}`;
  return /*#__PURE__*/_jsx(Modal, {
    isVisible: isVisible,
    onBackdropPress: handleClose,
    onSwipeComplete: handleClose,
    avoidKeyboard: true,
    propagateSwipe: true,
    style: styles.modal,
    backdropOpacity: 0,
    animationInTiming: 400,
    animationOutTiming: 400,
    useNativeDriver: true,
    hideModalContentWhileAnimating: true,
    ...modalProps,
    children: /*#__PURE__*/_jsx(View, {
      style: styles.backdrop,
      children: /*#__PURE__*/_jsxs(ShadowedView, {
        style: [styles.container, isDark ? styles.containerDark : styles.containerLight, containerStyle],
        children: [/*#__PURE__*/_jsx(View, {
          style: styles.swipeIndicatorContainer,
          children: /*#__PURE__*/_jsx(View, {
            style: [styles.swipeIndicator, isDark ? styles.swipeIndicatorDark : styles.swipeIndicatorLight]
          })
        }), title ? /*#__PURE__*/_jsx(View, {
          style: styles.titleContainer,
          children: /*#__PURE__*/_jsx(CustomText, {
            style: [styles.title, isDark ? styles.titleDark : styles.titleLight, titleStyle],
            children: title
          })
        }) : null, enableSearch ? /*#__PURE__*/_jsx(Input, {
          value: searchText,
          onChangeText: handleSearchChange,
          placeholder: searchPlaceholder,
          clearButtonMode: "while-editing",
          autoCorrect: false,
          inputStyle: styles.searchInput,
          inputContainerStyle: styles.searchInputContainer,
          containerStyle: [styles.searchContainer, searchInputStyle],
          onFocus: () => {
            setIsSearchFocused(true);
          },
          onBlur: () => {
            setIsSearchFocused(false);
          }
        }) : null, /*#__PURE__*/_jsx(FlatList, {
          keyboardDismissMode: "none",
          data: filteredOptions,
          renderItem: renderOption,
          keyExtractor: keyExtractor,
          style: [styles.optionsList, {
            minHeight: DEFAULT_MAX_HEIGHT / 2 + 25,
            maxHeight: DEFAULT_MAX_HEIGHT + 25
          }],
          contentContainerStyle: styles.optionsListContent,
          bounces: false,
          keyboardShouldPersistTaps: "handled",
          initialNumToRender: initialNumToRender,
          maxToRenderPerBatch: 10,
          windowSize: 5,
          removeClippedSubviews: true,
          getItemLayout: (_, index) => ({
            length: 64,
            offset: 64 * index,
            index
          }),
          ListEmptyComponent: /*#__PURE__*/_jsx(View, {
            style: styles.emptyContainer,
            children: /*#__PURE__*/_jsx(CustomText, {
              style: [styles.emptyText, isDark ? styles.emptyTextDark : styles.emptyTextLight],
              children: emptyText
            })
          })
        }), showCancelButton ? /*#__PURE__*/_jsx(Button, {
          size: "large",
          style: [styles.cancelButton, isDark ? styles.cancelButtonDark : styles.cancelButtonLight, !isSearchFocused && {
            marginBottom: insets.bottom
          }, buttonCancelStyle],
          onPress: handleClose,
          activeOpacity: 0.7,
          children: /*#__PURE__*/_jsx(CustomText, {
            style: [styles.cancelButtonText, isDark ? styles.cancelButtonTextDark : styles.cancelButtonTextLight, buttonCancelTextStyle],
            children: cancelText
          })
        }) : null]
      })
    })
  });
}
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: {
      width: 5,
      height: 3
    }
  },
  containerLight: {
    backgroundColor: '#FFFFFF'
  },
  containerDark: {
    backgroundColor: '#1C1C1E'
  },
  swipeIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 12
  },
  swipeIndicator: {
    width: 36,
    height: 5,
    borderRadius: 3
  },
  swipeIndicatorLight: {
    backgroundColor: '#C7C7CC'
  },
  swipeIndicatorDark: {
    backgroundColor: '#48484A'
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  titleLight: {
    color: '#000000'
  },
  titleDark: {
    color: '#FFFFFF'
  },
  searchContainer: {
    paddingHorizontal: 16
  },
  searchInputContainer: {
    paddingVertical: 0
  },
  searchInput: {
    marginBottom: 0,
    lineHeight: 16,
    fontSize: 14,
    height: '95%'
  },
  optionsList: {
    paddingHorizontal: 16
  },
  optionsListContent: {
    paddingVertical: 4
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center'
  },
  emptyTextLight: {
    color: '#8E8E93'
  },
  emptyTextDark: {
    color: '#636366'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4
  },
  optionLight: {
    backgroundColor: '#F2F2F7'
  },
  optionDark: {
    backgroundColor: '#2C2C2E'
  },
  selectedOption: {
    backgroundColor: '#007AFF20'
  },
  disabledOption: {
    opacity: 0.4
  },
  iconContainer: {
    marginRight: 12
  },
  optionText: {
    fontSize: 16,
    flex: 1
  },
  optionTextLight: {
    color: '#000000'
  },
  optionTextDark: {
    color: '#FFFFFF'
  },
  selectedOptionText: {
    fontWeight: '600',
    color: '#007AFF'
  },
  disabledOptionText: {
    color: '#8E8E93'
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cancelButton: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  cancelButtonLight: {
    backgroundColor: '#F2F2F7'
  },
  cancelButtonDark: {
    backgroundColor: '#2C2C2E'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  cancelButtonTextLight: {
    color: '#007AFF'
  },
  cancelButtonTextDark: {
    color: '#0A84FF'
  }
});
//# sourceMappingURL=bottomSelector.js.map