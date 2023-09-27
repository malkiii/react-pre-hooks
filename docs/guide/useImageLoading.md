# useImageLoading

Use this hook to load an image in the **background** using its URL, and returns its loading state.

## Parameters

| Name        | Type     | Description              |
| ----------- | -------- | ------------------------ |
| **url**     | String   | the image URL.           |
| **handler** | Function | the `load` event handler |

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
