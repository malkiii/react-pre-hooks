import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

type FileData<T extends FileDataType | undefined> = T extends undefined
  ? File
  : T extends 'array-buffer'
  ? ArrayBuffer
  : string;

export type FileDataType = 'array-buffer' | 'binary-string' | 'url' | 'text';
export type DropzoneError = { type?: 'extention' | 'size' | (string & {}); message: string };

export type DroppedFile<T extends FileDataType | undefined> = {
  name: string;
  size: number;
  extension?: string;
  data: FileData<T> | null;
};

export type DropzoneOptions<
  T extends HTMLElement = HTMLDivElement,
  F extends FileDataType | undefined = undefined
> = {
  target?: T;
  multiple?: boolean;
  extensions?: string[];
  minSize?: number;
  maxSize?: number;
  readAs?: F;
  onUpload?: (files: File[]) => any;
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

export const useFileDropzone = <
  T extends HTMLElement = HTMLDivElement,
  F extends FileDataType | undefined = undefined
>(
  options: DropzoneOptions<T, F> = {}
) => {
  const { target = null, multiple = false, readAs, onUpload } = options;

  const ref = useRef<HTMLElement>(target);
  const [files, setFiles] = useState<DroppedFile<F>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<DropzoneError>();

  const isValidFiles = useCallback(
    (files: DroppedFile<F>[]) => {
      const { extensions, minSize = 0, maxSize = Infinity } = options;
      return files.every(file => {
        // validate the type
        if (extensions && !extensions.includes(file.extension ?? '')) {
          setError({ type: 'extention', message: `Invalid file extension of "${file.name}"` });
          return false;
        }
        // validate the file size
        if (file.size < minSize) {
          setError({
            type: 'size',
            message: `"${file.name}" is too small. Minimum size is ${minSize}MB`
          });
          return false;
        }
        if (file.size > maxSize) {
          setError({
            type: 'size',
            message: `"${file.name}" is too large. Maximum size is ${maxSize}MB`
          });
          return false;
        }
        return true;
      });
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
    if (!ref.current) return;

    const fileInput = getFileInputElement(ref.current);
    if (!fileInput) return;

    const handleInputChange = async () => {
      setError(undefined);
      await getDropperFiles(fileInput?.files);
      // add a value property to use the file input multiple times
      fileInput!.value = '';
    };

    fileInput.multiple = !!options.multiple;
    fileInput.addEventListener('change', handleInputChange);

    return () => {
      fileInput?.removeEventListener('change', handleInputChange);
    };
  }, [ref, options]);

  const handleFileDrop = async (event: DragEvent) => {
    event.preventDefault();
    await getDropperFiles(event.dataTransfer?.files);
    setIsDragging(false);
  };
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEventListener('drop', handleFileDrop, { target: ref.current });
  useEventListener('dragover', handleDragOver, { target: window, passive: true });
  useEventListener('dragleave', handleDragLeave, { target: window, passive: true });

  return { ref, files, isDragging, isLoading, error, setError };
};
