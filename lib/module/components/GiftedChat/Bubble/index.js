"use strict";

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useRef, useState } from 'react';
import { findNodeHandle, Text, TouchableWithoutFeedback, UIManager, View } from 'react-native';
import { useChatContext } from "../GiftedChatContext.js";
import { QuickReplies } from "../QuickReplies.js";
import { MessageText } from "../MessageText.js";
import { MessageAudio } from "../MessageAudio.js";
import { Time } from "../Time.js";
import { isSameUser, isSameDay } from "../utils.js";
import stylesCommon from "../styles.js";
import styles from "./styles.js";
import { MessageFile } from "../MessageFile.js";
import Color from "../Color.js";
import { MessageReply } from "../MessageReply.js";
import { MaterialIndicator } from "../IndicatorsMaster/index.js";
import FastImage from 'react-native-fast-image';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export * from "./types.js";
const Bubble = props => {
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
    onLongPressReaction
  } = props;
  const context = useChatContext();
  const [messageWidth, setMessageWidth] = useState(null);
  const innerRef = useRef(null);
  const refArrThumbnail = useRef([]);
  const onPress = useCallback(() => {
    if (props.onPress) props.onPress(context, currentMessage);
  }, [context, props, currentMessage]);
  const onLongPress = useCallback(() => {
    const {
      onLongPress,
      optionTitles
    } = props;
    if (onLongPress) {
      onLongPress(context, currentMessage);
      return;
    }
    if (!optionTitles?.length) return;
    const options = optionTitles;
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, buttonIndex => {
      console.log('onLongPress', {
        buttonIndex
      });
    });
  }, [currentMessage, context, props]);
  const onLongPressItem = useCallback(() => {
    try {
      if (innerRef.current) {
        const node = findNodeHandle(innerRef.current);
        if (node) {
          UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
            onLongPressReaction?.(currentMessage, {
              x,
              y,
              width,
              height,
              pageX,
              pageY
            });
          });
        }
      }
    } catch (error) {
      console.log('onLongPressItem', error);
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
    if (currentMessage && previousMessage && position && isSameUser(currentMessage, previousMessage) && isSameDay(currentMessage, previousMessage)) return [styles[position].containerToPrevious, containerToPreviousStyle && containerToPreviousStyle[position]];
    return null;
  }, [currentMessage, previousMessage, position, containerToPreviousStyle]);
  const renderQuickReplies = useCallback(() => {
    if (currentMessage?.quickReplies) {
      const {
        containerStyle,
        wrapperStyle,
        ...quickReplyProps
      } = props;
      if (props.renderQuickReplies) return props.renderQuickReplies(quickReplyProps);
      return /*#__PURE__*/_jsx(QuickReplies, {
        currentMessage: currentMessage,
        onQuickReply: onQuickReply,
        renderQuickReplySend: renderQuickReplySend,
        quickReplyStyle: quickReplyStyle,
        quickReplyTextStyle: quickReplyTextStyle,
        quickReplyContainerStyle: quickReplyContainerStyle,
        nextMessage: nextMessage
      });
    }
    return null;
  }, [currentMessage, onQuickReply, renderQuickReplySend, quickReplyStyle, quickReplyTextStyle, quickReplyContainerStyle, nextMessage, props]);
  const onSaveThumbnail = useCallback(file => {
    refArrThumbnail.current = file;
  }, []);
  const renderMessageText = useCallback(() => {
    if (currentMessage?.text) {
      const {
        containerStyle,
        wrapperStyle,
        optionTitles,
        ...messageTextProps
      } = props;
      if (props.renderMessageText) return props.renderMessageText(messageTextProps);
      return /*#__PURE__*/_jsx(MessageText, {
        ...messageTextProps
      });
    }
    return null;
  }, [props, currentMessage]);
  const renderMessageFile = useCallback(() => {
    if (!currentMessage?.file) return null;
    const {
      containerStyle,
      wrapperStyle,
      ...messageFileProps
    } = props;
    if (props.renderCustomMessageFile) return props.renderCustomMessageFile(messageFileProps);
    return /*#__PURE__*/_jsx(MessageFile, {
      onLongPressFile: onLongPressItem,
      onSaveThumbnail: onSaveThumbnail,
      onPressFile: onPressFile,
      messageWidth: messageWidth,
      ...messageFileProps
    });
  }, [currentMessage, props, messageWidth, onPressFile, onSaveThumbnail, onLongPressItem]);
  const renderMessageAudio = useCallback(() => {
    if (!currentMessage?.audio) return null;
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      wrapperStyle,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...messageAudioProps
    } = props;
    if (props.renderMessageAudio) return props.renderMessageAudio(messageAudioProps);
    return /*#__PURE__*/_jsx(MessageAudio, {});
  }, [props, currentMessage]);
  const renderTicks = useCallback(() => {
    const {
      renderTicks,
      user
    } = props;
    if (renderTicks && currentMessage) return renderTicks(currentMessage);
    if (user && currentMessage?.user && currentMessage.user._id !== user._id) return null;
    if (currentMessage && (currentMessage.sent || currentMessage.received || currentMessage.pending)) return /*#__PURE__*/_jsxs(View, {
      style: styles.content.tickView,
      children: [!!currentMessage.sent && /*#__PURE__*/_jsx(Text, {
        style: [styles.content.tick, props.tickStyle],
        children: '✓'
      }), !!currentMessage.received && /*#__PURE__*/_jsx(Text, {
        style: [styles.content.tick, props.tickStyle],
        children: '✓'
      }), !!currentMessage.pending && /*#__PURE__*/_jsx(Text, {
        style: [styles.content.tick, props.tickStyle],
        children: '🕓'
      })]
    });
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
      return /*#__PURE__*/_jsx(Time, {
        ...timeProps
      });
    }
    return null;
  }, [props, currentMessage]);
  const renderUsername = useCallback(() => {
    const {
      user,
      renderUsername
    } = props;
    if (props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) return null;
      if (renderUsername) return renderUsername(currentMessage.user);
      return /*#__PURE__*/_jsx(View, {
        style: styles.content.usernameView,
        children: /*#__PURE__*/_jsxs(Text, {
          style: [styles.content.username, props.usernameStyle],
          children: ['~ ', currentMessage.user.name]
        })
      });
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
    const reactionEmoji = [...new Set((Array.isArray(currentMessage?.reactionEmoji) ? currentMessage.reactionEmoji : []).map(item => item?.reaction))];
    if (reactionEmoji && reactionEmoji?.length > 0) {
      return /*#__PURE__*/_jsxs(View, {
        style: [{
          backgroundColor: Color.white,
          position: 'absolute',
          minWidth: 36,
          width: 18 * reactionEmoji?.length + 12,
          height: 18,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Color.leftBubbleBackground,
          bottom: -32,
          zIndex: 10,
          shadowColor: Color.leftBubbleBackground,
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
          flexDirection: 'row',
          gap: 2
        }, reactionPosition === 'right' && {
          left: reactionEmoji?.length ? -12 * (reactionEmoji?.length - 1) : -12
        }, reactionPosition === 'left' && {
          right: reactionEmoji?.length ? -12 * (reactionEmoji?.length - 1) : -12
        }],
        children: [reactionEmoji?.map((item, index) => /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10
          },
          children: item
        }, index)), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 12
          },
          children: currentMessage?.reactionEmoji?.length
        })]
      });
    }
    return null;
  }, [currentMessage.reactionEmoji, currentMessage.user._id, props?.user?._id]);
  const renderBubbleContent = useCallback(() => {
    return /*#__PURE__*/_jsxs(View, {
      children: [!props.isCustomViewBottom && renderCustomView(), renderMessageFile(), renderMessageAudio(), renderMessageText(), renderReactionEmoji(), props.isCustomViewBottom && renderCustomView()]
    });
  }, [renderCustomView, renderMessageAudio, renderMessageText, props.isCustomViewBottom, renderMessageFile, renderReactionEmoji]);
  const renderMessageReply = useCallback(() => {
    if (currentMessage?.messageReply) {
      return /*#__PURE__*/_jsx(MessageReply, {
        messageReply: currentMessage?.messageReply,
        onSaveThumbnail: onSaveThumbnail,
        onPressFile: onPressFile
      });
    }
    return null;
  }, [currentMessage, onSaveThumbnail, onPressFile]);
  return /*#__PURE__*/_jsxs(View, {
    style: [stylesCommon.fill, styles[position].container, containerStyle && containerStyle[position], {
      marginBottom: currentMessage?.isLast ? 12 : 8,
      maxWidth: '90%'
    }],
    onLayout: e => {
      if (currentMessage?._id) {
        setMessageWidth({
          width: e.nativeEvent.layout.width,
          _id: currentMessage?._id.toString()
        });
      }
    },
    children: [currentMessage?.isShowName && /*#__PURE__*/_jsx(View, {
      style: styles.content.layoutName,
      children: /*#__PURE__*/_jsx(Text, {
        numberOfLines: 1,
        style: styles.content.name,
        children: currentMessage?.user?.name
      })
    }), renderMessageReply(), /*#__PURE__*/_jsx(View, {
      style: [styles[position].wrapper,
      // styledBubbleToNext(),
      styledBubbleToPrevious(), wrapperStyle && wrapperStyle[position]],
      children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
        onPress: onPress,
        onLongPress: onLongPressItem || onLongPress,
        delayLongPress: 100,
        ...props.touchableProps,
        children: /*#__PURE__*/_jsxs(View, {
          ref: innerRef,
          children: [renderBubbleContent(), /*#__PURE__*/_jsxs(View, {
            style: [styles[position].bottom, bottomContainerStyle?.[position], currentMessage?.reactionEmoji && currentMessage?.reactionEmoji?.length > 0 && {
              marginBottom: 8
            }],
            children: [renderUsername(), renderTime(), renderTicks()]
          })]
        })
      })
    }), renderQuickReplies(), currentMessage?.isSending && /*#__PURE__*/_jsx(View, {
      style: {
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8
      },
      children: /*#__PURE__*/_jsx(MaterialIndicator, {
        color: Color.defaultColor,
        size: 12,
        animationDuration: 6000
      })
    }), currentMessage?.errorMessage && !currentMessage?.isSending && /*#__PURE__*/_jsxs(View, {
      style: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
      },
      children: [/*#__PURE__*/_jsx(FastImage, {
        source: require('../assets/warning.png'),
        style: {
          width: 12,
          height: 12
        }
      }), /*#__PURE__*/_jsx(Text, {
        style: {
          fontSize: 12,
          fontWeight: '500',
          color: Color.alizarin
        },
        children: currentMessage?.errorMessage
      })]
    })]
  });
};
export default Bubble;
//# sourceMappingURL=index.js.map