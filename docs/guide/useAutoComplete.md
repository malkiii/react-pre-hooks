# useAutoComplete

This hook can filter a list of any values using a debounced string, and it takes some additional options.

## Options

| Name         | Type     | Description                                                                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **initial**  | String   | the initial string value (default is `''`).                                                                                  |
| **debounce** | Number   | delay before switching to the next value in `ms`                                                                             |
| **filter**   | Function | the filter function that takes the current search value, the iteration value, and its index: `(search, value, index) => any` |
| **sort**     | Boolean  | whether the result array has to be sorted or not.                                                                            |

## Return Values

It returns a tuple of 3 values:

| Index | Name            | Type     | Description                        |
| :---: | --------------- | -------- | ---------------------------------- |
|   0   | **value**       | String   | the current search value.          |
|   1   | **setValue**    | Function | set the search value.              |
|   2   | **suggestions** | Array    | the result array (filtered array). |

## Example Usage

let's say we have a list of products, each product has `name` and `description`, and we will create a component from it:

<!--
```ts
const products = [
  {
    name: 'Samsung Universe 10',
    description: "Samsung's new variant which goes beyond Galaxy to the Universe"
  },
  {
    name: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple'
  },
  {
    name: 'MacBook Pro',
    description: 'MacBook Pro 2021 with mini-LED display may launch between September, November'
  },
  {
    name: 'Infinix INBOOK',
    description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty'
  },
  {
    name: 'Orange Essence Food Flavou',
    description: 'Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item'
  },
  {
    name: 'Plant Hanger For Home',
    description: 'Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf'
  }
];
```
-->

```tsx
import { useAutoComplete } from 'realtime-hooks';

const products = [...];

export default function Products() {
  const [text, setText, result] = useAutoComplete(products, {
    debounce: 250,
    filter: (text, product) => {
      return product.name.toLowerCase().includes(text.toLowerCase());
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
