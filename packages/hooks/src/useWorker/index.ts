import { useMemo, useRef, useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useWorker | useWorker} hook.
 */
export const useWorker = <T extends any>(
  args: WorkerOptions & {
    script: string | (() => any | Promise<any>);
    handler: (message: { data?: T; error?: unknown }) => any;
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
          console.error(error);
        }
      },
      terminate() {
        workerRef.current?.terminate();
      }
    }),
    []
  );

  useIsomorphicEffect(() => {
    const script = args.script instanceof Function ? `(${args.script.toString()})()` : args.script;
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
