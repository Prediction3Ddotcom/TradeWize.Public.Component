"use strict";

import TradewizeComponent from "./NativeTradewizeComponent.js";
export function multiply(a, b) {
  return TradewizeComponent.multiply(a, b);
}

// Export common components
export { Button } from "./components/button.js";
export { CustomText as Text } from "./components/text.js";
export { Input } from "./components/input.js";
export { SelectBox } from "./components/SelectBox.js";
export { default as BaseContainer } from "./components/baseContainer.js";
export { default as HeaderBase } from "./components/header.js";
export { scaleSize, BASE_WIDTH, BASE_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from "./utils/index.js";
//# sourceMappingURL=index.js.map