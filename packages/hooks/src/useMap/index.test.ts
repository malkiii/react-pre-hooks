import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMap } from '.';

describe('useMap', () => {
  it('should return the initial map', () => {
    const map = new Map([['key', 'value']]);
    const { result } = renderHook(() => useMap(map));

    expect(result.current.value).toEqual(map);
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
    const obj = { key1: 'value1', key2: 'value2' };
    const { result } = renderHook(() => useMap(new Map(Object.entries(obj))));

    expect(result.current.keys()).toEqual(Object.keys(obj));
    expect(result.current.values()).toEqual(Object.values(obj));
  });

  it('should return entries', () => {
    const obj = { key1: 'value1', key2: { key3: 'value2' } };
    const { result } = renderHook(() => useMap(new Map(Object.entries(obj))));

    expect(result.current.entries()).toEqual(Object.entries(obj));
  });

  it('should have the keys', () => {
    const obj = { key1: 'value', key2: { key12: 10, key22: 20 } };
    const { result } = renderHook(() => useMap(new Map(Object.entries(obj))));

    expect(result.current.has('key1', 'key2')).toBe(true);
    expect(result.current.has('key1', 'key3')).toBe(false);
  });

  it('should copy the map', () => {
    const obj = Object.entries({ key1: 'value', key2: { key12: 10, key22: 20 } });
    const { result } = renderHook(() => useMap(new Map(obj)));

    const copiedMap = result.current.copy();
    expect(copiedMap).toEqual(new Map(obj));
    expect(copiedMap).not.toBe(result.current.value);
  });

  it('should reset to initial map', () => {
    const map = new Map<string, string | null>([['key', null]]);
    const { result } = renderHook(() => useMap(map));

    act(() => result.current.set('key', 'new value'));
    act(() => result.current.reset());
    expect(result.current.value).toEqual(new Map([['key', null]]));
  });
});
