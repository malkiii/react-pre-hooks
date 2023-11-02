# useFileDropArea

Build a **file drop area** component easily with this hook, it handles file dropping to a label of a file input.

## Options

| Name         | Type      | Description                                                                                                                                               |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**      | RefObject | the target element reference.                                                                                                                             |
| **multiple** | Boolean   | use multiple files or not (default is `false`).                                                                                                           |
| **onUpload** | Function  | a handler that will be executed when the user uploads any files, and it takes an array of [Files](https://developer.mozilla.org/en-US/docs/Web/API/File). |

## Return Values

a `ref` object of the target element.

### `DroppedFile` Object

| Name          | Type     | Description                                                                                                                                               |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**      | String   | the filename.                                                                                                                                             |
| **size**      | Number   | the file size in `MB`.                                                                                                                                    |
| **extension** | String   | the file extension.                                                                                                                                       |
| **data**      | FileData | the file data type depends on `readAs` option, if you don't use this it will be a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object. |

::: info
You can add `<input type="file" />` **inside** the area element and the input files will also be included.
:::

## Example Usage

```tsx
import { useArray, useFileDropArea } from 'realtime-hooks';

export default function Example() {
  const images = useArray<string>([]);

  const ref = useFileDropArea({
    multiple: true,
    onUpload: files =>
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => images.push(reader.result);
        reader.readAsDataURL(file);
      })
  });

  return (
    <main>
      <h1>Drop images to this box!</h1>
      <label ref={ref}>
        {images.map((image, index) => (
          <img key={index} alt={`image-${index}`} src={image} />
        ))}
        <input type="file" accept="image/*" hidden />
      </label>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usefiledropzone-m466pj?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useFileDropzone" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
