import { useCallback } from 'react';
import { EventListenerOptions, useEventListener } from '@/src';

export type KeysRecord = Record<string, (event: KeyboardEvent) => any>;

const getKeyboardEventList = (record: KeysRecord) => {
  return Object.keys(record).map(key => {
    const resolvedKeys = key.split(',').map(k => k.trim().toLowerCase());
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

export const useKeyboard = <T extends EventTarget = Window>(
  keysRecord: KeysRecord = {},
  options: EventListenerOptions<T> = {}
) => {
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

  if (!options.target) options.target = window as any;

  useEventListener('keydown', handleKeydown, options);
};
