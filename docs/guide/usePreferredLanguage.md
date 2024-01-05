# usePreferredLanguage

Track the current user preferred language using this hook.

## Return Values

| Name     | Type   | Description                                                                     |
| -------- | ------ | ------------------------------------------------------------------------------- |
| **name** | String | the current language name.                                                      |
| **code** | String | the current language [code](http://www.lingoes.net/en/translator/langcode.htm). |

## Example Usage

```tsx
import { usePreferredLanguage } from 'react-pre-hooks';

export default function Example() {
  const language = usePreferredLanguage();

  return (
    <main>
      <p>
        Preferred language is <span>{language?.name}</span>.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usepreferredlanguage-tccx3q?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="usePreferredLanguage" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
