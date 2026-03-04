import { type ViewStyle, type TextStyle } from 'react-native';
import { type LeftRightStyle, type IMessage } from './types';
export interface TimeProps<TMessage extends IMessage> {
    position?: 'left' | 'right';
    currentMessage: TMessage;
    containerStyle?: LeftRightStyle<ViewStyle>;
    timeTextStyle?: LeftRightStyle<TextStyle>;
    timeFormat?: string;
}
declare function TimeComponent<TMessage extends IMessage = IMessage>({ position, containerStyle, currentMessage, timeFormat, timeTextStyle, }: TimeProps<TMessage>): import("react/jsx-runtime").JSX.Element | null;
export declare const Time: typeof TimeComponent;
export {};
//# sourceMappingURL=Time.d.ts.map