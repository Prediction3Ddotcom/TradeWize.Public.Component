import React from 'react';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import PropTypes from 'prop-types';
interface ControlsProps {
    styles: StyleProp<ViewStyle>;
    textStyles: StyleProp<TextStyle>;
    label: string;
    component: React.ReactNode;
    onPressControl: () => void;
    disabled: boolean;
}
declare function Controls(props: ControlsProps): import("react/jsx-runtime").JSX.Element;
declare namespace Controls {
    var propTypes: {
        styles: PropTypes.Requireable<object>;
        label: PropTypes.Requireable<string>;
        onPressControl: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default Controls;
//# sourceMappingURL=Controls.d.ts.map