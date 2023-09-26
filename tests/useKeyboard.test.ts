import { act, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useKeyboard } from '@/src';

describe('useKeyboard', () => {
  it('should bind and call all the keys handlers', async () => {
    const handler = vi.fn();

    renderHook(() => useKeyboard({ 'a, b': handler, 'ctrl+a': vi.fn() }, { separator: ',' }));

    fireEvent.keyDown(document, { key: 'b' });
    await waitFor(() => expect(handler).toHaveBeenCalled());
  });

  it('should unbind hotkey handler on unmount', async () => {
    const keyHandler = vi.fn();

    const { unmount } = renderHook(() => useKeyboard({ 'a | Ctrl+b | Alt+c': keyHandler }));
    const keyDownOptions = { key: 'c', altKey: true };

    fireEvent.keyDown(document, keyDownOptions);
    await waitFor(() => expect(keyHandler).toHaveBeenCalled());

    unmount();

    fireEvent.keyDown(document, keyDownOptions);
    await waitFor(() => expect(keyHandler).toHaveBeenCalled());
  });
});
