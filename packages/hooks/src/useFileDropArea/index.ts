import { RefObject, useCallback, useEffect } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

export type DropAreaOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  multiple?: boolean;
  onUpload?: (files: File[]) => any | Promise<any>;
};

const getFileInputElement = (label: HTMLElement): HTMLInputElement | null => {
  if ('htmlFor' in label && label.htmlFor)
    return document.getElementById(label.htmlFor as string) as any;
  return label.querySelector('input[type="file"]') as any;
};

export const useFileDropArea = <T extends HTMLElement = HTMLLabelElement>(
  options: DropAreaOptions<T> = {}
) => {
  const { ref, multiple = false, onUpload } = options;

  const targetRef = useNewRef<T>(ref);

  const getDropperFiles = useCallback(
    async (inputFiles?: FileList | null) => {
      if (!inputFiles) return;

      const files = Array.from(inputFiles as Iterable<File>);
      const resolvedFiles = multiple ? files : [files[0]];

      if (onUpload) await onUpload(resolvedFiles);
    },
    [onUpload]
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

    fileInput.multiple = multiple;
    fileInput.addEventListener('change', handleInputChange);

    return () => fileInput?.removeEventListener('change', handleInputChange);
  }, [getDropperFiles]);

  const handleFileDrop = useCallback(async (event: DragEvent) => {
    event.preventDefault();
    await getDropperFiles(event.dataTransfer?.files);
  }, []);

  const eventOptions = { ref: targetRef };

  useEventListener('drop', handleFileDrop, eventOptions);
  useEventListener('dragover', e => e.preventDefault(), eventOptions);

  return targetRef;
};
