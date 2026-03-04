"use strict";

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import DayAnimated from "./components/DayAnimated/index.js";
import Item from "./components/Item/index.js";
import { LoadEarlier } from "../LoadEarlier.js";
import TypingIndicator from "../TypingIndicator.js";
import stylesCommon from "../styles.js";
import styles from "./styles.js";
import { isSameDay } from "../utils.js";
import { useAutoScroll } from "../hooks/useAutoScroll.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export * from "./types.js";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
function MessageContainer(props) {
  const {
    messages = [],
    user,
    isTyping = false,
    renderChatEmpty: renderChatEmptyProp,
    onLoadEarlier,
    inverted = true,
    loadEarlier = false,
    listViewProps,
    invertibleScrollViewProps,
    extraData = null,
    isScrollToBottomEnabled = false,
    scrollToBottomOffset = 200,
    alignTop = false,
    scrollToBottomStyle,
    infiniteScroll = false,
    isLoadingEarlier = false,
    renderTypingIndicator: renderTypingIndicatorProp,
    renderFooter: renderFooterProp,
    renderLoadEarlier: renderLoadEarlierProp,
    forwardRef,
    handleOnScroll: handleOnScrollProp,
    scrollToBottomComponent: scrollToBottomComponentProp,
    renderDay: renderDayProp,
    onPressFile,
    onLongPressReaction,
    useScrollView = false
  } = props;
  const {
    scrollToBottomOpacity,
    daysPositions,
    listHeight,
    scrolledY,
    isScrollToBottomVisible,
    doScrollToBottom,
    scrollHandler,
    scrollHandlerForScrollView,
    onScrollBeginDrag,
    onEndReached,
    onLayoutList
  } = useAutoScroll({
    messages,
    inverted,
    isTyping,
    isLoadingEarlier,
    loadEarlier,
    infiniteScroll,
    scrollToBottomOffset,
    forwardRef,
    useScrollView,
    onLoadEarlier,
    handleOnScrollProp,
    listViewProps
  });
  const scrollToBottomStyleAnim = useAnimatedStyle(() => ({
    opacity: scrollToBottomOpacity.value
  }), [scrollToBottomOpacity]);
  const renderTypingIndicator = useCallback(() => {
    if (renderTypingIndicatorProp) return renderTypingIndicatorProp();
    return /*#__PURE__*/_jsx(TypingIndicator, {
      isTyping: isTyping
    });
  }, [isTyping, renderTypingIndicatorProp]);
  const ListFooterComponent = useMemo(() => {
    if (renderFooterProp) return /*#__PURE__*/_jsx(_Fragment, {
      children: renderFooterProp(props)
    });
    return /*#__PURE__*/_jsx(_Fragment, {
      children: renderTypingIndicator()
    });
  }, [renderFooterProp, renderTypingIndicator, props]);
  const renderLoadEarlier = useCallback(() => {
    if (loadEarlier) {
      if (renderLoadEarlierProp) return renderLoadEarlierProp(props);
      return /*#__PURE__*/_jsx(LoadEarlier, {
        ...props
      });
    }
    return null;
  }, [loadEarlier, renderLoadEarlierProp, props]);
  const keyExtractor = useCallback(item => item._id.toString(), []);
  const renderItem = useCallback(({
    item,
    index
  }) => {
    const messageItem = item;
    if (!messageItem._id && messageItem._id !== 0) console.warn('GiftedChat: `_id` is missing for message', JSON.stringify(item));
    if (!messageItem.user) {
      if (!messageItem.system) console.warn('GiftedChat: `user` is missing for message', JSON.stringify(messageItem));
      messageItem.user = {
        _id: 0
      };
    }
    const {
      messages,
      ...restProps
    } = props;
    if (messages && user) {
      const previousMessage = (inverted ? messages[index + 1] : messages[index - 1]) || {};
      const nextMessage = (inverted ? messages[index - 1] : messages[index + 1]) || {};
      const messageProps = {
        ...restProps,
        currentMessage: messageItem,
        previousMessage,
        nextMessage,
        position: messageItem.user._id === user._id ? 'right' : 'left',
        scrolledY,
        daysPositions,
        listHeight,
        onPressFile,
        onLongPressReaction
      };
      return /*#__PURE__*/_jsx(Item, {
        ...messageProps
      });
    }
    return null;
  }, [props, inverted, scrolledY, daysPositions, listHeight, user, onPressFile, onLongPressReaction]);
  const renderChatEmpty = useCallback(() => {
    if (renderChatEmptyProp) return inverted ? renderChatEmptyProp() : /*#__PURE__*/_jsx(View, {
      style: [stylesCommon.fill, styles.emptyChatContainer],
      children: renderChatEmptyProp()
    });
    return /*#__PURE__*/_jsx(View, {
      style: stylesCommon.fill
    });
  }, [inverted, renderChatEmptyProp]);
  const ListHeaderComponent = useMemo(() => {
    const content = renderLoadEarlier();
    if (!content) return null;
    return /*#__PURE__*/_jsx(View, {
      style: stylesCommon.fill,
      children: content
    });
  }, [renderLoadEarlier]);
  const renderScrollBottomComponent = useCallback(() => {
    if (scrollToBottomComponentProp) return scrollToBottomComponentProp();
    return /*#__PURE__*/_jsx(Text, {
      children: 'V'
    });
  }, [scrollToBottomComponentProp]);
  const renderScrollToBottomWrapper = useCallback(() => {
    if (!isScrollToBottomVisible) return null;
    return /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: () => doScrollToBottom(),
      children: /*#__PURE__*/_jsx(Animated.View, {
        style: [stylesCommon.centerItems, styles.scrollToBottomStyle, scrollToBottomStyle, scrollToBottomStyleAnim],
        children: renderScrollBottomComponent()
      })
    });
  }, [scrollToBottomStyle, renderScrollBottomComponent, doScrollToBottom, scrollToBottomStyleAnim, isScrollToBottomVisible]);
  const renderCell = useCallback(cellProps => {
    const handleOnLayout = event => {
      cellProps.onLayout?.(event);
      const {
        y,
        height
      } = event.nativeEvent.layout;
      const newValue = {
        y,
        height,
        createdAt: new Date(cellProps?.item?.createdAt).getTime()
      };
      daysPositions.modify(value => {
        'worklet';

        const isSameDayFn = (date1, date2) => {
          const d1 = new Date(date1);
          const d2 = new Date(date2);
          return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
        };
        for (const [key, item] of Object.entries(value)) if (isSameDayFn(newValue.createdAt, item.createdAt) && (inverted ? item.y <= newValue.y : item.y >= newValue.y)) {
          delete value[key];
          break;
        }

        // @ts-expect-error: https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue#remarks
        value[cellProps.item._id] = newValue;
        return value;
      });
    };
    return /*#__PURE__*/_jsx(View, {
      ...cellProps,
      onLayout: handleOnLayout,
      children: cellProps.children
    });
  }, [daysPositions, inverted]);

  // Remove unrendered days positions when messages change
  const previousMessagesRef = useRef(messages);
  useEffect(() => {
    previousMessagesRef.current = messages;
    Object.keys(daysPositions.value).forEach(key => {
      const messageIndex = messages.findIndex(m => m._id.toString() === key);
      let shouldRemove = messageIndex === -1;
      if (!shouldRemove) {
        const prevMessage = messages[messageIndex + (inverted ? 1 : -1)];
        const message = messages[messageIndex];
        shouldRemove = !!prevMessage && isSameDay(message, prevMessage);
      }
      if (shouldRemove) daysPositions.modify(value => {
        'worklet';

        delete value[key];
        return value;
      });
    });
  }, [messages, daysPositions, inverted]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.contentContainerStyle, alignTop ? styles.containerAlignTop : stylesCommon.fill],
    children: [useScrollView ? /*#__PURE__*/_jsxs(ScrollView, {
      ref: forwardRef,
      style: stylesCommon.fill,
      automaticallyAdjustContentInsets: false,
      ...invertibleScrollViewProps,
      onScroll: scrollHandlerForScrollView,
      onScrollBeginDrag: onScrollBeginDrag,
      scrollEventThrottle: 1,
      onLayout: onLayoutList,
      nestedScrollEnabled: true,
      children: [inverted ? ListHeaderComponent : null, messages.length === 0 ? renderChatEmpty() : null, messages.map((item, index) => {
        const renderedItem = renderItem({
          item,
          index
        });
        return renderedItem ? /*#__PURE__*/_jsx(View, {
          onLayout: event => renderCell({
            item,
            index,
            onLayout: () => {},
            children: renderedItem
          }).props.onLayout?.(event),
          children: renderedItem
        }, keyExtractor(item)) : null;
      }), inverted ? null : ListFooterComponent]
    }) : /*#__PURE__*/_jsx(AnimatedFlatList, {
      extraData: extraData,
      ref: forwardRef,
      keyExtractor: keyExtractor,
      data: messages,
      renderItem: renderItem,
      inverted: inverted,
      automaticallyAdjustContentInsets: false,
      style: stylesCommon.fill,
      ...invertibleScrollViewProps,
      ListEmptyComponent: renderChatEmpty,
      ListFooterComponent: inverted ? ListHeaderComponent : ListFooterComponent,
      ListHeaderComponent: inverted ? ListFooterComponent : ListHeaderComponent,
      onScroll: scrollHandler,
      scrollEventThrottle: 1,
      onEndReached: onEndReached,
      onEndReachedThreshold: 0.1,
      ...listViewProps,
      onLayout: onLayoutList,
      CellRendererComponent: renderCell,
      maintainVisibleContentPosition: {
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10
      }
    }), isScrollToBottomEnabled ? renderScrollToBottomWrapper() : null, /*#__PURE__*/_jsx(DayAnimated, {
      scrolledY: scrolledY,
      daysPositions: daysPositions,
      listHeight: listHeight,
      renderDay: renderDayProp,
      messages: messages,
      isLoadingEarlier: isLoadingEarlier
    })]
  });
}
export default MessageContainer;
//# sourceMappingURL=index.js.map