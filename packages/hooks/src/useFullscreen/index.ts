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

  const getTarget = useCallback(() => targetRef.current ?? document.body, [targetRef]);

  const controls = useMemo(
    () => ({
      ref: targetRef,
      isEnabled,
      isError,
      async enter(options: FullscreenOptions = {}) {
        const requestFullscreen = getPrefixedProperty(getTarget(), 'requestFullscreen');
        if (!requestFullscreen) return;
        setIsError(false);

        await requestFullscreen(options);
        setIsEnabled(true);
      },
      async exit() {
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
    const fullscreenElement = getPrefixedProperty(document, 'fullscreenElement');
    setIsEnabled(fullscreenElement === getTarget());
  }, []);

  const handleFullScreenError = useCallback(() => {
    setIsError(true);
  }, []);

  useEventListener({
    event: fullscreenChangeEvents as any,
    handler: handleFullScreenChange,
    target: () => {
      handleFullScreenChange();
      return document;
    }
  });

  useEventListener({
    event: fullscreenErrorEvents as any,
    handler: handleFullScreenError,
    target: () => document
  });

  return controls;
};
