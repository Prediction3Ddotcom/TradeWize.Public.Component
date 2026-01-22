"use strict";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Platform, FlatList, ScrollView } from 'react-native';
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DayAnimated from "./components/DayAnimated/index.js";
import Item from "./components/Item/index.js";
import { LoadEarlier } from "../LoadEarlier.js";
import TypingIndicator from "../TypingIndicator.js";
import stylesCommon from "../styles.js";
import styles from "./styles.js";
import { isSameDay } from "../utils.js";
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
  const scrollToBottomOpacity = useSharedValue(0);
  const [isScrollToBottomVisible, setIsScrollToBottomVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollToBottomStyleAnim = useAnimatedStyle(() => ({
    opacity: scrollToBottomOpacity.value
  }), [scrollToBottomOpacity]);
  const daysPositions = useSharedValue({});
  const listHeight = useSharedValue(0);
  const scrolledY = useSharedValue(0);

  // Scroll position tracking refs for ScrollView load more functionality
  const scrollPosition = useRef(0);
  const contentHeight = useRef(0);
  const scrollViewHeight = useRef(0);
  const hasInitiallyRendered = useRef(false);

  // Auto-scroll tracking refs (similar to ChatScrollView and VirtualizedChatList)
  const previousLengthRef = useRef(messages.length);
  const lastMessageIdRef = useRef(null);
  const hasScrolledToBottomRef = useRef(false);
  const isFirstTimeAccess = useRef(true);
  const hasScrolledOnFirstAccess = useRef(false);
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
  const scrollTo = useCallback(options => {
    if (forwardRef?.current && options) {
      if (useScrollView) {
        // ScrollView uses scrollTo method
        const scrollViewRef = forwardRef.current;
        if ('scrollTo' in scrollViewRef) {
          scrollViewRef.scrollTo({
            x: 0,
            y: options.offset,
            animated: options.animated ?? true
          });
        }
      } else {
        // FlatList uses scrollToOffset method
        const flatListRef = forwardRef.current;
        if ('scrollToOffset' in flatListRef) {
          flatListRef.scrollToOffset(options);
        }
      }
    }
  }, [forwardRef, useScrollView]);

  // Check if user is at bottom (similar to ChatScrollView)
  const checkIsAtBottom = useCallback((contentOffset, contentSize, layoutHeight) => {
    const threshold = 100; // 100 px threshold
    return contentOffset + layoutHeight >= contentSize - threshold;
  }, []);
  const doScrollToBottom = useCallback((animated = true) => {
    if (forwardRef?.current) {
      if (useScrollView) {
        // ScrollView uses scrollToEnd method
        const scrollViewRef = forwardRef.current;
        if (inverted) {
          if ('scrollTo' in scrollViewRef) {
            scrollViewRef.scrollTo({
              x: 0,
              y: 0,
              animated
            });
          }
        } else {
          if ('scrollToEnd' in scrollViewRef) {
            scrollViewRef.scrollToEnd({
              animated
            });
          }
        }
      } else {
        // FlatList logic
        const flatListRef = forwardRef.current;
        if (inverted) {
          scrollTo({
            offset: 0,
            animated
          });
        } else {
          if ('scrollToEnd' in flatListRef) {
            flatListRef.scrollToEnd({
              animated
            });
          }
        }
      }
    }
  }, [forwardRef, inverted, scrollTo, useScrollView]);
  const handleOnScroll = useCallback(event => {
    handleOnScrollProp?.(event);
    const {
      contentOffset: {
        y: contentOffsetY
      },
      contentSize: {
        height: contentSizeHeight
      },
      layoutMeasurement: {
        height: layoutMeasurementHeight
      }
    } = event;
    const atBottom = checkIsAtBottom(contentOffsetY, contentSizeHeight, layoutMeasurementHeight);
    runOnJS(setIsAtBottom)(atBottom);
    const duration = 250;
    const makeScrollToBottomVisible = () => {
      setIsScrollToBottomVisible(true);
      scrollToBottomOpacity.value = withTiming(1, {
        duration
      });
    };
    const makeScrollToBottomHidden = () => {
      scrollToBottomOpacity.value = withTiming(0, {
        duration
      }, isFinished => {
        if (isFinished) runOnJS(setIsScrollToBottomVisible)(false);
      });
    };
    if (inverted) {
      if (contentOffsetY > scrollToBottomOffset) makeScrollToBottomVisible();else makeScrollToBottomHidden();
    } else if (contentOffsetY < scrollToBottomOffset && contentSizeHeight - layoutMeasurementHeight > scrollToBottomOffset) makeScrollToBottomVisible();else makeScrollToBottomHidden();
  }, [handleOnScrollProp, inverted, scrollToBottomOffset, scrollToBottomOpacity, checkIsAtBottom]);
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
  const isFirstRender = useRef({
    scrollToBottom: true
  });
  const onLayoutList = useCallback(event => {
    listHeight.value = event.nativeEvent.layout.height;
    if (!inverted && isFirstRender.current.scrollToBottom) {
      setTimeout(() => {
        doScrollToBottom(false);
        isFirstRender.current.scrollToBottom = false;
      }, 500);
    }
    listViewProps?.onLayout?.(event);
  }, [inverted, doScrollToBottom, listHeight, listViewProps]);
  const onEndReached = useCallback(() => {
    if (infiniteScroll && loadEarlier && onLoadEarlier && !isLoadingEarlier && Platform.OS !== 'web') onLoadEarlier();
  }, [infiniteScroll, loadEarlier, onLoadEarlier, isLoadingEarlier]);

  // Handle scroll to the top for loading more messages (ScrollView version)
  const handleScrollToTop = useCallback(() => {
    // Only trigger load more if we have more messages, not loading, and have rendered initially
    if (infiniteScroll && loadEarlier && onLoadEarlier && !isLoadingEarlier && hasInitiallyRendered.current && Platform.OS !== 'web') {
      // Record the current position before loading more
      const currentPosition = scrollPosition.current;
      const currentContentHeight = contentHeight.current;

      // Call load more
      onLoadEarlier();

      // After loading more, try to maintain the scroll position
      setTimeout(() => {
        if (forwardRef?.current && contentHeight.current > currentContentHeight) {
          // Calculate new position to maintain relative view
          const heightDiff = contentHeight.current - currentContentHeight;
          const scrollViewRef = forwardRef.current;
          if ('scrollTo' in scrollViewRef) {
            scrollViewRef.scrollTo({
              y: currentPosition + heightDiff,
              animated: false
            });
          }
        }
      }, 300);
    }
  }, [infiniteScroll, loadEarlier, onLoadEarlier, isLoadingEarlier, forwardRef]);
  const keyExtractor = useCallback(item => item._id.toString(), []);
  const renderCell = useCallback(props => {
    const handleOnLayout = event => {
      props.onLayout?.(event);
      const {
        y,
        height
      } = event.nativeEvent.layout;
      const newValue = {
        y,
        height,
        createdAt: new Date(props?.item?.createdAt).getTime()
      };
      daysPositions.modify(value => {
        'worklet';

        const isSameDay = (date1, date2) => {
          const d1 = new Date(date1);
          const d2 = new Date(date2);
          return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
        };
        for (const [key, item] of Object.entries(value)) if (isSameDay(newValue.createdAt, item.createdAt) && (inverted ? item.y <= newValue.y : item.y >= newValue.y)) {
          delete value[key];
          break;
        }

        // @ts-expect-error: https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue#remarks
        value[props.item._id] = newValue;
        return value;
      });
    };
    return /*#__PURE__*/_jsx(View, {
      ...props,
      onLayout: handleOnLayout,
      children: props.children
    });
  }, [daysPositions, inverted]);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrolledY.value = event.contentOffset.y;
      runOnJS(handleOnScroll)(event);
    }
  }, [handleOnScroll]);
  const scrollHandlerForScrollView = useCallback(event => {
    const {
      contentOffset,
      contentSize,
      layoutMeasurement
    } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const currentContentHeight = contentSize.height;
    const currentScrollViewHeight = layoutMeasurement.height;

    // Update refs for scroll position tracking
    scrollPosition.current = currentOffset;
    contentHeight.current = currentContentHeight;
    scrollViewHeight.current = currentScrollViewHeight;

    // Check if at the bottom and update state
    const atBottom = checkIsAtBottom(currentOffset, currentContentHeight, currentScrollViewHeight);
    setIsAtBottom(atBottom);

    // Update animated value for existing functionality
    scrolledY.value = currentOffset;
  }, [checkIsAtBottom, scrolledY]);

  // Update scroll-to-bottom button visibility based on isAtBottom state
  useEffect(() => {
    if (!isAtBottom && !isScrollToBottomVisible) {
      setIsScrollToBottomVisible(true);
      scrollToBottomOpacity.value = withTiming(1, {
        duration: 200
      });
    } else if (isAtBottom && isScrollToBottomVisible) {
      scrollToBottomOpacity.value = withTiming(0, {
        duration: 200
      }, () => {
        runOnJS(setIsScrollToBottomVisible)(false);
      });
    }
  }, [isAtBottom, isScrollToBottomVisible, scrollToBottomOpacity]);

  // Handle scroll begin drag to detect scrolling to top
  const onScrollBeginDrag = useCallback(() => {
    // If user scrolls near the top (less than 100 pixels from top) and has more messages to load
    if (scrollPosition.current < 100 && loadEarlier) {
      handleScrollToTop();
    }
  }, [handleScrollToTop, loadEarlier]);

  // Prevent early load more calls during initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      hasInitiallyRendered.current = true;
    }, 1000); // Wait 1 second before allowing load more calls

    return () => clearTimeout(timer);
  }, []);

  // Enhanced auto-scroll to the bottom when new messages arrive (only if user is at bottom)
  useEffect(() => {
    const currentLength = messages.length;
    const previousLength = previousLengthRef.current;

    // Get the last message ID
    const lastMessage = messages[messages.length - 1];
    const currentLastMessageId = lastMessage?._id || null;
    const previousLastMessageId = lastMessageIdRef.current;

    // Only auto-scroll if:
    // 1. User is at the bottom (or this is an initial load)
    // 2. AND (new messages were added OR last message changed OR first time with messages)
    // 3. AND not loading (if loading prop exists)
    const hasNewContent = currentLength > previousLength || currentLastMessageId !== previousLastMessageId && currentLastMessageId !== null;
    const isFirstTimeWithMessages = currentLength > 0 && !hasScrolledToBottomRef.current;
    const shouldScroll = (isAtBottom || isFirstTimeWithMessages) && (hasNewContent || isFirstTimeWithMessages) && currentLength > 0;
    if (shouldScroll) {
      doScrollToBottom();
      hasScrolledToBottomRef.current = true;
    }

    // Update refs
    previousLengthRef.current = currentLength;
    lastMessageIdRef.current = currentLastMessageId;
  }, [messages, doScrollToBottom, isAtBottom]);

  // Enhanced initial scroll to the bottom when messages first load
  useEffect(() => {
    if (messages.length > 0 && isFirstTimeAccess.current && !hasScrolledOnFirstAccess.current) {
      // Mark that we've attempted the first scroll
      hasScrolledOnFirstAccess.current = true;

      // Multiple scroll attempts with increasing delays to ensure messages are fully rendered
      const scrollAttempts = [100, 300, 500, 800, 1200];
      scrollAttempts.forEach((delay, index) => {
        setTimeout(() => {
          if (messages.length > 0) {
            doScrollToBottom(index > 0); // First attempt immediate, rest animated
          }
        }, delay);
      });

      // Mark as no longer first time after all attempts
      setTimeout(() => {
        isFirstTimeAccess.current = false;
        hasScrolledToBottomRef.current = true;
      }, 1500);
    } else if (messages.length > 0 && !hasScrolledToBottomRef.current && !isFirstTimeAccess.current) {
      // Regular initial scroll for subsequent loads
      setTimeout(() => doScrollToBottom(), 100);
      hasScrolledToBottomRef.current = true;
    }
  }, [messages.length, doScrollToBottom]);

  // Reset scroll flag when messages are cleared (e.g., when switching chats)
  useEffect(() => {
    if (messages.length === 0) {
      hasScrolledToBottomRef.current = false;
      isFirstTimeAccess.current = true;
      hasScrolledOnFirstAccess.current = false;
      setIsAtBottom(true);
    }
  }, [messages.length]);

  // Auto-scroll when typing indicator appears (only if user is truly at bottom)
  useEffect(() => {
    // Only auto-scroll if:
    // 1. Typing indicator just appeared (isTyping became true)
    // 2. User is at the bottom
    // 3. User is not actively scrolling up to read old messages
    if (isTyping && isAtBottom && hasScrolledToBottomRef.current) {
      // Small delay to ensure typing indicator is rendered
      setTimeout(() => {
        doScrollToBottom(true);
      }, 100);
    }
  }, [isTyping, isAtBottom, doScrollToBottom]);

  // removes unrendered days positions when messages are added/removed
  useEffect(() => {
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