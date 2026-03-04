"use strict";

import { memo } from 'react';
import ImageView from 'react-native-image-viewing';
import { VideoModal } from "../../VideoModal/index.js";
import { CameraModal } from "../Camera/index.js";
import { MessageWithReaction } from "../MessageWithReaction.js";
import { MediaAllShow } from "../MediaAllShow.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
function ModalsContainerInner({
  isImageViewerVisible,
  fileSelected,
  setIsImageViewerVisible,
  isShowVideoModal,
  setIsShowVideoModal,
  isShowEmojiReaction,
  isModalReaction,
  setIsModalReaction,
  messageSelected,
  user,
  handleReactionEmoji,
  handleActionReaction,
  isMediaAllShow,
  setIsMediaAllShow,
  fileMediaAllLocal,
  handlePressFile,
  isShowCameraModal,
  setIsShowCameraModal,
  onVideoRecorded,
  onPhotoCaptured
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ImageView, {
      images: fileSelected ? [{
        uri: fileSelected.uri
      }] : [],
      imageIndex: 0,
      visible: isImageViewerVisible,
      onRequestClose: () => setIsImageViewerVisible(false)
    }), /*#__PURE__*/_jsx(VideoModal, {
      txtSkipButton: 'X',
      visible: isShowVideoModal,
      onClose: () => setIsShowVideoModal(false),
      subtitle: {},
      source: fileSelected?.uri || '',
      autoPlay: true,
      isProgressBar: false
    }), /*#__PURE__*/_jsx(MessageWithReaction, {
      isShowEmoji: isShowEmojiReaction,
      onReactionEmoji: handleReactionEmoji,
      onActionReaction: handleActionReaction,
      user: user,
      isVisible: isModalReaction,
      onClose: () => setIsModalReaction(false),
      message: messageSelected?.message || {},
      position: messageSelected?.position || {}
    }), /*#__PURE__*/_jsx(MediaAllShow, {
      fileMediaAll: fileMediaAllLocal,
      isVisible: isMediaAllShow,
      onClose: () => setIsMediaAllShow(false),
      onPressFile: file => {
        setIsMediaAllShow(false);
        setTimeout(() => {
          handlePressFile(file);
        }, 350);
      }
    }), /*#__PURE__*/_jsx(CameraModal, {
      mode: "both",
      isCanPause: false,
      onVideoRecorded: onVideoRecorded,
      onPhotoCaptured: onPhotoCaptured,
      visible: isShowCameraModal,
      onClose: () => setIsShowCameraModal(false)
    })]
  });
}
export const ModalsContainer = /*#__PURE__*/memo(ModalsContainerInner);
//# sourceMappingURL=ModalsContainer.js.map