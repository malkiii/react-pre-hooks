import { useState } from 'react';
import { IResult, UAParser } from 'ua-parser-js';
import { useIsomorphicEffect } from '@/src';

export type UserAgentResult = IResult;

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<UserAgentResult>();

  useIsomorphicEffect(() => {
    setUserAgent(new UAParser().getResult());
  }, []);

  return userAgent;
};

export const useDevice = () => {
  const [device, setDevice] = useState<UserAgentResult['device']>();

  useIsomorphicEffect(() => {
    setDevice(new UAParser().getDevice());
  }, []);

  return device;
};

export const useBrowser = () => {
  const [browser, setBrowser] = useState<UserAgentResult['browser']>();

  useIsomorphicEffect(() => {
    setBrowser(new UAParser().getBrowser());
  }, []);

  return browser;
};

export const useOS = () => {
  const [os, setOS] = useState<UserAgentResult['os']>();

  useIsomorphicEffect(() => {
    setOS(new UAParser().getOS());
  }, []);

  return os;
};
