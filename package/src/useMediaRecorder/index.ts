import { useMemo, useRef, useState } from 'react';

export type RecorderDownloadOptions = {
  type?:
    | `video/${'mp4' | 'mpeg' | 'webm' | 'ogg'}`
    | `audio/${'mpeg' | 'wav' | 'webm' | 'ogg'}`
    | (string & {});
};

export const useMediaRecorder = (options: MediaRecorderOptions = {}) => {
  const recorderRef = useRef<MediaRecorder>();
  const recorderBlobParts = useRef<BlobPart[]>([]);
  const [recorderState, setRecorderState] = useState<RecordingState>('inactive');

  const [error, setError] = useState<unknown>();

  const controls = useMemo(
    () => ({
      start(stream: MediaStream, timeslice?: number) {
        if (recorderRef.current?.state !== 'inactive') return;

        recorderRef.current = new MediaRecorder(stream, options);
        recorderRef.current.ondataavailable = event => {
          if (event.data.size > 0) recorderBlobParts.current.push(event.data);
        };

        const stateEvents = ['onstart', 'onstop', 'onpause', 'onresume'] as const;
        const updateRecorderState = () => setRecorderState(recorderRef.current!.state);
        stateEvents.forEach(event => {
          recorderRef.current![event] = updateRecorderState;
        });

        try {
          recorderRef.current.start(timeslice);
        } catch (error) {
          setError(error);
        }
      },
      async stop(options: RecorderDownloadOptions = {}) {
        if (recorderRef.current?.state == 'inactive') return;
        recorderRef.current?.resume();
        recorderRef.current?.stop();

        const blob = await new Promise<Blob>(resolve => {
          const type = options.type ?? 'video/mp4';
          setTimeout(() => resolve(new Blob(recorderBlobParts.current, { type })), 0);
        });

        recorderBlobParts.current = [];

        return blob;
      },
      togglePlayState(play?: boolean) {
        if (recorderRef.current?.state == 'inactive') return;
        const shouldPlay = play ?? recorderRef.current?.state == 'paused';
        shouldPlay ? this.resume() : this.pause();
      },
      pause() {
        recorderRef.current?.pause();
      },
      resume() {
        recorderRef.current?.resume();
      }
    }),
    [recorderRef]
  );

  return {
    ...controls,
    isActive: recorderState !== 'inactive',
    isRecording: recorderState == 'recording',
    isPaused: recorderState == 'paused',
    error
  };
};
