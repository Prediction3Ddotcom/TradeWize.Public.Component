import { ScrollView, type LayoutChangeEvent } from 'react-native';
import type { ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/hook/commonTypes';
import { type IMessage } from '../types';
import { type DaysPositions, type AnimatedList } from '../MessageContainer/types';
interface UseAutoScrollOptions<TMessage extends IMessage> {
    messages: TMessage[];
    inverted: boolean;
    isTyping: boolean;
    isLoadingEarlier: boolean;
    loadEarlier: boolean;
    infiniteScroll: boolean;
    scrollToBottomOffset: number;
    forwardRef: React.RefObject<AnimatedList<TMessage> | ScrollView> | undefined;
    useScrollView: boolean;
    onLoadEarlier?: () => void;
    handleOnScrollProp?: (event: ReanimatedScrollEvent) => void;
    listViewProps?: any;
}
export declare function useAutoScroll<TMessage extends IMessage = IMessage>({ messages, inverted, isTyping, isLoadingEarlier, loadEarlier, infiniteScroll, scrollToBottomOffset, forwardRef, useScrollView, onLoadEarlier, handleOnScrollProp, listViewProps, }: UseAutoScrollOptions<TMessage>): {
    scrollToBottomOpacity: import("react-native-reanimated").SharedValue<number>;
    daysPositions: import("react-native-reanimated").SharedValue<DaysPositions>;
    listHeight: import("react-native-reanimated").SharedValue<number>;
    scrolledY: import("react-native-reanimated").SharedValue<number>;
    isScrollToBottomVisible: boolean;
    isAtBottom: boolean;
    doScrollToBottom: (animated?: boolean) => void;
    scrollHandler: import("react-native-reanimated").ScrollHandlerProcessed<Record<string, unknown>>;
    scrollHandlerForScrollView: (event: any) => void;
    onScrollBeginDrag: () => void;
    onEndReached: () => void;
    onLayoutList: (event: LayoutChangeEvent) => void;
};
export {};
//# sourceMappingURL=useAutoScroll.d.ts.map