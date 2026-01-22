"use strict";

import { useState, useMemo, useCallback } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Color from "./Color.js";
import stylesCommon from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 300
  },
  quickReply: {
    borderWidth: 1,
    maxWidth: 200,
    paddingVertical: 7,
    paddingHorizontal: 12,
    minHeight: 50,
    borderRadius: 13,
    margin: 3
  },
  quickReplyText: {
    overflow: 'visible'
  },
  sendLink: {
    borderWidth: 0
  },
  sendLinkText: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17
  }
});
const sameReply = currentReply => reply => currentReply.value === reply.value;
const diffReply = currentReply => reply => currentReply.value !== reply.value;
export function QuickReplies({
  currentMessage,
  nextMessage,
  color = Color.peterRiver,
  quickReplyStyle,
  quickReplyTextStyle,
  quickReplyContainerStyle,
  onQuickReply,
  sendText = 'Send',
  renderQuickReplySend
}) {
  const {
    type
  } = currentMessage.quickReplies;
  const [replies, setReplies] = useState([]);
  const shouldComponentDisplay = useMemo(() => {
    const hasReplies = !!currentMessage && !!currentMessage.quickReplies;
    const hasNext = !!nextMessage && !!nextMessage._id;
    const keepIt = currentMessage.quickReplies.keepIt;
    if (hasReplies && !hasNext) return true;
    if (hasReplies && hasNext && keepIt) return true;
    return false;
  }, [currentMessage, nextMessage]);
  const handleSend = useCallback(repliesData => () => {
    onQuickReply?.(repliesData.map(reply => ({
      ...reply,
      messageId: currentMessage._id
    })));
  }, [onQuickReply, currentMessage]);
  const handlePress = useCallback(reply => () => {
    if (currentMessage) {
      const {
        type
      } = currentMessage.quickReplies;
      switch (type) {
        case 'radio':
          {
            handleSend([reply])();
            return;
          }
        case 'checkbox':
          {
            if (replies.find(sameReply(reply))) setReplies(replies.filter(diffReply(reply)));else setReplies([...replies, reply]);
            return;
          }
        default:
          {
            console.warn(`onQuickReply unknown type: ${type}`);
          }
      }
    }
  }, [replies, currentMessage, handleSend]);
  if (!shouldComponentDisplay) return null;
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, quickReplyContainerStyle],
    children: [currentMessage.quickReplies.values.map((reply, index) => {
      const selected = type === 'checkbox' && replies.find(sameReply(reply));
      return /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: handlePress(reply),
        style: [stylesCommon.centerItems, styles.quickReply, quickReplyStyle, {
          borderColor: color
        }, selected && {
          backgroundColor: color
        }],
        children: /*#__PURE__*/_jsx(Text, {
          numberOfLines: 10,
          ellipsizeMode: "tail",
          style: [styles.quickReplyText, {
            color: selected ? Color.white : color
          }, quickReplyTextStyle],
          children: reply.title
        })
      }, `${reply.value}-${index}`);
    }), replies.length > 0 && /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [stylesCommon.centerItems, styles.quickReply, styles.sendLink],
      onPress: handleSend(replies),
      children: renderQuickReplySend?.() || /*#__PURE__*/_jsx(Text, {
        style: styles.sendLinkText,
        children: sendText
      })
    })]
  });
}
//# sourceMappingURL=QuickReplies.js.map