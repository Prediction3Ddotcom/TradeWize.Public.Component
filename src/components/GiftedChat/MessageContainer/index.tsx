import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
  FlatList,
  ScrollView,
} from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import DayAnimated from './components/DayAnimated';
import Item from './components/Item';

import { LoadEarlier } from '../LoadEarlier';
import { type IMessage } from '../types';
import TypingIndicator from '../TypingIndicator';
import { type MessageContainerProps } from './types';
import { type ItemProps } from './components/Item/types';

import stylesCommon from '../styles';
import styles from './styles';
import { isSameDay } from '../utils';
import { useAutoScroll } from '../hooks/useAutoScroll';

export * from './types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as any;

function MessageContainer<TMessage extends IMessage = IMessage>(
  props: MessageContainerProps<TMessage>
) {
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
    useScrollView = false,
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
    onLayoutList,
  } = useAutoScroll<TMessage>({
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
    listViewProps,
  });

  const scrollToBottomStyleAnim = useAnimatedStyle(
    () => ({
      opacity: scrollToBottomOpacity.value,
    }),
    [scrollToBottomOpacity]
  );

  const renderTypingIndicator = useCallback(() => {
    if (renderTypingIndicatorProp) return renderTypingIndicatorProp();
    return <TypingIndicator isTyping={isTyping} />;
  }, [isTyping, renderTypingIndicatorProp]);

  const ListFooterComponent = useMemo(() => {
    if (renderFooterProp) return <>{renderFooterProp(props)}</>;
    return <>{renderTypingIndicator()}</>;
  }, [renderFooterProp, renderTypingIndicator, props]);

  const renderLoadEarlier = useCallback(() => {
    if (loadEarlier) {
      if (renderLoadEarlierProp) return renderLoadEarlierProp(props);
      return <LoadEarlier {...props} />;
    }
    return null;
  }, [loadEarlier, renderLoadEarlierProp, props]);

  const keyExtractor: any = useCallback(
    (item: unknown) => (item as TMessage)._id.toString(),
    []
  );

  const renderItem = useCallback(
    ({
      item,
      index,
    }: ListRenderItemInfo<unknown>): React.ReactElement | null => {
      const messageItem = item as TMessage;

      if (!messageItem._id && messageItem._id !== 0)
        console.warn(
          'GiftedChat: `_id` is missing for message',
          JSON.stringify(item)
        );

      if (!messageItem.user) {
        if (!messageItem.system)
          console.warn(
            'GiftedChat: `user` is missing for message',
            JSON.stringify(messageItem)
          );
        messageItem.user = { _id: 0 };
      }

      const { messages, ...restProps } = props;

      if (messages && user) {
        const previousMessage =
          (inverted ? messages[index + 1] : messages[index - 1]) ||
          ({} as TMessage);
        const nextMessage =
          (inverted ? messages[index - 1] : messages[index + 1]) ||
          ({} as TMessage);

        const messageProps: ItemProps<TMessage> = {
          ...restProps,
          currentMessage: messageItem,
          previousMessage,
          nextMessage,
          position: messageItem.user._id === user._id ? 'right' : 'left',
          scrolledY,
          daysPositions,
          listHeight,
          onPressFile,
          onLongPressReaction,
        };

        return <Item<TMessage> {...messageProps} />;
      }

      return null;
    },
    [
      props,
      inverted,
      scrolledY,
      daysPositions,
      listHeight,
      user,
      onPressFile,
      onLongPressReaction,
    ]
  );

  const renderChatEmpty = useCallback(() => {
    if (renderChatEmptyProp)
      return inverted ? (
        renderChatEmptyProp()
      ) : (
        <View style={[stylesCommon.fill, styles.emptyChatContainer]}>
          {renderChatEmptyProp()}
        </View>
      );

    return <View style={stylesCommon.fill} />;
  }, [inverted, renderChatEmptyProp]);

  const ListHeaderComponent = useMemo(() => {
    const content = renderLoadEarlier();
    if (!content) return null;
    return <View style={stylesCommon.fill}>{content}</View>;
  }, [renderLoadEarlier]);

  const renderScrollBottomComponent = useCallback(() => {
    if (scrollToBottomComponentProp) return scrollToBottomComponentProp();
    return <Text>{'V'}</Text>;
  }, [scrollToBottomComponentProp]);

  const renderScrollToBottomWrapper = useCallback(() => {
    if (!isScrollToBottomVisible) return null;

    return (
      <TouchableOpacity onPress={() => doScrollToBottom()}>
        <Animated.View
          style={[
            stylesCommon.centerItems,
            styles.scrollToBottomStyle,
            scrollToBottomStyle,
            scrollToBottomStyleAnim,
          ]}
        >
          {renderScrollBottomComponent()}
        </Animated.View>
      </TouchableOpacity>
    );
  }, [
    scrollToBottomStyle,
    renderScrollBottomComponent,
    doScrollToBottom,
    scrollToBottomStyleAnim,
    isScrollToBottomVisible,
  ]);

  const renderCell = useCallback(
    (cellProps: any) => {
      const handleOnLayout = (event: LayoutChangeEvent) => {
        cellProps.onLayout?.(event);

        const { y, height } = event.nativeEvent.layout;

        const newValue = {
          y,
          height,
          createdAt: new Date(
            (cellProps?.item as IMessage)?.createdAt
          ).getTime(),
        };

        daysPositions.modify((value) => {
          'worklet';

          const isSameDayFn = (date1: number, date2: number) => {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            return (
              d1.getDate() === d2.getDate() &&
              d1.getMonth() === d2.getMonth() &&
              d1.getFullYear() === d2.getFullYear()
            );
          };

          for (const [key, item] of Object.entries(value))
            if (
              isSameDayFn(newValue.createdAt, item.createdAt) &&
              (inverted ? item.y <= newValue.y : item.y >= newValue.y)
            ) {
              delete value[key];
              break;
            }

          // @ts-expect-error: https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue#remarks
          value[cellProps.item._id] = newValue;
          return value;
        });
      };

      return (
        <View {...cellProps} onLayout={handleOnLayout}>
          {cellProps.children}
        </View>
      );
    },
    [daysPositions, inverted]
  );

  // Remove unrendered days positions when messages change
  const previousMessagesRef = useRef(messages);
  useEffect(() => {
    previousMessagesRef.current = messages;
    Object.keys(daysPositions.value).forEach((key) => {
      const messageIndex = messages.findIndex((m) => m._id.toString() === key);
      let shouldRemove = messageIndex === -1;

      if (!shouldRemove) {
        const prevMessage = messages[messageIndex + (inverted ? 1 : -1)] as
          | IMessage
          | undefined;
        const message = messages[messageIndex] as IMessage;
        shouldRemove = !!prevMessage && isSameDay(message, prevMessage);
      }

      if (shouldRemove)
        daysPositions.modify((value) => {
          'worklet';
          delete value[key];
          return value;
        });
    });
  }, [messages, daysPositions, inverted]);

  return (
    <View
      style={[
        styles.contentContainerStyle,
        alignTop ? styles.containerAlignTop : stylesCommon.fill,
      ]}
    >
      {useScrollView ? (
        <ScrollView
          ref={forwardRef as any}
          style={stylesCommon.fill}
          automaticallyAdjustContentInsets={false}
          {...invertibleScrollViewProps}
          onScroll={scrollHandlerForScrollView}
          onScrollBeginDrag={onScrollBeginDrag}
          scrollEventThrottle={1}
          onLayout={onLayoutList}
          nestedScrollEnabled={true}
        >
          {inverted ? ListHeaderComponent : null}
          {messages.length === 0 ? renderChatEmpty() : null}
          {messages.map((item, index) => {
            const renderedItem = renderItem({
              item,
              index,
            } as ListRenderItemInfo<unknown>);
            return renderedItem ? (
              <View
                key={keyExtractor(item)}
                onLayout={(event) =>
                  renderCell({
                    item,
                    index,
                    onLayout: () => {},
                    children: renderedItem,
                  } as any).props.onLayout?.(event)
                }
              >
                {renderedItem}
              </View>
            ) : null;
          })}
          {inverted ? null : ListFooterComponent}
        </ScrollView>
      ) : (
        <AnimatedFlatList
          extraData={extraData}
          ref={forwardRef as any}
          keyExtractor={keyExtractor}
          data={messages}
          renderItem={renderItem as any}
          inverted={inverted}
          automaticallyAdjustContentInsets={false}
          style={stylesCommon.fill}
          {...invertibleScrollViewProps}
          ListEmptyComponent={renderChatEmpty}
          ListFooterComponent={
            inverted ? ListHeaderComponent : ListFooterComponent
          }
          ListHeaderComponent={
            inverted ? ListFooterComponent : ListHeaderComponent
          }
          onScroll={scrollHandler}
          scrollEventThrottle={1}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          {...listViewProps}
          onLayout={onLayoutList}
          CellRendererComponent={renderCell}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
      )}
      {isScrollToBottomEnabled ? renderScrollToBottomWrapper() : null}
      <DayAnimated
        scrolledY={scrolledY}
        daysPositions={daysPositions}
        listHeight={listHeight}
        renderDay={renderDayProp}
        messages={messages}
        isLoadingEarlier={isLoadingEarlier}
      />
    </View>
  );
}

export default MessageContainer;
