import { MediaElementInit, useMediaElement } from '@/src/utils/useMediaElement';

export type AudioElementInit = MediaElementInit;

export const useAudio = (initialState?: MediaElementInit) => {
  return useMediaElement<'audio'>(initialState);
};
