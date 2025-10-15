import React, { type ReactNode } from 'react';
import { type ViewStyle, type StyleProp } from 'react-native';
interface BaseContainerProps {
    children: ReactNode;
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
    statusBarStyle?: 'light-content' | 'dark-content';
    isPaddingToSafeArea?: boolean;
}
declare const BaseContainer: React.FC<BaseContainerProps>;
export default BaseContainer;
//# sourceMappingURL=baseContainer.d.ts.map