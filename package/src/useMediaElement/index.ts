import { SetStateAction, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
    speed: 1
  });

  const controls = useMemo(() => {
    const mediaElement = ref.current;
    return {
      toggle(play?: boolean) {
        if (!mediaElement) return;
        const shouldPlay = play ?? !state.isPlaying;
        shouldPlay ? mediaElement.play() : mediaElement.pause();
      },
      mute(force: boolean = true) {
        if (!mediaElement) return;
        mediaElement.muted = force;
        setState(state => ({ ...state, isMuted: force }));
      },
      setTime(time: SetStateAction<number>) {
        if (!mediaElement) return;
        const resolvedTime = time instanceof Function ? time(mediaElement.currentTime) : time;
        mediaElement.currentTime = resolvedTime;
      },
      setVolume(vol: SetStateAction<number>) {
        if (!mediaElement) return;
        const resolvedVolume = vol instanceof Function ? vol(mediaElement.volume) : vol;
        mediaElement.volume = resolvedVolume;
      },
      setSpeed(speed: SetStateAction<number>) {
        if (!mediaElement) return;
        const resolvedSpeed = speed instanceof Function ? speed(mediaElement.playbackRate) : speed;
        mediaElement.playbackRate = resolvedSpeed;
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
    element.onprogress = () => setState(state => ({ ...state, buffered: element.buffered.end(0) }));
    element.ondurationchange = () => setState(state => ({ ...state, duration: element.duration }));
    element.onplay = () => setState(state => ({ ...state, isPaused: false, isEnded: false }));
    element.onplaying = () => setState(state => ({ ...state, isPlaying: true, isWaiting: false }));
    element.onpause = () => setState(state => ({ ...state, isPlaying: false, isPaused: true }));
    element.ontimeupdate = () => setState(state => ({ ...state, time: element.currentTime }));
    element.onvolumechange = () => setState(state => ({ ...state, volume: element.volume }));
    element.onratechange = () => setState(state => ({ ...state, speed: element.playbackRate }));
    element.onended = () => setState(state => ({ ...state, isEnded: true }));
  }, [ref]);

  return { ref, ...state, ...controls };
};

export const useVideo = (initialState?: MediaElementInit) => {
  return useMediaElement<'video'>(initialState);
};

export const useAudio = (initialState?: MediaElementInit) => {
  return useMediaElement<'audio'>(initialState);
};
