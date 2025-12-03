"use strict";

import TradewizeComponent from "./NativeTradewizeComponent.js";
export function multiply(a, b) {
  return TradewizeComponent.multiply(a, b);
}

// Export common components
export { Button } from "./components/button.js";
export { CheckboxButton } from "./components/checkboxButton.js";
export { CustomText as Text } from "./components/text.js";
export { Input } from "./components/input.js";
export { DatePicker } from "./components/DatePicker.js";
export { BottomSelector } from "./components/bottomSelector.js";
export { default as DatePickerModal } from "./components/modalDatePicker.js";
export { default as WheelDatePicker } from "./components/WheelDatePicker.js";
export { default as WheelMonthYearPicker } from "./components/WheelMonthYearPicker.js";
export { default as BaseContainer } from "./components/baseContainer.js";
export { default as HeaderBase } from "./components/header.js";
export { VideoModal } from "./components/VideoModal/index.js";
export { useKeyboardHeight } from "./hooks/useKeyboardHeight.js";
export { scaleSize, BASE_WIDTH, BASE_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from "./utils/index.js";
//# sourceMappingURL=index.js.map