import { DependencyList, useState } from 'react';
import { useAsync } from '@/src';

export type RequestOptions = RequestInit & {
  url: string;
  query?: Record<string, string | number | null | undefined>;
};

export const useFetch = <T extends any>(options: RequestOptions, deps?: DependencyList) => {
  const { url, ...fetchInit } = options;
  const [response, setResponse] = useState<Response>();
  const fetchURL = new URL(url);

  if (options.query) {
    const query = Object.fromEntries(
      Object.entries(options.query)
        // remove "null" and "undefined" values
        .filter(([_, value]) => value !== null && value !== undefined)
        // convert numbers to strings
        .map(([key, value]) => [key, typeof value === 'number' ? value.toString() : value])
    ) as Record<string, string>;

    fetchURL.search = new URLSearchParams(query).toString();
  }

  const { retry: refetch, ...result } = useAsync<T>(async () => {
    const response = await fetch(fetchURL, fetchInit);
    setResponse(response);
    return (await response.json()) as T;
  }, deps);

  return { ...result, response, refetch };
};
