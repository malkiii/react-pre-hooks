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

  const controls = useMemo(
    () => ({
      toggle(play?: boolean) {
        if (!ref.current) return;
        play ?? !state.isPlaying ? ref.current.play() : ref.current.pause();
      },
      setTime(time: SetStateAction<number>) {
        if (!ref.current) return;
        const resolvedTime = time instanceof Function ? time(ref.current.currentTime) : time;
        ref.current.currentTime = resolvedTime;
      },
      setVolume(vol: SetStateAction<number>) {
        if (!ref.current) return;
        const resolvedVolume = vol instanceof Function ? vol(ref.current.volume) : vol;
        ref.current.volume = resolvedVolume;
      },
      setSpeed(speed: SetStateAction<number>) {
        if (!ref.current) return;
        const resolvedSpeed = speed instanceof Function ? speed(ref.current.playbackRate) : speed;
        ref.current.playbackRate = resolvedSpeed;
      },
      seekBy(time: number) {
        this.setTime(curr => curr + time);
      }
    }),
    []
  );

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

  return { ref, state, controls };
};

export const useVideo = (initialState?: MediaElementInit) => {
  const { ref, state, controls } = useMediaElement<'video'>(initialState);
  return { videoRef: ref, videoState: state, videoControls: controls };
};

export const useAudio = (initialState?: MediaElementInit) => {
  const { ref, state, controls } = useMediaElement<'audio'>(initialState);
  return { audioRef: ref, audioState: state, audioControls: controls };
};
