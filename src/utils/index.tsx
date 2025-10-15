import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const scaleX = width / BASE_WIDTH;
const scaleY = height / BASE_HEIGHT;

const scale = (scaleX + scaleY) / 2;

const scaleSize = (size: number) => {
  return size * scale;
};

export {
  BASE_WIDTH,
  BASE_HEIGHT,
  scaleSize,
  width as SCREEN_WIDTH,
  height as SCREEN_HEIGHT,
};
