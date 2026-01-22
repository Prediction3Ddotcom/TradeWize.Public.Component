import { type TextInputProps } from 'react-native';
export interface ComposerProps {
    composerHeight?: number;
    text?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    textInputProps?: Partial<TextInputProps>;
    textInputStyle?: TextInputProps['style'];
    textInputAutoFocus?: boolean;
    keyboardAppearance?: TextInputProps['keyboardAppearance'];
    multiline?: boolean;
    disableComposer?: boolean;
    onTextChanged?(text: string): void;
    onInputSizeChanged?(layout: {
        width: number;
        height: number;
    }): void;
    onPressPickMedia?: (type: 'camera' | 'pick') => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
export declare const Composer: import("react").ForwardRefExoticComponent<ComposerProps & import("react").RefAttributes<import("react-native/types_generated/Libraries/Components/TextInput/TextInput.flow").TextInputType>>;
//# sourceMappingURL=Composer.d.ts.map