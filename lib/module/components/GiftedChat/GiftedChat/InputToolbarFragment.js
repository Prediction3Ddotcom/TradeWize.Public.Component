"use strict";

import { useMemo, memo } from 'react';
import { InputToolbar } from "../InputToolbar.js";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
function InputToolbarFragmentInner({
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
  onBlurInput
}) {
  const fragment = useMemo(() => {
    if (!isInitialized) return null;
    const inputToolbarProps = {
      ...props,
      text: getTextFromProp(text),
      composerHeight: Math.max(minComposerHeight, composerHeight),
      onSend: _onSend,
      onInputSizeChanged,
      onTextChanged: _onInputTextChanged,
      textInputProps: {
        ...textInputProps,
        ref: textInputRef,
        maxLength: isTypingDisabled ? 0 : maxInputLength
      }
    };
    if (renderInputToolbar) return renderInputToolbar(inputToolbarProps);
    return /*#__PURE__*/_jsx(InputToolbar, {
      isMe: user?._id === messageReaction?.user?._id,
      onFocusInput: onFocusInput,
      onBlurInput: onBlurInput,
      labelReaction: labelReaction,
      messageReaction: messageReaction,
      clearMessageReaction: () => setMessageReaction(null),
      onRemoveFile: file => {
        const newFileMedia = fileMedia.filter(item => item.id !== file.id);
        setFileMedia(newFileMedia);
      },
      onPressFile: file => {
        handlePressFile(file);
      },
      fileMedia: fileMedia,
      onPressPickMedia: onPressPickMedia,
      disableComposer: props.disableComposer,
      ...inputToolbarProps
    });
  }, [isInitialized, _onSend, getTextFromProp, maxInputLength, minComposerHeight, onInputSizeChanged, props, text, renderInputToolbar, composerHeight, isTypingDisabled, textInputRef, textInputProps, _onInputTextChanged, onPressPickMedia, fileMedia, setFileMedia, handlePressFile, messageReaction, setMessageReaction, labelReaction, onFocusInput, onBlurInput, user]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: fragment
  });
}
export const InputToolbarFragment = /*#__PURE__*/memo(InputToolbarFragmentInner);
//# sourceMappingURL=InputToolbarFragment.js.map