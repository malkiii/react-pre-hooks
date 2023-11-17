import { MediaElementInit, useMediaElement } from '../utils/useMediaElement';

export type VideoElementInit = MediaElementInit<'video'>;

export const useVideo = (initialState: VideoElementInit = {}) => {
  return useMediaElement<'video'>(initialState);
};
