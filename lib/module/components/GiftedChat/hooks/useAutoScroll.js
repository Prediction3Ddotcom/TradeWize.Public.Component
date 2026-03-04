"use strict";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { runOnJS, useAnimatedScrollHandler, useSharedValue, withTiming } from 'react-native-reanimated';
export function useAutoScroll({
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
}) {
  // Animated values
  const scrollToBottomOpacity = useSharedValue(0);
  const daysPositions = useSharedValue({});
  const listHeight = useSharedValue(0);
  const scrolledY = useSharedValue(0);

  // State
  const [isScrollToBottomVisible, setIsScrollToBottomVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Refs
  const scrollPosition = useRef(0);
  const contentHeight = useRef(0);
  const scrollViewHeight = useRef(0);
  const hasInitiallyRendered = useRef(false);
  const previousLengthRef = useRef(messages.length);
  const lastMessageIdRef = useRef(null);
  const hasScrolledToBottomRef = useRef(false);
  const isFirstTimeAccess = useRef(true);
  const hasScrolledOnFirstAccess = useRef(false);
  const isFirstRender = useRef({
    scrollToBottom: true
  });

  // Handlers
  const checkIsAtBottom = useCallback((contentOffset, contentSize, layoutHeight) => {
    const threshold = 100;
    return contentOffset + layoutHeight >= contentSize - threshold;
  }, []);
  const scrollTo = useCallback(options => {
    if (forwardRef?.current && options) {
      if (useScrollView) {
        const scrollViewRef = forwardRef.current;
        if (scrollViewRef && 'scrollTo' in scrollViewRef) {
          scrollViewRef.scrollTo({
            x: 0,
            y: options.offset,
            animated: options.animated ?? true
          });
        }
      } else {
        const flatListRef = forwardRef.current;
        if ('scrollToOffset' in flatListRef) {
          flatListRef.scrollToOffset(options);
        }
      }
    }
  }, [forwardRef, useScrollView]);
  const doScrollToBottom = useCallback((animated = true) => {
    if (forwardRef?.current) {
      if (useScrollView) {
        const scrollViewRef = forwardRef.current;
        if (inverted) {
          if (scrollViewRef && 'scrollTo' in scrollViewRef) {
            scrollViewRef.scrollTo({
              x: 0,
              y: 0,
              animated
            });
          }
        } else {
          if (scrollViewRef && 'scrollToEnd' in scrollViewRef) {
            scrollViewRef.scrollToEnd({
              animated
            });
          }
        }
      } else {
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
  const handleScrollToTop = useCallback(() => {
    if (infiniteScroll && loadEarlier && onLoadEarlier && !isLoadingEarlier && hasInitiallyRendered.current && Platform.OS !== 'web') {
      const currentPosition = scrollPosition.current;
      const currentContentHeight = contentHeight.current;
      onLoadEarlier();
      setTimeout(() => {
        if (forwardRef?.current && contentHeight.current > currentContentHeight) {
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
  const scrollHandlerForScrollView = useCallback(event => {
    const {
      contentOffset,
      contentSize,
      layoutMeasurement
    } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const currentContentHeight = contentSize.height;
    const currentScrollViewHeight = layoutMeasurement.height;
    scrollPosition.current = currentOffset;
    contentHeight.current = currentContentHeight;
    scrollViewHeight.current = currentScrollViewHeight;
    const atBottom = checkIsAtBottom(currentOffset, currentContentHeight, currentScrollViewHeight);
    setIsAtBottom(atBottom);
    scrolledY.value = currentOffset;
  }, [checkIsAtBottom, scrolledY]);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrolledY.value = event.contentOffset.y;
      runOnJS(handleOnScroll)(event);
    }
  }, [handleOnScroll]);
  const onEndReached = useCallback(() => {
    if (infiniteScroll && loadEarlier && onLoadEarlier && !isLoadingEarlier && Platform.OS !== 'web') onLoadEarlier();
  }, [infiniteScroll, loadEarlier, onLoadEarlier, isLoadingEarlier]);
  const onScrollBeginDrag = useCallback(() => {
    if (scrollPosition.current < 100 && loadEarlier) {
      handleScrollToTop();
    }
  }, [handleScrollToTop, loadEarlier]);
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

  // Effects
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
  useEffect(() => {
    const timer = setTimeout(() => {
      hasInitiallyRendered.current = true;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const currentLength = messages.length;
    const previousLength = previousLengthRef.current;
    const lastMessage = messages[messages.length - 1];
    const currentLastMessageId = lastMessage?._id || null;
    const previousLastMessageId = lastMessageIdRef.current;
    const hasNewContent = currentLength > previousLength || currentLastMessageId !== previousLastMessageId && currentLastMessageId !== null;
    const isFirstTimeWithMessages = currentLength > 0 && !hasScrolledToBottomRef.current;
    const shouldScroll = (isAtBottom || isFirstTimeWithMessages) && (hasNewContent || isFirstTimeWithMessages) && currentLength > 0;
    if (shouldScroll) {
      doScrollToBottom();
      hasScrolledToBottomRef.current = true;
    }
    previousLengthRef.current = currentLength;
    lastMessageIdRef.current = currentLastMessageId;
  }, [messages, doScrollToBottom, isAtBottom]);
  useEffect(() => {
    if (messages.length > 0 && isFirstTimeAccess.current && !hasScrolledOnFirstAccess.current) {
      hasScrolledOnFirstAccess.current = true;
      const scrollAttempts = [100, 300, 500, 800, 1200];
      scrollAttempts.forEach((delay, index) => {
        setTimeout(() => {
          if (messages.length > 0) {
            doScrollToBottom(index > 0);
          }
        }, delay);
      });
      setTimeout(() => {
        isFirstTimeAccess.current = false;
        hasScrolledToBottomRef.current = true;
      }, 1500);
    } else if (messages.length > 0 && !hasScrolledToBottomRef.current && !isFirstTimeAccess.current) {
      setTimeout(() => doScrollToBottom(), 100);
      hasScrolledToBottomRef.current = true;
    }
  }, [messages.length, doScrollToBottom]);
  useEffect(() => {
    if (messages.length === 0) {
      hasScrolledToBottomRef.current = false;
      isFirstTimeAccess.current = true;
      hasScrolledOnFirstAccess.current = false;
      setIsAtBottom(true);
    }
  }, [messages.length]);
  useEffect(() => {
    if (isTyping && isAtBottom && hasScrolledToBottomRef.current) {
      setTimeout(() => {
        doScrollToBottom(true);
      }, 100);
    }
  }, [isTyping, isAtBottom, doScrollToBottom]);
  return {
    // Animated values
    scrollToBottomOpacity,
    daysPositions,
    listHeight,
    scrolledY,
    // State
    isScrollToBottomVisible,
    isAtBottom,
    // Handlers
    doScrollToBottom,
    scrollHandler,
    scrollHandlerForScrollView,
    onScrollBeginDrag,
    onEndReached,
    onLayoutList
  };
}
//# sourceMappingURL=useAutoScroll.js.map