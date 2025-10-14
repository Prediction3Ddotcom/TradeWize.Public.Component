import { StyleSheet, Text, type TextStyle } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

// Simple icon component using Unicode symbols
export function Icon({ name, style }: IconProps) {
  const iconMap: Record<string, string> = {
    'heart': '❤️',
    'star': '⭐',
    'plus': '➕',
    'minus': '➖',
    'check': '✓',
    'cross': '✗',
    'x': '✕',
    'arrow-right': '→',
    'arrow-left': '←',
    'arrow-up': '↑',
    'arrow-down': '↓',
    'home': '🏠',
    'user': '👤',
    'settings': '⚙️',
    'search': '🔍',
    'share': '📤',
    'download': '⬇️',
    'upload': '⬆️',
    'edit': '✏️',
    'delete': '🗑️',
    'save': '💾',
    'refresh': '🔄',
    'camera': '📷',
    'phone': '📞',
    'mail': '📧',
    'calendar': '📅',
    'clock': '🕐',
    'location': '📍',
    'lock': '🔒',
    'unlock': '🔓',
    'eye': '👁️',
    'eye-off': '🙈',
    'bell': '🔔',
    'bookmark': '🔖',
    'like': '👍',
    'dislike': '👎',
    'comment': '💬',
    'send': '📤',
    'copy': '📋',
    'cut': '✂️',
    'paste': '📋',
    'undo': '↶',
    'redo': '↷',
    'play': '▶️',
    'pause': '⏸️',
    'stop': '⏹️',
    'volume': '🔊',
    'mute': '🔇',
    'wifi': '📶',
    'battery': '🔋',
    'bluetooth': '📱',
    'wifi-off': '📵',
  };

  return <Text style={[styles.icon, style]}>{iconMap[name] || '❓'}</Text>;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});
