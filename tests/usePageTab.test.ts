import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { usePageTab } from '@/src';

describe('usePageTab', () => {
  const title = 'Test Page';
  const favicon = {
    href: '/favicon.ico',
    type: 'image/x-icon',
    sizes: '16x16'
  };

  it('should update title and favicon when initialized', () => {
    renderHook(() => usePageTab({ title, favicon }));

    expect(document.title).toBe(title);
    const faviconLink = document.head.querySelector('link[rel="icon"]');
    expect(faviconLink).toBeTruthy();
    expect(faviconLink?.getAttribute('href')).toBe(favicon.href);
  });

  it('should update title and favicon when setTitle and setFavicon are called', () => {
    const { result } = renderHook(() => usePageTab());

    const newTitle = 'Updated Title';
    const newFavicon = {
      href: '/updated-favicon.ico',
      type: 'image/x-icon',
      sizes: '32x32'
    };

    act(() => {
      result.current.setTitle(newTitle);
      result.current.setFavicon(newFavicon);
    });

    expect(document.title).toBe(newTitle);
    const faviconLink = document.head.querySelector('link[rel="icon"]');
    expect(faviconLink).toBeTruthy();
    expect(faviconLink?.getAttribute('href')).toBe(newFavicon.href);
  });

  it('should call the beforeClose handler when window is about to close', () => {
    const beforeCloseHandler = vi.fn();
    renderHook(() => usePageTab({ beforeClose: beforeCloseHandler }));

    act(() => {
      window.dispatchEvent(new Event('beforeunload'));
    });

    expect(beforeCloseHandler).toHaveBeenCalledOnce();
  });
});
