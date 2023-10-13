# useCss

You can use and insert some actual CSS in `object` format with this hook, and it works also with [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting).

## Options

| Name    | Type      | Description                                                                                                                 |
| ------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| **ref** | RefObject | the **root** element reference (default is [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) tag). |

## Return Values

| Name        | Type      | Description                     |
| ----------- | --------- | ------------------------------- |
| **rootRef** | RefObject | the **root** element reference. |
| **cssText** | String    | the minified CSS string.        |

## Example Usage

```tsx
import { useCss } from 'realtime-hooks';

export default function Example() {
  const containerColor = '#6f00ff';

  useCss({
    '#container': {
      borderRadius: '5px',
      backgroundColor: containerColor,
      transition: 'all 200ms ease',
      '&:hover': {
        color: '#000',
        borderRadius: '10px',
        backgroundColor: 'white'
      }
    },
    '@media (max-width: 300px)': {
      body: {
        color: 'yellow'
      }
    }
  });

  return (
    <main>
      <div id="container"></div>
    </main>
  );
}
```
