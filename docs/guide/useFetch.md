# useFetch

Fetch data with a URL and search parameters using [useAsync](./useAsync) hook.

## Options

| Name        | Type                                                                      | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **url**     | String or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) | the fetch URL.                                                                                    |
| **params**  | Object                                                                    | URL search params.                                                                                |
| **...init** | Object                                                                    | [request init](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options) options. |

## Return Values

| Name          | Type     | Description                                                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| **data**      | Any      | resolved data from the function.                                                                                       |
| **isPending** | Boolean  | the loading state.                                                                                                     |
| **response**  | Object   | [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from the fetch function.                  |
| **retry**     | Fnuction | retry executing the fetch function.                                                                                    |
| **abort**     | Fnuction | cancel the fetch request using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). |
| **error**     | Unknown  | cached error if it exists.                                                                                             |

## Example Usage

```tsx
import { useFetch } from 'realtime-hooks';

type Data = {
  users: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    email: string;
  }[];
};

export default function Users() {
  const { data, isPending, retry, error } = useFetch<Data>({
    url: 'https://dummyjson.com/users',
    params: { limit: 12 }
  });

  return (
    <main>
      <button onClick={retry}>Refetch</button>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong!</p>
      ) : (
        <ul>
          {data?.users.map(user => (
            <li key={user.id}>
              <img src={user.image} alt={user.firstName} />
              <p>{user.firstName + ' ' + user.lastName}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usefetch-2vxg6p?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useFetch" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
