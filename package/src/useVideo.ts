import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useEventListener } from '@/src';
import { getPrefixedProperty } from '@/src/utils';
import { MediaElementInit, useMediaElement } from '@/src/utils/useMediaElement';

export type VideoElementInit = MediaElementInit &
  Partial<{
    caption: { lang?: string; enabled?: boolean };
    fullscreen: boolean;
    miniPlayer: boolean;
  }>;

export const useVideo = (initialState: VideoElementInit = {}) => {
  const { caption = {}, fullscreen = false, miniPlayer = false, ...init } = initialState;
  const video = useMediaElement<'video'>(init);

  const [captions, setCaptions] = useState({
    list: [] as TextTrack[],
    current: undefined as TextTrack | undefined,
    isShowing: false
  });

  const [videoState, setVideoState] = useState({
    isFullscreen: fullscreen,
    isMiniPlayer: !fullscreen && miniPlayer
  });

  const additionalControls = useMemo(
    () => ({
      async toggleFullScreen(force?: boolean, options: FullscreenOptions = {}) {
        const element = video.ref.current;
        if (!element) return;

        const requestFullscreen = getPrefixedProperty(element, 'requestFullscreen');
        const exitFullscreen =
          'mozCancelFullScreen' in document
            ? (document.mozCancelFullScreen as () => Promise<void>)
            : getPrefixedProperty(document, 'exitFullscreen');

        const shouldToggle = force ?? !document.fullscreenElement;

        try {
          if (shouldToggle && requestFullscreen) await requestFullscreen(options);
          else if (exitFullscreen) await exitFullscreen();
        } catch (error) {
          console.error(error);
        }
      },
      async toggleMiniPlayer(force?: boolean) {
        const element = video.ref.current;
        if (!element) return;

        const requestPictureInPicture = getPrefixedProperty(element, 'requestPictureInPicture');
        const exitPictureInPicture = getPrefixedProperty(document, 'exitPictureInPicture');

        const shouldToggle = force ?? !document.pictureInPictureElement;

        try {
          if (shouldToggle && requestPictureInPicture) return await requestPictureInPicture();
          else if (exitPictureInPicture) await exitPictureInPicture();
        } catch (error) {
          console.error(error);
        }
      },
      toggleCaption(show?: boolean) {
        const shouldShow = show ?? !captions.isShowing;
        if (!captions.current) return;

        captions.current.mode = shouldShow ? 'showing' : 'hidden';
      },
      setCaption(track?: TextTrack) {
        if (captions.current) captions.current.mode = 'hidden';
        if (track) track.mode = captions.isShowing ? 'showing' : 'hidden';
        setCaptions(c => ({ ...c, current: track }));
      }
    }),
    [videoState, captions]
  );

  const eventOptions = { target: video.ref.current };

  const handleVideoModeChange = useCallback(() => {
    setVideoState(state => ({
      ...state,
      isFullscreen: !!document.fullscreenElement,
      isMiniPlayer: !!document.pictureInPictureElement
    }));
  }, []);

  useEventListener('fullscreenchange', handleVideoModeChange, eventOptions);
  useEventListener(
    ['enterpictureinpicture', 'leavepictureinpicture'] as any,
    handleVideoModeChange,
    eventOptions
  );

  useLayoutEffect(() => {
    const element = video.ref.current;
    if (!element) return;

    element.textTracks.onchange = () => {
      const captionsList = Array.from(element.textTracks).filter(
        track => track.kind === 'captions' || track.kind === 'subtitles'
      );

      setCaptions(c => {
        if (!c.list.length) {
          captionsList.forEach(c => (c.mode = 'hidden'));
          const initial = captionsList.find(c => c.language.startsWith(caption.lang || ''));
          const isShowing = !!initial && !!caption.enabled;
          if (initial) initial.mode = isShowing ? 'showing' : 'hidden';

          return { list: captionsList, current: initial, isShowing };
        }

        const current = captionsList.find(c => c.mode === 'showing') ?? c.current;

        return { list: captionsList, current, isShowing: current?.mode === 'showing' };
      });
    };

    if (fullscreen) additionalControls.toggleFullScreen(true);
    else if (miniPlayer) additionalControls.toggleMiniPlayer(true);
  }, [video.ref]);

  return { ...videoState, captions, ...additionalControls, ...video };
};
