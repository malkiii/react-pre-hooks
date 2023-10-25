import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAsync } from '.';

describe('useAsync', () => {
  it('should fetch data successfully', async () => {
    const asyncFunction = async () => 'Success';
    const { result } = renderHook(() => useAsync(asyncFunction));

    expect(result.current.isPending).toBeTruthy();

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    expect(result.current.data).toBe('Success');
    expect(result.current.error).toBe(undefined);
  });

  it('should handle error', async () => {
    const asyncFunction = async () => {
      throw new Error('Test Error');
    };

    const { result } = renderHook(() => useAsync(asyncFunction));

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('should retry fetching data', async () => {
    let attempt = 0;
    const asyncFunction = async () => {
      if (++attempt === 1) throw new Error('Failed');
      return 'Success';
    };

    const { result } = renderHook(() => useAsync(asyncFunction));

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBeInstanceOf(Error);

    await act(() => result.current.retry());

    expect(result.current.data).toBe('Success');
    expect(result.current.error).toBe(undefined);
  });
});
