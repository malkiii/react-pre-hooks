import { useMemo, useRef, useState } from 'react';

export const useMediaRecorder = (options: MediaRecorderOptions = {}) => {
  const recorderRef = useRef<MediaRecorder>();
  const recorderBlobParts = useRef<BlobPart[]>([]);
  const [recorderState, setRecorderState] = useState<RecordingState>('inactive');

  const [error, setError] = useState<unknown>();

  const controls = useMemo(
    () => ({
      isActive: recorderState !== 'inactive',
      isRecording: recorderState == 'recording',
      isPaused: recorderState == 'paused',
      error,
      start(stream: MediaStream, timeslice?: number) {
        const state = recorderRef.current?.state ?? 'inactive';
        if (state !== 'inactive') return;

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
      async stop() {
        const state = recorderRef.current?.state ?? 'inactive';
        if (state === 'inactive') return;
        recorderRef.current?.resume();
        recorderRef.current?.stop();

        const blob = await new Promise<Blob>(resolve => {
          setTimeout(() => {
            resolve(new Blob(recorderBlobParts.current, { type: options.mimeType }));
          }, 0);
        });

        recorderBlobParts.current = [];

        return blob;
      },
      togglePlayState(play?: boolean) {
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
    [recorderState, error]
  );

  return controls;
};
