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
  const [device, setDevice] = useState<UA['device']>();

  useIsomorphicEffect(() => {
    setDevice(new UAParser().getDevice());
  }, []);

  return device;
};

export const useBrowser = () => {
  const [browser, setBrowser] = useState<UA['browser']>();

  useIsomorphicEffect(() => {
    setBrowser(new UAParser().getBrowser());
  }, []);

  return browser;
};

export const useOS = () => {
  const [os, setOS] = useState<UA['os']>();

  useIsomorphicEffect(() => {
    setOS(new UAParser().getOS());
  }, []);

  return os;
};
