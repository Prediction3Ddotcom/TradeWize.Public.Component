"use strict";

import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { CameraComponent } from "./CameraComponent.js";
import Modal from 'react-native-modal';
import { Camera } from 'react-native-vision-camera';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const CameraModal = ({
  visible,
  onClose,
  modalProps,
  audio = true,
  mode,
  onError,
  titleErrorPermission = 'Camera permission is required',
  txtButtonPermission = 'Grant Permission',
  txtRequestingPermissions = 'Requesting permissions...',
  txtOpenSettings = 'Open Settings',
  txtInitializingCamera = 'Initializing camera...',
  ...cameraProps
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check and request permissions when modal becomes visible
  const checkAndRequestPermissions = useCallback(async () => {
    try {
      setIsRequestingPermissions(true);

      // Check camera permission
      const cameraStatus = await Camera.getCameraPermissionStatus();
      let cameraGranted = cameraStatus === 'granted';

      // Request camera permission if not granted
      if (!cameraGranted) {
        const newCameraStatus = await Camera.requestCameraPermission();
        cameraGranted = newCameraStatus === 'granted';
        setHasPermission(cameraGranted);
        if (!cameraGranted) {
          // Kiểm tra xem quyền có bị từ chối vĩnh viễn không
          if (newCameraStatus === 'denied') {
            setPermissionDenied(true);
          }
          onError?.('Camera permission is required');
        } else {
          setPermissionDenied(false);
        }
      } else {
        setHasPermission(cameraGranted);
        setPermissionDenied(false);
      }

      // Check microphone permission if audio is enabled
      if (audio && (mode === 'video' || mode === 'both')) {
        const microphoneStatus = await Camera.getMicrophonePermissionStatus();
        let audioGranted = microphoneStatus === 'granted';

        // Request microphone permission if not granted
        if (!audioGranted) {
          const newMicrophoneStatus = await Camera.requestMicrophonePermission();
          audioGranted = newMicrophoneStatus === 'granted';
          setHasAudioPermission(audioGranted);
          if (!audioGranted) {
            onError?.('Microphone permission is required for video recording with audio');
          }
        } else {
          setHasAudioPermission(audioGranted);
        }
      } else {
        setHasAudioPermission(true);
      }
    } catch (error) {
      console.error('Error checking/requesting permissions:', error);
      onError?.('Failed to request camera permissions');
    } finally {
      setIsLoading(false);
      setIsRequestingPermissions(false);
    }
  }, [audio, mode, onError]);

  // Check and request permissions when modal becomes visible
  useEffect(() => {
    if (visible) {
      // Hiển thị loading ngay lập tức
      setIsLoading(true);

      // Delay để modal mở xong rồi mới xin quyền
      const timer = setTimeout(() => {
        checkAndRequestPermissions();
      }, 500); // Delay 500ms để loading hiển thị đủ lâu

      return () => clearTimeout(timer);
    } else {
      return undefined;
    }
  }, [visible, checkAndRequestPermissions]);
  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);
  const renderLoadingScreen = () => /*#__PURE__*/_jsxs(View, {
    style: styles.loadingContainer,
    children: [/*#__PURE__*/_jsx(TouchableOpacity, {
      style: styles.closeButton,
      onPress: onClose,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.closeButtonText,
        children: "\u2715"
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.itemCenter,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.loadingText,
        children: txtInitializingCamera
      })
    })]
  });
  const renderPermissionScreen = () => /*#__PURE__*/_jsxs(View, {
    style: styles.permissionContainer,
    children: [/*#__PURE__*/_jsx(TouchableOpacity, {
      style: styles.closeButton,
      onPress: onClose,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.closeButtonText,
        children: "\u2715"
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.itemCenter,
      children: isRequestingPermissions ? /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.permissionText,
          children: txtRequestingPermissions
        })
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Text, {
          style: styles.permissionText,
          children: titleErrorPermission
        }), permissionDenied ? /*#__PURE__*/_jsx(TouchableOpacity, {
          style: styles.permissionButton,
          onPress: openSettings,
          children: /*#__PURE__*/_jsx(Text, {
            style: styles.permissionButtonText,
            children: txtOpenSettings
          })
        }) : /*#__PURE__*/_jsx(TouchableOpacity, {
          style: styles.permissionButton,
          onPress: checkAndRequestPermissions,
          children: /*#__PURE__*/_jsx(Text, {
            style: styles.permissionButtonText,
            children: txtButtonPermission
          })
        })]
      })
    })]
  });
  const renderCameraComponent = () => /*#__PURE__*/_jsx(CameraComponent, {
    ...cameraProps,
    mode: mode,
    onClose: onClose,
    hasPermission: hasPermission,
    hasAudioPermission: hasAudioPermission,
    audio: audio
  });
  return /*#__PURE__*/_jsx(Modal, {
    propagateSwipe: false,
    isVisible: visible,
    animationIn: "slideInUp",
    animationOut: "slideOutDown",
    animationInTiming: 300,
    animationOutTiming: 300,
    useNativeDriver: true,
    style: {
      margin: 0,
      backgroundColor: 'black'
    },
    ...modalProps,
    children: isLoading ? renderLoadingScreen() : hasPermission ? renderCameraComponent() : renderPermissionScreen()
  });
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=CommonCameraModal.js.map