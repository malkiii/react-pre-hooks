# useHash

Track and update the window location [hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash) value using this hook.

## Parameters

- the initial hash string (optional).

## Return Values

It returns a tuple of 2 values:

| Index | Name        | Type     | Description             |
| :---: | ----------- | -------- | ----------------------- |
|   0   | **hash**    | String   | the current hash value. |
|   1   | **setHash** | Function | updates the hash value. |

## Example Usage

```tsx
import { useHash } from 'realtime-hooks';

export default function Example() {
  const [hash, setHash] = useHash();

  return (
    <main>
      <p>Current hash: {hash}</p>
      <a href="#hash-one">One</a>
      <a href="#hash-two">Two</a>
      <a href="#hash-three">Three</a>
      <button onClick={() => setHash(crypto.randomUUID())}>Random hash</button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usehash-jjv59m?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useHash" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
