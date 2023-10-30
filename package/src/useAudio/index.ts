import { MediaElementInit, useMediaElement } from '../utils/useMediaElement';

export type AudioElementInit = MediaElementInit<'audio'>;

export const useAudio = (initialState: AudioElementInit = {}) => {
  return useMediaElement<'audio'>(initialState);
};
