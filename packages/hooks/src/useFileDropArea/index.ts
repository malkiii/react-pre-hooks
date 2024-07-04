import { useCallback, useEffect } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

const getFileInputElement = (label: HTMLElement): HTMLInputElement | null => {
  if ('htmlFor' in label && label.htmlFor)
    return document.getElementById(label.htmlFor as string) as any;
  return label.querySelector('input[type="file"]') as any;
};

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useFileDropArea | useFileDropArea} hook.
 */
export const useFileDropArea = <T extends HTMLElement = HTMLLabelElement>(
  args: {
    ref?: React.RefObject<T> | null;
    handler?: (files: File[]) => any | Promise<any>;
    multiple?: boolean;
  } = {}
) => {
  const targetRef = useNewRef<T>(args.ref);

  const getDropperFiles = useCallback(
    async (inputFiles?: FileList | null) => {
      if (!inputFiles) return;

      const files = Array.from(inputFiles as Iterable<File>);
      const resolvedFiles = args.multiple ? files : [files[0]!];

      await args.handler?.(resolvedFiles);
    },
    [args.handler]
  );

  useEffect(() => {
    if (!targetRef.current) return;
    const fileInput = getFileInputElement(targetRef.current);
    if (!fileInput) return;

    const handleInputChange = async () => {
      await getDropperFiles(fileInput?.files);
      // add a value property to use the file input multiple times
      fileInput!.value = '';
    };

    fileInput.multiple = !!args.multiple;
    fileInput.addEventListener('change', handleInputChange);

    return () => fileInput?.removeEventListener('change', handleInputChange);
  }, [getDropperFiles]);

  const handleFileDrop = useCallback(async (event: DragEvent) => {
    event.preventDefault();
    await getDropperFiles(event.dataTransfer?.files);
  }, []);

  useEventListener({ event: 'drop', handler: handleFileDrop, ref: targetRef });
  useEventListener({ event: 'dragover', handler: e => e.preventDefault(), ref: targetRef });

  return targetRef;
};
