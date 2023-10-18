import { MediaElementInit, useMediaElement } from '../utils/useMediaElement';

export type AudioElementInit = MediaElementInit;

export const useAudio = (initialState?: MediaElementInit) => {
  return useMediaElement<'audio'>(initialState);
};
