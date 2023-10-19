# useStateStatus

This hook returns the state and its current **status** using a state handler.

## Parameters

| Name        | Type     | Description                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------- |
| **initial** | Any      | the initial value.                                                                                |
| **handler** | Function | the handler of the current state that takes the value as the parameter and return a status value. |

## Return Values

It returns a tuple of 4 values:

| Index | Name          | Type     | Description                                                 |
| :---: | ------------- | -------- | ----------------------------------------------------------- |
|   0   | **value**     | Any      | the current value.                                          |
|   1   | **setValue**  | Function | updates the value.                                          |
|   2   | **status**    | Any      | the status of the current value (what the handler returns). |
|   4   | **setStatus** | Function | updates the status value manually.                          |

## Example Usage

```tsx
import { useStateStatus } from 'realtime-hooks';

export default function Email() {
  const [email, setEmail, status] = useStateStatus('', value => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'valid';
    else return 'invalid';
  });

  return (
    <main>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      <p>this email is {status}.</p>
    </main>
  );
}
```

You can use **objects** instead:

```tsx
import { useStateStatus } from 'realtime-hooks';

export default function Username() {
  const [name, setName, status] = useStateStatus('', value => {
    if (value.length < 3) {
      return { type: 'length', message: 'too short!' };
    }
    if (value.length > 15) {
      return { type: 'length', message: 'too long!' };
    }
    if (/[^\w_]/.test(value)) {
      return { type: 'pattern', message: 'no special characters!' };
    }
  });

  return (
    <main>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      {status && <p>{status.message}</p>}
    </main>
  );
}
```
