import { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import hotkeys from 'hotkeys-js';

export const useKeyboard = (keysRecord: Record<string, KeyboardEventHandler>) => {
  const targetRef = useRef<HTMLElement>();

  const keys = Object.keys(keysRecord);
  const options: any = targetRef.current ? { element: targetRef } : {};

  const bindAllKeys = useCallback(() => {
    keys.forEach(key => hotkeys(key, options, keysRecord[key] as any));
    return () => keys.forEach(key => hotkeys.unbind(key));
  }, [keysRecord]);

  useEffect(bindAllKeys, [keysRecord]);

  return targetRef;
};
