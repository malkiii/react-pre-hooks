# useFetch

Fetch data with a URL and search parameters using [useAsync](./useAsync) hook, and you can also specify a **timeout** for the fetch requeste.

## Options

| Name        | Type                                                                      | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **url**     | String or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) | the fetch URL.                                                                                    |
| **params**  | Object                                                                    | URL search params.                                                                                |
| **timeout** | Number                                                                    | the request time limit in `ms`.                                                                   |
| **...init** | Object                                                                    | [request init](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options) options. |

## Return Values

| Name          | Type     | Description                                                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| **data**      | Any      | resolved data from the function.                                                                                       |
| **isLoading** | Boolean  | the loading state.                                                                                                     |
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
  const { data, isLoading, refetch, error } = useFetch<Data>({
    url: 'https://dummyjson.com/users',
    params: { limit: 12 }
  });

  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong!</p>
      ) : (
        <ul>
          {data.users.map(user => (
            <li key={user.id}>
              <img src={user.image} alt={user.firstName} />
              <p>{user.firstName + ' ' + user.lastName}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={refetch}>Refetch</button>
    </main>
  );
}
```
