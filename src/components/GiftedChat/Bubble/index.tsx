/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useRef, useState } from 'react';
import type { JSX } from 'react';
import {
  findNodeHandle,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';

import { useChatContext } from '../GiftedChatContext';
import { QuickReplies } from '../QuickReplies';
import { MessageText } from '../MessageText';
import { MessageAudio } from '../MessageAudio';
import { Time } from '../Time';

import { isSameUser, isSameDay } from '../utils';
import type { FileMessage, IMessage } from '../types';
import type { BubbleProps } from './types';

import stylesCommon from '../styles';
import styles from './styles';
import { MessageFile } from '../MessageFile';
import Color from '../Color';
import { MessageReply } from '../MessageReply';
import { MaterialIndicator } from '../IndicatorsMaster';
import FastImage from 'react-native-fast-image';

export * from './types';

const Bubble = <TMessage extends IMessage = IMessage>(
  props: BubbleProps<TMessage>
): JSX.Element => {
  const {
    currentMessage,
    nextMessage,
    position,
    // containerToNextStyle,
    previousMessage,
    containerToPreviousStyle,
    onQuickReply,
    renderQuickReplySend,
    quickReplyStyle,
    quickReplyTextStyle,
    quickReplyContainerStyle,
    containerStyle,
    wrapperStyle,
    bottomContainerStyle,
    onPressFile,
    onLongPressReaction,
  }: any = props;

  const context = useChatContext();
  const [messageWidth, setMessageWidth] = useState<{
    width: number;
    _id: string;
  } | null>(null);
  const innerRef = useRef<any>(null);
  const refArrThumbnail = useRef<FileMessage[]>([]);

  const onPress = useCallback(() => {
    if (props.onPress) props.onPress(context, currentMessage);
  }, [context, props, currentMessage]);

  const onLongPress = useCallback(() => {
    const { onLongPress, optionTitles } = props;

    if (onLongPress) {
      onLongPress(context, currentMessage);
      return;
    }

    if (!optionTitles?.length) return;

    const options = optionTitles;
    const cancelButtonIndex = options.length - 1;

    (context as any).actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (_buttonIndex: number) => {
        // No-op: action sheet selection
      }
    );
  }, [currentMessage, context, props]);

  const onLongPressItem = useCallback(() => {
    try {
      if (innerRef.current) {
        const node = findNodeHandle(innerRef.current);
        if (node) {
          UIManager.measure(
            node,
            (
              x: number,
              y: number,
              width: number,
              height: number,
              pageX: number,
              pageY: number
            ) => {
              onLongPressReaction?.(currentMessage, {
                x,
                y,
                width,
                height,
                pageX,
                pageY,
              });
            }
          );
        }
      }
    } catch (error) {
      // Silent fail for measure errors
    }
  }, [currentMessage, onLongPressReaction]);

  // const styledBubbleToNext = useCallback(() => {
  //   if (
  //     currentMessage &&
  //     nextMessage &&
  //     position &&
  //     isSameUser(currentMessage, nextMessage) &&
  //     isSameDay(currentMessage, nextMessage)
  //   )
  //     return [styles[position].containerToNext, containerToNextStyle?.[position]];

  //   return null;
  // }, [currentMessage, nextMessage, position, containerToNextStyle]);

  const styledBubbleToPrevious = useCallback(() => {
    if (
      currentMessage &&
      previousMessage &&
      position &&
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    )
      return [
        styles[position as 'left' | 'right'].containerToPrevious,
        containerToPreviousStyle && containerToPreviousStyle[position],
      ];

    return null;
  }, [currentMessage, previousMessage, position, containerToPreviousStyle]);

  const renderQuickReplies = useCallback(() => {
    if (currentMessage?.quickReplies) {
      const { ...quickReplyProps } = props;

      if (props.renderQuickReplies)
        return props.renderQuickReplies(quickReplyProps);

      return (
        <QuickReplies
          currentMessage={currentMessage}
          onQuickReply={onQuickReply}
          renderQuickReplySend={renderQuickReplySend}
          quickReplyStyle={quickReplyStyle}
          quickReplyTextStyle={quickReplyTextStyle}
          quickReplyContainerStyle={quickReplyContainerStyle}
          nextMessage={nextMessage}
        />
      );
    }

    return null;
  }, [
    currentMessage,
    onQuickReply,
    renderQuickReplySend,
    quickReplyStyle,
    quickReplyTextStyle,
    quickReplyContainerStyle,
    nextMessage,
    props,
  ]);

  const onSaveThumbnail = useCallback((file: FileMessage[]) => {
    refArrThumbnail.current = file;
  }, []);

  const renderMessageText = useCallback(() => {
    if (currentMessage?.text) {
      const { ...messageTextProps } = props;

      if (props.renderMessageText)
        return props.renderMessageText(messageTextProps);

      return <MessageText {...messageTextProps} />;
    }
    return null;
  }, [props, currentMessage]);

  const renderMessageFile = useCallback(() => {
    if (!currentMessage?.file) return null;

    const { ...messageFileProps } = props;

    if (props.renderCustomMessageFile)
      return props.renderCustomMessageFile(messageFileProps as any);

    return (
      <MessageFile
        onLongPressFile={onLongPressItem}
        onSaveThumbnail={onSaveThumbnail}
        onPressFile={onPressFile}
        messageWidth={messageWidth}
        {...messageFileProps}
      />
    );
  }, [
    currentMessage,
    props,
    messageWidth,
    onPressFile,
    onSaveThumbnail,
    onLongPressItem,
  ]);

  const renderMessageAudio = useCallback(() => {
    if (!currentMessage?.audio) return null;

    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      wrapperStyle,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...messageAudioProps
    } = props;

    if (props.renderMessageAudio)
      return props.renderMessageAudio(messageAudioProps);

    return <MessageAudio />;
  }, [props, currentMessage]);

  const renderTicks = useCallback(() => {
    const { renderTicks, user } = props;

    if (renderTicks && currentMessage) return renderTicks(currentMessage);

    if (user && currentMessage?.user && currentMessage.user._id !== user._id)
      return null;

    if (
      currentMessage &&
      (currentMessage.sent || currentMessage.received || currentMessage.pending)
    )
      return (
        <View style={styles.content.tickView}>
          {!!currentMessage.sent && (
            <Text style={[styles.content.tick, props.tickStyle]}>{'✓'}</Text>
          )}
          {!!currentMessage.received && (
            <Text style={[styles.content.tick, props.tickStyle]}>{'✓'}</Text>
          )}
          {!!currentMessage.pending && (
            <Text style={[styles.content.tick, props.tickStyle]}>{'🕓'}</Text>
          )}
        </View>
      );

    return null;
  }, [props, currentMessage]);

  const renderTime = useCallback(() => {
    if (currentMessage?.createdAt) {
      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        containerStyle,
        wrapperStyle,
        textStyle,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...timeProps
      } = props;

      if (props.renderTime) return props.renderTime(timeProps);

      return <Time {...timeProps} />;
    }
    return null;
  }, [props, currentMessage]);

  const renderUsername = useCallback(() => {
    const { user, renderUsername } = props;

    if (props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) return null;

      if (renderUsername) return renderUsername(currentMessage.user);

      return (
        <View style={styles.content.usernameView}>
          <Text style={[styles.content.username, props.usernameStyle]}>
            {'~ '}
            {currentMessage.user.name}
          </Text>
        </View>
      );
    }

    return null;
  }, [currentMessage, props]);

  const renderCustomView = useCallback(() => {
    if (props.renderCustomView) return props.renderCustomView(props);

    return null;
  }, [props]);

  const renderReactionEmoji = useCallback(() => {
    const isCurrentUser = currentMessage.user._id === props?.user?._id;

    const reactionPosition = isCurrentUser ? 'right' : 'left';
    const reactionEmoji = [
      ...new Set(
        (Array.isArray(currentMessage?.reactionEmoji)
          ? currentMessage.reactionEmoji
          : []
        ).map((item: any) => item?.reaction)
      ),
    ];

    if (reactionEmoji && reactionEmoji?.length > 0) {
      return (
        <View
          style={[
            styles.content.reactionEmojiContainer,
            {
              width: 18 * reactionEmoji?.length + 12,
            },
            reactionPosition === 'right' && {
              left: reactionEmoji?.length
                ? -12 * (reactionEmoji?.length - 1)
                : -12,
            },
            reactionPosition === 'left' && {
              right: reactionEmoji?.length
                ? -12 * (reactionEmoji?.length - 1)
                : -12,
            },
          ]}
        >
          {reactionEmoji?.map((item, index) => (
            <Text key={index} style={styles.content.reactionEmojiText}>
              {item as string}
            </Text>
          ))}
          <Text style={styles.content.reactionEmojiCount}>
            {currentMessage?.reactionEmoji?.length}
          </Text>
        </View>
      );
    }
    return null;
  }, [currentMessage.reactionEmoji, currentMessage.user._id, props?.user?._id]);

  const renderBubbleContent = useCallback(() => {
    return (
      <View>
        {!props.isCustomViewBottom && renderCustomView()}
        {renderMessageFile()}
        {renderMessageAudio()}
        {renderMessageText()}
        {renderReactionEmoji()}
        {props.isCustomViewBottom && renderCustomView()}
      </View>
    );
  }, [
    renderCustomView,
    renderMessageAudio,
    renderMessageText,
    props.isCustomViewBottom,
    renderMessageFile,
    renderReactionEmoji,
  ]);

  const renderMessageReply = useCallback(() => {
    if (currentMessage?.messageReply) {
      return (
        <MessageReply
          messageReply={currentMessage?.messageReply}
          onSaveThumbnail={onSaveThumbnail}
          onPressFile={onPressFile}
        />
      );
    }
    return null;
  }, [currentMessage, onSaveThumbnail, onPressFile]);

  return (
    <View
      style={[
        stylesCommon.fill,
        styles[position as 'left' | 'right'].container,
        containerStyle && containerStyle[position],
        currentMessage?.isLast
          ? styles.content.containerLastMargin
          : styles.content.containerDefaultMargin,
        styles.content.containerMaxWidth,
      ]}
      onLayout={(e) => {
        if (currentMessage?._id) {
          setMessageWidth({
            width: e.nativeEvent.layout.width,
            _id: currentMessage?._id.toString(),
          });
        }
      }}
    >
      {currentMessage?.isShowName && (
        <View style={styles.content.layoutName}>
          <Text numberOfLines={1} style={styles.content.name}>
            {currentMessage?.user?.name}
          </Text>
        </View>
      )}

      {renderMessageReply()}
      <View
        style={[
          styles[position as 'left' | 'right'].wrapper,
          // styledBubbleToNext(),
          styledBubbleToPrevious(),
          wrapperStyle && wrapperStyle[position],
        ]}
      >
        <TouchableWithoutFeedback
          onPress={onPress}
          onLongPress={onLongPressItem || onLongPress}
          delayLongPress={100}
          {...props.touchableProps}
        >
          <View ref={innerRef}>
            {renderBubbleContent()}
            <View
              style={[
                styles[position as 'left' | 'right'].bottom,
                bottomContainerStyle?.[position],
                currentMessage?.reactionEmoji &&
                  currentMessage?.reactionEmoji?.length > 0 &&
                  styles.content.reactionMarginBottom,
              ]}
            >
              {renderUsername()}
              {renderTime()}
              {renderTicks()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {renderQuickReplies()}
      {currentMessage?.isSending && (
        <View style={styles.content.sendingIndicator}>
          <MaterialIndicator
            color={Color.defaultColor}
            size={12}
            animationDuration={6000}
          />
        </View>
      )}
      {currentMessage?.errorMessage && !currentMessage?.isSending && (
        <View style={styles.content.errorContainer}>
          <FastImage
            source={require('../assets/warning.png')}
            style={styles.content.errorIcon as any}
          />
          <Text style={styles.content.errorText}>
            {currentMessage?.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Bubble;
