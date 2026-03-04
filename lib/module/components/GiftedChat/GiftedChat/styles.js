"use strict";

import { Dimensions, StyleSheet } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default StyleSheet.create({
  contentContainer: {
    overflow: 'hidden'
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
    backgroundColor: 'transparent'
  },
  headerImageViewer: {
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textHeaderImageViewer: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'semibold'
  }
});
//# sourceMappingURL=styles.js.map