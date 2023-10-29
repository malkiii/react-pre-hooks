# useStateStatus

This hook returns the state and its current **status** using a state handler.

## Parameters

1. the initial state value.
2. the handler of the current state that takes the value as the parameter and return a status value.

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
      <input
        type="text"
        value={name}
        placeholder="Username"
        onChange={e => setName(e.target.value)}
      />
      {status && <p>{status.message}</p>}
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usestatestatus-75gynp?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useStateStatus" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
