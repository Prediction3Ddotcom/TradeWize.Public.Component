import React from 'react';
import {
  View,
  type ViewStyle,
  type TextStyle,
  StyleSheet,
  Image,
} from 'react-native';
import { Button } from './button';
import { CustomText } from './text';

export interface HeaderAction {
  icon?: React.ReactNode; // Icon component (ví dụ <Ionicons name="search" />)
  label?: string; // Text thay icon (nếu có)
  onPress?: () => void; // Action khi bấm
}

export interface HeaderBaseProps {
  title?: string | React.ReactNode; // Tiêu đề (text hoặc custom component)
  titleAlign?: 'left' | 'center' | 'right';
  leftActions?: HeaderAction[]; // Các nút bên trái
  rightActions?: HeaderAction[]; // Các nút bên phải
  containerStyle?: ViewStyle; // Custom style container
  titleStyle?: TextStyle; // Custom style title
  height?: number; // Chiều cao (default: 56)
  backgroundColor?: string; // Màu nền
  border?: boolean; // Hiển thị border bottom
  styleButtonLeft?: ViewStyle;
  colorIconLeft?: string;
  showDefaultLeft?: boolean; // Cho phép tắt default left action
  onPressBack?: () => void; // Custom hành động nút back mặc định
  renderCustomContent?: () => React.ReactNode; // Custom hoàn toàn nội dung header
}

const HeaderBase: React.FC<HeaderBaseProps> = ({
  title,
  titleAlign = 'center',
  leftActions = [],
  rightActions = [],
  containerStyle,
  titleStyle,
  height = 56,
  backgroundColor = '#fff',
  border = false,
  styleButtonLeft,
  showDefaultLeft = true,
  colorIconLeft = '#000000',
  onPressBack,
  renderCustomContent,
}) => {
  if (renderCustomContent) {
    return (
      <View style={[styles.container, containerStyle]}>
        {renderCustomContent()}
      </View>
    );
  }

  const getTitleAlignment = () => {
    if (titleAlign === 'center') return 'center';
    if (titleAlign === 'left') return 'flex-start';
    return 'flex-end';
  };

  const renderLeftActions = () => {
    // Nếu có leftActions → render chúng
    if (leftActions && leftActions.length > 0) {
      return leftActions
        .filter((a: any) => a.visible !== false)
        .map((action, index) => (
          <Button
            variant="ghost"
            key={`left-${index}`}
            style={[styles.actionButton, styleButtonLeft]}
            onPress={action.onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {action.icon || (
              <CustomText style={styles.actionLabel}>{action.label}</CustomText>
            )}
          </Button>
        ));
    }

    // Nếu không có và showDefaultLeft = true → render nút back mặc định
    if (showDefaultLeft) {
      return (
        <Button
          variant="ghost"
          onPress={onPressBack}
          style={[styles.actionButton, styleButtonLeft]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../assets/arrow_left.png')}
            style={styles.iconLeft}
            tintColor={colorIconLeft}
          />
        </Button>
      );
    }

    // Nếu tắt defaultLeft → render View rỗng để giữ cân đối layout
    return <View style={[styles.layoutLeftDefault, styleButtonLeft]} />;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height },
        border && styles.border,
        containerStyle,
      ]}
    >
      {/* Left Actions */}
      <View style={styles.sideContainer}>{renderLeftActions()}</View>

      {/* Title */}
      <View
        style={[styles.titleContainer, { alignItems: getTitleAlignment() }]}
      >
        {typeof title === 'string' ? (
          <CustomText numberOfLines={1} style={[styles.title, titleStyle]}>
            {title}
          </CustomText>
        ) : (
          title
        )}
      </View>

      {/* Right Actions */}
      <View style={styles.sideContainer}>
        {rightActions.map((action, index) => (
          <Button
            variant="ghost"
            key={`right-${index}`}
            style={styles.actionButton}
            onPress={action.onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {action.icon || (
              <CustomText style={styles.actionLabel}>{action.label}</CustomText>
            )}
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 40,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  actionButton: {
    paddingHorizontal: 6,
  },
  actionLabel: {
    fontSize: 16,
    color: '#007AFF',
  },
  layoutLeftDefault: {
    width: 24,
  },
  iconLeft: {
    width: 24,
    height: 24,
  },
});

export default HeaderBase;
