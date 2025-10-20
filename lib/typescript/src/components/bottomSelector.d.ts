import React from 'react';
import { type ViewStyle, type TextStyle, type StyleProp } from 'react-native';
import type { ModalProps } from 'react-native-modal';
export interface BottomSelectorOption<T = any> {
    label: string;
    value: T;
    icon?: React.ReactNode;
    disabled?: boolean;
}
export interface BottomSelectorProps<T = any> extends Partial<Omit<ModalProps, 'isVisible'>> {
    isVisible: boolean;
    onClose: () => void;
    options: BottomSelectorOption<T>[];
    onSelect: (option: BottomSelectorOption<T>) => void;
    title?: string;
    selectedValue?: T;
    showSelectedIcon?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    optionStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    optionTextStyle?: StyleProp<TextStyle>;
    selectedOptionStyle?: StyleProp<ViewStyle>;
    disabledOptionStyle?: StyleProp<ViewStyle>;
    cancelText?: string;
    showCancelButton?: boolean;
    emptyText?: string;
    initialNumToRender?: number;
    enableSearch?: boolean;
    searchPlaceholder?: string;
    searchInputStyle?: StyleProp<ViewStyle>;
    onSearchChange?: (searchText: string) => void;
    buttonCancelStyle?: StyleProp<ViewStyle>;
    buttonCancelTextStyle?: StyleProp<TextStyle>;
}
export declare function BottomSelector<T = any>({ isVisible, onClose, options, onSelect, title, selectedValue, showSelectedIcon, containerStyle, optionStyle, titleStyle, optionTextStyle, selectedOptionStyle, disabledOptionStyle, cancelText, showCancelButton, emptyText, initialNumToRender, enableSearch, searchPlaceholder, searchInputStyle, buttonCancelStyle, buttonCancelTextStyle, onSearchChange, ...modalProps }: BottomSelectorProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=bottomSelector.d.ts.map