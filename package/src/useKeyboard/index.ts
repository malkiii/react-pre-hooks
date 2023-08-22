import { useCallback } from 'react';
import { useEventListener } from '@/src';

type KeysRecord = Record<string, (event: KeyboardEvent) => any>;

const getKeyboardEventList = (record: KeysRecord) => {
  return Object.keys(record).map(key => {
    const resolvedKeys = key.split(/,+/g).map(k => k.trim().toLowerCase());
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

export const useKeyboard = <T extends EventTarget>(keysRecord: KeysRecord, element?: T | null) => {
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const keyboardEventList = getKeyboardEventList(keysRecord);
      const pressedKeyEvent = keyboardEventList.find(([keys, _]) => {
        return keys.some(key => isPressed(key, event));
      });

      if (pressedKeyEvent) pressedKeyEvent[1](event);
    },
    [keysRecord]
  );

  useEventListener('keydown', handleKeydown, { target: element });
};
