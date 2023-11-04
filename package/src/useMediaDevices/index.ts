import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type MediaDeviceType = 'video' | 'audio';

export type MediaDevicesOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
  startOnMount?: boolean;
};

export const useMediaDevices = (options: MediaDevicesOptions = {}) => {
  const { ref, startOnMount = true, ...globalConstraints } = options;

  const videoRef = useNewRef<HTMLVideoElement>(options.ref);
  const streamRef = useRef<MediaStream>(new MediaStream());

  const [camera, setCamera] = useState({
    devices: [] as MediaDeviceInfo[],
    isEnabled: false
  });
  const [microphone, setMicrophone] = useState<typeof camera>({
    devices: [],
    isEnabled: false
  });

  const initializeStream = useCallback(() => {
    if (!videoRef.current) return;
    if (!streamRef.current.getTracks().length) return;

    videoRef.current.muted = true;
    videoRef.current.autoplay = true;
    videoRef.current.controls = false;
    videoRef.current.srcObject = streamRef.current;
  }, [ref]);

  const initMediaDevice = useCallback(
    async (type: MediaDeviceType, constraints: MediaStreamConstraints) => {
      const isVideo = type === 'video';
      const setState = isVideo ? setCamera : setMicrophone;
      const tracksGetterName = isVideo ? 'getVideoTracks' : 'getAudioTracks';

      // stop the current stream tracks so that the next tracks will start
      streamRef.current[tracksGetterName]().forEach(t => t.stop());

      const excluded = isVideo ? 'audio' : 'video';
      const { [type]: trackConstraints, [excluded]: _, ...otherProps } = constraints;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          [type]: trackConstraints,
          ...otherProps
        });

        const tracks = stream[tracksGetterName]();
        if (tracks[0]) tracks[0].onended = () => setState(s => ({ ...s, isEnabled: false }));

        const otherTracks = streamRef.current.getTracks().filter(t => t.kind === excluded);
        streamRef.current = new MediaStream([...tracks, ...otherTracks]);

        setState(s => (s.isEnabled ? s : { ...s, isEnabled: true }));
        initializeStream();

        return true;
      } catch (error) {
        setState(s => (!s.isEnabled ? s : { ...s, isEnabled: false }));
        return false;
      }
    },
    []
  );

  const start = useCallback(async (constraints?: MediaStreamConstraints) => {
    const mediaConstraints = constraints ?? globalConstraints;

    const { video, audio } = mediaConstraints;
    const cameraIsStarted = !!video && (await initMediaDevice('video', mediaConstraints));
    const microphoneIsStarted = !!audio && (await initMediaDevice('audio', mediaConstraints));

    return cameraIsStarted || microphoneIsStarted;
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current.getTracks().forEach(t => t.stop());
  }, []);

  const updateMediaDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    setCamera(s => ({ ...s, devices: devices.filter(d => d.kind === 'videoinput') }));
    setMicrophone(s => ({ ...s, devices: devices.filter(d => d.kind === 'audioinput') }));
  }, []);

  useEffect(() => {
    if (startOnMount) start();
    updateMediaDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateMediaDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', updateMediaDevices);
  }, []);

  return { ref: videoRef, stream: streamRef, camera, microphone, start, stop };
};
