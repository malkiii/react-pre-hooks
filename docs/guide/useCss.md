# useCss

You can use and insert some actual CSS in `object` format with this hook, and it works also with [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting).

## Parameters

1. a CSS object that contains the actual css.
2. and some options:

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
import { useCss } from 'react-pre-hooks';

export default function Example() {
  const containerColor = 'var(--pr)';

  useCss({
    '#container': {
      borderRadius: '5px',
      backgroundColor: containerColor,
      transition: 'all 200ms ease',
      '&:hover': {
        color: '#000',
        borderRadius: '30px',
        backgroundColor: 'white'
      }
    },
    '@media (max-width: 350px)': {
      main: {
        backgroundColor: 'yellow'
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

<iframe src="https://codesandbox.io/embed/usecss-6l2xpy?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useCss" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
