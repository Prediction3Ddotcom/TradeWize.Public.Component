"use strict";

import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import dayjs from 'dayjs';
import { useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import ImageCropPicker from 'react-native-image-crop-picker';
import { MIN_COMPOSER_HEIGHT, MAX_COMPOSER_HEIGHT } from "../Constant.js";
import * as utils from "../utils.js";
import { generateThumbnails, normalizeFileUri } from "../utils.js";
export function useGiftedChat(props) {
  const {
    messages = [],
    initialText = '',
    isTyping,
    messageIdGenerator = () => (Math.random() + 1).toString(36).substring(7) + dayjs().valueOf(),
    user = {},
    onSend,
    locale = 'en',
    actionSheet = null,
    textInputProps,
    renderInputToolbar = null,
    bottomOffset = 0,
    focusOnInputWhenOpeningKeyboard = true,
    keyboardShouldPersistTaps = Platform.select({
      ios: 'never',
      android: 'always',
      default: 'never'
    }),
    onInputTextChanged = null,
    maxInputLength = null,
    inverted = true,
    minComposerHeight = MIN_COMPOSER_HEIGHT,
    maxComposerHeight = MAX_COMPOSER_HEIGHT,
    isKeyboardInternallyHandled = true,
    onReactionEmoji = null,
    labelReaction,
    onFocusInput,
    onBlurInput,
    isShowEmojiReaction = true,
    useScrollView = false
  } = props;

  // Refs
  const actionSheetRef = useRef(null);
  const messageContainerRef = useMemo(() => props.messageContainerRef || /*#__PURE__*/createRef(), [props.messageContainerRef]);
  const textInputRef = useMemo(() => props.textInputRef || /*#__PURE__*/createRef(), [props.textInputRef]);
  const isTextInputWasFocused = useRef(false);
  const debounceEnableTypingTimeoutId = useRef(undefined);

  // State
  const [isInitialized, setIsInitialized] = useState(false);
  const [composerHeight, setComposerHeight] = useState(minComposerHeight);
  const [text, setText] = useState(() => props.text || '');
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [isShowVideoModal, setIsShowVideoModal] = useState(false);
  const [isTypingDisabled, setIsTypingDisabled] = useState(false);
  const [isShowCameraModal, setIsShowCameraModal] = useState(false);
  const [isMediaAllShow, setIsMediaAllShow] = useState(false);
  const [fileMediaAllLocal, setFileMediaAllLocal] = useState(null);
  const [arrMessage, setArrMessage] = useState(messages);
  const [messageReaction, setMessageReaction] = useState(null);
  const [isModalReaction, setIsModalReaction] = useState(false);
  const [messageSelected, setMessageSelected] = useState(null);
  const [fileMedia, setFileMedia] = useState([]);

  // Animated values
  const keyboard = useReanimatedKeyboardAnimation();
  const trackingKeyboardMovement = useSharedValue(false);
  const keyboardOffsetBottom = useSharedValue(0);
  const contentStyleAnim = useAnimatedStyle(() => ({
    transform: [{
      translateY: keyboard.height.value - keyboardOffsetBottom.value
    }]
  }), [keyboard, keyboardOffsetBottom]);

  // Handlers
  const getTextFromProp = useCallback(fallback => {
    if (props.text === undefined) return fallback;
    return props.text;
  }, [props.text]);
  const handleTextInputFocusWhenKeyboardHide = useCallback(() => {
    if (!isTextInputWasFocused.current) isTextInputWasFocused.current = textInputRef.current?.isFocused() || false;
  }, [textInputRef]);
  const handleTextInputFocusWhenKeyboardShow = useCallback(() => {
    if (textInputRef.current && isTextInputWasFocused.current && !textInputRef.current.isFocused()) textInputRef.current.focus();
    isTextInputWasFocused.current = false;
  }, [textInputRef]);
  const disableTyping = useCallback(() => {
    clearTimeout(debounceEnableTypingTimeoutId.current);
    setIsTypingDisabled(true);
  }, []);
  const enableTyping = useCallback(() => {
    clearTimeout(debounceEnableTypingTimeoutId.current);
    setIsTypingDisabled(false);
  }, []);
  const debounceEnableTyping = useCallback(() => {
    clearTimeout(debounceEnableTypingTimeoutId.current);
    debounceEnableTypingTimeoutId.current = setTimeout(() => {
      enableTyping();
    }, 50);
  }, [enableTyping]);
  const scrollToBottom = useCallback((isAnimated = true) => {
    if (!messageContainerRef?.current) return;
    if ('scrollTo' in messageContainerRef.current && 'scrollToEnd' in messageContainerRef.current) {
      const scrollViewRef = messageContainerRef.current;
      if (inverted) {
        scrollViewRef.scrollTo({
          y: 0,
          animated: isAnimated
        });
      } else {
        scrollViewRef.scrollToEnd({
          animated: isAnimated
        });
      }
    } else if ('scrollToOffset' in messageContainerRef.current) {
      const animatedListRef = messageContainerRef.current;
      if (inverted) {
        animatedListRef.scrollToOffset({
          offset: 0,
          animated: isAnimated
        });
      } else {
        if ('scrollToEnd' in animatedListRef) {
          animatedListRef.scrollToEnd({
            animated: isAnimated
          });
        }
      }
    }
  }, [inverted, messageContainerRef]);
  const handlePressFile = useCallback(file => {
    const type = file?.typeFile;
    switch (type) {
      case 'video':
        setFileSelected({
          uri: file.uri
        });
        setTimeout(() => setIsShowVideoModal(true), 100);
        break;
      case 'image':
        setFileSelected({
          uri: file.uri
        });
        setTimeout(() => setIsImageViewerVisible(true), 100);
        break;
      default:
        break;
    }
  }, []);
  const notifyInputTextReset = useCallback(() => {
    onInputTextChanged?.('');
  }, [onInputTextChanged]);
  const resetInputToolbar = useCallback(() => {
    textInputRef.current?.clear();
    notifyInputTextReset();
    setComposerHeight(minComposerHeight);
    setText(getTextFromProp(''));
    enableTyping();
  }, [minComposerHeight, getTextFromProp, textInputRef, notifyInputTextReset, enableTyping]);
  const _onSend = useCallback(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (messages = [], shouldResetInputToolbar = false) => {
    if (!Array.isArray(messages)) messages = [messages];
    if (!messages[0]?.text && fileMedia?.length <= 0) return;
    const convertFileMedia = fileMedia?.map(item => ({
      ...item,
      uri: item?.uri || '',
      thumbnailPreview: item?.thumbnailPreview || '',
      mine: utils.getFileTypeFromPath(item?.uri || '')
    }));
    const newMessages = messages?.map(message => ({
      ...message,
      user: user,
      createdAt: new Date(),
      _id: messageIdGenerator?.(),
      file: convertFileMedia
    }));
    if (shouldResetInputToolbar === true) {
      disableTyping();
      resetInputToolbar();
    }
    setFileMedia([]);
    let newMessagesWithReaction = newMessages;
    if (messageReaction && messageReaction?.isReply) {
      newMessagesWithReaction = newMessages.map(message => ({
        ...message,
        messageReply: messageReaction
      }));
    }
    setMessageReaction(null);
    onSend?.(newMessagesWithReaction);
    setTimeout(() => scrollToBottom(), 10);
  }, [onSend, user, messageIdGenerator, fileMedia, disableTyping, resetInputToolbar, scrollToBottom, messageReaction]);
  const onInputSizeChanged = useCallback(size => {
    const newComposerHeight = Math.max(minComposerHeight, Math.min(maxComposerHeight, size.height));
    setComposerHeight(newComposerHeight);
  }, [maxComposerHeight, minComposerHeight]);
  const _onInputTextChanged = useCallback(_text => {
    if (isTypingDisabled) return;
    onInputTextChanged?.(_text);
    if (props.text === undefined) setText(_text);
  }, [onInputTextChanged, isTypingDisabled, props.text]);
  const onPressPickMedia = useCallback(async type => {
    if (type === 'camera') {
      setIsShowCameraModal(true);
    } else {
      const result = await ImageCropPicker.openPicker({
        multiple: true
      });
      const fileMediaAll = result?.map(item => {
        const uri = item.path || item.sourceURL;
        return {
          uri,
          id: dayjs().valueOf().toString() + item?.filename,
          size: item?.size || 0,
          name: item?.filename || '',
          fileExtension: `.${uri?.split('.').pop()}` || '',
          typeFile: 'image',
          thumbnailPreview: uri,
          width: item?.width,
          height: item?.height
        };
      });
      setFileMedia([...fileMedia, ...fileMediaAll]);
    }
  }, [fileMedia]);
  const onInitialLayoutViewLayout = useCallback(e => {
    if (isInitialized) return;
    const {
      layout
    } = e.nativeEvent;
    if (layout.height <= 0) return;
    notifyInputTextReset();
    setIsInitialized(true);
    setComposerHeight(minComposerHeight);
    setText(getTextFromProp(initialText));
  }, [isInitialized, initialText, minComposerHeight, notifyInputTextReset, getTextFromProp]);
  const handleReactionEmoji = useCallback((emoji, messageId) => {
    onReactionEmoji?.(emoji, messageId);
  }, [onReactionEmoji]);
  const handleActionReaction = useCallback((message, action) => {
    switch (action) {
      case 'reply':
        setMessageReaction({
          ...message,
          isReply: true
        });
        break;
      case 'copy':
        Clipboard.setString(message.text || '');
        break;
      case 'other':
        break;
      default:
        setMessageReaction(null);
    }
  }, []);
  const onLongPressReaction = useCallback((message, position) => {
    setMessageSelected({
      message,
      position
    });
    setTimeout(() => setIsModalReaction(true), 100);
  }, []);
  const onPressFileInContainer = useCallback((file, isShowAll, arrMedia) => {
    if (isShowAll) {
      setFileMediaAllLocal(arrMedia || {});
      setTimeout(() => setIsMediaAllShow(true), 100);
      return;
    }
    handlePressFile(file);
  }, [handlePressFile]);
  const onVideoRecorded = useCallback(async video => {
    const getThumbnail = await generateThumbnails([{
      uri: normalizeFileUri(video.path),
      id: dayjs().valueOf().toString(),
      size: video?.size || 0
    }]);
    setIsShowCameraModal(false);
    const videoFile = {
      uri: normalizeFileUri(video.path),
      id: dayjs().valueOf().toString(),
      size: video?.size || 0,
      name: video?.path?.split('/').pop() || `video - ${dayjs().valueOf().toString()}`,
      fileExtension: `.${video?.path?.split('.').pop()}`,
      typeFile: 'video',
      width: video?.width,
      height: video?.height,
      duration: video?.duration,
      thumbnailPreview: getThumbnail[0]?.path || ''
    };
    setFileMedia([...fileMedia, videoFile]);
  }, [fileMedia]);
  const onPhotoCaptured = useCallback(photo => {
    setIsShowCameraModal(false);
    const img = {
      uri: normalizeFileUri(photo.path),
      id: dayjs().valueOf().toString(),
      size: photo?.size || 0,
      name: photo?.path?.split('/').pop() || `image - ${dayjs().valueOf().toString()}`,
      fileExtension: `.${photo?.path?.split('.').pop()}`,
      typeFile: 'image',
      thumbnailPreview: normalizeFileUri(photo?.path || ''),
      width: photo?.width,
      height: photo?.height
    };
    setFileMedia([...fileMedia, img]);
  }, [fileMedia]);
  const contextValues = useMemo(() => ({
    actionSheet: actionSheet || (() => ({
      showActionSheetWithOptions: actionSheetRef.current.showActionSheetWithOptions
    })),
    getLocale: () => locale
  }), [actionSheet, locale]);

  // Effects
  useEffect(() => {
    if (props.text != null) setText(props.text);
  }, [props.text]);
  useEffect(() => {
    const prepareMessage = inverted ? messages : [...messages].reverse();
    setArrMessage(prepareMessage);
  }, [messages, inverted]);
  useAnimatedReaction(() => -keyboard.height.value, (value, prevValue) => {
    if (prevValue !== null && value !== prevValue) {
      const isKeyboardMovingUp = value > prevValue;
      if (isKeyboardMovingUp !== trackingKeyboardMovement.value) {
        trackingKeyboardMovement.value = isKeyboardMovingUp;
        keyboardOffsetBottom.value = withTiming(isKeyboardMovingUp ? bottomOffset : 0, {
          duration: bottomOffset ? 150 : 400
        });
        if (focusOnInputWhenOpeningKeyboard) if (isKeyboardMovingUp) runOnJS(handleTextInputFocusWhenKeyboardShow)();else runOnJS(handleTextInputFocusWhenKeyboardHide)();
        if (value === 0) {
          runOnJS(enableTyping)();
        } else {
          runOnJS(disableTyping)();
          runOnJS(debounceEnableTyping)();
        }
      }
    }
  }, [keyboard, trackingKeyboardMovement, focusOnInputWhenOpeningKeyboard, handleTextInputFocusWhenKeyboardHide, handleTextInputFocusWhenKeyboardShow, enableTyping, disableTyping, debounceEnableTyping, bottomOffset]);
  return {
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
    // Config from props
    inverted,
    isTyping,
    keyboardShouldPersistTaps,
    useScrollView,
    isKeyboardInternallyHandled,
    isShowEmojiReaction,
    renderInputToolbar,
    maxInputLength,
    minComposerHeight,
    maxComposerHeight,
    textInputProps,
    labelReaction,
    onFocusInput,
    onBlurInput,
    user,
    locale,
    actionSheet,
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
    scrollToBottom,
    contextValues
  };
}
//# sourceMappingURL=useGiftedChat.js.map