import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useObject } from '@/src';

describe('useObject', () => {
  it('should return the initial object', () => {
    const obj = { key: 'value' };
    const { result } = renderHook(() => useObject(obj));

    expect(result.current.value).toEqual(obj);
  });

  it('should get and set a value by key', () => {
    const { result } = renderHook(() => useObject());

    expect(result.current.value).toEqual({});

    act(() => result.current.set('key', 'value'));
    expect(result.current.get('key')).toBe('value');

    act(() => result.current.set('key', 'new value'));
    expect(result.current.get('key')).toBe('new value');
    expect(result.current.get('nonexistentKey')).toBeUndefined();
  });

  it('should return keys and values', () => {
    const { result } = renderHook(() => useObject({ key1: 'value1', key2: 'value2' }));

    expect(result.current.keys()).toEqual(['key1', 'key2']);
    expect(result.current.values()).toEqual(['value1', 'value2']);
  });

  it('should return entries', () => {
    const { result } = renderHook(() => useObject({ key1: 'value1', key2: 'value2' }));
    expect(result.current.entries()).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);
  });

  it('should check equality with another object', () => {
    const obj = { key1: 'value', key2: { key12: 10, key22: 20 } };
    const { result } = renderHook(() => useObject(obj));

    expect(result.current.isEqual({ key1: 'value', key2: { key12: 10, key22: 20 } })).toBe(true);
  });

  it('should copy the object', () => {
    const obj = { key1: 'value', key2: { key12: 10, key22: 20 } };
    const { result } = renderHook(() => useObject(obj));

    const copiedObj = result.current.copy();
    expect(copiedObj).toEqual(obj);
    expect(copiedObj).not.toBe(result.current.value);
  });

  it('should reset to initial object', () => {
    const { result } = renderHook(() => useObject({ key: null }));

    act(() => result.current.set('key', 'new value'));
    act(() => result.current.reset());
    expect(result.current.value).toEqual({ key: null });
  });

  it('should convert object to string', () => {
    const { result } = renderHook(() => useObject({ key: 'value' }));
    const jsonString = result.current.toString();

    expect(jsonString).toBe('{"key":"value"}');
  });
});