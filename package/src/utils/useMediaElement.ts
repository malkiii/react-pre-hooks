import { RefObject, SetStateAction, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getStateActionValue } from '.';
import { useNewRef } from './useNewRef';

type MediaElementType = 'video' | 'audio';
export type MediaElement<T extends MediaElementType | undefined> = T extends 'video'
  ? HTMLVideoElement
  : T extends 'audio'
  ? HTMLAudioElement
  : HTMLMediaElement;

export type MediaElementInit<T extends MediaElementType | undefined> = {
  ref?: RefObject<MediaElement<T>> | null;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  startTime?: number;
  volume?: number;
  speed?: number;
};

export const useMediaElement = <T extends MediaElementType | undefined = undefined>(
  initialState: MediaElementInit<T>
) => {
  const ref = useNewRef<MediaElement<T>>(initialState.ref);
  const [state, setState] = useState({
    isReady: false,
    isPlaying: false,
    isPaused: false,
    isEnded: false,
    isMuted: !!initialState.muted,
    isWaiting: false,
    duration: 0,
    progress: 0,
    buffered: 0,
    time: initialState.startTime ?? 0,
    volume: initialState.volume ?? 1,
    speed: initialState.speed ?? 1
  });

  const controls = useMemo(() => {
    const mediaElement = ref.current;
    return {
      togglePlayState(play?: boolean) {
        const shouldPlay = play ?? !state.isPlaying;
        shouldPlay ? this.play() : this.pause();
      },
      play() {
        mediaElement?.play();
      },
      pause() {
        mediaElement?.pause();
      },
      toggleMute(force?: boolean) {
        const shouldMute = force ?? !state.isMuted;
        shouldMute ? this.mute() : this.unmute();
      },
      mute() {
        if (!mediaElement) return;
        mediaElement.muted = true;
        setState(state => ({ ...state, isMuted: true }));
      },
      unmute() {
        if (!mediaElement) return;
        mediaElement.muted = false;
        setState(state => ({ ...state, isMuted: false }));
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
    element.onplay = () => setState(state => ({ ...state, isPlaying: true, isPaused: false }));
    element.onplaying = () => setState(state => ({ ...state, isWaiting: false, isEnded: false }));
    element.onwaiting = () => setState(state => ({ ...state, isWaiting: true }));
    element.onpause = () => setState(state => ({ ...state, isPlaying: false, isPaused: true }));
    element.onvolumechange = () => setState(state => ({ ...state, volume: element.volume }));
    element.onratechange = () => setState(state => ({ ...state, speed: element.playbackRate }));
    element.onended = () => setState(state => ({ ...state, isEnded: true }));
    element.ontimeupdate = () =>
      setState(state => ({
        ...state,
        time: element.currentTime,
        progress: (element.currentTime * 100) / element.duration
      }));
    element.onprogress = () =>
      setState(state => {
        if (!state.duration || !element.buffered.length) return state;
        return { ...state, buffered: (element.buffered.end(0) * 100) / state.duration };
      });
  }, [ref]);

  return { ...state, ...controls, ref };
};
