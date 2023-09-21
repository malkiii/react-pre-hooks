import { useLayoutEffect, useState } from 'react';

export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'smartTV' | 'console';

/* prettier-ignore */
const deviceTypePatterns: Record<Exclude<DeviceType, 'desktop'>, RegExp> = {
  mobile: /(Mobile|Android|webOS|iPhone|iPad|iPod|XiaoMi|Redmi|BlackBerry|IEMobile|Opera Mini)/i,
  tablet: /(iPad|Tablet|(Android(?!.*mobile))|(Windows(?!.*phone)(.*touch))|Kindle|PlayBook|Silk|(Puffin(?!.*(IP|AP|WP))))/i,
  smartTV: /((Smart[ _-]?|Google|Hbb|NET|D|Apple ?|Opera ?)TV|NetCast|Web0S|Viera|Roku)/i,
  console: /(Nintendo|Xbox|PlayStation|Ouya)/i
};

export const useDevice = () => {
  const [result, setResult] = useState<{ [K in `is${Capitalize<DeviceType>}`]?: boolean }>({});

  useLayoutEffect(() => {
    const ua = navigator.userAgent;

    const isConsole = deviceTypePatterns.console.test(ua);
    const isSmartTV = !isConsole && deviceTypePatterns.smartTV.test(ua);
    const isTablet = !isSmartTV && deviceTypePatterns.tablet.test(ua);
    const isMobile = isTablet || deviceTypePatterns.mobile.test(ua);
    const isDesktop = !isConsole && !isSmartTV && !isTablet && !isMobile;

    setResult({ isDesktop, isMobile, isTablet, isSmartTV, isConsole });
  }, []);

  return result;
};
