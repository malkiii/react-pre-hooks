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

<iframe src="https://codesandbox.io/embed/qt5p4w?view=Editor+%2B+Preview&module=%2Fsrc%2Fcomponent.tsx&hidenavigation=1" style="width:100%; height: 500px; border:0; overflow:hidden;" title="useClock" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
