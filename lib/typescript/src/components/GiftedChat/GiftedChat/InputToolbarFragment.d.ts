import { type FileMessage, type IMessage, type User } from '../types';
import { type GiftedChatProps } from './types';
interface InputToolbarFragmentProps<TMessage extends IMessage = IMessage> {
    isInitialized: boolean;
    props: GiftedChatProps<TMessage>;
    getTextFromProp: (fallback: string) => string | undefined;
    text: string | undefined;
    composerHeight: number;
    minComposerHeight: number;
    _onSend: (messages: TMessage[], shouldResetInputToolbar?: boolean) => void;
    onInputSizeChanged: (size: {
        height: number;
    }) => void;
    _onInputTextChanged: (text: string) => void;
    textInputProps: object | undefined;
    textInputRef: any;
    isTypingDisabled: boolean;
    maxInputLength: number | null;
    renderInputToolbar: ((props: any) => React.ReactNode) | null;
    user: User | {};
    messageReaction: (IMessage & {
        isReply: boolean;
    }) | null;
    setMessageReaction: (v: (IMessage & {
        isReply: boolean;
    }) | null) => void;
    fileMedia: FileMessage[];
    setFileMedia: (v: FileMessage[]) => void;
    handlePressFile: (file: FileMessage) => void;
    onPressPickMedia: (type: 'camera' | 'pick') => void;
    labelReaction: string | undefined;
    onFocusInput: (() => void) | undefined;
    onBlurInput: (() => void) | undefined;
}
declare function InputToolbarFragmentInner<TMessage extends IMessage = IMessage>({ isInitialized, props, getTextFromProp, text, composerHeight, minComposerHeight, _onSend, onInputSizeChanged, _onInputTextChanged, textInputProps, textInputRef, isTypingDisabled, maxInputLength, renderInputToolbar, user, messageReaction, setMessageReaction, fileMedia, setFileMedia, handlePressFile, onPressPickMedia, labelReaction, onFocusInput, onBlurInput, }: InputToolbarFragmentProps<TMessage>): import("react/jsx-runtime").JSX.Element;
export declare const InputToolbarFragment: typeof InputToolbarFragmentInner;
export {};
//# sourceMappingURL=InputToolbarFragment.d.ts.map