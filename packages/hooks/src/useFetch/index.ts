import { useCallback, useEffect, useRef, useState } from 'react';
import { useAsync } from '../useAsync';

export type RequestOptions = RequestInit & {
  url: string | URL;
  params?: Record<string, string | number | null | undefined>;
  fetchOnMount?: boolean;
};

type AbortCallback = (reason?: any) => void;

export const useFetch = <T extends any>(options: RequestOptions) => {
  const [response, setResponse] = useState<Response>();
  const controller = useRef<AbortController>(new AbortController());

  const fetchData = useCallback(async () => {
    const { url, params, ...fetchInit } = options;
    const fetchURL = url instanceof URL ? url : new URL(url);

    if (params) {
      for (const p in params) {
        const value = params[p];
        if (value) fetchURL.searchParams.set(p, value.toString());
      }
    }

    try {
      const response = await fetch(fetchURL, { ...fetchInit, signal: controller.current.signal });
      setResponse(response);
      return (await response.json()) as T;
    } catch (error) {
      controller.current.abort();
      console.error(error);
    }
  }, [options]);

  const result = useAsync<T | undefined>(fetchData);

  useEffect(() => {
    if (options.fetchOnMount) result.callback();
  }, []);

  return { response, abort: controller.current.abort as AbortCallback, ...result };
};
