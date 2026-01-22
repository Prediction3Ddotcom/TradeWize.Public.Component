"use strict";

import { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Slider from '@react-native-community/slider';
import { SnapScrollView } from "./CameraModeSelector.js";
import RNFS from 'react-native-fs';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const CameraComponent = ({
  onPhotoCaptured,
  onVideoRecorded,
  onError,
  onClose,
  onExportLoading,
  mode = 'both',
  audio = true,
  // Mặc định bật âm thanh
  initialZoom = 1,
  // Mặc định zoom 1x
  flashMode = 'off',
  isCanPause = true,
  minRecordingTime = 3,
  // Mặc định thời gian tối thiểu 3 giây
  maxRecordingTime = 60,
  // Mặc định thời gian tối đa 60 giây
  hasPermission = false,
  hasAudioPermission = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [currentFlashMode, setCurrentFlashMode] = useState(flashMode);
  const [zoom, setZoom] = useState(initialZoom); // Thêm state cho zoom
  const [canStopRecording, setCanStopRecording] = useState(false); // Kiểm tra có thể dừng quay không

  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.find(_device => _device.position === cameraPosition);

  // Lấy min/max zoom từ device
  const minZoom = device?.minZoom || 1;
  const maxZoom = device?.maxZoom || 10;
  const stopRecording = useCallback(async () => {
    if (!camera.current || !isRecording) return;

    // Kiểm tra thời gian quay có đạt tối thiểu chưa
    if (recordingDuration < minRecordingTime) {
      onError?.(`Video must be at least ${minRecordingTime} seconds long`);
      return;
    }
    try {
      await camera.current.stopRecording();
    } catch (error) {
      onError?.('Failed to stop recording');
      setIsRecording(false);
      setCanStopRecording(false);
      if (isCanPause) {
        setIsPaused(false);
      }
      setRecordingDuration(0);
    }
  }, [camera, isRecording, recordingDuration, minRecordingTime, onError, isCanPause]);

  // Timer for recording duration
  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingDuration(prev => {
          const newDuration = prev + 1;
          // Kiểm tra có thể dừng quay khi đạt thời gian tối thiểu
          if (newDuration >= minRecordingTime) {
            setCanStopRecording(true);
          }
          // Tự động dừng quay khi đạt thời gian tối đa
          if (newDuration >= maxRecordingTime) {
            stopRecording();
          }
          return newDuration;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused, minRecordingTime, maxRecordingTime, stopRecording]);
  const toggleCameraPosition = useCallback(() => {
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back');
    // Reset zoom khi chuyển camera
    setZoom(initialZoom);
  }, [initialZoom]);
  const toggleFlashMode = useCallback(() => {
    setCurrentFlashMode(prev => {
      switch (prev) {
        case 'off':
          return 'on';
        case 'on':
          return 'off';
        default:
          return 'off';
      }
    });
  }, []);
  const setZoomLevel = useCallback(level => {
    setZoom(Math.max(minZoom, Math.min(level, maxZoom))); // Sử dụng min/max zoom của device
  }, [minZoom, maxZoom]);
  const capturePhoto = useCallback(async () => {
    if (!camera.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const photo = await camera.current.takePhoto({
        flash: currentFlashMode
      });
      const getSize = await RNFS.stat(photo.path);
      const img = {
        ...photo,
        size: getSize?.size
      };
      onPhotoCaptured?.(img);
    } catch (error) {
      onError?.('Failed to capture photo');
    } finally {
      setIsCapturing(false);
    }
  }, [camera, isCapturing, currentFlashMode, onPhotoCaptured, onError]);
  const startRecording = useCallback(async () => {
    if (!camera.current || isRecording) return;
    try {
      setIsRecording(true);
      setCanStopRecording(false); // Reset trạng thái có thể dừng quay
      if (isCanPause) {
        setIsPaused(false);
      }
      setRecordingDuration(0);
      await camera.current.startRecording({
        videoCodec: 'h265',
        fileType: 'mp4',
        onRecordingFinished: async video => {
          try {
            onExportLoading?.(true);
            const path = video.path.replace('file://', '');
            const stat = await RNFS.stat(path);
            const videoFile = {
              ...video,
              size: stat?.size
            };
            onVideoRecorded?.(videoFile);
          } catch (error) {
            onError?.('Failed to process video file');
          } finally {
            onExportLoading?.(false);
            setIsRecording(false);
            setCanStopRecording(false);
            if (isCanPause) {
              setIsPaused(false);
            }
            setRecordingDuration(0);
          }
        },
        onRecordingError: error => {
          onError?.(`Recording error: ${error.message}`);
          setIsRecording(false);
          setCanStopRecording(false);
          if (isCanPause) {
            setIsPaused(false);
          }
          setRecordingDuration(0);
        },
        flash: currentFlashMode
      });
    } catch (error) {
      onError?.('Failed to start recording');
      setIsRecording(false);
      setCanStopRecording(false);
      if (isCanPause) {
        setIsPaused(false);
      }
      setRecordingDuration(0);
    }
    setIsPaused(false);
  }, [camera, isRecording, currentFlashMode, onVideoRecorded, onError, isCanPause, onExportLoading]);
  const pauseRecording = useCallback(async () => {
    if (!camera.current || !isRecording || isPaused) return;
    try {
      await camera.current.pauseRecording();
      if (isCanPause) {
        setIsPaused(true);
      }
    } catch (error) {
      onError?.('Failed to pause recording');
    }
  }, [camera, isRecording, isPaused, onError, isCanPause]);
  const resumeRecording = useCallback(async () => {
    if (!camera.current || !isRecording || !isPaused) return;
    try {
      await camera.current.resumeRecording();
      if (isCanPause) {
        setIsPaused(false);
      }
    } catch (error) {
      onError?.('Failed to resume recording');
    }
  }, [camera, isRecording, isPaused, onError, isCanPause]);

  // Format duration to MM:SS
  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  if (!device) {
    return /*#__PURE__*/_jsxs(View, {
      style: styles.loadingContainer,
      children: [/*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.closeButtonNotPermission,
        onPress: onClose,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.closeButtonText,
          children: "\u2715"
        })
      }), /*#__PURE__*/_jsx(View, {
        style: styles.itemCenter,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.loadingText,
          children: "Loading camera..."
        })
      })]
    });
  }
  if (!hasPermission) {
    return /*#__PURE__*/_jsxs(View, {
      style: styles.loadingContainer,
      children: [/*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.closeButtonNotPermission,
        onPress: onClose,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.closeButtonText,
          children: "\u2715"
        })
      }), /*#__PURE__*/_jsx(View, {
        style: styles.itemCenter,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.loadingText,
          children: "No camera permission"
        })
      })]
    });
  }

  // Hiển thị cảnh báo nếu không có quyền microphone nhưng cần âm thanh
  const showAudioWarning = audio && !hasAudioPermission && (mode === 'video' || mode === 'both');

  // const height = isRecording ? getScreenHeight() : getScreenHeight() * 0.8;
  const height = SCREEN_HEIGHT;
  const flashButtonColor = currentFlashMode === 'off' ? 'rgba(0, 0, 0, 0.5)' : '#EDE27D';
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(Camera, {
      torch: currentFlashMode,
      ref: camera,
      style: [StyleSheet.absoluteFill, {
        height
      }],
      device: device,
      isActive: true,
      photo: mode === 'photo' || mode === 'both',
      video: mode === 'video' || mode === 'both',
      audio: audio && hasAudioPermission,
      zoom: zoom // Thêm prop zoom
    }), showAudioWarning && !hasAudioPermission && /*#__PURE__*/_jsx(View, {
      style: styles.audioWarning,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.audioWarningText,
        children: "\u26A0\uFE0F Video will be recorded without audio"
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.topControls,
      children: [/*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.closeButton,
        onPress: onClose,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.closeButtonText,
          children: "\u2715"
        })
      }), /*#__PURE__*/_jsx(TouchableOpacity, {
        style: [styles.flashButton, {
          backgroundColor: flashButtonColor
        }],
        onPress: toggleFlashMode,
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.flashButtonText,
          children: "\u26A1"
        })
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.zoomSliderContainer,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.zoomLevelBackground,
        children: /*#__PURE__*/_jsxs(Text, {
          style: styles.zoomLevelText,
          children: [zoom.toFixed(1), "x"]
        })
      }), /*#__PURE__*/_jsx(Slider, {
        style: styles.zoomSlider,
        minimumValue: minZoom,
        maximumValue: maxZoom,
        value: zoom,
        onValueChange: setZoomLevel,
        minimumTrackTintColor: "white",
        maximumTrackTintColor: "rgba(255, 255, 255, 0.3)",
        thumbTintColor: "white"
      })]
    }), /*#__PURE__*/_jsx(SnapScrollView, {
      mode: mode,
      isRecording: isRecording,
      isPaused: isPaused,
      isCapturing: isCapturing,
      capturePhoto: capturePhoto,
      toggleCameraPosition: toggleCameraPosition,
      stopRecording: stopRecording,
      startRecording: startRecording,
      pauseRecording: pauseRecording,
      resumeRecording: resumeRecording,
      isCanPause: isCanPause,
      canStopRecording: canStopRecording
    }), isRecording && /*#__PURE__*/_jsxs(View, {
      style: styles.recordingIndicator,
      children: [/*#__PURE__*/_jsx(View, {
        style: [styles.recordingDot, isPaused && styles.recordingDotPaused]
      }), /*#__PURE__*/_jsxs(Text, {
        style: styles.recordingText,
        children: [formatDuration(recordingDuration), " ", isPaused ? '(Paused)' : '', !hasAudioPermission && audio ? '(No Audio)' : '']
      }), /*#__PURE__*/_jsxs(Text, {
        style: styles.timeLimitText,
        children: ["Max: ", maxRecordingTime, "s"]
      })]
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16
  },
  audioWarning: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1
  },
  audioWarningText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600'
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flashButtonText: {
    color: '#FFFFFF',
    fontSize: 18
  },
  // Zoom Slider Styles
  zoomSliderContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.2 + 8,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1
  },
  zoomSlider: {
    width: '100%',
    height: 40
  },
  zoomLevelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  zoomLevelBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  captureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  recordButtonStop: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 4
  },
  recordingIndicator: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8
  },
  recordingDotPaused: {
    backgroundColor: '#FFD700'
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  timeLimitText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '400',
    opacity: 0.8,
    marginTop: 2
  },
  closeButtonNotPermission: {
    position: 'absolute',
    top: 16,
    right: 8,
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default CameraComponent;
//# sourceMappingURL=CameraComponent.js.map