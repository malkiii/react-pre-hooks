import { useCallback, useEffect } from 'react';
import hotkeys, { KeyHandler } from 'hotkeys-js';

export const useKeyboard = (keysRecord: Record<string, KeyHandler>) => {
  const keys = Object.keys(keysRecord);

  const bindAllKeys = useCallback(() => {
    keys.forEach(key => hotkeys(key, keysRecord[key]));
    return () => keys.forEach(key => hotkeys.unbind(key));
  }, [keysRecord]);

  useEffect(bindAllKeys, [keysRecord]);
};
