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
  const [device, setDevice] = useState<DeviceType>();

  useLayoutEffect(() => {
    const ua = navigator.userAgent;

    setDevice(
      deviceTypePatterns.console.test(ua)
        ? 'console'
        : deviceTypePatterns.smartTV.test(ua)
        ? 'smartTV'
        : deviceTypePatterns.tablet.test(ua)
        ? 'tablet'
        : deviceTypePatterns.mobile.test(ua)
        ? 'mobile'
        : 'desktop'
    );
  }, []);

  return {
    device,
    isDesktop: device === 'desktop',
    isMobile: device === 'tablet' || device === 'mobile',
    isTablet: device === 'tablet',
    isSmartTV: device === 'smartTV',
    isConsole: device === 'console'
  };
};
