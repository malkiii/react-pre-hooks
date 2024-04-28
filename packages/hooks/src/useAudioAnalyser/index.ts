import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from '../useAnimationFrame';

export type SourceObject = HTMLAudioElement | HTMLVideoElement | MediaStream;
export type SourceNode<T extends SourceObject> = T extends MediaStream
  ? MediaElementAudioSourceNode
  : MediaStreamAudioSourceNode;

export type FrequencyDataHandler = (data: Uint8Array, node: AnalyserNode) => any;
export type AudioAnalyserOptions = {
  fftSize?: number;
};

export const useAudioAnalyser = (
  handler: FrequencyDataHandler,
  options: AudioAnalyserOptions = {}
) => {
  const context = useRef<AudioContext>();
  const analyserNode = useRef<AnalyserNode>();
  const dataArray = useRef(new Uint8Array());
  const [error, setError] = useState<unknown>();

  const frame = useAnimationFrame(() => {
    analyserNode.current?.getByteFrequencyData(dataArray.current);
    handler(dataArray.current, analyserNode.current!);
  });

  const connect = useCallback(<T extends SourceObject>(source: T): SourceNode<T> | undefined => {
    if (!context.current || !analyserNode.current) return;
    const isStream = source instanceof MediaStream;
    setError(undefined);

    // avoid the CORS access restrictions
    if (!isStream) source.crossOrigin = 'anonymous';

    try {
      const sourceNode = isStream
        ? context.current.createMediaStreamSource(source)
        : context.current.createMediaElementSource(source);

      sourceNode.connect(analyserNode.current);
      if (!isStream) sourceNode.connect(context.current.destination);

      // fix the AudioContext suspending in Chrome
      if (context.current.state === 'suspended') {
        const audioContextResume = () => context.current?.resume().then(frame.start);

        if (isStream) navigator.mediaDevices.enumerateDevices().then(audioContextResume);
        else source.addEventListener('play', audioContextResume, { passive: true, once: true });
      } else {
        frame.start();
      }

      return sourceNode as any;
    } catch (error) {
      setError((curr: any) => curr ?? error);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    context.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserNode.current = context.current.createAnalyser();
    analyserNode.current.fftSize = options.fftSize ?? 2048;

    dataArray.current = new Uint8Array(analyserNode.current.frequencyBinCount);

    return () => {
      analyserNode.current?.disconnect();
      frame.cancel();
    };
  }, []);

  return { node: analyserNode, context, connect, error };
};
