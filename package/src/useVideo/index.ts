import { useLayoutEffect, useMemo, useState } from 'react';
import { MediaElementInit, useMediaElement } from '../utils/useMediaElement';

export type VideoElementInit = MediaElementInit<'video'> & {
  caption?: { lang?: string; enabled?: boolean };
};

export const useVideo = (initialState: VideoElementInit = {}) => {
  const video = useMediaElement<'video'>(initialState);

  const [captionState, setCaptionState] = useState({
    list: [] as TextTrack[],
    current: undefined as TextTrack | undefined,
    isShowing: false
  });

  const caption = useMemo(
    () => ({
      ...captionState,
      toggle(show?: boolean) {
        const shouldShow = show ?? !captionState.isShowing;
        if (!captionState.current) return;

        captionState.current.mode = shouldShow ? 'showing' : 'hidden';
      },
      show() {
        this.toggle(true);
      },
      hide() {
        this.toggle(false);
      },
      set(track?: TextTrack) {
        if (captionState.current) captionState.current.mode = 'hidden';
        if (track) track.mode = captionState.isShowing ? 'showing' : 'hidden';
        setCaptionState(c => ({ ...c, current: track }));
      }
    }),
    [captionState]
  );

  useLayoutEffect(() => {
    const element = video.ref.current;
    if (!element) return;

    const lang = initialState.caption?.lang || '';
    const shouldEnable = !!initialState.caption?.enabled;

    element.textTracks.onchange = () => {
      const captionsList = Array.from(element.textTracks).filter(
        track => track.kind === 'captions' || track.kind === 'subtitles'
      );

      setCaptionState(c => {
        if (!c.list.length) {
          captionsList.forEach(c => (c.mode = 'hidden'));
          const initial = captionsList.find(c => c.language.startsWith(lang));
          const isShowing = !!initial && shouldEnable;
          if (initial) initial.mode = isShowing ? 'showing' : 'hidden';

          return { list: captionsList, current: initial, isShowing };
        }

        const current = captionsList.find(c => c.mode === 'showing') ?? c.current;

        return { list: captionsList, current, isShowing: current?.mode === 'showing' };
      });
    };
  }, [video.ref]);

  return { caption, ...video };
};
