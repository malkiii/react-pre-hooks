import { useLayoutEffect, useState } from 'react';
import { IResult, UAParser } from 'ua-parser-js';

export type UserAgentResult = IResult;

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<UserAgentResult>();

  useLayoutEffect(() => {
    setUserAgent(new UAParser().getResult());
  }, []);

  return userAgent;
};

export const useDevice = () => {
  const [device, setDevice] = useState<UserAgentResult['device']>();

  useLayoutEffect(() => {
    setDevice(new UAParser().getDevice());
  }, []);

  return device;
};

export const useBrowser = () => {
  const [browser, setBrowser] = useState<UserAgentResult['browser']>();

  useLayoutEffect(() => {
    setBrowser(new UAParser().getBrowser());
  }, []);

  return browser;
};

export const useOS = () => {
  const [os, setOS] = useState<UserAgentResult['os']>();

  useLayoutEffect(() => {
    setOS(new UAParser().getOS());
  }, []);

  return os;
};
