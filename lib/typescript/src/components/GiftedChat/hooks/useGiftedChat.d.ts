import { type RefObject } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { type AnimatedList } from '../MessageContainer';
import { type FileMessage, type IMessage } from '../types';
import { type GiftedChatProps } from '../GiftedChat/types';
export declare function useGiftedChat<TMessage extends IMessage = IMessage>(props: GiftedChatProps<TMessage>): {
    actionSheetRef: RefObject<any>;
    messageContainerRef: RefObject<(((props: Omit<import("react-native").ScrollViewProps, keyof {
        ref?: React.Ref<import("react-native/types_generated/Libraries/Components/ScrollView/ScrollView").PublicScrollViewInstance>;
    }> & {
        ref?: React.Ref<import("react-native/types_generated/Libraries/Components/ScrollView/ScrollView").PublicScrollViewInstance>;
    }) => React.ReactNode) & Readonly<{
        Context: typeof import("react-native/types_generated/Libraries/Components/ScrollView/ScrollViewContext").default;
    }>) | AnimatedList<TMessage>>;
    textInputRef: RefObject<any>;
    isInitialized: boolean;
    composerHeight: number;
    text: string | undefined;
    isImageViewerVisible: boolean;
    setIsImageViewerVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    fileSelected: {
        uri: string;
    } | null;
    isShowVideoModal: boolean;
    setIsShowVideoModal: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    isShowCameraModal: boolean;
    setIsShowCameraModal: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    isTypingDisabled: boolean;
    isMediaAllShow: boolean;
    setIsMediaAllShow: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    fileMediaAllLocal: IMessage | null;
    arrMessage: TMessage[];
    messageReaction: (IMessage & {
        isReply: boolean;
    }) | null;
    setMessageReaction: import("react").Dispatch<import("react").SetStateAction<(IMessage & {
        isReply: boolean;
    }) | null>>;
    isModalReaction: boolean;
    setIsModalReaction: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    messageSelected: {
        message: TMessage;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
            pageX: number;
            pageY: number;
        };
    } | null;
    fileMedia: FileMessage[];
    setFileMedia: import("react").Dispatch<import("react").SetStateAction<FileMessage[]>>;
    contentStyleAnim: {
        transform: {
            translateY: number;
        }[];
    };
    inverted: boolean;
    isTyping: boolean | undefined;
    keyboardShouldPersistTaps: "never" | "always" | "handled";
    useScrollView: boolean;
    isKeyboardInternallyHandled: boolean;
    isShowEmojiReaction: boolean;
    renderInputToolbar: ((props: import("..").InputToolbarProps<TMessage>) => React.ReactNode) | null;
    maxInputLength: number | null;
    minComposerHeight: number;
    maxComposerHeight: number;
    textInputProps: object | undefined;
    labelReaction: string | undefined;
    onFocusInput: (() => void) | undefined;
    onBlurInput: (() => void) | undefined;
    user: {};
    locale: string;
    actionSheet: (() => {
        showActionSheetWithOptions: (options: import("@expo/react-native-action-sheet").ActionSheetOptions, callback: (buttonIndex: number) => void | Promise<void>) => void;
    }) | null;
    getTextFromProp: (fallback: string) => string;
    onInitialLayoutViewLayout: (e: LayoutChangeEvent) => void;
    handlePressFile: (file: FileMessage) => void;
    _onSend: (messages?: TMessage[], shouldResetInputToolbar?: boolean) => void;
    onInputSizeChanged: (size: {
        height: number;
    }) => void;
    _onInputTextChanged: (_text: string) => void;
    onPressPickMedia: (type: "camera" | "pick") => Promise<void>;
    handleReactionEmoji: (emoji: string, messageId: string) => void;
    handleActionReaction: (message: IMessage, action: string) => void;
    onLongPressReaction: (message: TMessage, position: any) => void;
    onPressFileInContainer: (file: FileMessage, isShowAll?: boolean, arrMedia?: IMessage) => void;
    onVideoRecorded: (video: any) => Promise<void>;
    onPhotoCaptured: (photo: any) => void;
    scrollToBottom: (isAnimated?: boolean) => void;
    contextValues: {
        actionSheet: () => {
            showActionSheetWithOptions: any;
        };
        getLocale: () => string;
    };
};
//# sourceMappingURL=useGiftedChat.d.ts.map