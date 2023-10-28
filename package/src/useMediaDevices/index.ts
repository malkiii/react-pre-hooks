import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject, SetStateAction } from 'react';
import { getStateActionValue } from '../utils';

export type MediaDeviceType = 'video' | 'audio';
export type MediaDeviceState = {
  devices: MediaDeviceInfo[];
  current?: MediaDeviceInfo;
  isEnabled: boolean;
  hasPermission: boolean;
};

export type MediaDevicesOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
  startOnMount?: boolean;
};

export const useMediaDevices = (options: MediaDevicesOptions = {}) => {
  const { ref, startOnMount = true, ...constraints } = options;
  const videoRef = ref ?? useRef<HTMLVideoElement>(null);

  const streamRef = useRef<MediaStream>(new MediaStream());
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const [videoState, setVideoState] = useState<MediaDeviceState>({
    devices: [],
    isEnabled: !!constraints.video,
    hasPermission: false
  });

  const [audioState, setAudioState] = useState<MediaDeviceState>({
    devices: [],
    isEnabled: !!constraints.audio,
    hasPermission: false
  });

  const initializeStream = useCallback(() => {
    if (!videoRef.current) return;
    if (!streamRef.current.getTracks().length) return;

    videoRef.current.muted = true;
    videoRef.current.autoplay = true;
    videoRef.current.controls = false;
    videoRef.current.srcObject = streamRef.current;
  }, [ref]);

  const getMediaDevice = useCallback(
    (type: MediaDeviceType) => {
      const isVideo = type === 'video';
      const deviceState = isVideo ? videoState : audioState;
      const setState = isVideo ? setVideoState : setAudioState;
      return {
        ...deviceState,
        set(device?: MediaDeviceInfo) {
          if (device && device.kind !== `${type}input`) return;
          setState(state => ({ ...state, current: device }));
        },
        enable(force: SetStateAction<boolean> = true) {
          setState(state => {
            const resolvedValue = getStateActionValue(force, state.isEnabled);
            const currentTrack = isVideo
              ? streamRef.current.getVideoTracks().at(0)
              : streamRef.current.getAudioTracks().at(0);
            if (currentTrack) currentTrack.enabled = resolvedValue;
            return { ...state, isEnabled: resolvedValue };
          });
        }
      };
    },
    [videoState, audioState]
  );

  const camera = useMemo(() => getMediaDevice('video'), [getMediaDevice]);
  const microphone = useMemo(() => getMediaDevice('audio'), [getMediaDevice]);

  const updateMediaDevices = useCallback(
    async (type: MediaDeviceType) => {
      const isVideo = type === 'video';
      const device = isVideo ? camera.current : microphone.current;
      const setState = isVideo ? setVideoState : setAudioState;

      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const devices = mediaDevices.filter(d => d.deviceId && d.kind === `${type}}input`);

      setState(state => ({
        ...state,
        devices,
        current: device && devices.includes(device) ? device : devices[0]
      }));
    },
    [camera.current, microphone.current]
  );

  const initMediaDevice = useCallback(
    async (type: MediaDeviceType) => {
      const isVideo = type === 'video';
      const device = isVideo ? camera : microphone;
      const setState = isVideo ? setVideoState : setAudioState;
      const tracksGetterName = isVideo ? 'getVideoTracks' : 'getAudioTracks';

      // stop the current stream tracks so that the next tracks will start
      streamRef.current[tracksGetterName]().forEach(t => t.stop());

      const excluded = isVideo ? 'audio' : 'video';
      const { [type]: trackConstraints, [excluded]: _, ...otherProps } = constraints;

      const mediaConstraints =
        typeof trackConstraints === 'object'
          ? trackConstraints
          : { deviceId: device.current?.deviceId };

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          [type]: mediaConstraints,
          ...otherProps
        });

        if (!device.devices.length) await updateMediaDevices(type);

        const tracks = stream[tracksGetterName]();
        const otherTracks = streamRef.current.getTracks().filter(t => t.kind === type);
        tracks[0].enabled = videoState.isEnabled;
        tracks[0].onmute = () => microphone.enable(false);
        tracks[0].onunmute = () => microphone.enable(true);

        streamRef.current = new MediaStream([...tracks, ...otherTracks]);
        setState(state => ({ ...state, hasPermission: true }));
        initializeStream();

        return true;
      } catch (error) {
        console.error(error);
        setState(state => ({ ...state, hasPermission: false }));

        return false;
      }
    },
    [camera, microphone]
  );

  const start = useCallback(async () => {
    const { video, audio } = constraints;
    const cameraIsStarted = !!video && (await initMediaDevice('video'));
    const microphoneIsStarted = !!audio && (await initMediaDevice('audio'));
    setIsStarted(cameraIsStarted || microphoneIsStarted);

    return cameraIsStarted || microphoneIsStarted;
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current.getTracks().forEach(t => t.stop());
    setIsStarted(false);
  }, []);

  useEffect(() => {
    if (startOnMount) start();
  }, []);

  return {
    ref: videoRef,
    stream: streamRef,
    camera,
    microphone,
    isStarted,
    start,
    stop
  };
};
