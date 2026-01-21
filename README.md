# tradewize-component

list component

## Installation


```sh
npm install tradewize-component
```


## Usage


```js
import { multiply } from 'tradewize-component';

// ...

const result = multiply(3, 7);
```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


# TradeWize Component

## Installation
```bash
npm install tradewize-component
# or
yarn add tradewize-component
```

### Font Setup (Required)

After installing, link the fonts:

**Option 1: Automatic (Recommended)**
```bash
npx react-native-asset
```

**Option 2: Manual**

Add to your project's `react-native.config.js`:
```javascript
module.exports = {
  assets: [
    './node_modules/tradewize-component/assets/fonts/',
  ],
};
```

Then run:
```bash
npx react-native-asset
```

**For iOS:**
```bash
cd ios && pod install && cd ..
```

**Rebuild:**
```bash
npx react-native run-ios
npx react-native run-android
```

## Usage
```typescript
import { TWText, TWButton } from 'tradewize-component';

function App() {
  return (
    <>
      <TWText variant="bold" size="lg">Hello World</TWText>
      <TWButton title="Press me" />
    </>
  );
}
```