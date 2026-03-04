import { useMemo, memo } from 'react';
import { InputToolbar } from '../InputToolbar';
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
  onInputSizeChanged: (size: { height: number }) => void;
  _onInputTextChanged: (text: string) => void;
  textInputProps: object | undefined;
  textInputRef: any;
  isTypingDisabled: boolean;
  maxInputLength: number | null;
  renderInputToolbar: ((props: any) => React.ReactNode) | null;
  user: User | {};
  messageReaction: (IMessage & { isReply: boolean }) | null;
  setMessageReaction: (v: (IMessage & { isReply: boolean }) | null) => void;
  fileMedia: FileMessage[];
  setFileMedia: (v: FileMessage[]) => void;
  handlePressFile: (file: FileMessage) => void;
  onPressPickMedia: (type: 'camera' | 'pick') => void;
  labelReaction: string | undefined;
  onFocusInput: (() => void) | undefined;
  onBlurInput: (() => void) | undefined;
}

function InputToolbarFragmentInner<TMessage extends IMessage = IMessage>({
  isInitialized,
  props,
  getTextFromProp,
  text,
  composerHeight,
  minComposerHeight,
  _onSend,
  onInputSizeChanged,
  _onInputTextChanged,
  textInputProps,
  textInputRef,
  isTypingDisabled,
  maxInputLength,
  renderInputToolbar,
  user,
  messageReaction,
  setMessageReaction,
  fileMedia,
  setFileMedia,
  handlePressFile,
  onPressPickMedia,
  labelReaction,
  onFocusInput,
  onBlurInput,
}: InputToolbarFragmentProps<TMessage>) {
  const fragment = useMemo(() => {
    if (!isInitialized) return null;

    const inputToolbarProps = {
      ...props,
      text: getTextFromProp(text!),
      composerHeight: Math.max(minComposerHeight!, composerHeight),
      onSend: _onSend,
      onInputSizeChanged,
      onTextChanged: _onInputTextChanged,
      textInputProps: {
        ...textInputProps,
        ref: textInputRef,
        maxLength: isTypingDisabled ? 0 : maxInputLength,
      },
    };

    if (renderInputToolbar) return renderInputToolbar(inputToolbarProps);

    return (
      <InputToolbar
        isMe={(user as User)?._id === messageReaction?.user?._id}
        onFocusInput={onFocusInput}
        onBlurInput={onBlurInput}
        labelReaction={labelReaction}
        messageReaction={messageReaction as IMessage & { isReply: boolean }}
        clearMessageReaction={() => setMessageReaction(null)}
        onRemoveFile={(file: FileMessage) => {
          const newFileMedia = fileMedia.filter((item) => item.id !== file.id);
          setFileMedia(newFileMedia);
        }}
        onPressFile={(file: FileMessage) => {
          handlePressFile(file);
        }}
        fileMedia={fileMedia}
        onPressPickMedia={onPressPickMedia}
        disableComposer={props.disableComposer}
        {...inputToolbarProps}
      />
    );
  }, [
    isInitialized,
    _onSend,
    getTextFromProp,
    maxInputLength,
    minComposerHeight,
    onInputSizeChanged,
    props,
    text,
    renderInputToolbar,
    composerHeight,
    isTypingDisabled,
    textInputRef,
    textInputProps,
    _onInputTextChanged,
    onPressPickMedia,
    fileMedia,
    setFileMedia,
    handlePressFile,
    messageReaction,
    setMessageReaction,
    labelReaction,
    onFocusInput,
    onBlurInput,
    user,
  ]);

  return <>{fragment}</>;
}

export const InputToolbarFragment = memo(
  InputToolbarFragmentInner
) as typeof InputToolbarFragmentInner;
