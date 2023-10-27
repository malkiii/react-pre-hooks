import { RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useEventListener } from '..';
import { browserPrefixes, getPrefixedProperty } from '../utils';

const fullscreenEvents = browserPrefixes.map(pref => pref + 'fullscreenchange') as any[];

export const useFullscreen = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = ref ?? useRef<T>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const methods = useMemo(
    () => ({
      async enter(options: FullscreenOptions = {}) {
        if (!targetRef.current) return;

        const requestFullscreen = getPrefixedProperty(targetRef.current, 'requestFullscreen');
        if (!requestFullscreen) return;

        try {
          await requestFullscreen(options);
        } catch (error) {
          console.error(error);
        }

        setIsEnabled(true);
      },
      async exit() {
        if (!targetRef.current) return;

        const exitFullscreen = getPrefixedProperty(document, 'exitFullscreen');
        if (!exitFullscreen) return;

        try {
          await exitFullscreen();
        } catch (error) {
          console.error(error);
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

  useEventListener(fullscreenEvents, handleFullScreenChange, { ref: document });

  return { ref: targetRef, ...methods, isEnabled };
};
