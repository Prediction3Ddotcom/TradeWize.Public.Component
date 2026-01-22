"use strict";

import { useEffect, useState, memo, useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { generateThumbnails } from "./utils.js";
import FastImage from 'react-native-fast-image';
import Color from "./Color.js";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SCREEN_WIDTH } from "../../utils/index.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const GAP_MEDIA = 3;
// ✅ tính toán size cố định dựa vào messageWidth + isShowAll
const calcSize = (isShowAll, messageWidth) => {
  const width = Number(messageWidth?.width) || SCREEN_WIDTH; // fallback an toàn

  const sizeMedia = width / 4.65 - GAP_MEDIA * 3.65;
  const sizeMediaShowAll = width / 4 - GAP_MEDIA * 3;
  if (isShowAll) return sizeMediaShowAll;
  if (sizeMedia < SCREEN_WIDTH * 0.1) return SCREEN_WIDTH * 0.15;
  return sizeMedia;
};
// ✅ MediaItem chỉ nhận size từ ngoài → ổn định layout
const MediaItem = /*#__PURE__*/memo(({
  item,
  index,
  size,
  arrMedia,
  isShowAll,
  isReaction,
  currentMessage,
  onPressFile,
  onLongPressFile
}) => {
  const progressNum = Number(item?.progress);
  const safeProgress = Number.isFinite(progressNum) ? Math.max(0, Math.min(100, progressNum)) : 0;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(TouchableOpacity, {
      onLongPress: onLongPressFile,
      onPress: () => onPressFile?.(item, arrMedia?.length > 8 && index === 7, {
        ...currentMessage,
        file: arrMedia
      }),
      disabled: isReaction || item?.isLoading && item?.typeFile === 'video',
      style: [styles.mediaItem, {
        width: size,
        height: size
      }],
      children: [(item?.thumbnailPreview || item?.uri || item?.url) && /*#__PURE__*/_jsx(FastImage, {
        source: {
          uri: item?.thumbnailPreview || item?.uri || item?.url,
          priority: FastImage.priority.low
        },
        style: styles.image
      }), item?.typeFile === 'video' && /*#__PURE__*/_jsx(View, {
        style: [styles.playIcon, (safeProgress <= 0 || safeProgress >= 100 || item?.isLoading) && {
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: size * 0.5 / 2
        }],
        children: item?.isLoading ? /*#__PURE__*/_jsx(ActivityIndicator, {
          size: "small",
          color: Color.defaultBlue
        }) : (safeProgress <= 0 || safeProgress >= 100) && /*#__PURE__*/_jsx(FastImage, {
          source: require('./assets/play.png'),
          resizeMode: FastImage.resizeMode.cover,
          style: {
            width: size * 0.5 / 2,
            height: size * 0.5 / 2
          }
        })
      }), arrMedia?.length > 8 && index === 7 && !isShowAll && /*#__PURE__*/_jsx(View, {
        style: styles.reactionIcon,
        children: /*#__PURE__*/_jsxs(Text, {
          style: styles.reactionIconText,
          children: ["+ ", arrMedia?.length - 8 > 99 ? '99+' : arrMedia?.length - 8]
        })
      })]
    }), !item?.isLoading && safeProgress > 0 && safeProgress < 100 && /*#__PURE__*/_jsx(View, {
      style: [styles.progress, {
        width: size,
        height: size
      }],
      children: /*#__PURE__*/_jsx(AnimatedCircularProgress, {
        size: size * 0.3,
        width: 3,
        fill: safeProgress,
        tintColor: Color.white,
        backgroundColor: Color.defaultColor
      })
    })]
  });
}, (prev, next) => prev.item.uri === next.item.uri && prev.item.thumbnailPreview === next.item.thumbnailPreview && prev.item.progress === next.item.progress && prev.item.isLoading === next.item.isLoading && prev.size === next.size // ✅ so sánh luôn size
);
export function MessageFile({
  onPressFile,
  messageWidth,
  currentMessage,
  isReaction,
  onLayout,
  onSaveThumbnail,
  isShowAll,
  onLongPressFile
}) {
  const [arrMedia, setArrMedia] = useState(currentMessage?.file || []);

  // ✅ Cache để tránh tạo lại thumbnail
  const thumbnailCache = useRef(new Map());
  const processedFiles = useRef(new Set());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          file
        } = currentMessage;
        const getFileComplete = file?.filter(item => item.uri);
        if (!getFileComplete) return;

        // ✅ Chỉ xử lý những video chưa có thumbnail và chưa được xử lý
        const videosNeedThumbnail = getFileComplete.filter(item => item.typeFile === 'video' && !item?.thumbnailPreview && !processedFiles.current.has(item.uri));

        // ✅ Cập nhật loading state cho tất cả video chưa có thumbnail
        const newArrMediaLoading = getFileComplete.map(item => {
          if (item.typeFile === 'video' && !item?.thumbnailPreview) {
            const isProcessing = videosNeedThumbnail.some(v => v.uri === item.uri);
            return {
              ...item,
              isLoading: isProcessing
            };
          }
          return item;
        });
        setArrMedia(newArrMediaLoading);

        // ✅ Chỉ tạo thumbnail cho những video cần thiết
        if (videosNeedThumbnail.length > 0) {
          const result = await generateThumbnails(videosNeedThumbnail);

          // ✅ Cache thumbnail results
          result.forEach((res, index) => {
            const video = videosNeedThumbnail[index];
            if (video && res.path) {
              thumbnailCache.current.set(video.uri, res.path);
              processedFiles.current.add(video.uri);
            }
          });
        }

        // ✅ Cập nhật final state với thumbnail từ cache hoặc mới tạo
        const newArrMedia = getFileComplete.map(item => {
          if (item.typeFile === 'video') {
            const cachedThumbnail = thumbnailCache.current.get(item.uri);
            const thumbnail = item?.thumbnailPreview || cachedThumbnail || '';
            return {
              ...item,
              thumbnailPreview: thumbnail,
              isLoading: false
            };
          }
          return item;
        });
        onSaveThumbnail?.(newArrMedia);
        setArrMedia(newArrMedia);
      } catch (error) {
        console.log('error fetchData media', error);
      }
    };
    fetchData();
  }, [currentMessage, onSaveThumbnail]);
  const arrMediaShow = isShowAll ? arrMedia : arrMedia?.slice(0, 8);
  const size = calcSize(!!isShowAll, messageWidth);
  return /*#__PURE__*/_jsx(View, {
    onLayout: onLayout,
    style: [styles.container, {
      gap: GAP_MEDIA
    }],
    children: /*#__PURE__*/_jsx(FlatList, {
      data: arrMediaShow || [],
      renderItem: ({
        item,
        index
      }) => /*#__PURE__*/_jsx(MediaItem, {
        item: item,
        index: index,
        size: size,
        arrMedia: arrMedia,
        isShowAll: !!isShowAll,
        isReaction: isReaction,
        currentMessage: currentMessage,
        onPressFile: onPressFile,
        onLongPressFile: onLongPressFile
      }),
      keyExtractor: item => item?.clientId?.toString() || item?.uri?.toString(),
      numColumns: 4,
      scrollEnabled: false,
      columnWrapperStyle: {
        gap: GAP_MEDIA
      },
      initialNumToRender: 4,
      maxToRenderPerBatch: 4,
      windowSize: 5,
      removeClippedSubviews: false // ✅ tránh flicker
      ,
      getItemLayout: (_, index) => ({
        length: size,
        offset: Math.floor(index / 4) * size,
        index
      })
    })
  });
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8
  },
  mediaItem: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  playIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reactionIconText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
});
//# sourceMappingURL=MessageFile.js.map