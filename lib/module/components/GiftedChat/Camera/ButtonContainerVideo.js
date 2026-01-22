"use strict";

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export const ButtonContainerVideo = ({
  isRecording,
  isPaused,
  isCanPause,
  canStopRecording = false,
  resumeRecording,
  pauseRecording,
  startRecording,
  stopRecording
}) => {
  const handlePress = event => {
    if (isRecording) {
      if (isCanPause) {
        if (isPaused) {
          resumeRecording?.(event);
        } else {
          pauseRecording?.(event);
        }
      } else {
        // Chỉ cho phép dừng quay khi đã đạt thời gian tối thiểu
        if (canStopRecording) {
          stopRecording?.(event);
        }
      }
    } else {
      startRecording?.(event);
    }
  };
  return /*#__PURE__*/_jsx(View, {
    style: styles.videoControlsContainer,
    children: /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [styles.recordButton, isRecording && !canStopRecording && styles.recordButtonDisabled],
      onPress: handlePress,
      disabled: isRecording && !canStopRecording,
      children: /*#__PURE__*/_jsx(View, {
        style: isRecording ? isPaused ? styles.recordButtonInner : styles.recordButtonInnerActive : styles.recordButtonInner
      })
    })
  });
};
const styles = StyleSheet.create({
  videoControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  recordButtonDisabled: {
    opacity: 0.5,
    borderColor: '#FFA500'
  },
  recordButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FF0000'
  },
  recordButtonInnerActive: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FF0000'
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  stopButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF'
  }
});
//# sourceMappingURL=ButtonContainerVideo.js.map