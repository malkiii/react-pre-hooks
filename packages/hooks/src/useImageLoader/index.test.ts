import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useImageLoader } from '.';

describe('useImageLoader', () => {
  const imageSrc = '/image.jpeg';

  it('should load image and set isLoading to false when image is loaded', async () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useImageLoader({ src: imageSrc, handler }));

    // Check initial isLoading state
    expect(result.current.isLoading).toBe(true);

    fireEvent.load(result.current.ref.current);

    // Check isLoading state after image load
    expect(result.current.isLoading).toBe(false);
    expect(handler).toHaveBeenCalledOnce();
  });
});
