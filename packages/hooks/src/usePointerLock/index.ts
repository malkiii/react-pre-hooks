import { RefObject, useCallback, useMemo, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPrefixedProperty } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type PointerLockOptions = {
  unadjustedMovement?: boolean;
};

export const usePointerLock = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const methods = useMemo(
    () => ({
      enter(options: PointerLockOptions = {}) {
        if (!targetRef.current || isEnabled) return;

        const requestPointerLock = getPrefixedProperty(
          targetRef.current,
          'requestPointerLock'
        ) as Function;
        if (!requestPointerLock) return;
        setIsError(false);

        requestPointerLock.bind(targetRef.current)(options);
        setIsEnabled(true);
      },
      exit() {
        if (!targetRef.current || !isEnabled) return;

        const exitPointerLock = getPrefixedProperty(document, 'exitPointerLock');
        if (!exitPointerLock) return;
        setIsError(false);

        exitPointerLock.bind(document)();
        setIsEnabled(false);
      },
      toggle(enable?: boolean) {
        const shouldEnable = enable ?? !isEnabled;
        shouldEnable ? this.enter() : this.exit();
      }
    }),
    [isEnabled]
  );

  const handlePointerLockChange = useCallback(() => {
    if (!targetRef.current) return;
    setIsEnabled(getPrefixedProperty(document, 'pointerLockElement') === targetRef.current);
  }, []);

  const handlePointerLockError = useCallback(() => {
    setIsError(true);
  }, []);

  const eventOptions = { target: () => document };
  useEventListener('pointerlockchange', handlePointerLockChange, eventOptions);
  useEventListener('pointerlockerror', handlePointerLockError, eventOptions);

  return { ref: targetRef, ...methods, isEnabled, isError };
};
