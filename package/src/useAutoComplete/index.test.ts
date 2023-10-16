import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAutoComplete } from '.';

vi.useFakeTimers();

describe('useAutoComplete', () => {
  const values = ['Butterfly', 'bookshelf', 'Cat', 'orange', 'Bicycle', 'Camera', 'coffee'];

  it('should return initial value and suggestions', () => {
    const initial = 'o';
    const { result } = renderHook(() => useAutoComplete(values, { initial }));

    expect(result.current[0]).toBe(initial);
    expect(result.current[2]).toEqual(['orange']);
  });

  it('should update value and suggestions when input changes', () => {
    const { result } = renderHook(() => useAutoComplete(values));
    const setValue = result.current[1];

    act(() => setValue('b'));
    act(() => vi.advanceTimersByTime(0));
    expect(result.current[0]).toBe('b');
    expect(result.current[2]).toEqual(['Butterfly', 'bookshelf', 'Bicycle']);
  });

  it('should debounce input when debounce is set', async () => {
    const debounce = 1000;
    const { result } = renderHook(() => useAutoComplete(values, { debounce, sort: true }));
    const setValue = result.current[1];

    act(() => {
      vi.advanceTimersByTime(500);
      setValue('c');
    });
    expect(result.current[0]).toBe('c');
    expect(result.current[2]).toEqual([]);

    act(() => {
      vi.advanceTimersByTime(400);
      setValue('ca');
    });
    expect(result.current[0]).toBe('ca');
    expect(result.current[2]).toEqual([]);

    act(() => vi.advanceTimersByTime(debounce));
    expect(result.current[2]).toEqual(['Camera', 'Cat']);
  });

  it('should use custom filter function', () => {
    const { result } = renderHook(() =>
      useAutoComplete(values, { filter: (search, value) => value.includes(search) })
    );
    const setValue = result.current[1];

    act(() => setValue('er'));
    act(() => vi.advanceTimersByTime(0));
    expect(result.current[2]).toEqual(['Butterfly', 'Camera']);
  });
});
