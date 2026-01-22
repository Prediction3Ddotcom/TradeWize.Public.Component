"use strict";

import { forwardRef, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Platform, StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER, MAX_COMPOSER_HEIGHT } from "./Constant.js";
import Color from "./Color.js";
import stylesCommon from "./styles.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const Composer = /*#__PURE__*/forwardRef(({
  composerHeight = MIN_COMPOSER_HEIGHT,
  disableComposer = false,
  keyboardAppearance = 'default',
  multiline = true,
  onInputSizeChanged,
  onTextChanged,
  placeholder = DEFAULT_PLACEHOLDER,
  placeholderTextColor = Color.defaultColor,
  textInputAutoFocus = false,
  text,
  textInputProps,
  textInputStyle,
  onPressPickMedia,
  onFocus,
  onBlur
}, ref) => {
  const dimensionsRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [widthText, setWidthText] = useState(0);
  const [lineCount, setLineCount] = useState(1);

  // Reset lineCount khi text trống (đặc biệt hữu ích trên Android)
  useEffect(() => {
    if (!text || text.trim() === '') {
      setLineCount(1);
    }
  }, [text]);
  const determineInputSizeChange = useCallback(dimensions => {
    // Support earlier versions of React Native on Android.
    if (!dimensions) return;
    if (!dimensionsRef.current || dimensionsRef.current && (dimensionsRef.current.width !== dimensions.width || dimensionsRef.current.height !== dimensions.height)) {
      dimensionsRef.current = dimensions;
      setWidthText(dimensions.width);
      onInputSizeChanged?.(dimensions);
    }
  }, [onInputSizeChanged]);
  const handleContentSizeChange = useCallback(({
    nativeEvent: {
      contentSize
    }
  }) => {
    determineInputSizeChange(contentSize);

    // Nếu text rỗng, luôn giữ lineCount = 1
    if (!text || text.trim() === '') {
      setLineCount(1);
      return;
    }

    // Tính số dòng dựa trên contentSize height, xử lý đặc biệt cho Android
    const lineHeight = 22;
    const androidPadding = Platform.OS === 'android' ? 6 : 12; // Android có padding khác
    const minHeightForOneLine = lineHeight + androidPadding;
    let lines = 1;
    if (contentSize.height > minHeightForOneLine) {
      lines = Math.max(1, Math.ceil((contentSize.height - androidPadding) / lineHeight));
    }
    setLineCount(lines);
  }, [determineInputSizeChange, text]);
  const handleLayout = () => {
    // Chỉ xử lý layout, không tính toán lineCount ở đây
    // lineCount sẽ được tính trong handleContentSizeChange
  };
  const borderRadiusByLineCount = useMemo(() => {
    // if (lineCount === 1) {
    //   return 100;
    // }
    return 16;
  }, []);
  const heightInput = useMemo(() => {
    // Chiều cao mặc định cho 1 hàng
    const minHeight = composerHeight ?? 40;
    const lineHeight = 22;

    // Chỉ tăng chiều cao khi có nhiều hơn 1 hàng
    if (lineCount > 1) {
      const calculatedHeight = lineCount * lineHeight;
      const maxHeight = MAX_COMPOSER_HEIGHT;
      return Math.min(calculatedHeight + 12, maxHeight); // +12 cho padding
    }

    // Trả về chiều cao mặc định cho 1 hàng
    return minHeight;
  }, [lineCount, composerHeight]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, {
      opacity: disableComposer ? 0.5 : 1
    }],
    children: [isFocused && !isPickerOpen && /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: () => setIsPickerOpen(true),
      children: /*#__PURE__*/_jsx(Image, {
        tintColor: Color.defaultBlue,
        resizeMode: "contain",
        source: require('./assets/next.png'),
        style: {
          width: 18,
          height: 18
        }
      })
    }), (!isFocused || isPickerOpen) && /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx(TouchableOpacity, {
        disabled: disableComposer,
        onPress: () => onPressPickMedia?.('camera'),
        children: /*#__PURE__*/_jsx(Image, {
          tintColor: Color.defaultBlue,
          resizeMode: "contain",
          source: require('./assets/camera.png'),
          style: styles.iconPick
        })
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.textInputContainer, {
        borderRadius: borderRadiusByLineCount
      }],
      children: [/*#__PURE__*/_jsx(TextInput, {
        ref: ref,
        testID: placeholder,
        accessible: true,
        accessibilityLabel: placeholder,
        placeholder: placeholder,
        placeholderTextColor: placeholderTextColor,
        multiline: multiline,
        editable: !disableComposer,
        onContentSizeChange: handleContentSizeChange,
        onChangeText: txt => {
          onTextChanged?.(txt);
          setIsPickerOpen(false);
        },
        style: [stylesCommon.fill, styles.textInput, textInputStyle, {
          height: heightInput,
          ...Platform.select({
            web: {
              outlineWidth: 0,
              outlineColor: 'transparent',
              outlineOffset: 0
            }
          })
        }],
        autoFocus: textInputAutoFocus,
        value: text,
        enablesReturnKeyAutomatically: true,
        underlineColorAndroid: "transparent",
        keyboardAppearance: keyboardAppearance,
        onFocus: () => {
          setIsFocused(true);
          onFocus?.();
        },
        onBlur: () => {
          setIsFocused(false);
          setIsPickerOpen(false);
          onBlur?.();
        },
        ...textInputProps
      }), /*#__PURE__*/_jsx(Text, {
        onLayout: handleLayout,
        style: [styles.hiddenText, {
          width: widthText
        }],
        children: text
      })]
    })]
  });
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Color.leftBubbleBackground,
    paddingHorizontal: 8
  },
  textInput: {
    paddingRight: 8,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  iconPick: {
    width: 24,
    height: 24
  },
  hiddenText: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    paddingRight: 8,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  inputPreview: {
    paddingRight: 8,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4
      }
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4
    })
  },
  txtPreview: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22
  }
});
//# sourceMappingURL=Composer.js.map