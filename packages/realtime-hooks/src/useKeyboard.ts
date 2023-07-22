import { KeyboardEventHandler, useCallback, useEffect } from 'react';
import hotkeys from 'hotkeys-js';

export const useKeyboard = (keysRecord: Record<string, KeyboardEventHandler>) => {
  const keys = Object.keys(keysRecord);

  const bindAllKeys = useCallback(() => {
    keys.forEach(key => hotkeys(key, keysRecord[key] as any));
    return () => keys.forEach(key => hotkeys.unbind(key));
  }, [keysRecord]);

  useEffect(bindAllKeys, [keysRecord]);
};
