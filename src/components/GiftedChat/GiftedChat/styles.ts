import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  contentContainer: {
    overflow: 'hidden',
  },
  headerImageViewer: {
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textHeaderImageViewer: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'semibold',
  },
});
