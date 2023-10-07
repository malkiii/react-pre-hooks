import { act, fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useImageLoading } from '@/src';

describe('useImageLoading', () => {
  const imageSrc = '/image.jpeg';

  it('should load image and set isLoading to false when image is loaded', async () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useImageLoading(imageSrc, handler));

    // Check initial isLoading state
    expect(result.current.isLoading).toBe(true);

    fireEvent.load(result.current.image);

    // Check isLoading state after image load
    expect(result.current.isLoading).toBe(false);
    expect(handler).toHaveBeenCalledOnce();
  });
});
