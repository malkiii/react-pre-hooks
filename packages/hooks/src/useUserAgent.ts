import { useInsertionEffect, useRef, useState } from 'react';
import { UAParser, IResult as UAResult } from 'ua-parser-js';

export const useUserAgent = () => {
  const parserRef = useRef(new UAParser());
  const [userAgent, setUserAgent] = useState<UAResult>();

  useInsertionEffect(() => {
    setUserAgent(parserRef.current.getResult());
  }, [parserRef]);

  return userAgent;
};
