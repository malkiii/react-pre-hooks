import { act, renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { useLocalStorage, useSessionStorage } from '@/src';

describe('useStorage', () => {
  const storageMock = (() => {
    let store = {};
    return {
      getItem: vi.fn((key: string) => store[key]),
      setItem: vi.fn((key: string, value: string) => (store[key] = value)),
      clear: vi.fn(() => (store = {})),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      })
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: storageMock });
    Object.defineProperty(window, 'sessionStorage', { value: storageMock });
  });

  afterAll(() => {
    delete window.localStorage;
    delete window.sessionStorage;
  });

  it('should read and write from localStorage correctly', () => {
    const key = 'session';
    const initialValue = null;
    const newValue = { id: 5234, email: 'local.storage@test.com' };

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toEqual(initialValue);

    act(() => result.current[1](newValue));

    expect(window.localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(newValue));
    expect(result.current[0]).toEqual(newValue);
  });

  it('should read and write from sessionStorage correctly', () => {
    const key = 'themes';
    const initialValue = [];
    const newValue = ['light', 'dark'];

    const { result } = renderHook(() => useSessionStorage(key, initialValue));

    expect(result.current[0]).toEqual(initialValue);

    act(() => result.current[1](newValue));

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(newValue));
    expect(result.current[0]).toEqual(newValue);
  });
});
