# useNetworkState

This hook can track the user connection changes and return whether is **online** or **offline** with some of the user network informations.

## Return Values

| Name                | Type    | Description                                                                                                             |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| **isOnline**        | Boolean | determines whether the user is **online** or not.                                                                       |
| **...informations** | Object  | the [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) about the user connection |

::: warning
Some of the `NetworkInformation` properties may not supported in other browsers. checkout [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)
:::

## Example Usage

```tsx
import { useNetworkState } from 'realtime-hooks';

export default function Example() {
  const { isOnline } = useNetworkState();

  return (
    <main>
      <p>
        You are <span>{isOnline ? 'online' : 'offline'}</span>.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usenetworkstate-ly72rq?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useNetworkState" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
