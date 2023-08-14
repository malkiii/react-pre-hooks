import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStateHistory } from '@/src';

describe('useStateHistory', () => {
  it('should initialize correctly', () => {
    const initialValue = 0;
    const { result } = renderHook(() => useStateHistory(initialValue));

    const [value, setState, pointer] = result.current;

    expect(value).toBe(initialValue);
    expect(pointer.history).toEqual([value]);
    expect(pointer.position).toBe(0);
  });

  it('should update state and history', () => {
    const initialValue = 0;
    const { result } = renderHook(() => useStateHistory(initialValue));

    const setState = result.current[1];
    act(() => setState(5));
    act(() => setState(5));

    const [value, _, pointer] = result.current;

    expect(value).toBe(5);
    expect(pointer.history).toEqual([0, 5]);
    expect(pointer.position).toBe(1);
  });

  it('should limit history size', () => {
    const initialValue = 0;
    const limit = 3;
    const { result } = renderHook(() => useStateHistory(initialValue, limit));

    const setState = result.current[1];
    act(() => {
      setState(1);
      setState(2);
      setState(3);
      setState(4);
      setState(5);
    });

    const pointer = result.current[2];
    expect(pointer.history).toEqual([3, 4, 5]);
    expect(pointer.position).toBe(2);
  });

  it('should navigate history', () => {
    const initialValue = 0;
    const { result } = renderHook(() => useStateHistory(initialValue));

    const setState = result.current[1];
    act(() => {
      setState(1);
      setState(2);
      setState(3);
    });

    const currentPosition = 3;
    act(() => result.current[2].prev());
    expect(result.current[2].position).toBe(currentPosition - 1);

    act(() => result.current[2].next());
    expect(result.current[2].position).toBe(currentPosition);

    act(() => result.current[2].go(-1));
    expect(result.current[2].position).toBe(currentPosition - 1);

    act(() => result.current[2].go(-3));
    expect(result.current[2].position).toBe(currentPosition - 3);

    act(() => result.current[2].reset());
    expect(result.current[2].position).toBe(currentPosition);
  });

  it('should reset history', () => {
    const initialValue = 0;
    const { result } = renderHook(() => useStateHistory(initialValue));

    const setState = result.current[1];
    act(() => {
      setState(1);
      setState(2);
      setState(3);
    });

    act(() => result.current[2].go(-2));
    act(() => setState(4));

    expect(result.current[2].position).toBe(2);
    expect(result.current[2].history).toEqual([0, 1, 4]);
  });

  it('should clear history', () => {
    const initialValue = 1;
    const { result } = renderHook(() => useStateHistory(initialValue));

    const setState = result.current[1];
    act(() => {
      setState(2);
      setState(3);
      result.current[2].clear();
    });

    expect(result.current[0]).toBe(3);
    expect(result.current[2].position).toBe(0);
    expect(result.current[2].history).toEqual([3]);
  });
});
