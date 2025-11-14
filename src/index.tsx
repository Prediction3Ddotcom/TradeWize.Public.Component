import TradewizeComponent from './NativeTradewizeComponent';

export function multiply(a: number, b: number): number {
  return TradewizeComponent.multiply(a, b);
}

// Export common components
export { Button } from './components/button';
export type { ButtonProps } from './components/button';
export { CheckboxButton } from './components/checkboxButton';
export type { CheckboxButtonProps } from './components/checkboxButton';
export { CustomText as Text } from './components/text';
export type { TextProps } from './components/text';
export { Input } from './components/input';
export type { InputProps } from './components/input';
export { DatePicker } from './components/DatePicker';
export type { DatePickerProps } from './components/DatePicker';
export { BottomSelector } from './components/bottomSelector';
export type {
  BottomSelectorProps,
  BottomSelectorOption,
} from './components/bottomSelector';
export { default as DatePickerModal } from './components/modalDatePicker';
export type { DatePickerModalProps } from './components/modalDatePicker';
export { default as WheelDatePicker } from './components/WheelDatePicker';
export type { WheelDatePickerProps } from './components/WheelDatePicker';
export { default as WheelMonthYearPicker } from './components/WheelMonthYearPicker';
export type { WheelMonthYearPickerProps } from './components/WheelMonthYearPicker';
export { default as BaseContainer } from './components/baseContainer';
export type { BaseContainerProps } from './components/baseContainer';
export { default as HeaderBase } from './components/header';
export type { HeaderBaseProps } from './components/header';

export { useKeyboardHeight } from './hooks/useKeyboardHeight';

export {
  scaleSize,
  BASE_WIDTH,
  BASE_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from './utils';
