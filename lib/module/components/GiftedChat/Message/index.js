"use strict";

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { isEqual } from 'lodash';
import { Avatar } from "../Avatar.js";
import Bubble from "../Bubble/index.js";
import { SystemMessage } from "../SystemMessage.js";
import { isSameUser } from "../utils.js";
import styles from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export * from "./types.js";
let Message = props => {
  const {
    currentMessage,
    renderBubble: renderBubbleProp,
    renderSystemMessage: renderSystemMessageProp,
    onMessageLayout,
    nextMessage,
    position,
    containerStyle,
    user,
    showUserAvatar,
    onPressFile,
    onLongPressReaction
  } = props;
  const renderBubble = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      containerStyle,
      onMessageLayout,
      ...rest
    } = props;
    if (renderBubbleProp) return renderBubbleProp(rest);
    return /*#__PURE__*/_jsx(Bubble, {
      ...rest,
      onPressFile: onPressFile,
      onLongPressReaction: onLongPressReaction
    });
  }, [props, renderBubbleProp, onPressFile, onLongPressReaction]);
  const renderSystemMessage = useCallback(() => {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      onMessageLayout,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...rest
    } = props;
    if (renderSystemMessageProp) return renderSystemMessageProp(rest);
    return /*#__PURE__*/_jsx(SystemMessage, {
      ...rest
    });
  }, [props, renderSystemMessageProp]);
  const renderAvatar = useCallback(() => {
    if (user?._id && currentMessage?.user && user._id === currentMessage.user._id && !showUserAvatar) return null;
    if (currentMessage?.user?.avatar === null) return null;
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      onMessageLayout,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...rest
    } = props;
    return /*#__PURE__*/_jsx(Avatar, {
      ...rest
    });
  }, [props, user, currentMessage, showUserAvatar]);
  if (!currentMessage) return null;
  const sameUser = isSameUser(currentMessage, nextMessage);
  return /*#__PURE__*/_jsx(View, {
    onLayout: onMessageLayout,
    children: currentMessage.system ? renderSystemMessage() : /*#__PURE__*/_jsxs(View, {
      style: [styles[position].container, {
        marginBottom: sameUser ? 2 : 10
      }, !props.inverted && {
        marginBottom: 2
      }, containerStyle?.[position]],
      children: [position === 'left' ? renderAvatar() : null, renderBubble(), position === 'right' ? renderAvatar() : null]
    })
  });
};
Message = /*#__PURE__*/memo(Message, (props, nextProps) => {
  const shouldUpdate = props.shouldUpdateMessage?.(props, nextProps) || !isEqual(props.currentMessage, nextProps.currentMessage) || !isEqual(props.previousMessage, nextProps.previousMessage) || !isEqual(props.nextMessage, nextProps.nextMessage);
  if (shouldUpdate) return false;
  return true;
});
export default Message;
//# sourceMappingURL=index.js.map