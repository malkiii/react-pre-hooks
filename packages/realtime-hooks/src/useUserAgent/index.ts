import { useRef, useState } from 'react';
import { UAParser, IResult as UAResult } from 'ua-parser-js';
import { useIsomorphicEffect } from '@/src';

export const useUserAgent = () => {
  const parserRef = useRef(new UAParser());
  const [userAgent, setUserAgent] = useState<UAResult>();

  useIsomorphicEffect(() => {
    setUserAgent(parserRef.current.getResult());
  }, [parserRef]);

  return userAgent;
};
