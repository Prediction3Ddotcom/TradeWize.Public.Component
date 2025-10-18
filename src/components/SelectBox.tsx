import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  type ViewStyle,
  type TextStyle,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useColorScheme } from 'react-native';
import type { ReactNode } from 'react';
import { CustomText } from './text';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './button';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}

export interface SelectBoxProps {
  // Basic Props
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  options: SelectOption[];
  value?: string | number | Array<string | number>;
  onChange?: (value: string | number | Array<string | number>) => void;
  multiple?: boolean;
  searchable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'outline' | 'filled' | 'underline';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  fullWidth?: boolean;

  // Style Props - Main Container
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  helperTextStyle?: TextStyle;
  errorTextStyle?: TextStyle;

  // Style Props - Modal
  modalStyle?: ViewStyle;
  modalOverlayStyle?: ViewStyle;
  modalContentStyle?: ViewStyle;
  modalHeaderStyle?: ViewStyle;
  modalFooterStyle?: ViewStyle;
  modalTitleStyle?: TextStyle;

  // Style Props - Search
  searchContainerStyle?: ViewStyle;
  searchInputStyle?: TextStyle;

  // Style Props - Options
  optionStyle?: ViewStyle;
  optionLabelStyle?: TextStyle;
  optionDescriptionStyle?: TextStyle;
  selectedOptionStyle?: ViewStyle;
  disabledOptionStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  checkmarkStyle?: TextStyle;

  // Style Props - Icons & Buttons
  leftIconContainerStyle?: ViewStyle;
  rightIconContainerStyle?: ViewStyle;
  chevronIconStyle?: TextStyle;
  clearButtonStyle?: ViewStyle;
  clearButtonTextStyle?: TextStyle;
  closeButtonStyle?: ViewStyle;
  closeButtonTextStyle?: TextStyle;

  // Color Props
  borderColorActive?: string;
  borderColorError?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  modalBackgroundColor?: string;
  selectedBackgroundColor?: string;
  checkboxSelectedColor?: string;
  checkboxUnselectedColor?: string;

  // Behavior Props
  maxHeight?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  closeOnSelect?: boolean;
  modalPosition?: 'center' | 'bottom';
  animationInTiming?: number;
  animationOutTiming?: number;
  backdropOpacity?: number;
  showClearButton?: boolean;
  showCheckmark?: boolean;

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
  renderOption?: (option: SelectOption, isSelected: boolean) => ReactNode;
  renderLabel?: (label: string, isRequired: boolean) => ReactNode;
  renderDisplayText?: (
    displayText: string,
    selectedOptions: SelectOption[]
  ) => ReactNode;
  renderModalHeader?: (title: string, onClose: () => void) => ReactNode;
  renderModalFooter?: (
    onConfirm: () => void,
    onClear: () => void,
    selectedCount: number
  ) => ReactNode;
  renderEmptyState?: (emptyMessage: string) => ReactNode;
  renderSearchInput?: (
    searchQuery: string,
    onChangeText: (text: string) => void
  ) => ReactNode;
  renderLeftIcon?: (size: number, color: string) => ReactNode;
  renderRightIcon?: (size: number, color: string) => ReactNode;
  renderChevron?: (isOpen: boolean) => ReactNode;
  renderClearButton?: (onClear: () => void) => ReactNode;

  // Callback Props
  onOpen?: () => void;
  onClose?: () => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  onSelectOption?: (option: SelectOption) => void;
  onDeselectOption?: (option: SelectOption) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  // Advanced Props
  filterOptions?: (
    options: SelectOption[],
    searchQuery: string
  ) => SelectOption[];
  sortOptions?: (options: SelectOption[]) => SelectOption[];
  getOptionLabel?: (option: SelectOption) => string;
  getOptionValue?: (option: SelectOption) => string | number;
  isOptionDisabled?: (option: SelectOption) => boolean;
  isOptionSelected?: (
    option: SelectOption,
    value?: string | number | Array<string | number>
  ) => boolean;

  // Accessibility Props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  modalTestID?: string;
  optionTestID?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  optionTestID,
}: SelectBoxProps) {
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
        filtered = filtered.filter((option) => {
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

    const selectedOptions = (options ?? []).filter((option) =>
      selectedValues.includes(
        getOptionValue ? getOptionValue(option) : option?.value
      )
    );

    if (!selectedOptions?.length) return placeholder;

    return selectedOptions
      .map((option) =>
        getOptionLabel ? getOptionLabel(option) : (option?.label ?? '')
      )
      .join(', ');
  }, [selectedValues, options, placeholder, getOptionLabel, getOptionValue]);

  // Computed dynamic styles with custom color support
  const dynamicStyles = useMemo(() => {
    return {
      modalBackgroundColor:
        modalBackgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      searchInputBackgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
      searchInputColor: textColor ?? (isDark ? '#FFFFFF' : '#000000'),
      searchInputPlaceholder:
        placeholderColor ?? (isDark ? '#8E8E93' : '#C7C7CC'),
      optionSelectedBackground:
        selectedBackgroundColor ?? (isDark ? '#2C2C2E' : '#F2F2F7'),
      checkboxBorderColorUnselected:
        checkboxUnselectedColor ?? (isDark ? '#3A3A3C' : '#C7C7CC'),
      displayTextPlaceholderColor:
        placeholderColor ?? (isDark ? '#8E8E93' : '#C7C7CC'),
      checkboxSelectedColor: checkboxSelectedColor ?? borderColorActive,
      backgroundColor: backgroundColor ?? (isDark ? '#1C1C1E' : '#FFFFFF'),
      textColor: textColor ?? (isDark ? '#FFFFFF' : '#000000'),
    };
  }, [
    isDark,
    modalBackgroundColor,
    textColor,
    placeholderColor,
    selectedBackgroundColor,
    checkboxUnselectedColor,
    checkboxSelectedColor,
    borderColorActive,
    backgroundColor,
  ]);

  const getIconSize = useCallback((): number => {
    const sizes = {
      small: 16,
      medium: 20,
      large: 24,
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
      fontSize: getIconSize(),
      color: getIconColor(),
    }),
    [getIconSize, getIconColor]
  );

  const clearButtonTextStyle = useMemo(
    () => ({
      fontSize: getIconSize(),
      color: getIconColor(),
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

  const getSearchInputBackgroundStyle = useCallback(
    (): ViewStyle => ({
      backgroundColor: dynamicStyles.searchInputBackgroundColor,
    }),
    [dynamicStyles.searchInputBackgroundColor]
  );

  const getSearchInputTextStyle = useCallback(
    (): TextStyle => ({
      color: dynamicStyles.searchInputColor,
    }),
    [dynamicStyles.searchInputColor]
  );

  const getOptionItemStyle = useCallback(
    (isSelected: boolean): ViewStyle => ({
      backgroundColor: isSelected
        ? dynamicStyles.optionSelectedBackground
        : 'transparent',
    }),
    [dynamicStyles.optionSelectedBackground]
  );

  const getCheckboxStyle = useCallback(
    (isSelected: boolean): ViewStyle => ({
      borderColor: isSelected
        ? borderColorActive
        : dynamicStyles.checkboxBorderColorUnselected,
      backgroundColor: isSelected ? borderColorActive : 'transparent',
    }),
    [borderColorActive, dynamicStyles.checkboxBorderColorUnselected]
  );

  const getFooterButtonPrimaryStyle = useCallback(
    (): ViewStyle => ({
      backgroundColor: borderColorActive,
    }),
    [borderColorActive]
  );

  const getDisplayTextStyle = useCallback((): TextStyle => {
    if (!selectedValues?.length) {
      return {
        color: dynamicStyles.displayTextPlaceholderColor,
      };
    }
    return {};
  }, [selectedValues, dynamicStyles.displayTextPlaceholderColor]);

  const getSelectedCheckmarkStyle = useCallback(
    (): TextStyle => ({
      color: borderColorActive,
    }),
    [borderColorActive]
  );

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

  const handleSelectOption = (
    selectedValue: string | number,
    option: SelectOption
  ) => {
    if (!onChange) return;

    if (multiple) {
      const isCurrentlySelected = selectedValues.includes(selectedValue);

      if (isCurrentlySelected) {
        onDeselectOption?.(option);
        const newValues = selectedValues.filter((v) => v !== selectedValue);
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

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
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
        <CustomText style={[chevronIconStyle, customChevronIconStyle]}>
          ▼
        </CustomText>
      </View>
    );
  };

  const renderModalContent = () => {
    const isBottomModal = modalPosition === 'bottom';

    return (
      <Modal
        style={[styles.modal, modalStyle]}
        isVisible={isModalVisible}
        animationIn={isBottomModal ? 'slideInUp' : 'fadeIn'}
        animationOut={isBottomModal ? 'slideOutDown' : 'fadeOut'}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        backdropOpacity={backdropOpacity}
        onBackdropPress={handleCloseModal}
        useNativeDriver
        statusBarTranslucent
        testID={modalTestID}
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
              { paddingBottom: insets.bottom },
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
                  modalTitle ?? label ?? 'Chọn',
                  handleCloseModal
                )
              ) : (
                <View style={[styles.modalHeader, modalHeaderStyle]}>
                  <CustomText
                    variant="h6"
                    color="primary"
                    style={modalTitleStyle}
                  >
                    {modalTitle ?? label ?? 'Chọn'}
                  </CustomText>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={[styles.closeButton, closeButtonStyle]}
                  >
                    <CustomText
                      style={[styles.closeButtonText, closeButtonTextStyle]}
                    >
                      ×
                    </CustomText>
                  </TouchableOpacity>
                </View>
              )}

              {/* Search Input */}
              {searchable &&
                (renderSearchInput ? (
                  renderSearchInput(searchQuery, handleSearchChange)
                ) : (
                  <View style={[styles.searchContainer, searchContainerStyle]}>
                    <TextInput
                      style={[
                        styles.searchInput,
                        getSearchInputBackgroundStyle(),
                        getSearchInputTextStyle(),
                        searchInputStyle,
                      ]}
                      placeholder={searchPlaceholder}
                      placeholderTextColor={
                        dynamicStyles.searchInputPlaceholder
                      }
                      value={searchQuery}
                      onChangeText={handleSearchChange}
                      autoCorrect={false}
                      autoCapitalize="none"
                    />
                  </View>
                ))}

              {/* Options List */}
              <FlatList
                data={filteredOptions}
                keyExtractor={(item, index) => `${item?.value ?? index}`}
                renderItem={({ item, index }) => {
                  if (!item) return null;

                  const optionValue = getOptionValue
                    ? getOptionValue(item)
                    : item.value;
                  const isSelected = customIsOptionSelected
                    ? customIsOptionSelected(item, value)
                    : selectedValues.includes(optionValue);
                  const isOptionDisabled = customIsOptionDisabled
                    ? customIsOptionDisabled(item)
                    : (item.disabled ?? false);

                  if (renderOption) {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          !isOptionDisabled &&
                          handleSelectOption(optionValue, item)
                        }
                        disabled={isOptionDisabled}
                        testID={optionTestID}
                      >
                        {renderOption(item, isSelected)}
                      </TouchableOpacity>
                    );
                  }

                  return (
                    <Button
                      variant="ghost"
                      style={[
                        styles.optionItem,
                        filteredOptions?.length !== index + 1 &&
                          styles.borderBottom,
                        getOptionItemStyle(isSelected),
                        isSelected && selectedOptionStyle,
                        isOptionDisabled && styles.optionDisabled,
                        isOptionDisabled && disabledOptionStyle,
                        optionStyle,
                      ]}
                      onPress={() =>
                        !isOptionDisabled &&
                        handleSelectOption(optionValue, item)
                      }
                      disabled={isOptionDisabled}
                      testID={optionTestID}
                    >
                      {item.icon && (
                        <View style={styles.optionIcon}>{item.icon}</View>
                      )}
                      <View style={styles.optionTextContainer}>
                        <CustomText
                          variant="body"
                          color={isOptionDisabled ? 'tertiary' : 'primary'}
                          style={[styles.optionLabel, optionLabelStyle]}
                        >
                          {getOptionLabel
                            ? getOptionLabel(item)
                            : (item.label ?? '')}
                        </CustomText>
                        {item.description && (
                          <CustomText
                            variant="caption"
                            color="secondary"
                            style={[
                              styles.optionDescription,
                              optionDescriptionStyle,
                            ]}
                          >
                            {item.description}
                          </CustomText>
                        )}
                      </View>
                      {multiple && showCheckmark && (
                        <View
                          style={[
                            styles.checkbox,
                            getCheckboxStyle(isSelected),
                            customCheckboxStyle,
                          ]}
                        >
                          {isSelected && (
                            <CustomText
                              style={[styles.checkmark, customCheckmarkStyle]}
                            >
                              ✓
                            </CustomText>
                          )}
                        </View>
                      )}
                      {!multiple && isSelected && showCheckmark && (
                        <CustomText
                          style={[
                            styles.selectedCheckmark,
                            getSelectedCheckmarkStyle(),
                          ]}
                        >
                          ✓
                        </CustomText>
                      )}
                    </Button>
                  );
                }}
                ListEmptyComponent={
                  <>
                    {renderEmptyState ? (
                      renderEmptyState(emptyMessage)
                    ) : (
                      <View style={styles.emptyContainer}>
                        <CustomText
                          variant="body"
                          color="secondary"
                          align="center"
                        >
                          {emptyMessage}
                        </CustomText>
                      </View>
                    )}
                  </>
                }
                style={styles.optionsList}
                showsVerticalScrollIndicator={true}
              />

              {/* Modal Footer */}
              {multiple &&
                (renderModalFooter ? (
                  renderModalFooter(
                    handleCloseModal,
                    handleClearSelection,
                    selectedValues.length
                  )
                ) : (
                  <View style={[styles.modalFooter, modalFooterStyle]}>
                    <TouchableOpacity
                      style={[styles.footerButton, cancelButtonStyle]}
                      onPress={handleClearSelection}
                    >
                      <CustomText
                        variant="button"
                        color="secondary"
                        style={cancelButtonTextStyle}
                      >
                        {cancelButtonText}
                      </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.footerButtonPrimary,
                        getFooterButtonPrimaryStyle(),
                        confirmButtonStyle,
                      ]}
                      onPress={handleCloseModal}
                    >
                      <CustomText
                        variant="button"
                        color="inverse"
                        style={confirmButtonTextStyle}
                      >
                        {confirmButtonText}
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                ))}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    );
  };

  // Get selected options for render props
  const selectedOptions = useMemo(() => {
    return (options ?? []).filter((option) =>
      selectedValues.includes(
        getOptionValue ? getOptionValue(option) : option?.value
      )
    );
  }, [selectedValues, options, getOptionValue]);

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
            {renderDisplayText(displayText, selectedOptions)}
          </View>
        ) : (
          <CustomText
            style={[getInputStyles(), inputStyle, getDisplayTextStyle()]}
            numberOfLines={1}
          >
            {displayText}
          </CustomText>
        )}

        {selectedValues?.length > 0 &&
          !isDisabled &&
          showClearButton &&
          (renderClearButton ? (
            renderClearButton(handleClearSelection)
          ) : (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleClearSelection();
              }}
              style={[styles.clearButton, clearButtonStyle]}
            >
              <CustomText
                style={[
                  styles.clearButtonText,
                  clearButtonTextStyle,
                  customClearButtonTextStyle,
                ]}
              >
                ×
              </CustomText>
            </TouchableOpacity>
          ))}

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
  clearButton: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  clearButtonText: {
    fontWeight: '400',
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  optionsList: {
    maxHeight: 400,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#E5E5EA',
  },
  optionDisabled: {
    opacity: 0.4,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    marginBottom: 0,
  },
  optionDescription: {
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  selectedCheckmark: {
    fontSize: 20,
  },
  emptyContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  footerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerButtonPrimary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
