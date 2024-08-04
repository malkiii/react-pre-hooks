import React from 'react';
import { useFileDropArea } from '.';
import { useArray } from '../useArray';

/**
 * @description
 * Handle the user file uploading, dropping, and pasting to an area element.
 */

/**
 * @example
 */
export function FileUploader() {
  const images = useArray([]);

  const ref = useFileDropArea({
    multiple: true,
    handler: files => {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => images.push(reader.result);
        reader.readAsDataURL(file);
      });
    }
  });

  // prettier-ignore
  return (
    <div className="demo">
      <div ref={ref} className="wrapper [overflow-y:auto!important] h-[320px] border-dashed grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] max-w-2xl mx-auto gap-2">
        {images.array.length ? (
          images.array.map((image, index) => <img key={index} src={image} className="block min-w-full rounded-lg" />)
        ) : (
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
            <p className="my-0 font-bold">Drop images to this box!</p>
            <label htmlFor="image-input" className="border btn mt-2">Browse files</label>
          </div>
        )}
        <input id="image-input" type="file" accept="image/*" hidden />
      </div>
    </div>
  );
}
