import { useCallback, useMemo, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { browserPrefixes, getPrefixedProperty } from '../utils';
import { useNewRef } from '../utils/useNewRef';

const fullscreenChangeEvents = browserPrefixes.map(pref => pref + 'fullscreenchange');
const fullscreenErrorEvents = browserPrefixes.map(pref => pref + 'fullscreenerror');

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useFullscreen | useFullscreen} hook.
 */
export const useFullscreen = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const controls = useMemo(
    () => ({
      ref: targetRef,
      isEnabled,
      isError,
      async enter(options: FullscreenOptions = {}) {
        if (!targetRef.current || isEnabled) return;

        const requestFullscreen = getPrefixedProperty(targetRef.current, 'requestFullscreen');
        if (!requestFullscreen) return;
        setIsError(false);

        await requestFullscreen.bind(targetRef.current)(options);
        setIsEnabled(true);
      },
      async exit() {
        if (!targetRef.current || !isEnabled) return;

        const exitFullscreen = getPrefixedProperty(document, 'exitFullscreen');
        if (!exitFullscreen) return;
        setIsError(false);

        await exitFullscreen.bind(document)();
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

  useEventListener({
    event: fullscreenChangeEvents as any,
    handler: handleFullScreenChange,
    target: () => document
  });

  useEventListener({
    event: fullscreenErrorEvents as any,
    handler: handleFullScreenError,
    target: () => document
  });

  return controls;
};
