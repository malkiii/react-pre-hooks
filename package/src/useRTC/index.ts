import { SetStateAction, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getStateActionValue } from '@/src/utils';

export type MediaDevice = {
  devices: MediaDeviceInfo[];
  current?: MediaDeviceInfo;
  isEnabled: boolean;
  hasPermission: boolean;
};

export type StreamOptions = {
  video?: boolean | (MediaTrackConstraints & { display?: boolean });
  audio?: boolean | MediaTrackConstraints;
  autoStart?: boolean;
};

export const useRTC = (options: StreamOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const { autoStart = true, video = false, audio = false } = options;

  const videoConstraints = typeof video == 'boolean' ? {} : video;
  const audioConstraints = typeof audio == 'boolean' ? {} : audio;

  const streamRef = useRef<MediaStream>(new MediaStream());
  const [shouldStart, setShouldStart] = useState<boolean>(autoStart);

  const [camera, setCamera] = useState<MediaDevice>({
    devices: [],
    isEnabled: !!video,
    hasPermission: false
  });

  const [microphone, setMicrophone] = useState<MediaDevice>({
    devices: [],
    isEnabled: !!audio,
    hasPermission: false
  });

  const start = useCallback(() => {
    const media = ref.current;
    if (!media) return;
    const stream = streamRef.current;
    if (!stream.getTracks().length) return;

    media.muted = true;
    media.controls = false;
    media.autoplay = true;
    media.srcObject = stream;
  }, [shouldStart, camera.current, microphone.current]);

  const stop = useCallback(() => {
    if (ref.current) ref.current.srcObject = null;
    setShouldStart(false);
  }, [ref]);

  const videoDevice = useMemo(
    () => ({
      ...camera,
      use(value?: SetStateAction<MediaDeviceInfo | undefined>) {
        setCamera(c => {
          const device = getStateActionValue(value, c.current);
          if (device && device.kind !== 'videoinput') return c;
          return { ...c, current: device };
        });
      },
      enable(force: SetStateAction<boolean> = true) {
        setCamera(c => {
          const resolvedValue = getStateActionValue(force, c.isEnabled);
          streamRef.current.getVideoTracks()[0].enabled = resolvedValue;
          return { ...c, isEnabled: resolvedValue };
        });
      }
    }),
    [camera]
  );

  const audioDevice = useMemo(
    () => ({
      ...microphone,
      use(value?: SetStateAction<MediaDeviceInfo | undefined>) {
        setMicrophone(m => {
          const device = getStateActionValue(value, m.current);
          if (device && device.kind !== 'audioinput') return m;
          return { ...m, current: device };
        });
      },
      enable(force: SetStateAction<boolean> = true) {
        setMicrophone(m => {
          const resolvedValue = getStateActionValue(force, m.isEnabled);
          streamRef.current.getAudioTracks()[0].enabled = resolvedValue;
          return { ...m, isEnabled: resolvedValue };
        });
      }
    }),
    [microphone]
  );

  const startVideo = useCallback(
    async (isDisplay?: boolean) => {
      videoConstraints.deviceId = videoDevice.current?.deviceId;
      try {
        const videoStream = isDisplay
          ? await navigator.mediaDevices.getDisplayMedia({
              video: videoConstraints,
              audio: true
            })
          : await navigator.mediaDevices.getUserMedia({
              video: videoConstraints
            });

        if (!isDisplay && !videoDevice.devices.length) {
          const mediaDevices = await navigator.mediaDevices.enumerateDevices();
          const devices = mediaDevices.filter(d => d.deviceId && d.kind === 'videoinput');

          setCamera(c => ({ ...c, devices, current: devices[0] }));
          return;
        }

        const tracks = videoStream.getVideoTracks();

        if (isDisplay) tracks[0].onended = () => videoDevice.enable(false);
        else tracks[0].enabled = videoDevice.isEnabled;

        tracks.forEach(track => (track.contentHint = isDisplay ? 'screen' : 'camera'));

        streamRef.current = new MediaStream([...streamRef.current.getAudioTracks(), ...tracks]);

        setCamera(c => ({ ...c, hasPermission: true }));
        start();
      } catch (error) {
        console.error(error);
        setCamera(c => ({ ...c, hasPermission: false }));
      }
    },
    [videoDevice]
  );

  const startAudio = useCallback(async () => {
    audioConstraints.deviceId = audioDevice.current?.deviceId;
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints
      });

      if (!audioDevice.devices.length) {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const devices = mediaDevices.filter(d => d.deviceId && d.kind === 'audioinput');

        setMicrophone(m => ({ ...m, devices, current: devices[0] }));
        return;
      }

      const tracks = audioStream.getAudioTracks();
      tracks[0].enabled = audioDevice.isEnabled;
      tracks[0].onmute = () => audioDevice.enable(false);
      tracks[0].onunmute = () => audioDevice.enable(true);
      tracks.forEach(track => (track.contentHint = 'microphone'));

      const currentTracks = streamRef.current
        .getTracks()
        .filter(t => t.contentHint !== 'microphone');

      streamRef.current = new MediaStream([...currentTracks, ...tracks]);

      setMicrophone(c => ({ ...c, hasPermission: true }));
      start();
    } catch (error) {
      console.error(error);
      setMicrophone(c => ({ ...c, hasPermission: false }));
    }
  }, [audioDevice]);

  // start the video
  useLayoutEffect(() => {
    if (videoConstraints.display) return;
    streamRef.current.getVideoTracks().forEach(t => t.stop());
    if (!shouldStart || !video) return;

    startVideo();
  }, [videoDevice.current, shouldStart]);

  // start the screen-capture
  useLayoutEffect(() => {
    if (!videoConstraints.display) return;
    if (!shouldStart || !camera.isEnabled) return;

    startVideo(true);
  }, [videoDevice.isEnabled, shouldStart]);

  // start the audio
  useLayoutEffect(() => {
    streamRef.current
      .getAudioTracks()
      .filter(t => t.contentHint === 'microphone')
      .forEach(t => t.stop());
    if (!shouldStart || !audio) return;

    startAudio();
  }, [audioDevice.current, shouldStart]);

  return {
    ref,
    stream: streamRef.current,
    video: videoDevice,
    audio: audioDevice,
    start: () => setShouldStart(true),
    stop
  };
};
