# useImageLoading

Use this hook to load an image in the **background** using its URL, and returns its loading state.

## Parameters

1. the image URL.
2. the **load** event handler function.

## Return Values

| Name          | Type             | Description              |
| ------------- | ---------------- | ------------------------ |
| **isLoading** | Boolean          | the image loading state. |
| **image**     | HTMLImageElement | the loaded image.        |

## Example Usage

```tsx
import { useImageLoading } from 'realtime-hooks';

const url = 'https://picsum.photos/1280/960';

export default function Example() {
  const { isLoading, image } = useImageLoading(url, () => console.log('Loaded.'));

  return (
    <main>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img src={url} alt="image" />
          <p>
            Width: {image.width}, Height: {image.height}
          </p>
        </div>
      )}
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useimageloading-v587vv?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useImageLoading" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
