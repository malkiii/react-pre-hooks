import { useCallback, useEffect } from 'react';
import hotkeys, { KeyHandler } from 'hotkeys-js';

export const useKeyboard = (keysRecord: Record<string, KeyHandler>) => {
  const keys = Object.keys(keysRecord);

  const bindKeys = useCallback(() => {
    keys.forEach(key => hotkeys(key, keysRecord[key]));
  }, [keysRecord]);

  const unbindKeys = useCallback(() => {
    keys.forEach(key => hotkeys.unbind(key));
  }, [keysRecord]);

  useEffect(() => {
    bindKeys();
    return unbindKeys;
  }, [keysRecord]);
};
