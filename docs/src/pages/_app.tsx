import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter as FontSans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const fontSans = FontSans({ subsets: ['latin'], display: 'swap', preload: true });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={fontSans.className}>
        <Component {...pageProps} />
      </main>
      <GoogleAnalytics gaId="G-G7X3ML41SG" />
    </>
  );
}
