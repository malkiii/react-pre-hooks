# useCookie

Get and Set a specific http [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) value using this hook.

## Parameters

It takes two parameters:

- the cookie name.
- the optional cookie attributes:

| Name         | Type           | Description                                                                                                         |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **initial**  | String         | the initial cookie value (default is `null`).                                                                       |
| **expires**  | Date or String | indicates the maximum lifetime of the cookie as an HTTP-date timestamp.                                             |
| **maxAge**   | Number         | indicates the number of **seconds** until the cookie expires.                                                       |
| **path**     | String         | indicates the path that must exist in the requested URL for the browser to send the Cookie header.                  |
| **domain**   | String         | this attribute defines the host to which the cookie will be sent.                                                   |
| **sameSite** | String         | prevents the browser from sending cookies along with cross-site requests, and it can be `Strict`, `Lax`, or `None`. |
| **secure**   | Boolean        | indicates that the cookie is sent to a server only when a request is made with the `https` scheme.                  |
| **httpOnly** | Boolean        | this attribute only protects the **confidentiality** of a cookie.                                                   |

## Return Values

It returns a tuple of 2 values:

| Index | Name         | Type     | Description               |
| :---: | ------------ | -------- | ------------------------- |
|   0   | **value**    | Any      | the current cookie value. |
|   1   | **setValue** | Function | update the value.         |

::: info
When you update a value of a cookie using this hook, a [CookieEvent](#cookieevent-object) will be fired on `window`.
:::

### CookieEvent Object

It's a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) with `detail` object that has:

| Name         | Type   | Description              |
| ------------ | ------ | ------------------------ |
| **name**     | String | the updated cookie name. |
| **oldValue** | String | the old cookie value.    |
| **newValue** | String | the new cookie value.    |

## Example Usage

```tsx
import { useCookie } from 'realtime-hooks';

export default function Example() {
  const [email, setEmail] = useCookie('email');

  return (
    <main>
      <input
        name="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value, { maxAge: 30 })}
      />
      {email && <p>This email will be deleted after 30 seconds.</p>}
    </main>
  );
}
```
