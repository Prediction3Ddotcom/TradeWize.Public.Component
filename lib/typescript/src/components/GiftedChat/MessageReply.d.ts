import { type FileMessage, type IMessage } from './types';
interface MessageReplyProps {
    messageReply: IMessage;
    onPressFile?: (file: FileMessage, isShowAll?: boolean, arrMedia?: IMessage) => void;
    onSaveThumbnail?: (file: FileMessage[]) => void;
}
export declare function MessageReply({ messageReply, onPressFile, onSaveThumbnail, }: MessageReplyProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MessageReply.d.ts.map