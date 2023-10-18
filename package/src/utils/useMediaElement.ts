import { SetStateAction, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getStateActionValue } from '.';

type MediaElementType = 'video' | 'audio';
export type MediaElement<T extends MediaElementType | undefined> = T extends 'video'
  ? HTMLVideoElement
  : T extends 'audio'
  ? HTMLAudioElement
  : HTMLMediaElement;

export type MediaElementInit = {
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  startTime?: number;
  volume?: number;
  speed?: number;
};

export const useMediaElement = <T extends MediaElementType | undefined = undefined>(
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
