import { RefObject, useCallback, useMemo, useState } from 'react';
import { useEventListener } from '..';
import { browserPrefixes, getPrefixedProperty } from '../utils';
import { useNewRef } from '../utils/useNewRef';

const fullscreenEvents = browserPrefixes.map(pref => pref + 'fullscreenchange') as any[];

export const useFullscreen = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState<unknown>();

  const methods = useMemo(
    () => ({
      async enter(options: FullscreenOptions = {}) {
        if (!targetRef.current || isEnabled) return;

        const requestFullscreen = getPrefixedProperty(targetRef.current, 'requestFullscreen');
        if (!requestFullscreen) return;
        setError(undefined);

        try {
          await requestFullscreen(options);
        } catch (error) {
          setError(error);
        }

        setIsEnabled(true);
      },
      async exit() {
        if (!targetRef.current || !isEnabled) return;

        const exitFullscreen = getPrefixedProperty(document, 'exitFullscreen');
        if (!exitFullscreen) return;
        setError(undefined);

        try {
          await exitFullscreen();
        } catch (error) {
          setError(error);
        }

        setIsEnabled(false);
      },
      async toggle(enable?: boolean) {
        const shouldEnable = enable ?? !isEnabled;
        shouldEnable ? await this.enter() : await this.exit();
        setIsEnabled(shouldEnable);
      }
    }),
    [isEnabled]
  );

  const handleFullScreenChange = useCallback(() => {
    if (!targetRef.current) return;
    setIsEnabled(getPrefixedProperty(document, 'fullscreenElement') === targetRef.current);
  }, []);

  useEventListener(fullscreenEvents, handleFullScreenChange, { target: document });

  return { ref: targetRef, ...methods, isEnabled, error };
};
