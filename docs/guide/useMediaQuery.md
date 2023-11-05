# useMediaQuery

Track the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) changes of a media query using this hook.

## Parameters

- the media query string.

## Return Values

It returns a `boolean`, which indicates whether the query has matched or not.

## Example Usage

```tsx
import { useMediaQuery } from 'realtime-hooks';

export default function Example() {
  const matches = useMediaQuery('(prefers-color-scheme: dark)');

  const colorScheme = matches ? 'dark' : 'light';

  return (
    <main style={{ colorScheme }}>
      <p>
        System color scheme is <span>{colorScheme}</span>.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usemediaquery-zrp855?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useMediaQuery" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
