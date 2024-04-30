import { useCallback, useEffect, useRef, useState } from 'react';
import { useAsync } from '../useAsync';

export const useFetch = <T extends any>(
  args: RequestInit & {
    url: string | URL;
    params?: Record<string, string | number | null | undefined>;
    fetchOnMount?: boolean;
  }
) => {
  const [response, setResponse] = useState<Response>();
  const controller = useRef<AbortController>(new AbortController());

  const fetchData = useCallback(async () => {
    const { url, params, ...fetchInit } = args;

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
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      throw error;
    }
  }, [args]);

  const result = useAsync<T | undefined>(fetchData);

  useEffect(() => {
    if (args.fetchOnMount) result.callback();
  }, []);

  return { response, abort: controller.current.abort, ...result };
};
