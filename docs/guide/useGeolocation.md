# useGeolocation

Track the current geolocation of the client using this hook.

## Options

- It takes the geolocation [position options](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#options).

## Return Values

| Name               | Type    | Description                                                                                                                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isLoading**      | Boolean | a loading state.                                                                                                                                                          |
| **error**          | Object  | the gerolocation [error](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError) if the page doesn't have the permission for example, or other things. |
| **...coordinates** | Object  | the current geolocation [coordinates](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates).                                                           |

## Example Usage

```tsx
import { useGeolocation } from 'realtime-hooks';

export default function Example() {
  const { isLoading, error, ...coords } = useGeolocation();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <table>
        {Object.entries(coords).map(([name, value]) => (
          <tr>
            <th>{name}</th>
            <td>{value}</td>
          </tr>
        ))}
      </table>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usegeolocation-8jr99q?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useGeolocation" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
