import { type FileMessage, type IMessage, type User } from '../types';
interface ModalsContainerProps<TMessage extends IMessage = IMessage> {
    isImageViewerVisible: boolean;
    fileSelected: {
        uri: string;
    } | null;
    setIsImageViewerVisible: (v: boolean) => void;
    isShowVideoModal: boolean;
    setIsShowVideoModal: (v: boolean) => void;
    isShowEmojiReaction: boolean;
    isModalReaction: boolean;
    setIsModalReaction: (v: boolean) => void;
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
    user: User | {};
    handleReactionEmoji: (emoji: string, messageId: string) => void;
    handleActionReaction: (message: IMessage, action: string) => void;
    isMediaAllShow: boolean;
    setIsMediaAllShow: (v: boolean) => void;
    fileMediaAllLocal: IMessage | null;
    handlePressFile: (file: FileMessage) => void;
    isShowCameraModal: boolean;
    setIsShowCameraModal: (v: boolean) => void;
    onVideoRecorded: (video: any) => void;
    onPhotoCaptured: (photo: any) => void;
}
declare function ModalsContainerInner<TMessage extends IMessage = IMessage>({ isImageViewerVisible, fileSelected, setIsImageViewerVisible, isShowVideoModal, setIsShowVideoModal, isShowEmojiReaction, isModalReaction, setIsModalReaction, messageSelected, user, handleReactionEmoji, handleActionReaction, isMediaAllShow, setIsMediaAllShow, fileMediaAllLocal, handlePressFile, isShowCameraModal, setIsShowCameraModal, onVideoRecorded, onPhotoCaptured, }: ModalsContainerProps<TMessage>): import("react/jsx-runtime").JSX.Element;
export declare const ModalsContainer: typeof ModalsContainerInner;
export {};
//# sourceMappingURL=ModalsContainer.d.ts.map