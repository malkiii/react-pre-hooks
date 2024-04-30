import { useCallback, useMemo } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

export type KeyboardEventCallback = (event: KeyboardEvent) => any;
export type KeysRecord = Record<string, KeyboardEventCallback>;

const getKeyboardEventList = (record: KeysRecord = {}, sep = '|') => {
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
        return event.key.toLowerCase() === key || event.code.toLowerCase() === key;
    }
  });
};

export const useKeyboard = <T extends EventTarget = Window>(args: {
  keys: KeysRecord;
  ref?: React.RefObject<T> | null;
  separator?: string;
}) => {
  const targetRef = useNewRef<T>(args.ref);

  const keyboardEventList = useMemo(
    () => getKeyboardEventList(args.keys, args.separator),
    [args.keys]
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const pressedKeyEvent = keyboardEventList.find(([keys, _]) => {
        return keys.some(key => isPressed(key, event));
      });

      if (pressedKeyEvent) pressedKeyEvent[1](event);
    },
    [keyboardEventList]
  );

  useEventListener({
    event: 'keydown',
    handler: handleKeydown,
    target: () => targetRef.current ?? window
  });

  return targetRef;
};
