import React from 'react';
import { useGeolocation } from '.';

/**
 * @description
 * Track the current geolocation of the client
 * using the [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) API.
 */

/**
 * @example
 */
export function Example() {
  const { isLoading, error, ...coords } = useGeolocation();

  // prettier-ignore
  if (isLoading) return <div className="demo flex items-center justify-center font-bold">Loading...</div>;

  if (error) return <div className="demo">{error.message}</div>;

  return (
    <div className="demo">
      <div className="data-wrapper">
        {Object.entries(coords).map(([name, value]) => (
          <React.Fragment key={name}>
            <span>{name}</span>
            <p>{value ?? 'Unknown'}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
