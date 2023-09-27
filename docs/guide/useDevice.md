# useDevice

Detect the device type with some boolean values.

## Return Values

| Name          | Type    | Description                                                                 |
| ------------- | ------- | --------------------------------------------------------------------------- |
| **device**    | String  | device type (`desktop`, `mobile`...).                                       |
| **isDesktop** | Boolean | the device is a **desktop** or not.                                         |
| **isMobile**  | Boolean | the device is a **mobile** or not.                                          |
| **isTablet**  | Boolean | the device is a **tablet** or not (this also leads `isMobile` to be true).  |
| **isSmartTV** | Boolean | the device is a **smart TV** or not.                                        |
| **isConsole** | Boolean | the device is a **console** device or not (PlayStation, Xbox, Nintendo...). |

## Example Usage

```tsx
import { useDevice } from 'realtime-hooks';

export default function Example() {
  const { device } = useDevice();

  return (
    <main>
      <div>The current device is a {device}</div>
    </main>
  );
}
```
