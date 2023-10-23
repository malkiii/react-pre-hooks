import { useRef } from 'react';
import { MediaElementInit, useMediaElement } from '../utils/useMediaElement';

export type AudioElementInit = MediaElementInit<'audio'> & {
  src?: string;
};

export const useAudio = (initialState: AudioElementInit = {}) => {
  const ref = initialState.src ? useRef(new Audio(initialState.src)) : null;
  return useMediaElement<'audio'>({ ref, ...initialState });
};
