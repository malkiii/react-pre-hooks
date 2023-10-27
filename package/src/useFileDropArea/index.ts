import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '..';

type FileData<T extends FileDataType | undefined> = T extends undefined
  ? File
  : T extends 'array-buffer'
  ? ArrayBuffer
  : string;

export type FileDataType = 'array-buffer' | 'binary-string' | 'url' | 'text';

export type DropAreaError<F extends FileDataType | undefined = undefined> = {
  type?: 'extention' | 'size' | (string & {});
  file: DroppedFile<F>;
};

export type DroppedFile<T extends FileDataType | undefined> = {
  name: string;
  size: number;
  extension?: string;
  data: FileData<T> | null;
};

export type DropAreaOptions<
  T extends HTMLElement = HTMLDivElement,
  F extends FileDataType | undefined = undefined
> = {
  ref?: RefObject<T> | null;
  multiple?: boolean;
  extensions?: string[];
  minSize?: number;
  maxSize?: number;
  readAs?: F;
  onUpload?: (files: File[]) => any;
  validate?: (files: DroppedFile<F>[]) => unknown;
};

const readerMethods = {
  'array-buffer': 'readAsArrayBuffer',
  'binary-string': 'readAsBinaryString',
  'url': 'readAsDataURL',
  'text': 'readAsText'
} as const;

const getFileInputElement = (label: HTMLElement): HTMLInputElement | null => {
  if ('htmlFor' in label && label.htmlFor)
    return document.getElementById(label.htmlFor as string) as any;
  return label.querySelector('input[type="file"]') as any;
};

export const useFileDropArea = <
  T extends HTMLElement = HTMLDivElement,
  F extends FileDataType | undefined = undefined
>(
  options: DropAreaOptions<T, F> = {}
) => {
  const { ref, multiple = false, readAs, onUpload } = options;

  const targetRef = ref ?? useRef<T>(null);
  const [files, setFiles] = useState<DroppedFile<F>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<DropAreaError<F>>();

  const isValidFiles = useCallback(
    (files: DroppedFile<F>[]) => {
      const { extensions, minSize = 0, maxSize = Infinity, validate } = options;
      return (
        (!validate || validate(files)) &&
        files.every(file => {
          // validate the type
          if (extensions && !extensions.includes(file.extension ?? '')) {
            setError({ type: 'extention', file });
            return false;
          }
          // validate the file size
          if (file.size > maxSize || file.size < minSize) {
            setError({ type: 'size', file });
            return false;
          }
          return true;
        })
      );
    },
    [options]
  );

  const readFilesAs = useCallback(
    (files: DroppedFile<F>[]) => {
      if (!readAs) return;
      setIsLoading(true);

      return new Promise<void>(resolve => {
        const setFileData = (index: number, data: any) => {
          files[index].data = data;
          if (index == files.length - 1) resolve();
        };

        files.forEach((file, index) => {
          try {
            const reader = new FileReader();
            reader.onloadend = () => setFileData(index, reader.result);
            reader[readerMethods[readAs]](file.data as File);
          } catch (error) {
            setFileData(index, null);
          }
        });
      });
    },
    [options]
  );

  const getDropperFiles = useCallback(
    async (inputFiles?: FileList | null) => {
      if (!inputFiles) return;

      const files = Array.from(inputFiles as Iterable<File>);
      const resolvedFiles = multiple ? files : [files[0]];
      if (onUpload) onUpload(resolvedFiles);

      const dropperFiles = resolvedFiles.map<DroppedFile<F>>(file => ({
        name: file.name,
        size: Number((file.size / 1024 ** 2).toFixed(2)),
        extension: file.name.split(/(?=\.\w+$)\./).at(1),
        data: file as any
      }));

      if (!isValidFiles(dropperFiles)) return;

      await readFilesAs(dropperFiles);
      setIsLoading(false);

      setFiles(f => [...f, ...dropperFiles]);
    },
    [options]
  );

  useEffect(() => {
    if (!targetRef.current) return;

    const fileInput = getFileInputElement(targetRef.current);
    if (!fileInput) return;

    const handleInputChange = async () => {
      setError(undefined);
      await getDropperFiles(fileInput?.files);
      // add a value property to use the file input multiple times
      fileInput!.value = '';
    };

    fileInput.multiple = !!options.multiple;
    fileInput.addEventListener('change', handleInputChange);

    return () => fileInput?.removeEventListener('change', handleInputChange);
  }, [ref, options]);

  const handleFileDrop = async (event: DragEvent) => {
    event.preventDefault();
    await getDropperFiles(event.dataTransfer?.files);
  };

  const eventOptions = { ref: targetRef };

  useEventListener('drop', handleFileDrop, eventOptions);
  useEventListener('dragover', e => e.preventDefault(), eventOptions);

  return { ref: targetRef, files, isLoading, error, setError };
};
