"use strict";

import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Color from "./Color.js";
import { BlurView } from '@react-native-community/blur';
import { MessageFile } from "./MessageFile.js";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MediaAllShow({
  isVisible,
  onClose,
  fileMediaAll,
  onPressFile
}) {
  return /*#__PURE__*/_jsxs(Modal, {
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    isVisible: isVisible,
    onBackdropPress: onClose,
    style: styles.modal,
    backdropOpacity: 0,
    useNativeDriver: true,
    children: [/*#__PURE__*/_jsx(Pressable, {
      style: StyleSheet.absoluteFill,
      onPress: onClose,
      children: /*#__PURE__*/_jsx(BlurView, {
        pointerEvents: "none",
        style: StyleSheet.absoluteFill,
        blurType: "dark",
        blurAmount: 10,
        reducedTransparencyFallbackColor: "black"
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.container,
      children: /*#__PURE__*/_jsxs(View, {
        style: styles.content,
        children: [/*#__PURE__*/_jsx(View, {
          style: styles.header
        }), /*#__PURE__*/_jsx(ScrollView, {
          style: styles.scrollView,
          children: /*#__PURE__*/_jsx(MessageFile, {
            onPressFile: onPressFile,
            isShowAll: true,
            currentMessage: fileMediaAll || {},
            messageWidth: {
              width: SCREEN_WIDTH,
              _id: ''
            }
          })
        })]
      })
    })]
  });
}
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  content: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: SCREEN_HEIGHT * 0.5,
    paddingBottom: 48,
    backgroundColor: Color.white,
    alignItems: 'center'
  },
  header: {
    height: 8,
    backgroundColor: Color.defaultColor,
    borderRadius: 12,
    width: 60,
    marginTop: 12,
    marginBottom: 8
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white
  },
  contentScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=MediaAllShow.js.map