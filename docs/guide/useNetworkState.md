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
      <div>You are {isOnline ? 'online' : 'offline'}</div>
    </main>
  );
}
```
