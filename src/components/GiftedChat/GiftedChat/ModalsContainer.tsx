import { memo } from 'react';
import ImageView from 'react-native-image-viewing';
import { VideoModal } from '../../VideoModal';
import { CameraModal } from '../Camera';
import { MessageWithReaction } from '../MessageWithReaction';
import { MediaAllShow } from '../MediaAllShow';
import { type FileMessage, type IMessage, type User } from '../types';

interface ModalsContainerProps<TMessage extends IMessage = IMessage> {
  // Image Viewer
  isImageViewerVisible: boolean;
  fileSelected: { uri: string } | null;
  setIsImageViewerVisible: (v: boolean) => void;

  // Video Modal
  isShowVideoModal: boolean;
  setIsShowVideoModal: (v: boolean) => void;

  // Reaction Modal
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

  // Media All Show
  isMediaAllShow: boolean;
  setIsMediaAllShow: (v: boolean) => void;
  fileMediaAllLocal: IMessage | null;
  handlePressFile: (file: FileMessage) => void;

  // Camera Modal
  isShowCameraModal: boolean;
  setIsShowCameraModal: (v: boolean) => void;
  onVideoRecorded: (video: any) => void;
  onPhotoCaptured: (photo: any) => void;
}

function ModalsContainerInner<TMessage extends IMessage = IMessage>({
  isImageViewerVisible,
  fileSelected,
  setIsImageViewerVisible,
  isShowVideoModal,
  setIsShowVideoModal,
  isShowEmojiReaction,
  isModalReaction,
  setIsModalReaction,
  messageSelected,
  user,
  handleReactionEmoji,
  handleActionReaction,
  isMediaAllShow,
  setIsMediaAllShow,
  fileMediaAllLocal,
  handlePressFile,
  isShowCameraModal,
  setIsShowCameraModal,
  onVideoRecorded,
  onPhotoCaptured,
}: ModalsContainerProps<TMessage>) {
  return (
    <>
      <ImageView
        images={fileSelected ? [{ uri: fileSelected.uri }] : []}
        imageIndex={0}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)}
      />
      <VideoModal
        txtSkipButton={'X'}
        visible={isShowVideoModal}
        onClose={() => setIsShowVideoModal(false)}
        subtitle={{}}
        source={fileSelected?.uri || ''}
        autoPlay={true}
        isProgressBar={false}
      />
      <MessageWithReaction
        isShowEmoji={isShowEmojiReaction}
        onReactionEmoji={handleReactionEmoji}
        onActionReaction={handleActionReaction}
        user={user as User}
        isVisible={isModalReaction}
        onClose={() => setIsModalReaction(false)}
        message={messageSelected?.message || ({} as TMessage)}
        position={messageSelected?.position || ({} as any)}
      />
      <MediaAllShow
        fileMediaAll={fileMediaAllLocal}
        isVisible={isMediaAllShow}
        onClose={() => setIsMediaAllShow(false)}
        onPressFile={(file) => {
          setIsMediaAllShow(false);
          setTimeout(() => {
            handlePressFile(file);
          }, 350);
        }}
      />
      <CameraModal
        mode="both"
        isCanPause={false}
        onVideoRecorded={onVideoRecorded}
        onPhotoCaptured={onPhotoCaptured}
        visible={isShowCameraModal}
        onClose={() => setIsShowCameraModal(false)}
      />
    </>
  );
}

export const ModalsContainer = memo(
  ModalsContainerInner
) as typeof ModalsContainerInner;
