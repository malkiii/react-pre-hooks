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
      <p>
        Current device is <span>{device}</span>.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usedevice-p8v7ky?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useDevice" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
