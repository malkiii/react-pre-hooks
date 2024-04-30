import { fireEvent, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useKeyboard } from '.';

describe('useKeyboard', () => {
  it('should bind and call all the keys handlers', async () => {
    const handler = vi.fn();

    const keys = { 'a, b': handler, 'ctrl+a': vi.fn() };
    renderHook(() => useKeyboard({ keys, separator: ',' }));

    fireEvent.keyDown(document, { key: 'b' });
    await waitFor(() => expect(handler).toHaveBeenCalled());
  });

  it('should unbind hotkey handler on unmount', async () => {
    const keyHandler = vi.fn();

    const keys = { 'a | Ctrl+b | Alt+c': keyHandler };
    const { unmount } = renderHook(() => useKeyboard({ keys }));
    const keyDownOptions = { key: 'c', altKey: true };

    fireEvent.keyDown(document, keyDownOptions);
    await waitFor(() => expect(keyHandler).toHaveBeenCalled());

    unmount();

    fireEvent.keyDown(document, keyDownOptions);
    await waitFor(() => expect(keyHandler).toHaveBeenCalled());
  });
});
