import { useMemo, useRef, useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export type WorkerHandler = (message: { data?: any; error?: unknown }) => any;

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useWorker | useWorker} hook.
 */
export const useWorker = (
  args: WorkerOptions & {
    script: string | (() => any | Promise<any>);
    handler: WorkerHandler;
  }
) => {
  const [isLoading, setIsLoading] = useState(false);

  const workerRef = useRef<Worker>();

  const controls = useMemo(
    () => ({
      postMessage<M extends any>(message: M, options?: StructuredSerializeOptions) {
        try {
          setIsLoading(true);
          workerRef.current?.postMessage(message, options);
        } catch (error) {
          setIsLoading(false);
          throw error;
        }
      },
      terminate() {
        workerRef.current?.terminate();
      }
    }),
    []
  );

  useIsomorphicEffect(() => {
    const script = typeof args.script === 'string' ? args.script : `(${args.script.toString()})()`;
    const workerScript = URL.createObjectURL(new Blob([script]));

    workerRef.current = new Worker(workerScript);

    workerRef.current.onmessage = event => {
      args.handler({ data: event.data });
      setIsLoading(false);
    };

    workerRef.current.onerror = event => {
      args.handler({ error: event.error });
      setIsLoading(false);
    };

    workerRef.current.onmessageerror = event => {
      args.handler({ error: event.data });
      setIsLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
      URL.revokeObjectURL(workerScript);
    };
  }, []);

  return { ...controls, isLoading };
};
