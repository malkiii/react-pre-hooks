import { useState } from 'react';
import { IResult as UA, UAParser } from 'ua-parser-js';
import { useIsomorphicEffect } from '@/src';

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<UA>();

  useIsomorphicEffect(() => {
    setUserAgent(new UAParser().getResult());
  }, []);

  return userAgent;
};

export const useDevice = () => {
  const [userAgent, setUserAgent] = useState<UA['device']>();

  useIsomorphicEffect(() => {
    setUserAgent(new UAParser().getDevice());
  }, []);

  return userAgent;
};

export const useBrowser = () => {
  const [userAgent, setUserAgent] = useState<UA['browser']>();

  useIsomorphicEffect(() => {
    setUserAgent(new UAParser().getBrowser());
  }, []);

  return userAgent;
};
