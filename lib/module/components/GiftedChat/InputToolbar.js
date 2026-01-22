"use strict";

import { useCallback, useMemo } from 'react';
import {
// Image,
StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Layout, SlideInDown, SlideOutUp } from 'react-native-reanimated';
import { Composer } from "./Composer.js";
import { Send } from "./Send.js";
import { Actions } from "./Actions.js";
import Color from "./Color.js";
import FastImage from 'react-native-fast-image';
import { formatDurationSmart } from "./utils.js";
import { SCREEN_WIDTH } from "../../utils/index.js";
import { Button } from "../button.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export function InputToolbar(props) {
  const {
    renderActions,
    onPressActionButton,
    renderComposer,
    renderSend,
    renderAccessory,
    options,
    optionTintColor,
    icon,
    wrapperStyle,
    containerStyle,
    onPressPickMedia,
    fileMedia,
    onRemoveFile,
    onPressFile,
    messageReaction,
    clearMessageReaction,
    labelReaction,
    onFocusInput,
    onBlurInput,
    messageContentReaction,
    isMe
    // onEditFileImage,
  } = props;
  const actionsFragment = useMemo(() => {
    const props = {
      onPressActionButton,
      options,
      optionTintColor,
      icon,
      wrapperStyle,
      containerStyle,
      onPressPickMedia
    };
    return renderActions?.(props) || onPressActionButton && /*#__PURE__*/_jsx(Actions, {
      ...props
    });
  }, [renderActions, onPressActionButton, options, optionTintColor, icon, wrapperStyle, containerStyle, onPressPickMedia]);
  const composerFragment = useMemo(() => {
    return renderComposer?.(props) || /*#__PURE__*/_jsx(Composer, {
      ref: props?.inputRef,
      ...props,
      onPressPickMedia: props.onPressPickMedia,
      onFocus: onFocusInput,
      onBlur: onBlurInput
    });
  }, [renderComposer, props, onFocusInput, onBlurInput]);
  const renderFileMedia = useMemo(() => {
    if (!fileMedia?.length) return null;
    return /*#__PURE__*/_jsx(View, {
      style: styles.previewFile,
      children: fileMedia?.map(item => {
        return /*#__PURE__*/_jsxs(TouchableOpacity, {
          onPress: () => {
            onPressFile?.(item);
          },
          style: [styles.previewFileItem, {
            width: SCREEN_WIDTH * 0.22,
            height: SCREEN_WIDTH * 0.22
          }],
          children: [/*#__PURE__*/_jsx(TouchableOpacity, {
            onPress: () => {
              onRemoveFile?.(item);
            },
            style: [styles.removeFile, {
              width: SCREEN_WIDTH * 0.06,
              height: SCREEN_WIDTH * 0.06
            }],
            children: /*#__PURE__*/_jsx(Text, {
              style: styles.removeFileText,
              children: "X"
            })
          }), /*#__PURE__*/_jsx(FastImage, {
            source: {
              uri: item.thumbnailPreview
            },
            style: styles.previewFileItemImage
          }), item.typeFile === 'video' && /*#__PURE__*/_jsx(View, {
            style: [styles.iconPlayContainer, {
              width: SCREEN_WIDTH * 0.1,
              height: SCREEN_WIDTH * 0.1,
              top: SCREEN_WIDTH * 0.22 / 2 - SCREEN_WIDTH * 0.1 / 2,
              right: SCREEN_WIDTH * 0.22 / 2 - SCREEN_WIDTH * 0.1 / 2
            }],
            children: /*#__PURE__*/_jsx(FastImage, {
              source: require('./assets/play.png'),
              style: styles.iconPlay
            })
          }), item.typeFile === 'video' && /*#__PURE__*/_jsx(View, {
            style: styles.previewFileItemVideo,
            children: /*#__PURE__*/_jsx(Text, {
              style: styles.previewFileItemVideoText,
              children: formatDurationSmart(item?.duration || 0)
            })
          })]
        }, item.id);
      })
    });
  }, [fileMedia, onRemoveFile, onPressFile]);
  const renderMessageReaction = useCallback(() => {
    if (!messageReaction?.text && !messageReaction?.file) return null;
    if (messageReaction?.text && (!messageReaction?.file || messageReaction?.file?.length <= 0)) {
      return messageReaction?.text;
    }
    if (messageReaction?.file && messageReaction?.file?.length > 0) {
      if (messageContentReaction) {
        return messageContentReaction;
      }
      return 'File media';
    }
    return null;
  }, [messageReaction, messageContentReaction]);
  const renderFilePreview = useMemo(() => {
    if (!messageReaction?.file) return null;
    if (messageReaction?.file?.length <= 0) return null;
    if (messageReaction?.file?.length <= 3) {
      return /*#__PURE__*/_jsx(_Fragment, {
        children: messageReaction?.file?.map((item, index) => {
          return /*#__PURE__*/_jsx(View, {
            style: styles.filePreview,
            children: /*#__PURE__*/_jsx(FastImage, {
              source: {
                uri: item?.thumbnailPreview || item?.uri
              },
              style: styles.filePreviewImage
            })
          }, `${item?.id} + ${item?.name} + ${index}`);
        })
      });
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [messageReaction?.file?.filter((_item, index) => index < 2)?.map((item, index) => {
        return /*#__PURE__*/_jsx(View, {
          style: styles.filePreview,
          children: /*#__PURE__*/_jsx(FastImage, {
            source: {
              uri: item?.thumbnailPreview || item?.uri
            },
            style: styles.filePreviewImage
          })
        }, `${item?.id} + ${item?.name} + ${index}`);
      }), /*#__PURE__*/_jsxs(View, {
        children: [/*#__PURE__*/_jsx(FastImage, {
          source: {
            uri: messageReaction?.file[2]?.thumbnailPreview || messageReaction?.file[2]?.uri
          },
          style: [styles.filePreview, {
            opacity: 0.5
          }]
        }), /*#__PURE__*/_jsx(View, {
          style: styles.filePreviewMore,
          children: /*#__PURE__*/_jsxs(Text, {
            style: styles.filePreviewMoreText,
            children: ["+", messageReaction?.file?.length - 2 > 99 ? '99' : messageReaction?.file?.length - 2]
          })
        })]
      })]
    });
  }, [messageReaction]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, containerStyle],
    children: [messageReaction && /*#__PURE__*/_jsxs(View, {
      style: styles.messageReaction,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.messageReactionContainer,
        children: [/*#__PURE__*/_jsx(Text, {
          style: styles.messageReactionText,
          children: labelReaction ? labelReaction : `Are replying ${isMe ? 'yourself' : messageReaction?.user?.name}`
        }), /*#__PURE__*/_jsx(Text, {
          numberOfLines: 2,
          style: styles.messageReactionContent,
          children: renderMessageReaction()
        })]
      }), renderFilePreview, /*#__PURE__*/_jsx(Button, {
        activeOpacity: 0.7,
        variant: "ghost",
        title: "X",
        onPress: () => {
          clearMessageReaction?.();
        },
        style: styles.messageReactionCloseButton,
        textStyle: styles.messageReactionClose
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: [styles.primary, props.primaryStyle],
      children: [actionsFragment, composerFragment, renderSend?.(props) || /*#__PURE__*/_jsx(Send, {
        ...props
      })]
    }), renderAccessory && /*#__PURE__*/_jsx(View, {
      style: [styles.accessory, props.accessoryStyle],
      children: renderAccessory(props)
    }), /*#__PURE__*/_jsx(Animated.View, {
      entering: SlideInDown.duration(300),
      exiting: SlideOutUp.duration(300),
      layout: Layout,
      children: renderFileMedia
    })]
  });
}
const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    paddingTop: 8,
    paddingHorizontal: 16
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  accessory: {
    height: 44
  },
  previewFile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8
  },
  previewFileItem: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Color.defaultColor,
    borderWidth: 1,
    borderColor: Color.defaultColor
  },
  previewFileItemImage: {
    width: '100%',
    height: '100%'
  },
  previewFileItemVideo: {
    position: 'absolute',
    bottom: 2,
    right: 4
  },
  previewFileItemVideoText: {
    color: Color.white,
    fontSize: 12,
    fontWeight: 'bold'
  },
  removeFile: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Color.defaultColor,
    borderRadius: 100,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.white
  },
  removeFileText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  iconPlay: {
    width: 24,
    height: 24,
    marginLeft: 4
  },
  iconPlayContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100
  },
  messageReactionContainer: {
    flex: 1
  },
  messageReaction: {
    backgroundColor: Color.white,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  messageReactionText: {
    color: Color.black,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20
  },
  messageReactionContent: {
    color: Color.black,
    fontSize: 14,
    lineHeight: 20
  },
  messageReactionClose: {
    color: Color.black,
    fontSize: 18,
    fontWeight: '500'
  },
  messageReactionCloseButton: {
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_WIDTH * 0.07,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  filePreview: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Color.defaultColor,
    borderWidth: 1,
    borderColor: Color.defaultColor,
    marginLeft: 4
  },
  filePreviewImage: {
    width: '100%',
    height: '100%'
  },
  filePreviewMore: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filePreviewMoreText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  editFileImage: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: Color.defaultColor,
    borderRadius: 100,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.white
  },
  editFileImageIcon: {
    width: SCREEN_WIDTH * 0.035,
    height: SCREEN_WIDTH * 0.035
  }
});
//# sourceMappingURL=InputToolbar.js.map