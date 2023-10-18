import { DependencyList, useCallback, useRef, useState } from 'react';
import { useAsync } from '..';

export type RequestOptions = RequestInit & {
  url: string | URL;
  params?: Record<string, string | number | null | undefined>;
  timeout?: number;
};

export const useFetch = <T extends any>(options: RequestOptions, deps?: DependencyList) => {
  const [response, setResponse] = useState<Response>();
  const controller = useRef<AbortController>(new AbortController());

  const fetchData = useCallback(async () => {
    const { url, params, timeout, ...fetchInit } = options;
    const fetchURL = url instanceof URL ? url : new URL(url);

    if (params) {
      for (const p in params) {
        const value = params[p];
        if (value) fetchURL.searchParams.set(p, value.toString());
      }
    }

    const promises = [fetch(fetchURL, { ...fetchInit, signal: controller.current.signal })];
    if (timeout) promises.push(new Promise((_, rej) => setTimeout(rej, timeout)));

    try {
      const response = await Promise.race(promises);
      setResponse(response);
      return (await response.json()) as T;
    } catch (error) {
      controller.current.abort();
      console.error(error);
    }
  }, deps ?? []);

  const result = useAsync<T | undefined>(fetchData, [fetchData]);

  return { response, abort: controller.current.abort as Function, ...result };
};
