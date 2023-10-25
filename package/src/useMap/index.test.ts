import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMap } from '.';

describe('useMap', () => {
  it('should return the initial object', () => {
    const obj = { key: 'value' };
    const { result } = renderHook(() => useMap(obj));

    expect(result.current.toObject()).toEqual(obj);
  });

  it('should get and set a value by key', () => {
    const { result } = renderHook(() => useMap());

    expect(result.current.value).toEqual(new Map());

    act(() => result.current.set('key', 'value'));
    expect(result.current.get('key')).toBe('value');

    act(() => result.current.set('key', 'new value'));
    expect(result.current.get('key')).toBe('new value');
    expect(result.current.get('nonexistentKey')).toBeUndefined();
  });

  it('should return keys and values', () => {
    const { result } = renderHook(() => useMap({ key1: 'value1', key2: 'value2' }));

    expect(result.current.keys()).toEqual(['key1', 'key2']);
    expect(result.current.values()).toEqual(['value1', 'value2']);
  });

  it('should return entries', () => {
    const { result } = renderHook(() => useMap({ key1: 'value1', key2: 'value2' }));
    expect(result.current.entries()).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);
  });

  it('should check equality with another object', () => {
    const obj = { key1: 'value', key2: { key12: 10, key22: 20 } };
    const { result } = renderHook(() => useMap(obj));

    expect(result.current.has('key1', 'key2')).toBe(true);
    expect(result.current.isEqual({ key1: 'value', key2: { key12: 10, key22: 20 } })).toBe(true);
  });

  it('should copy the map', () => {
    const obj = { key1: 'value', key2: { key12: 10, key22: 20 } };
    const { result } = renderHook(() => useMap(obj));

    const copiedMap = result.current.copy();
    expect(copiedMap).toEqual(new Map(Object.entries(obj)));
    expect(copiedMap).not.toBe(result.current.value);
  });

  it('should reset to initial map', () => {
    const { result } = renderHook(() => useMap({ key: null as string | null }));

    act(() => result.current.set('key', 'new value'));
    act(() => result.current.reset());
    expect(result.current.value).toEqual(new Map([['key', null]]));
  });

  it('should convert object to string', () => {
    const { result } = renderHook(() => useMap({ key: 'value' }));
    const jsonString = result.current.toJSON();

    expect(jsonString).toBe('{"key":"value"}');
  });
});
