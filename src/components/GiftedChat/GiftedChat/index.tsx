import { useMemo } from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { View } from 'react-native';
import { Actions } from '../Actions';
import { Avatar } from '../Avatar';
import Bubble from '../Bubble';
import { Composer } from '../Composer';
import { TEST_ID } from '../Constant';
import { Day } from '../Day';
import { GiftedAvatar } from '../GiftedAvatar';
import { GiftedChatContext } from '../GiftedChatContext';
import { LoadEarlier } from '../LoadEarlier';
import Message from '../Message';
import MessageContainer from '../MessageContainer';
import { MessageText } from '../MessageText';
import { type IMessage } from '../types';
import { Send } from '../Send';
import { SystemMessage } from '../SystemMessage';
import { Time } from '../Time';
import * as utils from '../utils';
import Animated from 'react-native-reanimated';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { type GiftedChatProps } from './types';

import stylesCommon from '../styles';
import styles from './styles';
import { useGiftedChat } from '../hooks/useGiftedChat';
import { ModalsContainer } from './ModalsContainer';
import { InputToolbarFragment } from './InputToolbarFragment';

dayjs.extend(localizedFormat);

function GiftedChat<TMessage extends IMessage = IMessage>(
  props: GiftedChatProps<TMessage>
) {
  const { renderLoading, renderChatFooter = null } = props;

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
    contextValues,
  } = useGiftedChat<TMessage>(props);

  const renderMessages = useMemo(() => {
    if (!isInitialized) return null;

    const { messagesContainerStyle, ...messagesContainerProps } = props;

    return (
      <View style={[stylesCommon.fill, messagesContainerStyle]}>
        <MessageContainer<TMessage>
          {...messagesContainerProps}
          invertibleScrollViewProps={{
            inverted,
            keyboardShouldPersistTaps,
          }}
          messages={arrMessage}
          forwardRef={messageContainerRef}
          isTyping={isTyping}
          useScrollView={useScrollView}
          onLongPressReaction={onLongPressReaction}
          onPressFile={onPressFileInContainer}
        />
        {renderChatFooter?.()}
      </View>
    );
  }, [
    isInitialized,
    isTyping,
    arrMessage,
    props,
    inverted,
    keyboardShouldPersistTaps,
    messageContainerRef,
    renderChatFooter,
    useScrollView,
    onLongPressReaction,
    onPressFileInContainer,
  ]);

  return (
    <GiftedChatContext.Provider value={contextValues}>
      <ActionSheetProvider ref={actionSheetRef}>
        <View
          testID={TEST_ID.WRAPPER}
          style={[stylesCommon.fill, styles.contentContainer]}
          onLayout={onInitialLayoutViewLayout}
        >
          {isInitialized ? (
            <Animated.View
              style={[
                stylesCommon.fill,
                isKeyboardInternallyHandled && contentStyleAnim,
              ]}
            >
              {renderMessages}
              <InputToolbarFragment<TMessage>
                isInitialized={isInitialized}
                props={props}
                getTextFromProp={getTextFromProp}
                text={text}
                composerHeight={composerHeight}
                minComposerHeight={minComposerHeight!}
                _onSend={_onSend}
                onInputSizeChanged={onInputSizeChanged}
                _onInputTextChanged={_onInputTextChanged}
                textInputProps={textInputProps}
                textInputRef={textInputRef}
                isTypingDisabled={isTypingDisabled}
                maxInputLength={maxInputLength}
                renderInputToolbar={renderInputToolbar}
                user={user}
                messageReaction={messageReaction}
                setMessageReaction={setMessageReaction}
                fileMedia={fileMedia}
                setFileMedia={setFileMedia}
                handlePressFile={handlePressFile}
                onPressPickMedia={onPressPickMedia}
                labelReaction={labelReaction}
                onFocusInput={onFocusInput}
                onBlurInput={onBlurInput}
              />
              <View style={styles.overlayContainer}>
                <ModalsContainer<TMessage>
                  isImageViewerVisible={isImageViewerVisible}
                  fileSelected={fileSelected}
                  setIsImageViewerVisible={setIsImageViewerVisible}
                  isShowVideoModal={isShowVideoModal}
                  setIsShowVideoModal={setIsShowVideoModal}
                  isShowEmojiReaction={isShowEmojiReaction}
                  isModalReaction={isModalReaction}
                  setIsModalReaction={setIsModalReaction}
                  messageSelected={messageSelected}
                  user={user}
                  handleReactionEmoji={handleReactionEmoji}
                  handleActionReaction={handleActionReaction}
                  isMediaAllShow={isMediaAllShow}
                  setIsMediaAllShow={setIsMediaAllShow}
                  fileMediaAllLocal={fileMediaAllLocal}
                  handlePressFile={handlePressFile}
                  isShowCameraModal={isShowCameraModal}
                  setIsShowCameraModal={setIsShowCameraModal}
                  onVideoRecorded={onVideoRecorded}
                  onPhotoCaptured={onPhotoCaptured}
                />
              </View>
            </Animated.View>
          ) : (
            renderLoading?.()
          )}
        </View>
      </ActionSheetProvider>
    </GiftedChatContext.Provider>
  );
}

function GiftedChatWrapper<TMessage extends IMessage = IMessage>(
  props: GiftedChatProps<TMessage>
) {
  return (
    <KeyboardProvider>
      <GiftedChat<TMessage> {...props} />
    </KeyboardProvider>
  );
}

GiftedChatWrapper.append = <TMessage extends IMessage>(
  currentMessages: TMessage[] = [],
  messages: TMessage[],
  inverted = true
) => {
  if (!Array.isArray(messages)) messages = [messages];

  return inverted
    ? messages.concat(currentMessages)
    : currentMessages.concat(messages);
};

GiftedChatWrapper.prepend = <TMessage extends IMessage>(
  currentMessages: TMessage[] = [],
  messages: TMessage[],
  inverted = true
) => {
  if (!Array.isArray(messages)) messages = [messages];

  return inverted
    ? currentMessages.concat(messages)
    : messages.concat(currentMessages);
};

export * from '../types';

export {
  GiftedChatWrapper as GiftedChat,
  Actions,
  Avatar,
  Bubble,
  SystemMessage,
  MessageText,
  Composer,
  Day,
  LoadEarlier,
  Message,
  MessageContainer,
  Send,
  Time,
  GiftedAvatar,
  utils,
};
