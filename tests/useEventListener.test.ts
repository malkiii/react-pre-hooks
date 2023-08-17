import { act, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';
import { useEventListener } from '@/src';

describe('useEventListener', () => {
  let addEventListenerSpy: SpyInstance;
  let removeEventListenerSpy: SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(Element.prototype, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(Element.prototype, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should attach and detach event listener', () => {
    const handler = vi.fn();
    const options = { target: document.createElement('div') };
    const { unmount } = renderHook(() => useEventListener('click', handler, options));

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, options);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler, options);
  });

  it('should attach multiple event listeners', () => {
    const handler = vi.fn();
    const options = { target: document.createElement('input') };
    const { unmount } = renderHook(() => useEventListener(['click', 'keydown'], handler, options));

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, options);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', handler, options);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler, options);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', handler, options);
  });

  it('should add .scrolling class to the body on scroll', async () => {
    const handleScrolling = () => document.body.classList.add('scrolling');
    renderHook(() => useEventListener('scroll', handleScrolling));

    fireEvent.scroll(window);
    await waitFor(() => expect(document.body.classList.contains('scrolling')).toBe(true));
  });

  it('should add .cursor class on mouse enter and leave', async () => {
    const input = document.createElement('input');
    const handleClick = () => input.classList.add('cursor');
    renderHook(() =>
      useEventListener(['mouseenter', 'mouseleave'], handleClick, { target: input })
    );

    fireEvent.mouseEnter(input);
    await waitFor(() => expect(input.classList.contains('cursor')).toBe(true));

    act(() => input.classList.remove('cursor'));
    fireEvent.mouseLeave(input);
    await waitFor(() => expect(input.classList.contains('cursor')).toBe(true));
  });
});
