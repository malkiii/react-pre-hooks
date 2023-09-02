import { useLayoutEffect, useState } from 'react';
import { IResult, UAParser } from 'ua-parser-js';

/**
 * types and names from `ua-parser-enums.js`
 * @see https://github.com/faisalman/ua-parser-js/blob/master/src/enums/ua-parser-enums.js
 */
export type UserAgentResult = IResult & {
  browser: IResult['browser'] & {
    name:
      | 'Chrome'
      | 'Edge'
      | 'Safari'
      | 'Firefox'
      | 'Opera'
      | 'Mobile Chrome'
      | 'Mobile Safari'
      | 'Mobile Firefox'
      | 'Android Browser';
  };
  device: IResult['device'] & {
    type: 'mobile' | 'tablet' | 'smarttv' | 'console' | 'wearable' | 'embedded';
    vendor:
      | 'Apple'
      | 'Samsung'
      | 'Huawei'
      | 'Xiaomi'
      | 'OPPO'
      | 'Vivo'
      | 'Realme'
      | 'Lenovo'
      | 'LG';
  };
  engine: IResult['engine'] & {
    name:
      | 'Amaya'
      | 'Blink'
      | 'EdgeHTML'
      | 'Flow'
      | 'Gecko'
      | 'Goanna'
      | 'iCab'
      | 'LibWeb'
      | 'KHTML'
      | 'Links'
      | 'Lynx'
      | 'NetFront'
      | 'NetSurf'
      | 'Presto'
      | 'Tasman'
      | 'Trident'
      | 'w3m'
      | 'WebKit';
  };
  os: IResult['os'] & {
    name: 'Windows' | 'Linux' | 'macOS' | 'iOS' | 'Android';
  };
  cpu: IResult['cpu'] & {
    architecture:
      | 'ia32'
      | 'amd64'
      | 'ia64'
      | 'arm'
      | 'arm64'
      | 'armhf'
      | '68k'
      | 'avr'
      | 'irix'
      | 'irix64'
      | 'mips'
      | 'mips64'
      | 'ppc'
      | 'sparc'
      | 'sparc64';
  };
};

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<UserAgentResult>();

  useLayoutEffect(() => {
    setUserAgent(new UAParser().getResult() as any);
  }, []);

  return userAgent;
};

export const useDevice = () => {
  const [device, setDevice] = useState<UserAgentResult['device']>();

  useLayoutEffect(() => {
    setDevice(new UAParser().getDevice() as any);
  }, []);

  return device;
};

export const useBrowser = () => {
  const [browser, setBrowser] = useState<UserAgentResult['browser']>();

  useLayoutEffect(() => {
    setBrowser(new UAParser().getBrowser() as any);
  }, []);

  return browser;
};

export const useOS = () => {
  const [os, setOS] = useState<UserAgentResult['os']>();

  useLayoutEffect(() => {
    setOS(new UAParser().getOS() as any);
  }, []);

  return os;
};
