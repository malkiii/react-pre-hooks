import { useMemo, useRef, useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useWorker | useWorker} hook.
 */
export const useWorker = <T extends any>(
  args: WorkerOptions & {
    code: string | (() => any | Promise<any>);
  }
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  const workerRef = useRef<Worker>();

  const controls = useMemo(
    () => ({
      postMessage<M extends any>(message: M, options?: StructuredSerializeOptions) {
        try {
          setLoading(true);
          workerRef.current?.postMessage(message, options);
        } catch (error) {
          setError(error);
        }
      },
      terminate() {
        workerRef.current?.terminate();
      }
    }),
    []
  );

  useIsomorphicEffect(() => {
    const code = args.code instanceof Function ? `(${args.code.toString()})()` : args.code;
    const workerScript = URL.createObjectURL(new Blob([code]));

    workerRef.current = new Worker(workerScript);

    workerRef.current.onmessage = event => {
      setData(event.data);
      setLoading(false);
    };

    workerRef.current.onerror = event => {
      setError(event.error);
      setLoading(false);
    };

    workerRef.current.onmessageerror = event => {
      setError(event.data);
      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
      URL.revokeObjectURL(workerScript);
    };
  }, []);

  return { ...controls, data, error, loading };
};
