# useFetch

Fetch data with a URL and search queries using [useAsync](./useAsync) hook.

## Options

| Name        | Type                                                                      | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **url**     | String or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) | the fetch URL.                                                                                    |
| **query**   | Object                                                                    | URL search params.                                                                                |
| **...init** | Object                                                                    | [request init](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options) options. |

## Return Values

| Name          | Type                   | Description                                                                                           |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **data**      | `callback` return type | resolved data from the function.                                                                      |
| **isLoading** | Boolean                | the loading state.                                                                                    |
| **response**  | Object                 | [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) from the fetch function. |
| **refetch**   | Fnuction               | retry executing the async function.                                                                   |
| **error**     | Unknown                | cached error if it exists.                                                                            |

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
    query: { limit: 12 }
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
