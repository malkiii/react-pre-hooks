# useAutoComplete

This hook can filter a list of any values using a debounced string, and it takes some additional options.

## Parameters

1. an array of given values.
2. and some options:

| Name         | Type                | Description                                                                                                                                                                                     |
| ------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **initial**  | String              | the initial string value (default is `''`).                                                                                                                                                     |
| **debounce** | Number              | delay before switching to the next value in `ms`                                                                                                                                                |
| **filter**   | Function            | the filter function that takes the current search value, the iteration value, and its index: `(search, value, index) => any`                                                                    |
| **sort**     | Boolean or Function | whether the result array has to be sorted or not, or sort it using a [compare function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn). |

## Return Values

It returns a tuple of 3 values:

| Index | Name            | Type     | Description                        |
| :---: | --------------- | -------- | ---------------------------------- |
|   0   | **value**       | String   | the current search value.          |
|   1   | **setValue**    | Function | set the search value.              |
|   2   | **suggestions** | Array    | the result array (filtered array). |

## Example Usage

let's say we have a list of products, each product has `name` and `description`, and we will create a component from it:

```tsx
import { useAutoComplete } from 'realtime-hooks';

const products = [...];

export default function Products() {
  const [text, setText, result] = useAutoComplete(products, {
    debounce: 300,
    filter: (text, product) => {
      const t = text.toLowerCase();
      const name = product.name.toLowerCase();
      const desc = product.description.toLowerCase();
      return name.includes(t) || desc.includes(t);
    }
  });

  return (
    <main>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <ul>
        {result.map(product => (
          <li key={product.name}>
            <strong>{product.name}</strong>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useautocomplete-sqtl6k?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useAutoComplete" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
