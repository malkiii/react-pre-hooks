import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from '../useAnimationFrame';

export type MediaSourceObject = HTMLAudioElement | HTMLVideoElement | MediaStream;
export type MediaSourceNode<T extends MediaSourceObject> = T extends MediaStream
  ? MediaElementAudioSourceNode
  : MediaStreamAudioSourceNode;

export type FrequencyDataHandler = (data: Uint8Array, node: AnalyserNode) => any;

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useAudioAnalyser | useAudioAnalyser} hook.
 */
export const useAudioAnalyser = (args: { handler: FrequencyDataHandler; fftSize?: number }) => {
  const context = useRef<AudioContext>();
  const analyserNode = useRef<AnalyserNode>();
  const dataArray = useRef(new Uint8Array());

  const frame = useAnimationFrame({
    callback: () => {
      analyserNode.current?.getByteFrequencyData(dataArray.current);
      args.handler(dataArray.current, analyserNode.current!);
    }
  });

  const connect = useCallback(
    async <T extends MediaSourceObject>(source: T): Promise<MediaSourceNode<T> | undefined> => {
      if (!context.current || !analyserNode.current) return;
      const isStream = source instanceof MediaStream;

      // avoid the CORS access restrictions
      if (!isStream) source.crossOrigin = 'anonymous';

      try {
        const sourceNode = isStream
          ? context.current.createMediaStreamSource(source)
          : context.current.createMediaElementSource(source);

        sourceNode.connect(analyserNode.current);
        if (!isStream) sourceNode.connect(context.current.destination);

        // fix the AudioContext suspending in Chrome
        if (context.current.state === 'suspended') await context.current?.resume();

        frame.start();

        return sourceNode as any;
      } catch (error: any) {
        if (error.message.includes('already connected')) return;
        throw error;
      }
    },
    []
  );

  const disconnect = useCallback(() => {
    analyserNode.current?.disconnect();
    frame.cancel();
  }, []);

  useEffect(() => {
    // @ts-ignore
    context.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserNode.current = context.current.createAnalyser();
    analyserNode.current.fftSize = args.fftSize ?? 2048;

    dataArray.current = new Uint8Array(analyserNode.current.frequencyBinCount);

    return disconnect;
  }, []);

  return { nodeRef: analyserNode, context, connect, disconnect };
};
