# useIntersectionObserver

Handle the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) using this hook.

## Parameters

1. the [IntersectionObserver callback](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#callback) function.
2. the [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#options), as well as the `ref` object of the target element.

::: info
the `root` option of the observer is replaced by `container` which is a **function** that returns the root element in this hook.
:::

## Return Values

| Name         | Type      | Description                                                                                                                              |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**      | RefObject | the target element reference.                                                                                                            |
| **observer** | RefObject | the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) object reference. |

## Example Usage

::: tip
Just use [useInView](./useInView) if you want to check if an element is **intersecting** or not.
:::

```tsx
import { useIntersectionObserver } from 'react-pre-hooks';

export default function Example() {
  const { ref } = useIntersectionObserver(
    entries => {
      const p = document.querySelector('p')!;

      if (entries[0].isIntersecting) p.textContent = "it's in the view!";
      else p.textContent = "it's not in the view!";
    },
    { threshold: 0.8 }
  );

  return (
    <main>
      <p>Scroll down..</p>
      <div ref={ref}></div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useintersectionobserver-7rdztr?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useIntersectionObserver" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
