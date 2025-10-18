"use strict";

import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Pressable, FlatList, TouchableOpacity, TextInput, StatusBar, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { CustomText } from "./text.js";
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "./button.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const {
  height: SCREEN_HEIGHT
} = Dimensions.get('window');
export function SelectBox({
  // Basic Props
  label,
  placeholder = 'Chọn...',
  helperText,
  errorText,
  options = [],
  value,
  onChange,
  multiple = false,
  searchable = true,
  leftIcon,
  rightIcon,
  variant = 'outline',
  size = 'medium',
  isDisabled = false,
  isError = false,
  isRequired = false,
  fullWidth = true,
  // Style Props - Main Container
  containerStyle,
  inputStyle,
  labelStyle,
  inputContainerStyle,
  helperTextStyle,
  errorTextStyle,
  // Style Props - Modal
  modalStyle,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalFooterStyle,
  modalTitleStyle,
  // Style Props - Search
  searchContainerStyle,
  searchInputStyle,
  // Style Props - Options
  optionStyle,
  optionLabelStyle,
  optionDescriptionStyle,
  selectedOptionStyle,
  disabledOptionStyle,
  checkboxStyle: customCheckboxStyle,
  checkmarkStyle: customCheckmarkStyle,
  // Style Props - Icons & Buttons
  leftIconContainerStyle,
  rightIconContainerStyle,
  chevronIconStyle: customChevronIconStyle,
  clearButtonStyle,
  clearButtonTextStyle: customClearButtonTextStyle,
  closeButtonStyle,
  closeButtonTextStyle,
  // Color Props
  borderColorActive = '#007AFF',
  borderColorError = '#FF3B30',
  borderColor = '#C7C7CC',
  backgroundColor,
  textColor,
  placeholderColor,
  modalBackgroundColor,
  selectedBackgroundColor,
  checkboxSelectedColor,
  checkboxUnselectedColor,
  // Behavior Props
  maxHeight = SCREEN_HEIGHT * 0.6,
  emptyMessage = 'Không có dữ liệu',
  searchPlaceholder = 'Tìm kiếm...',
  closeOnSelect = true,
  modalPosition = 'center',
  animationInTiming = 300,
  animationOutTiming = 300,
  backdropOpacity = 0.5,
  showClearButton = true,
  showCheckmark = true,
  // Text Props
  modalTitle,
  confirmButtonText = 'Xong',
  cancelButtonText = 'Xóa',
  // Button Style Props
  confirmButtonStyle,
  confirmButtonTextStyle,
  cancelButtonStyle,
  cancelButtonTextStyle,
  // Render Props
  renderOption,
  renderLabel,
  renderDisplayText,
  renderModalHeader,
  renderModalFooter,
  renderEmptyState,
  renderSearchInput,
  renderLeftIcon,
  renderRightIcon,
  renderChevron,
  renderClearButton,
  // Callback Props
  onOpen,
  onClose,
  onSearch,
  onClear,
  onSelectOption,
  onDeselectOption,
  onFocus,
  onBlur,
  // Advanced Props
  filterOptions,
  sortOptions,
  getOptionLabel,
  getOptionValue,
  isOptionDisabled: customIsOptionDisabled,
  isOptionSelected: customIsOptionSelected,
  // Accessibility Props
  accessibilityLabel,
  accessibilityHint,
  testID,
  modalTestID,
  optionTestID
}) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const hasError = isError || !!errorText;

  // Safely handle value - apply data safety best practices
  const selectedValues = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Filter options based on search query with safe access and custom filter
  const filteredOptions = useMemo(() => {
    let filtered = options ?? [];

    // Apply custom filter or default filter
    if (searchQuery?.trim()) {
      if (filterOptions) {
        filtered = filterOptions(filtered, searchQuery);
      } else {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(option => {
          const optionLabel = option?.label?.toLowerCase() ?? '';
          const description = option?.description?.toLowerCase() ?? '';
          return optionLabel.includes(query) || description.includes(query);
        });
      }
    }

    // Apply custom sort
    if (sortOptions) {
      filtered = sortOptions(filtered);
    }
    return filtered;
  }, [options, searchQuery, filterOptions, sortOptions]);

  // Get display text with safe access and custom getOptionLabel
  const displayText = useMemo(() => {
    if (!selectedValues?.length) return placeholder;
    const selectedOptions = (options ?? []).filter(option => selectedValues.includes(getOptionValue ? getOptionValue(option) : option?.value));
    if (!selectedOptions?.length) return placeholder;
    return selectedOptions.map(option => getOptionLabel ? getOptionLabel(option) : option?.label ?? '').join(', ');
  }, [selectedValues, options, placeholder, getOptionLabel, getOptionValue]);

  // Computed dynamic styles with custom color support
  const dynamicStyles = useMemo(() => {
    return {
      modalBackgroundColor: modalBackgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      searchInputBackgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
      searchInputColor: textColor ?? (isDark ? '#FFFFFF' : '#000000'),
      searchInputPlaceholder: placeholderColor ?? (isDark ? '#8E8E93' : '#C7C7CC'),
      optionSelectedBackground: selectedBackgroundColor ?? (isDark ? '#2C2C2E' : '#F2F2F7'),
      checkboxBorderColorUnselected: checkboxUnselectedColor ?? (isDark ? '#3A3A3C' : '#C7C7CC'),
      displayTextPlaceholderColor: placeholderColor ?? (isDark ? '#8E8E93' : '#C7C7CC'),
      checkboxSelectedColor: checkboxSelectedColor ?? borderColorActive,
      backgroundColor: backgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      textColor: textColor ?? (isDark ? '#FFFFFF' : '#000000')
    };
  }, [isDark, modalBackgroundColor, textColor, placeholderColor, selectedBackgroundColor, checkboxUnselectedColor, checkboxSelectedColor, borderColorActive, backgroundColor]);
  const getIconSize = useCallback(() => {
    const sizes = {
      small: 16,
      medium: 20,
      large: 24
    };
    return sizes[size];
  }, [size]);
  const getIconColor = useCallback(() => {
    if (hasError) return borderColorError;
    if (isFocused) return borderColorActive;
    return isDark ? '#8E8E93' : '#6D6D70';
  }, [hasError, isFocused, isDark, borderColorError, borderColorActive]);
  const chevronIconStyle = useMemo(() => ({
    fontSize: getIconSize(),
    color: getIconColor()
  }), [getIconSize, getIconColor]);
  const clearButtonTextStyle = useMemo(() => ({
    fontSize: getIconSize(),
    color: getIconColor()
  }), [getIconSize, getIconColor]);
  const getModalContentStyle = useCallback(() => ({
    backgroundColor: dynamicStyles.modalBackgroundColor,
    maxHeight
  }), [dynamicStyles.modalBackgroundColor, maxHeight]);
  const getSearchInputBackgroundStyle = useCallback(() => ({
    backgroundColor: dynamicStyles.searchInputBackgroundColor
  }), [dynamicStyles.searchInputBackgroundColor]);
  const getSearchInputTextStyle = useCallback(() => ({
    color: dynamicStyles.searchInputColor
  }), [dynamicStyles.searchInputColor]);
  const getOptionItemStyle = useCallback(isSelected => ({
    backgroundColor: isSelected ? dynamicStyles.optionSelectedBackground : 'transparent'
  }), [dynamicStyles.optionSelectedBackground]);
  const getCheckboxStyle = useCallback(isSelected => ({
    borderColor: isSelected ? borderColorActive : dynamicStyles.checkboxBorderColorUnselected,
    backgroundColor: isSelected ? borderColorActive : 'transparent'
  }), [borderColorActive, dynamicStyles.checkboxBorderColorUnselected]);
  const getFooterButtonPrimaryStyle = useCallback(() => ({
    backgroundColor: borderColorActive
  }), [borderColorActive]);
  const getDisplayTextStyle = useCallback(() => {
    if (!selectedValues?.length) {
      return {
        color: dynamicStyles.displayTextPlaceholderColor
      };
    }
    return {};
  }, [selectedValues, dynamicStyles.displayTextPlaceholderColor]);
  const getSelectedCheckmarkStyle = useCallback(() => ({
    color: borderColorActive
  }), [borderColorActive]);
  const handleOpenModal = () => {
    if (!isDisabled) {
      setIsModalVisible(true);
      setIsFocused(true);
      onOpen?.();
      onFocus?.();
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsFocused(false);
    setSearchQuery('');
    onClose?.();
    onBlur?.();
  };
  const handleSelectOption = (selectedValue, option) => {
    if (!onChange) return;
    if (multiple) {
      const isCurrentlySelected = selectedValues.includes(selectedValue);
      if (isCurrentlySelected) {
        onDeselectOption?.(option);
        const newValues = selectedValues.filter(v => v !== selectedValue);
        onChange(newValues);
      } else {
        onSelectOption?.(option);
        const newValues = [...selectedValues, selectedValue];
        onChange(newValues);
      }
      if (closeOnSelect && !isCurrentlySelected) {
        // Don't close if deselecting
      }
    } else {
      onSelectOption?.(option);
      onChange(selectedValue);
      if (closeOnSelect) {
        handleCloseModal();
      }
    }
  };
  const handleClearSelection = () => {
    onChange?.(multiple ? [] : '');
    onClear?.();
  };
  const handleSearchChange = text => {
    setSearchQuery(text);
    onSearch?.(text);
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
      children: /*#__PURE__*/_jsx(CustomText, {
        style: [chevronIconStyle, customChevronIconStyle],
        children: "\u25BC"
      })
    });
  };
  const renderModalContent = () => {
    const isBottomModal = modalPosition === 'bottom';
    return /*#__PURE__*/_jsx(Modal, {
      style: [styles.modal, modalStyle],
      isVisible: isModalVisible,
      animationIn: isBottomModal ? 'slideInUp' : 'fadeIn',
      animationOut: isBottomModal ? 'slideOutDown' : 'fadeOut',
      animationInTiming: animationInTiming,
      animationOutTiming: animationOutTiming,
      backdropOpacity: backdropOpacity,
      onBackdropPress: handleCloseModal,
      useNativeDriver: true,
      statusBarTranslucent: true,
      testID: modalTestID,
      children: /*#__PURE__*/_jsxs(Pressable, {
        style: [styles.modalOverlay, isBottomModal && styles.modalOverlayBottom, modalOverlayStyle],
        onPress: handleCloseModal,
        children: [/*#__PURE__*/_jsx(StatusBar, {
          backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
          barStyle: isDark ? 'light-content' : 'light-content'
        }), /*#__PURE__*/_jsx(View, {
          style: [styles.modalSafeArea, isBottomModal && styles.modalSafeAreaBottom, {
            paddingBottom: insets.bottom
          }],
          children: /*#__PURE__*/_jsxs(Pressable, {
            style: [styles.modalContent, isBottomModal && styles.modalContentBottom, getModalContentStyle(), modalContentStyle],
            onPress: e => e.stopPropagation(),
            children: [renderModalHeader ? renderModalHeader(modalTitle ?? label ?? 'Chọn', handleCloseModal) : /*#__PURE__*/_jsxs(View, {
              style: [styles.modalHeader, modalHeaderStyle],
              children: [/*#__PURE__*/_jsx(CustomText, {
                variant: "h6",
                color: "primary",
                style: modalTitleStyle,
                children: modalTitle ?? label ?? 'Chọn'
              }), /*#__PURE__*/_jsx(TouchableOpacity, {
                onPress: handleCloseModal,
                style: [styles.closeButton, closeButtonStyle],
                children: /*#__PURE__*/_jsx(CustomText, {
                  style: [styles.closeButtonText, closeButtonTextStyle],
                  children: "\xD7"
                })
              })]
            }), searchable && (renderSearchInput ? renderSearchInput(searchQuery, handleSearchChange) : /*#__PURE__*/_jsx(View, {
              style: [styles.searchContainer, searchContainerStyle],
              children: /*#__PURE__*/_jsx(TextInput, {
                style: [styles.searchInput, getSearchInputBackgroundStyle(), getSearchInputTextStyle(), searchInputStyle],
                placeholder: searchPlaceholder,
                placeholderTextColor: dynamicStyles.searchInputPlaceholder,
                value: searchQuery,
                onChangeText: handleSearchChange,
                autoCorrect: false,
                autoCapitalize: "none"
              })
            })), /*#__PURE__*/_jsx(FlatList, {
              data: filteredOptions,
              keyExtractor: (item, index) => `${item?.value ?? index}`,
              renderItem: ({
                item,
                index
              }) => {
                if (!item) return null;
                const optionValue = getOptionValue ? getOptionValue(item) : item.value;
                const isSelected = customIsOptionSelected ? customIsOptionSelected(item, value) : selectedValues.includes(optionValue);
                const isOptionDisabled = customIsOptionDisabled ? customIsOptionDisabled(item) : item.disabled ?? false;
                if (renderOption) {
                  return /*#__PURE__*/_jsx(TouchableOpacity, {
                    onPress: () => !isOptionDisabled && handleSelectOption(optionValue, item),
                    disabled: isOptionDisabled,
                    testID: optionTestID,
                    children: renderOption(item, isSelected)
                  });
                }
                return /*#__PURE__*/_jsxs(Button, {
                  variant: "ghost",
                  style: [styles.optionItem, filteredOptions?.length !== index + 1 && styles.borderBottom, getOptionItemStyle(isSelected), isSelected && selectedOptionStyle, isOptionDisabled && styles.optionDisabled, isOptionDisabled && disabledOptionStyle, optionStyle],
                  onPress: () => !isOptionDisabled && handleSelectOption(optionValue, item),
                  disabled: isOptionDisabled,
                  testID: optionTestID,
                  children: [item.icon && /*#__PURE__*/_jsx(View, {
                    style: styles.optionIcon,
                    children: item.icon
                  }), /*#__PURE__*/_jsxs(View, {
                    style: styles.optionTextContainer,
                    children: [/*#__PURE__*/_jsx(CustomText, {
                      variant: "body",
                      color: isOptionDisabled ? 'tertiary' : 'primary',
                      style: [styles.optionLabel, optionLabelStyle],
                      children: getOptionLabel ? getOptionLabel(item) : item.label ?? ''
                    }), item.description && /*#__PURE__*/_jsx(CustomText, {
                      variant: "caption",
                      color: "secondary",
                      style: [styles.optionDescription, optionDescriptionStyle],
                      children: item.description
                    })]
                  }), multiple && showCheckmark && /*#__PURE__*/_jsx(View, {
                    style: [styles.checkbox, getCheckboxStyle(isSelected), customCheckboxStyle],
                    children: isSelected && /*#__PURE__*/_jsx(CustomText, {
                      style: [styles.checkmark, customCheckmarkStyle],
                      children: "\u2713"
                    })
                  }), !multiple && isSelected && showCheckmark && /*#__PURE__*/_jsx(CustomText, {
                    style: [styles.selectedCheckmark, getSelectedCheckmarkStyle()],
                    children: "\u2713"
                  })]
                });
              },
              ListEmptyComponent: /*#__PURE__*/_jsx(_Fragment, {
                children: renderEmptyState ? renderEmptyState(emptyMessage) : /*#__PURE__*/_jsx(View, {
                  style: styles.emptyContainer,
                  children: /*#__PURE__*/_jsx(CustomText, {
                    variant: "body",
                    color: "secondary",
                    align: "center",
                    children: emptyMessage
                  })
                })
              }),
              style: styles.optionsList,
              showsVerticalScrollIndicator: true
            }), multiple && (renderModalFooter ? renderModalFooter(handleCloseModal, handleClearSelection, selectedValues.length) : /*#__PURE__*/_jsxs(View, {
              style: [styles.modalFooter, modalFooterStyle],
              children: [/*#__PURE__*/_jsx(TouchableOpacity, {
                style: [styles.footerButton, cancelButtonStyle],
                onPress: handleClearSelection,
                children: /*#__PURE__*/_jsx(CustomText, {
                  variant: "button",
                  color: "secondary",
                  style: cancelButtonTextStyle,
                  children: cancelButtonText
                })
              }), /*#__PURE__*/_jsx(TouchableOpacity, {
                style: [styles.footerButtonPrimary, getFooterButtonPrimaryStyle(), confirmButtonStyle],
                onPress: handleCloseModal,
                children: /*#__PURE__*/_jsx(CustomText, {
                  variant: "button",
                  color: "inverse",
                  style: confirmButtonTextStyle,
                  children: confirmButtonText
                })
              })]
            }))]
          })
        })]
      })
    });
  };

  // Get selected options for render props
  const selectedOptions = useMemo(() => {
    return (options ?? []).filter(option => selectedValues.includes(getOptionValue ? getOptionValue(option) : option?.value));
  }, [selectedValues, options, getOptionValue]);
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
        children: renderDisplayText(displayText, selectedOptions)
      }) : /*#__PURE__*/_jsx(CustomText, {
        style: [getInputStyles(), inputStyle, getDisplayTextStyle()],
        numberOfLines: 1,
        children: displayText
      }), selectedValues?.length > 0 && !isDisabled && showClearButton && (renderClearButton ? renderClearButton(handleClearSelection) : /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: e => {
          e.stopPropagation();
          handleClearSelection();
        },
        style: [styles.clearButton, clearButtonStyle],
        children: /*#__PURE__*/_jsx(CustomText, {
          style: [styles.clearButtonText, clearButtonTextStyle, customClearButtonTextStyle],
          children: "\xD7"
        })
      })), rightIcon ? renderRightIcon ? /*#__PURE__*/_jsx(View, {
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
  clearButton: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24
  },
  clearButtonText: {
    fontWeight: '400'
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA'
  },
  closeButton: {
    padding: 4
  },
  closeButtonText: {
    fontSize: 24
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16
  },
  optionsList: {
    maxHeight: 400
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#E5E5EA'
  },
  optionDisabled: {
    opacity: 0.4
  },
  optionIcon: {
    marginRight: 12
  },
  optionTextContainer: {
    flex: 1
  },
  optionLabel: {
    marginBottom: 0
  },
  optionDescription: {
    marginTop: 2
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  selectedCheckmark: {
    fontSize: 20
  },
  emptyContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA'
  },
  footerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  footerButtonPrimary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  }
});
//# sourceMappingURL=SelectBox.js.map