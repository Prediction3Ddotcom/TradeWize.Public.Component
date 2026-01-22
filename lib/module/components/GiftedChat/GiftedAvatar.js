"use strict";

import { useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Color from "./Color.js";
import stylesCommon from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const {
  carrot,
  emerald,
  peterRiver,
  wisteria,
  alizarin,
  turquoise,
  midnightBlue
} = Color;
const styles = StyleSheet.create({
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarTransparent: {
    backgroundColor: Color.backgroundTransparent
  },
  textStyle: {
    color: Color.white,
    fontSize: 16,
    backgroundColor: Color.backgroundTransparent,
    fontWeight: '500'
  }
});
export function GiftedAvatar(props) {
  const [avatarName, setAvatarName] = useState(undefined);
  const [backgroundColor, setBackgroundColor] = useState(undefined);
  const {
    user,
    avatarStyle,
    textStyle,
    onPress
  } = props;
  const setAvatarColor = useCallback(() => {
    if (backgroundColor) return;
    const userName = user?.name || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) setAvatarName(`${name[0]?.charAt(0)}`);else if (name.length > 1) setAvatarName(`${name[0]?.charAt(0)}${name[1]?.charAt(0)}`);else setAvatarName('');
    let sumChars = 0;
    for (let i = 0; i < userName.length; i += 1) sumChars += userName.charCodeAt(i);

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue];
    setBackgroundColor(colors[sumChars % colors.length]);
  }, [user?.name, backgroundColor]);
  const renderAvatar = useCallback(() => {
    switch (typeof user?.avatar) {
      case 'function':
        return user.avatar([stylesCommon.centerItems, styles.avatarStyle, avatarStyle]);
      case 'string':
        return /*#__PURE__*/_jsx(Image, {
          source: {
            uri: user.avatar
          },
          style: [stylesCommon.centerItems, styles.avatarStyle, avatarStyle]
        });
      case 'number':
        return /*#__PURE__*/_jsx(Image, {
          source: user.avatar,
          style: [stylesCommon.centerItems, styles.avatarStyle, avatarStyle]
        });
      default:
        return null;
    }
  }, [user, avatarStyle]);
  const renderInitials = useCallback(() => {
    return /*#__PURE__*/_jsx(Text, {
      style: [styles.textStyle, textStyle],
      children: avatarName
    });
  }, [textStyle, avatarName]);
  const handleOnPress = () => {
    const {
      onPress,
      ...rest
    } = props;
    if (onPress) onPress(rest);
  };
  const handleOnLongPress = () => {
    const {
      onLongPress,
      ...rest
    } = props;
    if (onLongPress) onLongPress(rest);
  };
  useEffect(() => {
    setAvatarColor();
  }, [setAvatarColor]);
  if (!user || !user.name && !user.avatar)
    // render placeholder
    return /*#__PURE__*/_jsx(View, {
      style: [stylesCommon.centerItems, styles.avatarStyle, styles.avatarTransparent, avatarStyle],
      accessibilityRole: "image"
    });
  if (user.avatar) return /*#__PURE__*/_jsx(TouchableOpacity, {
    disabled: !onPress,
    onPress: handleOnPress,
    onLongPress: handleOnLongPress,
    accessibilityRole: "image",
    children: renderAvatar()
  });
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    disabled: !onPress,
    onPress: handleOnPress,
    onLongPress: handleOnLongPress,
    style: [stylesCommon.centerItems, styles.avatarStyle, {
      backgroundColor
    }, avatarStyle],
    accessibilityRole: "image",
    children: renderInitials()
  });
}
//# sourceMappingURL=GiftedAvatar.js.map