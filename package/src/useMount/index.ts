import { EffectCallback, useEffect } from 'react';

export const useMount = (callback: EffectCallback) => useEffect(callback, []);
