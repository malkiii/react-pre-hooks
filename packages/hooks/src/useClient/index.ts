import { useEffect, useState } from 'react';

export const useClient = () => {
  const [isClient, setIsClient] = useState<boolean>();

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  return isClient;
};
