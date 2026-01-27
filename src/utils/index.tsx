import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const scaleX = width / BASE_WIDTH;
const scaleY = height / BASE_HEIGHT;

const scale = (scaleX + scaleY) / 2;

const scaleSize = (size: number) => {
  return size * scale;
};

export const responsiveFontSize = (
  size: number,
  options: {
    baseWidth?: number;
    baseHeight?: number;
    minScale?: number;
    maxScale?: number;
  } = {}
) => {
  const {
    baseWidth = 375, // Chiều rộng thiết kế chuẩn (iPhone X)
    baseHeight = 812, // Chiều cao thiết kế chuẩn
    minScale = 0.8, // Tỷ lệ scale tối thiểu
    maxScale = 1.3, // Tỷ lệ scale tối đa
  } = options;

  // Tính scale factor dựa trên width
  const widthScale = width / baseWidth;
  const heightScale = height / baseHeight;

  // Lấy scale nhỏ hơn để đảm bảo text không bị tràn
  const scaleFactor = Math.min(widthScale, heightScale);

  // Giới hạn scale trong khoảng cho phép
  const limitedScale = Math.max(minScale, Math.min(maxScale, scaleFactor));

  // Tính font size mới và làm tròn theo PixelRatio
  const newSize = size * limitedScale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export {
  BASE_WIDTH,
  BASE_HEIGHT,
  scaleSize,
  width as SCREEN_WIDTH,
  height as SCREEN_HEIGHT,
};
