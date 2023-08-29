import { useCallback, useLayoutEffect, useState } from 'react';
import { QRCodeRenderersOptions, QRCodeToDataURLOptions, toCanvas, toDataURL } from 'qrcode';

export type QrCodeType<TCanvas extends boolean | undefined> = TCanvas extends true
  ? HTMLCanvasElement
  : string;

export type QrRenderOptions<TCanvas extends boolean | undefined> = TCanvas extends true
  ? QRCodeRenderersOptions
  : QRCodeToDataURLOptions;

export type QrCodeOptions<TCanvas extends boolean | undefined> = {
  text?: string;
  canvas?: TCanvas;
} & QrRenderOptions<TCanvas>;

const qr = { toDataURL, toCanvas };

export const useQrCode = <T extends boolean | undefined = false>(
  options: QrCodeOptions<T> = {}
) => {
  const { text: initial, canvas, ...renderOptions } = options;
  if (!renderOptions.margin) renderOptions.margin = 0;

  const [qrCode, setQrCode] = useState<QrCodeType<T> | undefined>(undefined);

  const updateQrCode = useCallback(
    async (text?: string) => {
      if (!text) return setQrCode(undefined);

      if (options.canvas) setQrCode((await qr.toCanvas(text, renderOptions)) as any);
      else setQrCode((await qr.toDataURL(text, renderOptions)) as any);
    },
    [options]
  );

  useLayoutEffect(() => {
    updateQrCode(initial);
  }, []);

  return [qrCode, updateQrCode] as const;
};
