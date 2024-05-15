import React from 'react';
import { useFormData } from '.';

/**
 * @description
 * Handle your form data using some methods with
 * the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) API.
 */

/**
 * @example
 */
export function Example() {
  const formData = useFormData();

  return (
    <div className="demo">
      <form
        ref={formData.ref}
        className="border p-4 rounded-md *:block flex flex-col gap-4 max-w-sm mx-auto"
        onSubmit={e => {
          e.preventDefault();
          alert(JSON.stringify(formData.getData(), null, 2));
        }}
      >
        <span className="block font-bold text-center text-2xl">Login</span>
        <input
          type="text"
          name="username"
          className="mt-1"
          placeholder="@Username"
          onChange={formData.handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="mt-1"
          placeholder="Your Password..."
          onChange={formData.handleChange}
          required
        />
        <button type="submit" className="primary mt-4 justify-center">
          Submit
        </button>
      </form>
    </div>
  );
}
