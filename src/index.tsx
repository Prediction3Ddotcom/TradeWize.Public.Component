import TradewizeComponent from './NativeTradewizeComponent';

export function multiply(a: number, b: number): number {
  return TradewizeComponent.multiply(a, b);
}

// Export common components
export { Button } from './components/button';
export type { ButtonProps } from './components/button';
export { CustomText as Text } from './components/text';
export type { TextProps } from './components/text';
