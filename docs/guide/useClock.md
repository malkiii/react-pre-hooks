# useClock

This hook returns the current date time every second or a `timeout` value.

## Options

| Name        | Type   | Description                                                                 |
| ----------- | ------ | --------------------------------------------------------------------------- |
| **timeout** | Number | the time between the current and the next date value (default is `1000ms`). |

## Return Values

a `date` object of the current time.

## Example Usage

```tsx
import { useClock } from 'react-pre-hooks';

export default function Clock() {
  const time = useClock();

  return (
    <main>
      <p>{time.toUTCString()}</p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usetimer-3-pyw438?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useTimer-3" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
