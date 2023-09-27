# useOnlineStatus

This hook can track the user connection changes and return whether is **online** or **offline** in a state.

## Return Values

a `boolean` value determines whether the user is **online** or not.

## Example Usage

```tsx
import { useOnlineStatus } from 'realtime-hooks';

export default function Example() {
  const isOnline = useOnlineStatus();

  return (
    <main>
      <div>You are {isOnline ? 'online' : 'offline'}</div>
    </main>
  );
}
```
