"use strict";

import { useMemo } from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { View } from 'react-native';
import { Actions } from "../Actions.js";
import { Avatar } from "../Avatar.js";
import Bubble from "../Bubble/index.js";
import { Composer } from "../Composer.js";
import { TEST_ID } from "../Constant.js";
import { Day } from "../Day/index.js";
import { GiftedAvatar } from "../GiftedAvatar.js";
import { GiftedChatContext } from "../GiftedChatContext.js";
import { LoadEarlier } from "../LoadEarlier.js";
import Message from "../Message/index.js";
import MessageContainer from "../MessageContainer/index.js";
import { MessageText } from "../MessageText.js";
import { Send } from "../Send.js";
import { SystemMessage } from "../SystemMessage.js";
import { Time } from "../Time.js";
import * as utils from "../utils.js";
import Animated from 'react-native-reanimated';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import stylesCommon from "../styles.js";
import styles from "./styles.js";
import { useGiftedChat } from "../hooks/useGiftedChat.js";
import { ModalsContainer } from "./ModalsContainer.js";
import { InputToolbarFragment } from "./InputToolbarFragment.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
dayjs.extend(localizedFormat);
function GiftedChat(props) {
  const {
    renderLoading,
    renderChatFooter = null
  } = props;
  const {
    // Refs
    actionSheetRef,
    messageContainerRef,
    textInputRef,
    // State
    isInitialized,
    composerHeight,
    text,
    isImageViewerVisible,
    setIsImageViewerVisible,
    fileSelected,
    isShowVideoModal,
    setIsShowVideoModal,
    isShowCameraModal,
    setIsShowCameraModal,
    isTypingDisabled,
    isMediaAllShow,
    setIsMediaAllShow,
    fileMediaAllLocal,
    arrMessage,
    messageReaction,
    setMessageReaction,
    isModalReaction,
    setIsModalReaction,
    messageSelected,
    fileMedia,
    setFileMedia,
    // Animated
    contentStyleAnim,
    // Config
    inverted,
    isTyping,
    keyboardShouldPersistTaps,
    useScrollView,
    isKeyboardInternallyHandled,
    isShowEmojiReaction,
    renderInputToolbar,
    maxInputLength,
    minComposerHeight,
    textInputProps,
    labelReaction,
    onFocusInput,
    onBlurInput,
    user,
    // Handlers
    getTextFromProp,
    onInitialLayoutViewLayout,
    handlePressFile,
    _onSend,
    onInputSizeChanged,
    _onInputTextChanged,
    onPressPickMedia,
    handleReactionEmoji,
    handleActionReaction,
    onLongPressReaction,
    onPressFileInContainer,
    onVideoRecorded,
    onPhotoCaptured,
    contextValues
  } = useGiftedChat(props);
  const renderMessages = useMemo(() => {
    if (!isInitialized) return null;
    const {
      messagesContainerStyle,
      ...messagesContainerProps
    } = props;
    return /*#__PURE__*/_jsxs(View, {
      style: [stylesCommon.fill, messagesContainerStyle],
      children: [/*#__PURE__*/_jsx(MessageContainer, {
        ...messagesContainerProps,
        invertibleScrollViewProps: {
          inverted,
          keyboardShouldPersistTaps
        },
        messages: arrMessage,
        forwardRef: messageContainerRef,
        isTyping: isTyping,
        useScrollView: useScrollView,
        onLongPressReaction: onLongPressReaction,
        onPressFile: onPressFileInContainer
      }), renderChatFooter?.()]
    });
  }, [isInitialized, isTyping, arrMessage, props, inverted, keyboardShouldPersistTaps, messageContainerRef, renderChatFooter, useScrollView, onLongPressReaction, onPressFileInContainer]);
  return /*#__PURE__*/_jsx(GiftedChatContext.Provider, {
    value: contextValues,
    children: /*#__PURE__*/_jsx(ActionSheetProvider, {
      ref: actionSheetRef,
      children: /*#__PURE__*/_jsx(View, {
        testID: TEST_ID.WRAPPER,
        style: [stylesCommon.fill, styles.contentContainer],
        onLayout: onInitialLayoutViewLayout,
        children: isInitialized ? /*#__PURE__*/_jsxs(Animated.View, {
          style: [stylesCommon.fill, isKeyboardInternallyHandled && contentStyleAnim],
          children: [renderMessages, /*#__PURE__*/_jsx(InputToolbarFragment, {
            isInitialized: isInitialized,
            props: props,
            getTextFromProp: getTextFromProp,
            text: text,
            composerHeight: composerHeight,
            minComposerHeight: minComposerHeight,
            _onSend: _onSend,
            onInputSizeChanged: onInputSizeChanged,
            _onInputTextChanged: _onInputTextChanged,
            textInputProps: textInputProps,
            textInputRef: textInputRef,
            isTypingDisabled: isTypingDisabled,
            maxInputLength: maxInputLength,
            renderInputToolbar: renderInputToolbar,
            user: user,
            messageReaction: messageReaction,
            setMessageReaction: setMessageReaction,
            fileMedia: fileMedia,
            setFileMedia: setFileMedia,
            handlePressFile: handlePressFile,
            onPressPickMedia: onPressPickMedia,
            labelReaction: labelReaction,
            onFocusInput: onFocusInput,
            onBlurInput: onBlurInput
          }), /*#__PURE__*/_jsx(View, {
            style: styles.overlayContainer,
            children: /*#__PURE__*/_jsx(ModalsContainer, {
              isImageViewerVisible: isImageViewerVisible,
              fileSelected: fileSelected,
              setIsImageViewerVisible: setIsImageViewerVisible,
              isShowVideoModal: isShowVideoModal,
              setIsShowVideoModal: setIsShowVideoModal,
              isShowEmojiReaction: isShowEmojiReaction,
              isModalReaction: isModalReaction,
              setIsModalReaction: setIsModalReaction,
              messageSelected: messageSelected,
              user: user,
              handleReactionEmoji: handleReactionEmoji,
              handleActionReaction: handleActionReaction,
              isMediaAllShow: isMediaAllShow,
              setIsMediaAllShow: setIsMediaAllShow,
              fileMediaAllLocal: fileMediaAllLocal,
              handlePressFile: handlePressFile,
              isShowCameraModal: isShowCameraModal,
              setIsShowCameraModal: setIsShowCameraModal,
              onVideoRecorded: onVideoRecorded,
              onPhotoCaptured: onPhotoCaptured
            })
          })]
        }) : renderLoading?.()
      })
    })
  });
}
function GiftedChatWrapper(props) {
  return /*#__PURE__*/_jsx(KeyboardProvider, {
    children: /*#__PURE__*/_jsx(GiftedChat, {
      ...props
    })
  });
}
GiftedChatWrapper.append = (currentMessages = [], messages, inverted = true) => {
  if (!Array.isArray(messages)) messages = [messages];
  return inverted ? messages.concat(currentMessages) : currentMessages.concat(messages);
};
GiftedChatWrapper.prepend = (currentMessages = [], messages, inverted = true) => {
  if (!Array.isArray(messages)) messages = [messages];
  return inverted ? currentMessages.concat(messages) : messages.concat(currentMessages);
};
export * from "../types.js";
export { GiftedChatWrapper as GiftedChat, Actions, Avatar, Bubble, SystemMessage, MessageText, Composer, Day, LoadEarlier, Message, MessageContainer, Send, Time, GiftedAvatar, utils };
//# sourceMappingURL=index.js.map