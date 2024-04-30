import { act, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';
import { useEventListener } from '.';

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
    const args = { event: 'click', handler, target: () => document.createElement('div') };
    const { unmount } = renderHook(() => useEventListener(args as any));

    expect(addEventListenerSpy).toHaveBeenCalledWith(args.event, args.handler, args);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(args.event, args.handler, args);
  });

  it('should attach multiple event listeners', () => {
    const handler = vi.fn();
    const args = {
      event: ['click', 'keydown'],
      handler,
      target: () => document.createElement('input')
    };
    const { unmount } = renderHook(() => useEventListener(args as any));

    expect(addEventListenerSpy).toHaveBeenCalledWith(args.event[0], args.handler, args);
    expect(addEventListenerSpy).toHaveBeenCalledWith(args.event[1], args.handler, args);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(args.event[0], args.handler, args);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(args.event[1], args.handler, args);
  });

  it('should add .scrolling class to the body on scroll', async () => {
    const handleScrolling = () => document.body.classList.add('scrolling');
    renderHook(() =>
      useEventListener({
        event: 'scroll',
        handler: handleScrolling,
        target: () => window
      })
    );

    fireEvent.scroll(window);
    await waitFor(() => expect(document.body.classList.contains('scrolling')).toBe(true));
  });

  it('should add .cursor class on mouse enter and leave', async () => {
    const input = document.createElement('input');
    const handleClick = () => input.classList.add('cursor');
    renderHook(() =>
      useEventListener({
        event: ['mouseenter', 'mouseleave'],
        handler: handleClick,
        target: () => input
      })
    );

    fireEvent.mouseEnter(input);
    await waitFor(() => expect(input.classList.contains('cursor')).toBe(true));

    act(() => input.classList.remove('cursor'));
    fireEvent.mouseLeave(input);
    await waitFor(() => expect(input.classList.contains('cursor')).toBe(true));
  });
});
