# usePreferredLanguage

Track the current user preferred language using this hook.

## Return Values

| Name     | Type   | Description                                                                     |
| -------- | ------ | ------------------------------------------------------------------------------- |
| **name** | String | the current language name.                                                      |
| **code** | String | the current language [code](http://www.lingoes.net/en/translator/langcode.htm). |

## Example Usage

```tsx
import { usePreferredLanguage } from 'realtime-hooks';

export default function Example() {
  const language = usePreferredLanguage();

  return (
    <main>
      <p>preferred language: {language.name}</p>
    </main>
  );
}
```
