import { SetStateAction, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useEventListener } from '@/src';
import { getPrefixedProperty, getStateActionValue } from '@/src/utils';

export type MediaElementType = 'video' | 'audio';
export type MediaElement<T extends MediaElementType | undefined> = T extends 'video'
  ? HTMLVideoElement
  : T extends 'audio'
  ? HTMLAudioElement
  : HTMLMediaElement;

export type MediaElementInit = Partial<{
  autoPlay: boolean;
  muted: boolean;
  loop: boolean;
  startTime: number;
  volume: number;
  speed: number;
}>;

const useMediaElement = <T extends MediaElementType | undefined = undefined>(
  initialState: MediaElementInit = {}
) => {
  const ref = useRef<MediaElement<T>>(null);
  const [state, setState] = useState({
    isReady: false,
    isPlaying: false,
    isPaused: false,
    isEnded: false,
    isMuted: !!initialState.muted,
    isWaiting: false,
    duration: 0,
    buffered: 0,
    time: initialState.startTime ?? 0,
    volume: initialState.volume ?? 1,
    speed: initialState.speed ?? 1
  });

  const controls = useMemo(() => {
    const mediaElement = ref.current;
    return {
      togglePlayState(play?: boolean) {
        if (!mediaElement) return;
        const shouldPlay = play ?? !state.isPlaying;
        shouldPlay ? mediaElement.play() : mediaElement.pause();
      },
      play() {
        this.togglePlayState(true);
      },
      pause() {
        this.togglePlayState(false);
      },
      mute(force: boolean = true) {
        if (!mediaElement) return;
        mediaElement.muted = force;
        setState(state => ({ ...state, isMuted: force }));
      },
      setTime(time: SetStateAction<number>) {
        if (!mediaElement) return;
        mediaElement.currentTime = getStateActionValue(time, mediaElement.currentTime);
      },
      setVolume(volume: SetStateAction<number>) {
        if (!mediaElement) return;
        mediaElement.volume = getStateActionValue(volume, mediaElement.volume);
      },
      setSpeed(speed: SetStateAction<number>) {
        if (!mediaElement) return;
        mediaElement.playbackRate = getStateActionValue(speed, mediaElement.playbackRate);
      },
      seekBy(time: number) {
        this.setTime(curr => curr + time);
      }
    };
  }, [ref, state]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.autoplay = !!initialState.autoPlay;
    element.muted = !!initialState.muted;
    element.loop = !!initialState.loop;
    element.currentTime = initialState.startTime ?? 0;
    element.volume = initialState.volume ?? 1;
    element.playbackRate = initialState.speed ?? 1;

    element.oncanplay = () => setState(state => ({ ...state, isReady: true }));
    element.ondurationchange = () => setState(state => ({ ...state, duration: element.duration }));
    element.onplay = () => setState(state => ({ ...state, isPaused: false, isEnded: false }));
    element.onplaying = () => setState(state => ({ ...state, isPlaying: true, isWaiting: false }));
    element.onpause = () => setState(state => ({ ...state, isPlaying: false, isPaused: true }));
    element.ontimeupdate = () => setState(state => ({ ...state, time: element.currentTime }));
    element.onvolumechange = () => setState(state => ({ ...state, volume: element.volume }));
    element.onratechange = () => setState(state => ({ ...state, speed: element.playbackRate }));
    element.onended = () => setState(state => ({ ...state, isEnded: true }));
    element.onprogress = () =>
      setState(state => {
        if (!state.duration || !element.buffered.length) return state;
        return { ...state, buffered: (element.buffered.end(0) * 100) / state.duration };
      });
  }, [ref]);

  return { ...state, ...controls, ref };
};

export const useAudio = (initialState?: MediaElementInit) => {
  return useMediaElement<'audio'>(initialState);
};

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
