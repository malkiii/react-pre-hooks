import { useLayoutEffect, useState } from 'react';

export const useClient = () => {
  const [isClient, setIsClient] = useState<boolean>();

  useLayoutEffect(() => {
    setIsClient(typeof window !== 'undefined');
  });

  return isClient;
};
