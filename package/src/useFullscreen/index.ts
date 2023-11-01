import { RefObject, useCallback, useMemo, useState } from 'react';
import { useEventListener } from '..';
import { browserPrefixes, getPrefixedProperty } from '../utils';
import { useNewRef } from '../utils/useNewRef';

const fullscreenChangeEvents = browserPrefixes.map(pref => pref + 'fullscreenchange') as any[];
const fullscreenErrorEvents = browserPrefixes.map(pref => pref + 'fullscreenerror') as any[];

export const useFullscreen = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const methods = useMemo(
    () => ({
      async enter(options: FullscreenOptions = {}) {
        if (!targetRef.current || isEnabled) return;

        const requestFullscreen = getPrefixedProperty(targetRef.current, 'requestFullscreen');
        if (!requestFullscreen) return;
        setIsError(false);

        await requestFullscreen(options);
        setIsEnabled(true);
      },
      async exit() {
        if (!targetRef.current || !isEnabled) return;

        const exitFullscreen = getPrefixedProperty(document, 'exitFullscreen');
        if (!exitFullscreen) return;
        setIsError(false);

        await exitFullscreen();
        setIsEnabled(false);
      },
      async toggle(enable?: boolean) {
        const shouldEnable = enable ?? !isEnabled;
        shouldEnable ? await this.enter() : await this.exit();
      }
    }),
    [isEnabled]
  );

  const handleFullScreenChange = useCallback(() => {
    if (!targetRef.current) return;
    setIsEnabled(getPrefixedProperty(document, 'fullscreenElement') === targetRef.current);
  }, []);

  const handleFullScreenError = useCallback(() => {
    setIsError(true);
  }, []);

  const eventOptions = { target: document };
  useEventListener(fullscreenChangeEvents, handleFullScreenChange, eventOptions);
  useEventListener(fullscreenErrorEvents, handleFullScreenError, eventOptions);

  return { ref: targetRef, ...methods, isEnabled, isError };
};
