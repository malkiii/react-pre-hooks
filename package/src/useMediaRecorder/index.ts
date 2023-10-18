import { useMemo, useRef, useState } from 'react';
import { download } from '../utils';

export type RecorderDownloadOptions = {
  download?: string;
  type?:
    | `video/${'mp4' | 'mpeg' | 'webm' | 'ogg'}`
    | `audio/${'mpeg' | 'wav' | 'webm' | 'ogg'}`
    | (string & {});
};

export const useMediaRecorder = (stream: MediaStream) => {
  const recorderRef = useRef<MediaRecorder>();
  const recorderBlobParts = useRef<BlobPart[]>([]);
  const [recorderState, setRecorderState] = useState<RecordingState>('inactive');

  const recorder = useMemo(
    () => ({
      isActive: recorderState !== 'inactive',
      isRecording: recorderState == 'recording',
      isPaused: recorderState == 'paused',
      start(timeslice?: number) {
        if (recorderState !== 'inactive') return;

        recorderRef.current = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9,opus'
        });
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
          console.error(error);
        }
      },
      async stop(options: RecorderDownloadOptions = {}) {
        if (recorderState == 'inactive') return;
        recorderRef.current?.resume();
        recorderRef.current?.stop();

        const blob = await new Promise<Blob>(resolve => {
          const type = options.type ?? 'video/mp4';
          setTimeout(() => resolve(new Blob(recorderBlobParts.current, { type })), 0);
        });

        const videoURL = URL.createObjectURL(blob);
        recorderBlobParts.current = [];

        if (options.download) download(videoURL, options.download);

        return videoURL;
      },
      togglePlayState(play?: boolean) {
        if (recorderState == 'inactive') return;
        const shouldPlay = play ?? recorderState == 'paused';
        shouldPlay ? recorderRef.current?.resume() : recorderRef.current?.pause();
      },
      pause() {
        this.togglePlayState(false);
      },
      resume() {
        this.togglePlayState(true);
      }
    }),
    [recorderRef, recorderState]
  );

  return recorder;
};
