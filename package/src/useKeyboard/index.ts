import { RefObject, useCallback, useEffect, useRef } from 'react';
import { addEvents } from '@/src/utils';

export type KeysRecord = Record<string, (event: KeyboardEvent) => any>;

const getKeyboardEventList = (record: KeysRecord, sep = '|') => {
  return Object.keys(record).map(key => {
    const resolvedKeys = key.split(sep).map(k => k.trim().toLowerCase());
    return [resolvedKeys, record[key]] as const;
  });
};

const isPressed = (keyModifier: string, event: KeyboardEvent): boolean => {
  return keyModifier.split('+').every(key => {
    switch (key.trim()) {
      case 'ctrl':
        return event.ctrlKey;
      case 'alt':
        return event.altKey;
      case 'shift':
        return event.shiftKey;
      case 'meta':
        return event.metaKey;
      default:
        return event.key.toLowerCase() === key;
    }
  });
};

export type KeyboardOptions<T extends EventTarget> = {
  ref?: RefObject<T> | null;
  separator?: string;
};

export const useKeyboard = <T extends EventTarget = Window>(
  keysRecord: KeysRecord = {},
  options: KeyboardOptions<T> = {}
) => {
  const targetRef = options.ref ?? useRef<T>(null);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const keyboardEventList = getKeyboardEventList(keysRecord, options.separator);
      const pressedKeyEvent = keyboardEventList.find(([keys, _]) => {
        return keys.some(key => isPressed(key, event));
      });

      if (pressedKeyEvent) pressedKeyEvent[1](event);
    },
    [keysRecord]
  );

  useEffect(() => {
    addEvents('keydown', handleKeydown, { ref: targetRef.current ?? window });
  }, [options.ref]);

  return targetRef;
};
