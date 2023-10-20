# useFileDropzone

Build a **file dropzone** component easily with this hook, it handles file dropping to a label of a file input.

## Options

| Name           | Type     | Description                                                                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **multiple**   | Boolean  | use multiple files or not (default is `false`).                                                                                                             |
| **extensions** | Array    | an array of allowed file extensions.                                                                                                                        |
| **minSize**    | Number   | the minimum file size in `MB`.                                                                                                                              |
| **maxSize**    | Number   | the maximum file size in `MB`.                                                                                                                              |
| **readAs**     | String   | the file data type which can be `array-buffer`, `binary-string`, `url`, or `text`.                                                                          |
| **onUpload**   | Function | a handler that will be executed when the user uploads any files, and it takes an array of [`Files`](https://developer.mozilla.org/en-US/docs/Web/API/File). |

## Return Values

| Name           | Type      | Description                                                   |
| -------------- | --------- | ------------------------------------------------------------- |
| **ref**        | RefObject | the target element reference.                                 |
| **files**      | Array     | an array of the [`DroppedFile`](#droppedfile-object) objects. |
| **isDragging** | Boolean   | whether the user is dragging or not.                          |
| **isLoading**  | Boolean   | whether the uploaded files are in progress or not.            |
| **error**      | Error     | the [`DropzoneError`](#dropzoneerror-object) error.           |
| **setError**   | Function  | set your own error.                                           |

### `DroppedFile` Object

| Name          | Type     | Description                                                                                                                                               |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**      | String   | the filename.                                                                                                                                             |
| **size**      | Number   | the file size in `MB`.                                                                                                                                    |
| **extension** | String   | the file extension.                                                                                                                                       |
| **data**      | FileData | the file data type depends on `readAs` option, if you don't use this it will be a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object. |

### `DropzoneError` Object

| Name        | Type   | Description                                                                                                                                                                                                |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**    | String | the error type can be any string, it will be `size` if an uploaded file doesn't satisfy the `minSize` or `maxSize`, and it will be `extension` if its extension is not included in the `extensions` array. |
| **message** | String | the error message.                                                                                                                                                                                         |

::: info
You can add `<input type="file" />` inside the dropzone element and the input files will also be included in the `files` array.
:::

## Example Usage

```tsx
import { useFileDropzone } from 'realtime-hooks';

export default function ImageDropzone() {
  const { ref, files, isLoading, error } = useFileDropzone({
    multiple: true,
    extensions: ['jpg', 'png', 'svg'],
    readAs: 'url',
    maxSize: 10
  });

  return (
    <main>
      <h1>Drop images to this box!</h1>
      {error && <p>{error.message}</p>}
      <label ref={ref} className={isLoading ? 'uploading' : ''}>
        {files.map(image => (
          <img key={image.name} alt={image.name} src={image.data} />
        ))}
        <input type="file" accept="image/*" hidden />
      </label>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usefiledropzone-m466pj?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useFileDropzone" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
